import React from 'react'
import {Link} from 'react-router-dom'
import"./sidebar.css"

const RightSideBar = () => {
    return (
        <div className="right-side-bar sidebar">
            <ul>
                <li><Link to="/profile">Your Profile</Link></li>
                <li><Link to="/projects/my">Your Projects</Link></li>
                <li><Link to="/projects/funded">Funded Projects</Link></li>
                <li><Link to="/create">Create Project</Link></li>
            </ul>
        </div>
    )
}

export default RightSideBar
