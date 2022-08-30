import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'antd'
function Favorite(props) {
	
const movieId = props.movieId
const userFrom = props.userFrom
const movieTitle = props.movieInfo.title
const moviePost = props.movieInfo.backdrop_path
const movieRunTime = props.movieInfo.runtime

const [FavoriteNumber, setFavoriteNumber] = useState(0)
const [Favorited, setFavorited] = useState(false)

let variabels = {
		userFrom,
		movieId,
		movieTitle,
		moviePost,
		movieRunTime
		}

const onClickFavorite = () => {
	
	if(Favorited) {
		axios.post('https://movie-api-server.run.goorm.io/api/favorite/removeFromFavorite', variabels)
		.then(response => {
			if(response.data.success) {
				setFavoriteNumber(FavoriteNumber - 1)
				setFavorited(!Favorited)
			} else {
				alert('리스트에서 지우는 걸 실패했습니다.')
			}
		})
	} else {
		axios.post('https://movie-api-server.run.goorm.io/api/favorite/addToFavorite', variabels)
		.then(response => {
			if(response.data.success) {
				setFavoriteNumber(FavoriteNumber + 1)
				setFavorited(!Favorited)
			} else {
				alert('리스트에서 추가하는 걸 실패했습니다.')
			}
		})
	}	
}


	useEffect(()=> {
		
		axios.post('https://movie-api-server.run.goorm.io/api/favorite/favoriteNumber', variabels)
			.then(response => {
				if(response.data.success) {
					setFavoriteNumber(response.data.favoriteNumber)
				} else {
					alert('숫자 정보를 가져오는데 실패했습니다')
				}
			})
		
			axios.post('https://movie-api-server.run.goorm.io/api/favorite/favorited', variabels)
			.then(response => {
				if(response.data.success) {
				setFavorited(response.data.favorited)
				} else {
					alert('정보를 가져오는데 실패했습니다')
				}
			})
		
	}, [])
	
	
	return (
		<div>
			<Button onClick={onClickFavorite}>{Favorited ? "좋아요 취소" : "좋아요 추가하기"} {FavoriteNumber}</Button>
		
		</div>
	)
}

export default Favorite