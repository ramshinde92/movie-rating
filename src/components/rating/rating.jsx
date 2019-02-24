import React, { Component } from "react";
import PropTypes from "prop-types";

class Rating extends Component {
  state = { rating: this.props.rating || null, tempRating: null };

  rate(index) {
    this.rateIn(index);

    this.props.setRating(this.state.rating);
  }

  rateIn(index) {
    const temp = this.state.rating;
    const rating = index;

    this.setState({
      rating,
      tempRating: temp
    });
  }

  rateOut() {
    this.setState({ rating: this.state.tempRating });
  }

  getStars() {
    const stars = [];
    const { rating } = this.state;

    for (let i = 1; i < 6; i++) {
      let classes = "";
      if (rating >= i && rating !== null) {
        classes = "rating-star hovered";
      } else {
        classes = "rating-star";
      }

      stars.push(
        <li key={i} className="rating-list-item">
          <label
            onClick={() => this.rate(i)}
            onMouseOver={() => this.rateIn(i)}
            onMouseOut={() => this.rateOut()}
            className={classes}
          >
            ★
          </label>
        </li>
      );
    }

    return stars;
  }

  render() {
    return <ul className="rating">{this.getStars()}</ul>;
  }
}

//TODO: Add proptypes

Rating.propTypes = {
  setRating: PropTypes.func.isRequired
};

export default Rating;
