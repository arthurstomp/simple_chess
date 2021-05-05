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
  const { challengeAI, setGame } = props
  const submit = values => {
    challengeAI(values.level)
      .then(res => {
        if(res.status === 200) {
          return res.json()
        } else {
          throw new Error('Failed to create challenge')
        }
      })
      .then(data => setGame(data.challenge))
      .catch(console.error)
  }
  return (
    <FormWrapper>
      <Form
        onSubmit={submit}
        render={({ handleSubmit, submitting, form, pristine }) => (
          <form onSubmit={handleSubmit}>
            <label>AI Level</label>
            <Field name="opponentUsername">
              {({ input, meta }) => (
                <FormField>
                  <input {...input} type="number" min="1" max="8" value="1" />
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
  const appContext = useContext(AppContext)
  const accessToken = appContext.accessToken
  const lichess = new Lichess(accessToken);

  return (
    <CenteredContent>
      <ChallengeWrapper>
        <ChallengeForm challengeAI={lichess.challengeAI} setGame={appContext.setGame} />
      </ChallengeWrapper>
    </CenteredContent>
  )
}
