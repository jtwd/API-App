import { store } from '../index';
import { fetchPromotions } from '../actions';


export function onPromotionsEnter() {
  store.dispatch(fetchPromotions());
}