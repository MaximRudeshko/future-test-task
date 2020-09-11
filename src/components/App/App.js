import React, { Component } from 'react';
import Loader from '../Loader/Loader';
import Table from '../Table/Table';
import _ from 'lodash';
import PersonDetails from '../PersonDetails/PersonDetails';
import DataSelect from '../DataSelect/DataSelect'

 export default class App extends Component{

  state = {
    data : [],
    loading:true,
    sort: 'asc',
    sortField: 'id',
    row:null,
    dataSelected:false
  }


  async fetchData(url){
    const response = await fetch(url);
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

  onDataSelected = (url) => {
    this.setState({
      dataSelected:true
    })

    this.fetchData(url)
  }


  render(){
    if(!this.state.dataSelected){
      return(
        <div className = 'container'>
          <DataSelect onDataSelected = {this.onDataSelected}/>
        </div>
      )
    }


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


