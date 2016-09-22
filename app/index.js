import './style.scss';
import $ from 'jquery';


const streamers = ["brunofin", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

// returns a jQuery deferred object
function getData(streamer) {
  return $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/' + streamer,
    headers: {
       'Client-ID': '5puwrcs78w6jyvx241fmtz75bt4kfhe'
    }
  });
}

function getStreamerStatus({stream}) {
  if (typeof(stream) !== 'object') {
    return 'Account doesn\'t exist';
  } else if (stream === null) {
    return 'Offline';
  } else {
    return stream.game;
  }
}

function makeRow(streamer, status) {
  let row = $('<tr><td>' + streamer + '</td><td>' + status + '</td></tr>');
  row.attr('data-href', 'https://www.twitch.tv/' + streamer);
  // don't use arrow func bc of lexical scope `this`
  $(row).on('click', function() {
    window.document.location = $(this).data('href')
  });
  return row;
}

function appendRows(streamers) {
  if (streamers.length === 0) {
    return false;
  }

  getData(streamers[0]).done((data) => {
    $('#tablebody').append(makeRow(streamers[0], getStreamerStatus(data)));
  });

  return appendRows(streamers.slice(1));
}

appendRows(streamers);

