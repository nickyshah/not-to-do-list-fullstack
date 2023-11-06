
import { useEffect, useState } from 'react';
import './App.css';
import { postData, getAllTask, updateTask, deleteTasks } from './helper/axiosHelper';

const initialState = {
  task: "",
  hr: ""

}

function App() {
  const [form, SetForm] = useState(initialState)
  const [taskList, setTaskList] = useState([])
  const [resp, setResp] = useState({})
  const [idsToDelete, setIdsToDelete] = useState([])


  const totalHrs = taskList.reduce((acc, item) => acc + +item.hr, 0)

  const hoursWeek = 168


  useEffect(() => {
    getTask()
  }, [])

  const getTask = async () => {
    const data = await getAllTask();
    console.log(data);
    data?.status === "Success" && setTaskList(data?.taskList);
  }

  const handleOnChange = (e) => {
    // console.log(e);
    const { name, value } = e.target
    resp?.message && setResp({});
    SetForm({
      ...form,
      [name]: value
    })
    // const obj = {
    //   // task: "coding",
    //   // hr: "33"
    //   [name] = value,
    // }

  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (totalHrs + +form.hr > hoursWeek) {
      return alert("Sorry boss You can't add any more task")
    }
    // const obj = {
    //   ...form,
    //   type: "entry",
    //   id: randomStr()
    // }
    // when we store data in database it already has the id and type and form is called in postData

    // setTaskList([...taskList, obj])
    const data = await postData(form)
    setResp(data)

    if (data.status === 'Success') {
      //reset the form 
      SetForm(initialState)
      getTask()
    }
  };

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

  const handleOnDelete = async (_id) => {
    // if (window.confirm("Are You Sure Want To Delete? "))
    //  {

    //   // filter 
    //   const filterArg = taskList.filter((item) => item.id !== id)
    //   setTaskList(filterArg)}


    //calling api to delete the data
    // fetching api 
    if (
      window.confirm(`Are you sure you want to delete ${idsToDelete.length} tasks?`)
    ) {

      const result = await deleteTasks({ ids: [_id] })
      // console.log(result)
      // console.log(obj)
      setResp(result)

      //  getTask()
      result?.status === 'Success' && getTask() && setIdsToDelete([]);
    }

  }

  const handleOnCheck = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value)

    const tempArg = idsToDelete.filter(itm => itm !== value)

    if (checked) {
      //push in to idsToDelete
      tempArg.push(value)
    }
    setIdsToDelete(tempArg)
  }

  const switchTask = async (obj) => {
    // console.log(_id, type)
    // const arg = taskList.map((item) => {
    //   if(item.id=== id){
    //     return{
    //       ...item, 
    //       type,
    //     }
    //   }
    //   return item
    // })
    // setTaskList(arg)

    //send update to the surver 

    const result = await updateTask(obj)
    setResp(result)
    //if success, fetch all the data
    result.status === 'Success' && getTask()

  }
  const entry = taskList.filter(item => item.type === "entry")
  const bad = taskList.filter(item => item.type === "bad")

// const multipleChecked = (_id) =>{
//   if (idsToDelete.include(_id)){
//     setIdsToDelete()
//   }
// }

const handleOnAllCheck = (e) => {
  // console.log(e)
  const {checked, value} = e.target;
  console.log(checked,value)

  if (value === "entry"){
    console.log(entry)
    const entryIds = entry.map((item) => item._id)
    console.log(entryIds)

    // if checked add the ids to idsToDelete
    if(checked){
      setIdsToDelete([...idsToDelete, ...entryIds])
    }else{
      // else remove entryIds from the idsToDelete
      const temArgIds = idsToDelete.filter(id => !entryIds.includes(id))
      setIdsToDelete(temArgIds)
    }
  } 
  if (value === "bad"){
    console.log(bad)
    const badIds = bad.map((item) => item._id)
    console.log(badIds)
    if (checked) {
      setIdsToDelete([...idsToDelete, ...badIds])
    }
    else{
      const tempBad = idsToDelete.filter(id => !badIds.includes(id))
      setIdsToDelete(tempBad)
    }
  }
}


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
        <form action="javascript:void(0)" onSubmit={handleOnSubmit} className="mt-5 border p-4 rounded shadow-lg bg-transparent ">
          <div className="row  g-2" >
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Coding.." aria-label="First name" name="task" value={form?.task} onChange={handleOnChange} />
            </div>
            <div className="col-md-3">
              <input type="number" min="1" className="form-control" placeholder="00.00" aria-label="Last name" name="hr" value={form?.hr} required onChange={handleOnChange} />
            </div>
            <div className="col-md-3">
              <div className="d-grid">
                <button className="btn btn-primary">Add task</button>
              </div>
            </div>

          </div>
        </form>
        {/* <!-- Table area  --> */}
        <div className="row mt-5 pt-2">
          {/* <!-- Entry List  --> */}
          
          <div className="col-md">
            <h3 className="text-center">Task Entry List</h3>
            <hr />
            <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name='' id=''
                          onChange={handleOnAllCheck}
                          value="entry" /> Select All Entry 
                      </label>
            <table className="table table-striped table-hover border ">
              <tbody id="entry">
              
                {
                  entry.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}.</td>
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name='' id=''
                          onChange={handleOnCheck}
                          value={item._id} 
                          checked={idsToDelete.includes(item._id)}/>
                      </label>
                      <td>{item.task}</td>
                      <td>{item.hr} Hr</td>
                      <td className="text-end">
                        {/* <button
                          onClick={() => handleOnDelete(item._id)}
                          className="btn btn-danger"><i className="fa-solid fa-trash"></i>
                        </button> */}
                        <button onClick={() => switchTask({ _id: item._id, type: "bad" })} className="btn btn-success"><i className="fa-solid fa-arrow-right"></i>
                        </button>

                      </td>
                    </tr>
                    // console.log(item, i)
                  )
                }
              </tbody>
            </table>
          </div>


          {/* <!-- Bad List --> */}
          <div className="col-md">
            <h3 className="text-center">Bad list</h3>
            <hr />

            <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name='' id=''
                          onChange={handleOnAllCheck}
                          value="bad" 
                          
                          /> Select All Bad 
                      </label>

            <table className="table table-striped table-hover border ">
              <tbody id="bad">
                {
                  bad.map((item, i) =>
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" name='' id='' onChange={handleOnCheck}
                          value={item._id}
                          checked={idsToDelete.includes(item._id)}
                           />
                      </label>
                      <td>{item.task}</td>
                      <td>{item.hr}hr</td>
                      <td className="text-end g-2" >
                        <button onClick={() => switchTask({ _id: item._id, type: "entry" })} className="btn btn-warning"><i className="fa-solid fa-arrow-left"></i>
                        </button>
                        {/* <button
                        onClick={() => handleOnDelete(item._id)}
                        className="btn btn-danger"><i className="fa-solid fa-trash"></i>
                      </button> */}


                      </td>
                    </tr>
                    // console.log(item, i)
                  )
                }
              </tbody>
            </table>
            {
              idsToDelete.length > 0 &&
              <div className="d-grid mb-2"><button onClick={handleOnDelete} className="btn btn-danger"><i className="fa-solid fa-trash"></i>Delete {idsToDelete.length} tasks</button></div>
            }


            <div className="alert alert-info" >You could have saved = <span id="badHr">{bad.reduce((acc, item) => acc + +item.hr, 0)}</span>hr</div>
          </div>
        </div>

        {/* <!-- Total Time allocated --> */}
        <div className="alert alert-info" >
          Total hrs per week allocated = <span id="totalHr" >{totalHrs}</span>hr
        </div>
      </div>
    </div >





  );
}

export default App;
