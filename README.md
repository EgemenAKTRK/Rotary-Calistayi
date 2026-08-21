# Rotary Sosyal Bilimler Çalıştayı — Yönetilebilir Web Sitesi

Bu proje Vite + Supabase ile hazırlanmıştır.

## Özellikler
- Ana site: `/`
- Yönetim paneli: `/admin.html`
- Supabase e-posta/şifre ile yönetici girişi
- Ana sayfa açıklaması, etkinlik tarihi ve kayıt formu URL'si dashboard'dan değiştirilebilir
- Görevli ekleme/silme/sıralama
- 21–22 Kasım 2026 geri sayımı
- Mobil uyumlu tasarım

## Kurulum
1. Supabase'te proje oluştur.
2. Authentication > Users bölümünden yönetici kullanıcı oluştur.
3. SQL Editor'da `supabase.sql` dosyasını çalıştır.
4. `.env.example` dosyasını `.env` olarak kopyala ve Supabase URL + anon key gir.
5. `npm install`
6. `npm run dev`

## Vercel
GitHub'a yükle ve Vercel'e import et. Environment Variables kısmına:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

ekle. Build command: `npm run build`; output: `dist`.

