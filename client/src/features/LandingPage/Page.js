import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import IMAGE from "../../assets/img.png"

const Page = () => {
    return (
        <div className="landing-page-container">
            <div className="navs">
                <div className="logo">
                    <img src={IMAGE} alt="" width={40}/>
                    <h2>BlockFund</h2>
                </div>
                <div className="links">
                    <Link to="/all">All Projects</Link>
                    <Link to="/login" className="login-btn">Login</Link>
                </div>
            </div>

            <div className="header">
                <div className="text">
                    <h1>Crowdfunding Applictaion</h1>
                    <p>Fund a project or venture by raising small amounts of money from a
                        large number of people, typically via the Internet.</p>
                    <Link to="/all" className="start-btn">Get Started</Link>
                </div>
                <div className="image">
                    <img src={IMAGE} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Page
