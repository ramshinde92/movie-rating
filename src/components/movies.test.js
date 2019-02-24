import React from "react";
import { shallow } from "enzyme";
import Movies from "./movies";
import * as movieService from "../services/fakeMovieService";
import Rating from "./rating/rating";

it("should not render if service does not return list", () => {
  const moviesComponent = shallow(<Movies />);
  movieService.getMovies = jest.fn(() => []);
  moviesComponent.instance().componentDidMount();
  expect(moviesComponent.find("table").exists()).toBeFalsy();
});

describe("Movies Component", () => {
  // TODO: Add service code in beforeEach
  // TODO: Add test to check if correct values are passed to children of table or snapshot
  it("should render movies component", () => {
    const moviesComponent = shallow(<Movies />);
    expect(moviesComponent.find(".row")).toBeDefined();

    expect(moviesComponent.length).toEqual(1);
  });

  describe("with data", () => {
    let moviesComponent;
    const movie = {
      _id: "5b21ca3eeb7f6fbccd471815",
      title: "Terminator",
      genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      rating: 0
    };

    beforeEach(() => {
      moviesComponent = shallow(<Movies />);
      movieService.getMovies = jest.fn(() => [movie]);
    });

    it("should update movies array on componentDidMount", () => {
      moviesComponent.instance().componentDidMount();
      expect(movieService.getMovies).toHaveBeenCalled();
      expect(movieService.getMovies).toHaveReturnedWith([movie]);
      expect(moviesComponent.state().movies).toEqual([movie]);
    });

    it("should render list of movies in the form of table", () => {
      expect(moviesComponent.find("table")).toBeDefined();
      expect(
        moviesComponent
          .find("table")
          .hasClass("table table-dark table-striped table-hover")
      ).toBeTruthy();
    });

    it("should render children along with rating", () => {
      const cells = moviesComponent.find("td");
      expect(cells.at(0).html()).toEqual("<td>Terminator</td>");
      expect(cells.at(1).html()).toEqual("<td>Action</td>");
      expect(cells.at(2).find(Rating).length).toEqual(1);
    });

    it("should sort the array of movies with rating number", () => {
      moviesComponent = shallow(<Movies />);
      movieService.getMovies = jest.fn(() => [
        {
          _id: "5b21ca3eeb7f6fbccd471815",
          title: "Terminator",
          genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
          rating: 0
        },
        {
          _id: "5b21ca3eeb7f6fbccd471816",
          title: "Die Hard",
          genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
          rating: 0
        }
      ]);
      moviesComponent.instance().componentDidMount();
      moviesComponent
        .find("tbody")
        .find("tr")
        .at(1)
        .find(Rating)
        .props()
        .setRating(1);

      expect(moviesComponent.state().movies[0].title).toEqual("Die Hard");
    });
  });
});
