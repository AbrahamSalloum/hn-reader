import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getdetails, setCurrentDetails} from './hnreducers'
import SubComments from './SubComments'
import { useParams, Link } from "react-router-dom";

const stringToColour = (stri) => {
    const str = stri.toString()
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }

    return colour + "66";
}

const StoryPage = ({id}) => {
    const details = useSelector(getdetails);
    const dispatch = useDispatch()

    function createMarkup(t) {
        return {__html: t};
    }

    let { storyid } = useParams()

    useEffect(() => {
        dispatch(setCurrentDetails(storyid))
    }, [storyid, dispatch])

    while ((!!details === false)) return <div>loading....</div>
    return(
        <div style={{ "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
            <div className={!!storyid ? "singlestory" : "ss"}>
            {!!storyid ? <div style={{padding: 5}}><Link to={"/"} target="_blank" rel="noopener noreferrer"><button>Home</button></Link></div>: null}
            <div className="bottominfo" style={{ "backgroundColor": stringToColour(details.id) }}>
                <div className="infotextcontainer">
                    <div className="infotext">
                        <div>ID:</div>
                        <div><Link to={`/story/${details.id}`}  target="_blank" rel="noopener noreferrer">{details.id}</Link></div>
                    </div>
                    <div className="infotext">
                        <div>Type:</div>
                        <div>{details.type}</div>
                    </div>
                    <div className="infotext">
                        <div>Score:</div>
                        <div>{details.score}</div>
                    </div>
                </div>
            </div>
            <div className="story_content_wrapper">
                <div aria-label="storylink"><h3>{details.title} <a target="_blank" rel="noreferrer" href={`https://news.ycombinator.com/item?id=${id}`}>{id}</a></h3></div>
                <p><a target="_blank"  rel="noreferrer" href={details.url}>{details.url}</a></p>
                <div className="story_content" dangerouslySetInnerHTML={createMarkup(details.text)} />
            </div>
            <SubComments comments={details.kids} />
            </div>
        </div>
    )
}

export default StoryPage