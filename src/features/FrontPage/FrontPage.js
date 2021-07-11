import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StoryPage from './storypage.js'
import SearchSuggest from './hnsearch.js'
import { getcurrstory, setCurrStory, selectTop100} from './hnreducers';
import StoryListA from './StoryList.js';
import { useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";

export const FrontPage = () => {

  const dispatch = useDispatch()
  let { cat } = useParams();

  const currstory = useSelector(getcurrstory);
  const [listishidden, setIsHidden] = useState(false)
  const [storyishidden, setStoryishidden] = useState(isMobile)
  const top = useSelector(selectTop100);

  useEffect(() => {
    dispatch(setCurrStory(cat))
  }, [cat, dispatch])


  return(
  <div>
  <div style={{"display": 'flex', "alignItems":"flex-start"}}>
        <div className="togglebuttons">
          {isMobile ? null :
          <div className="toggles">
              <button onClick={() => setIsHidden(!listishidden)}>{listishidden ? "Show Story List" : "Hide Story List"}</button>
              <button onClick={() => setStoryishidden(!storyishidden)}>{storyishidden ? "Show Story" : "Hide Story"}</button>
          </div>
          }
        </div>
        <div style={{"width": '100%'}}><SearchSuggest /> </div>
      </div>
      <div className="container">
        {listishidden ? null : <StoryListA cat={cat} top={top}/>}
        {storyishidden ? null : <div className="storypage"> <StoryPage id={currstory}/> </div>}
      </div>
  </div>
  );
}