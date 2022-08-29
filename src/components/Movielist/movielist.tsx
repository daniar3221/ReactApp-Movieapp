import React from "react";
import Movieitem from "../Movieitem/movieitem";
import './movielist.css'

interface MovielistProps {
    movies: any,
    forGenres: {id: number, name: string}[],
    getRateValue: any
}


function Movielist ( { movies, forGenres, getRateValue }: MovielistProps ){

    const elements = movies.map((item: { id: number;}) => {
        return < Movieitem 
        getRateValue = {(id: number, value: number) => {getRateValue(value, id)}}
        allGenres = {forGenres}
        itemData = {item}
        key = {item.id} />
         
    })

    return (
        <ul className="movie-list">
            {elements}
        </ul>
    )
}

export default Movielist