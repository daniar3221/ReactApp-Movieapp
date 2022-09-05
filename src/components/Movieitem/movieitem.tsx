import { Rate } from 'antd'
import React, { Component } from 'react'
import './movieitem.css'
import { format } from 'date-fns'

import { GenresConsumer } from '../get-genres-context/get-genres-context'

interface MovieItemProps {
  itemData: any
  getRateValue: any
}

class Movieitem extends Component<MovieItemProps> {
  state = {
    rate: 0,
  }

  keyForGenre = 1

  MoviePoster = (itemData: { poster_path: string }) => {
    return (
      <img
        src={`https://image.tmdb.org/t/p/original/${itemData.poster_path}`}
        alt="Poster"
      />
    )
  }

  NoPosterDiv = () => {
    return (
      <div className="no-poster">
        <h1>
          {' '}
          NO <br />
          POSTER
        </h1>
      </div>
    )
  }

  updateGenres = (itemData: { genre_ids: number[] }) => {
    return (
      <GenresConsumer>
        {({ genres }) => {
          if (genres === undefined || genres === null) return null

          const genresArr = itemData.genre_ids.map((itemID: number) => {
            // eslint-disable-next-line no-plusplus
            this.keyForGenre++
            const genreNames = genres.map((obj: any) => {
              if (obj.id === itemID) {
                return obj.name
              }
              return null
            })
            return (
              <span key={this.keyForGenre} className="genre-span">
                {genreNames}
              </span>
            )
          })
          return genresArr
        }}
      </GenresConsumer>
    )
  }

  PremiereSpan = ({ release_date }: any) => {
    return (
      <>
        {format(new Date(release_date), 'd')}{' '}
        {format(new Date(release_date), 'LLLL')}, {release_date.slice(0, 4)}
      </>
    )
  }

  render() {
    const { itemData, getRateValue } = this.props

    const ItemImg = () => {
      return itemData.poster_path
        ? this.MoviePoster(itemData)
        : this.NoPosterDiv()
    }

    const rateStyle = (data: { vote_average: number }) => {
      return {
        border: '2px solid',
        width: '30px',
        height: '30px',
        borderRadius: '100%',
        borderColor:
          data.vote_average >= 0 && data.vote_average <= 3
            ? '#E90000'
            : data.vote_average >= 3 && data.vote_average < 5
            ? '#E97E00'
            : data.vote_average >= 5 && data.vote_average < 7
            ? '#E9D100'
            : data.vote_average >= 7 && data.vote_average < 10
            ? '#66E900'
            : '',
      }
    }

    const putValue = () => {
      const defaultValue = itemData.rating ? itemData.rating : this.state.rate
      return defaultValue
    }

    return (
      <div className="movie-item">
        <div className="item-rate" style={rateStyle(itemData)}>
          <span className="item-rate-value">
            {itemData.vote_average.toFixed(1)}
          </span>
        </div>
        <div className="item-img">
          <ItemImg />
        </div>
        <div className="item-content">
          <h2 className="item-title">{itemData.title}</h2>
          {itemData.release_date ? this.PremiereSpan(itemData) : null}
          <div className="item-genres">{this.updateGenres(itemData)}</div>
          <p className="item-description">{itemData.overview}</p>
          <Rate
            className="item-stars-rate"
            value={putValue()}
            onChange={rateValue => {
              console.log(rateValue, itemData.id)
              getRateValue(rateValue, itemData.id)
              this.setState({ rate: rateValue })
            }}
            allowHalf={true}
            count={10}
          />
        </div>
      </div>
    )
  }
}
export default Movieitem
