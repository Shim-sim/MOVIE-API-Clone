const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')


router.post('/favoriteNumber', (req, res) => {
	
	
	//몽고db에서 favorite 숫자 가져오기 추가로 movieid가 favorite역할도 하는지 알아보기
	Favorite.find({ "movieId": req.body.movieId })
		.exec((err, info) => {
			if(err) return res.status(400).send(err)
		
			res.status(200).json({ success: true, favoriteNumber: info.length })
		})
	
	// 프론트에 다시 숫자정보를 보내주기
	
})



module.exports = router;
