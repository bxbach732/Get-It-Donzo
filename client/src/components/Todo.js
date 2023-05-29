import React from 'react';
import todoService from '../services/todos';


const Todo = ({ title, description, toggleCompletion, handleDeletion }) => {
    return (
        <label className={"checkbox-label"} >
            <input className={"checkbox-input"} onChange={toggleCompletion} type='checkbox'/>
            <div className="text-wrapper">
                <p>{title}:</p> 
                <p>{description}</p>
            </div>
            <button onClick={handleDeletion}>Delete</button>
        </label>
    )
}

export default Todo