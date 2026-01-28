import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import arrowRight from '@/assets/arrow-right2.png'
import routeConstant from '@/constant/route'

const LIST = [
  {
    key: 'home',
    text: 'Home',
    link: routeConstant.home
  },
  {
    key: 'about-us',
    text: 'About us',
    link: routeConstant.about
  },
  {
    key: 'solutions',
    text: 'Solutions',
    isSolution: true
  },
  {
    key: 'resources',
    text: 'Resources',
    link: routeConstant.resources
  },
  {
    key: 'careers',
    text: 'Careers',
    link: routeConstant.careers
  },
  {
    key: 'contact-us',
    text: 'Contact us',
    link: routeConstant.contact
  },
]

const MenuList = ({ templateList, onClickSolutions, onClick }) => {
  const finalList = templateList.map(t => LIST.find(l => l.key === t) || {}).filter(t => !!t.key)

  return (
    <div className="flex flex-col gap-y-4 xl:gap-y-5">
      {
        finalList.map(f => {
          if (f.isSolution) {
            return (
              <button
                key={f.key}
                onClick={() => { onClickSolutions && onClickSolutions() }}
                className="cursor-pointer flex items-center"
              >
                <div className="text-[40px] xl:text-7xl leading-none text-white-dpv">
                  {f.text}
                </div>
                <div className="mt-2 xl:mt-5 ml-3 xl:ml-8">
                  <Image src={arrowRight} className="w-10 xl:w-14" alt="arrow-right" />
                </div>
              </button>
            )
          }

          return (
            <Link
              key={f.key}
              href={f.link}
              onClick={onClick}
              className="text-[40px] xl:text-7xl leading-none text-white-dpv"
              target="_top">
              {f.text}
            </Link>
          )
        })
      }
    </div>
  )
}

export default MenuList