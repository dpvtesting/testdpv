'use client'
import React, { useState } from 'react'
import arrowRight from '@/assets/arrow-right.png'
import Button from '@/components/Button'

const ContactForm = ({ form = {} }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitForm, setIsSubmitForm] = useState(false)

  const submitForm = async e => {
    e.preventDefault()

    if (!name || !email || !company || !message) {
      window.alert('Please fill all input')
      return
    }

    try {
      setIsSubmitForm(true)
      const res = await fetch(process.env.NEXT_PUBLIC_ADMIN_HOST + '/api/content/item/contactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            name,
            email,
            company,
            message
          }
        })
      })
      await res.json()

      fetch('/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          message
        }),
      })

      window.alert('Message sent!')
    } catch(err) {
      console.error(err)
      window.alert('Something went wrong, please try again')
    } finally {
      setName('')
      setEmail('')
      setCompany('')
      setMessage('')
      setIsSubmitForm(false)
    }
  }

  return (
    <form onSubmit={submitForm} className="flex flex-col">
      <div className="w-full">
        <div className="text-sm xl:text-base font-bold tracking-widest text-white-dpv uppercase">
          {form.name?.title}
        </div>
        <div className="py-2 xl:py-4 border-b border-blue-dpv/70">
          <input
            type="text"
            className="text-[23px] placeholder-blue-dpv/70 text-blue-dpv outline-none w-full"
            placeholder={form.name?.placeholder}
            onChange={e => setName(e.target.value)}
            value={name} />
        </div>
      </div>

      <div className="mt-5 xl:mt-8 w-full">
        <div className="text-sm xl:text-base font-bold tracking-widest text-white-dpv">
          {form.email?.title}
        </div>
        <div className="py-2 xl:py-4 border-b border-blue-dpv/70">
          <input
            type="email"
            className="text-[23px] placeholder-blue-dpv/70 text-blue-dpv outline-none w-full"
            placeholder={form.email?.placeholder}
            onChange={e => setEmail(e.target.value)}
            value={email} />
        </div>
      </div>

      <div className="mt-5 xl:mt-8 w-full">
        <div className="text-sm xl:text-base font-bold tracking-widest text-white-dpv">
          {form.company?.title}
        </div>
        <div className="py-2 xl:py-4 border-b border-blue-dpv/70">
          <input
            type="text"
            className="text-[23px] placeholder-blue-dpv/70 text-blue-dpv outline-none w-full"
            placeholder={form.company?.placeholder}
            onChange={e => setCompany(e.target.value)}
            value={company} />
        </div>
      </div>

      <div className="mt-5 xl:mt-8 w-full">
        <div className="text-sm xl:text-base font-bold tracking-widest text-white-dpv">
          {form.message?.title}
        </div>
        <div className="py-2 xl:py-4 border-b border-blue-dpv/70">
          <textarea
            type="text"
            className="text-[23px] placeholder-blue-dpv/70 text-blue-dpv outline-none w-full"
            placeholder={form.message?.placeholder}
            onChange={e => setMessage(e.target.value)}
            value={message} />
        </div>
      </div>

      <div className="mt-8 xl:mt-12 ml-auto">
        <Button
          type="submit"
          title="SEND"
          icon={arrowRight}
          disabled={isSubmitForm}
          shadow />
      </div>
    </form>
  )
}

export default ContactForm