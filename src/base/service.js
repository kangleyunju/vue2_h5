import axios from 'axios'
const baseURL = "http://192.168.26.174:8080"
const service = axios.create({
	baseURL,
	timeout: 1000 * 5 // 请求超时时间
})
// 请求拦截
service.interceptors.request.use((config) => {
	config.headers['X-Token'] = 'a5FfqGemBVBcgw5Im0p4UXm80J1WQfFb'
	return config
})
// 响应拦截
service.interceptors.response.use(response => {
	return response.data
}, error => {
	if (JSON.stringify(error).includes('timeout')) {
		error.code = 500
		error.msg = '响应超时'
	}
	return error
})
export default service