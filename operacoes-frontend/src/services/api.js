import axios from 'axios';
export const api = axios.create({
  baseURL: 'postgresql://postgres:NSYONDupqwBEnFpYCDGltPoyqCWEzdvP@caboose.proxy.rlwy.net:17682/railway' // substitua com a URL real da sua API
});