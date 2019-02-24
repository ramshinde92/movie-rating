import * as movieService from "./fakeMovieService";

it("should return movies", () => {
  const movies = [
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
  ];

  movieService.getMovies = jest.fn(() => movies);

  expect(movieService.getMovies().length).toEqual(2);
  expect(movieService.getMovies()).toEqual(movies);
});
