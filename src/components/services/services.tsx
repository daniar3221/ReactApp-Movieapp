import React from "react";

const API_KEY = 'api_key=80ddb0119ef97691044dae9aad3d1bef'
const service_API = (page: number) => {
    return fetch( `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}&${API_KEY}`)
    .then((responce) => responce.json()).then((res) => res)
}

export default service_API