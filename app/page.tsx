"use client"
import React from 'react'
import MainPage from '@/components/mainpage/MainPage'
import Whoweare from '@/components/whoWeAre/Whoweare'
import OurServices from '@/components/services/OurServices'
import TestimonialsSection from '@/components/testimonials/TestimonialsSection'
import BlogsSection from '@/components/blogs/BlogsSection'
import Newsletter from '@/components/newsletter/Newsletter'
import Banner from '@/components/banner/Banner'


const page = () => {
  return (
    <div className=''>
      <MainPage/>
      <Banner/>
      <Whoweare/>
      <OurServices/>
      <TestimonialsSection/>
      <BlogsSection/>
      <Newsletter/>
    </div>
  )
}

export default page
