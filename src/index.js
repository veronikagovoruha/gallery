import { PixabayApi } from "./javascript/fetchApi";
import photoList from './templates/gallery-card.hbs'
 
const galleryListEl = document.querySelector('.gallery');
const btnSearchEl = document.querySelector('.search-form');
const btnLoadMoreEl = document.querySelector('.js-load-more');

const pixabay = new PixabayApi();

function handleImageList(images){
  galleryListEl.innerHTML = photoList(
    ({largeImageURL, webformatURL, likes, views, comments, downloads} = images)
  )
}

const onSearchInput = async(event) => {
  event.preventDefault();

  pixabay.searchQuery = event.currentTarget.elements['searchQuery'].value.trim()
  .toLowerCase();
  
  if(pixabay.searchQuery) {
    pixabay.page = 1;
    await pixabay.fetchPhotos(pixabay.searchQuery).then(
      ({data} = {})=>{
        handleImageList(data.hits);
        if(data.hits.length){
          btnLoadMoreEl.classList.remove('is-hidden');
        }
      })
      .catch(err => {
        console.log(err);
      })

    }
}

function handleOnLoadMore(){
  pixabay.incrementPage();

      pixabay.fetchPhotos(pixabay.searchQuery).then(
      ({data} = {})=>{
        galleryListEl.insertAdjacentHTML('beforeend', photoList(data.hits));
        if(data.totalHits <= pixabay.page * pixabay.per_page){
          btnLoadMoreEl.classList.add('is-hidden');
        }
      })
      .catch(err => {
        console.log(err);
      })
}

btnSearchEl.addEventListener('submit', onSearchInput);
btnLoadMoreEl.addEventListener('click', handleOnLoadMore);

