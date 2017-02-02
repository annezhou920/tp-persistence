var express = require('express');
var router = express.Router();
// var models = require('../../models');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Day = require('../../models/day');

module.exports = router;

//get all data about current itinerary from the db
router.get('/days', function(req, res, next){
// {
//       include: [Hotel]
//   }
  Day.findAll()
  .then(function(days){
      res.json(days);
  })
  .catch(next);
})

//get data for a specific day
router.get('/days/:id', function(req, res, next){

})

//add a new day
router.post('/days', function(req, res, next){
    console.log('req.body: ', req.body);
    Day.create(req.body)
        .then(function(data){
            res.json(data);
        })
        .catch(next);
})

router.post('/days/:id/hotel', function(req, res, next){

})

router.post('/days/:id/restaurants', function(req, res, next){

})

router.post('/days/:id/activities', function(req, res, next){

})

//delete a specific day
router.delete('/days/:id', function(req, res, next){
  console.log('is this being destroyed?')
    Day.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(){
      console.log('day has been deleted!')
    })
    .catch(next);


})

router.delete('/days/:id/hotel', function(req, res, next){

})

router.delete('/days/:id/restaurants', function(req, res, next){

})

router.delete('/days/:id/activities', function(req, res, next){

})
