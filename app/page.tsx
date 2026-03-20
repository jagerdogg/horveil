import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Feed from './components/Feed'
import Footer from './components/Footer'
import ConfirmBanner from './components/ConfirmBanner'

export const revalidate = 0

export default function Home() {
  return (
    <main>
      <Navbar />
      <ConfirmBanner />
      <Hero />
      <Feed />
      <Footer />
    </main>
  )
}