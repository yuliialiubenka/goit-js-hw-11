import axios from 'axios';

const URL = "https://pixabay.com/api/";
const KEY = "38889455-fd8af79455bb4793a4bd4120e";

export async function fetchPhoto(q, page, perPage) {
    const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response.data;          
};