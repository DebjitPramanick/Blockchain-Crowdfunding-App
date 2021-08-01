import React from 'react'
import "./style.css"

const Header = (props) => {

    return (
        <div className="header-container">
            <div className="search-bar">
                <h1>{props.title}</h1>
                <input
                    type="search"
                    value={props.query}
                    onChange={(e) => props.setQuery(e.target.value)}
                    placeholder="Search Project"></input>
            </div>
            <div className="tools">
                <div className="sorting">
                    <p>Sort by:</p>
                    <select value={0} 
                    onChange={(e) => props.setSortingIdx(Number(e.target.value))}>
                        <option value={0}>None</option>
                        <option value={1}>Project Title</option>
                        <option value={2}>Raised Amount</option>
                        <option value={3}>Closing Date</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Header
