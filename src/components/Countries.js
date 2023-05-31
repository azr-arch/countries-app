import React from 'react'
import { Link } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const Countries = ( { countries, loading } ) => {
  console.log(countries)
  return (
    loading ? (
      <div className="loading-page">
        <BarLoader />
      </div>
    ) :  
    <div className='grid'>
      {
        !countries ? 
        <p className='error'>No matching countries found</p>
        :
        countries?.map(( country, index ) => (
          <Link to={`/countries/${country.name.common}`} key={index} id='grid--items'>
            <div className='grid--item'>
              <div className="grid--item-top-half">
                <img src={country.flags.png} alt={country.flags.alt} />
              </div>

              <div className="grid--item-btm-half">
                <p className="country-name">
                  {country.name.common}
                </p>
                <p className="country-about">
                  Population: <span className='font-light'>{country.population}</span>
                </p>
                <p className="country-about">
                  Region: <span className='font-light'>{country.region}</span>
                </p>
                <p className="country-about">
                  Capital: <span className='font-light'>{country.capital}</span>
                </p>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Countries