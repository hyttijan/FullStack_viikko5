import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null 

const setToken = (newToken)=>{
  token = `bearer ${newToken}`
}
const create = async(newObject) =>{
	const config = {
		headers: {'Authorization': token}
	}
	const response = await axios.post(baseUrl,newObject,config)
	return response.data
}
const update = async(updatedObject)=>{
	const config = {
		headers: {'Authorization': token}
	}
	const response = await axios.put(baseUrl+"/"+updatedObject._id,updatedObject,config)
	return response.data
}
const remove= async(blog)=>{
	const config = {
		headers: {'Authorization': token}
	}
	const response = await axios.delete(baseUrl+"/"+blog._id,config)
	return response.data
}
const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll, create, update, remove, setToken}