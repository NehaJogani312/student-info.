import Task from './Task';
import "../index.css"
const Tasks = ({ tasks, onDelete, sendData, onPrint }) => {
  
  return (
    <>
      {
        tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} sendData={sendData} onPrint={onPrint}/>
        ))
      }
    </>
    )
}
export default Tasks;