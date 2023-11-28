import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../../components/Layout/Layout";

function PaymentList() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/v1/student/get-payments"); // Adjust the API endpoint
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Payment List</h1>
        <ul>
          {payments.reverse().map((payment) => {
            const createdAtLocal = new Date(payment.createdAt).toLocaleString(); // Convert to local timezone
            return (
              <li key={payment._id}>
                {payment.name} - ${payment.price} - {createdAtLocal}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export default PaymentList;
