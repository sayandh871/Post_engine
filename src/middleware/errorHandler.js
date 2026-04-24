
function errorHandler(err,req,res,next){
    console.error(err);

    const statusCode = err.status || 500;
    const message = err.message || "something went wrong";

    res.status(statusCode).json({message})
}

export default errorHandler;