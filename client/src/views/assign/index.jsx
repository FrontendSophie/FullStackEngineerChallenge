import React from 'react'
import AddReviewee from './add-reviewee'
import Nav from '../../components/nav'
import Auth from '../../components/auth';

class Assign extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      reviewees: [],
    }
  }

  componentDidMount() {
    this.getUserList()

    const reviewerId = Number.parseInt(this.props.match.params.id)
    this.getRevieweeList(reviewerId)
  }

  async getUserList() {
    const getUrl = '/api/users'
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        users: result.data
      })
    }
  }

  async getRevieweeList(id) {
    const getUrl = `/api/reviewees/${id}`
    
    const response = await fetch(getUrl)
    const result = await response.json()
    if (result.errno === 0) {
      this.setState({
        reviewees: result.data
      })
    }
  }

  async remove(reviewerId, revieweeId) {
    const url = `/api/reviewees/${reviewerId}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        revieweeId
      })
    })
    const result = await response.json()
    if (result.errno === 0) {
      this.getRevieweeList(reviewerId)
    } 
  }

  render() {
    const users = this.state.users
    const reviewerId = Number.parseInt(this.props.match.params.id)
    const reviewer = users.find(user => user.id === reviewerId)
    const filteredUsers = this.state.users.filter(user => user.id !== reviewerId && user.role !== 0)
    const hasReviewee = this.state.reviewees.length > 0 

    return (
      <Auth>
        <Nav/>
        <main className="assign">
          <section className="assign__add">
            <h2>Assign <span>{reviewer && reviewer.username}</span> to review:</h2>
            <AddReviewee
              reviewerId={reviewerId}
              filteredUsers={filteredUsers} 
              onAdd={() => this.getRevieweeList(reviewerId)}
            ></AddReviewee>
          </section>

          <section className="assign__list">
            <h2><span>{reviewer && reviewer.username}</span> is currently reviewing:</h2>
            <ul className="list">
              {
                hasReviewee 
                  ? this.state.reviewees.map((user, index) => (
                    <li key={index} className="flex-v-center">
                      <span className="flex-1">{user.username}</span>
                      <button onClick={() => this.remove(reviewerId, user.id)}>
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M18 7v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-10c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-13zM17 5v-1c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1h1v13c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h10c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-13h1c0.552 0 1-0.448 1-1s-0.448-1-1-1zM9 5v-1c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v1zM9 11v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1zM13 11v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1z"
                          ></path>
                        </svg>
                      </button>
                    </li>
                  ))
                  : (<li>No record found.</li>)
              }
            </ul>
          </section>
        </main>
      </Auth>
    )
  }
}

export default Assign
