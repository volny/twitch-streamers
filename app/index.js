'use strict';
import './style.scss';
import $ from 'jquery';

const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

function makeURL(streamer) {
  return 'https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?';
}

// returns a deferred object
function getData(url) {
  return $.getJSON(url, {
    format: "jsonp"
  });
}

// returns a deferred object
function getChannelURL(streamer) {
  return getData(makeURL(streamer));
}

// returns an array of deferred objects
function getAllChannels(streamers) {
  return streamers.map((streamer) => (getChannelURL(streamer)))
}

// resolve promises and log data
getAllChannels(streamers).map(
  (promise) => (promise.done((data) => console.log(data._links.channel)))
);

