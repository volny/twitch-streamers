'use strict';
import './style.scss';
import $ from 'jquery';

const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

function makeURL(streamer) {
  return 'https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?';
}

// returns a jQuery deferred object
function getData(url) {
  return $.getJSON(url, {
    format: "jsonp"
  });
}

function getChannelURL(streamer) {
  return getData(makeURL(streamer)).done((data) => (data._links.channel))
}

function getAllChannelURLs(streamers) {
  return streamers.map((streamer) => getChannelURL(streamer))
}


console.log(getAllChannelURLs(streamers))

