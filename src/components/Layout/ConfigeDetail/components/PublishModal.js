/**
 * Created by lina on 2018/5/8.
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Icon, Row, Col, Table, Input, Button, Modal, Form, message } from 'antd'
import styles from '../../../../styles/configeDetailPage.less'
import axios from '../../../../utils/request'

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

@inject('appStore') @withRouter @observer
class PublishModal extends Component {
    constructor(props){
        super(props)

        this.state= {
            visible:false,
            modalPublicItem: [
                {
                    layout: {...formItemLayout},
                    label: 'releaseName',
                    id: 'releaseName',
                    rules: [{
                        required: true,
                        message: '请输入发布名称',
                    }],
                    placeholder:'请输入'
                },
                {
                    layout: {...formItemLayout},
                    label: 'Comment',
                    id: 'releaseComment',
                    rules: [{
                        required: false
                    },{
                        pattern: /^.{0,1024}$/,
                        message: '长度为0-1024个任意字符'
                    }],
                    placeholder:'请输入'
                },


            ],
            publishColumns: [ {
                title: 'Key',
                dataIndex: 'keyAndUpdateStatus',
                key: 'keyAndUpdateStatus',
                width: 100,
                render: (text) => (this.props.keyStatusRender(text))
            }, {
                title: 'NewValue',
                dataIndex: 'newValue',
                key: 'newValue',
                width: 150,
            }, {
                title: 'OldValue',
                dataIndex: 'releasedValue',
                key: 'releasedValue'
            },{
                title: 'Comment',
                dataIndex: 'comment',
                key: 'comment',
                width: 100,
            },{
                title: 'Date',
                dataIndex: 'operatorTimeText',
                key: 'operatorTimeText',
                width: 100,
            }],
            data: [],
        }

        this.showModal=this.showModal.bind(this);
        this.onOk=this.onOk.bind(this);
        this.onCancel=this.onCancel.bind(this);

    }


    showModal(){
        let that=this;
        this.setState({
            visible: true
        });

        axios.get('/api/projects/'+ this.props.appStore.curProjectInfo.id +'/releases/preview').then((res)=> {
            if(res.result.code === 0){
                that.props.form.setFieldsValue({
                    releaseName: res.data.releaseName
                })

                res.data.configs.forEach((item)=> item.key=item.keyAndUpdateStatus.key);
                that.setState({
                    data: res.data.configs
                })
            }
        }).catch((error)=> {
            console.log('error:',error)
        })
    }

    onOk(){
        let that=this;

        this.setState({
            confirmLoading: true,
        })

        this.props.form.validateFieldsAndScroll(
            (err,values) => {
                if (!err) {
                    // console.log('publish1', values);  //values是获取的组件的值

                    axios.post('api/projects/'+ this.props.appStore.curProjectInfo.id +'/releases', {
                        values
                    }).then(function (res) {
                        if(res.result.code===0){
                            that.setState({
                                visible: false,
                                confirmLoading: false,
                            }, () => {
                                message.success('恭喜你，配置发布成功！');
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                }else{
                    console.log('err-release',err)
                }
            },
        );


    }

    onCancel(){
        this.setState({
            visible: false
        })
    }




    render(){
        const { getFieldDecorator }=this.props.form;

        return (
            <div>
                <Button type="primary" className={styles.btnBlue} onClick={this.showModal}>发 布</Button>
                <Modal title="发布"
                    visible={this.state.visible}
                    onOk={this.onOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.onCancel}
                    width={960}
                >
                    <Row className={styles.publishCol} >
                        <Col span={4} style={{ textAlign: 'right',marginTop: 14, color: '#000' }}>Changes：</Col>
                        <Col span={16} >
                            <Table columns={this.state.publishColumns} dataSource={this.state.data} pagination={false} />
                        </Col>
                    </Row>
                    {
                        this.state.modalPublicItem.map((item,i)=>{
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
            </div>
        )
    }
}

const PublishModalWrap=Form.create()(PublishModal)

export default PublishModalWrap