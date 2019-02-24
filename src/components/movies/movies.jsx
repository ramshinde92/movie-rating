import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import Rating from "../rating/rating";

class Movies extends Component {
  state = {
    movies: []
  };

  //TODO:Test componentDidMount
  componentDidMount() {
    const movies = getMovies();

    this.setState({ movies });
  }

  setRating(movie, rating) {
    const movies = [...this.state.movies];
    const index = movies.findIndex(item => item._id === movie._id);
    movies[index] = { ...movies[index], rating: rating };

    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);

    this.setState({
      movies: sortedMovies
    });
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="row">
        <div className="col">
          {this.state.movies.length ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

export default Movies;
