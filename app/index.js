'use strict';
import './style.scss';
import $ from 'jquery';

const streamers = ["brunofin","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

function makeURL(streamer) {
  return 'https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?';
}

// returns a promise
function getJSONP(url) {
  return $.getJSON(url, {
    format: "jsonp"
  });
}

// returns a promise
function getData(streamer) {
  return getJSONP(makeURL(streamer));
}

function getStreamerStatus(obj) {
  switch (obj.stream) {
    case null:
      return 'Offline';
      break;
    case undefined:
      return 'Account Closed';
      break;
    default:
      return obj.stream.game;
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

// todo order entries
