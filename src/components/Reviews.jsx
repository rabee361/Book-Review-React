import React from 'react'
import { useQuery } from 'react-query'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Reviews({bookId}) {

    const { data, isLoading, error } = useQuery(['review',bookId], () => fetchReviews(bookId));

    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;



      
    let fiveStars = 0
    let fourStars = 0
    let threeStars = 0
    let twoStars = 0
    let oneStar = 0


    let total = Object.keys(data).length

    for(let i of data){
      if (i.rating == 1){
        oneStar += 1
      }
      else if (i.rating == 2){
        twoStars =+ 1
      }
      else if (i.rating == 3){
        threeStars += 1
      }
      else if (i.rating == 4){
        fourStars += 1
      }
      else if (i.rating == 5){
        fiveStars += 1
      }
    }

    let fiveStarsValue = fiveStars/total * 100 ;
    let fourStarsValue = fourStars/total * 100 ;
    let threeStarsValue = threeStars/total * 100 ;
    let twoStarsValue = twoStars/total * 100 ;
    let oneStarValue = oneStar/total * 100 ;


  return (
    <div className="dark:text-slate-300">
      <div>
        <div className="flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <h1 className="pb-1">5 stars</h1>
                <progress className="progress progress-warning w-96 h-3" value={fiveStarsValue} max="100"></progress>
                <h1>{fiveStarsValue}% <small>({fiveStars} reviews)</small></h1>
              </div>
              <div className="flex items-center gap-5">
                <h1 className="pb-1">4 stars</h1>
                <progress className="progress progress-warning w-96 h-3" value={fourStarsValue} max="100"></progress>
                <h1>{fourStarsValue}% <small>({fourStars} reviews)</small></h1>
              </div>            
              <div className="flex items-center gap-5">
                <h1 className="pb-1">3 stars</h1>
                <progress className="progress progress-warning w-96 h-3" value={threeStarsValue} max="100"></progress>
                <h1>{threeStarsValue}% <small>({threeStars} reviews)</small></h1>
              </div>
              <div className="flex items-center gap-5">
                <h1 className="pb-1">2 stars</h1>
                <progress className="progress progress-warning w-96 h-3" value={twoStarsValue} max="100"></progress>
                <h1>{twoStarsValue}% <small>({twoStars} reviews)</small></h1>
              </div>            
              <div className="flex items-center gap-5">
                <h1 className="pb-1">1 stars</h1>
                <progress className="progress progress-warning w-96 h-3" value={oneStarValue} max="100"></progress>
                <h1>{oneStarValue}% <small>({oneStar} reviews)</small></h1>
              </div>
          </div>
      </div>

      <div className="col-span-3 h-screen flex flex-col gap-5 mt-10">

        {data.map((review) => (
          <>
          <div className="flex flex-row gap-6 mr-2 ml-2 mt-1 bg-re-300">
            <div className="text-center flex flex-col gap-0 ml-1 p-1 text-nowrap bg--300">
              <div className="avatar justify-center">
                <div className=" w-14 rounded-full">
                  <img src={review.user.image} />
                </div> 
              </div>
              <h1 className="">{review.user.username}</h1>
              <small className="text-xs">{review.user.total_reviews} reviews</small>
              <small className="text-xs">23 followers</small>
            </div>
            <div className=" grid col-span-12 gap-y-1 w-full bg--200">
              <span className="w-fit text-sm ml-[521px] bg--400 text-nowrap">{review.created}</span>
              {review.text.length > 200 ? <span>{review.text.substring(0,200)} <Link>...read full review </Link> </span> : <span className="w-fit mt-2"> {review.text}</span>}
              <div className="flex w-fit gap-2 ml-[500px] bg--400 text-xl">
                <span className="flex gap-2 items-center"><small>{review.total_likes}</small><AiOutlineLike className="hover:text-amber-400" /></span>
                <span className="flex gap-2 items-center">{review.total_comments}<FaRegComment className="hover:text-amber-400" /></span>
              </div>
            </div>
          </div>
          <hr />
          </>
        ))}
        </div>
    </div>

  )
}

async function fetchReviews(bookId) {
    const response = await fetch(`http://127.0.0.1:8000/api/reviews/${bookId}/`);
    if (!response.ok) {
       throw new Error('Network response was not ok');
    }
    return response.json();
   }
   



export default Reviews