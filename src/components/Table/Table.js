import React from 'react';
import './Table.css'


const Table = (props) => {

    const arrowType = props.sort === 'desc' ? <i className='fa fa-arrow-down ml-1' aria-hidden="true"></i> : <i className='fa fa-arrow-up ml-1' aria-hidden="true"></i>;

    return (
        <table className="table-bordered table table-hover">
            <thead className = 'bg-primary'>
                <tr>
                <th onClick = {props.onSort.bind(null, 'id')}>ID{props.sortField === 'id' ? arrowType : null}</th>
                <th onClick = {props.onSort.bind(null, 'firstName')}>First Name{props.sortField === 'firstName' ? arrowType : null}</th>
                <th onClick = {props.onSort.bind(null, 'lastName')}>Last Name{props.sortField === 'lastName' ? arrowType : null}</th>
                <th onClick = {props.onSort.bind(null, 'email')}>Email{props.sortField === 'email' ? arrowType : null}</th>
                <th onClick = {props.onSort.bind(null, 'phone')}>Phone{props.sortField === 'phone' ? arrowType : null}</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(row => {
                    return (
                        <tr key = {row.id + Math.random()*10} onClick = {props.onRowSelect.bind(null, row)} >
                            <th>{row.id}</th>
                            <th>{row.firstName}</th>
                            <th>{row.lastName}</th>
                            <th>{row.email}</th>
                            <th>{row.phone}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table