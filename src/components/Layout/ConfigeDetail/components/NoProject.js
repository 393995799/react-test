/**
 * Created by lina on 2018/5/8.
 */


import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { List, Button } from 'antd'
import styles from '../../../../styles/configeDetailPage.less'

@inject('appStore') @withRouter @observer
class NoProject extends Component {
    constructor(props){
        super(props);

        this.showModal=this.showModal.bind(this);

    }

    showModal(){
        const { location, history } = this.props;
        // if (location.pathname === e.key) return
        history.push('/addProject')
    }

    render(){
        return (
            <div className={styles.emptyWrap}>
                <h3>您还没添加任何项目</h3>
                <p>赶紧建立第一个属于自己的项目吧～</p>
                <Button  type="primary"onClick={this.showModal}>立即添加</Button>
            </div>
        )
    }
}

export default NoProject;




