import React from "react";
import { useState } from "react";

function Form () {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    phoneType: "Home",
    staff: "instructor",
    bio: "",
    notif: false
  });


  const handleChange = (field) => {
    return (e) => {
      let val = e.target.value;
      if(field === "notif") {
        val = e.target.checked
      }
      setUser({
        ...user,
        [field]: val
      });
    }
  };

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    const currErrors = validate();
    setErrors(currErrors);
    // to place properly:
      // make errors into obj with key value pairs
      // place each under input in return()
  }

  const validate = () => {
    const errors = [];

    if (user.name.length === 0) errors.push("Name is required, can not be empty.");
    // split on @ and '.' and make sure all sections are not ""
    // const [prefix, middle] = user.email.split("@");
    // const [domain, suffix] = middle.split(".");

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!user.email.match(mailformat)) {
      errors.push("Email is required, can not be empty. Or format is incorrect.");
    }

    // if (prefix.length === 0 || domain.length === 0 || suffix.length === 0) {
    //   errors.push("Email is required, can not be empty. Or format is incorrect.");
    // }

    const phonenum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(!user.phoneNumber.match(phonenum) && user.phoneNumber.length !== 0) {
      errors.push("Phone number should be properly formatted.");
    }

    // if (user.phoneNumber.length !== 0 && (user.phoneNumber.length !== 10 || parseInt(user.phoneNumber) !== NaN)) {
    //   errors.push("Phone number should be properly formatted.");
    // }

    if (user.phoneNumber.length !== 0 && user.phoneType === "") {
      errors.push("Phone type must be selected.");
    }

    if (user.bio.length > 280) {
      errors.push("Bio character limit exceeded.");
    }

    return errors;
  }

  return (
    <>
      <ul className="errors">
        {errors.map((error, i) => <li key={i}>{error}</li> )}
      </ul>

      <form onSubmit={handleSubmit}>
        
        <label>
          Name
          <input type="text" value={user.name} onChange={handleChange("name")}/>
        </label>
        <br />

        <label>
          Email
          <input type="text" value={user.email} onChange={handleChange("email")}/>
        </label>
        <br />

        <label>
          Phone Number
          <input type="text" value={user.phoneNumber} onChange={handleChange("phoneNumber")}/>
        </label>
        <br />

        <label>
          Phone Type
          <select value={user.phoneType} onChange={handleChange("phoneType")}>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Mobile">Mobile</option>
          </select>
        </label>
        <br />

        <p>Staff</p>
        <label>
          <input type="radio" value="instructor" name="staff" checked={user.staff === "instructor"} onChange={handleChange("staff")}/>
          Instructor
        </label>
        <label>
          <input type="radio" value="student" name="staff" checked={user.staff === "student"} onChange={handleChange("staff")}/>
          Student
        </label>
        <br />

        <label>
          Bio
          <textarea cols="30" rows="10" onChange={handleChange("bio")}>

          </textarea>
        </label>
        <br />

        <label>
          Sign up for email notifications
        <input type="checkbox" checked={user.notif} onChange={handleChange("notif")}/>
        </label>
        <br />

        <input type="submit" value="Submit"/>
      </form>
    </>
  )
}

export default Form;