'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect } from 'react'
import routeConstant from '@/constant/route'
import useAssetUrl from '@/hook/asset'
import { AnimatePresence } from 'motion/react'
import { useMenu } from '@/context/menu'
import MobileMenuModal from '@/components/MobileMenuModal'

const MobileHeader = ({ common = {}, solutions = [] }) => {
  const { visibleMenu, setVisibleMenu } = useMenu()

  useEffect(() => {
    if (visibleMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    };
  }, [visibleMenu])

  return (
    <>
      <header className="z-10 bg-gray-dpv/20 flex justify-between items-center py-2 px-6 fixed top-0 left-0 w-full backdrop-blur-lg">
        <button
          className="flex flex-col gap-y-2 cursor-pointer"
          onClick={() => setVisibleMenu(true)}>
          <div className="h-0.5 w-6 bg-white-dpv" />
          <div className="h-0.5 w-6 bg-white-dpv" />
        </button>

        <Link href={routeConstant.home} target="_top">
          <Image
            src={useAssetUrl(common.logoBw?.path)}
            width={common.logoBw?.width}
            height={common.logoBw?.height}
            className="w-22 object-cover"
            alt="logo" />
        </Link>
      </header>

      <AnimatePresence>
        {visibleMenu && (
          <MobileMenuModal
            onClose={() => setVisibleMenu(false)}
            common={common}
            solutions={solutions} />
        )}
      </AnimatePresence>
    </>
  )
}

export default MobileHeader