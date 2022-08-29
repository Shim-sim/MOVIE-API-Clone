import React, { useEffect } from 'react'
import axios from 'axios'
function Favorite(props) {
	
const movieId = props.movieId
const userFrom = props.userFrom
const movieTitle = props.movieInfo.title
const moviePost = props.movieInfo.backdrop_path
const movieRunTime = props.movieInfo.runtime


	useEffect(()=> {
		
		let variabels = {
			userFrom,
			movieId
		}
		
		axios.post('https://movie-api-server.run.goorm.io/api/favorite/favoriteNumber', variabels)
			.then(response => {
				if(response.data.success) {
					console.log(response)
					console.log(response.data)
				} else {
					alert('숫자 정보를 가져오는데 실패했습니다')
				}
			})
		
	}, [])
	
	
	return (
		<div>
			<button>Favorite</button>
		
		</div>
	)
}

export default Favorite