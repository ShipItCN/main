import { useEffect, useState } from 'react'
import { useLang } from '../i18n/Lang'
import { APPLY_URL } from '../config'
import ShipitLogo from './ShipitLogo'

export default function Topbar() {
  const { t, flip, lang } = useLang()
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={'topbar' + (solid ? ' solid' : '')}>
      <a className="topbar-logo" href="#top">
        <ShipitLogo />
      </a>
      <nav className="topbar-right">
        <button className="topbar-lang" onClick={flip} aria-label="切换语言">
          {t('nav.lang')}
        </button>
        <a className="topbar-apply" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
          {t('nav.apply')}
        </a>
      </nav>
    </header>
  )
}
