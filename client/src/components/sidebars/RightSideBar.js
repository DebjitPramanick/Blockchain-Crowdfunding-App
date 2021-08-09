import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../utils/AppContext'
import "./sidebar.css"
import { generateRandomAvatar } from 'seedable-random-avatar-generator';

const RightSideBar = () => {

    const { accounts, web3 } = useContext(AppContext)
    const [balance, setBalance] = useState(0)
    const handleDisconnect = () => {
        localStorage.removeItem('cacheKey')
        localStorage.removeItem('cacheNID')
        window.location.href = "/login"
    }

    useEffect(() => {
        const showBalance = () => {
            web3.eth.getBalance(accounts[0], (err, bal) => {
                let bl = web3.utils.fromWei(bal, "ether")
                bl = Math.floor(bl)
                setBalance(bl)
            });
        }
        showBalance()
    }, [web3])

    return (
        <div className="right-side-bar sidebar">

            <div className="acc-details">
                <div className="acc">
                    <img width={50} src={generateRandomAvatar(accounts[0])} alt="/" />
                    <div className="details">
                        <p>{accounts[0]}</p>
                        <p className="balance">{balance} ETH</p>
                    </div>
                </div>
            </div>

            <ul>
                <li><button className="disconnect-btn" onClick={handleDisconnect}>Disconnect Wallet</button></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/all">All Projects</Link></li>
                <li><Link to="/projects/my">Your Projects</Link></li>
                <li><Link to="/projects/funded">Funded Projects</Link></li>
                <li><Link to="/create">Create Project</Link></li>
            </ul>
        </div>
    )
}

export default RightSideBar
