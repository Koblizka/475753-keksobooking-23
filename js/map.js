import {PageState} from './data.js';
import {setPageState, setAddress} from './form.js';
import {prepareCards} from './card.js';

const TokyoCenter = {
  lat: 35.6938,
  lng: 139.7034,
};

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
  iconSize: [52, 52],
  iconAnchor: [21.5, 52],
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
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const placeOneOfferOnMap = (offer) => {
  L.marker([offer.location.lat, offer.location.lng], {
    icon: pinMarker,
    title: offer.offer.title,
  }).addTo(map)
    .bindPopup(
      prepareCards(offer),
      {
        keepInView: true,
      });
};

const placeAllOffersOnMap = (offers) => {
  offers.forEach((offer) => {
    placeOneOfferOnMap(offer);
  });
};

export {
  placeAllOffersOnMap,
  TokyoCenter,
  mainPinMarker
};
