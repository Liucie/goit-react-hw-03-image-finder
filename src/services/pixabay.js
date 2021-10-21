import axios from 'axios';
export class PixabayFetch {
  constructor(base_url, api_key) {
    this.base_url = base_url;
    this.api_key = api_key;
    this._searchQuery = '';
    this._page = 1;
  }
  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }
  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }
  resetPage() {
    return (this._page = 1);
  }

  searchPhotos() {
    let params = `?q=${this.searchQuery}&page=${this.page}&key=${this.api_key}&image_type=photo&orientation=horizontal&per_page=12`;
    let url = `${this.base_url}${params}`;
    return axios
      .get(url)
      .then(result => {
        return result.data.hits;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
