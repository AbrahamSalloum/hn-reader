import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrStory, setCurrentDetails} from './hnreducers';
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment"
import { isMobile } from "react-device-detect";

const StoryList = ({cat, top}) => {

  const history = useHistory()
  const dispatch = useDispatch();

  const [clist, setClist] = useState(cat)
  const [top_info, set_top_info] = useState({})

  const isItemLoaded = (id) => {
      if (!!top_info[id]) return true
    return false
}

  const loadMoreItems = async (startIndex, stopIndex) => {
    try {
      const newitems = []
      for (let i = startIndex; i < stopIndex; i++) {
        if (!!top[i]) { //if item is defined
          if (!top_info[top[i]]) { // if item isnt already fetched
            newitems.push(i) //add to newitems array
          }
        }
      }

      const urls = [] 
      for (let i = 0; i < newitems.length; i++) { // create URLs to to fetch and populate in urls
        const newitem = top[newitems[i]]
        let url = `https://hacker-news.firebaseio.com/v0/item/${newitem}.json`
        urls.push(url)
      }

      const fetches = urls.map(async (url) => {
        const res = await fetch(url)
        return await res.json()
      })

      await Promise.all(fetches.map(async (res, index) => {
        const x = await res
        x[top[newitems[index]]] = await res
        set_top_info((prev) => {
          prev[top[newitems[index]]] = x
          return prev
        })
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const RenderRow = ({ index, style }) => {
    return (
      <div className="story_wrapper" style={style} key={top[index]} id={top[index]} onClick={() => {
        dispatch(setCurrentDetails(top[index]))
        if (isMobile) history.push(`/story/${top[index]}`)
        }}>

        {
          isItemLoaded(top[index]) ? (
            <div className="story">
              <div className="storyContent">
                <div className="storyContent_text">
                <div><Link to={`/story/${top[index]}`} target="_blank" rel="noopener noreferrer">{top_info[top[index]].type}</Link>:</div>
                <div><b>{top_info[top[index]].title}</b></div>
                </div>
              </div>
              <div className="storyData">
                <div className="storyContent_text">
                  <div>By:</div>
                  <div><Link to={`/user/${top_info[top[index]].by}`}>{top_info[top[index]].by}</Link></div>
                </div>
                <div className="storyContent_text">
                  <div>Score:</div>
                  <div>{top_info[top[index]].score}</div>
                </div>
                <div className="storyContent_text">
                  <div>Time:</div>
                  <div>{moment(top_info[top[index]].time * 1000).fromNow()}</div>
                </div>
                <div className="storyContent_text">
                  <div>Comments:</div>
                  <div>{top_info[top[index]].descendants}</div>
                </div>
              </div>
            </div>
          )

            :
            <div className="story">
              Loading...{top[index]}
            </div>
        }
      </div>
   )
  }

  const setcatlist= (t) => {
    const title = t.charAt(0).toUpperCase() + t.slice(1)
    dispatch(setCurrStory(t)); 
    history.push(t)
    setClist(title); 
  }
  
  return (
    <div className="storylist">
      <div className="header">
        <div className="buttondiv logo"><b>HN: ({clist})</b></div>
        <div className="buttonlist">
          <div className="buttondiv butts"><button onClick={() => { setcatlist('top')  }}>Top (100)</button></div>
          <div className="buttondiv butts"><button onClick={() => { setcatlist('new')  }}>New (100)</button></div>
          <div className="buttondiv butts"><button onClick={() => { setcatlist('ask')  }}>Ask (100)</button></div>
          <div className="buttondiv butts"><button onClick={() => { setcatlist('show') }}>Show (100)</button></div>
          <div className="buttondiv butts"><button onClick={() => { setcatlist('jobs') }}>Jobs (100)</button></div>
        </div>
      </div>
      {
        <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={top.length}
            loadMoreItems={loadMoreItems}
            minimumBatchSize={3}
            threshold={5}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                itemSize={120}
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
  )
}

export default StoryList;