import React from 'react';
import ReactDOM from 'react-dom';
import WizardForm from './components/FirstTimeApplicant/WizardForm';
import HoldingPage from './components/pages/HoldingPage';
import Sign from './components/FirstTimeApplicant/Sign';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { HashRouter, Route } from 'react-router-dom';
import { reducer as formReducer } from 'redux-form';
import Header from './components/Header';
import Footer from './components/Footer';
import config from './config';
import './styles/App.css';

const store = createStore(
  combineReducers({
    reducers,
    form: formReducer,
    // }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }),
  applyMiddleware(thunk),
);

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <main>
            {config.SHOW_HOLDING_PATH ? (
              <Route path="/" component={HoldingPage} />
            ) : (
              <Route exact path="/" component={WizardForm} />
            )}
            <Route path="/:id" component={Sign} />
          </main>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
