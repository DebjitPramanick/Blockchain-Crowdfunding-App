import React from 'react'
import "./style.css"
import {Link} from 'react-router-dom'
import IMAGE from "../../assets/img.png"

const Page = () => {
    return (
        <div className="landing-page-container">
            <div className="navs">
                <Link to="/all">All</Link>
                <Link to="/all">All</Link>
                <Link to="/all">All</Link>
                <Link to="/all">All</Link>
            </div>

            <div className="header">
                <div className="text">
                    <h1>Crowdfunding Applictaion</h1>
                    <p>Fund a project or venture by raising small amounts of money from a 
                        large number of people, typically via the Internet.</p>
                    <Link to="/all" className="start-btn">Get Started</Link>
                </div>
                <div className="image">
                    <img src={IMAGE} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Page
