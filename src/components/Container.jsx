import classNames from 'classnames'
import React from 'react'

const Container = ({ children, xOnly = false, className = '', ...props }) => (
  <div
    {...props}
    className={classNames({
      ['px-6 xl:pl-28 xl:pr-8 ' + className]: true,
      'py-14 xl:py-20 3xl:py-24': !xOnly
    })}>
    {children}
  </div>
)

export default Container