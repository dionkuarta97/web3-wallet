import { ARISE_BACKEND_BASE_URL } from '@env';
import axios from 'axios';

export default axios.create({
  baseURL: ARISE_BACKEND_BASE_URL
});
