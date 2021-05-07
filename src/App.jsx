import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  AppWrapper,
  HeaderWrapper,
  HeaderTitle,
  ContentWrapper,
} from "./style_components";

import {
  ConnectLichess,
  Challenge,
  TokenChecker,
  Game
} from "./components";

import {
  AppContext,
} from './contexts'

function App() {
  const [accessToken, setAccessToken] = useState(null)
  const [game, setGame] = useState(null)

  return (
    <AppWrapper>
      <AppContext.Provider value={{
        accessToken,
        setAccessToken,
        game,
        setGame
      }}>
        <Router>
          <HeaderWrapper>
            <HeaderTitle>Simple Chess</HeaderTitle>
          </HeaderWrapper>
          <ContentWrapper>
            <TokenChecker />
            <Switch>
              <Route
                exact
                path="/"
                component={ConnectLichess} />
              <Route
                exact
                path="/challenge"
                component={Challenge} />
              <Route
                exact
                path="/game"
                component={Game} />
            </Switch>
          </ContentWrapper>
        </Router>
      </AppContext.Provider>
    </AppWrapper>
  );
}

export default App;
