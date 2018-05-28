/**
 * Created by lina on 2018/4/26.
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Route, withRouter } from 'react-router-dom'
import { Card, Form, Input, Button, Select, Checkbox} from 'antd'
import styles from '../../../styles/addProject.less'
import axios from '../../../utils/request'
import TipBox from './components/TipBox'
import imgUrl from '../../../assets/success-icon.png'
import request from '../../../../src/utils/request'

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};



@inject('appStore') @withRouter @observer
class AddProject extends Component {
    constructor(props){
        super(props)
        this.state={
            title: '新建项目',
            tipInfo: {
                imgUrl: imgUrl,
                text: '项目创建成功'
            },
            showAddProjectBox: true,

        };


        this.handleDeptChange=this.handleDeptChange.bind(this);
        this.checkSubmit=this.checkSubmit.bind(this);

    }

    componentWillMount(){
        let { projectId } = this.props.match.params;
        let that = this;
        // console.log('props',this.props);
        // console.log('params', projectId);

        if(projectId){
            //发送请求获取项目基本信息，
            that.setState({
                title: '编辑项目'
            })
            axios.get('/api/editProject/'+ projectId).then((data)=> {
                console.log('put-data',data);
                if(data.result.code===0){
                    that.props.form.setFieldsValue({
                        deptName: data.data.deptName,
                        appId: data.data.appId,
                        projectName: data.data.projectName,
                    })
                }

            }).catch(error => {
                console.log('err',error)
            })
        }
    }



    handleDeptChange(value) {
        console.log(`selected ${value}`);
    }

    checkSubmit() {
        let { projectId } = this.props.match.params;
        let that = this;
        this.props.form.validateFieldsAndScroll(
            (err,values) => {
                if (!err) {
                    // console.info('success', values);  //values是获取的组件的值
                    // console.info('his', projectId);  //values是获取的组件的值

                    if(projectId){
                        request.put('/api/editProject/'+projectId, values).then((data)=>{
                            if(data.result.code===0){
                                that.setState({
                                    showAddProjectBox: false,
                                    tipInfo: {
                                        imgUrl: imgUrl,
                                        text: '项目修改成功'
                                    }
                                })
                            }

                        });
                    }else{
                        request.post('/api/addProject', values).then((data)=>{
                            if(data.result.code===0){
                                that.setState({
                                    showAddProjectBox: false,
                                    tipInfo: {
                                        imgUrl: imgUrl,
                                        text: '项目创建成功'
                                    }
                                })
                            }
                        });
                    }
                }else {
                    console.log('err-addProject',err)
                }
            },
        );
    }



    render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.mainWrap}>

                <Card title={this.state.title} extra={<a href="/">返回首页</a>} >
                    {
                        this.state.showAddProjectBox ? (
                            <div>
                                {/*<FormItem {...formItemLayout} label="部门">*/}
                                {/*{getFieldDecorator('deptName', {*/}
                                {/*rules: [{*/}
                                {/*required: true,*/}
                                {/*message: '请选择部门',*/}
                                {/*}],*/}
                                {/*})(*/}
                                {/*<Select placeholder="请选择部门" style={{ width: '100%' }} onChange={this.handleDeptChange}>*/}
                                {/*<Option value="jack">Jack</Option>*/}
                                {/*<Option value="lucy">Lucy</Option>*/}
                                {/*<Option value="Yiminghe">yiminghe</Option>*/}
                                {/*</Select>*/}
                                {/*)}*/}
                                {/*</FormItem>*/}
                                <FormItem {...formItemLayout} label="部门">
                                    {getFieldDecorator('deptName', {
                                        rules: [{
                                            required: true,
                                            message: '请输入部门名称',
                                        },{
                                            pattern: /^.{1,50}$/,
                                            message: '部门为1-50个字符'
                                        }]
                                    })(
                                        <Input placeholder="部门名称" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="应用ID">
                                    {getFieldDecorator('appId', {
                                        rules: [{
                                            required: true,
                                            message: '请输入应用唯一标识AppId',
                                        },{
                                            pattern: /^[0-9A-Za-z-_]{4,20}$/,
                                            message: 'ID为4-20位字母、数字、下划线、横线的组合'
                                        }],
                                    })(
                                        <Input placeholder="应用唯一标识" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="项目名称">
                                    {getFieldDecorator('projectName', {
                                        rules: [{
                                            required: true,
                                            message: '请输入项目名称',
                                        },{
                                            pattern: /^.{1,50}$/,
                                            message: '项目名称为1-50个字符'
                                        }],
                                    })(
                                        <Input placeholder="请输入项目名称" />
                                    )}
                                </FormItem>

                                {/*<FormItem {...formItemLayout} label="项目管理员">*/}
                                {/*{getFieldDecorator('selectMultiple', {*/}
                                {/*rules: [{*/}
                                {/*required: true,*/}
                                {/*message: '请至少选择一位项目管理员!',*/}
                                {/*type: 'array'*/}
                                {/*}],*/}
                                {/*})(*/}
                                {/*<Select mode="multiple" style={{ width: '100%' }} placeholder="请选择项目管理员">*/}
                                {/*<Option value="red">Red</Option>*/}
                                {/*<Option value="green">Green</Option>*/}
                                {/*<Option value="blue">Blue</Option>*/}
                                {/*</Select>*/}
                                {/*)}*/}
                                {/*</FormItem>*/}


                                <FormItem {...formTailLayout}>
                                    <Button type="primary" onClick={this.checkSubmit}>
                                        确 定
                                    </Button>
                                </FormItem>
                            </div>
                            ): <TipBox tipInfo={this.state.tipInfo} />
                    }

                </Card>
            </div>
        )
    }
}
const AddProjectWrap = Form.create()(AddProject);

export default AddProjectWrap





