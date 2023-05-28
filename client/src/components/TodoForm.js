import { useState } from 'react'

const TodoForm = ({ createTodo }) => {
  const [newTodo, setNewTodo] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const addTodo = (event) => {
    event.preventDefault()
    createTodo({
      title: newTodo,
      description: newDescription
    })

    setNewTodo('');
    setNewDescription('');
  }

  return (
    <div>
      <h2>Create a new todo</h2>

      <form onSubmit={addTodo}>
        Task: <input value={newTodo} onChange={event => setNewTodo(event.target.value)} />
        Description: <input value={newDescription} onChange={event => setNewDescription(event.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default TodoForm;