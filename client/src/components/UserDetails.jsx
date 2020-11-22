import axios from "axios";
import React from "react";

class UserDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({
      editMode: !this.state.editMode
    });
    console.log(this.state.editMode);
  }

  editUser() {
    axios.put(`/api/users/${this.props.user._id}`, this.props.user).then((result) => {
      console.log(result);
      this.toggleEdit();
    });
  }

  render() {
    return (
      <div className="box">
        {this.state.editMode ? (
          <div>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                value={this.props.user.first_name}
                onChange={(event) => {
                  this.props.handleChange(event, this.props.index);
                }}
                type="text"
              />{" "}
              <br />
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                value={this.props.user.last_name}
                onChange={(event) => {
                  this.props.handleChange(event, this.props.index);
                }}
                type="text"
              />{" "}
              <br />
              <label htmlFor="username">username</label>
              <input
                id="username"
                value={this.props.user.username}
                onChange={(event) => {
                  this.props.handleChange(event, this.props.index);
                }}
                type="text"
              />{" "}
              <br />
              <label htmlFor="age">age</label>
              <input
                id="age"
                value={this.props.user.age}
                onChange={(event) => {
                  this.props.handleChange(event, this.props.index);
                }}
                type="number"
              />{" "}
              <br />
              <button onClick={this.editUser.bind(this)}>Submit</button>
            </div>
          </div>
        ) : (
          <div>
            <h3>{this.props.user.username}</h3>
            <p>{this.props.user.age}</p>

            <button onClick={this.toggleEdit}>Edit User</button>
            <button
              // onClick={(event) => {
              //   this.props.deleteUser(event, this.props.user._id);
              // }}>
              id={this.props.index}
              onClick={this.props.deleteUser}>
              Delete User
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default UserDetails;
