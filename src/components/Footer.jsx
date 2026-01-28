'use client'
import Image from 'next/image'
import Link from 'next/link'
import routeConstant from '@/constant/route'
import useAssetUrl from '@/hook/asset'

const Footer = ({ content = {}, logo = {} }) => {
  return (
    <footer className="bg-purple-dpv pt-12 pb-8 px-8 xl:py-12 xl:px-28">
      <section className="flex flex-col xl:flex-row justify-between">
        <div className="w-full xl:w-1/2 flex items-center gap-x-10">
          <Link href={routeConstant.home} className="flex flex-col items-center" target="_top">
            <Image
              src={useAssetUrl(logo.path)}
              width={logo.width}
              height={logo.height}
              className="w-27 mb-1.5"
              alt="logo-colored" />
            {!!content.subtitle && (
              <div className="xl:text-xs text-white-dpv font-semibold">
                {content.subtitle}
              </div>
            )}
          </Link>

          {!!content.motto && (
            <>
              <div className="w-[1px] h-28 bg-white-dpv" />
              <div className="w-24 xl:text-[17px] xl:leading-5 text-white-dpv font-semibold">
                {content.motto}
              </div>
            </>
          )}
        </div>

        <div className="xl:w-1/2 mt-10 xl:mt-0 flex flex-col xl:flex-row xl:gap-x-14">
          <div className="flex flex-wrap gap-y-10">
            {
              content.locations?.map((loc, i) => (
                <div key={i} className="xl:w-[45%] xl:text-[17px] text-white-dpv">
                  <div className="text-gray-dpv-8 font-bold h-7">
                    {loc.tag}
                  </div>
                  <div className="font-semibold tracking-wider">
                    {loc.name}
                  </div>
                  <div className="w-1/2 xl:w-3/4">
                    {loc.detail}
                  </div>
                </div>
              ))
            }
          </div>

          <div className="mt-10 xl:mt-0 xl:ml-auto flex xl:flex-col gap-x-4 xl:gap-x-0 gap-y-2 items-start justify-start">
            {
              content.socials?.map((social, i) => (
                <button
                  key={i}
                  className="flex gap-x-3 cursor-pointer"
                  onClick={() => window.open(social.link, '_blank')}>
                  <div className="mx-auto w-12 h-12 xl:w-8 xl:h-8 flex items-center rounded-full justify-center bg-green-dpv/20">
                    <Image
                      src={useAssetUrl(social.icon?.path)}
                      width={social.icon?.width}
                      height={social.icon?.height}
                      className="w-6 xl:w-4"
                      alt="instagram-icon" />
                  </div>
                  <div className="hidden xl:block mx-auto xl:text-xl text-white-dpv font-semibold">
                    {social.name}
                  </div>
                </button>
              ))
            }
          </div>
        </div>
      </section>

      <section className="mt-10 xl:mt-44 flex justify-between">
        <div className="hidden text-white-dpv text-[17px] font-semibold xl:flex gap-x-8">
          <div className="text-blue-dpv-3 tracking-widest">
            NAVIGATE
          </div>
          <Link href={routeConstant.about} target="_top">
            About Us
          </Link>
          <Link href={routeConstant.resources} target="_top">
            Resources
          </Link>
          <Link href={routeConstant.careers} target="_top">
            Careers
          </Link>
          <Link href={routeConstant.contact} target="_top">
            Contact Us
          </Link>
        </div>

        <div className="text-white-dpv/50 text-[17px]">
          {content.copyright}
        </div>
      </section>
    </footer>
  )
}

export default Footer