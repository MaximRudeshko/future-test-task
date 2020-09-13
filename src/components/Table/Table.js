import React from 'react';
import './Table.css'

const Table = ({sort, onSort, sortField, data, onRowSelect}) => {

    const arrowType = sort === 'desc' ? <i className='fa fa-arrow-down ml-1' aria-hidden="true"></i> : <i className='fa fa-arrow-up ml-1' aria-hidden="true"></i>;

    return (
        <table className="table-bordered table table-hover">
            <thead className = 'bg-primary'>
                <tr>
                <th onClick = {onSort.bind(null, 'id')}>ID{sortField === 'id' ? arrowType : null}</th>
                <th onClick = {onSort.bind(null, 'firstName')}>First Name{sortField === 'firstName' ? arrowType : null}</th>
                <th onClick = {onSort.bind(null, 'lastName')}>Last Name{sortField === 'lastName' ? arrowType : null}</th>
                <th onClick = {onSort.bind(null, 'email')}>Email{sortField === 'email' ? arrowType : null}</th>
                <th onClick = {onSort.bind(null, 'phone')}>Phone{sortField === 'phone' ? arrowType : null}</th>
                </tr>
            </thead>
            <tbody>
               {data ?  data.map(row => {
                    return (
                        <tr key = {row.id + Math.random()*1000} onClick = {() => onRowSelect(row)} >
                            <th>{row.id}</th>
                            <th>{row.firstName}</th>
                            <th>{row.lastName}</th>
                            <th>{row.email}</th>
                            <th>{row.phone}</th>
                        </tr>
                    )
                }) : null }
            </tbody>
        </table>
    )
}

export default Table