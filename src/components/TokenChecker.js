import React, { useState, useEffect, useContext} from 'react'
import { Redirect } from 'react-router-dom'

import {
  AppContext,
} from './../contexts'

export default function TokenChecker(props) {
  const accessTokenContext = useContext(AppContext)
  const { accessToken, setAccessToken } = accessTokenContext
  const [pushToHome, setPushToHome] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem('LICHESS_TOKEN')
    if(token) {
      window.localStorage.setItem('LICHESS_TOKEN', token)
      setAccessToken(token)
      setPushToHome(false)
    } else if(!accessToken) {
      setPushToHome(true)
    }
  })

  if(pushToHome) {
    return <Redirect to={"/"} />
  }

  return null
}
