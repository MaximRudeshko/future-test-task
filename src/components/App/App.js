import React, { Component } from 'react';
import Loader from '../Loader/Loader';
import Table from '../Table/Table';
import _ from 'lodash';
import PersonDetails from '../PersonDetails/PersonDetails'

 export default class App extends Component{

  state = {
    data : [],
    loading:true,
    sort: 'asc',
    sortField: 'id',
    row:null
  }


  async componentDidMount(){
    const response = await fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
    const data = await response.json();
    this.setState({
      data : _.orderBy(data, this.state.sortField, this.state.sort),
      loading : false
    })
  }

  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';

    const orderedData = _.orderBy(cloneData, sortField, sortType);

    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })
  }

  onRowSelect = row => {
    this.setState({row})
    console.log(row)
  }


  render(){
    return (
      <div className = 'container'>
        {this.state.loading ?
           <Loader/> : <Table 
                          data = {this.state.data} 
                          onSort = {this.onSort}
                          sort = {this.state.sort}
                          sortField = {this.state.sortField}
                          onRowSelect = {this.onRowSelect}
                          />}
        {this.state.row ? <PersonDetails person = {this.state.row}/> : null}
      </div>
    )
  }
}


