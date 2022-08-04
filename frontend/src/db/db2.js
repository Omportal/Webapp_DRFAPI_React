import axios from 'axios'
export function getData2() {
    return axios.get('http://localhost:8000/api/items/');
}