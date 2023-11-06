import React, { useState } from 'react'
import { deleteTasks, updateTask } from '../helper/axiosHelper'

export const Container = ({taskList, setResp, getTask}) => {

    const [idsToDelete, setIdsToDelete] = useState([])


    const handleOnDelete = async (_id) => {
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
    
      const switchTask = async (obj) => {
        //send update to the surver 
    
        const result = await updateTask(obj)
        setResp(result)
        //if success, fetch all the data
        result.status === 'Success' && getTask()
    
      }
     

    const entry = taskList.filter(item => item.type === "entry")
    const bad = taskList.filter(item => item.type === "bad")

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
                                            checked={idsToDelete.includes(item._id)} />
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
    )
}
