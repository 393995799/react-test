/**
 * Created by lina on 2018/4/24.
 */

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {  withRouter } from 'react-router-dom'
import { Layout,  Tabs,  Divider, Table, Input, Button, Modal, Form, Icon } from 'antd'
import styles from '../../../styles/configeDetailPage.less'
import axios from '../../../utils/request'


@inject('appStore') @withRouter @observer
class Home extends Component {
    constructor(props) {
      super(props);

    }



    render(){
        return (
            <div>
                124
            </div>
        )
    }
}

const ConfigeDetailPageWrap = Form.create()(Home);
export default ConfigeDetailPageWrap