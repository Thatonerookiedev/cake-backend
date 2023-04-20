const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserShema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        minlength: 10,
        maxlenght: 30,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minlength: 10,
        maxlenght: 30,
        required: true,
        unique: true
    },
    username:{
        type:String,
        required: true,
        minlength: 3,
        maxlenght: 10,
        required: true,
        unique: true
    },
    Admin:{
        type:Boolean,
        default: false
    }
})

UserShema.pre('save',async function(next){

    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hashSync(this.password,5)

    next()
})

UserShema.pre("save", function (next) {
    let user = this;
    user.password = user.password.replace(/ /g, "");
    next();
})


const User = mongoose.model('user',UserShema)

module.exports = User



