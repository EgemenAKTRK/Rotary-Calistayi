import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

async function init() {
  const app = document.getElementById('app')
  if (!app) return

  let settings = {
    title: 'ROTARY SOSYAL BİLİMLER ÇALIŞTAYI',
    description: 'Prestijli ve akademik sosyal bilimler çalıştayı.',
    event_date: '2026-11-21T09:00',
    form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSczf0U_0MOXqG8wdcku6QdV6RM3umOsgArq4BSeKS9vrvF4vQ/viewform?usp=publish-editor'
  }

  let staffList = []

  if (supabase) {
    try {
      const { data: sData } = await supabase.from('site_settings').select('*').single()
      if (sData) settings = { ...settings, ...sData }

      const { data: stData } = await supabase.from('staff').select('*').order('sort_order', { ascending: true })
      if (stData) staffList = stData
    } catch (e) {
      console.warn('Supabase veri çekme hatası:', e)
    }
  }

  app.innerHTML = `
    <header class="header">
      <div class="container nav-container">
        <div class="logo-area">
          <img src="/441.png" alt="Rotary Çalıştayı Logosu" class="site-logo" />
          <span class="logo-text">${settings.title}</span>
        </div>
        <a href="${settings.form_url}" target="_blank" class="btn btn-primary">KAYIT OL</a>
      </div>
    </header>

    <section class="hero-section">
      <div class="container hero-content">
        <div class="banner-wrapper">
          <img src="/440.jpg" alt="Rotary Geliyoruz Banner" class="hero-banner" />
        </div>
        <h1 class="hero-title">${settings.title}</h1>
        <p class="hero-date">21–22 KASIM 2026</p>
        <p class="hero-desc">${settings.description}</p>
        
        <div class="countdown-container" id="countdown">
          <div class="count-box"><span id="days">00</span><label>Gün</label></div>
          <div class="count-box"><span id="hours">00</span><label>Saat</label></div>
          <div class="count-box"><span id="minutes">00</span><label>Dakika</label></div>
          <div class="count-box"><span id="seconds">00</span><label>Saniye</label></div>
        </div>

        <a href="${settings.form_url}" target="_blank" class="btn btn-gold btn-lg">KAYIT FORMUNA GİT</a>
      </div>
    </section>

    <section class="section about-section">
      <div class="container">
        <h2>Çalıştay Hakkında</h2>
        <p>Rotary Sosyal Bilimler Çalıştayı, gençleri ve akademisyenleri sosyal bilimlerin farklı alanlarında bir araya getiren prestijli bir organizasyondur.</p>
      </div>
    </section>

    ${staffList.length > 0 ? `
    <section class="section staff-section">
      <div class="container">
        <h2>Görevliler</h2>
        <div class="staff-grid">
          ${staffList.map(s => `
            <div class="staff-card">
              <img src="${s.photo_url || '/441.png'}" alt="${s.name}" class="staff-img" />
              <h3>${s.name}</h3>
              <p>${s.role}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <footer class="footer">
      <div class="container">
        <p>&copy; 2026 Rotary Sosyal Bilimler Çalıştayı. Tüm Hakları Saklıdır.</p>
      </div>
    </footer>
  `

  startCountdown(settings.event_date)
}

function startCountdown(targetDateStr) {
  const targetDate = new Date(targetDateStr).getTime()

  function update() {
    const now = new Date().getTime()
    const diff = targetDate - now

    if (diff <= 0) {
      const el = document.getElementById('countdown')
      if (el) el.innerHTML = "<h3>Etkinlik Başladı!</h3>"
      return
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((diff % (1000 * 60)) / 1000)

    if (document.getElementById('days')) document.getElementById('days').innerText = String(d).padStart(2, '0')
    if (document.getElementById('hours')) document.getElementById('hours').innerText = String(h).padStart(2, '0')
    if (document.getElementById('minutes')) document.getElementById('minutes').innerText = String(m).padStart(2, '0')
    if (document.getElementById('seconds')) document.getElementById('seconds').innerText = String(s).padStart(2, '0')
  }

  update()
  setInterval(update, 1000)
}

init()

