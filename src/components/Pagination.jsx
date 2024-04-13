import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react"; 

export function Pagination({setPage,count}) {
  const [active, setActive] = useState(1);
 
  const getItemProps = (index) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        setActive(index),
        setPage(index)
      }
    });
 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
    setPage((prev) => prev + 1)
  };
  
  const prev = () => {
    if (active === 1) return;
    
    setActive(active - 1);
    setPage((prev) => prev - 1)
  };

  const book_num = Math.ceil(count/12)
  let numbers = []
  for(let i=0 ; i<book_num ; i++){
    numbers.push(<IconButton {...getItemProps(i+1)}>{i+1}</IconButton>)

  }
 
  return (
    <div className="flex items-center gap-4 justify-center mt-10">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {numbers}

      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}


export default Pagination;