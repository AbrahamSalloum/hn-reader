import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StoryPage from './storypage.js'
import SearchSuggest from './hnsearch.js'
import './hn-k.css'
import { getcurrstory, listpending, setCurrStory} from './hnreducers';
import StoryListA from './StoryList.js';
import { useParams } from "react-router-dom";


export const FrontPage = () => {

  const dispatch = useDispatch()
  let { cat } = useParams();

  const islistpending = useSelector(listpending);
  const currstory = useSelector(getcurrstory);
  const [listishidden, setIsHidden] = useState(false)
  const [storyishidden, setStoryishidden] = useState(false)

  useEffect(() => {
    if (islistpending) dispatch(setCurrStory(cat))
  }, [islistpending, dispatch, cat])


  return(
  <div>
    <div className="togglebuttons">
      <div>
        <button onClick={() => setIsHidden(!listishidden)}>{listishidden ? "Show Story List" : "Hide Story List"}</button>
      </div>
      <div>
        <button onClick={() => setStoryishidden(!storyishidden)}>{storyishidden ? "Show Story" : "Hide Story List"}</button>
      </div>
      <div>
          <SearchSuggest />
      </div>
    </div>
  <div className="container">
    {listishidden ? null : <StoryListA cat={cat} />}
    {storyishidden ? null : <div style={{ "width": "100%", "overflow": "auto", "height": "1200px" }}> <StoryPage id={currstory} /></div>}
  </div>
</div>
);
}