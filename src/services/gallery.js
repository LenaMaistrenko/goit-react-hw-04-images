import axios from 'axios';
const APIKEY = '32898789-bb69a622d84d8c3b35ac89d94';
axios.defaults.baseURL = `https://pixabay.com/api/`;
export async function getAlbumsService(filter, page) {
  const { data } = await axios.get(
    `?q=${filter}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
}
