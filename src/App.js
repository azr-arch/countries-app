import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Header from './components/Header'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'


const App = () => {
    const [countries, setCountries] = useState(null)
    const [filterCountries, setFilterCountries] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState('')
    const [selectedRegionCountrys, setSelectedRegionCountrys] = useState(null)

    useEffect( () => {
        async function fetchData(){
            setLoading(true)
            const res = await fetch('https://restcountries.com/v3.1/all')
            const data = await res.json()
            setCountries(data)
            setFilterCountries(data)
            //showing loader 
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
        fetchData()
    }, [])

    let currMode;
    function setTheme() {
        currMode = JSON.parse(localStorage.getItem('mode'))
        //default value
        currMode = currMode ? currMode : 'light'
        document.querySelector('html').setAttribute('data-theme', currMode)
    }
    setTheme()

    function handleChange(e) {
        const {value} = e.target
        setFormData(value)

        let filteredCountries;
        
        const filterCountries = (countries) =>
        countries.filter((country) =>
            country.name.common.toLowerCase().includes(value.toLowerCase())
        );

        if (selectedRegionCountrys) {
        // If a region is selected, filter the countries in the selected region
            filteredCountries = filterCountries(selectedRegionCountrys);
        } else if (value) {
        // If no region is selected but a search value is provided, filter all countries
            filteredCountries = filterCountries(countries);
        } else {
        // If no region is selected and no search value is provided, show all countries
            filteredCountries = countries;
        }

        // Update the filtered countries state
        setFilterCountries(filteredCountries.length <= 0 ? undefined : filteredCountries);
    }

    function handleRegionSelection(currentRegion) {
        let newRegionCountys
        if(currentRegion === 'None'){
            setFilterCountries(countries)
            setSelectedRegionCountrys(null)
        } else {
            newRegionCountys = countries?.filter((country) => currentRegion === country.region)
            setFilterCountries(newRegionCountys)
            setSelectedRegionCountrys(newRegionCountys)
        }
    }

  return (
    <div>
        <Header />
        <Router>
            <Routes>
                <Route path='/' element ={
                <>
                  <Filter  
                    value={formData}
                    handleChange={(e) => handleChange(e)}
                    selectedRegion={(val) => handleRegionSelection(val)}
                   
                  />
                  <Countries loading={loading} countries={filterCountries} />
                </>}/>
                <Route path='/countries/:name' element={<Country  countries={filterCountries}/>}/>
            </Routes>
        </Router>
    </div>
  )
}



export default App
