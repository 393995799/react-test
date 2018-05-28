/**
 * Created by lina on 2018/4/24.
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { List, Icon } from 'antd'
import styles from '../../../../styles/common/common.less'
import EmptyLine from './EmptyLine'

@inject('appStore') @withRouter @observer
class ProjectInfo extends Component {
    constructor(props){
        super(props);

        this.editProject=this.editProject.bind(this);

    }

    editProject() {
        const { location, history, curProjectInfo } = this.props;
        // if (location.pathname === e.key) return
        history.push('/addProject/'+ curProjectInfo.id)
    }


    render(){
        const { curProjectInfo } = this.props;

        return (
            <div>
                <h3>项目信息 <a href="javascript:;" onClick={this.editProject}><Icon type="edit" /></a></h3>
                {
                    curProjectInfo.id && (<List grid={{ gutter: 16, column: 3 }} className="clearfix">
                            <List.Item>项目名称: {curProjectInfo.projectName}</List.Item>
                            <List.Item>应用ID: {curProjectInfo.appId}</List.Item>
                            <List.Item>部门: {curProjectInfo.deptName}</List.Item>
                            <List.Item>创建时间: {curProjectInfo.createTimeText}</List.Item>
                        </List>)
                }

            </div>
        )
    }
}

export default ProjectInfo





