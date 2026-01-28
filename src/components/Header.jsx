'use client'
import Link from 'next/link'
import Image from 'next/image'
import ContactUsButton from '@/components/ContactUsButton'
import MenuModal from '@/components/MenuModal'
import routeConstant from '@/constant/route'
import useAssetUrl from '@/hook/asset'
import { AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useMenu } from '@/context/menu'

const Header = ({ common = {}, solutions = [] }) => {
  const { visibleMenu, setVisibleMenu } = useMenu()
  const pathname = usePathname()

  const isResourcesPage = pathname.includes(routeConstant.resources) || pathname.includes(routeConstant.resourceDetail)

  const getLogo = () => isResourcesPage ? common.logo : common.logoBw

  return (
    <>
      <header className={classNames({
        'z-10 flex items-center pr-6 fixed top-0 left-0 w-full backdrop-blur-lg border-b border-gray-dpv-2': true,
        'bg-gray-dpv/20': !isResourcesPage,
        'bg-white-dpv-2/20': isResourcesPage
      })}>
        <div className="fixed top-0 left-18.5 h-screen border-l border-gray-dpv-2 bg-gray-dpv-2" />
        <button
          className="flex flex-col xl:gap-y-2 px-6 py-7 cursor-pointer"
          onClick={() => setVisibleMenu(true)}>
          <div className={classNames({
            'xl:h-0.5 xl:w-6': true,
            'bg-white-dpv': !isResourcesPage,
            'bg-blue-dpv': isResourcesPage
          })} />
          <div className={classNames({
            'xl:h-0.5 xl:w-6': true,
            'bg-white-dpv': !isResourcesPage,
            'bg-blue-dpv': isResourcesPage
          })} />
        </button>

        <div className="flex items-center py-2 w-full">
          <Link href={routeConstant.home} className="xl:ml-6" target="_top">
            <Image
              src={useAssetUrl(getLogo()?.path)}
              width={getLogo()?.width}
              height={getLogo()?.height}
              className="xl:w-22"
              alt="logo" />
          </Link>

          <div className="ml-auto">
            <ContactUsButton />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {visibleMenu && (
          <MenuModal
            common={common}
            solutions={solutions}
            onClose={() => setVisibleMenu(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default Header