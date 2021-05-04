import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  AppWrapper,
  HeaderWrapper,
  HeaderTitle,
  ContentWrapper,
} from "./style_components";

import { ConnectLichess, Challenge, LichessCallback } from "./components";

function App() {
  return (
    <AppWrapper className="App">
      <Router>
        <HeaderWrapper>
          <HeaderTitle>Simple Chess</HeaderTitle>
        </HeaderWrapper>
        <ContentWrapper>
          <Switch>
            <Route exact path="/" component={ConnectLichess} />
            <Route
              exact
              path="/lichess/oauth/callback"
              component={LichessCallback}
            />
            <Route exact path="/challenge" component={Challenge} />
          </Switch>
        </ContentWrapper>
      </Router>
    </AppWrapper>
  );
}

export default App;
