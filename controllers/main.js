const { default: mongoose } = require('mongoose')
const User = require('../models/User')
const JWT = require('jsonwebtoken')
const errorsignup = require('../middelware/signup2')
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs')
const axios = require('axios')




function createJwt(id){
    return JWT.sign({id: id},'secret')
}



const html = `
    <H1>Hello you signed up to NCT127 Cake Shop!</H1>
`
async function Email(useremail){
   const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            user: 'shatoriag01@gmail.com',
            pass: 'wxeujasqyelcqpwz'
        }
    })

    const info = await transporter.sendMail({
        from: 'Shatoria <shatoriag01@gmail.com>',
        to: useremail,
        subject: 'Signed Up Successful',
        html:html
    })

    console.log(`message sent: ${info.messageId}`)

}


module.exports.signUp = async (req,res,next)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const username = req.body.username


    
        const TempUser = await User.create({
            email: email,
            password: password,
            username: username
        })

        const userid = await User.findById(TempUser._id)
        const jwt = createJwt(userid)

        await Email(email).catch(e => next(e))

        res.send({
            message: 'sussecess',
            person: TempUser,
            jwt: jwt
        })
    } catch (error) {
        next(error)
    }

}


module.exports.login = async (req,res,next)=>{
    try {
        
        const username = req.body.username
        const password = req.body.password

        const user = await User.findOne({username})
        let tempuser = 1

        if(user){
            const auth = await bcrypt.compareSync(password, user.password)
            if (auth) {
                    tempuser = user;
                    const jwt = createJwt(tempuser._id)
                    return res.json({
                    message: 'sussecess',
                    person: tempuser,
                    jwt: jwt
                })
              }else{
                return res.json({
                    status: 'fail',
                    cause: 'All',
                    message: 'user not there signup with you data please!'
                })
              }
        }else{
            return res.json({
                status: 'fail',
                cause: 'All',
                message: 'user not there signup with you data please!'
            })
        }

    } catch (error) {
        next(error)
    }
}


module.exports.jwtverify = async (req,res,next)=>{
    try {
        const {jwt} = req.body
        

        const decodedjwt = JWT.verify(jwt, 'secret');

        const user = await User.findOne({_id:decodedjwt.id})

        res.status(200).send({
            status:'susess',
            user:user
        })

    } catch (error) {
        next(error) 
    }
}



