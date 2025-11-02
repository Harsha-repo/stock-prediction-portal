import React from 'react'
import axiosInstance from '../../context/axiosInstance'
import { useEffect } from 'react'
import { useState } from 'react'




const Dashboard = () => {

    const [ticker , setTicker] = useState('')
    const [error , setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [plot , setPlot] = useState()
    const [ma100 , setMa100] = useState()
    const [finalplot , setFinalplot] = useState()
    const [mse , setMse] = useState()
    const [rmse , setRMSE] = useState()
    const [r2 , setR2] = useState()

    

    

    useEffect(()=>{

      const fetch_protected_data = async () =>{
        try {
          const response = await axiosInstance.get('/protected/')
          console.log(response.data)

        } catch (error) {
          console.log(error.response.data)
          if (error.response && error.response.data && error.response.data.error) {
            setError(error.response.data.error)
          } else {
            setError('An unexpected error occurred')
          }
        }
      }
      fetch_protected_data()
    },

      [])


      const handlesubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
          const response = await axiosInstance.post('/predict/',{
            ticker:ticker

          })

          console.log(response.data)
          if (response.data.plot_img) {
            const backend_root = import.meta.env.VITE_BACKEND_ROOT
            const plotUrl = `${backend_root}${response.data.plot_img}`
            console.log(plotUrl)
            setPlot(plotUrl)
            const ma_url =  `${backend_root}${response.data.plot_100_dma}`
            setMa100(ma_url)
            console.log(ma_url)
            const final_url = `${backend_root}${response.data.plot_final_prediction}`
            console.log(final_url)
            setFinalplot(final_url)
            setMse(response.data.mse)
            setRMSE(response.data.rmse)
            setR2(response.data.r2)


          }

          if (response.data.error){
            setError(response.data.error)
          }else{
            setError('')
          }
        } catch (error) {
          console.log(error.response.data)
          if (error.response && error.response.data && error.response.data.error) {
            setError(error.response.data.error)
          } else {
            setError('An unexpected error occurred')
          }
        } finally {
          setLoading(false)
        }

      }



  return (
    <div className='container  mt-4 mb-5 pb-5' >
       <div className="row " >
        <div className="col-md-6 mx-auto ">
          <form action="" onSubmit={handlesubmit}>
            <input type="text"  className='form-control' placeholder='Enter stock ticker '
            onChange={(e)=>setTicker(e.target.value)} required
            />
            <small> {error && <div className='text-danger'>{error}</div>} </small>
            <button className='btn btn-dark mt-3' disabled={loading}>
              {loading ? 'Loading...' : 'See Predictions'}
            </button>

          </form>
          {plot && <img src={plot} style={{maxWidth : '150%'}} alt="Stock Plot" className="mt-3" />}

          {/* dmaplot */}
          {ma100 && <img src={ma100} style={{maxWidth : '150%'}} alt="Stock Plot" className="mt-3" /> }

          {/* finalPlot */}
          {finalplot && <img src={finalplot} style={{maxWidth : '150%'}} alt="Stock Plot" className="mt-3" /> }
          
          {/* Model Evaluation Metrics */}
          {mse !== undefined && rmse !== undefined && r2 !== undefined && (
            <div className="mt-4">
              <h5>Model Evaluation Metrics</h5>
              <ul className="list-group">
                <li className="list-group-item">MSE: {mse.toFixed(4)}</li>
                <li className="list-group-item">RMSE: {rmse.toFixed(4)}</li>
                <li className="list-group-item">R² Score: {r2.toFixed(4)}</li>
              </ul>
            </div>
          )}
          
        </div>
       </div>
    </div>
  )
}

export default Dashboard
