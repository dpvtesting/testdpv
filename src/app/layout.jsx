import { Darker_Grotesque, Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import MobileHeader from '@/components/MobileHeader'
import Footer from '@/components/Footer'
import { ReactLenis } from 'lenis/dist/lenis-react'
import { Suspense } from 'react'
import { fetchContents } from '@/util'
import { MenuProvider } from '@/context/menu'

import '@/index.css'

const darkerGrotesque = Darker_Grotesque({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--f-darker-grotesque'
})

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--f-space-grotesk'
})

const Layout = async ({ children }) => {
  const data = await fetchContents([
    'common',
    'footer',
    {
      key: 'solutions',
      param: {
        filter: {
          hideOnMenu: false
        },
        fields: {
          _id: 1,
          slug: 1,
          title: 1,
          sequence: 1,
          hideOnMenu: 1
        },
      }
    }
  ])

  return (
    <html>
      <body>
        <div className={`${spaceGrotesk.variable} ${darkerGrotesque.variable} flex flex-col font-darker-grotesque`}>
          <Suspense>
            <MenuProvider>
              <div className="hidden xl:block">
                <Header
                  solutions={data.solutions}
                  common={data.common} />
              </div>
              <div className="block xl:hidden">
                <MobileHeader
                  solutions={data.solutions}
                  common={data.common} />
              </div>
              <ReactLenis root>
                {children}
              </ReactLenis>
              <Footer
                content={data.footer}
                logo={data.common?.logo} />
            </MenuProvider>
          </Suspense>
        </div>
      </body>
    </html>
  )
}

export default Layout


