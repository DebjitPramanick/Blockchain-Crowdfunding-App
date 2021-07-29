import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../utils/AppContext'
import "./sidebar.css"

const RightSideBar = () => {

    const { web3 } = useContext(AppContext)
    const handleDisconnect = () => {
        localStorage.removeItem('cacheKey')
        localStorage.removeItem('cacheNID')
        window.location.href="/login"
    }

    return (
        <div className="right-side-bar sidebar">
            <ul>
                <li><button className="disconnect-btn" onClick={handleDisconnect}>Disconnect Wallet</button></li>
                <li><Link to="/profile">Your Profile</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/projects/my">Your Projects</Link></li>
                <li><Link to="/projects/funded">Funded Projects</Link></li>
                <li><Link to="/create">Create Project</Link></li>
            </ul>
        </div>
    )
}

export default RightSideBar
