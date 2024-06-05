import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Reviews from './Reviews';
import { IoMdStar } from "react-icons/io";
import RelatedBooks from './RelatedBooks';
import { IoIosArrowDown } from "react-icons/io";
import BooksByAuthor from './BooksByAuthor'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function BookInfo() {

    const { bookId } = useParams()

    const { data, isLoading, error } = useQuery(['book',bookId], () => fetchBookInfo(bookId));

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return 'An error has occurred: ' + error.message;






  return (
    <div className=" h-full flex flex-col gap-5">
      <div className=' h-[290px] md:h-[400px] bg-gray-400 dark:bg-gray-900 '>
        <div className="w-full h-[290px] md:h-[340px] absolute bg-no-repeat bg-center bg-cover blur-3xl" style={{ backgroundImage: `url(${data.cover})`}}>
        </div>
        <div className='relative mt-16 md:ml-10 ml-3 flex gap-3 md:gap-10'>
          <div className=''>
            <img src={data.cover} alt="" className='rounded-2xl min-w-32 w-32 md:w-52' />
          </div>

          <div className=' bg--100 mr-3 w-3/4 flex flex-col justify-between'>
            content
            <div className='bg--300'>
            {data.about}
            </div>
            <div className='bg--100 flex ml-24 gap-4'>
              <button className=' bg-gray-400 text-white w-[200px] h-[60px] rounded-2xl'>test</button>
              <button className=' bg-slate-300 backdrop-blur-2xl w-[200px] h-[60px] rounded-2xl'>test</button>
              <button className=' bg-slate-300 backdrop-blur-2xl w-[200px] h-[60px] rounded-2xl'>test</button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg--200 p-4'>
      {data.about}
      </div>
    </div>
  )
}


async function fetchBookInfo(bookId) {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}/`);
    if (!response.ok) {
       throw new Error('Network response was not ok');
    }
    return response.json();
   }

export default BookInfo