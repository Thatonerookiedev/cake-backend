




const regularerrorFunction = (error,req,res,next)=>{
    return res.json(error.message)
}

module.exports = regularerrorFunction



