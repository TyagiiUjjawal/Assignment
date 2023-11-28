import React from "react";
import Layout from "./../components/Layout/Layout";
import {
  BiMailSend,
  BiPhoneCall,
  BiSupport,
  BiCurrentLocation,
} from "react-icons/bi";
const Contact = () => {
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
          <p style={{ backgroundColor: "lightblue" }} className="mt-3">
            <BiMailSend /> :yasharora1808@gmail.com
          </p>
          <p style={{ backgroundColor: "lightblue" }} className="mt-3">
            <BiPhoneCall /> : 9466160887
          </p>
          <h1>Operational Address</h1>
          <p style={{ backgroundColor: "lightblue" }} className="mt-3">
            <BiCurrentLocation /> : Main Parking area , National Institute Of
            Technology, Kurukshetra WRXF+23G, NIT, Thanesar, Haryana 136119.
            <a href="https://goo.gl/maps/7m4ferGNWajgbmVS9">Location🌍</a>
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6914.321608045764!2d76.8131647935076!3d29.946052949892884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3f422f5244e7%3A0x9c630c311d6349b8!2sNIT%20KURUKSHETRA!5e0!3m2!1sen!2sin!4v1691902947620!5m2!1sen!2sin"
            // width="600"
            // height="450"
            // style="border:0;"
            // allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <br />
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
