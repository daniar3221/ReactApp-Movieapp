import { Rate } from "antd";
import React from "react";
import './movieitem.css'


function Movieitem ({itemData} : any, id: number){

    const rateStyle = {
        border: '2px solid',
        width: '30px',
        height: '30px',
        borderRadius: '100%',
        borderColor: itemData.vote_average >= 0 && itemData.vote_average <= 3 ? '#E90000' : 
        itemData.vote_average > 3 && itemData.vote_average <= 5 ? '#E97E00' : 
        itemData.vote_average > 5 && itemData.vote_average <= 7 ? '#E9D100' : 
        itemData.vote_average > 7 && itemData.vote_average <= 10 ? '#66E900': '' 
    }

   
    return (
        <div className="movie-item">
            <div className="item-rate" style= {rateStyle}>
                <span className="item-rate-value">{itemData.vote_average}</span>
            </div>
            <div className="item-img">
                <img src={`https://image.tmdb.org/t/p/original/${itemData.poster_path}`} alt="" />
            </div>
            <div className="item-content">
                <h2 className="item-title">{itemData.title}</h2>
                <span className="item-premiere">{itemData.release_date}</span>
                <div className="item-genres"></div>
                <p className="item-description">{itemData.overview}</p>
                <Rate className="item-stars-rate" allowHalf={true} count={10}/>
            </div>
        </div>
    )
}
export default Movieitem
