import React, { useEffect, useState, useCallback  } from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import StoryPage from './storypage'
import { useHistory } from "react-router-dom";
import { setCurrentDetails } from './hnreducers';
import {isMobile} from "react-device-detect";
import {createMarkup} from './displayutils.js'

const UserInfo  = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { user } = useParams();
    const [userInfo, setUserInfo] = useState({id: '', about: '', karma: '', submitted: []})
    const [curr_commentid, setcommentid] = useState('')


    const handleGetUserData = useCallback(async (user) => {
        const getuser = await fetch(`https://hacker-news.firebaseio.com/v0/user/${user}.json`)
        const userdata = await getuser.json()
        setUserInfo(userdata)
        setcommentid(userdata.submitted[0])
        dispatch(setCurrentDetails(userdata.submitted[0]))
        return userdata
    }, [dispatch])


    useEffect(() => {
        handleGetUserData(user)
    }, [user, handleGetUserData])

    return(
        <div className="container">
            <div className="storylist">
                <Link to="/top"><button>Front</button></Link> <br/>
                <table>
                    <tbody>
                        <tr><td>ID</td><td>{userInfo.id}</td></tr>
                        <tr><td>About</td><td> <div dangerouslySetInnerHTML={createMarkup(userInfo.about)} /></td></tr>
                        <tr><td>Karma</td><td>{userInfo.karma}</td></tr>
                        <tr><td>Created</td>
                        <td>{new Date(userInfo.created*1000).toLocaleDateString("en-GB", {year: "numeric", month: "long",  day: 'numeric'})}</td></tr>
                    </tbody>
                </table>
                <div style={{ "height": "800px", "overflow": "scroll" }}>
            {
                userInfo.submitted.map((commentid) => {
                    return (
                        <div key={commentid} onClick={() => {
                            setcommentid(commentid)
                            dispatch(setCurrentDetails(commentid))
                            if (isMobile) history.push(`/story/${commentid}`)
                        }} style={{"border": "1px solid black", "margin": "3px"}}>
                            <Link to={"#"}>{commentid}</Link>
                        </div>
                    )
                })
            }
                </div>
            </div>
            {
            isMobile ? null :
                <div>
                    <div style={{"width": "100%"}}>
                        <StoryPage id={curr_commentid} />
                    </div>
                </div>
            }
        </div>
    )
}

export default UserInfo