/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'

import { CenteredContent, Button } from "./../style_components"

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

  button {
    margin-top: 20px;
  }
`

export default function ConnectLichess(props) {
  const accessTokenContext = useContext(AppContext);

  const persistLichessToken = (values) => {
    window.localStorage.setItem('LICHESS_TOKEN', values.token)
    accessTokenContext.setAccessToken(values.token)
    props.history.push('/challenge')
  }

  return (
    <CenteredContent>
      <FormWrapper>
        <Form
          onSubmit={persistLichessToken}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="token">
                {({ input, meta }) => (
                  <FormField>
                    <input {...input} type="text" placeholder="Access Token" />
                  </FormField>
                )}
              </Field>
              <div className="buttons">
                <Button type="submit" disabled={submitting}>
                  Start
                </Button>
              </div>
            </form>
          )}
        />
      </FormWrapper>
    </CenteredContent>
  );
}
