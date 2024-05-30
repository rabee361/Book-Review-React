import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useMutation } from 'react-query'
import shelf from '../../assets/shelf.jpg'
import { Link } from 'react-router-dom'

function Login() {


    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [refresh , setRefresh] = useState('')
    const [access , setAccess] = useState('')

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    // const mutation = useMutation(({username,password}) => axios.post('http://127.0.0.1:8000/api/log-in/', {username,password}))


    // if (mutation.isLoading) {
    //     return <span>Submitting...</span>;
    //   }
    
    //   if (mutation.isError) {
    //     return <span>Error: {mutation.error.message}</span>;
    //   }
    
    //   if (mutation.isSuccess) {
    //     return <span>{mutation.data.body}</span>;
    //   }


    // const handleSubmit = (e) => {
    //     e.preventDefault(); // Prevent the default form submission
    //     mutation.mutate({username,password})
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // try {
            const response = await axios.post('http://127.0.0.1:8000/api/log-in/', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setAccess(response.data.tokens.access)
            setRefresh(response.data.tokens.refresh)

            console.log(access)
            console.log(refresh)

            // Handle successful login here
        // } catch (error) {
        //     console.error('Login failed:', error.response.data);
        //     // Handle login failure here
        // }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault(); // Prevent the default form submission
    //     mutation.mutate({username,password})
    // }
  

  return (
    <div className="h-screen text-black flex flex-col justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center w-8/12 sm:w-[300px] gap-3 mt-10 rounded-xl">
            <h1 className="text-3xl font-serif">Login</h1>
            <form action="" method='post'  onSubmit={handleSubmit} className=" flex flex-col items-center w-full h-full p-3 rounded-xl gap-3">
            <div className="flex flex-col w-full">
                <label htmlFor="email">Email : </label>
                <input type="text" onChange={handleUsername} name="username" className="rounded-lg shadow-lg w-full "/>
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="password">Password : </label>
                <input type="password" onChange={handlePassword} name="password" className="rounded-lg shadow-lg  w-full "/>
            </div>
            <div className={`mt-5 shadow-lg rounded-full bg-amber-200 hover:bg-amber-300 w-[200px] h-[34px] text-center font-bold`}>
                <button type='submit' className="p-1">login</button>
            </div>
            <small>forgot password ?</small>
            </form>
            <div className="text-center mb-3">
                new to our family ?
                <div className={`mt-5 shadow-lg rounded-full hover:bg-amber-200 w-[200px] h-[34px] border border-gray-200 text-center font-bold`}>
                <Link to="/signup">
                    <button type='submit' className="p-1">Sign Up</button>
                </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login