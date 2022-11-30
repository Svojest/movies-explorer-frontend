import React from 'react'
import SearchForm from './SearchForm/SearchForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'

const Movies = () => {
  return (
    <section className='movies'>
      <SearchForm/>
      <MoviesCardList saved={false} />
    </section>
  )
}

export default Movies