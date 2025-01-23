import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [contact, setContact] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    const contactData = location.state?.contact || {};
    setContact(contactData);
  }, [location.state]);

  const update = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email) {
      alert("All fields are mandatory!");
      return;
    }
    updateContactHandler(contact);
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>
        Edit Contact
        <Link to="/">
          <button className="ui button blue right">Contact List</button>
        </Link>
      </h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
