import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    redirect: false,
  };

  add = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    if (!name || !email) {
      alert("All fields are mandatory!");
      return;
    }
    this.props.addContactHandler({ name, email });
    this.setState({ name: "", email: "", redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />; 
    }

    return (
      <div className="ui main">
        <h2>
          Add Contact
          <button className="ui button blue right" onClick={() => this.props.history.push("/")}>
            Contact List
          </button>
        </h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
