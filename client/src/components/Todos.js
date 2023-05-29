import React from 'react';
import { useState, useContext, useEffect } from 'react';
import authContext from './authContext';
import todoService from '../services/todos';
import Todo from './Todo';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [user, setUser] = useContext(authContext);
    const [showOngoing, setFilter] = useState(true)

    useEffect(() => {
        todoService
            .getTodosOfUser(user.id)
                .then(initialTodos => {
                setTodos(initialTodos)
            })
    }, [])

    const addTodo = (event) => {
        event.preventDefault()
        if (!todoTitle) return;

        const todoObject = {
            title: todoTitle,
            description: todoDescription,
            id: user.id
        }
        
        todoService
            .create(todoObject)
            .then(() => {
                todoService
                    .getTodosOfUser(user.id)
                    .then(todoList => {
                        setTodos(todoList)
                    })
            })
        setTodoTitle('');
        setTodoDescription('');
    }
    
    const toggleCompletion = id => {
        const todo = todos.find(todo => todo.id === id)
        const changedTodo = { ...todo, completed: !todo.completed }
        
        todoService
            .update(id, changedTodo).then(returnedTodo => {
                setTodos(todos.map(todo => todo.id !== id ? todo : returnedTodo))
                todoService
                    .getTodosOfUser(user.id)
                    .then(todoList => {
                        setTodos(todoList)
                    })
            })
            .catch(error => {
                console.log(error);
                setTodos(todos.filter(todo => todo.id !== id))
            })
    }

    const todosToshow = showOngoing ? todos.filter(todo => !todo.completed) : todos.filter(todo => todo.completed)

    const handleDeletion = (id) => {
        todoService
            .deleteTodo(id)
            .then(() => {
                todoService
                    .getTodosOfUser(user.id)
                    .then(todoList => {
                        setTodos(todoList)
                    })
            }).catch(error => {
                console.log(error);
                setTodos(todos.filter(todo => todo.id !== id))
            })
    }

    return (
        <div>
            <select onChange={() => setFilter(!showOngoing)}>
                <option value='ongoing'>ongoing tasks</option>
                <option value='completed'>completed task</option>
            </select>
            {todosToshow.map((todo)=> (
                <div key={todo.id}>
                    {/* <input onChange={() => toggleCompletion(todo.id)} type='checkbox'/>
                    <label>{todo.title}: {todo.description}</label>
                    <button>Delete</button> */}
                    <Todo 
                        title={todo.title} 
                        description={todo.description} 
                        toggleCompletion={() => toggleCompletion(todo.id)}
                        handleDeletion={() => handleDeletion(todo.id)}
                    />
                </div>
            ))}
            <br/>
            <form onSubmit={addTodo}>
                <input 
                    value={todoTitle} 
                    onChange={event => setTodoTitle(event.target.value)}
                /> <br/>
                <input 
                    placeholder='optional' 
                    value={todoDescription} 
                    onChange={event => setTodoDescription(event.target.value)}
                /> <br/>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default Todos;