const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content : {
        type:String,
        required : true,
    },
    image : {
        type : String,
        required : true
    },
    emotion : {
        type : Number,
        required : true 
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;
