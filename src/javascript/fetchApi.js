import axios from "axios";


export class PixabayApi{
    #BASE_URl = 'https://pixabay.com/api';
    #API_KEY = '13292952-c7bbdc2f0ed3c6a4beea574f1';
    per_page = 12;

    fetchPhotos(searchQuery) {
        return axios.get(`${this.#BASE_URl}/`, {
            params:{
                key: this.#API_KEY,
                q: searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: this.per_page,
                page: this.page,
            },
        });
    }
    incrementPage() {
        this.page += 1;
    }
}