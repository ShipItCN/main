import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/Lang'
import { SPONSOR_INQUIRY } from '../config'

export default function StorySec() {
  const { t } = useLang()
  const paras = t('story.paras')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) {
        gsap.to('.story-glow', {
          y: 240, scale: 1.4,
          scrollTrigger: { trigger: '.story-sec', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
        gsap.from('.story-quote .q-line', {
          opacity: 0, y: 40, stagger: 0.18, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-quote', start: 'top 82%', once: true },
        })
        gsap.from('.story-p', {
          opacity: 0, y: 24, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.story-paras', start: 'top 82%', once: true },
        })
        gsap.from('.story-about .rv, .story-track .rv', {
          opacity: 0, y: 28, duration: 0.7, stagger: 0.08,
          scrollTrigger: { trigger: '.story-about', start: 'top 80%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [t])

  return (
    <section className="sec story-sec">
      <div className="story-glow" aria-hidden="true" />
      <div className="sec-body">
        <blockquote className="story-quote">
          <div className="q-line">{t('story.q1')}</div>
          <div className="q-line big">{t('story.q2')}</div>
        </blockquote>
        <div className="story-paras">
          {paras.map((p, i) => <p className="story-p" key={i}>{p}</p>)}
        </div>
        <div className="story-about">
          <h3 className="subhead rv">{t('story.aboutHead')}</h3>
          <p className="rv">{t('story.about1')}</p>
        </div>
        <div className="story-track">
          <h3 className="subhead rv">{t('story.trackHead')}</h3>
          <p className="track-item rv">{t('story.track1')}</p>
          <p className="track-item rv">{t('story.track2')}</p>
          <p className="track-item emph rv">{t('story.track3')}</p>
          <a className="track-note" href={SPONSOR_INQUIRY}>{t('story.trackNote')} →</a>
        </div>
      </div>
    </section>
  )
}
