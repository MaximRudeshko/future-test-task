import React, { Component } from 'react';
import _ from 'lodash';
import './App.css'
import ReactPaginate from 'react-paginate'
import Loader from '../Loader/Loader';
import Table from '../Table/Table';
import PersonDetails from '../PersonDetails/PersonDetails';
import DataSelect from '../DataSelect/DataSelect';
import FilterPanel from '../FilterPanel/FilterPanel';
import AddItemBtn from '../AddItem/AddItem';
import Modal from '../modal/Modal';


 export default class App extends Component{

  state = {
    data : [],
    loading:true,
    sort: 'asc',
    sortField: 'id',
    row:null,
    dataSelected:false,
    currentPage: 0,
    search: '',
    isModalOpen: false,
    error: false
  }

  async fetchData(url){
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        data : _.orderBy(data, this.state.sortField, this.state.sort),
        loading : false
      })
    } catch (error) {
      this.setState({
        error:true,
        loading:false
      })
    }

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

  toggleModal = () => {
    this.setState(({isModalOpen}) => {
      return{
        isModalOpen:!isModalOpen
      }
    })
  }

  addItem = (item) => {
    const newItem = item

    this.setState(({data}) => {
      const newArr = [newItem, ...data]
      return {
        data: newArr
      }
    })

    this.toggleModal()
  }

  render(){

    const {dataSelected, currentPage, loading, sort, sortField, data, row, isModalOpen, error} = this.state

    if(!dataSelected){
      return(
        <div className = 'container'>
          <DataSelect onDataSelected = {this.onDataSelected}/>
        </div>
      )
    }

    const pageSize = 50;

    const filteredData = this.onFilter()

    const pageCount = Math.ceil(filteredData.length / pageSize)

    const view = _.chunk(filteredData, pageSize)[currentPage]

    if(error){
      return <h2 className = 'error'>Oops... Something has gone wrong</h2>
    }

    return (
      <div className = 'container'>
        {loading 
          ? <Loader/> 
          : <React.Fragment>
              <div className = 'row w-100 m-0'>
                  <FilterPanel onSearch = {this.onSearch}/>
                  <AddItemBtn openModal = {this.toggleModal}/>
              </div>
              <Table 
                  data = {view} 
                  onSort = {this.onSort}
                  sort = {sort}
                  sortField = {sortField}
                  onRowSelect = {this.onRowSelect}
              />
            </React.Fragment>
        }                 

        {data.length > pageSize && view && pageCount > 1 
          ? <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={pageCount}
          pageRangeDisplayed={pageCount}
          onPageChange={this.onPageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-link'}
          nextClassName={'page-link'}
          forcePage = {currentPage}
        /> : null
        }          
        
        {row 
          ? <PersonDetails person = {row}/> : null}

        <Modal isModalOpen = {isModalOpen} closeModal = {this.toggleModal} addItem = {this.addItem}/>
      </div>
    )
  }
}


