
import React, { useState, useCallback} from 'react';
import {useDispatch } from 'react-redux';
import { settop} from './hnreducers';
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";

const SearchSuggest = () => {

  const dispatch = useDispatch()
  const [value, Setvalue] = useState('')
  const history = useHistory()

  // eslint-disable-next-line
  const delayedQuery = useCallback(debounce((b) => { if (!!b === false) history.push('/') }, 1000), [])

  const getSuggestions = async (value) => {
    const url = `https://hn.algolia.com/api/v1/search?query=${value}&restrictSearchableAttributes=title`
    const getsuggestions = await fetch(url)
    const r = await getsuggestions.json()
    return r["hits"]
  }



  const change = (event) => {
    Setvalue(event.target.value)
    delayedQuery(event.target.value)

  };

  const handleKeyDown = async (event) => {
    if(event.key === "Enter"){
      const s = await getSuggestions(value)
      const result = s.map(o => o.objectID);
      dispatch(settop(result))
      history.push('/search')

    }
  }




  return <input placeholder="Story Keyword [enter]" value={value} onChange={change} onKeyDown={handleKeyDown}/>

}

export default SearchSuggest