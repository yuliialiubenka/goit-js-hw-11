import { gallery } from '../index';

export function createMarkup(searchResults) {
    let photosArray = searchResults.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
        return `
        <div class="photo-card">
            <div class="img-wrap">
                <a class="gallery-link" href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
                </a>
            </div>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><span>${likes}</span>
                </p>
                <p class="info-item">
                    <b>Views</b><span>${views}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b><span>${comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b><span>${downloads}</span>
                </p>
            </div>
        </div>`
    }).join('');
    
    gallery.insertAdjacentHTML('beforeend', photosArray); 
}