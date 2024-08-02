import jwt from 'jsonwebtoken';
import { TokenBlackListModel } from '../features/user/user.repository.js';

const jwtAuth = async(req, res, next) => {
    const token = req.headers['authorization'];

    console.log(token);
    

    if(!token) {
        return res.status(401).send('Unauthorized');
    }
    
    try {
        const dbToken = await TokenBlackListModel.findOne({token: token});
    console.log(dbToken);
        if(dbToken) {
            return res.status(401).send('Unauthorized! Blacklisted token');
        }

        const payload = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );
        req.userID = payload.userID;
    } catch(err) {
        console.log(err);
        return res.status(401).send('Unauthorized');

    }
    next();
}

export default jwtAuth;