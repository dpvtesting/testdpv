'use client'
import React from 'react'
import Button from '@/components/Button'
import phone from '@/assets/phone.png'
import arrowRight from '@/assets/arrow-right.png'
import routeConstant from '@/constant/route'
import Link from 'next/link'

const ContactUsButton = ({ shadow, withArrow = false, onClick }) => {
  return (
    <Link href={routeConstant.contact} target="_top">
      <Button
        title="CONTACT US"
        icon={withArrow ? arrowRight : phone}
        onClick={() => {
          onClick && onClick()
        }}
        shadow={shadow} />
    </Link>
  )
}

export default ContactUsButton