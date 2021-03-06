import {
  NextFunction, Request, Response,
} from 'express'
import createError from 'http-errors'
import { response } from '../common/utils'
import * as userService from '../services/user'
import socialService from '../services/social'
import * as httpError from '../common/error'

const getFriendsList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { googleId } = req.decodedUser
    const user = await userService.findByGoogleId(googleId)
    if (!user) {
      throw httpError.INVALID_GOOGLE_ID
    }
    const data = await socialService.getFriendsList(user.id)
    if (!data) {
      throw httpError.INVALID_FRIEND_ID
    }
    const friendlist = data.friend.map((friend) => {
      const {
        uuid, name, email, statusMessage, imageUrl,
      } = friend.user
      return {
        uuid,
        name,
        email,
        statusMessage,
        imageUrl,
      }
    })
    response(res, friendlist)
  } catch (e) {
    next(e)
  }
}
const addFriend = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findByGoogleId(req.decodedUser.googleId)
    const friendEmail: string = req.body.email
    if (!user) {
      throw httpError.USER_NOT_FOUND
    }
    if (friendEmail === user.email) {
      throw httpError.CAN_NOT_ADD_ME
    }

    const friend = await userService.findByEmail(friendEmail)
    if (!friend || !user) {
      throw httpError.INVALID_EMAIL
    }
    const [, created] = await socialService.addFriend(user.id, friend.id)
    if (!created) {
      throw httpError.ALREADY_EXIST_FRIEND
    }
    const {
      uuid, email, name, statusMessage, imageUrl,
    } = friend
    response(res, {
      uuid,
      email,
      name,
      statusMessage,
      imageUrl,
    })
  } catch (e) {
    next(e)
  }
}
const deleteFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.findByGoogleId(req.decodedUser.googleId)
    const deleteUser = await userService.findByUuid(req.body.uuid)
    if (!user || !deleteUser) {
      throw httpError.INVALID_FRIEND_ID
    }
    const deleted = await socialService.deleteFriend(user.id, deleteUser.id)
    if (deleted === 0) {
      throw httpError.ERROR_OCCURED
    }
    const { uuid } = deleteUser
    response(res, { uuid })
  } catch (e) {
    next(e)
  }
}
export {
  getFriendsList, addFriend, deleteFriend,
}
