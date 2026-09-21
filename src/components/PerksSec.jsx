import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/Lang'

export default function PerksSec() {
  const { t } = useLang()
  const lab = t('perks.lab')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) {
        gsap.from('.perks-sec .rv', {
          opacity: 0, y: 30, duration: 0.65, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: '.perks-sec', start: 'top 65%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [t])

  return (
    <section className="sec perks-sec">
      <div className="sec-body">
        <h2 className="sec-title rv">{t('perks.head')}</h2>
        <h3 className="subhead rv">{t('perks.moneyHead')}</h3>
        <p className="list-line rv">{t('perks.moneyL1')}</p>
        <p className="list-line rv">{t('perks.moneyL2')}</p>
        <h3 className="subhead rv">{t('perks.labHead')}<small>{t('perks.labSub')}</small></h3>
        <p className="list-line rv">{lab.join('  ·  ')}</p>
        <h3 className="subhead rv">{t('perks.studioHead')}</h3>
        <p className="list-line rv">{t('perks.studioSub')}</p>
        <h3 className="subhead rv">{t('perks.makerHead')}</h3>
        <p className="list-line rv">{t('perks.makerSub')}</p>
        <p className="maker-note rv">{t('perks.makerNote')}</p>
      </div>
    </section>
  )
}
