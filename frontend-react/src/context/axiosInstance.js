import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_BASE_API

const axiosInstance = axios.create({
    baseURL: baseURL
})

// request interceptors

axiosInstance.interceptors.request.use(
        function(config) {
                console.log(config)
                const access_token = localStorage.getItem('access_token')
                if (access_token){
                        config.headers.Authorization = `Bearer ${access_token}`
                }
            return config
        },
        function(error) {
            return Promise.reject(error)
        }
)
axiosInstance.interceptors.response.use(
    function(response) {
        return response
    },

    function(error) {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refresh_token = localStorage.getItem('refresh_token')

            try{
                const response = axiosInstance.post('/token/refresh/',
                {refresh : refresh_token})
                    console.log(response.data)
                    localStorage.setItem('access_token', response.data.access)
                    localStorage.setItem('refresh_token', response.data.refresh)

                    originalRequest.headers.Authorization = `Bearer ${response.data.access}`
                    return axiosInstance(originalRequest)


            }
            catch(error){
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = '/login'
                return false;

            }
 
        }
        return Promise.reject(error) 
    }
)

export default axiosInstance;
