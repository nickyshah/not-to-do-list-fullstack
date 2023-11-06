import React, { useState } from 'react'
import { postData } from '../helper/axiosHelper'

const initialState = {
    task: "",
    hr: ""
  
  }
  const hoursWeek = 168
  

export const Form = ({getTask, totalHrs, setResp, resp})=> {

const [form, SetForm] = useState(initialState)
// const [resp, setResp] = useState({})

  
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



  return (
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
  )
}
