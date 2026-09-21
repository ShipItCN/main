import { useLang } from '../i18n/Lang'
import { ICP, SOCIALS, FRIEND_LINKS, EMAIL, WECHAT_NAME } from '../config'
import ShipitLogo from './ShipitLogo'

const SOCIAL_ICON = (paths) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
)

const ICONS = {
  xhs: SOCIAL_ICON(<path d="M2 4h6a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H2zM22 4h-6a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h6z" />),
  feishu: SOCIAL_ICON(<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.6 0-3.1-.4-4.4-1.2L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5z" />),
  afdian: SOCIAL_ICON(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />),
}

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <ShipitLogo />
          <p className="footer-slogan">{t('footer.slogan')}</p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.key}
                className="footer-social"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={t(`footer.socials.${s.key}`)}
                aria-label={t(`footer.socials.${s.key}`)}
              >
                {ICONS[s.key]}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <i>{t('footer.icp')}</i>
          <a href={ICP.url} target="_blank" rel="noopener noreferrer">{ICP.no}</a>
        </div>
        <div className="footer-col">
          <i>{t('footer.contact')}</i>
          <a className="f-row" href={`mailto:${EMAIL}`}>
            <span>{t('footer.emailL')}</span>
            <b>{EMAIL}</b>
          </a>
          <div className="f-row">
            <span>{t('footer.wechatL')}</span>
            <b>{WECHAT_NAME}</b>
          </div>
        </div>
        {FRIEND_LINKS.length > 0 && (
          <div className="footer-col">
            <i>{t('footer.friends')}</i>
            {FRIEND_LINKS.map((f) => (
              <a key={f.url} href={f.url} target="_blank" rel="noopener noreferrer">{f.name}</a>
            ))}
          </div>
        )}
      </div>
      <div className="footer-bottom">{t('footer.copy')}</div>
    </footer>
  )
}
