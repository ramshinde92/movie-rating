import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Rating extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating || null
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      rating: props.rating && props.rating !== 0 ? props.rating : state.rating
    };
  }

  rate(index) {
    this.rateIn(index);

    this.props.setRating(this.state.rating);
  }

  rateIn(index) {
    const rating = index;

    this.setState({
      rating
    });
  }

  rateOut() {
    this.setState({ rating: null });
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

Rating.propTypes = {
  setRating: PropTypes.func.isRequired,
  rating: PropTypes.number
};

export default Rating;
