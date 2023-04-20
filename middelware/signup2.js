const User = require('../models/User')
var EmailValidator = require("email-validator");


const Labels = {
  emailAndPassword: 'EmailandPassword',
  username: 'username',
  email:'email',
  all: 'All'
}


module.exports.signup2error = async (req,res,next)=>{
  
function Resmaker(label = Labels.all,message){
  return res.status(400).json({
    status: 'fail',
    cause: label,
    message: message
  })
}
    
        const email = req.body.email
        const password = req.body.password
        const username = req.body.username
  
        switch(true) {
          case !email || !password || !username:
            return Resmaker(Labels.all,'Missing required field(s)');
          case email.length < 10 || password.length < 10:
            return Resmaker(Labels.emailAndPassword,'Email and or password is too short!');
          case email.length > 30 || password.length > 30:
            return Resmaker(Labels.emailAndPassword,'Email and or password is too long!');
          case username.length < 3:
            return Resmaker(Labels.username,'Username is too short!');
          case username.length > 10:
            return Resmaker(Labels.username,'Username is too long!');
          default:
            const Checkdup = await User.findOne({ email });
            const Checkusername = await User.findOne({ username });
            if(Checkdup !== null){
              return Resmaker(Labels.email,'Email not available');
            }
            if(Checkusername !== null){
              return Resmaker(Labels.username,'Username not available');
            }
        }

       const ValadatedEmail =  EmailValidator.validate(email)

       if(ValadatedEmail !== true){
        return Resmaker(Labels.email,'thats not a valid email')
       }

      return next()

}


