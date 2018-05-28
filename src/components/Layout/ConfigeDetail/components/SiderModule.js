/**
 * Created by lina on 2018/4/24.
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Menu, Button, Icon } from 'antd'
import styles from '../../../../styles/configeDetailPage.less'



@inject('appStore') @withRouter @observer
class SiderModule extends Component {
    constructor(props){
        super(props);

        this.state={
            dataSource:[]
        }

        this.handleMenuItem=this.handleMenuItem.bind(this)
        this.addProject=this.addProject.bind(this)

    }


    handleMenuItem ({item, key, keyPath}){
        // console.log('items',item, 'key',key, 'keyPath',keyPath)
        this.props.appStore.changeProject(key);


    }

    addProject(){
        const { location, history } = this.props;
        // if (location.pathname === e.key) return
        history.push('/addProject')
    }



    render(){

        let { first, dataList } = this.props;
        const { curProjectInfo } = this.props.appStore;
        console.log('first',[first.id])

        return (
            <div className={styles.siderModule}>

                <div className={styles.siderHeader}>
                    <h3>项目列表 </h3>
                    <Button type="primary" onClick={this.addProject} size="small" ghost >+新增项目</Button>
                    {/*<a href="/addProject"><Icon type="file-add" style={{ fontSize: 14 }} /></a>*/}

                </div>
                {
                    first ? <Menu
                        mode="inline"
                        defaultSelectedKeys={[first.id]}
                        style={{ borderRight: 0 }}
                        onClick={this.handleMenuItem}
                            >
                            {
                                dataList.map((item,i)=>{
                                    return (
                                        <Menu.Item key={item.id}>{item.projectName}</Menu.Item>
                                    )
                                })
                            }
                        </Menu> : <p style={{ padding: 24 }}>获取列表信息错误，稍后<a href="/">重试</a></p>
                }

            </div>
        )
    }
}

export default SiderModule





