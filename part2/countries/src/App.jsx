import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import countrieService from './service/countries'
import Country from './components/Country'


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    countrieService
      .get()
      .then(initialCountires => {
        setCountries(initialCountires)
      })
      .catch(error => {
        console.error('Failed to fetch countries:', error)
      })
  }, [])

  const handleSearch = event => {
    setSearch(event.target.value)
  }


  const FilteredCountries = () => {

    const filteredCountries = search ? countries.filter(countrie => countrie.name.common.toLowerCase().includes(search.toLowerCase())) : countries;

    if (filteredCountries.length > 1 && filteredCountries.length < 11) {
      return filteredCountries.map(country => (
        <Countries key={country.name.common} country={country} />
      ));
    } else if (filteredCountries.length === 1) {
      return <Country data={filteredCountries[0]} />;
    } else if (search && filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    return null;

  }

  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
      <FilteredCountries />
    </div>
  )
}

export default App
