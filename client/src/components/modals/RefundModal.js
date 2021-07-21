import React from 'react'
import "./style.css"
import CancelIcon from '@material-ui/icons/Cancel';

const RefundModal = (props) => {

    const { setROpen, project, refund } = props

    const isExpired = () => {
        let d = new Date().getMilliseconds()
        if(d>=project.deadline) return true
        return false
    }

    const getRange = () => {
        let d = new Date().getTime()
        let dif = (Number(project.deadline)*1000 - d) / (1000 * 3600 * 24)
        return Math.floor(dif)
    }

    return (
        <div className="modal-container">
            <div className="modal-box">
                <h2>Refund Project</h2>
                <CancelIcon className="close-icon" onClick={() => setROpen(false)} />
                <h4 className="pr-title">{project.projectTitle}</h4>
                <p className="pr-desc">{project.projectDesc}</p>

                {isExpired() ? (
                    <button className="pr-fund-btn" onClick={refund}>Refund</button>
                ) : <p className="exp-msg">You will be able to refund your money if this project is not marked as
                    complete within {getRange()} days. </p>}
            </div>
        </div>
    )
}

export default RefundModal
