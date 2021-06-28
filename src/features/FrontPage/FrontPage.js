import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StoryPage from './storypage.js'
import './hn-k.css'
import {selectTop100, setCurrStory, getcurrstory, listpending, setCurrentDetails} from './hnreducers';
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {useParams, useHistory} from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment"




export function FrontPage() {
  let { cat } = useParams();
  const history = useHistory()
  const dispatch = useDispatch();

  const islistpending = useSelector(listpending);
  const top = useSelector(selectTop100);
  const currstory = useSelector(getcurrstory);
  const [itemStatusMap, setitemStatusMap] = useState({})
  const [clist, setClist] = useState(cat)
  const [top_info, set_top_info] = useState({})

  const isItemLoaded = (index) => {
    return !!itemStatusMap[index]
  }

const loadMoreItems = async (startIndex, stopIndex) => {

  try {
    const newitems = []
    for(let i = startIndex; i< stopIndex; i++){
      if(!!top[i]){
        if(!top_info[top[i]]){
          newitems.push(i)
        }
      }
    }
    const new_top_info = top_info
    const newitemStatusMap = itemStatusMap
    for (let index = 0; index <= newitems.length; index++){
      newitemStatusMap[top[newitems[index]]] = false
      setitemStatusMap(newitemStatusMap)
      new_top_info[top[newitems[index]]] = {
        // title: "",
        // type: "",
        // by: "",
        // score: "",
        // descendants: "",
        // time: ""
      }
    }

    set_top_info(new_top_info)
    setitemStatusMap(newitemStatusMap)

    const urls = []
    for (let i = 0; i < newitems.length; i++){
      const newitem = top[newitems[i]]
      let url = `https://hacker-news.firebaseio.com/v0/item/${newitem}.json`
      urls.push(url)
    }

    const fetches = urls.map(async (url) => {
      const res = await fetch(url)
      return await res.json()
    })

    await Promise.all(fetches.map(async (res, index) => {
      const newitemStatusMap = itemStatusMap
      newitemStatusMap[top[newitems[index]]] = top[newitems[index]]
      setitemStatusMap(newitemStatusMap)
      top_info[top[newitems[index]]] = await res
    }))

  } catch(err){
    console.log(err)
  }
}

  useEffect( () => {
    if(islistpending) dispatch(setCurrStory(cat))
  }, [cat, islistpending, dispatch])

  while(!!islistpending === true) return "Loading stories..."

  const RenderRow = ({ index, style }) => {
    return(
      <div className="story_wrapper" style={style} key={top[index]} id={top[index]} onClick = {() => {dispatch(setCurrentDetails(top[index]))}}>
        {
          isItemLoaded(top[index]) ?
          <div className="story">
            <div className="storyContent">
              {top_info[top[index]].type}:
              <b>{top_info[top[index]].title}</b>
            </div>
            <div className="storyData">
              <div>
                By: <Link to={`/user/${top_info[top[index]].by}`}>{top_info[top[index]].by}</Link>
              </div>
              <div>
                Score: {top_info[top[index]].score}
              </div>
              <div>
                Time: {moment(top_info[top[index]].time*1000).fromNow()}
              </div>
              <div>
                Comments: {top_info[top[index]].descendants}
              </div>
            </div>
          </div>
            :
          <div className="story">
            Loading...{top[index]}
          </div>
        }
      </div>
    )
  }

  return (
  <div className="container">
    <div className="storylist">
      <div className="header">
        <div className="buttondiv logo"><b>HN: ({clist})</b></div>
        <div className="buttonlist">
        <div className="buttondiv butts"><button onClick={() => {dispatch(setCurrStory("top")); setClist("Top"); history.push('top')}}>Top (100)</button></div>
        <div className="buttondiv butts"><button onClick={() => {dispatch(setCurrStory("new")); setClist("New"); history.push('new')}}>New (100)</button></div>
        <div className="buttondiv butts"><button onClick={() => {dispatch(setCurrStory("ask")); setClist("Ask"); history.push('ask')}}>Ask (100)</button></div>
        <div className="buttondiv butts"><button onClick={() => {dispatch(setCurrStory("show")); setClist("Show"); history.push('show')}}>Show (100)</button></div>
        <div className="buttondiv butts"><button onClick={() => {dispatch(setCurrStory("jobs")); setClist("Jobs"); history.push('jobs')}}>Jobs (100)</button></div>
      </div>
    </div>
    {
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={top.length}
            loadMoreItems={loadMoreItems}
            minimumBatchSize={15}
            threshold={15}
          >
          {({ onItemsRendered, ref }) => (
              <List
                height={height}
                itemSize={100}
                itemCount={top.length}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={width}
                overscanCount={4}
              >
                {RenderRow}
              </List>
          )}
            </InfiniteLoader>
        )}
      </AutoSizer>
    }
  </div>
    <div style={{"width": "100%"}}>
      <StoryPage id={currstory} />
    </div>
  </div>
  );
}