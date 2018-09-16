import UserModel from '../../model/user';
import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

export const createUserRouter = Router();

createUserRouter.post('/create', (req: Request, res: Response, next: NextFunction) => {
    UserModel.create(req.body)
    .then((createdUser: any) => {
        res.status(200).json({success: true});
    })
    .catch(err => res.json(err));
});