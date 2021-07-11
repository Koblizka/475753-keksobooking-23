import {
  PageState,
  setPageState,
  setAddress
} from './form.js';
import {prepareCards} from './card.js';

const OFFER_LIMIT = 10;

const TileLayer = {
  URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
const PinIconSrc = {
  MAIN_PIN: 'img/main-pin.svg',
  MARKER_PIN: 'img/pin.svg',
};
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

L.tileLayer(TileLayer.URL, {
  attribution: TileLayer.COPYRIGHT,

},
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: PinIconSrc.MAIN_PIN,
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
  iconUrl: PinIconSrc.MARKER_PIN,
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
