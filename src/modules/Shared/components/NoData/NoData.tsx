import React from 'react'
import imgData from '.././../../../assets/Nodata.png'
export default function NoData() {
  return (
    <div className=''>
 
        <div className='text-center ms-2 p-5 '>
           

            <img src={imgData} alt="" className='w-50 '/>
            <h3 className='text-secondary mt-2'>No Data   <i className="fa-solid fa-cog fa-spin fa-1x"></i></h3>


        </div>


      
    </div>
  )
}
