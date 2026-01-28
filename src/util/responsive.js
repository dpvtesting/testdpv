const LARGE_BREAKPOINT = 1024
const XTRA_LARGE_BREAKPOINT = 1280
const XTRA3_LARGE_BREAKPOINT = 1920


export const isMobile = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth <= LARGE_BREAKPOINT
}

export const isDesktop = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth >= XTRA_LARGE_BREAKPOINT
}

export const isLargeDesktop = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth >= XTRA3_LARGE_BREAKPOINT
}

export const isExtraLargeDesktop = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth >= XTRA4_LARGE_BREAKPOINT
}