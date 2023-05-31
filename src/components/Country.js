import React from 'react'
import { Link, useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Country = ({ countries }) => {
  const { name } = useParams()
  
  let country = countries?.find((item) => {
    if(item.name.common === name){
      localStorage.setItem('country', JSON.stringify(item))
      return item
    }
    return false
  })

  //setting up countries in localstorage
  localStorage.setItem('countries', JSON.stringify(countries))
  
  if(!country) {
    let savedState = localStorage.getItem('country')
    country = JSON.parse(savedState)
    
  }
  
  // GETTING NAME OF FIRST KEY 
  let nativeNameKey = Object.keys(country.name.nativeName)[0]
  let currencyKey = Object.keys(country.currencies)
  
  let {name:cName, tld, population, region, subregion, languages, capital} = country

  let languagesString = '';
  function languageHelper(){
    Object.keys(languages).forEach((key, index) => {
      if(index === Object.keys(languages).length - 1){
        languagesString += `${languages[key]}.`
      } else {
        languagesString += `${languages[key]}, `
      }
    })
  }
  languageHelper()

  let borderCountries =[]
  function borderCountriesCalcHelper() {
    let {borders} = country
    let countries = JSON.parse(localStorage.getItem('countries'))
   
    for(let i = 0; i < countries?.length; i++){
      for(let j = 0; j < borders?.length; j++) {
          if(countries[i].cca3  === borders[j]){
             borderCountries.push(countries[i].name.common)
          }}}
    localStorage.setItem('borders', JSON.stringify(borderCountries))
  }

  borderCountriesCalcHelper()
  const bor = JSON.parse(localStorage.getItem('borders'))

  const borderEl = bor.map((item, index) => (
      <Link to={`/countries/${item}`} key={index}>
        <button className='border-item' >
            {item}
        </button>
      </Link> 
  ))
  return (
    <div className='country-hero'>
      <Link to='/' className=''>
      <button className='back-btn' >
          <FontAwesomeIcon  icon={faArrowLeft} className='back-icon'/>
          Back
      </button>
      </Link>

      <div className="wrapper">
        <section className="country-hero--left-content">
          <img src={country.flags.png} alt={country.flags.alt} />
        </section>
        <section className="country-hero--right-content">
          <p className="country-name">{cName.common}</p>

          <div className="content-wrp">
            <p className="country-about">
              Native Name: <span className='font-light'>{cName.nativeName[nativeNameKey].official}</span>
            </p>
            <p className="country-about">
              Population: <span className='font-light'>{population}</span>
            </p>
            <p className="country-about">
              Region: <span className='font-light'>{region}</span>
            </p>
            <p className="country-about">
              Sub Region: <span className='font-light'>{subregion}</span>
            </p>
            <p className="country-about">
              Capital: <span className='font-light'>{capital}</span>
            </p>
            <p className="country-about">
              Top Level Domain: <span className='font-light'>{tld ? tld[0] : '-'}</span>
            </p>
            <p className="country-about">
              Languages: <span className='font-light'>{languagesString}</span>
            </p>
            <p className="country-about">
              Currencies: <span className='font-light'>{country.currencies[currencyKey].name}</span>
            </p>
          </div>

          {
            bor.length > 0 && (
            <div className="borders">
              <p className="country-about">Border Countries: </p>
              {
                borderEl.length > 0 ? borderEl
                :
                <p>loading...</p>
              }
            </div>
            )
          }

        </section>
      </div>
    </div>
  )
}

export default Country