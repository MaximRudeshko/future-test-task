import React from 'react'
import './DataSelect.css'


const DataSelect = ({onDataSelected}) => {

    const smallData = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    const bigData = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

    return(
        <React.Fragment>
            <h1 className = 'p-5 d-flex justify-content-center'>Future  Test Task</h1>
            <div className = 'btn-group'>
                <button className = 'btn btn-success' onClick = {() => onDataSelected(smallData)}>Small Data</button>
                <button className = 'btn btn-primary' onClick = {() => onDataSelected(bigData)}>Big Data</button>
            </div>
        </React.Fragment>
    )
}

export default DataSelect