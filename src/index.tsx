import React, { FC, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue';

import { TimerTop } from 'containers/Top/TimerTop';
import { TimerRoom } from './containers/Room/TimerRoom';
import { FirebaseApp } from './FireBaseApp';
import firebaseConfig from './firebase-config';
import * as serviceWorker from './serviceWorker';

import './index.css';

firebase.initializeApp(firebaseConfig);

const App: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: blue,
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ReactDOM.render(
  <App>
    <FirebaseApp>
      <Router>
        <Switch>
          <Route path="/:name" component={TimerRoom} />
          <Route path="/" component={TimerTop} />
        </Switch>
      </Router>
    </FirebaseApp>
  </App>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
