import React,{ useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";


const UserInfo  = () => {

    let { user } = useParams();
    const [status, setStatus] = useState("loading")
    const [userInfo, setUserInfo] = useState({})

    const getUserData = async (username) => {
        const url = `https://hacker-news.firebaseio.com/v0/user/${username}.json`
        const getuser = await fetch(url)
        const userdata = await getuser.json()
        setUserInfo(userdata)
        setStatus("OK")
    }

    function createMarkup(t) {
        return {__html: t};
    }

    useEffect( () => {
        getUserData(user)
    }, [user])

    if (status === "loading") return "Loading..."

    return(
        <div className="container">
            <div className="storylist" style={{ "width": "500px"}}>
                <Link to="/top"><button>Front</button></Link> <br/>
                <table>
                    <tbody>
                        <tr><td>ID</td><td>{userInfo.id}</td></tr>
                        <tr><td>About</td><td> <div dangerouslySetInnerHTML={createMarkup(userInfo.about)} /></td></tr>
                        <tr><td>Karma</td><td>{userInfo.karma}</td></tr>
                        <tr><td>Created</td><td>{userInfo.created}</td></tr>
                    </tbody>
                </table>
            </div>
            <div>
            {
                userInfo.submitted.map((commentid) => {
                    return (
                        <div key={commentid}>
                            {commentid}
                        </div>
                    )
                })
            }
            </div>
        </div>

    )
}

export default UserInfo