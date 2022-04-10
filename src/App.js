import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import ChatWindow from './components/chatWindow/chatWindow';
import {
  createSignalProtocolManager,
  SignalServerStore,
} from './signal/SignalGateway';

import './App.css';
export default class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loggedInUserObj: {},
      dummySignalServer: new SignalServerStore(),
      signalProtocolManagerUser: undefined,
    };
    this.setLoggedinUser = this.setLoggedinUser.bind(this);
  }

  setLoggedinUser(loggedInUserObj) {
    this.setState(
      { isLoggedIn: true, loggedInUserObj: { ...loggedInUserObj } },
      () => {
        // Initializing signal server here
        createSignalProtocolManager(
          loggedInUserObj._id,
          loggedInUserObj.name,
          this.state.dummySignalServer
        ).then((signalProtocolManagerUser) => {
          this.setState({
            signalProtocolManagerUser: signalProtocolManagerUser,
          });
        });
      }
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/chat'>
            <ChatWindow />
          </Route>
        </Switch>
        <div className='App'>
          {!this.state.isLoggedIn && <Login loginProp={this.setLoggedinUser} />}
          {this.state.isLoggedIn && (
            <ChatWindow
              loggedInUserObj={this.state.loggedInUserObj}
              signalProtocolManagerUser={this.state.signalProtocolManagerUser}
            />
          )}
        </div>
      </Router>
    );
  }
}
