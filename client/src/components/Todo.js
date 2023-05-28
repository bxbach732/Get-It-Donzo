const Todo = ({ todo, toggleCompleted }) => {
    const label = todo.completed 
      ? 'redo' 
      : 'complete';
  
    return (
      <div className='todo'>
        {todo.title} <button onClick={toggleCompleted}>{label}</button>
        <p style={styles.description}>{todo.description} </p>
      </div>
    )
}

export default Todo

const styles = {
  title: {
    color: 'black',
    fontStyle: 'bold',
    fontSize: 20
  },
  description: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 15
  }
}