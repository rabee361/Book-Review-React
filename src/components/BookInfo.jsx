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
    const [isExpandedAuthor, setIsExpandedAuthor] = useState(false);

    const { data, isLoading, error } = useQuery(['book',bookId], () => fetchBookInfo(bookId));

    if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;
    if (error) return 'An error has occurred: ' + error.message;

    const totalStars = Math.round(data.avg_rating)
    let rating = []
    for(let i = 0; i<totalStars ; i++){
      rating.push(
        <IoMdStar fill='orange' size={30}/>
      )
    }

    while (rating.length < 5){
      rating.push(
        <IoMdStar size={30} fill='white'/>
      )
    }


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
  };

  const toggleExpandAuthor = () => {
    setIsExpandedAuthor(!isExpandedAuthor);
};






  return (
    <div className="grid grid-cols-9 text-black dark:bg-gray-900 dark:text-slate-300 pt-16">

        <div className="col-span-2 flex items-start justify-center rounded-s-2xl dark:bg-slate-800 mt-3 ml-3">
          <div className="fixed flex flex-col gap-5">
            <img src={data.cover} alt="hi" className="mt-8 w-[250px] h-[350px] shadow-xl border rounded-md"/>
            <div className="flex">
              <button className="  bg-green-600 w-full pl-4 font-bold text-white rounded-l-2xl h-10 hover:bg-green-700">Add to Reading List</button>
              <button onClick={()=>document.getElementById('my_modal_3').showModal()} className=" w-1/4 pl-3 bg-green-600 hover:bg-green-700 font-bold h-10 text-white rounded-r-2xl border-l-1"><IoIosArrowDown /></button>
            </div>
            <dialog id="my_modal_3" className="modal text-gray-300">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg text-center mb-4">Choose a list</h3>
                <div className="flex flex-col gap-1">
                  <button className="py-4 bg-gray-500 rounded-3xl hover:bg-gray-700">Want to read</button>
                  <button className="py-4 bg-gray-500 rounded-3xl hover:bg-gray-700">Currently Reading</button>
                  <button className="py-4 bg-gray-500 rounded-3xl hover:bg-gray-700">Already read it</button>
                </div>
              </div>
            </dialog>
          </div>
        </div>

        <div className="col-span-5 pl-10 pt-10 flex flex-col gap-3 rounded-r-xl mt-3 dark:bg-slate-800">
          {/* <div className=""> */}
            <h1 className="text-5xl font-serif">{data.name}</h1>
            <h1 className="text-2xl">{data.author.name}</h1>
            <span className="flex">{rating}</span>
            <div>
              <span>{data.about.substring(0,400)}</span>
              {isExpanded && (
              <span className="">
                {data.about.substring(400,)}
              </span>
            )}
            
            <span
            onClick={toggleExpand}
            className=" font-bold rounded cursor-pointer">
            {isExpanded && data.about.length >=400 ? '   See less' : '...See more'}
            </span> 
            </div>


            <h1>{data.pages} pages</h1>
            <div>
              <span className="mr-3 font-bold">Genres</span>
              {
                data.genre.map((genre) => (
                  <small className="pr-3 hover:text-amber-600 transition-all ease-linear">{genre.name}  </small>
                  ))
                }
            </div>
          {/* </div> */}
          <hr />

          <div className="flex items-center gap-28 mt-3 mb-3">

            <div className="flex items-center gap-1 text-nowrap">

              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src={data.currently_reading_images[0]} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src={data.currently_reading_images[1]} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src={data.currently_reading_images[2]} />
                  </div>
                </div>
              </div>

              <small>{data.total_reading} people are reading this now</small>

            </div>

            
            <div className="flex items-center gap-1 text-wrap">

              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-1/4">
                    <img src={data.want_to_read_images[0]} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-1/4">
                    <img src={data.want_to_read_images[1]} />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-1/4">
                    <img src={data.want_to_read_images[2]} />
                  </div>
                </div>
              </div>
              <small>{data.total_want_to_read} people want to read this</small>
            </div>          
          
          </div>
          
          <hr/>
          <h1>{data.total_reviews} total reviews</h1>
          <div>
            <Reviews bookId={bookId}/>
          </div>
          <RelatedBooks bookId={bookId}/>
          <BooksByAuthor bookId={bookId}/>

        </div>

        <div className="col-span-2 pl-5 rounded-xl shadow-md p-5 m-2 mb-1 mt-3 dark:bg-slate-800">
          <h1 className="text-center font-bold text-2xl mb-5 mt-3">About the Author</h1>
          <div className="avatar flex items-center justify-center">
            <div className=" w-48 h-64 pl-3 mb-4">
              <img src={data.author.image} className="rounded-lg" />
            </div>
          </div>
          <div>
            <span className="">{data.author.about.substring(0,400)}</span>
            {isExpandedAuthor && (
              <span className="">
                {data.about.substring(300,)}
              </span>
            )}

            <span className="font-bold rounded cursor-pointer">
              {data.author.about.length >=300 ? <Link>...More</Link> : ''}
            </span>

          </div>
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