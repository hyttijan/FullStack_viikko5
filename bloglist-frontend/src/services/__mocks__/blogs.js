const getAll = ()=>{return Promise.resolve([])}
let token = null 
const setToken = (newToken)=>{
  
  token = `bearer ${newToken}`
}
export default {getAll,setToken}