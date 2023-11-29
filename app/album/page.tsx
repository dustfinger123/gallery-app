"use client"
import Header from '@/components/header'
import React, { useEffect, useState } from 'react';
import ViewerRight from './ViewerRight';
import ViewerLeft from './ViewerLeft';

export default function Home() {
  const [sharedChange, setSharedChange] = useState()
  const handleChange = (value: any) => {
    setSharedChange(value)
  }

  return (
    <div className='bg-white h-screen'>
      <Header className={{ position: '', text: '', background: '', shadow: '' }} />
      <ViewerRight sharedChange={sharedChange} />
      <ViewerLeft onChange={handleChange} />
    </div >
  )
}



