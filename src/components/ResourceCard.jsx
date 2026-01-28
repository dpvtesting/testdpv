'use client'
import React from 'react'
import useAssetUrl from '@/hook/asset'
import { formatDate } from '@/util'
import arrowRight from '@/assets/arrow-right3.png'
import arrowRight2 from '@/assets/arrow-right2.png'
import Image from 'next/image'
import Link from 'next/link'
import routeConstant from "@/constant/route"
import classNames from 'classnames'

const ResourceCard = ({ thumbnail, type, headline, date, id, secondary = false, types = [] }) => {
  const getType = id => types?.find(t => t._id === id) || {}
  return (
    <div>
      <Link
        href={routeConstant.resourceDetail + '/' + id}
        target="_top"
      >
        <Image 
          src={useAssetUrl(thumbnail?.path)}
          height={thumbnail?.height}
          width={thumbnail?.width}
          className="aspect-square object-cover"
          alt="thumbnail" />

        <div className={classNames({
          'py-1.5 px-4 text-base my-4 justify-self-start font-semibold uppercase border rounded-full': true,
          'text-blue-dpv border-blue-dpv': !secondary,
          'text-white-dpv border-white-dpv': secondary
        })}>
          {getType(type._id).value}
        </div>

        <div className={classNames({
          'uppercase text-[32px] leading-none font-bold': true,
          'text-purple-dpv': !secondary,
          'text-white-dpv': secondary
        })}>
          {headline}
        </div>

        <div className={classNames({
          'text-base font-semibold uppercase mt-3': true,
          'text-gray-dpv-5': !secondary,
          'text-white-dpv': secondary
        })}>
          {formatDate(date)}
        </div>

        <div
          className={classNames({
            'mt-4 tracking-widest flex gap-x-4 items-center': true,
            'text-blue-dpv': !secondary,
            'text-white-dpv': secondary
          })}>
          <div>
            READ FULL ARTICLE
          </div>
          {!secondary ? (
            <Image src={arrowRight} className="w-8 object-cover mt-1" alt="arrow" />
          ): (
            <Image src={arrowRight2} className="w-8 object-cover mt-1" alt="arrow" />
          )}
        </div>
      </Link>
    </div>
  )
}

export default ResourceCard