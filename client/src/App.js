import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import Footer from './components/Footer';

import todoService from './services/todos';
import loginService from './services/login';

const App = () => {
  const [todos, setTodos] = useState([]);
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

  const todoFormRef = useRef();

  const addTodo = (todoObject) => {
    todoService
      .create(todoObject)
      .then(returnedTodo => {
        setTodos(todos.concat(returnedTodo));
        todoFormRef.current.toggleVisibility()
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        email, password,
      });
      todoService.setToken(user.token);
      window.localStorage.setItem(
        'loggedTodoUser', JSON.stringify(user)
      ) 
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

  return (
    <div>
      <h1>Todo app</h1>
      <Notification message={errorMessage} />

      {!user &&
        <Togglable buttonLabel="Log in">
          <LoginForm
            email={email}
            password={password}
            handleEmailChange={({ target }) => setEmail(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new todo" ref={todoFormRef}>
            <TodoForm createTodo={addTodo} />
          </Togglable>
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
            toggleCompleted={() => toggleCompleted(todo.id)}
          />
        )}
      </ul>
      
      <Footer />
    </div>
  )
}

export default App