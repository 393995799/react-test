/**
 * Created by lina on 2018/4/10.
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Layout, Avatar} from 'antd'
import Bundle from '../../Common/Bundle'
import styles from '../../../styles/main.less'
import lazyConfigeDetailPage from 'bundle-loader?lazy!../ConfigeDetail/ConfigeDetailPage'
import lazyPublicHistoryPage from 'bundle-loader?lazy!../PublicHistory/PublicHistoryPage'
import lazyAddProject from 'bundle-loader?lazy!../ProjectManagement/AddProject'

const { Header, Footer } = Layout


const ConfigeDetailPage = () => (
    <Bundle load={lazyConfigeDetailPage}>
        {(ConfigeDetailPage) => <ConfigeDetailPage />}
    </Bundle>
)

const PublicHistoryPage = () => (
    <Bundle load={lazyPublicHistoryPage}>
        {(PublicHistoryPage) => <PublicHistoryPage />}
    </Bundle>
)

const AddProject = () => (
    <Bundle load={lazyAddProject}>
        {(AddProject) => <AddProject />}
    </Bundle>
)


@inject('appStore') @withRouter @observer
class Main extends Component {
    constructor(props){
        super(props);

    }


    render(){

        return (
            <Layout className={styles.height100}>
                <Header className={styles.header}  style={{ position: 'fixed', width: '100%' }}>
                    <a className={styles.logo} href="/"></a>
                    <div className="avatar">
                        {/*<Avatar style={{ backgroundColor: this.state.color }} size="large">{this.state.user}</Avatar>*/}
                        <span>欢迎来到配置中心！</span>
                        {/*<span>登出</span>*/}
                    </div>
                </Header>
                <Switch>
                    <Route exact path="/" component={ConfigeDetailPage} />
                    <Route path="/publichistory" component={PublicHistoryPage} />
                    <Route path="/addProject/:projectId" component={AddProject} />
                    <Route path="/addProject" component={AddProject} />

                    <Route render={() => <h1 className={styles.noMatch}>找不到此页面，您可以返回<a href="/">首页</a>重新查找～</h1>} />
                </Switch>
            </Layout>
        )
    }
}

export default Main