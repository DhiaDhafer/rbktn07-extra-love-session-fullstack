import React from "react";
import $ from "jquery";
import axios from "axios";
import UserDetails from "./UserDetails.jsx";

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.deleteUser = this.deleteUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    // $.ajax
    // $.ajax({
    //   url: "/api/users",
    //   method: "GET",
    //   success: (data) => {
    //     console.log("the initial state is : ", this.state.users);
    //     console.log(data);
    //     this.setState({
    //       users: data
    //     });
    //     console.log("final state: ", this.state.users);
    //   }
    // });

    // $.get
    // $.get("/api/users").done((users) => {
    //   this.setState({
    //     users
    //   });
    // });

    // axios
    axios.get("/api/users").then(({ data }) => {
      this.setState({
        users: data,
        otherInfo: "hello"
      });
    });
  }

  deleteUser(event) {
    var index = event.target.id;
    axios.delete(`/api/users/${this.state.users[index]._id}`).then(({ data }) => {
      this.state.users.splice(index, 1);
      let newUsers = this.state.users;
      this.setState({
        users: newUsers
      });
    });
  }

  handleChange(event, index) {
    let updatedUsers = this.state.users;
    updatedUsers[index][event.target.id] = event.target.value;
    this.setState({ users: updatedUsers });
  }

  render() {
    return (
      <div>
        <h1>Welcomze to the User List component</h1>
        <h2>You have {this.state.users.length} users</h2>

        {this.state.users.map((user, index) => (
          <UserDetails user={user} key={index} index={index} otherInfo={this.state.otherInfo} handleChange={this.handleChange} deleteUser={this.deleteUser} />
        ))}
      </div>
    );
  }
}

export default UserList;
