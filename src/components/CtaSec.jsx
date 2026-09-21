import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/Lang'
import { APPLY_URL, SPONSOR_INQUIRY } from '../config'

export default function CtaSec() {
  const { t } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) {
        gsap.from('.cta-sec .rv', {
          opacity: 0, y: 34, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-sec', start: 'top 72%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [t])

  return (
    <section className="sec cta-sec">
      <div className="cta-body">
        <h2 className="rv">{t('cta.big1')}<br />{t('cta.big2')} <em>{t('cta.big3')}</em></h2>
        <p className="rv">{t('cta.sub')}</p>
        <div className="cta-actions rv">
          <a className="btn-green big" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
            {t('cta.btn')}
          </a>
          <a className="btn-ghost big" href={SPONSOR_INQUIRY}>
            {t('cta.btn2')}
          </a>
        </div>
      </div>
    </section>
  )
}
