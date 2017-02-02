var express = require('express');
var router = express.Router();
// var models = require('../../models');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

module.exports = router;

// Get all days with attraction info

// created subrouter in /routes/index.js so we don't have to
// explicity say '/days'. now, '/' route would automatically be '/days'
router.get('/days', function(req, res, next){
  Day.findAll({
    include: [Hotel, Restaurant, Activity],
    order: 'number ASC'
  })
    .then(function(days){
        res.send(days);
    })
    .catch(next);
})

//get data for a specific day
router.get('/days/:id', function(req, res, next){

})

// add a new day with no attractions
// REST - way for you to build a server and a collection of routes
// that is consummable in a conventional way
router.post('/days', function(req, res, next){
    console.log('req.body: ', req.body);
    Day.create(req.body)
        .then(function(createdDay){
            res.status(201).send(createdDay);
        })
        .catch(next);
})

//delete a specific day
router.delete('/days/:id', function(req, res, next){

    // this is a blanket/bulk destroy which doesn't activate hooks
    Day.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(){
      console.log('day has been deleted!')
      res.status(204).end();
    })
    .catch(next);

    // calling destroy on a specific day that can activate hook
    // Day.findById(req.params.id)
    //   .then(function(dayThatShouldBeDestroyed){
    //     return dayThatShouldBeDestroyed.destory();
    //   })
    //   .then(function(){
    //     res.sendStatus(204)
    //   })
    //   .catch(next);


})

// ATTRACTIONS ON DAYS
// RESTful - provides an interface

//doesnt build a separate route, it's like a custom middleware that if we're about to hit a route that has dayId listed as a parameter as a dynamic slot, we can receive value of dayId and centralize functionality

// router.param('dayId', function(req, res, next, theDayId){
//   Day.findById(theDayId)
//     .then(function(foundDay){
//       req.day = foundDay;
//       next();
//     })
//     .catch(next);
// });


// register a hotel to a day
// what it does is on frontend, it attaches the specific hotel to the specific day, doesn't send back extra info
router.post('/days/:dayId/hotel', function(req, res, next){

  // instead of doing Day.findById all the time, we can assume that req.day already exists on the req object. it's a way to make code DRY

  // req.day.setHotel(req.body.hotelId)
  //   .then(function(day){
  //     res.sendStatus(204);
  //   })

  Day.findById(req.params.dayId)
    .then(function(day){
      return day.setHotel(req.body.hotelId);
    })
    .then(function(day){
      res.sendStatus(204);
    })
    .catch(next);
})

// register a restaurant to a day
// many restaurants in a given day
router.post('/days/:dayId/restaurants', function(req, res, next){

  Day.findById(req.params.dayId)
    .then(function(day){
      return day.addRestaurant(req.body.restaurantId);
    })
    .then(function(){
      res.sendStatus(204);
    })
    .catch(next);

})

// register an activity to a day
router.post('/days/:dayId/activities', function(req, res, next){

  Day.findById(req.params.dayId)
    .then(function(day){
      return day.addActivity(req.body.activityId);
    })
    .then(function(){
      res.sendStatus(204);
    })
    .catch(next);

})

// remove a hotel from a day
router.delete('/days/:dayId/hotel', function(req, res, next){
  Day.findById(req.params.dayId)
    .then(function(day){
      // sequelize method that interacts with db and basically sets hotel by using null
      return day.setHotel(null)
    })
    .then(function(){
      res.sendStatus(204);
    })
    .catch(next);
})

// remove a restaurant from a day
// need specific id of restaurant
router.delete('/days/:dayId/restaurants/:restaurantId', function(req, res, next){
  Day.findById(req.params.dayId)
    .then(function(day){
      return day.removeRestaurant(req.params.restaurantId)
    })
    .then(function(){
      res.sendStatus(204);
    })
    .catch(next);

})

// remove an activity from a day
router.delete('/days/:dayId/activities/:activityId', function(req, res, next){
  Day.findById(req.params.dayId)
    .then(function(day){
      return day.removeActivity(req.params.activityId)
    })
    .then(function(){
      res.sendStatus(204);
    })
    .catch(next);

})
