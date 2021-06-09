import {getOffer} from './get-offer.js';
import {NUMBER_OF_OFFERS} from './data.js';

const offers = new Array(NUMBER_OF_OFFERS).fill(null).map(getOffer);

offers;
console.log('aa');
