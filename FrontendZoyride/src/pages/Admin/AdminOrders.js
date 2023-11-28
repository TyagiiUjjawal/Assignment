import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [DistanceStart, setDistanceStart] = useState("");
  const [DistanceEnd, setDistanceEnd] = useState("");
  const [PickupTime, setPickupTime] = useState("");
  const [ReturnTime, setReturnTime] = useState("");
  const [status, setStatus] = useState(["undone", "Ongoing", "done"]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);

  const [membership, setmembership] = useState("0");

  const handleSelectChange = (event) => {
    event.preventDefault();
    const selectedOption = event.target.value;
    setmembership(selectedOption);
  };

  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      console.log("====================================");
      console.log(value);
      console.log("====================================");
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log("change erro", error);
    }
  };

  const handledist = async (orderId, distanceStart, pickupTime) => {
    try {
      handleChange(orderId, "Ongoing");
      const { data } = await axios.put(`/api/v1/student/update-startDistance`, {
        orderId: orderId,
        pickupTime: pickupTime,
        distanceStart: distanceStart,
      });
      // Optionally, you can handle the updated data if needed
      console.log("Updated Order:", data.order);

      // Call any other necessary functions after the update
      // For example, you may want to refresh the orders after updating distanceRidden
      getOrders();
    } catch (error) {
      toast.error("Please retry ");
      console.log("handle error", error);
    }
  };
  const handleenddist = async (orderId, distanceEnd, returnTime) => {
    try {
      const { data } = await axios.put(`/api/v1/student/update-enddistance`, {
        orderId: orderId,
        distanceEnd: distanceEnd,
        returnTime: returnTime,
      });
      // Optionally, you can handle the updated data if needed
      console.log("Updated Order:", data.order);

      // Call any other necessary functions after the update
      // For example, you may want to refresh the orders after updating distanceRidden
      getOrders();
    } catch (error) {
      toast.error("Please retry ");
      console.log(error);
    }
  };
  const handleMembership = async (orderId, membership) => {
    try {
      const { data } = await axios.put(`/api/v1/student/update-membership`, {
        orderId: orderId,
        membership: membership,
        // returnTime: returnTime,
      });
      // Optionally, you can handle the updated data if needed
      console.log("Updated Order:", data.order);

      // Call any other necessary functions after the update
      // For example, you may want to refresh the orders after updating distanceRidden
      getOrders();
    } catch (error) {
      toast.error("Please retry ");
      console.log(error);
    }
  };
  const handlestarttime = async (orderId, pickupTime) => {
    try {
      const { data } = await axios.put(`/api/v1/student/update-startTime`, {
        orderId: orderId,
        pickupTime: pickupTime,
      });
      // Optionally, you can handle the updated data if needed
      console.log("Updated Order:", data.order);

      // Call any other necessary functions after the update
      // For example, you may want to refresh the orders after updating distanceRidden
      getOrders();
    } catch (error) {
      toast.error("Please retry ");
      console.log(error);
    }
  };
  const handleendTime = async (orderId, returnTime) => {
    try {
      const { data } = await axios.put(`/api/v1/student/update-endTime`, {
        orderId: orderId,
        returnTime: returnTime,
      });
      // Optionally, you can handle the updated data if needed
      console.log("Updated Order:", data.order);

      // Call any other necessary functions after the update
      // For example, you may want to refresh the orders after updating distanceRidden
      getOrders();
    } catch (error) {
      toast.error("Please retry ");
      console.log(error);
    }
  };

  // const handleFormSubmit = (orderId) => {
  //   handledist(orderId, DistanceStart);
  //   handleenddist(orderId, DistanceEnd);
  //   handlestarttime(orderId, PickupTime);
  //   handleendTime(orderId, ReturnTime);
  // };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <label htmlFor="hh"></label> */}
                <div>
                  <label htmlFor="numberDropdown">Select a Number:</label>
                  <select
                    id="numberDropdown"
                    value={membership}
                    onChange={handleSelectChange}
                  >
                    <option value="0">Choti Bike</option>
                    <option value="1">Badi Bike</option>
                  </select>
                  <p>
                    Selected value:{" "}
                    {membership == 0 ? "Choti Bike" : "Badi Bike"}
                  </p>
                </div>
                <button onClick={() => handleMembership(o._id, membership)}>
                  Proceed
                </button>

                <input
                  onChange={(event) => setDistanceStart(event.target.value)}
                  name="distanceStart"
                  placeholder="enter start distance"
                  type="number"
                />
                <input
                  onChange={(event) => setPickupTime(event.target.value)}
                  name="pickupTime"
                  type="datetime-local"
                  placeholder="Pickup Time"
                />
                <button
                  onClick={() => handledist(o._id, DistanceStart, PickupTime)}
                >
                  Update Start Distance and Pickup Time
                </button>
                <h1>{o.distanceStart}</h1>
                <h1>{o.distanceEnd}</h1>
                <h1>{o.pickupTime}</h1>
                <h1>{o.returnTime}</h1>
                <input
                  onChange={(event) => setDistanceEnd(event.target.value)}
                  name="distanceEnd"
                  placeholder="enter End distance"
                  type="number"
                />

                <input
                  onChange={(event) => setReturnTime(event.target.value)}
                  name="returnTime"
                  type="datetime-local"
                  placeholder="Return Time"
                />
                {/* Inside the map function */}

                {/* <button onClick={() => handlestarttime(o._id, PickupTime)}>
                  Update Start Distance and Pickup Time
                </button> */}
                <button
                  onClick={() => handleenddist(o._id, DistanceEnd, ReturnTime)}
                >
                  Update Distance End and Return time
                </button>
                {/* <button onClick={() => handleendTime(o._id, ReturnTime)}>
                  Update Return Time
                </button> */}

                {/* <button onClick={() => handleFormSubmit(o._id)}>Submit</button> */}
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/student/student-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
