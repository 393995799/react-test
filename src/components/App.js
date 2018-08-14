import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {Route, Switch, withRouter} from 'react-router-dom'
import Bundle from '../components/Common/Bundle'
import { Layout } from 'antd'
import styles from '../styles/main.less'
import lazyHome from 'bundle-loader?lazy!./Layout/home/Home'



const Home = () => (
    <Bundle load={lazyHome}>
      {(Home) => <Home />}
    </Bundle>
)


@inject('appStore') @withRouter @observer
class App extends Component {

  componentDidMount() {}

  render() {
    return (
        <Layout className={styles.height100}>
          <Switch>
            <Route exact path="/" component={ Home } />
            {/*<Route path="/publichistory" component={PublicHistoryPage} />*/}
            {/*<Route path="/addProject/:projectId" component={AddProject} />*/}
            {/*<Route path="/addProject" component={AddProject} />*/}

            <Route render={() => <h1 className={styles.noMatch}>找不到此页面，您可以返回<a href="/">首页</a>重新查找～</h1>} />
          </Switch>
        </Layout>
    )
  }
}

export default App