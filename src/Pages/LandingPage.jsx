import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import InfoPage from '../components/InfoPage/InfoPage'
import Service from '../components/Services/Service'
import CoreFeatures from '../components/features/CoreFeatures'
import Footer from '../components/Footer/Footer'

function LandingPage() {
  return (
    <>
    <Navbar/>
    <Home/>
    <InfoPage/>
    <Service/>
    <CoreFeatures/>
    <Footer/>
    </>
  )
}

export default LandingPage