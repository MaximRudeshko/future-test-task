import React, { Component } from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate'
import Loader from '../Loader/Loader';
import Table from '../Table/Table';
import PersonDetails from '../PersonDetails/PersonDetails';
import DataSelect from '../DataSelect/DataSelect';
import FilterPanel from '../FilterPanel/FilterPanel';


 export default class App extends Component{

  state = {
    data : [],
    loading:true,
    sort: 'asc',
    sortField: 'id',
    row:null,
    dataSelected:false,
    currentPage: 0,
    search: ''
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
  }

  onDataSelected = (url) => {
    this.setState({
      dataSelected:true
    })

    this.fetchData(url)
  }

  onPageChange = ({selected}) => {
    this.setState({
      currentPage:selected
    })
  }

  onSearch = (str) => {
    this.setState({
      search: str,
      currentPage: 0
    })
  }

  onFilter = () => {
    const {data , search} = this.state;

    if(!search){
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
            || item['lastName'].toLowerCase().includes(search.toLowerCase())
            || item['email'].toLowerCase().includes(search.toLowerCase())
            || item['phone'].toLowerCase().includes(search.toLowerCase())
    })
  }


  render(){
    if(!this.state.dataSelected){
      return(
        <div className = 'container'>
          <DataSelect onDataSelected = {this.onDataSelected}/>
        </div>
      )
    }

    const pageSize = 50;

    const filteredData = this.onFilter()

    const pageCount = Math.ceil(filteredData.length / pageSize)

    const view = _.chunk(filteredData, pageSize)[this.state.currentPage]

    return (
      <div className = 'container'>
        
        {this.state.loading 
          ? <Loader/> 
          : <React.Fragment>
              <FilterPanel onSearch = {this.onSearch}/>
              <Table 
                  data = {view} 
                  onSort = {this.onSort}
                  sort = {this.state.sort}
                  sortField = {this.state.sortField}
                  onRowSelect = {this.onRowSelect}
              />
            </React.Fragment>
        }                 

        {this.state.data.length > pageSize 
          ? <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={5}
          pageRangeDisplayed={20}
          onPageChange={this.onPageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-link'}
          nextClassName={'page-link'}
          forcePage = {this.state.currentPage}
        /> : null
        }          
        
        {this.state.row 
          ? <PersonDetails person = {this.state.row}/> : null}

      </div>
    )
  }
}


