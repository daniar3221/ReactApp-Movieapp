import React from 'react'

interface IGenresContext {
  genres: any
}

const defaultValue = {
  genres: [{ id: 1, name: '' }],
}

const { Provider: GenresProvider, Consumer: GenresConsumer } =
  React.createContext<IGenresContext>(defaultValue)

export { GenresProvider, GenresConsumer }
