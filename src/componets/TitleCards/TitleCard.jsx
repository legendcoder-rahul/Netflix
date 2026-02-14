import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';




const TitleCard = ({title, category}) => {
  
  const [apiData,setApiData] =useState([]);
  
  const cardsRef = useRef();
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWI2NThiZTAwOTFmMjJiZWVjYmFkNmQ3YjdiZTY2NSIsIm5iZiI6MTc1Mzc4NzI3MC40MDIsInN1YiI6IjY4ODhhYjg2M2Y2N2NmZDdhYTU1ZmNjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4zvFBIvHdsd4xCtGHoxyGI5lF5_evlp7qB5zWJYl1Kw'
  }
};


  
  
  const handleWheel = (e) => {
    
    cardsRef.current.scrollLeft += e.deltaY;
    e.preventDefault(); // Prevent default scrolling behavior
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
    
    cardsRef.current.addEventListener('wheel', handleWheel);
  },[])

  return (
    <div className='title-card'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
      
    </div>
  )
}

export default TitleCard
