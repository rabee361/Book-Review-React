import React from 'react'
import { useState } from 'react'
import { useMutation } from 'react-query'
import shelf from '../../assets/shelf.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function SignUp() {

    const [password , setPassword] = useState('')
    const [password2 , setPassword2] = useState('')
    const [username , setUsername] = useState('')
    const [email , setEmail] = useState('')


    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handlePassword2 = (e) => {
        setPassword2(e.target.value)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    

    const mutation = useMutation(({email,username,password,password2}) => axios.post('http://127.0.0.1:8000/api/sign-up/', {username,email,password,password2},{
        'headers': {
            'Content-Type': 'application/json',
        }
    }))

    if (mutation.isLoading) {
        return <span>Submitting...</span>;
      }
    
      if (mutation.isError) {
        return <span>Error: {mutation.error.message}</span>;
      }
    
      if (mutation.isSuccess) {
        return <span>{mutation.data.body}</span>;
      }


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        mutation.mutate({username,email,password,password2})
    }
  

  return (
    <div className="h-screen text-black flex flex-col justify-center items-center bg-gray-100">
        <div className={`flex flex-col items-center gap-3 pt-  w-[350px] h-[400px] rounded-xl`}>
            <h1 className="text-3xl font-serif">Sign Up</h1>
            <form action="" method='post'  onSubmit={handleSubmit} className=" flex flex-col items-center w-full h-full p-3 rounded-xl gap-3">
            <div className="flex flex-col">
                <label htmlFor="text">Username : </label>
                <input type="text" onChange={handleUsername} name="username" className="rounded-lg bg-gray-300 shadow-lg w-[300px] h-[30px]"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="email">Email : </label>
                <input type="text" onChange={handleEmail} name="email" className="rounded-lg bg-gray-300 shadow-lg w-[300px] h-[30px]"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password : </label>
                <input type="password" onChange={handlePassword} name="password" className="rounded-lg bg-gray-300 shadow-lg  w-[300px] h-[30px]"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="password2">Confirm Password : </label>
                <input type="password" onChange={handlePassword2} name="password2" className="rounded-lg bg-gray-300 shadow-lg  w-[300px] h-[30px]"/>
            </div>
            <div className={`mt-5 shadow-lg rounded-full bg-amber-200 hover:bg-amber-300 w-[200px] h-[34px] text-center font-bold`}>
                <button type='submit' className="p-1">create account</button>
            </div>
            </form>
            <div className="text-center mb-3">
                Already have account ?
                <div className={`mt-5 shadow-lg rounded-full w-[200px] h-[34px] border border-gray-200 text-center font-bold`}>
                <Link to="/login">
                    <button type='submit' className="p-1">Login</button>
                </Link>
                </div>
            </div>
        </div>
        <div className="flex mt-16">
            <img src={shelf} alt="shelf" className="h-40 w-screen opacity-55" />
            {/* <img src={shelf} alt="shelf" className="h-40 w-1/2" /> */}
        </div>
    </div>
  )
}

export default SignUp