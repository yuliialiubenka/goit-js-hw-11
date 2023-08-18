import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export let lightbox = new SimpleLightbox('.img-wrap a', { 
    captionsData: 'alt',
    captionDelay: 250,
});