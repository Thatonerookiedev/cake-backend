

const usererrorFunction = (error,req,res,next)=>{
    return res.status(400).json(error.message)
}

module.exports = usererrorFunction



