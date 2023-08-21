import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { paramsForNotify } from '../index.js';

const KEY = '38889455-fd8af79455bb4793a4bd4120e';
const URL = 'https://pixabay.com/api/';

// export async function fetchImage(searchText, currentPage, perPage) {
//     try { 
//         return await axios.get(URL, {
//             params: {
//                 key: KEY,
//                 q: searchText,
//                 per_page: perPage,
//                 page: currentPage,
//                 image_type: 'photo',
//                 orientation: 'horizontal',
//                 safesearch: true,
//             }
//         });
//     } catch (error) {
//         Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', paramsForNotify);
//     }
// };

export async function fetchImage(searchText, currentPage, perPage) {
    try { 
        const params = new URLSearchParams({
            key: KEY,
            q: searchText,
            per_page: perPage,
            page: currentPage,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        });
        console.log(params);
        return await axios.get(`${URL}?${params}`);
          
    } catch (error) {
        Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', paramsForNotify);
    }
};

// export async function fetchImage(searchText, currentPage, perPage) {
//     try {
//         class Params {
//             constructor() {
//             this.key = KEY;
//             this.q = searchText,
//             this.per_page = perPage,
//             this.page = currentPage,
//             this.image_type = 'photo',
//             this.orientation = 'horizontal',
//             this.safesearch = true
//             }
//         }
//         const imagesParams = new Params();
//         return await axios.get(`${URL}?key=${imagesParams.key}&q=${imagesParams.q}&page=${imagesParams.page}&per_page=${imagesParams.per_page}&image_type=${imagesParams.image_type}&orientation=${imagesParams.orientation}&safesearch=${imagesParams.safesearch}`);
//     } catch (error) {
//         Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', paramsForNotify);
//     }
// };