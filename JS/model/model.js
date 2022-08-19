//TODO: is it possible to get the IP using current location ( geolocation) with js?

"strict mode";

import { KEY, TIMEOUT_SEC, API_URL } from "../config.js";
var marker;
var map;
var currentUserIP;

export const loadMap = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const curCoords = [latitude, longitude];

        //place the map initially on the related coords
        map = L.map("map").setView(curCoords, 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // place the marker on the current location initially
        marker = L.marker(curCoords).addTo(map);
      },
      function () {
        console.log("failed to get the position");
      }
    );
  }
};
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const loadIP = async function (ip) {
  try {
    const data = await AJAX(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${KEY}&ipAddress=${ip}`
    );
    console.log(data);
    console.log(data.location.lat, data.location.lng);

    // add marker to the new IP location
    marker.setLatLng([data.location.lat, data.location.lng]);

    //move the map to the coords
    map.setView(new L.LatLng(data.location.lat, data.location.lng), 10);

    return data;
  } catch (err) {
    // Temp error handling
    console.error(`${err}`);
    throw err;
  }
};
