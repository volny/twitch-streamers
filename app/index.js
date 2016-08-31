'use strict';
import './style.scss';
import $ from 'jquery';

const streamers = ["brunofin","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

function makeURL(streamer, type) {
  return 'https://api.twitch.tv/kraken/' + type  + '/' + streamer + '?callback=?';
}

// returns a deferred object
function getData(url) {
  return $.getJSON(url, {
    format: "jsonp"
  });
}

// returns a deferred object
function getChannelURL(streamer) {
  return getData(makeURL(streamer, 'streams'));
}

// returns an array of arrays containing streamer name and deferred object
function getAllChannels(streamers) {
  return streamers.map((streamer) => ([streamer, getChannelURL(streamer)]))
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

// instead of logging it put in in a table in the DOM
function insertData(data) {
  $('tbody').append('<tr><td>Streamer</td><td>' + getStreamerStatus(data) + '</td></tr>')
}

const logStatus = (data) => console.log(getStreamerStatus(data))

getAllChannels(streamers).map((array) => {
    //array[1].done(logStatus);
    array[1].done(insertData);
  }
);

// todo
// get the names in the table
// make alternating rows striped

