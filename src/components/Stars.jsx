import React from 'react'
import { IoMdStar } from "react-icons/io";


function Stars({rating}) {

  const totalStars = Math.round(rating)
  let starsRating = []

  for(let i = 0; i<totalStars ; i++){
    console.log("d")
    starsRating.push(
      <IoMdStar fill='orange' size={30}/>
    )
  }

  while (starsRating.length < 5){
    starsRating.push(
      <IoMdStar size={30}/>
    )
  }

  return (
    <div className="flex w-[80px]">
      {starsRating}
    </div>
  )
}

export default Stars