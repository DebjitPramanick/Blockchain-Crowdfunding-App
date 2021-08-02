import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../utils/AppContext'

const MyProject = ({ project, accounts }) => {

    const {web3} = useContext(AppContext)

    const [funding, setFunding] = useState(0)

    const getDate = (date) => {
        let d = new Date(date * 1000)
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }

    useEffect(() => {
        const getFundingAmount = () => {
            let projectContract = project.contract
            projectContract.methods.contributions(accounts[0]).call()
                .then(res => setFunding(Number(res)))
        }

        if (project) {
            getFundingAmount()
        }

    }, [])

    const fundedPercentage = (fund) => {
        let total = Number(project.goalAmount)
        fund = Number(fund)
        let p = (fund / total) * 100
        return p
    }

    const ethValue = (wei) => {
        let res = web3.utils.fromWei(wei, 'ether')
        return res
    }
    const getDiff = (w1, w2) => {
        console.log(w1, w2)
        w1 = Math.floor(Number(web3.utils.fromWei(w1, 'ether')))
        w2 = Math.floor(Number(web3.utils.fromWei(w2, 'ether')))
        console.log(w1, w2, Math.abs(w1-w2))
        return Math.abs(w1-w2)
    }

    return (
        <div className="project-card">
            <div className="top-tile">
                <h3>{project.projectTitle}</h3>
                <div className="funded">
                    <img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />
                    <p>{ethValue(project.currentAmount)}</p>
                </div>
            </div>


            <p id="desc">{project.projectDesc}</p>
            <p id="deadline">Will be closed on: {getDate(project.deadline)}</p>
            <p id="raised">Amount to be raised:
                <span><img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />{ethValue(project.goalAmount)}</span></p>
            <div className="funding-bar" style={{ marginBottom: 0 }}>
                <div className="others myproject"
                    style={{ width: `${fundedPercentage(Number(project.currentAmount) - Number(funding))}%` }}>
                    <p className="lbl">Others: {getDiff(project.currentAmount, String(funding))} ETH</p>
                </div>
                <div className="blank"
                    style={{ width: `${fundedPercentage(Number(project.goalAmount) - Number(project.currentAmount))}%` }}>
                    <p className="lbl">Remaining: {getDiff(project.goalAmount, project.currentAmount)} ETH</p>
                </div>
            </div>
        </div>
    )
}

export default MyProject
