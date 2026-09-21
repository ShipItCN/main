import { createContext, useContext, useEffect, useState } from 'react'
import zh from './zh'
import en from './en'

const LangCtx = createContext(null)

function pick(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

export function Lang({ children }) {
  const [lang, setLang] = useState(() => (localStorage.getItem('shipit-lang') === 'en' ? 'en' : 'zh'))

  useEffect(() => {
    localStorage.setItem('shipit-lang', lang)
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  }, [lang])

  const dict = lang === 'en' ? en : zh
  const t = (key) => pick(dict, key) ?? pick(zh, key)
  const flip = () => setLang((l) => (l === 'zh' ? 'en' : 'zh'))

  return (
    <LangCtx.Provider value={{ lang, t, flip }}>{children}</LangCtx.Provider>
  )
}

export function useLang() {
  return useContext(LangCtx)
}
