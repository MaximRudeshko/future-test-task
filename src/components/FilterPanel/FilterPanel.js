import React, {useState} from 'react'

const FilterPanel = (props) => {

    const [value, setValue] = useState('')

    const changeValue = e => {
        setValue(e.target.value)
    }

    return(
        <div className="input-group mb-3 mt-3">
            <input onChange = {changeValue} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
                <button onClick = {() => props.onSearch(value)} className="btn btn-info">Search</button>
            </div>
        </div>
    )
}

export default FilterPanel