import React from 'react'
import { useState } from 'react'
import { useMutation } from 'react-query'
import shelf from '../../assets/shelf.jpg'
import { Link } from 'react-router-dom'

function Login() {


    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleUsername = (e) => {
        setUsename(e.target.value)
    }

    const mutation = useMutation(({username,password}) => axios.post('http://127.0.0.1:8000/api/login/', {username,password},{
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
        mutation.mutate({username,password})
    }
  

  return (
    <div className="h-screen text-black flex flex-col justify-center items-center bg-gray-100">
        <div className={`flex flex-col items-center gap-3 mt-10  w-[350px] h-[400px] rounded-xl`}>
            <h1 className="text-3xl font-serif">Login in</h1>
            <form action="" method='post'  onSubmit={handleSubmit} className=" flex flex-col items-center w-full h-full p-3 rounded-xl gap-3">
            <div className="flex flex-col">
                <label htmlFor="email">Email : </label>
                <input type="text" onChange={handleUsername} name="username" className="rounded-lg shadow-lg w-[300px] h-[30px]"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password : </label>
                <input type="password" onChange={handlePassword} name="password" className="rounded-lg shadow-lg  w-[300px] h-[30px]"/>
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
        <div className="flex mt-10">
            <img src={shelf} alt="shelf" className="h-40 w-screen opacity-55" />
            {/* <img src={shelf} alt="shelf" className="h-40 w-1/2" /> */}
        </div>
    </div>
  )
}

export default Login