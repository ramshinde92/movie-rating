import React from "react";
import { shallow } from "enzyme";
import Movies from "./movies";
import * as movieService from "../services/fakeMovieService";

it("should not render if service does not return list", () => {
  const MoviesComponent = shallow(<Movies />);
  movieService.getMovies = jest.fn(() => []);
  MoviesComponent.instance().componentDidMount();
  console.log(MoviesComponent.debug());
  expect(MoviesComponent.find("table").exists()).toBeFalsy();
});

describe("Movies Component With Data", () => {
  // TODO: Add service code in beforeEach
  // TODO: Add test to check if correct values are passed to children of table or snapshot
  it("should render movies component", () => {
    const MoviesComponent = shallow(<Movies />);
    expect(MoviesComponent.find(".row")).toBeDefined();
    expect(MoviesComponent.length).toEqual(1);
  });

  it("should update movies on componentDidMount", () => {
    const MoviesComponent = shallow(<Movies />);
    const movie = {
      _id: "5b21ca3eeb7f6fbccd471815",
      title: "Terminator",
      genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      rating: 0
    };
    movieService.getMovies = jest.fn(() => [movie]);
    MoviesComponent.instance().componentDidMount();
    expect(movieService.getMovies).toHaveBeenCalled();
    expect(movieService.getMovies).toHaveReturnedWith([movie]);
    expect(MoviesComponent.state().movies).toEqual([movie]);
  });

  it("should render list of movies in the form of table", () => {
    const MoviesComponent = shallow(<Movies />);
    const movie = {
      _id: "5b21ca3eeb7f6fbccd471815",
      title: "Terminator",
      genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      rating: 0
    };
    movieService.getMovies = jest.fn(() => [movie]);
    expect(MoviesComponent.find("table")).toBeDefined();
    expect(
      MoviesComponent.find("table").hasClass(
        "table table-dark table-striped table-hover"
      )
    ).toBeTruthy();
  });
});
