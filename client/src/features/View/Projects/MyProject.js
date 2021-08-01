import React, { useState, useEffect, useContext } from 'react'
import FundModal from '../../../components/modals/FundModal'
import RefundModal from '../../../components/modals/RefundModal'
import { AppContext } from '../../../utils/AppContext'

const MyProject = ({ project, accounts, web3, pIndex }) => {
    const { projects, setProjects } = useContext(AppContext)
    const [amount, setAmount] = useState(null)
    const [funding, setFunding] = useState(0)
    const [open, setOpen] = useState(false)
    const [rOpen, setROpen] = useState(false)

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
        console.log(p)
        return p
    }

    return (
        <div className="project-card">
            <div className="top-tile">
                <h3>{project.projectTitle}</h3>
                <div className="funded">
                    <img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />
                    <p>{project.currentAmount}</p>
                </div>
            </div>


            <p id="desc">{project.projectDesc}</p>
            <p id="deadline">Will be closed on: {getDate(project.deadline)}</p>
            <p id="raised">Amount to be raised:
                <span><img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />{project.goalAmount}</span></p>
            <div className="funding-bar" style={{marginBottom: 0}}>
                <div className="others myproject"
                    style={{ width: `${fundedPercentage(Number(project.currentAmount) - Number(funding))}%` }}>
                    <p className="lbl">Others: {Number(project.currentAmount) - Number(funding)} ETH</p>
                </div>
                <div className="blank"
                    style={{ width: `${fundedPercentage(Number(project.goalAmount) - Number(project.currentAmount))}%` }}>
                    <p className="lbl">Remaining: {Number(project.goalAmount) - Number(project.currentAmount)} ETH</p>
                </div>
            </div>
        </div>
    )
}

export default MyProject
