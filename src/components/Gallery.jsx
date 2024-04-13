  import axios from 'axios'
  import React, { useState } from 'react'
  import { useQuery } from 'react-query'
import Stars from './Stars'
  // import { Stars } from './Stars'

  function Gallery() {
    const [genre , setGenre] = useState('')

    const handleClick = (name) => {
      if (name=="all"){
        setGenre('')
      }
      else{
        setGenre(name)
      }
    }

    const { data, isLoading, error } = useQuery(['books',genre], () => fetchBooks(genre))
    const { data: data2, isLoading: isLoading2, error: error2 } = useQuery('genres', fetchGenres)
   
    if (isLoading || isLoading2) return <div>Loading</div>
    if (error || error2) return <div>{error?.message || error2?.message}</div>
   
    return (
      <div>
        <div className="flex gap-3 justify-center mt-5 mb-5">
          <small className="hover:shadow-lg text-black" onClick={() => handleClick("all")}>
            All
          </small>
          {
            data2 && data2.map((genre) => (
              <small key={genre.id} className="hover:shadow-lg hover:cursor-pointer text-black" onClick={() => handleClick(genre.name)}>
                {genre.name}
              </small>
            ))
          }
          <small className="hover:shadow-lg text-black">
            more..
          </small>
        </div>
        <div className="grid grid-cols-6 pt-3 justify-items-center">
          {data.map((book) => (
          <div key={book.id} className="flex flex-col max-w-screen p-2 items-center text-black justify-center border rounded-xl shadow-lg hover:shadow-sm hover:cursor-pointer ">
              <img className="w-[170px] h-[250px] rounded-md" src={book.cover} alt={book.name}/>
              <Stars/>
              <h1 className="text-wrap">{book.name}</h1>
          </div>
          ))}
        </div>
      </div>

    )
  }


  async function fetchBooks(genre) {
    try {
      let url = `http://127.0.0.1:8000/api/books`
      if (genre) {
        url += `?genres=${genre}`;
      }
      const response = await axios.get(url);
      return response.data;
  } catch (error) {
      console.error('Network issue:', error);
      throw new Error('Network issue');
  }
  }

  async function fetchGenres(){
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/genres`);
      return response.data  
    } catch (error) {
      console.error('genre couldnt fetch');
      throw new Error('Network issue');
    }
  }


  export default Gallery