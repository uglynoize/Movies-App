import React, { useEffect, useState } from "react"
import MovieTags from "./components/movie-tags"
import MovieReleaseDate from "./components/movie-release-date"
import MoviePoster from "./components/movie-poster"
import { addRate, selectRated } from "../../store/reducers/rated-reducer"
import { truncate } from "lodash"
import { RatingRing } from "../rating-ring/rating-ring"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { Rate, Typography } from "antd"
import "./movie-card.css"

const { Title, Paragraph } = Typography

const MovieCard = props => {
  const {
    title,
    overview,
    genreIds,
    posterPath,
    releaseDate,
    usersRating,
    id
  } = props
  const ratedMovies = useAppSelector(selectRated)
  const dispatch = useAppDispatch()

  const [rating, setRating] = useState(0)

  useEffect(() => {
    const rating = ratedMovies[id]?.rate || 0

    setRating(rating)
  }, [id, ratedMovies])

  const rateMovieChange = rate => {
    const ratedMovie = {
      ...props,
      rate
    }

    dispatch(addRate(ratedMovie))
    setRating(rate)
  }

  const overviewContent = truncate(overview, { length: 90, separator: " " })
  const path = `https://image.tmdb.org/t/p/w500${posterPath}`

  return (
      <div className="movie-card">
        <MoviePoster path={path} />
        <div className="movie-card__content">
          <div className={"movie-card__mobile-info"}>
            <Title level={4} style={{ marginTop: 10, paddingRight: 34 }}>
              {title}
            </Title>
            <MovieReleaseDate releaseDate={releaseDate} />
            <MovieTags genreIds={genreIds} />
          </div>
          <Paragraph>{overviewContent}</Paragraph>
          <Rate
              value={rating}
              style={{ fontSize: 20 }}
              count={10}
              allowHalf
              onChange={rateMovieChange}
          />
          <RatingRing
              rating={usersRating}
              style={{ position: "absolute", top: "12px", right: "12px" }}
          />
        </div>
      </div>
  )
}

export default MovieCard
