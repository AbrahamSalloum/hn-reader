import React, { useState, useCallback} from 'react';
import {useDispatch } from 'react-redux';
import { settop} from './hnreducers';
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import { isMobile } from "react-device-detect";
import classNames from 'classnames'
import './hn-k.css'

const SearchSuggest = () => {

  const dispatch = useDispatch()
  const [value, Setvalue] = useState('')
  const [searchperformed, Setsearchperformed] = useState(false)
  const [sort, setSort] = useState("search")
  const history = useHistory()

  // eslint-disable-next-line
  const delayedQuery = useCallback(debounce((b) => { if (!!b === false) history.push('/') }, 1000), [])

  const getSuggestions = async (value) => {
    const url = `https://hn.algolia.com/api/v1/${sort}?query=${value}&restrictSearchableAttributes=title`
    console.log(url)
    const getsuggestions = await fetch(url)
    const r = await getsuggestions.json()
    return r["hits"]
  }

  const change = (event) => {
    Setvalue(event.target.value)
    if (searchperformed) delayedQuery(event.target.value)
  };

  const handleKeyDown = async (event) => {
    event.preventDefault()
      const s = await getSuggestions(value)
      const result = s.map(o => o.objectID);
      Setsearchperformed(true)
      dispatch(settop(result))
      history.push('/search')

  }

  const Sortbydropdown = () => {
    return(
      <select name="sort"
      value={sort}
      onChange={handleSortChange}
      >
        <option value="search">Relevence</option>
        <option value="search_by_date">Date</option>
    </select>
    )
  }



  const handleSortChange = (ev) => {
    setSort(ev.target.value)
  }

  let inputstyles =  classNames({
    "txtinput": true,
    "mobileinput": isMobile,
  });


  return (
  <div className="column">
  <form  onSubmit={handleKeyDown}>
    <div className="searchcontainer">
        <input  
          className={inputstyles}
          placeholder="Story Keyword" 
          value={value} 
          onChange={change} 
        />
        <button type="submit">Search</button>
    </div>
  </form>
    {!!value ? <div style={{"fontFamily": "monospace", "padding": "5px", "font-size": "1rem"}}>Sort By:<Sortbydropdown /></div>: null }
    </div>
  
  )

}

export default SearchSuggest