import { useState, useRef } from 'react';
import classes from './auth-form.module.css';

async function createUser(email, password){
   const result = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'}
    })

    if(!result.ok){
        throw new Error(result.message || 'Something went wrong');
    }

    const data = result.json();

    return data
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef()
  const passwordRef = useRef()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitFormHandler(){
    const enterEmail = emailRef.current.value
    const enterPassword = passwordRef.current.value

    if(isLogin){

    }else{
        try {
           const res =  await createUser(enterEmail, enterPassword);
           console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
