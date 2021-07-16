import React, { useContext } from 'react'
import { AppContext } from '../../utils/AppContext'
import "./style.css"
import LeftSideBar from '../../components/LeftSideBar'
import RightSideBar from '../../components/RightSideBar'
import Project from './Project'

const AllProjects = () => {

    const { projects, accounts, web3 } = useContext(AppContext)



    return (
        <div className="main-container">
            <img className="banner-img" src='https://truust.io/wp-content/uploads/sites/18/2020/09/Crowdfunding-1.jpg' alt="banner"/>

            <div className="tri-div-view">
                <LeftSideBar />
                <div className="cards">
                    {projects.map(p => (
                        <Project 
                        project={p}
                        accounts={accounts}
                        web3={web3}/>
                    ))}
                </div>
                <RightSideBar />
            </div>
        </div>
    )
}

export default AllProjects
