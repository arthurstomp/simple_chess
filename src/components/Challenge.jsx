import React, { useContext, useEffect, useState } from 'react'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

import Lichess from './../utils/lichess'

import {
  CenteredContent,
  Button
} from "./../style_components";

import {
  AppContext,
} from './../contexts'

const FormField = styled.div`
  input {
    font-size: 1.5rem;
  }
`

const FormWrapper = styled.div`
  padding-top: 100px;
  margin: 0 auto;

  button {
    margin-top: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    font-size: 1.5rem;
  }
`

const ChallengeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 70%;
  margin: 0 auto;
  min-height: 50%;
`

const ChallengeForm = props => {
  const { accessToken, setGame, history } = props
  const lichess = new Lichess(accessToken);
  const submit = values => {
    lichess.challengeAI(values.level)
      .then(res => {
        if(res.status === 201) {
          return res.json()
        } else {
          throw new Error('Failed to create challenge')
        }
      })
      .then(data => {
        console.log(data)
        setGame(data)
        history.push('/game')
      })
      .catch(console.error)
  }
  return (
    <FormWrapper>
      <Form
        onSubmit={submit}
        render={({ handleSubmit, submitting, form, pristine }) => (
          <form onSubmit={handleSubmit}>
            <label>AI Level</label>
            <Field name="level">
              {({ input, meta }) => (
                <FormField>
                  <input {...input} type="number" min="1" max="8" />
                </FormField>
              )}
            </Field>
            <div className="buttons">
              <Button type="submit" disabled={submitting}>
                Start Game
              </Button>
            </div>
          </form>
        )}
      />
    </FormWrapper>
  )
}

export default function Challenge(props) {
  const { history } = props
  const appContext = useContext(AppContext)
  const accessToken = appContext.accessToken

  return (
    <CenteredContent>
      <ChallengeWrapper>
        <ChallengeForm
          history={history}
          accessToken={accessToken}
          setGame={appContext.setGame} />
      </ChallengeWrapper>
    </CenteredContent>
  )
}
