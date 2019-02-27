import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d5052.firebaseio.com/'
})

export default instance;
