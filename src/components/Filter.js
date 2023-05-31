import React, {useState} from 'react'
import CreatableSelect from 'react-select/creatable';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

const Filter = ({value, handleChange, selectedRegion}) => {
  const [option, setOption] = useState({
    selectedPlaceholder:'Filter by Region',
    selectedLabel:'None'
  })

  const currentTheme = JSON.parse(localStorage.getItem('mode'))

  const options = [
    {value:'None', label:'Filter by Region'},
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'America' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
  ];

  return (
    <div className='filter'>
        <div className="search-wrp">
          <div className="search-icon">
            <FontAwesomeIcon className='search-svg' icon={faMagnifyingGlass} />
          </div>
          <input type="text" placeholder='Search for a country...' 
            value={value} 
            onChange={(e) => handleChange(e)}
              />
        </div>
          <CreatableSelect 
            options={options}
            isSearchable={false} 
            hideSelectedOptions={true}
            className='select'
            placeholder={option.selectedPlaceholder}
            closeMenuOnSelec={true}
            onChange={({value, label}) => {
              setOption({selectedLabel: value, selectedPlaceholder: label})
              selectedRegion(value)
            }}
           
           theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              neutral80: currentTheme === 'light' ?  '#111517' : '#fff',
            }
           })}  
          />
    </div>

  )
}

export default Filter