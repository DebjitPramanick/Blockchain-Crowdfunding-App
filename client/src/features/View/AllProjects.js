import React, { useContext } from 'react'
import { AppContext } from '../../utils/AppContext'
import "./style.css"
import LeftSideBar from '../../components/LeftSideBar'
import RightSideBar from '../../components/RightSideBar'

const AllProjects = () => {

    const { projects } = useContext(AppContext)

    const getDate = (date) => {
        let d = new Date(date*1000)
        return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
    }

    return (
        <div className="main-container">
            <h2>All Rpojects...</h2>

            <div className="tri-div-view">
                <LeftSideBar />
                <div className="cards">
                    {projects.map(p => (
                        <div className="project-card">
                            <h3>{p.projectTitle}</h3>
                            <div className="funded">
                                <img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />
                                <p>{p.curAmount}</p>
                            </div>
                            
                            <p id="desc">{p.projectDesc}</p>
                            <p id="deadline">Will be closed on: {getDate(p.deadline)}</p>
                            <p id="raised">Amount to be raised: 
                            <span><img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />{p.goalAmount}</span></p>
                            <div className="fund-box">
                                <input></input>
                                <button>Fund</button>
                            </div>
                        </div>
                    ))}
                </div>
                <RightSideBar />
            </div>
        </div>
    )
}

export default AllProjects
