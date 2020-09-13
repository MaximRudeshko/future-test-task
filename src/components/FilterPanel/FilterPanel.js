import React, {useState} from 'react'
import './FilterPanel.css'

const FilterPanel = ({onSearch}) => {

    const [value, setValue] = useState('')
    const [visible, setVisible] = useState(false)

    const changeValue = e => {
        setValue(e.target.value)
    }

    return(
        <div className = 'input-group__wrapper mr-2 d-flex'>
            <i onClick = {() => setVisible(true)} className={`fa fa-search search ${visible ? 'hide' : ''}`} aria-hidden="true"></i> 
            <div className="input-group mb-3 mt-3">
                
                <input onChange = {changeValue} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                    <button onClick = {() => onSearch(value)} className="btn btn-primary">Search</button>
                </div>
            </div>
        </div>
    )
}

export default FilterPanel


/* {visible 
    ? <i onClick = {() => setVisible(false)} class="fa fa-search search" aria-hidden="true"></i> 
    : <React.Fragment>
        <input onChange = {changeValue} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
        <div className="input-group-append">
            <button onClick = {() => onSearch(value)} className="btn btn-primary">Search</button>
        </div>
      </React.Fragment>} */