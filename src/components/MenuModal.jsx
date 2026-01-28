'use client'
import React from 'react'
import Image from 'next/image'
import ContactUsButton from '@/components/ContactUsButton'
import MenuList from '@/components/MenuList'
import arrowLeft from '@/assets/arrow-left.png'
import CloseIcon from '@/components/CloseIcon'
import useAssetUrl from '@/hook/asset'
import SolutionMenuItem from './SolutionMenuItem'
import { motion, AnimatePresence } from 'motion/react'
import { useMenu } from '@/context/menu'

const MenuModal = ({ onClose, common, solutions }) => {
  const { visibleSolution, setVisibleSolution } = useMenu()
  const solutionMenus = solutions.sort((a, b) => a.sequence - b.sequence)

  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2, easing: 'ease-in' }}
      className="fixed top-0 left-0 z-20 bg-blue-dpv-4/40 backdrop-blur-[20px] w-screen h-screen"
    >
      <section className="xl:py-2 xl:px-6 flex items-center">
        <CloseIcon onClick={() => {
          onClose()
          setVisibleSolution(false)
        }} />
        <div className="xl:ml-12">
          <Image
            src={useAssetUrl(common.logoBw?.path)}
            width={common.logoBw?.width}
            height={common.logoBw?.height}
            className="xl:w-22"
            alt="logo" />
        </div>
      </section>

      <hr className="text-gray-dpv-2" />

      <section className="xl:px-8 xl:w-11/12 xl:h-full xl:mx-auto flex flex-col">
        <section className="flex xl:h-5/6 items-center">
          <section className="flex w-full">
            <div className="w-1/3 my-auto">
              <MenuList
                templateList={common.menuList}
                onClickSolutions={() => setVisibleSolution(true)}
                onClick={onClose} />
            </div>

            <div className="w-2/3 flex flex-col">
              <AnimatePresence mode="wait">
                {visibleSolution ? (
                  <motion.div
                    key="first"
                    initial={{ opacity: 0, x: -50, transition: { delay: 0.2 } }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2, easing: 'ease-in' }}
                    className="xl:pl-24 text-white-dpv border-l border-white-dpv">
                    <div className="relative">
                      <div className="font-bold tracking-widest xl:text-base uppercase">
                        {common.menu?.solutionMenuTitle}
                      </div>
                      <button
                        className="cursor-pointer absolute top-1/2 -left-10 -translate-y-1/2"
                        onClick={() => setVisibleSolution(false)}>
                        <Image src={arrowLeft} className="xl:w-6.5" alt="arrow-left" />
                      </button>
                    </div>
                    <p className="text-[22px] xl:mt-6 xl:mb-10 xl:w-3/4">
                      {common.menu?.solutionMenuDescription}
                    </p>

                    <section className="flex flex-col gap-y-4 xl:mt-4">
                      {
                        solutionMenus.map((menu, i) => (
                          <SolutionMenuItem
                            key={i}
                            slug={menu.slug}
                            title={menu.title.text}
                            onClose={onClose} />
                        ))
                      }
                    </section>
                  </motion.div>
                ) : (
                  <motion.div
                    key="second"
                    initial={{ opacity: 0, x: 50, delay: 0.2 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.2, easing: 'ease-out' }}
                    className="mx-auto">
                    <div className="xl:mb-12 text-8xl text-white-dpv">
                      Let's Talk
                    </div>
                    <ContactUsButton
                      onClick={onClose}
                      withArrow />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </section>
      </section>
    </motion.section>
  )
}

export default MenuModal