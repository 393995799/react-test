/**
 * Created by lina on 2018/4/19.
 */

//项目配置数据

const Mock = require('mockjs');
let Random = Mock.Random;

//项目一
export let dataProject1 = Mock.mock({
    'id': 'id1234556',
    'appId': Random.id(),
    'projectName': '项目一',
    'deptName': '基础架构一',
    'createTimeText': Random.date('yyyy-MM-dd')
})


//项目二
export let dataProject2 = Mock.mock({
    'id': Random.id(),
    'appId': Random.id(),
    'projectName': '项目一',
    'deptName': '基础架构一',
    'createTimeText': Random.date('yyyy-MM-dd')
})

//模拟不同项目数据
// for(let i=0;i<100;i++){
//      Mock.mock('/api/project/key'+i, {
//         'appId': Random.id(),
//         'dept': '基础架构'+i,
//         'createTime': Random.date('yyyy-MM-dd'),
//         'admins': 'tom, jany',
//         'email': Random.email()
//     });
// }

Mock.mock('/api/project0', {
    'appId': Random.id(),
    'deptName': '基础架构0',
    'createTimeText': Random.date('yyyy-MM-dd'),
    'admins': 'tom, jany',
    'email': Random.email()
});





