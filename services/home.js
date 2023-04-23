import { request } from '../utils/api.js';

export async function getSwiperList() {
  const url = '/api/swiper-list';
  return await request(url);
}

export async function getCategories() {
  const url = '/api/categories';
  return await request(url);
}
