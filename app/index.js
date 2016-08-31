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

// returns an array of deferred objects
function getAllChannels(streamers) {
  return streamers.map((streamer) => (getChannelURL(streamer)))
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

const logStatus = (data) => console.log(getStreamerStatus(data))
getAllChannels(streamers).map((promise) => (promise.done(logStatus)));

