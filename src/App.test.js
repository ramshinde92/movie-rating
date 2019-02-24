import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App";
import Movies from "./components/movies/movies";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("App should render movies", () => {
  const appComponent = shallow(<App />);
  expect(appComponent.find(Movies)).toBeDefined();
  expect(appComponent.hasClass("App container")).toBeTruthy();
});
