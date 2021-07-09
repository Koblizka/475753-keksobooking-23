import {PageState} from './data.js';
import {setPageState, setAddress} from './form.js';
import {prepareCards} from './card.js';

const OFFER_LIMIT = 10;

const TokyoCenter = {
  lat: 35.6938,
  lng: 139.7034,
};
const MainPin = {
  WIDTH: 52,
  HEIGHT: 52,
};
const PinMarker = {
  WIDTH: 40,
  HEIGHT: 40,
};


const markers = [];

const map = L.map('map-canvas')
  .on('load', () => {
    setPageState(PageState.ACTIVE_STATE);
  })
  .setView(TokyoCenter, 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

},
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MainPin.HEIGHT, MainPin.WIDTH],
  iconAnchor: [(MainPin.HEIGHT / 2), MainPin.WIDTH],
});

const mainPinMarker = L.marker(TokyoCenter, {
  icon: mainPinIcon,
  draggable: true,
}).addTo(map);

setAddress(TokyoCenter);

mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const pinMarker = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [PinMarker.HEIGHT, PinMarker.WIDTH],
  iconAnchor: [(PinMarker.HEIGHT / 2), PinMarker.WIDTH],
});

const placeOneOfferOnMap = (offer) => {
  const marker = L.marker([offer.location.lat, offer.location.lng], {
    icon: pinMarker,
    title: offer.offer.title,
  });

  marker.addTo(map)
    .bindPopup(
      prepareCards(offer),
      {
        keepInView: true,
      });

  markers.push(marker);
};

const renderOffersOnMap = (offers) => {
  offers.slice(0, OFFER_LIMIT).forEach((offer) => {
    placeOneOfferOnMap(offer);
  });
};

const clearMarkers = () => {
  markers.forEach((marker) => marker.remove());
};

export {
  renderOffersOnMap,
  TokyoCenter,
  mainPinMarker,
  clearMarkers
};
