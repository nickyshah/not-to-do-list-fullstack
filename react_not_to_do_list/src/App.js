
import { useEffect, useState } from 'react';
import './App.css';
import { getAllTask, updateTask, deleteTasks } from './helper/axiosHelper';
import { Form } from './Components /Form';
import { Container } from './Components /Container';



function App() {
  // const [form, SetForm] = useState(initialState)
  const [resp, setResp] = useState({})
  const [taskList, setTaskList] = useState([])
  // const [idsToDelete, setIdsToDelete] = useState([])


  const totalHrs = taskList.reduce((acc, item) => acc + +item.hr, 0)

  // const hoursWeek = 168


  useEffect(() => {
    getTask()
  }, [])

  const getTask = async () => {
    const data = await getAllTask();
    console.log(data);
    data?.status === "Success" && setTaskList(data?.taskList);
  }

 
  const randomStr = () => {
    const charLength = 6
    const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

    let id = ""
    for (let i = 0; i < charLength; i++) {
      const randNum = Math.round(Math.random() * (str.length - 1))
      id += str[randNum]
    }
    return id
  }
  // console.log(taskList)

  

// const multipleChecked = (_id) =>{
//   if (idsToDelete.include(_id)){
//     setIdsToDelete()
//   }
// }




  return (
    <div className="wrapper">

      <div className="container">
        {/* <!-- Top Title --> */}
        <div className="row gap-2">
          <div className="col mt-5 text-center">
            <h1>Not to do list</h1>
          </div>

        </div>

        {/* show the server message */}

        {
          resp?.message && <div className=
            {
              resp?.status === 'success'
                ?
                "alert alert-success"
                :
                "alert alert-danger"
            }
          >{resp?.message}</div>
        }


        {/* <!-- form --> */}
       <Form  getTask={getTask} totalHrs={totalHrs} setResp={setResp} resp={resp} />
        {/* <!-- Table area  --> */}
        <Container taskList={taskList} setResp={setResp} getTask={getTask} />

        {/* <!-- Total Time allocated --> */}
        <div className="alert alert-info" >
          Total hrs per week allocated = <span id="totalHr" >{totalHrs}</span>hr
        </div>
      </div>
    </div >





  );
}

export default App;
