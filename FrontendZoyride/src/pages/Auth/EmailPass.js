import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { firebase, auth } from "./Firebase";
import "../../styles/AuthStyles.css";
import Layout from "./../../components/Layout/Layout";

const EmailPass = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [okay, setOkay] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      // Register the user using email and password
      if (!email.endsWith("@nitkkr.ac.in")) {
        toast.error("Please fill this by ur domain Id Of Nit Kurukshetra");
        return;
      }
      setLoading(true);

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Send verification email to the registered user
      if (user) {
        await user.sendEmailVerification();
        toast.success("Verification email sent. Please check your inbox.");
        // navigate(`/verify/${user.email}`);
        setOkay(true);
      } else {
        toast.error(
          "Verification notttttt email sent. Please check your inbox."
        );
      }
      setLoading(false);

      // Proceed with the user registration and data sending to the server
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", error);
    }
  };
  return (
    <Layout title="Register - RideEasy App">
      <br /> <br /> <br /> <br />
      {!isLoading ? (
        <>
          {" "}
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <form
              onSubmit={handleSubmitt}
              style={{ width: "300px", margin: "auto" }}
            >
              <h4 style={{ fontSize: "24px", fontWeight: "bold" }}>
                Enter Your Domain Id of NIT KURUKSHETRA
              </h4>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  id="exampleInputPassword1"
                  placeholder="Enter Password(not necessarily of email Id)"
                  required
                />
              </div>
              {!okay ? (
                <button
                  type="submit"
                  style={{
                    background: "blue",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Verify Email
                </button>
              ) : (
                <></>
              )}

              {okay ? (
                <h1>
                  Verification Link is sent just go through with the
                  registration process
                </h1>
              ) : (
                <></>
              )}
            </form>
          </div>
        </>
      ) : (
        <>
          <h1 style={{ backgroundColor: "red" }}>Loading..........</h1>
        </>
      )}
    </Layout>
  );
};

export default EmailPass;
