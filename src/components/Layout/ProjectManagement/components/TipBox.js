/**
 * Created by lina on 2018/5/18.
 */
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import styles from '../../../../styles/addProject.less'

@inject('appStore')  @observer
class TipBox extends Component {
    constructor(props){
        super(props);

    }

    render(){
        let { tipInfo }= this.props;

        return(
            <div className={styles.tipInfo}>
                <div style={{ backgroundImage: 'url(' + tipInfo.imgUrl + ')', }}></div>
                <h3>{ tipInfo.text }</h3>
                <p><a href="/">返回首页</a></p>
            </div>
        )
    }
}

export default TipBox;