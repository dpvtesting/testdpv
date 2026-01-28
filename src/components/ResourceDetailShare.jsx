'use client'
import React from 'react'
import xIcon from '@/assets/x.png'
import linkedinIcon from '@/assets/linkedin.png'
import Image from 'next/image'
import routeConstant from '@/constant/route'

const ResourceDetailShare = ({ id }) => {
  const pageUrl = () => `${process.env.NEXT_PUBLIC_HOST}/${routeConstant.resourceDetail}/${id}`

  return (
    <div className="mt-2.5 flex items-center gap-x-4 w-full">
      <button
        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl()}`, '_blank')}
        className="cursor-pointer">
        <Image src={linkedinIcon} className="w-8 h-8" alt="icon" />
      </button>
      <button
        onClick={() => window.open(`https://twitter.com/intent/tweet/?url=${pageUrl()}`, '_blank')}
        className="cursor-pointer">
        <Image src={xIcon} className="w-8 h-8" alt="icon" />
      </button>
    </div>
  )
}

export default ResourceDetailShare