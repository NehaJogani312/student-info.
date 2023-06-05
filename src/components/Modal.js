import React, { useContext, useState } from "react";
import { toBeEditedDataContext } from "../App";
import "../styles/modal.css";
import Swal from "sweetalert2";

const Modal = ({ showModal, onClose, onGetData ,tasks}) => {
  const editThisData = useContext(toBeEditedDataContext);

  const [gender, setGender] = useState(editThisData.gender);
  const [formData, setFormData] = useState({
    studentId: editThisData.studentId,
    name: editThisData.name,
    std: editThisData.std,
    division: editThisData.division,
    gender: editThisData.gender,
  });

  const handleInputChange = (event) => {
  const { name, value, type } = event.target;
  if (type === "radio") {
    setGender(value);
    setFormData({ ...formData,  id: editThisData.id,[name]: value });
  } else {
    setFormData({ ...formData,  id: editThisData.id,[name]: value });
  }
  };
  const handleSaveChanges = () => {
   if (!/^[a-zA-Z]+$/.test(formData.name)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid name! Only alphabets are allowed",
      });
    } else if (isNaN(formData.std) || formData.std < 1 || formData.std > 12) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Std should be a number between 1 and 12!",
      });
    } else if (!/^[A-E]+$/.test(formData.division)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:  'Division should be one of A, B, C, D, or E!',
      });
    } else{
      onGetData(formData);
    }
  };

  return (
    <div>
      <div
        className={showModal ? "modal display-block" : "modal display-none"}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header pb-0">
              <h3 className="modal-title"> Edit Details</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <form id="edit-form" className="my-0">
                <div className="head"></div>
                <div className="AddTask">
                  <label>StudentId:</label>
                  <input
                    type="text"
                    name="studentId"
                    defaultValue={editThisData.studentId}
                    disabled
                  />
                </div>
                <div className="AddTask">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="Name"
                    defaultValue={editThisData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="AddTask">
                  <label>Std:</label>
                  <input
                    type="text"
                    name="std"
                    defaultValue={editThisData.std}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="AddTask">
                  <label>Division:</label>
                  <input
                    type="text"
                    name="division"
                    defaultValue={editThisData.division}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="AddTask pb-2">
                  <label>Gender:</label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="mx-2"
                    onChange={handleInputChange}
                    checked={gender === "Male"}
                  />
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="mx-2"
                    onChange={handleInputChange}
                    checked={gender === "Female"}
                  />
                  Female
                </div>
              </form>
            </div>
            <div className="modal-footer pt-0">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSaveChanges}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
