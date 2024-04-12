import AdminDash from '@/modules/admin/AdminDashboard';
import React from 'react'

const page = () => {

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-y-6 relative ">
      <AdminDash />
    </main>
  ); 
    
}

export default page