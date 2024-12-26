import axios from 'axios'
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const get = (lat, lon) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return request.then(response => response.json())
}

export default { get }