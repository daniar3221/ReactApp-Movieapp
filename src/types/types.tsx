export default interface IMovie {
    adult: boolean,
    backdrop_path: string,
    genres_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release : string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}