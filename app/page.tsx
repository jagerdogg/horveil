import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WWBanner from './components/WWBanner'
import Feed from './components/Feed'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WWBanner />
      <Feed />
      <Footer />
    </main>
  )
}