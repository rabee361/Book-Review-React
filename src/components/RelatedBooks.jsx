import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

function RelatedBooks({bookId}) {

    const { data , isloading , error } = useQuery('related-books' , () => fetchRelatedBooks(bookId))

    if (isloading) return <div>Loading</div>
    else if(error) return <div>error : {error.message}</div>
    if (!data) return <div>No related books found.</div>; // Add this line

  return (
    <div className="pr-5">
        <h1>you may also like :</h1>
        <div className="carousel carousel-center flex gap-1 mb-4 rounded-box">
            {data && data.map((book) => (
            <div key={book.id} className="carousel-item" onClick={() => getBook(book.id)}>
                <img src={book.cover} alt={book.name} className="h-[230px] border rounded-lg hover:border-stone-950"/>
            </div>
                ))}
        </div>
    </div>
  )
}


async function fetchRelatedBooks(bookId) {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/api/related-books/${bookId}/`)
        console.log(response)
        return response.data
    } catch{
        return "Network error"
    }
}

export default RelatedBooks