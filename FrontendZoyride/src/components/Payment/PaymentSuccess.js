import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "../Layout/Layout";
const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const referenceStyle = {
    fontSize: "24px",
    marginBottom: "10px",
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Order Successful</h1>
        <p style={referenceStyle}>Reference No. {referenceNum}</p>
        <Link to="/dashboard/user/orders">Go to Your Order Details</Link>
        <img
          src="https://indianmemetemplates.com/wp-content/uploads/cheems-on-bike-with-baby-doge.png"
          alt="imgmeme"
        />
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
