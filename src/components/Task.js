import React from 'react';
import { FaPencilAlt, FaTimes,FaPrint } from 'react-icons/fa';
import styles from '../styles/Task.module.css';


const Task = ({ task, onDelete, sendData ,onPrint}) => {

  return (
    <div>
      {

        <div className={styles.task}>

          <div  className='d-flex'>
          {task.gender === 'Male' ? <img src={require("../assets/male.png")} alt="" className={styles.img} />: <img src={require("../assets/female.png")} alt="" className={styles.img} />}
           <div className={styles.text}>
           <p className={styles.taskName}>
              <span className={styles.textBold}>StudentId: </span> {task.studentId}
            </p>
            <p className={styles.taskDate}><span className={styles.textBold}>Full Name: </span>{task.name}
            </p>
            <p className={styles.taskDate}><span className={styles.textBold}>Std: </span>{task.std}
            </p>
            <p className={styles.taskDate}><span className={styles.textBold}>Division: </span>{task.division}
            </p>
            <p className={styles.taskDate}><span className={styles.textBold}>Gender: </span>{task.gender}
            </p>
           </div>
          </div>
          <div className={styles.icon}>
            <p><FaTimes onClick={() => onDelete(task.id)} className={styles.delIcon} /></p>
            <p><FaPencilAlt onClick={() => sendData(task.id)} className={styles.editIcon} /></p>
            <p><FaPrint onClick={()=>onPrint(task.id)}  className='printIcon'/></p>
          </div>
        </div>
      }
    </div>
  )
}
export default Task;