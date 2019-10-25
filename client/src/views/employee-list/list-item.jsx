import React from "react";
import PropTypes from 'prop-types';

class ListItem extends React.Component {
   constructor() {
    super();

    this.state = {
      username: '',
      isEditMode: false,
    }

    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
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

  goToReviewPage() {

  } 

  render() {
    const list = this.props.list
    const {username, isEditMode} = this.state

    return (
      <li>
        {
          isEditMode 
            ? (
              <>
                <input type="text" value={username ? username : list.username} onChange={e => this.onFieldChange(e, 'username')}/>
                <button onClick={() => this.update(list.id)}>update</button>
                <button onClick={this.toggleEditMode}>cancel</button>
              </>
            ) : (
              <>
                <span>{list.username}</span>
                <button onClick={this.toggleEditMode}>edit</button>
              </>
            )
        }
        <button onClick={() => this.remove(list.id)}>remove</button>
        <button onClick={this.goToReviewPage}>review</button>
      </li>
    )
  }
}

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  onRefresh: PropTypes.func.isRequired,
}

export default ListItem;
