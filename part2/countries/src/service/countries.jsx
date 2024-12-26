import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const get = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

export default { get }