

module.exports.signup2error = async (req,res,next)=>{

  
    function Resmaker(label = Labels.all,message){
      return res.status(400).json({
        status: 'fail',
        cause: label,
        message: message
      })
    }
    
        
            const email = req.body.email
            const password = req.body.email
            const username = req.body.username
      
      
          if (!email || !password || !username) {
              return Resmaker(Labels.emailAndPassword,'Missing required field(s)')
            }
    
            
    
            if(email < 10 || password < 10){
              return Resmaker(Labels.emailAndPassword,'Email and or password is too short!')
            }
    
            if(email > 20 || password > 20){
              return Resmaker(Labels.emailAndPassword,'Email and or password is too short!')
            }
    
            if(username < 3){
              return Resmaker(Labels.username,'username is too short!')
            }
    
            if(username > 10){
              return Resmaker(Labels.username,'username is too long!')
            }
    
            
            const Checkdup = await User.findOne({
                email: email,
            })
    
            const Checkusername = await User.findOne({
                username: username,
            })
    
            if(Checkdup !== null){
              return Resmaker(Labels.email,'email not avalible')
            }
    
            if(Checkusername !== null){
              return Resmaker(Labels.username,'Username not avalible')
            }
    
          return next()
    
    }
    
    
    