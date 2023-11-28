import React from "react";
import "./find-car-form.css";
import "./find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  return (
    <Form className=" form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="Name" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="Enter Your Problem" required />
        </FormGroup>

        <FormGroup className="select__group">
          <select>
            <option value="web">Website Related</option>
            <option value="nontech">Non-Tech</option>
          </select>
        </FormGroup>
        {/* <FormGroup className="select__group">
          <textarea
            placeholder="Enter your Problem here..."
            // value={this.state.inputValue}
            // onChange={this.handleTextareaChange}
            rows={2} // You can adjust the number of rows as needed
            cols={69} // You can adjust the number of columns as needed
          />
        </FormGroup> */}

        <FormGroup className=" form__group ">
          <button className="btn  find__car-btn">Submit</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
