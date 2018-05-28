import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
// import Bundle from '../components/Common/Bundle'
import Main from './Layout/Main/Main'


@inject('appStore') @withRouter @observer
class App extends Component {

  componentDidMount() {}

  render() {
    return <Main />
  }
}

export default App