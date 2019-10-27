import React from "react";
import PropTypes from 'prop-types';

class ListItem extends React.Component {
   constructor(props, context) {
    super(props, context);

    this.state = {
      username: undefined,
      isEditMode: false,
    }

    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.goToReview = this.goToReview.bind(this)
  }

  static contextTypes = {
    history: PropTypes.object,
  }
  
  async remove(id) {
    const url = `/api/users/${id}`
    const response = await fetch(url, {
      method: 'DELETE'
    })
    const result = await response.json()
    if (result.errno === 0) {
      this.props.onRefresh()
    } 
  }

  async update(id) {
    this.setState({
      isEditMode: false
    })

    const url = `/api/users/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.state.username})
    })
    const result = await response.json()
    if (result.errno === 0) {
      this.props.onRefresh()
    } 
  }

  toggleEditMode() {
    const currentEditMode = this.state.isEditMode
    this.setState({
      isEditMode: !currentEditMode
    })
  }

  onFieldChange(e, fieldName) {
    this.setState({ [fieldName]: e.target.value })
  }

  goToReview(id) {
    this.context.history.push(`/review/${id}`)
  } 

  goToAssign(id) {
    this.context.history.push(`/assign/${id}`)
  } 

  render() {
    const list = this.props.list
    const {username, isEditMode} = this.state

    return (
      <li className="flex-v-center">
        {
          isEditMode 
            ? (
              <>
                <input 
                  type="text" 
                  className="flex-1"
                  value={username === undefined ? list.username : username} 
                  onChange={e => this.onFieldChange(e, 'username')}
                />
                <button onClick={() => this.update(list.id)}>
                  <svg viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5 11-11 2 2-13 13z"></path>
                  </svg>
                </button>
                <button onClick={this.toggleEditMode}>
                  <svg viewBox="0 0 20 20">
                    <path
                      d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"
                    ></path>
                  </svg>
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 employee-name">{list.username}</span>
                <button onClick={this.toggleEditMode}>
                  <svg viewBox="0 0 32 32">
                    <path
                      d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"
                    ></path>
                  </svg>
                </button>
              </>
            )
        }
        <button onClick={() => this.remove(list.id)} className="btn-remove">
          <svg viewBox="0 0 24 24">
            <path
              d="M18 7v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-10c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-13zM17 5v-1c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1h1v13c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h10c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-13h1c0.552 0 1-0.448 1-1s-0.448-1-1-1zM9 5v-1c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v1zM9 11v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1zM13 11v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1z"
            ></path>
          </svg>
        </button>
        <button onClick={() => this.goToAssign(list.id)} className="btn-outlined btn-secondary btn-assign">ASSIGN</button>
        <button onClick={() => this.goToReview(list.id)} className="btn-outlined btn-primary">REVIEW</button>
      </li>
    )
  }
}

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  onRefresh: PropTypes.func.isRequired,
}

export default ListItem;
