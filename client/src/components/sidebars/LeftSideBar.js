import React from 'react'
import {Link} from 'react-router-dom'
import"./sidebar.css"

const LeftSideBar = () => {
    return (
        <div className="left-side-bar sidebar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/all">All Projects</Link></li>
                <li><Link to="/projects/recent">Recent Projects</Link></li>
                <li><Link to="/projects/deadline">Projects Near Deadline</Link></li>
            </ul>
        </div>
    )
}

export default LeftSideBar
