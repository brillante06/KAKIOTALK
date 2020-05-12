import {
  NextFunction, Request, Response, request,
} from 'express'
import { models } from '../models'
import { response } from '../common/utils'
import userService from '../services/userService'
import createError from 'http-errors';

const userTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await models.User.create({
      id: `${Date.now()}`,
      name: 'name',
      email: '123',
    })

    res.status(200).json(user)
  } catch (e) {
    next(e)
  }
}

const getMyProfile = async (req:Request,res:Response,next:NextFunction) =>{
  try{
    if(!req.decodedUser){
      return next(createError(401,'로그인 필요'))
    }
    const user = await userService.findByGoogleId(req.decodedUser.googleId)
    const {email,name,status} = user
    const myProfile = {
      id:email,
      userName:name,
      statusMessage:status
    }
    response(res,myProfile)
  }
  catch(e){
    next(e)
  }
}
export { userTest,getMyProfile }
