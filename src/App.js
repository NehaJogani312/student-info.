import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { FaPencilAlt, FaTimes, FaPrint } from "react-icons/fa";
import "./App.css";
import styles from "./styles/Task.module.css";
import { useState, useEffect, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import Spinner from "./components/Spinner";
import Modal from "./components/Modal";

export const toBeEditedDataContext = createContext();

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [loading, setloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [matchingStudent, setMatchingStudent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toBeEditedData, setToBeEditedData] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = (studentId) => {
    const matchingStudent = tasks.filter((task) => {
      return task.studentId.includes(searchTerm);
    });
    setMatchingStudent(matchingStudent);
  };

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3500);
  }, []);

  const getTasks = JSON.parse(localStorage.getItem("taskAdded"));

  useEffect(() => {
    if (getTasks == null) {
      setTasks([]);
    } else {
      setTasks(getTasks);
    }
  }, []);

  const addTask = (task) => {
    const id = uuidv4();
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
    Swal.fire({
      icon: "success",
      title: "Yay...",
      text: "You have successfully added a new student data!",
    });
    localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
  };

  const deleteTask = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);
    setTasks(deleteTask);
    Swal.fire({
      icon: "success",
      title: "Oops...",
      text: "You have successfully deleted a student data!",
      confirmButtonText: "Cool",
    });
    localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
  };


  const sendDataToModal = (id) => {
    setShowModal(true);
    let newEditItem = tasks.find((task) => {
      return task.id === id;
    });

    setToBeEditedData({
      id: newEditItem.id || matchingStudent[0].id,
      studentId: newEditItem.studentId || matchingStudent[0].studentId,
      name: newEditItem.name || matchingStudent[0].name,
      std: newEditItem.std || matchingStudent[0].std,
      division: newEditItem.division || matchingStudent[0].division,
      gender: newEditItem.gender || matchingStudent[0].gender,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const editTask = (id) => {
    closeModal();
    const studentId = id.studentId;
    const name = id.name;
    const std = id.std;
    const division = id.division;
    const gender = id.gender;

    const myData = tasks.map((x) => {
      if (x.id === id.id) {
        const updatedTask = {
          ...x,
          studentId: studentId,
          name: name,
          std: std,
          division: division,
          gender: gender,
        };
        return updatedTask;
      }
      return x;
    });
    Swal.fire({
      icon: "success",
      title: "Yay...",
      text: "You have successfully edited an existing student data!",
    });
    localStorage.setItem("taskAdded", JSON.stringify(myData));
  };

  const printTask = (id) => {
    const printWindow = window.open(
      "",
      "Print Window",
      "height=1000 width=1000"
    );

    let printObject = tasks.find((task) => {
      return task.id === id;
    });

    const printContent = `
      <html>
      <head>
      <style>
        .container {
            width: 300px;
            height: 260px;
            box-shadow: 0px 0px 4px rgb(0, 0, 0);
            margin: auto;
            text-align: center;
        }

        .text {
            text-align: left;
            padding: 0 50px;
        }

        div {
            margin: 10px 0;
        }

        @media print {
            header{
                display: none;
            }
            .container {
                width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }

            @page {
                margin: 2cm;
            }
        }
      </style>
      </head>
      <body>
      <div class="container">
        <h3>Students Details</h3>
        <hr>
        <div class="text">
            <div>StudentId: ${
              printObject.studentId || matchingStudent[0].studentId
            }</div>
            <div>Full Name: ${printObject.name || matchingStudent[0].name}</div>
            <div>Std: ${printObject.std || matchingStudent[0].std}</div>
            <div>Division: ${
              printObject.division || matchingStudent[0].division
            }</div>
            <div>Gender: ${
              printObject.gender || matchingStudent[0].gender
            }</div>
        </div>
      </div>
      </body>
      </html>
    `;
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();

    printWindow.print();
    printWindow.close();
  };
  const refTask = () => {
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <Header
           const showForm={() => setShowAddTask(!showAddTask)}
            changeTextAndColor={showAddTask}
            refTask={refTask}
          />
          {showAddTask && <AddTask onSave={addTask} tasks={tasks}/>}
          <toBeEditedDataContext.Provider value={toBeEditedData}>
            {showModal && (
              <Modal
                showModal={showModal}
                onClose={closeModal}
                onGetData={editTask}
                tasks={tasks}
              />
            )}
          </toBeEditedDataContext.Provider>
          <div className={"txt"}>
            <h3>Details Of Students: {tasks.length}</h3>
            <div className="inputDiv">
              <input
                className="searchField"
                placeholder="Enter StudentId."
                name="input"
                onChange={handleChange}
                autoComplete="off"
              />
              <a className="searchBtn" onClick={handleSearchClick}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </div>
          </div>

          {matchingStudent.length > 0 ? (
            <div className={styles.task}>
              <div className="d-flex">
              {matchingStudent[0].gender === 'male' ? <img src={require("./assets/male.png")} alt="" className={styles.img} />: <img src={require("./assets/female.png")} alt="" className={styles.img} />}
               <div className={styles.text}>
               <p className={styles.taskName}>
                  <span className={styles.textBold}>StudentId: </span>
                  {matchingStudent[0].studentId}
                </p>
                <p className={styles.taskDate}>
                  <span className={styles.textBold}>Full Name: </span>
                  {matchingStudent[0].name}
                </p>
                <p className={styles.taskDate}>
                  <span className={styles.textBold}>Std: </span>
                  {matchingStudent[0].std}
                </p>
                <p className={styles.taskDate}>
                  <span className={styles.textBold}>Division: </span>
                  {matchingStudent[0].division}
                </p>
                <p className={styles.taskDate}>
                  <span className={styles.textBold}>Gender: </span>
                  {matchingStudent[0].gender}
                </p>
               </div>
              </div>
              <div>
                <p>
                  <FaTimes
                    onClick={() => deleteTask(matchingStudent[0].id)}
                    className={styles.delIcon}
                  />
                </p>
                <p>
                  <FaPencilAlt
                    onClick={() => sendDataToModal(matchingStudent[0].id)}
                    className={styles.editIcon}
                  />
                </p>
                <p>
                  <FaPrint
                    onClick={() => printTask(matchingStudent[0].id)}
                    className="printIcon"
                  />
                </p>
              </div>
            </div>
          ) : (
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              sendData={sendDataToModal}
              onPrint={printTask}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
