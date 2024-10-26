import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzBjMjg4ODZhYmNlZDA5YjA5YzY0MWQ4YzQ0ZGZhMyIsIm5iZiI6MTcyOTk0MDMxMy4xMzE4Niwic3ViIjoiNjcxY2NhM2ExZWEzMzkyODI5N2Q1NDJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.XLp8k895Tj6YW9PYCYw48GlWBkD1aKGN4KYPDx7ai68'
        }
      };

const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
            {apiData.map((card, index)=>{
                return <div className='card' key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default TitleCards