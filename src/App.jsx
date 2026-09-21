import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lang, useLang } from './i18n/Lang'
import { SHOW_SPONSORS } from './config'
import Topbar from './components/Topbar'
import Hero from './components/Hero'
import InfoSec from './components/InfoSec'
import PerksSec from './components/PerksSec'
import StorySec from './components/StorySec'
import SponsorsSec from './components/SponsorsSec'
import CtaSec from './components/CtaSec'
import Footer from './components/Footer'
import './styles/main.css'

gsap.registerPlugin(ScrollTrigger)

function Page() {
  const { t, lang } = useLang()

  useEffect(() => {
    document.title = t('meta.title')
  }, [t, lang])

  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <InfoSec />
        <PerksSec />
        <StorySec />
        {SHOW_SPONSORS ? <SponsorsSec /> : null}
        <CtaSec />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Lang>
      <Page />
    </Lang>
  )
}
