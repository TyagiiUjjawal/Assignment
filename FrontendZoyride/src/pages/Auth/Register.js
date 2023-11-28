import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Buffer } from "buffer";

import { firebase, auth } from "./Firebase";
import "../../styles/AuthStyles.css";
import { Button } from "antd";
const Register = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [dob, setDob] = useState("");
  const [okdl, setOkdl] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoadingg, setIsLoadingg] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [show, setshow] = useState(true);
  const [showV, setshowV] = useState(false);
  const [showCa, setshowCa] = useState(false);
  // Rest of your code...
  const [final, setfinal] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [Okk, setOkk] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  // form function'
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
      setIdNumber(savedFormData.idNumber);
      setDob(savedFormData.dob);
      setName(savedFormData.name);
      setEmail(savedFormData.email);

      // ... similarly, set other form fields
    }
  }, []);
  useEffect(() => {
    const formData = {
      idNumber,
      dob,
      name,
      email,

      // ... similarly, add other form fields
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [idNumber, dob, name, email]);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("idCardImage", selectedFile);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const res = await axios.post("/api/v1/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending FormData
        },
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error("sdss", res.data.message, res.message);
      }

      // }, 4000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    // Fetch user data from the API
    axios
      .get("/api/v1/auth/getUsers")
      .then((response) => {
        setUsers(response.data);
        console.log(users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  return (
    <Layout title="Register - Ecommer App">
      <div>
        <div
          className="form-container"
          style={{ minHeight: "90vh", display: "flex" }}
        >
          <div className="myImg">
            <img src="/images/zoyride.png" alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <h4 className="title">REGISTER FORM</h4>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Name"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="date"
                placeholder="Date of Birth"
                className="form-control"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  console.log(dob);
                }}
              />
            </div>
            <p>Add Profile image</p>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <br />
            <button type="submit" className="btn btn-primary">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
