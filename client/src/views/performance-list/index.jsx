import React from "react";
import AddReview from '../review/add-review';
import AddFeedBack from './add-feedback';
import Nav from '../../components/nav'
import { UserContext } from '../../context';

class PerformanceList extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      reviewees: [],
      reviews: [],
    }

    this.getRevieweeList = this.getRevieweeList.bind(this)
    this.getAllReviews = this.getAllReviews.bind(this)
  }

  componentDidMount() {
    this.getRevieweeList()
    this.getAllReviews()
  }

  async getRevieweeList() {
    const currentUser = this.context.user
    const getUrl = `/api/reviews/${currentUser.id}/reviewee`

    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        reviewees: result.data
      })
    }
  }

  async getAllReviews() {
    const currentUser = this.context.user
    const getUrl = `/api/reviews/${currentUser.id}`
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        reviews: result.data
      })
    }
  }

  render() {
    const { reviewees, reviews } = this.state
    const hasReviewee = reviewees.length > 0

    return (
      <>
        <Nav/>
        <main className="employee-list">
          {
            hasReviewee && (
              <section>
                <h2>Add Performance Reviews</h2>
                {
                  reviewees.map(reviewee => (
                    <AddReview
                      reviewee={reviewee}
                      review={reviewee.review}
                      key={reviewee.id}
                    ></AddReview>
                  ))
                }
              </section>)
          }

          <section>
            <h2>Add FeedBack</h2>
            <ul>
              {
                reviews.map(review =>
                  (<AddFeedBack data={review} key={review.id}
                    onUpdate={() => this.getAllReviews()}
                  />))
              }
            </ul>
          </section>
        </main>
      </>
    )
  }
}

export default PerformanceList;
