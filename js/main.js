import {getOffersData} from './api.js';
import {placeAllOffersOnMap} from './map.js';
import {makeFailureMessage} from './utils.js';
import './card.js';
import './form.js';

getOffersData(placeAllOffersOnMap, makeFailureMessage);
