import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/Lang'

function CountUp({ n, suffix }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = n.toLocaleString('en-US')
      return
    }
    const obj = { v: 0 }
    const tw = gsap.to(obj, {
      v: n, duration: 1.5, ease: 'power1.out',
      onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US') },
    })
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onToggle: (s) => { if (s.isActive) tw.play() },
    })
    return () => {
      st.kill()
      tw.kill()
    }
  }, [n])

  return (
    <span className="stat-num">
      <span ref={ref}>0</span>
      {suffix ? <em>{suffix}</em> : null}
    </span>
  )
}

export default function InfoSec() {
  const { t } = useLang()
  const stats = t('info.stats')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced) {
        gsap.from('.info-sec .rv', {
          opacity: 0, y: 32, duration: 0.7, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '.info-sec', start: 'top 68%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [t])

  return (
    <section className="sec info-sec" id="info-sec">
      <div className="sec-body">
        <h2 className="sec-title rv">{t('info.head')}</h2>
        <p className="sec-subline rv">{t('info.sub')}</p>
        <p className="sec-lead rv">{t('info.lead')}</p>
        <h3 className="subhead rv">{t('info.statHead')}</h3>
        <div className="stat-flow">
          {stats.map((s, i) => (
            <div className="stat" key={i}>
              <CountUp n={s.n} suffix={s.suffix} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <p className="sched-note rv">{t('info.schedNote')}</p>
      </div>
    </section>
  )
}
