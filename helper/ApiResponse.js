class ApiResponse {

    success(data) {
        return (res, meta=null) => {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({
                data,
                status: 200,
                meta
            })    
        }
    }

    error(error) {
        return (res) => {
            res.status(400);
            res.setHeader('Content-Type', 'application/json');

            res.json({
                error,
                status: 400,
            }) 
        }
    }
}

module.exports = new ApiResponse();