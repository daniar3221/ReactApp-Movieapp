import React, { Component } from 'react';
import './app.css'
import Header from '../Header/header';
import Movielist from '../Movielist/movielist';
import { Pagination } from 'antd';
import service_API from '../services/services';

import IMovie from '../../types/types';

interface IState {
  movies: Array<IMovie>,
  mode: string,
  page: number,
}

export default class App extends Component {
  state : IState = {
    movies: [],
    mode: 'search',
    page: 1,
  } 

  changeMode = ( value: string ) => {
    this.setState(() => {
      return {
        mode: value
      }
    })
  }
  changePage = (page: number) => {
    this.setState({
      page: page
    })
    service_API(this.state.page).then((res) => this.setState({
      movies: res.results
    }) )
  }

  showData(url: RequestInfo | URL){
    fetch(url).then((res) => res.json()).then((data) => {
      this.setState({
        movies: data.results
    })
    } )
  }

  componentDidMount(){
    service_API(1).then((res) => this.setState({
      movies: res.results
    }) )
  }


  render(){
    const { movies, mode } = this.state
    return (
      <div className='app'>
        < Header mode = { mode } 
        onMode = {(value: string) => this.changeMode(value)}/>
        < Movielist  movies = { movies } />
        < Pagination className='pagination' 
          onChange={(page) => this.changePage(page)} 
          defaultCurrent={1} 
          total={50}
        />
    </div>
    )
  }
}





