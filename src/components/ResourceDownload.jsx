'use client'
import React, { useState } from 'react'
import downloadIcon from '@/assets/download.png'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { getDownloadHtmlTemplate } from '@/util/resource'

const ResourceDownload = ({ headline, content }) => {
  const [visibleDownloadModal, setVisibleDownloadModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitForm, setIsSubmitForm] = useState(false)

  const submitForm = async e => {
    e.preventDefault()

    if (!name || !email) {
      window.alert('Please fill all input')
      return
    }

    try {
      setIsSubmitForm(true)

      const res = await fetch(process.env.NEXT_PUBLIC_ADMIN_HOST + '/api/content/item/resourceDownloadForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            name,
            email
          }
        })
      })
      await res.json()

      await downloadFile()
    } catch(err) {
      console.error(err)
      window.alert('Something went wrong, please try again')
    } finally {
      setIsSubmitForm(false)
      setVisibleDownloadModal(false)
    }
  }

  const downloadFile = async () => {
    const options = {
      margin: [12, 20, 20, 12],
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true, useCORS: true },
      jsPDF: {
        unit: 'pt',
        format: 'letter',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    }

    const html2pdf = (await import('html2pdf.js')).default
    html2pdf()
      .set(options)
      .from(getDownloadHtmlTemplate(headline, content))
      .save('document.pdf')
  }

  return (
    <>
      <div>
        <div className="text-purple-dpv text-sm xl:text-base font-bold">
          DOWNLOAD
        </div>
        <button
          onClick={() => setVisibleDownloadModal(true)}
          className="mt-2.5 px-4 py-1.5 text-white-dpv flex items-center gap-x-3 rounded-full bg-blue-dpv cursor-pointer">
          <div className="font-semibold">
            DOWNLOAD
          </div>
          <Image src={downloadIcon} className="mt-0.5 w-3 h-3" alt="download" />
        </button>
      </div>

      <AnimatePresence>
        {visibleDownloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-20">
            <div className="fixed top-0 left-0 h-screen w-screen bg-black-dpv/20" onClick={() => setVisibleDownloadModal(false)} />

            <motion.form
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              onSubmit={submitForm}
              className="fixed top-1/2 left-1/2 -translate-1/2 bg-white w-11/12 xl:w-1/3 p-6 flex flex-col gap-y-8">
              <div className="w-full">
                <div className="xl:text-base font-bold tracking-widest text-purple-dpv uppercase">
                  Name
                </div>
                <div className="xl:py-4 border-b border-purple-dpv">
                  <input
                    type="text"
                    className="xl:text-[23px] placeholder-purple-dpv text-purple-dpv outline-none w-full"
                    placeholder="Enter your name here"
                    onChange={e => setName(e.target.value)}
                    value={name} />
                </div>
              </div>
              <div className="w-full">
                <div className="xl:text-base font-bold tracking-widest text-purple-dpv uppercase">
                  Email
                </div>
                <div className="xl:py-4 border-b border-purple-dpv">
                  <input
                    type="email"
                    className="xl:text-[23px] placeholder-purple-dpv text-purple-dpv outline-none w-full"
                    placeholder="Enter your email here"
                    onChange={e => setEmail(e.target.value)}
                    value={email} />
                </div>
              </div>

              <div className="ml-auto">
                <button
                  type="submit"
                  disabled={isSubmitForm}
                  className="mt-2.5 px-4 py-1.5 text-white-dpv flex items-center gap-x-3 rounded-full bg-blue-dpv cursor-pointer">
                  <div className="font-semibold">
                    DOWNLOAD
                  </div>
                  <Image src={downloadIcon} className="mt-0.5 w-3 h-3" alt="download" />
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ResourceDownload