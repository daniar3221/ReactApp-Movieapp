import React from 'react'
// eslint-disable-next-line import/no-named-as-default
import Movieitem from '../Movieitem/movieitem'
import './movielist.css'

interface MovielistProps {
  movies: any
  forGenres: { id: number; name: string }[]
  getRateValue: any
}

function Movielist({ movies, getRateValue }: MovielistProps) {
  const elements = movies.map((item: { id: number }) => {
    return (
      <Movieitem
        getRateValue={(id: number, value: number) => {
          getRateValue(value, id)
        }}
        itemData={item}
        key={item.id}
      />
    )
  })

  return <ul className="movie-list">{elements}</ul>
}

export default Movielist
