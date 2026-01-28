'use client'
import React, { useState } from 'react'
import routeConstant from '@/constant/route'
import Link from 'next/link'
import arrowTopRight from '@/assets/arrow-topright.png'
import Image from 'next/image'
import classNames from 'classnames'

const SolutionMenuItem = ({ slug, title, onClose }) => {
  const [hover, setHover] = useState(false)

  return (
    <Link
      href={routeConstant.solutions + '/' + slug}
      onClick={onClose}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      target="_top"
    >
      <div className={classNames({
        'flex justify-between items-center xl:py-2 border-t transition border-white-dpv xl:border-transparent': true,
        'xl:border-transparent': !hover,
        'xl:border-white-dpv': hover
      })}>
        <div className="font-semibold text-[24px] xl:text-[28px] text-white-dpv">
          {title}
        </div>
        {hover && (
          <div>
            <Image src={arrowTopRight} className="hidden xl:block w-3.5" alt="arrow"/>
          </div>
        )}
      </div>
    </Link>
  )
}

export default SolutionMenuItem