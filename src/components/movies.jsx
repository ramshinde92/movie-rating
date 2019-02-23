import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: []
  };

  //TODO:Test componentDidMount
  componentDidMount() {
    const movies = getMovies();

    this.setState({ movies });
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
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.rating}</td>
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
