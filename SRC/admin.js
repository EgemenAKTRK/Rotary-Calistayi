import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

async function initAdmin() {
  const app = document.getElementById('app')
  if (!app) return

  if (!supabase) {
    app.innerHTML = `
      <div class="container" style="padding:40px; text-align:center;">
        <h2>Supabase Bağlantısı Bulunamadı</h2>
        <p>Lütfen Vercel panelinden VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY değişkenlerini ekleyin.</p>
      </div>`
    return
  }

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    renderLogin(app)
  } else {
    renderDashboard(app)
  }
}

function renderLogin(app) {
  app.innerHTML = `
    <div class="container" style="max-width:400px; padding:60px 20px;">
      <h2>Yönetici Girişi</h2>
      <form id="login-form">
        <div style="margin-bottom:15px;">
          <label>E-posta</label>
          <input type="email" id="email" required style="width:100%; padding:10px; margin-top:5px;" />
        </div>
        <div style="margin-bottom:15px;">
          <label>Şifre</label>
          <input type="password" id="password" required style="width:100%; padding:10px; margin-top:5px;" />
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;">Giriş Yap</button>
      </form>
    </div>`

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert('Giriş başarısız: ' + error.message)
    else location.reload()
  })
}

function renderDashboard(app) {
  app.innerHTML = `
    <div class="container" style="padding:40px 20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
        <h2>Yönetim Paneli</h2>
        <button id="logout-btn" class="btn">Çıkış Yap</button>
      </div>
      <p>Hoş geldiniz! Site içeriklerini buradan yönetebilirsiniz.</p>
    </div>`

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut()
    location.reload()
  })
}

initAdmin()
