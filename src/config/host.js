
const _ENV = process.TYPE_ENV
let API_HOST
console.log(_ENV, '_ENV')
switch (_ENV) {
  case 'production':
    API_HOST = 'https://dpom.dianjia001.com'
    break
  case 'testing':
    API_HOST = 'https://dpom.17dianjia.net'
    break
  default :
    API_HOST = 'https://dpom.17dianjia.net'
    // API_HOST = 'http://10.23.0.140:8086/'
}
export default {
  API_HOST
}
