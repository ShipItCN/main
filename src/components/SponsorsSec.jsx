import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/Lang'
import { SPONSORS, SPONSOR_SLOTS, SOCIALS } from '../config'

export default function SponsorsSec() {
  const { t } = useLang()
  const afdian = SOCIALS.find((s) => s.key === 'afdian')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) {
        gsap.from('.sponsors-sec .rv', {
          opacity: 0, y: 26, duration: 0.6, stagger: 0.05, ease: 'power2.out',
          scrollTrigger: { trigger: '.sponsors-sec', start: 'top 70%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [t])

  return (
    <section className="sec sponsors-sec">
      <div className="sec-head rv">
        <h2>{t('sponsors.head')}</h2>
      </div>
      <p className="sponsor-thanks rv">{t('sponsors.thanks')}</p>
      <div className="sponsor-wall">
        {SPONSORS.length
          ? SPONSORS.map((s, i) => (
            <img className="rv" key={i} src={s.logo} alt={s.name} loading="lazy" width={160} height={56} />
          ))
          : Array.from({ length: SPONSOR_SLOTS }, (_, i) => (
            <div className="sponsor-slot rv" key={i}><span>{t('sponsors.wall')}</span></div>
          ))}
      </div>
      <p className="sponsor-note rv">{t('sponsors.note')}</p>
      <a className="btn-green rv" href={afdian.url} target="_blank" rel="noopener noreferrer">
        {t('sponsors.afdian')}
      </a>
    </section>
  )
}
