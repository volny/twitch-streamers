'use strict';
import './style.scss';
import $ from 'jquery';

const streamers = ["brunofin","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

// returns a jQuery deferred object
function getData(streamer) {
  let url =  'https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?';
  return $.getJSON(url, {
    format: "jsonp"
  });
}

function getStreamerStatus({stream}) {
  switch (stream) {
    case null:
      return 'Offline';
    case undefined:
      return 'Account doesn\'t exist';
    default:
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

// IMPROVEMENTS:
// handle ajax errors
// order rows by status (streaming -> prepend, else append)
// conditional color - streaming have a background color, closed/non existent have grey text
// don't link to non-existent accounts
// toggle to see only streaming / see all
// ...
// let user add streamers and remove streamers
// save a users 'followers' (streamers) to localStorage
