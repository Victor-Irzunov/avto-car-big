// app/components/ReplainWidget/BitrixWidget.jsx
'use client'
import { useEffect } from 'react'

const SRC = 'https://cdn-ru.bitrix24.by/b34208610/crm/site_button/loader_1_mykez7.js'

export default function BitrixWidget() {
  useEffect(() => {
    // Если уже есть любой Bitrix-скрипт – выходим
    if (document.querySelector(`script[src^="${SRC}"]`)) return
    if (window.__bitrix24_loaded) return

    const s = document.createElement('script')
    s.id = 'bitrix24-script'
    s.src = `${SRC}?${(Date.now()/60000|0)}`
    s.async = true
    s.defer = true
    s.onload = () => { window.__bitrix24_loaded = true }
    document.body.appendChild(s)
  }, [])
  return null
}
