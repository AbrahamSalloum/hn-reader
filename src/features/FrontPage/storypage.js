import React from 'react';
import { useSelector } from 'react-redux';
import { getdetails, storyloading} from './hnreducers'
import SubComments from './SubComments'
import './hn-k.css'

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
    const storydetailsloading = useSelector(storyloading);

    function createMarkup(t) {
        return {__html: t};
    }


    while ((!!storydetailsloading === true )) return <div>loading....</div>

    return(
        <div>
            <div>
                <div className="bottominfo" style={{ "backgroundColor": stringToColour(details.id) }}>
                    <div className="infotext">
                        <div>ID: {details.id}</div>
                        <div>Type: {details.type}</div>
                        <div>Score: {details.score}</div>
                    </div>
                </div>
            <div className="story_content_wrapper">
                <div><h3>{details.title} <a target="_blank" rel="noreferrer" href={`https://news.ycombinator.com/item?id=${id}`}>{id}</a></h3></div>
                <a target="_blank"  rel="noreferrer" href={details.url}>{details.url}</a><br></br>
                    <div className="story_content" dangerouslySetInnerHTML={createMarkup(details.text)} />
                </div>

                <SubComments comments={details.kids} />
            </div>
        </div>
    )
}



export default StoryPage