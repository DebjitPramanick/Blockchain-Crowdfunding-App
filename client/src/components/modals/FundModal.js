import React from 'react'
import "./style.css"

const FundModal = ({ setOpen, amount, setAmount, fund }) => {
    return (
        <div className="modal-container">
            <div className="modal-box">
                <h1>Fund Project</h1>

                <input placeholder="Enter amount"
                    value={amount ? amount : ''}
                    onChange={(e) => setAmount(e.target.value)}></input>
            </div>
        </div>
    )
}

export default FundModal
