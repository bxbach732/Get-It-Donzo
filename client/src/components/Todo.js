import React from 'react';
import todoService from '../services/todos';


const Todo = ({ title, description, toggleCompletion, handleDeletion }) => {
    return (
        <>
            <input onChange={toggleCompletion} type='checkbox'/>
            <label>{title}: {description}</label>
            <button onClick={handleDeletion}>Delete</button>
        </>
    )
}

export default Todo