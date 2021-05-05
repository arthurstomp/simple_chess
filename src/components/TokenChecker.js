import React, { useState, useEffect, useContext} from 'react'
import { Redirect } from 'react-router-dom'

import {
  AppContext,
} from './../contexts'

export default function TokenChecker(props) {
  const accessTokenContext = useContext(AppContext)
  const { setAccessToken } = accessTokenContext
  const [pushToChallenge, setPushToChallenge] = useState(false)
  useEffect(() => {
    const token = window.localStorage.getItem('LICHESS_TOKEN')
    if(token) {
      window.localStorage.setItem('LICHESS_TOKEN', token)
      setAccessToken(token)
      setPushToChallenge(true)
    }
  })

  if(pushToChallenge) {
    return <Redirect to={"/challenge"} />
  } else {
    return null
  }
}
