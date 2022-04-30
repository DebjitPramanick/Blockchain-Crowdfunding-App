import React, {useContext} from 'react'
import "./style.css"
import CancelIcon from '@material-ui/icons/Cancel';
import { AppContext } from '../../utils/AppContext';

const FundModal = (props) => {

    const { setOpen, amount, setAmount, fund, desc, title, targetAmt, curAmt } = props
    const {web3} = useContext(AppContext)

    const ethValue = (wei) => {
        let res = web3.utils.fromWei(wei, 'ether')
        return res
    }
    const canFund = ethValue(targetAmt) - ethValue(curAmt)
    
    return (
        <div className="modal-container">
            <div className="modal-box">
                <h2>Fund Project</h2>
                <CancelIcon className="close-icon" onClick={() => setOpen(false)} />
                <h4 className="pr-title">{title}</h4>
                <p className="pr-desc">{desc}</p>
                <p className="fund-modal">You can fund: <span>{canFund} ETH</span></p>

                <input placeholder="Enter amount"
                    className="pr-fund"
                    value={amount ? amount : ''}
                    onChange={(e) => {
                        let eth = Number(e.target.value)
                        if(eth<=canFund){
                            setAmount(e.target.value)
                        }
                        else{
                            alert(`You can not fund more than requirement.`)
                        }
                        
                    }}>
                </input>
                <button className="pr-fund-btn" onClick={fund}>Fund</button>
            </div>
        </div>
    )
}

export default FundModal
