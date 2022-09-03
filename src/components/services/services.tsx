const API_KEY = 'api_key=80ddb0119ef97691044dae9aad3d1bef'

export const service_API = async (page: number) => {
  const responce = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}&${API_KEY}`
  )
  const res = await responce.json()
  console.log(res)
  return res
}

export const getGenres = async () => {
  const responce = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?${API_KEY}&language=en-EN`
  )
  const data = await responce.json()
  return data
}

export const getMovieByName = async (name: string) => {
  if (!name) return null
  const responce = await fetch(
    `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${name}`
  )
  const data = await responce.json()
  return data
}

export const newGuestSession = async () => {
  const responce = await fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=80ddb0119ef97691044dae9aad3d1bef`
  )
  const data = await responce.json()
  return data
}

export const rateMovie = async (
  id: number,
  rateValue: number,
  guestToken: string
) => {
  const responce = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestToken}&api_key=80ddb0119ef97691044dae9aad3d1bef`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rateValue }),
    }
  )
  const result = await responce.json()
  return result
}

export const getRatedMovies = async (sessionID: string) => {
  const responce = await fetch(
    `https://api.themoviedb.org/3/guest_session/${sessionID}/rated/movies?api_key=80ddb0119ef97691044dae9aad3d1bef&language=en-US&sort_by=created_at.asc`
  )
  const data = await responce.json()
  return data
}
