var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  hook: {
    beforeDestroy: function(dayBeingDestroyed){
      return Day.findAll({
        where: {
          number: {
            // $gt --> greater than
            $gt: dayBeingDestroyed.number
          }
        }
      })
        // want to update number one less, than save it, this persists change to db, do this for every single day found after the original one that we're destroying

        // daysAfter is an array of Days
        .then(function(daysAfter){
            var updatingDayNumbers = daysAfter.map(function(day){
              day.number--;
              return day.save();
            });

            return Promise.all(updatingDayNumbers);
        })
    }
  }
})

module.exports = Day;
