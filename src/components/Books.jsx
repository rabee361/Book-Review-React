import React, { useState } from 'react'
import { useQuery} from 'react-query';
import { keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Genres from './Genres'
import Pagination from './Pagination';

function Books({getBook}) {
  const [page , setPage] = useState(1)
  const [genre , setGenre] = useState(' ')

  const { data,
    isLoading: isBooksLoading,
    error: booksError ,
    isPlaceholderData } = useQuery(['books', genre , page], () => fetchBooks(genre,page), keepPreviousData);

  const { data: data2, isLoading: isGenresLoading, error: genresError } = useQuery('genres', fetchGenres);
  const { data: data3, isLoading: isAuthorsLoading, error: authorsError } = useQuery('authors', fetchAuthors);
  const { data: data4, isLoading: isPostsLoading, error: postsError } = useQuery('posts', fetchPosts);
  const { data: data5, isLoading: isQuotesLoading, error: quotesError } = useQuery('quotes', fetchQuotes);

  if (isBooksLoading || isGenresLoading || isAuthorsLoading || isPostsLoading || isQuotesLoading) return 'Loading...';
  if (booksError || genresError || authorsError || postsError || quotesError) return `An error has occurred: ${booksError?.message || genresError?.message || authorsError?.message || postsError?.message || quotesError?.message}`;
 
  const handleChange = (e) => setGenre(e.target.value)



  return (
    <div className="grid grid-cols-6 pt-16 h-screen gap-2 text-black dark:text-slate-400 transition-all ease-linear duration-100">

      <div className="flex flex-col items-center gap-3 mt-2 col-span-1 text-center dark:bg-slate-800 shadow-xl rounded-xl ml-1 bg-amber-300">
        <div className="pt-6 pl-3 gap-1 w-full flex flex-col">
          <h1 className="font-bold">Categories:</h1> 
          {data2.slice(0,10).map((genre) => (
                <h3 key={genre.id} className="dark:hover:text-white hover:text-amber-100">{genre.name}</h3>
            ))}
            <small>
              <Link to="/genres">
                see more
              </Link>
            </small>
        </div>

        <div className="pt-6 pl-3 gap-1 w-full flex flex-col">
          <h1 className="font-bold">Top Authors :</h1> 
            {data3.map((author) => (
              <h3 key={author.id} className="hover:text-amber-900 dark:hover:text-white">{author.name}</h3>
            ))}
        </div>

      </div>

      <div className="col-span-4 p-3 mt-2 flex-grow-3 dark:bg-slate-800 bg-amber-300 shadow-lg rounded-lg">
        <div className="grid grid-cols-6 grid-rows-2 row-span-2 gap-1">
          {data.results.map((book) => (
          <Link to={`/book/${book.id}`}>
            <div key={book.id} className="" onClick={() => getBook(book.id)}>
                <img src={book.cover} alt={book.name} className="h-[230px] border hover:border-stone-950"/>
            </div>
          </Link>
              ))}
        </div>

        <Pagination setPage={setPage} count={data.count}/>

      </div>


      <div className="flex flex-col items-center gap-3 mt-2 dark:bg-slate-800 text-center bg-amber-300 shadow-xl rounded-xl mr-1">
        <div className="">
          <h1 className="font-bold">Top Articles: </h1>
          {data4.map((post) => (
            <li key={post.id} className="hover:border-b">{post.title}</li>
          ))}
        </div>

        <div className="pt-6">
          <h1 className="font-bold">New Articles: </h1>
            {data4.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => (
              <li key={post.id} className="hover:border-b">{post.title}</li>
            ))}
        </div>

        <div className="pt-6">
            <h1 className="font-bold">Qutoes: </h1>
            {data5.map((quote) => (
              <div key={quote.id} className="flex flex-col">
                <div className="flex flex-row">
                  <div className="avatar bg--700">
                    <div className="w-14 h-14 rounded-full">
                      <img src={quote.image} alt={quote.text} />
                    </div>
                  </div>
                  <small className="text-sm ">"{quote.text}"</small>
                </div>
                <h3 className="text-sm text-right pr-5">-{quote.author_name}-</h3>
                <hr />
              </div>
            ))}

        </div>

      </div>

      {/* <div className="col-span-2">
        <form action="" method='get' onSubmit={handleChange}>
          <label htmlFor="genre">Select Genre:</label>
          <input type="text" name='genre' placeholder='Horror'  />
        </form>
      </div> */}
    </div>
  )
}


async function fetchBooks(genre,page) {
    const response = await fetch(`http://127.0.0.1:8000/api/books/?genre=${genre}&page=${page}`);
    if (!response.ok) {
       throw new Error('Network response was not ok');
    }
    return response.json();
   }


  async function fetchGenres() {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/genres');
      return response.data
    } catch{
      return "Network error"
    }
  }

    async function fetchAuthors() {
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/authors');
        return response.data

      }catch{
        return "Network error"
      }
    }


        
    async function fetchPosts() {
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/posts');
        return response.data
      } catch{
        return "Network error"
      }
    }

    async function fetchQuotes(){
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/quotes/');
        return response.data
      } catch{
        return 'Network error'
      }
    }


export default Books