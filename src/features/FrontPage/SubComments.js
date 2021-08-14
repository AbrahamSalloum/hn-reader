import React, { useEffect, useState } from 'react';
import moment from "moment"
import { Link } from "react-router-dom";


const stringToColour =  (stri) => {
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

    return colour +"66";
}

const SubComments = ({comments}) => {

    const [scomments, setscomments] = useState([])
    const [kidID, setkidID] = useState([])
    const [ButtonClicked, setButtonClicked] = useState({})

    const isButtonClicked = (c) => {
        if (!!ButtonClicked[c.id]) return true //disable
        if (!!c.kids) return false
        return true
    }

    function createMarkup(t) {
        return {__html: t};
    }

    const setKids = (kids, id) => {
        ButtonClicked[id] = id
        setButtonClicked(ButtonClicked)
        const k = {}
        k[id] = kids
        setkidID([...kidID, k])
    }

    const Kids = ({id}) => {
        const o = kidID.find(element => Object.keys(element)[0] === id.toString())
        if(!!o === false) return null
        return(
            <div className="commentPos">
                <SubComments comments={o[id]} />
            </div>
        )
    }

    const getsubComments = async (comments = [], signal) => {
        const vcomments = []
        try {

            await Promise.all(
                comments.map(async (comm) => {
                    const topcomment = await fetch(`https://hacker-news.firebaseio.com/v0/item/${comm}.json`, { signal: signal })
                    const topcommenttext = await topcomment.json()
                    if (!!topcommenttext) {
                        vcomments.push(topcommenttext)
                    }
                })
            )
            setscomments(vcomments)
        } catch(err){
            return
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getsubComments(comments, signal)
        return () => {
            controller.abort();
        }
    }, [comments])

    while(!!comments === false) return "No replies..."

    return(
    <>
        {
            scomments.map((c) => {
                return(
                    <div key={c.id} >
                    
                        <div className="commentbox" key={c.id}>
                        <div style={{ "backgroundColor": stringToColour(c.parent), height: 5 }}></div>
                            <div className="bottominfo">
                                <div className="infotextcontainer">
                                    <div className="infotext">
                                        <div>Parent:</div>
                                        <div><Link to={`/story/${c.parent}`}  target="_blank" rel="noopener noreferrer">{c.parent}</Link></div>
                                    </div>
                                </div>
                            </div>
                            <div className="commenttext" dangerouslySetInnerHTML={createMarkup(c.text)} />
                            <div className="bottominfo">
                                <div className="infotextcontainer">
                                    <div className="infotext">
                                        <div>ID: </div>
                                        <div>
                                        <Link to={`/story/${c.id}`}  target="_blank" rel="noopener noreferrer">{c.id}</Link>
                                        </div>
                                    </div>
                                    <div className="infotext">
                                        <div>By:</div>
                                        <div><Link to={`/user/${c.by}`}>{c.by}</Link></div>
                                    </div>
                                    <div className="infotext">
                                        <div>Time:</div>
                                        <div>{moment(c.time * 1000).fromNow(true)}</div>
                                    </div>
                                </div>
                                <div className="infotextcontainer">
                                    <div className="infotext">
                                        <div><button disabled={(isButtonClicked(c)) ? true : false} onClick={() => {setKids(c.kids, c.id)}}>Expand {!!c.kids ? c.kids.length : "0" } Comments</button></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ "backgroundColor": stringToColour(c.id), height: 5 }}></div>
                        </div>
                    <div>
                    <Kids id={c.id} />
                    </div>
                </div>
                )
            })
        }
    </>
    )
}

export default SubComments