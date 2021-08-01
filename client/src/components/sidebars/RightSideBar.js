import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../utils/AppContext'
import "./sidebar.css"
import { generateRandomAvatar } from 'seedable-random-avatar-generator';

const RightSideBar = () => {

    const { accounts } = useContext(AppContext)
    const handleDisconnect = () => {
        localStorage.removeItem('cacheKey')
        localStorage.removeItem('cacheNID')
        window.location.href="/login"
    }

    return (
        <div className="right-side-bar sidebar">

            <div className="acc-details">
                <div className="acc">
                    <img width={40} src={generateRandomAvatar(accounts[0])} alt="/" />
                    <p>{accounts[0]}</p>
                </div>
                
            </div>

            <ul>
                <li><button className="disconnect-btn" onClick={handleDisconnect}>Disconnect Wallet</button></li>
                <li><Link to="/all">All Projects</Link></li>
                <li><Link to="/projects/my">Your Projects</Link></li>
                <li><Link to="/projects/funded">Funded Projects</Link></li>
                <li><Link to="/create">Create Project</Link></li>
            </ul>
        </div>
    )
}

export default RightSideBar
