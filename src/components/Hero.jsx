import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/Lang'
import { APPLY_URL } from '../config'

export default function Hero() {
  const { t } = useLang()
  const sceneRef = useRef(null)
  const lightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) {
        gsap.to(sceneRef.current, {
          opacity: 0, y: -80,
          scrollTrigger: { trigger: sceneRef.current.parentElement, start: 'top top', end: '55% top', scrub: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const light = lightRef.current
    if (!light || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mobile = matchMedia('(max-width: 759px)')
    let raf = 0
    let lx = 0.5, ly = 0.32, tx = 0.5, ty = 0.32
    const onMove = (e) => {
      tx = e.clientX / innerWidth
      ty = e.clientY / innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    if (!mobile.matches) {
      const tick = () => {
        lx += (tx - lx) * 0.06
        ly += (ty - ly) * 0.06
        light.style.transform = `translate3d(${(lx - 0.5) * 34}%, ${(ly - 0.5) * 34}%, 0)`
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-light" ref={lightRef} aria-hidden="true" />
      <div className="hero-inner" ref={sceneRef}>
        <div className="hero-slogan">
          <span className="hero-slogan-en hero-line">{t('hero.sloganEn')}</span>
          <span className="hero-slogan-cn hero-line">{t('hero.sloganCn1')}<em>{t('hero.sloganCn2')}</em></span>
        </div>
        <p className="hero-sub hero-line">{t('hero.sub')}</p>
        <div className="hero-actions hero-line">
          <a className="btn-green" href={APPLY_URL} target="_blank" rel="noopener noreferrer">{t('hero.btn')}</a>
          <a className="btn-ghost" href="#info-sec">{t('hero.btn2')}</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>{t('hero.scroll')}</span>
        <i />
      </div>
    </section>
  )
}
