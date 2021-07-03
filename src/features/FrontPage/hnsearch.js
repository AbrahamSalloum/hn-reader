
import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import { settop, getTopIDs} from './hnreducers';

const SearchSuggest = () => {

  const dispatch = useDispatch()
  const [value, Setvalue] = useState('')


  const getSuggestions = async (value) => {
    const url = `https://hn.algolia.com/api/v1/search?query=${value}&restrictSearchableAttributes=title`
    const getsuggestions = await fetch(url)
    const r = await getsuggestions.json()
    return r["hits"]
  }

  const change = async (event) => {
    Setvalue(event.target.value)
    if(!!value === false){
      dispatch(getTopIDs("top"))
    }
  };

  const handleKeyDown = async (event) => {
    if(event.key === "Enter"){
      const s = await getSuggestions(value)
      const result = s.map(o => o.objectID);
      dispatch(settop(result))
    }
  }

  return <input placeholder="Story Keyword [enter]" value={value} onChange={change} onKeyDown={handleKeyDown}/>

}

export default SearchSuggest