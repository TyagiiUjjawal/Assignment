import React from "react";
import Layout from "../../components/Layout/Layout";
import {
  BiMailSend,
  BiPhoneCall,
  BiSupport,
  BiCurrentLocation,
} from "react-icons/bi";
const About = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2 className="text-justify ">
            Bike Rental website for NIT KURUKSHETRA
          </h2>

          <p>
            <b>
              <br />
              Legal Name=YASH ARORA <br />
              Trade Name=RideEasy <br />
              Registered Address= : Main Parking area , National Institute Of
              Technology, Kurukshetra WRXF+23G, NIT, Thanesar, Haryana 136119.
              Introducing the NIT KKR Bike Rental Web App! Say goodbye to
              transportation hassles on campus with our convenient and
              eco-friendly solution. Whether you need a bike for a quick ride to
              class, a trip to the local market, or just to explore the
              beautiful NIT KKR campus, our platform has you covered. Browse a
              wide selection of well-maintained bikes, reserve with ease, and
              enjoy affordable and flexible rental options. It's your ticket to
              effortless mobility, promoting sustainability, and making the most
              of your time at NIT KKR
              <br />
              Regards <br />
              RideEasy
            </b>
          </p>
          <br />
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default About;
