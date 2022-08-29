import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { List, Avatar, Row, Col, Button } from 'antd';
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards';

function MovieDetail(props) {
	
	const {movieId} = useParams()
	
	const [Movie, setMovie] = useState([])
	const [Casts, setCasts] = useState([])
	const [ActorToggle, setActorToggle] = useState(false)

	const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }
	
	useEffect(()=> {
		
		let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
		let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
		
		fetch(endpointInfo)
			.then(response => response.json())
			.then(response => {
				setMovie(response)
			})
		
		fetch(endpointCrew)
			.then(response => response.json())
			.then(response => {
				setCasts(response.cast)
			})
	}, [])

	
	
	return (
		<div>
			{/* Header */}
			
			
		<MainImage
			image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
			title={Movie.original_title}
			content={Movie.overview}
		/>
			
			
			{/* BODY */}
			<div style={{ width: '85%', margin: '1rem auto' }}>
			
			
					{/* Movie Info */}
				<MovieInfo
					movie={Movie}
					
				/>
				
				
				<br/>
				{/* Actors Grid */}
				
				<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
					<button onClick={toggleActorView}>출연진 보기</button>
				</div>	
				
				
				
				{/* Movie Grid Cards*/}
				
				{ActorToggle && 
					<Row gutter={[16, 16]}>
					{Casts && Casts.map((cast, index)=> (
						<div key={index}>
							<GridCards
								image={cast.profile_path ?
								 `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
								characterName={cast.name}
								/>
						</div>
					))}
				</Row>
				}
				
				
			</div>
		
		
		
		</div>
	
	)
}


export default MovieDetail