'use client'
import classNames from "classnames"
import Image from 'next/image'

const Button = ({ type, redirect, onClick, icon, title, shadow = false, disabled = false }) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={e => {
        if (redirect) {
          window.open(redirect, '_blank')
          return
        }
        if (onClick) {
          onClick(e)
          return
        }
      }}
      disabled={disabled}
      className={classNames({
        'bg-blue-dpv-2 rounded-full flex gap-x-4 items-center py-1 pr-1 pl-5 cursor-pointer': true,
        'shadow-lg': shadow
      })}>
      <div className="text-blue-dpv font-space-grotesk xl:font-semibold text-sm uppercase">
        {title}
      </div>

      <div className="rounded-full bg-blue-dpv p-2.5">
        <Image src={icon} className="w-2.5" alt="icon" />
      </div>
    </button>
  )
}

export default Button