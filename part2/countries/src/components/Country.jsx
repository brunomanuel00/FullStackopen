import { useState, useEffect } from "react"
import weatherService from "../service/weather"


export default function Country({ data }) {
    const languages = data.languages
    const [lat, lon] = data.latlng
    const [weather, setWeather] = useState([])
    console.log('long lat', data.latlng)
    useEffect(() => {
        weatherService.get(lat, lon).then(response => {
            setWeather(response)
            console.log(response)
        }).catch(error => {
            console.log('Error fetching weather: ', error)
        })

    }, [])

    return <div>
        <h1>{data.name.common}</h1>
        <p>capital {data.capital[0]}</p>
        <p>area {data.area}</p>
        <h4>languages:</h4>
        <ul>
            {Object.entries(languages).map(([code, name]) => (
                <li key={code}>
                    {name}
                </li>
            ))}
        </ul>
        <img src={data.flags.png} alt={data.flags.alt} />
    </div>
}