import React from 'react'
import cover from '../assets/cover.png'
import Hero from './Hero'
import Featured from './Featured'
import Latest from './Latest'


function HomePage() {
  return (
    <>
      <div className="h-screen" style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Hero/>
      </div>
      <Featured/>
      <Latest/>
    </>
  )
}

export default HomePage