import axios from 'axios';
const API_KEY = '32853375-6d84d4cb4ca61249f5fce654b';

const imagesApi = axios.create({
  baseURL: 'https://pixabay.com/api/',

  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const fetchImages = async (query, page = 1) => {
  const { data } = await imagesApi.get('', {
    params: {
      q: query,
      page,
    },
  });

  return data;
};
