import React from 'react'
import { useQuery } from 'react-query'


function Genres() {

    const { data, isLoading, error } = useQuery('genres', fetchGenre);

    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;

  return (
      <div className="text-center text-black col-span-4 bg-green-800 dark:text-slate-300 flex flex-grow-3 max-w-fit">
          <h1 className="text-3xl text-left pl-32 bg-orange-300">Select a Genre: </h1>
          <ul className="grid grid-cols-4 gap-1 bg-red-300">
              {data.slice().sort((a, b) => a.name - b.name).map((genre) => (
              <h1 key={genre.id}>
                  <small className="hover:filter hover:drop-shadow-md hover:text-white">{genre.name}</small>
              </h1>
              ))}
          </ul>
      </div>
  )
}

async function fetchGenre() {
    const response = await fetch('http://127.0.0.1:8000/api/genres/');
    if (!response.ok) {
       throw new Error('Network response was not ok');
    }
    return response.json();
   }
   

export default Genres