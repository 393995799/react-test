import request from '../../src/utils/request'

// export const login = values => {
//   return request.post('/login', values)
// }


export const projectConfigs = projectId => {
  return request.get('/api/projects/' + projectId + '/configs')
}






