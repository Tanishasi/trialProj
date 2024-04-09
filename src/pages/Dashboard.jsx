import React from 'react'
import DashboardStatsGrid from '../component/DashboardStatsGrid'
import BuyerProfileChart from '../component/BuyerProfileChart'

const Dashboard = () => {
  return (
    <div className='relative   '>
            <div className='flex    mt-[100px] h-[400px] '>
             <DashboardStatsGrid/>
             <BuyerProfileChart/>

            </div>
        </div>
  )
}

export default Dashboard