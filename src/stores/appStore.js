import { observable, action, runInAction } from 'mobx'
import { projectConfigs } from '../services/app'

class appStore {

    @observable isNoProject;
    @observable loading;
    @observable curProjectInfo;
    @observable curProjectConfig;

    constructor() {
        this.isNoProject= null;
        this.curProjectInfo = '';
        this.curProjectConfig = [];

    }



    // @action.bound changeProject= async key => {
    //     try {
    //         const res = await projectConfigs(key)
    //         // console.log('curProjectConfig-key',key)
    //         runInAction(() => {
    //             if(res.result.code === 0){
    //               this.curProjectInfo = res.data.project
    //               res.data.configs.forEach((item,index) => {
    //                   item.key= item.keyAndUpdateStatus.key
    //               });
    //
    //               this.curProjectConfig= res.data.configs
    //             }
    //
    //             // console.log('curProjectConfig',this.curProjectConfig)
    //         })
    //     }
    //     catch (error) {
    //       console.log(error)
    //     }
    // }




  @action showLoading() {
      this.loading = true
  }

  @action hideLoading() {
      this.loading = false
  }

}

export default new appStore()