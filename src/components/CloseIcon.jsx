import React from 'react'

const CloseIcon = ({ onClick, color = 'bg-white-dpv' }) => (
  <button
    className="flex flex-col gap-y-2 relative rotate-45 p-3 cursor-pointer"
    onClick={onClick}>
    <div className={`h-0.5 w-6 absolute top-1/2 left-1/2 -translate-1/2 ` + color} />
    <div className={`h-6 w-0.5 absolute top-1/2 left-1/2 -translate-1/2 ` + color} />
  </button>
)

export default CloseIcon