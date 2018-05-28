/**
 * Created by lina on 2018/4/25.
 */

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {  withRouter } from 'react-router-dom'
// import { Layout, Tabs, } from 'antd'


// import axios from '../../../utils/request'


@inject('appStore') @withRouter @observer
class PublicHistoryPage extends Component {
    constructor(props){
        super(props);


    }

    handleBack(){
        const { location, history } = this.props;
        // if (location.pathname === e.key) return
        history.push('/')
    }


    render(){
        return (
            <div>
                发布历史页面
                <button onClick={this.handleBack.bind(this)}>返回首页</button>


            </div>
        )
    }
}


export default PublicHistoryPage



