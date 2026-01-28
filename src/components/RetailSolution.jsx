'use client'
import React from 'react'
import arrowRight from '@/assets/arrow-right.png'
import { useMenu } from '@/context/menu'
import Button from "@/components/Button"

const RetailSolution = ({ title }) => {
  const { setVisibleSolution, setVisibleMenu } = useMenu()

  const openSolutionMenu = () => {
    setVisibleMenu(true)
    setVisibleSolution(true)
  }

  return (
    <>
      <div className="text-blue-dpv text-[40px] font-medium xl:text-[52px] xl:-mt-3 leading-none mb-8 xl:mb-0">
        {title}
      </div>
      <div>
        <Button
          onClick={openSolutionMenu}
          title="EXPLORE"
          icon={arrowRight}
          shadow />
      </div>
    </>
  )
}

export default RetailSolution