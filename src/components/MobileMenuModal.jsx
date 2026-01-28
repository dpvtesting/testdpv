'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ContactUsButton from '@/components/ContactUsButton'
import { motion, AnimatePresence } from 'motion/react'
import arrowLeft from '@/assets/arrow-left.png'
import CloseIcon from '@/components/CloseIcon'
import useAssetUrl from '@/hook/asset'
import MenuList from '@/components/MenuList'
import SolutionMenuItem from './SolutionMenuItem'
import { useMenu } from '@/context/menu'

const MobileMenuModal = ({ onClose, common, solutions }) => {
  const { visibleSolution, setVisibleSolution } = useMenu()
  const solutionMenus = solutions.sort((a, b) => a.sequence - b.sequence)

  return (
    <>
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.2, easing: 'ease-in' }}
        className="fixed top-0 left-0 z-20 bg-blue-dpv-4/40 backdrop-blur-[20px] flex flex-col w-screen h-screen"
      >
        <section className="py-2 px-6 flex justify-between items-center">
          <CloseIcon onClick={onClose} />
          <div>
            <Image
              src={useAssetUrl(common.logoBw?.path)}
              width={common.logoBw?.width}
              height={common.logoBw?.height}
              className="w-18"
              alt="logo" />
          </div>
        </section>

        <hr className="text-gray-dpv-2" />

        <section className="px-6 h-full flex flex-col">
          <AnimatePresence mode="wait">
            {!visibleSolution ? (
              <motion.div
                key="main"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2, easing: 'ease-in' }}
                className="py-6">
                <MenuList
                  templateList={common.menuList}
                  onClickSolutions={() => setVisibleSolution(true)}
                  onClick={onClose} />

                <div className="mt-16">
                  <div className="mb-4 text-[28px] text-white-dpv font-bold">
                    Let's Talk
                  </div>
                  <ContactUsButton
                    onClick={onClose}
                    withArrow />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="solution"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2, easing: 'ease-in' }}
                className="text-white-dpv h-full flex flex-col overflow-y-auto">

                <div className="mt-6 mb-3 relative flex items-center gap-x-6">
                  <button
                    className="cursor-pointer"
                    onClick={() => setVisibleSolution(false)}>
                    <Image src={arrowLeft} className="w-6.5" alt="arrow-left" />
                  </button>
                  <div className="font-bold tracking-widest text-base uppercase">
                    {common.menu?.solutionMenuTitle}
                  </div>
                </div>

                <p className="text-[20px] font-medium mb-6">
                  {common.menu?.solutionMenuDescription}
                </p>

                <section className="flex flex-col gap-y-4">
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
            )}
          </AnimatePresence>
        </section>
      </motion.section>
    </>
  )
}

export default MobileMenuModal