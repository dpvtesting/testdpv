import Link from 'next/link'
import Button from '@/components/Button'
import arrowRight from '@/assets/arrow-right.png'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-purple-dpv">
      <h1 className="text-4xl font-bold text-white-dpv">404</h1>
      <p className="text-lg mt-2 text-white-dpv">Sorry, we couldn't find that page.</p>
      <Link href="/" className="mt-5">
        <Button
          icon={arrowRight}
          title="Return Home"/> 
      </Link>
    </div>
  )
}