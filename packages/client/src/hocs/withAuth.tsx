/* eslint-disable react/display-name */
import React, {
  useEffect, useState,
} from 'react'
import * as request from 'common/request'
import { RouteComponentProps } from 'react-router'
import { AxiosError } from 'axios'
import { url } from 'common/constants'

import { useDispatch } from 'react-redux'
import {
  loginFailure, loginSuccess,
} from 'modules/login'

export interface WithAuthProps {
  name: string;
  email: string;
  uuid: string;
  statusMessage: string;
  imageUrl: string;
}
function withAuth<T extends WithAuthProps>(Component: React.ComponentType<T>) {
  return (props: T & RouteComponentProps) => {
    const [userInfo, setNewProps] = useState({
      name: '',
      email: '',
      uuid: '',
      statusMessage: '',
      imageUrl: '',
    })
    const dispatch = useDispatch()
    useEffect(() => {
      (async () => {
        request
          .getUserInfo()
          .then((response) => {
            const {
              name, email, uuid, statusMessage, imageUrl,
            } = response.data.data
            setNewProps({
              name, email, uuid, statusMessage, imageUrl,
            })
            dispatch(loginSuccess())
          })
          .catch((e: AxiosError) => {
            dispatch(loginFailure(e))
            props.history.push(url.login)
          })
      })()
    }, [])

    return <Component {...(props as T)} {...userInfo} />
  }
}
export default withAuth