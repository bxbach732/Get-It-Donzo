import { useState, useEffect } from 'react';
import Todo from './components/Todo';
import Notification from './components/Notification';
import Footer from './components/Footer';
import todoService from './services/todos';
import loginService from './services/login';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {
    todoService
      .getAll()
      .then(initialTodos => {
        console.log(initialTodos)
        setTodos(initialTodos)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTodoUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      todoService.setToken(user.token);
    }
  }, [])

  const addTodo = (event) => {
    event.preventDefault()
    const todoObject = {
      title: newTodoTitle,
      description: newTodoDescription,
    }

    todoService
      .create(todoObject)
        .then(returnedTodo => {
        setTodos(todos.concat(returnedTodo))
        setNewTodoTitle('');
        setNewTodoDescription('');
      })
  }

  const handleTodoChange = (event) => {
    setNewTodoTitle(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    setNewTodoDescription(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        email, password,
      })
      window.localStorage.setItem(
        'loggedTodoUser', JSON.stringify(user)
      ) 
      todoService.setToken(user.token);
      setUser(user);
      setEmail('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const todosToShow = showAll
    ? todos
    : todos.filter(todo => todo.completed)

  const toggleCompleted = id => {
    const todo = todos.find(n => n.id === id)
    const changedTodo = { ...todo, completed: !todo.completed }

    todoService
      .update(id, changedTodo).then(returnedTodo => {
        setTodos(todos.map(todo => todo.id !== id ? todo : returnedTodo))
      })
      .catch(error => {
        setErrorMessage(
          `Todo '${todo.title}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setTodos(todos.filter(n => n.id !== id))
      })
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Email
          <input
          type="text"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        Password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const todoForm = () => (
    <form onSubmit={addTodo}>
      Task: <input value={newTodoTitle} onChange={handleTodoChange} /> <br></br>
      Description: <input value={newTodoDescription} onChange={handleDescriptionChange} />
      <button type="submit">Save</button>
    </form>  
  )

  return (
    <div>
      <h1>Todo app</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()} 
      {user && <div>
        <p>{user.name}({user.email}) logged in</p>
          {todoForm()}
        </div>
      }


      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'completed' : 'redo' }
        </button>
      </div> 
      <ul>
        {todosToShow.map(todo => 
          <Todo
            key={todo.id}
            todo={todo}
            toggleImportance={() => toggleCompleted(todo.id)}
          />
        )}
      </ul>
      
      <Footer />
    </div>
  )
}

export default App