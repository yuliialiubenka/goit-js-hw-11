import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { paramsForNotify } from '../index';

const KEY = '38889455-fd8af79455bb4793a4bd4120e';
const URL = 'https://pixabay.com/api/';

export async function fetchImage(searchText, currentPage, perPage) {
    try { 
        return await axios.get(URL, {
            params: {
                key: KEY,
                q: searchText,
                per_page: perPage,
                page: currentPage,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            }
        });
    } catch (error) {
        Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', paramsForNotify);
    }
};


