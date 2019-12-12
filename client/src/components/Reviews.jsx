import React, { Component } from 'react';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReviewItem from './ReviewItem.jsx';
import ReviewSum from './ReviewSum.jsx';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      currentPage: 1,
      reviewPerPage: 6,
      mouseHover: false,
      listTotal: 0,
      adj: undefined,
      minusDis: true,
      addDis: false,
      allowed: 0,
      clickNum: 0
    }
    this.getReviews = this.getReviews.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.topButtons = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.checkRange = this.checkRange.bind(this);
  }

  getReviews = async () => {
    try {
      let adj = ['Terrible', 'Poor', 'Good', 'Wonderful', 'Excellent'];
      let rand = Math.floor(Math.random() * 100)
      console.log('This is id: ' + rand)
      const results = await axios.get(`/reviews/${rand}`);
      const total = await results.data.reduce((a, b) => a + b.rating, 0) / results.data.length
      console.log(total);
      const allowedClicks = await Math.floor(results.data.length / 6);
      console.log('allowed:' + allowedClicks)
      if (allowedClicks < 1) {
        this.setState({
          addDis: true
        })
      }
      if (results.data.length === 36){
        allowedClicks--
      } else if ( allowedClicks === 1 && reviews.data.length !== 10) {
        this.setState({
          addDis: true
        })
      }
      this.setState({
        reviews: results.data,
        listTotal: total,
        adj: adj[Math.round(total - 1)],
        allowed: allowedClicks
      });
      console.log(results.data)
    } catch (err) {
      console.error('Could not fetch reviews: ' + err)
    }
  }

  handleAddClick() {
    this.setState({
      currentPage: this.state.currentPage + 1,
      clickNum: this.state.clickNum + 1
    }, () => {
      this.checkRange();
      console.log('add current:' + this.state.currentPage)
      console.log('clicks: ' + this.state.clickNum)
    }
    )
  }

  handleMinusClick() {
    this.setState({
      currentPage: this.state.currentPage - 1,
      clickNum: this.state.clickNum - 1
    }, () => {
      this.checkRange();
      console.log('minus current:' + this.state.currentPage)
      console.log('clicks: ' + this.state.clickNum)
    }
    )
  }

  handleScroll() {
    if (this.topButtons.current) {
      this.topButtons.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }

  checkRange() {
    const { clickNum, allowed } = this.state;
    if (clickNum >= 1) {
      this.setState({
        minusDis: false
      })
      console.log('this is minusDis: ' + this.state.minusDis)
    } else {
      this.setState({
        minusDis: true
      })
    }
    if (clickNum >= allowed ) {
      this.setState({
        addDis: true
      })
      console.log('this is addDis: ' + this.state.addDis)
    } else {
      this.setState({
        addDis: false
      })
      console.log('this is addDis: ' + this.state.addDis)
    }
  }

  componentDidMount() {
    this.getReviews();
  }


  render() {

    if (this.state.reviews.length === 0) {
      return (
        <div className="no_reviews">
          <span>No Reviews yet...</span>
          </div>
      )
    } else {
      let length;
      const { reviews, currentPage, reviewPerPage, adj, minusDis, addDis } = this.state;
      const indexOfLastReview = currentPage * reviewPerPage;
      const indexOfFirstReview = indexOfLastReview - reviewPerPage;
      const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
      if (indexOfLastReview > reviews.length) {
        length = reviews.length
      } else if (indexOfLastReview <= reviews.length){
        length = indexOfLastReview
      }

      const renderReviews = currentReviews.map((review, index) => {
        return <ReviewItem review={review} key={index}/>
      })


      return (
        <div className="review_container">
          <span ref={this.topButtons}></span>
          <ReviewSum rating={this.state.listTotal} review={reviews} adjective={adj}/>
        <div className="review_pagination" >
      <button className="review_btn"onClick={this.handleMinusClick} disabled={minusDis}>
        <FiChevronLeft color={minusDis ? "#ddddde" : "#717171"} size={16} />
      </button>
        <span>
          <strong className="review_out">{`${indexOfFirstReview + 1}-${length}`}</strong>
           {` of ${reviews.length}`}
          </span>
        <button className="review_btn" onClick={this.handleAddClick} disabled={addDis}>
          <FiChevronRight color={addDis ? "#ddddde" : "#717171"} size={16}/>
        </button>
        </div>
        <div>
          {renderReviews}
        </div>
        <div className="review_pagination">
      <button className="review_btn" onClick={() => {
          this.handleMinusClick();
          this.handleScroll();
        }} disabled={minusDis}>
        <FiChevronLeft color={minusDis ? "#ddddde" : "#717171"} size={16} />
      </button>
        <span>
          <strong className="review_out">
          {`${indexOfFirstReview + 1}-${length}`}</strong>
           {` of ${reviews.length}`}
        </span>
        <button className="review_btn" onClick={() => {
          this.handleAddClick();
          this.handleScroll();
        }} disabled={addDis}>
          <FiChevronRight color={addDis ? "#ddddde" : "#717171"} size={16} />
        </button>
        </div>
        </div>
      );

    }

  }

}

export default Reviews;