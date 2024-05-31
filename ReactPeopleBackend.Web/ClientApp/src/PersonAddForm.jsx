
import React from "react"

function PersonAddForm({ onTextChange, onAddClick, isEdit, onUpdateClick, onCancelClick, firstName, lastName, age }) {
    return(
        <>
            <div className="container ">
        <div className="row">
            <div className='col-md-3 mt-3'>
            <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={onTextChange} value={firstName} />
        </div>
        <div className='col-md-3 mt-3'>
            <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={onTextChange} value={lastName} />
        </div>
        <div className='col-md-3 mt-3'>
            <input type="text" className="form-control" placeholder="Age" name="age" onChange={onTextChange} value={age} />
                    </div>
                
            </div>
            <div className='col-md-3 mt-2'>
                {!isEdit &&
                    <button className="btn btn-primary w-100" onClick={onAddClick}>Add</button>
                }
                {isEdit &&
                    <>
                    <button className="btn btn-warning w-100 mt-2" onClick={onUpdateClick}>Update</button>
                    <button className="btn btn-dark w-100 mt-2" onClick={onCancelClick}>Cancel</button>                </>           }
                </div>
            </div>
        </>
    )
}

export default PersonAddForm