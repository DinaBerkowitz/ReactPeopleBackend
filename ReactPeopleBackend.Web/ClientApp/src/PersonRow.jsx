


import React from "react";

function PersonRow({ person, onEditClick, onDeleteClick, selected, onSelectClick }) {
    const { firstName, lastName, age } = person;
    return (

        <tr>
            <td>
                
                <div className="d-flex justify-content-center align-items-center">
                    <input
                        checked={selected}
                        onChange={onSelectClick}
                        style={{ width: 30, height: 30 }} type="checkbox" className="form-check-input" />
                </div>
                
            </td>
            
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
    )
}

export default PersonRow;