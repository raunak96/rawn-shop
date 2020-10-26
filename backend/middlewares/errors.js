const notFound=(req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err,req,res,next)=>{
    console.log(err,res.statusCode);
    var statusCode = res.statusCode===200?500:res.statusCode;
    var message=err.message;
    if (err.kind === "ObjectId") {
        message="Requested Resource not found";
        statusCode=404;
	}
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV==='production'?null:err.stack
    });
}

export {notFound,errorHandler};