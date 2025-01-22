const mongoose = require("mongoose")
const GameSchema = new mongoose.Schema({
    username: {
        type:String,
    },
    winnerType: {
        type:String,
    },
    date: { 
        type: Date, 
        default: new Date().toString().split(' GMT')[0]
    },
  });
  
  const game = new mongoose.model("game", GameSchema);
  module.exports = game;

  