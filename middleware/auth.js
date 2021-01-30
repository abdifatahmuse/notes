import jwt from "jsonwebtoken";

const secret = 'secret';

const auth = async (req, res, next) => {
    // next() example
    // wants to like a post
    // click the like button => auth middleware (next) =? like controller...

    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({ statusCode: 404, message: 'Not Authenticated!' });
    }
}

export default auth;