import React, { Component, Fragment } from "react";
import { getMovies } from "../../services/fakeMovieService";
import {
  getRandomExclusive,
  getRandomInclusive
} from "../../services/randomNumberService";
import Rating from "../rating/rating";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      randomBtnClicked: false
    };

    this.timer = null;
  }

  componentDidMount() {
    let movies = getMovies();
    movies = movies.sort((a, b) => b.rating - a.rating);

    this.setState({ movies });
  }

  setRating(movie, rating) {
    const movies = [...this.state.movies];
    const index = movies.findIndex(item => item._id === movie._id);
    movies[index] = { ...movies[index], rating };

    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);

    this.setState({
      movies: sortedMovies
    });
  }

  randomize() {
    const movies = [...this.state.movies];

    if (!this.timer) {
      this.timer = setInterval(() => {
        const num = getRandomExclusive(this.state.movies.length);
        const rating = getRandomInclusive(1, 6);

        this.setRating(movies[num], rating);
      }, 2000);
    } else {
      this.stopRandomizing();
    }

    this.setState({
      randomBtnClicked: this.timer ? true : false
    });
  }

  stopRandomizing() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    const { movies, randomBtnClicked } = this.state;
    const modifier = randomBtnClicked ? "dark" : "info";
    const btnText = randomBtnClicked ? "Stop" : "Start";

    return (
      <div className="row">
        <div className="col">
          {movies.length ? (
            <Fragment>
              <table className="table table-dark table-striped table-hover mt-4">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map(movie => {
                    return (
                      <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>
                          <Rating
                            rating={movie.rating}
                            setRating={rating => this.setRating(movie, rating)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p>
                <button
                  className={`btn btn-outline-${modifier} mr-2`}
                  onClick={() => this.randomize()}
                >
                  {btnText} Random Rating
                </button>
              </p>
            </Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Movies;
