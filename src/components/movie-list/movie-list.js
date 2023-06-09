import React from "react"
import { useAppSelector } from "../../store/hooks"
import { selectLoading, selectMovies } from "../../store/reducers/movies-reducer"
import MovieCard from "../movie-card/movie-card"
import { Spin } from "antd"
import "./movie-list.css"

const MovieList = () => {
    const loading = useAppSelector(selectLoading)
    const movies = useAppSelector(selectMovies)
    const isEmpty = !movies.length

    if (loading) {
        return (
            <div className="movie-list_loading">
                <Spin size={"large"} tip="Loading" />
            </div>
        )
    }

    if (isEmpty) {
        return (
            <div className="movie-list_empty">
                <p className={"movie-list__not-found"}>Movies not found</p>
            </div>
        )
    }

    const movieCards = movies.map(movie => {
        return <MovieCard {...movie} key={movie.id} />
    })

    return <div className="movie-list">{movieCards}</div>
}

export default MovieList
