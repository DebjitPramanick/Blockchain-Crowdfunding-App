import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../utils/AppContext'

const Project = ({ project, accounts, web3, pIndex }) => {

    const { projects, setProjects } = useContext(AppContext)
    const [amount, setAmount] = useState(null)
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

    const fundProject = () => {
        let projectContract = project.contract
        project.isLoading = true

        projectContract.methods.contribute().send({
            from: accounts[0],
            value: amount,
        }).then(res => {
            console.log(res.events)
            const newTotal = parseInt(res.events.FundReceived.returnValues.currentTotal, 10);
            const projectGoal = parseInt(project.goalAmount, 10);

            project = { ...project, currentAmount: newTotal, isLoading: false }
            if (newTotal >= projectGoal) {
                project.currentState = 2;
            }

            let np = projects
            np[pIndex] = project
            setProjects(np)
            window.location.reload()

        })
    }

    const refund = () => {
        let projectContract = project.contract
        projectContract.methods.getRefund().send({
            from: accounts[0]
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
    }

    return (
        <div className="project-card">
            <h3>{project.projectTitle}</h3>
            <div className="funded">
                <img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />
                <p>{project.currentAmount}</p>
            </div>

            <p id="desc">{project.projectDesc}</p>
            <p id="deadline">Will be closed on: {getDate(project.deadline)}</p>
            <p id="raised">Amount to be raised:
                <span><img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />{project.goalAmount}</span></p>
            <div className="fund-box">
                <input placeholder="Enter amount"
                    value={amount ? amount : ''}
                    onChange={(e) => setAmount(e.target.value)}></input>
                <button onClick={fundProject}>Fund</button>
            </div>

            {funding !== 0 && (
                <div className="refund-box">
                    <button onClick={refund}>Refund</button>
                </div>
            )}
        </div>
    )
}

export default Project
