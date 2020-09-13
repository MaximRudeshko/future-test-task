import React from 'react'
import './AddItem.css'


const AddItemBtn = ({openModal}) => {

    return (
        <button className = 'add-btn btn btn-success mt-3 mb-3' onClick = {() => openModal()}>Add Item</button>
    )
}

export default AddItemBtn