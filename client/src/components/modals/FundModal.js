import React from 'react'
import "./style.css"
import CancelIcon from '@material-ui/icons/Cancel';

const FundModal = (props) => {

    const { setOpen, amount, setAmount, fund, desc, title } = props

    return (
        <div className="modal-container">
            <div className="modal-box">
                <h2>Fund Project</h2>
                <CancelIcon className="close-icon" onClick={() => setOpen(false)} />
                <h4 className="pr-title">{title}</h4>
                <p className="pr-desc">{desc}</p>

                <input placeholder="Enter amount"
                    className="pr-fund"
                    value={amount ? amount : ''}
                    onChange={(e) => setAmount(e.target.value)}>
                </input>
                <button className="pr-fund-btn" onClick={fund}>Fund</button>
            </div>
        </div>
    )
}

export default FundModal
