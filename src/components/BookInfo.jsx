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
    const [isExpanded, setIsExpanded] = useState(false);

    const { data, isLoading, error } = useQuery(['book',bookId], () => fetchBookInfo(bookId));

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return 'An error has occurred: ' + error.message;


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
  };




  return (
    <div className=" h-full flex flex-col gap-5">
      <div className=' h-[290px] md:h-[400px] bg-gray-400 dark:bg-gray-900 '>
        <div className="w-full h-[290px] md:h-[340px] absolute bg-no-repeat bg-center bg-cover blur-3xl brightness-75" style={{ backgroundImage: `url(${data.cover})`}}>
        </div>
        <div className='relative mt-16 md:ml-10 ml-3 flex gap-3 md:gap-10'>
          <div className='ml-5'>
            <img src={data.cover} alt="" className='rounded-2xl min-w-32 max-w-52 w-32 md:w-52' />
          </div>  

          <div className=' mr-3 w-3/4 flex flex-col justify-between text-white'>
            <div className=' text-xl sm:text-5xl'>
              {data.name}
            </div>
            <div className=' text-sm sm:text-2xl flex'>
              {data.genre.map((genre) => (
                <div>{genre.name}</div>
              ))}
            </div>
            <div className='sm:text-2xl'>
              {data.author.name}
            </div>
            <div className='sm:text-2xl'>
              {data.published}
            </div>
            <div className='sm:text-2xl'>
              {data.pages} <small>pages</small>
            </div>
            <div className='flex justify-end gap-4'>
              <button className=' bg-gray-500 sm:w-48 sm:h-14 w-20 rounded-xl'>add</button>
              <button className=' bg-gray-500 sm:w-48 sm:h-14 w-20 rounded-xl'>test</button>
            </div>
          </div>
        </div>
      </div>


      <div className='bg--200 p-4 ml-5 mr-5 '>
        <span>{data.about.substring(0,400)}</span>
        {isExpanded && (
        <span className="">
          {data.about.substring(400,)}
        </span>
      )}
      
      <span
      onClick={toggleExpand}
      className=" font-bold rounded cursor-pointer">
      {isExpanded ? '   See Less' : '...See More'}
      </span>
      </div>



      <div className='bg--200 p-4 ml-10 mr-10'>
        <Reviews bookId={bookId}/>
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