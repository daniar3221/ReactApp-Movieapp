import React, { Component } from 'react'
import './app.css'
import { Pagination } from 'antd'
import Header from '../Header/header'
import Movielist from '../Movielist/movielist'
import {
  service_API,
  getGenres,
  getMovieByName,
  rateMovie,
  newGuestSession,
  getRatedMovies,
} from '../services/services'
import Spinner from '../Spiner/spiner'

import { GenresProvider } from '../get-genres-context/get-genres-context'

import IMovie from '../../types/types'

interface IState {
  movies: Array<IMovie>
  mode: string
  page: number
  loading: boolean
  error: boolean
  allGenres: { genres: Array<{ id: number; name: string }> }
  totalResults: number
  searchMovieName: string
  guestToken: string
  noMoviesFound: boolean
}

export default class App extends Component {
  state: IState = {
    movies: [],
    mode: 'search',
    page: 1,
    loading: true,
    error: false,
    allGenres: {
      genres: [{ id: 1, name: '' }],
    },
    totalResults: 0,
    searchMovieName: '',
    guestToken: '',
    noMoviesFound: false,
  }

  onError = () => {
    console.log('Something gone wrong')
  }

  changeMode = (value: string) => {
    this.setState({ mode: value })
    if (value === 'rated') {
      getRatedMovies(this.state.guestToken).then(({ results }) => {
        this.setState({
          movies: results,
        })
      })
    } else {
      this.changePage(this.state.page)
    }
  }

  changePage = (page: number) => {
    this.setState({
      page,
      loading: true,
    })

    service_API(page).then(res =>
      this.setState({
        movies: res.results,
        loading: false,
      })
    )
  }

  onSearchMovieName = (movieName: string) => {
    if (!movieName) {
      this.setState({
        noMoviesFound: false,
      })
      this.changePage(this.state.page)
    }
    getMovieByName(movieName)
      .then(data => {
        if (data.results.length === 0) {
          this.setState({
            noMoviesFound: true,
          })
        } else {
          this.setState({
            noMoviesFound: false,
          })
        }
        this.setState({
          movies: data.results,
        })
      })
      .catch(() => {
        console.log('problem')
      })
  }

  onRateMovie = (rateValue: number, id: number) => {
    rateMovie(id, rateValue, this.state.guestToken)
  }

  NoMoviesFoundText = () => {
    return <span className="no-movies-span">Nothing found on your request</span>
  }

  componentDidMount() {
    newGuestSession().then(sessionID => {
      this.setState({
        guestToken: sessionID.guest_session_id,
      })
    })
    service_API(this.state.page)
      .then(res =>
        this.setState({
          movies: res.results,
          loading: false,
          totalResults: res.total_pages,
        })
      )
      .catch(() => {
        this.setState({
          error: true,
        })
      })
    getGenres().then(res => {
      this.setState({
        allGenres: res,
      })
    })
  }

  render() {
    const { movies, mode, loading, noMoviesFound } = this.state

    return (
      <div className="app">
        <GenresProvider value={this.state.allGenres}>
          <Header
            mode={mode}
            onMode={(value: string) => this.changeMode(value)}
            getMovieName={(movieName: string) => {
              this.onSearchMovieName(movieName)
            }}
          />

          {loading ? (
            <Spinner />
          ) : noMoviesFound ? (
            <this.NoMoviesFoundText />
          ) : (
            <Movielist
              movies={movies}
              getRateValue={(id: number, rateValue: number) =>
                this.onRateMovie(rateValue, id)
              }
              forGenres={[]}
            />
          )}

          <Pagination
            className="pagination"
            onChange={page => this.changePage(page)}
            pageSize={20}
            total={this.state.totalResults}
            showSizeChanger={false}
          />
        </GenresProvider>
      </div>
    )
  }
}
