const LoginForm = ({
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    email,
    password
   }) => {
   return (
     <div>
       <h2>Login</h2>
 
       <form onSubmit={handleSubmit}>
         <div>
           Email
           <input
             value={email}
             onChange={handleEmailChange}
           />
         </div>
         <div>
           Password
           <input
             type="password"
             value={password}
             onChange={handlePasswordChange}
           />
       </div>
         <button type="submit">login</button>
       </form>
     </div>
   )
 }
 
 export default LoginForm