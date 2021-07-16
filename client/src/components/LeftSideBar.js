import React from 'react'
import {Link} from 'react-router-dom'
import"./sidebar.css"

const LeftSideBar = () => {
    return (
        <div className="left-side-bar sidebar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create Project</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
            </ul>
        </div>
    )
}

export default LeftSideBar
