import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { useCart } from "../context/cart";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Animate from "../components/Animate";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import { Container, Row, Col } from "reactstrap";

import park1 from "../images/park1.jpg";
import park2 from "../images/park2.jpg";
import park3 from "../images/park3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HeroSlider from "./ExtraComp/HeroSlider";
import FindCarForm from "./ExtraComp/FindCarForm";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  //get all cat
  function isMobileDevice() {
    return window.innerWidth <= 768; // You can adjust the threshold width as needed
  }
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/student/student-list/${page}`);
      setLoading(false);
      console.log(data);
      setProducts(data.students);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/student/student-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/student/student-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.students]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    // setLoading(true);
    toast.success("Loading...");
    setLoading(true);
    setLoad(true);
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    setLoad(true);

    setLoading(false);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      // toast.success("loading....");
      const { data } = await axios.post("/api/v1/student/student-filters", {
        checked,
        radio,
      });
      setProducts(data?.students);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Zoyride"}>
      {/* banner image */}
      {/* <div className="banner">
        <h1>Bike Rental Platform for Nitkkr Community</h1>
      </div> */}
      {/* <Animate></Animate> */}

      {/* <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Class</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          {/* <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div> */}
          <div className="d-flex flex-column">
            {/* <button
              style={{ background: "#000d6b !important" }}
              className="btn btn-danger"
            > */}
            <button
              className="btn  find__car-btn"
              onClick={() => window.location.reload()}
            >
              {/* </button> */}
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <br />
          <br />
          <br />
          <h1 className="text-center">All Students</h1>

          <div className="d-flex  flex-wrap justify-content-center align-items-center vh-100">
            {" "}
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/student/student-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <p className="card-text ">{p.name.substring(0, 60)}...</p>
                  <div className="card-name-price">{p.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
