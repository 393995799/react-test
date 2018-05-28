/**
 * Created by lina on 2018/5/8.
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Icon, Row, Col, Table, Input, Button, Modal, Form } from 'antd'
import styles from '../../../styles/configeDetailPage.less'

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

@inject('appStore') @withRouter @observer
class Publish extends Component {
    constructor(props){
        super(props)
    }


    render(){
        const { getFieldDecorator }=this.props.form;

        return (
            <div>
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
            </div>
        )
    }
}

const PublishWrap=Form.create()(Publish)
export default PublishWrap

