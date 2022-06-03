import axios from 'axios'

export const channel_id = '1657176644'
export const HTTP = axios.create({
baseURL: 'http://localhost:12345',
});