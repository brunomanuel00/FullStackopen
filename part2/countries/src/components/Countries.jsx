import { useState } from "react"

const Countries = ({ country }) => {
    const [show, setShow] = useState(true)
    const languages = country.languages

    const Content = () => {
        return <>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h4>languages:</h4>
            <ul>
                {Object.entries(languages).map(([code, name]) => (
                    <li key={code}>
                        {name}
                    </li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </>
    }
    const handleShow = () => {
        setShow(!show)
    }
    return (
        <li style={{ listStyle: 'none' }}>
            {country.name.common}
            <button style={{ marginLeft: 6 }} onClick={handleShow}>{show ? 'Show' : 'Hide'}</button>
            {!show ? <Content /> : null}
        </li>
    )
}

export default Countries

