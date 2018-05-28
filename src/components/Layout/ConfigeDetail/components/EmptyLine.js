/**
 * Created by lina on 2018/5/18.
 */

import React, { Component } from 'react'
import styles from '../../../../styles/common/common.less'

class EmptyLine extends Component {
    render(){
        return (
            <p className={styles.singleCenter}>No Data</p>
        )
    }
}

export default EmptyLine