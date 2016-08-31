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

// forget about the <a> - the only way to make tablerows clickable is with an eventhandler
function makeRowString(streamer, status, url) {
  return '<tr><td>' + streamer + '</td><td>' + status + '</td></tr>';
}

function appendRows(streamers) {
  if (streamers.length === 0) {
    return false;
  }

  getData(streamers[0]).done((data) => {
    let rowString = makeRowString(streamers[0], getStreamerStatus(data), 'https://google.com');
    $('tbody').append(rowString);
  });

  return appendRows(streamers.slice(1));
}

appendRows(streamers);

