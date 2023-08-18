import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { createMarkup } from './js/markup';
import { lightbox } from './js/lightbox';

export const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const loadMoreBtn = document.querySelector('.load-more');

const KEY = '38889455-fd8af79455bb4793a4bd4120e';
const URL = 'https://pixabay.com/api/';

let currentPage = 1;
const perPage = 40;
let firstLoad = true;

const paramsForNotify = {
    position: 'center-center',
    timeout: 3000,
    width: '400px',
    fontSize: '18px'
};

form.addEventListener('submit', addImgItemsList);

loadMoreBtn.addEventListener('click',  () => {
    currentPage++;
    const searchText = input.value;
    addImagesToPage(searchText);
});

function addImgItemsList(event) { 
    event.preventDefault();
    resetData();
    const searchText = input.value;
    addImagesToPage(searchText);
};

async function searchImage(searchText, currentPage) {
    try {
        const response = await axios.get(URL, {
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

        const responseData = await response.data;
        const totalHits = responseData.totalHits;
        const hitsLength = responseData.hits.length;

        if (totalHits > perPage) {
            colectionValidator(currentPage, perPage, totalHits);
        };

        if (hitsLength === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.', paramsForNotify);
            return;
        } else if (searchText.trim() === '') {
            Notify.info('Enter your request, please!', paramsForNotify);
            return;
        } else {
            console.log(responseData);
            return responseData;
        }

    } catch (error) {
        Notify.failure('Oops! Something went wrong! Try reloading the page or make another choice!', paramsForNotify);
    }
};

async function addImagesToPage(searchText) {
    try {  
        let imgItems = await searchImage(searchText, currentPage);
        let searchResults = imgItems.hits;
        let totalHits = imgItems.totalHits;

        if (currentPage === 1) {
            Notify.success(`Hooray! We have found ${totalHits} images.`, paramsForNotify);
        };
        createMarkup(searchResults);
        lightbox.refresh();
        liteScrol();

    } catch (error) {
        loadMoreBtn.classList.add('is-hidden');
    };
};

function resetData () {
    gallery.innerHTML = '';
    currentPage = 1;
    loadMoreBtn.classList.add('is-hidden');
};

function colectionValidator(currentPage, perPage, totalHits) {
    if (currentPage * perPage >= totalHits) {
        Notify.info('We are sorry, but you have reached the end of search results.', paramsForNotify);
        loadMoreBtn.classList.add('is-hidden');
    } else {
        loadMoreBtn.classList.remove('is-hidden');
    }
};

function liteScrol() {
    if (!firstLoad) {
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  
        window.scrollBy({
        top: cardHeight / 2,
        behavior: "smooth",
        });
    } else {
        firstLoad = false;
    }
};