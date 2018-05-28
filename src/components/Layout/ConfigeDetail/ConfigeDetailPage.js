/**
 * Created by lina on 2018/4/24.
 */

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {  withRouter } from 'react-router-dom'
import { Layout,  Tabs,  Divider, Table, Input, Button, Modal, Form, Icon } from 'antd'
import styles from '../../../styles/configeDetailPage.less'
import SiderModule from './components/SiderModule'
import ProjectInfo from './components/ProjectInfo'
import PublishModal from './components/PublishModal'
import NoProject from './components/NoProject'
import axios from '../../../utils/request'

const { Content } = Layout
const TabPane = Tabs.TabPane

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const contentStyle= {
    padding: 24,
    margin: 0,
    background: '#fff',
    overflow: 'auto'
}

@inject('appStore') @withRouter @observer
class ConfigeDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state={
            projectList:[],
            firstProject:'',
            columns: [{
                title: '发布状态',
                dataIndex: 'status',
                key: 'status',
                render: (text) => (<span>{text.releaseStatusText}</span>)
            }, {
                title: 'Key',
                dataIndex: 'keyAndUpdateStatus',
                key: 'keyAndUpdateStatus',
                render: (text) => (this.keyStatusRender(text))
            }, {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                render: (text) => (<span>{text.newValue}</span>)
            },{
                title: 'Comment',
                dataIndex: 'comment',
                key: 'comment',
            },{
                title: '操作人',
                dataIndex: 'operatorName',
                key: 'operatorName',
            },{
                title: 'Date',
                dataIndex: 'operatorTimeText',
                key: 'operatorTimeText',
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => {
                    return (
                        <div className={ styles.fintSize16 }>
                            <a href="javascript:;" onClick={this.showModal.bind(this,record)}><Icon type="form" /></a>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={() => this.handleDelete(record)}><Icon type="close" /></a>
                        </div>
                    )
                },
            }],
            dataEmpty:[],
            modalVisible: false,
            confirmLoading: false,
            modalTitle:'新增配置',
            modalFormItemArr: [
                {
                    layout: {...formItemLayout},
                    label: 'Key',
                    id: 'key',
                    rules: [{
                        required: true,
                        message: '请输入配置项key',
                    },{
                        pattern: /^[0-9A-Za-z-_]{1,128}$/,
                        message: '可以是字母、数字、下划线、横线,长度为1-128个字符'
                    }],
                    placeholder:'请输入'
                },
                {
                    layout: {...formItemLayout},
                    label: 'Value',
                    id: 'value',
                    rules: [{
                        required: true,
                        message: '请输入配置项value',
                    },{
                        pattern: /^.{1,5000}$/,
                        message: '长度为1-5000个任意字符'
                    }],
                    placeholder:'请输入'
                },
                {
                    layout: {...formItemLayout},
                    label: 'Comment',
                    id: 'comment',
                    rules: [{
                        required: false
                    },{
                        pattern: /^.{0,1024}$/,
                        message: '长度为0-1024个任意字符'
                    }],
                    placeholder:'请输入'
                },
            ],
            existConfigKey: ''
        }



        this.tabChange=this.tabChange.bind(this);
        this.showModal=this.showModal.bind(this);
        this.handleModalOk=this.handleModalOk.bind(this);
        this.handleModalCancel=this.handleModalCancel.bind(this);
    }

    componentWillMount(){
        let that=this;
        axios.get('/api/home').then((res)=> {
            if(res.result.code === 0){
                that.setState({
                    projectList: res.data.projects,
                    firstProject: res.data.firstProject,

                })

                that.props.appStore.initProjectConfig(res.data.firstProject,res.data.configs)

            }else {
                that.props.appStore.initProjectConfig(res.data.firstProject,res.data.configs)
            }

            console.log('homeData',res)
        }).catch((error)=> {
            console.log('error:',error)


        })
    }

    keyStatusRender= (text) => {
        // console.log('text', text)
        return (
            <span>{text.key}
            {
                text.updateStatus==1 && <i className={styles.bgorange}>新</i>
            }
            {
                text.updateStatus==2 && <i className={styles.bgblue}>改</i>
            }
            {
                text.updateStatus==3 && <i className={styles.bgred}>删</i>
            }
            </span>
        )
    }



    tabChange(activeKey) {
        console.log('activeKey',activeKey);
    }



    handleDelete(record){
        let that=this;
        console.log('record', record)
        axios.delete('/api/projects/'+ this.props.appStore.curProjectInfo.id +'/configs/'+ record.keyAndUpdateStatus.key)
            .then(function (res) {
                console.log('res-del',res);
                if(res.result.code===0){
                    that.props.appStore.handleDeleteConfigItem(res.data.config);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    showModal(record) {

        this.setState({
            modalVisible: true,
        });

        console.log('record1',record)

        if(!!record.key){
            this.setState({
                modalTitle: '编辑配置',
                existConfigKey: record.keyAndUpdateStatus.key
            })
            this.props.form.setFieldsValue({

                key: record.keyAndUpdateStatus.key,
                value: record.value.newValue,
                comment: record.comment,
            })
        }else {
            this.setState({
                modalTitle: '新增配置'
            });
        }

        console.log('record',record.key)

    }

    handleModalOk = (record) => {
        let that=this;
        this.setState({
            confirmLoading: true,
        });

        this.props.form.validateFieldsAndScroll(
            (err,values) => {
                if (!err) {
                    console.log('record', values);  //values是获取的组件的值

                    if(!!this.state.existConfigKey){
                        axios.put('api/projects/'+ that.props.appStore.curProjectInfo.id +'/configs/'+ that.state.existConfigKey, {
                            values
                        }).then(function (res) {
                            if(res.result.code===0){
                                that.props.appStore.editProjectConfig(that.state.existConfigKey,res.data.config);
                                that.props.form.setFieldsValue({

                                    key: '',
                                    value: '',
                                    comment: ''
                                })
                                that.setState({
                                    modalVisible: false,
                                    confirmLoading: false,
                                    modalTitle: '新增配置',
                                    existConfigKey:''
                                });
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    }else {
                        axios.post('api/projects/'+ this.props.appStore.curProjectInfo.id +'/configs/', {
                            values
                        }).then(function (res) {
                            if(res.result.code===0){
                                that.props.appStore.addProjectConfig(res.data.config);
                                that.props.form.setFieldsValue({

                                    key: '',
                                    value: '',
                                    comment: ''
                                })
                                that.setState({
                                    modalVisible: false,
                                    confirmLoading: false,
                                    modalTitle: '新增配置',
                                    existConfigKey:''
                                });
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    }


                }else{
                    console.log('err',err)
                }
            },
        );

    }


    handleModalCancel() {
        console.log('Clicked cancel button');

        this.props.form.setFieldsValue({
            key: '',
            value: '',
            comment: '',
        })

        this.setState({
            modalVisible: false,
            confirmLoading: false,
        });

    }


    render(){
        const { getFieldDecorator } = this.props.form;
        const { isNoProject, curProjectInfo, curProjectConfig } = this.props.appStore;


        return isNoProject ? <NoProject /> : (
                <Layout className={styles.configWrap}>
                    <SiderModule first={this.state.firstProject} dataList={this.state.projectList}  />
                    <Content style={contentStyle}>
                        <ProjectInfo curProjectInfo={curProjectInfo} />
                        <Divider dashed />
                        <div style={{ marginBottom: 24 }}>
                            <div className={styles.flexRowCenter}>
                                <h3>配置列表</h3>
                                <div className={styles.flexRowRight}>
                                    <Button type="primary" onClick={this.showModal}>+新增配置</Button>
                                    <PublishModal keyStatusRender={this.keyStatusRender} />
                                </div>
                            </div>

                            <Tabs defaultActiveKey="1" onChange={this.tabChange}>
                                <TabPane tab="基础配置" key="1">
                                    <Table columns={this.state.columns} dataSource={curProjectConfig.slice()} pagination={false} />
                                </TabPane>
                                <TabPane tab="修改记录" key="2">
                                    <p>功能开发中，敬请期待～</p>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Content>

                    <Modal title={this.state.modalTitle}
                        visible={this.state.modalVisible}
                        onOk={this.handleModalOk}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleModalCancel}
                    >
                        {
                            this.state.modalFormItemArr.map((item,i)=>{
                                return (
                                    <FormItem key={i} {...item.layout} label={ item.label }>
                                        {getFieldDecorator(item.id, {
                                            rules: item.rules,
                                        })(
                                            <Input placeholder={ item.placeholder }/>
                                        )}
                                    </FormItem>
                                )
                            })
                        }
                    </Modal>
                </Layout>
            )
    }
}

const ConfigeDetailPageWrap = Form.create()(ConfigeDetailPage);
export default ConfigeDetailPageWrap