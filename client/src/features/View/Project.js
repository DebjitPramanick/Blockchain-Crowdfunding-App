import React, {useState} from 'react'

const Project = ({ project, accounts, web3 }) => {

    const [amount, setAmount] = useState(null)

    const getDate = (date) => {
        let d = new Date(date * 1000)
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
    }

    console.log(project)

    const fundProject = () => {
        let projectContract = project.contract
        project.isLoading = true
        projectContract.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(amount, 'ether'),
        }).then(res => {
            console.log(res.events)
            const newTotal = parseInt(res.events.FundReceived.returnValues.curTotal, 10);
            const projectGoal = parseInt(project.goalAmount, 10);
            console.log(newTotal)
            project.curAmount = newTotal
            project.isLoading = false
            if (newTotal >= projectGoal) {
                project.currentState = 2;
            }
            // window.location.reload()
        })
    }

    return (
        <div className="project-card">
            <h3>{project.projectTitle}</h3>
            <div className="funded">
                <img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />
                <p>{project.curAmount}</p>
            </div>

            <p id="desc">{project.projectDesc}</p>
            <p id="deadline">Will be closed on: {getDate(project.deadline)}</p>
            <p id="raised">Amount to be raised:
                <span><img className="ethIcon" src="https://img.icons8.com/fluent/48/000000/ethereum.png" />{project.goalAmount}</span></p>
            <div className="fund-box">
                <input placeholder="Enter amount"
                value={amount ? amount: ''}
                onChange={(e) => setAmount(e.target.value)}></input>
                <button onClick={fundProject}>Fund</button>
            </div>
        </div>
    )
}

export default Project
