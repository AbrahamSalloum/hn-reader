import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StoryPage from './storypage.js'
import SearchSuggest from './hnsearch.js'
import './hn-k.css'
import { getcurrstory, setCurrStory} from './hnreducers';
import StoryListA from './StoryList.js';
import { useParams } from "react-router-dom";


export const FrontPage = () => {

  const dispatch = useDispatch()
  let { cat } = useParams();

  const currstory = useSelector(getcurrstory);
  const [listishidden, setIsHidden] = useState(false)
  const [storyishidden, setStoryishidden] = useState(false)


  useEffect(() => {
    // if (islistpending  === false) dispatch(setCurrStory(cat))
    dispatch(setCurrStory(cat))
  }, [cat, dispatch])


  return(
  <div>
    <div className="togglebuttons">
      <div>
        <button onClick={() => setIsHidden(!listishidden)}>{listishidden ? "Show Story List" : "Hide Story List"}</button>
      </div>
      <div>
        <button onClick={() => setStoryishidden(!storyishidden)}>{storyishidden ? "Show Story" : "Hide Story"}</button>
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