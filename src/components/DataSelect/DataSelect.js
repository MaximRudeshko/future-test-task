import React from 'react'


const DataSelect = (props) => {

    const smallData = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
    const bigData = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

    return(
        <div className = 'btn-group'>
            <button className = 'btn btn-success' onClick = {() => props.onDataSelected(smallData)}>Small Data</button>
            <button className = 'btn btn-primary' onClick = {() => props.onDataSelected(bigData)}>Big Data</button>
        </div>
    )
}

export default DataSelect