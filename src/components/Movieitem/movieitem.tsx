import { Rate } from "antd";
import React from "react";
import './movieitem.css'
import { compareAsc, format } from 'date-fns'

import { GenresConsumer } from '../get-genres-context/get-genres-context';


interface MovieItemProps {
    itemData: any,
    allGenres: any,
    getRateValue: any
}

function Movieitem ({ itemData, allGenres, getRateValue } : MovieItemProps, id: number){

    
    
    const {genres} = allGenres 

    const rateStyle = {
        border: '2px solid',
        width: '30px',
        height: '30px',
        borderRadius: '100%',
        borderColor: itemData.vote_average >= 0 && itemData.vote_average <= 3 ? '#E90000' : 
        itemData.vote_average >= 3 && itemData.vote_average < 5 ? '#E97E00' : 
        itemData.vote_average >= 5 && itemData.vote_average < 7 ? '#E9D100' : 
        itemData.vote_average >= 7 && itemData.vote_average < 10 ? '#66E900': '' 
    }

   
 
    const PremiereSpan = () => {
        return(
            <span className="item-premiere">
                {format(new Date(itemData.release_date), 'd')} {format(new Date(itemData.release_date), 'LLLL')}, {premiereYear}
            </span>  
        )
    }

    const MoviePoster = () => {
        return (
            <img src={`https://image.tmdb.org/t/p/original/${itemData.poster_path}`} alt="Poster" />
        )
    }

    const NoPosterDiv = () => {
        return (
            <div className="no-poster">
                <h1>   NO <br />
                    POSTER
                 </h1>
            </div>
        )
    }

    const putDefaultValue = () => {
        const defaultValue = itemData.rating ? itemData.rating : null 
        return defaultValue
    }

    const premiereYear = itemData.release_date  ? itemData.release_date.slice(0, 4)  : null
    let keyForGenre = 1



    const updateGenres = () => {
        return (
            <GenresConsumer>
                {
                    ({genres}) =>{
                        if (genres === undefined) return null
        
                            const genresArr = itemData.genre_ids.map((itemID: number) => {
                                keyForGenre++
                                const genreNames = genres.map((obj : any) => {
                                    if (obj['id'] === itemID){
                                        return obj['name']
                                    }
                                    return null
                                })
                                return (
                                    <span key={keyForGenre} className = 'genre-span'>
                                        {genreNames}
                                    </span>
                                )
                })
                return genresArr
                    }
                }
            </GenresConsumer>
        )
    }



  

    
    
      
    return (
        <div className="movie-item">
            <div className="item-rate" style = {rateStyle}>
                <span className="item-rate-value">{itemData.vote_average.toFixed(1)}</span>
            </div>
            <div className="item-img">
                {itemData.poster_path ? <MoviePoster/> : <NoPosterDiv/>}
            </div>
            <div className="item-content">
                <h2 className="item-title">{itemData.title}</h2>
                {itemData.release_date ? <PremiereSpan /> : null}
                <div className="item-genres">{updateGenres()}</div>
                <p className="item-description">{itemData.overview}</p>
                <Rate className="item-stars-rate" 
                    defaultValue = {putDefaultValue()}
                    onChange={(rateValue)=> getRateValue(rateValue, itemData.id)} 
                    allowHalf={true} 
                    count={10}
                />
            </div>
        </div>
    )
}
export default Movieitem
