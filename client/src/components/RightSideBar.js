import React from 'react'
import {Link} from 'react-router-dom'
import"./sidebar.css"

const RightSideBar = () => {
    return (
        <div className="right-side-bar sidebar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Home</Link></li>
            </ul>
        </div>
    )
}

export default RightSideBar
