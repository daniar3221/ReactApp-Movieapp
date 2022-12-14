import React from 'react'
import SearchInput from '../Search-input/search-input'
import './header.css'

interface HeaderProps {
  mode: string
  onMode: any
  getMovieName: any
}

function Header({ mode, onMode, getMovieName }: HeaderProps) {
  function changeStyleActive(id: number) {
    const buttonsNode = document.querySelectorAll('.btn-filter')
    const btnArr = [...buttonsNode]
    btnArr.map(item => item.classList.remove('active'))
    btnArr[id].classList.add('active')
  }

  return (
    <div className="header">
      <nav>
        <button
          type="button"
          className="btn btn-filter active"
          id="1"
          onClick={() => {
            onMode('search')
            changeStyleActive(0)
          }}
        >
          Search
        </button>
        <button
          type="button"
          className="btn btn-filter"
          id="2"
          onClick={() => {
            onMode('rated')
            changeStyleActive(1)
          }}
        >
          Rated
        </button>
      </nav>
      {mode === 'search' ? (
        <SearchInput
          getMovieName={(movieName: any) => {
            getMovieName(movieName)
          }}
        />
      ) : null}
    </div>
  )
}

export default Header
