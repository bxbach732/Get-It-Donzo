const Todo = ({ todo, toggleImportance }) => {
    const label = todo.completed 
      ? 'Complete' 
      : 'Redo';
  
    return (
      <div className='todo' style={styles.title}>
        {todo.title} <button onClick={toggleImportance}>{label}</button>
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