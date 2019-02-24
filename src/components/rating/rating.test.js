import React from "react";
import Rating from "./rating";
import { shallow } from "enzyme";

describe("rating component => ", () => {
  //TODO: cover tempRating
  const dummysetRating = jest.fn();
  it("should render rating component", () => {
    const ratingComponent = shallow(<Rating setRating={dummysetRating} />);
    expect(ratingComponent.find(".rating").length).toEqual(1);
  });

  it("should render rating with list of five stars", () => {
    const ratingComponent = shallow(<Rating setRating={dummysetRating} />);
    const wrapper = ratingComponent.find(".rating");
    expect(wrapper.find("li.rating-list-item").length).toEqual(5);
    expect(
      wrapper
        .find("li.rating-list-item")
        .at(0)
        .children()
        .html()
    ).toEqual('<label class="rating-star">★</label>');
  });

  it("should update rating on MouseOver event", () => {
    const ratingComponent = shallow(<Rating setRating={dummysetRating} />);
    const first = ratingComponent.find("label.rating-star").at(0);
    first.simulate("mouseover");
    expect(ratingComponent.state().rating).toEqual(1);
  });

  it("should reset the rating on MouseOut event", () => {
    const ratingComponent = shallow(<Rating setRating={dummysetRating} />);
    const third = ratingComponent.find("label.rating-star").at(2);
    third.simulate("mouseover");
    expect(ratingComponent.state().rating).toEqual(3);
    third.simulate("mouseout");
    expect(ratingComponent.state().rating).toEqual(null);
  });

  it("should set the rating on Click of star", () => {
    const ratingComponent = shallow(<Rating setRating={dummysetRating} />);
    const third = ratingComponent.find("label.rating-star").at(2);
    third.simulate("click");
    expect(ratingComponent.state().rating).toEqual(3);
  });

  it("should apply hovered class on mouseover event", () => {
    const ratingComponent = shallow(<Rating setRating={dummysetRating} />);
    const first = ratingComponent.find("label.rating-star").at(0);
    first.simulate("mouseover");
    expect(
      ratingComponent
        .find("label.rating-star")
        .at(0)
        .hasClass("hovered")
    ).toBeTruthy();
  });

  it("should update rating when passed as prop from parent", () => {
    const ratingComponent = shallow(<Rating setRating={dummysetRating} />);
    ratingComponent.setProps({
      rating: 1
    });
    const first = ratingComponent.find(".rating-star").at(0);
    expect(first.hasClass("hovered")).toEqual(true);
  });
});
