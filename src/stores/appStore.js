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

    @action.bound addTab(tab) {
        this.tabBarList.map(item => item.active = false);
        this.tabBarList.push(tab);
    }

    @action.bound initProjectConfig= (infos,configs) => {
        this.curProjectInfo = infos;
        configs.forEach((item,index) => { item.key = item.keyAndUpdateStatus.key+Math.random()*10})
        this.curProjectConfig = configs;

        console.log('ele', this.curProjectConfig)

        if(!!infos.id){
            this.isNoProject= false
        }else {
            this.isNoProject= true
        }

        console.log('is',this.isNoProject)
    }



    @action.bound changeProject= async key => {
        try {
            const res = await projectConfigs(key)
            // console.log('curProjectConfig-key',key)
            runInAction(() => {
                if(res.result.code === 0){
                  this.curProjectInfo = res.data.project
                  res.data.configs.forEach((item,index) => {
                      item.key= item.keyAndUpdateStatus.key
                  });

                  this.curProjectConfig= res.data.configs
                }

                // console.log('curProjectConfig',this.curProjectConfig)
            })
        }
        catch (error) {
          console.log(error)
        }
    }

    @action.bound handleDeleteConfigItem= (res) =>{
        let cur= {key: res.keyAndUpdateStatus.key+Math.random()*10, ...res}
        let newConfig = this.curProjectConfig.filter((item,index)=> item.keyAndUpdateStatus.key != res.keyAndUpdateStatus.key);
        newConfig.unshift(cur);
        this.curProjectConfig = newConfig

    }


    @action.bound addProjectConfig= (res) =>{

        let cur= {key: res.keyAndUpdateStatus.key+Math.random()*10, ...res};
        let newConfig = this.curProjectConfig;
        newConfig.unshift(cur);
        this.curProjectConfig = newConfig;


    }

    @action.bound editProjectConfig= async(existConfigKey,res) =>{

        let cur= {key: res.keyAndUpdateStatus.key+Math.random()*10, ...res};
        let newConfig = this.curProjectConfig.filter((item,index)=> item.keyAndUpdateStatus.key != existConfigKey)
        newConfig.unshift(cur);
        this.curProjectConfig= newConfig
    }


  @action showLoading() {
      this.loading = true
  }

  @action hideLoading() {
      this.loading = false
  }

}

export default new appStore()