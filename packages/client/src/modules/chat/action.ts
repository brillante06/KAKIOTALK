import { AxiosError } from 'axios'
import { ApiChat } from 'types'

export const GET_CHAT_REQUEST = 'chat/GET_CHAT_REQUEST' as const
export const GET_CHAT_SUCCESS = 'chat/GET_CHAT_SUCCESS' as const
export const GET_CHAT_FAILURE = 'chat/GET_CHAT_FAIL' as const

export const ADD_CHAT = 'chat/ADD_CHAT' as const
export const ADD_CHAT_OFFSET = 'chat/ADD_CHAT_OFFSET' as const

export const LOAD_MORE_REQUEST = 'chat/LOAD_MORE_REQUEST' as const
export const LOAD_MORE_SUCCESS = 'chat/LOAD_MORE_SUCCESS' as const
export const LOAD_MORE_FAILURE = 'chat/LOAD_MORE_FAILURE' as const

export const RESET_CHAT = 'room/RESET_CHAT' as const
interface GetChatRequest {
  roomUuid: string
  offset: number
  limit: number
}
export const getChatRequest = ({
  roomUuid,
  offset,
  limit,
}: GetChatRequest) => ({
  type: GET_CHAT_REQUEST,
  payload: {
    roomUuid,
    offset,
    limit,
  },
})

interface GetChatSuccess {
  roomUuid: string
  chats: ApiChat[]
  offset: number
  limit: number
}
export const getChatSuccess = ({
  roomUuid, chats, offset, limit,
}: GetChatSuccess) => ({
  type: GET_CHAT_SUCCESS,
  payload: {
    roomUuid,
    chats,
    offset,
    limit,
  },
})

export const getChatFailure = (e: AxiosError) => ({
  type: GET_CHAT_FAILURE,
  message: e.message,
  payload: {},
})

export const addChat = (roomUuid: string, newChat: ApiChat) => ({
  type: ADD_CHAT,
  payload: {
    roomUuid,
    newChat,
  },
})

export const addChatOffset = ({
  roomUuid,
  amount,
}: {
  roomUuid: string
  amount: number
}) => ({
  type: ADD_CHAT_OFFSET,
  payload: {
    roomUuid,
    amount,
  },
})

interface LoadMoreRequest {
  roomUuid: string
  offset: number
  limit: number
}
export const loadMoreRequest = (roomUuid: string) => ({
  type: LOAD_MORE_REQUEST,
  payload: { roomUuid },
})

interface GetChatSuccess {
  roomUuid: string
  chats: ApiChat[]
  offset: number
  limit: number
}

export const loadMoreSuccess = ({
  roomUuid, chats, offset, limit,
}: GetChatSuccess) => ({
  type: LOAD_MORE_SUCCESS,
  payload: {
    roomUuid,
    chats,
    offset,
    limit,
  },
})

export const loadMoreFailure = (e: AxiosError) => ({
  type: LOAD_MORE_FAILURE,
  message: e.message,
})
export const resetChat = () => ({ type: RESET_CHAT })

