import { useState } from "react";
import styles from "../styles/AddTask.module.css";
import Swal from "sweetalert2";

const AddTask = ({ onSave, tasks }) => {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [std, setStd] = useState("");
  const [division, setDivision] = useState("");
  const [gender, setGender] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      studentId === "" ||
      name === "" ||
      std === "" ||
      division === "" ||
      gender === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill in your details or close the form!",
      });
    } else if (studentId.length !== 8 || !/^[a-zA-Z0-9]+$/.test(studentId)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid student ID!",
      });
    } else if (tasks.find((s) => s.studentId === studentId)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This student ID already exists!",
      });
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid name! Only alphabets are allowed",
      });
    } else if (isNaN(std) || std < 1 || std > 12) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Std should be a number between 1 and 12!",
      });
    } else if (!/^[A-E]+$/.test(division)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:  'Division should be one of A, B, C, D, or E!',
      });
    } else {
      onSave({ studentId, name, std, division, gender });
    }

    setStudentId("");
    setName("");
    setStd("");
    setDivision("");
    setGender("");
  };

  

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className={styles.formControl}>
        <label>StudentId :</label>
        <input
          type="text"
          placeholder="Enter Student Id"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <div className={styles.formControl}>
        <label>Full Name :</label>
        <input
          type="text"
          placeholder="Enter Student Id"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.formControl}>
        <label>Std :</label>
        <input
          type="text"
          placeholder="Enter Student Id"
          value={std}
          onChange={(e) => setStd(e.target.value)}
        />
      </div>
      <div className={styles.formControl}>
        <label>Division :</label>
        <input
          type="text"
          placeholder="Enter Student Id"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        />
      </div>
      <div className={styles.formControl}>
        <label name="gender" className={styles.gender}>
            Gender:&nbsp;&nbsp;
        </label>
        <input
            type="radio"
            value="Male"
            name="gender"
            onClick={(e) => setGender(e.target.value)}
        />
        <span> Male</span>&nbsp;&nbsp;
        <input
            type="radio"
            value="Female"
            name="gender"
            onClick={(e) => setGender(e.target.value)}
        />
        Female
      </div>
      <input
        type="submit"
        className={`${styles.btn} ${styles.btnBlock} mb-4`}
        value="Submit"
      />
    </form>
  );
};

export default AddTask;
