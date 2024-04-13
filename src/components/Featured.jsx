import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Stars from './Stars'
import { Link } from 'react-router-dom'


function Featured() {

    const {data,isLoading,error} = useQuery('books' , fetchBooks)

    if (isLoading) return <div>Loading</div>
    if (error) return <div>{error.message}</div>



  return (
    <div className="flex flex-col items-center m-7">
        <div className="text-center">
            <h1 className="text-2xl font-serif m-6">Feature Collection</h1>
        </div>
        <div className="carousel carousel-center max-w-[1240px] p-4 space-x-4 rounded-box">
            {data.map((book) => (
            <Link to={`/book/${book.id}`}>
                <div key={book.id} className="carousel-item flex flex-col w-max p-2 items-center justify-center border rounded-xl shadow-lg hover:shadow-sm hover:cursor-pointer ">
                    <img className="w-[170px] h-[250px] rounded-md" src={book.cover} alt={book.name}/>
                    <Stars rating={book.avg_rating}/>
                    <h1 className="text-wrap">{book.name.substring(0,17)}...</h1>
                </div>
            </Link>
            ))}
        </div>
    </div>
  )
}


async function fetchBooks() {
    try{
        const response = await axios.get('http://127.0.0.1:8000/api/featured')
        return response.data
    } catch{
        return "Network error"
    }

}


export default Featured