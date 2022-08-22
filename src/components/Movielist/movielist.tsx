import React from "react";
import Movieitem from "../Movieitem/movieitem";
import './movielist.css'

interface MovielistProps {
    movies: any,
}


function Movielist ( { movies }: MovielistProps ){

    const elements = movies.map((item: { id: number; }) => {
        return < Movieitem 
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