import React from "react";
import { useState } from "react";

function Form () {

  const [user,setUser] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
  }

  return (
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
  )
}

export default Form;