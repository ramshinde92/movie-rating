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
      movies: []
    };

    this.timer = null;
  }

  componentDidMount() {
    const movies = getMovies();

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
  }

  stopRandomizing() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="row">
        <div className="col">
          {this.state.movies.length ? (
            <Fragment>
              <table className="table table-dark table-striped table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    {/* TODO: Sort based on Rating, give user option to sort */}
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
                  className="btn btn-primary mr-2"
                  onClick={() => this.randomize()}
                >
                  Toggle Random Rating
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
