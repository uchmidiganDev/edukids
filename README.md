# 🦉 EduKids

6–12 yoshli bolalar uchun jahon darajasidagi interaktiv ta'lim platformasi. To'rtta bo'lim (O'rganish, Viktorina, O'yin, Video) ustiga qurilgan to'liq gamifikatsiya tizimi: tangalar, XP, darajalar, 5 xil nishon, kunlik/haftalik vazifalar, sertifikat va boshqa ko'p narsa.

Asosiy qism butunlay **frontend** — barcha progress brauzerning `localStorage`'ida saqlanadi va **PWA** sifatida telefonga o'rnatilishi mumkin. "Bilag'on AI" yordamchisi esa Google **Gemini API** bilan ishlaydigan kichik serverless funksiya orqali quvvatlanadi (pastga qarang).

## ✨ Asosiy imkoniyatlar

| Bo'lim | Tavsif |
|---|---|
| 📖 **O'rganish** | 10 ta kartochka: dars, misol, mini-viktorina, ovozli o'qish (Speech Synthesis) |
| ✅ **Viktorina** | 15 ta savol, tasodifiy tartib, 3 jon (lives), combo bonus, taymer, ulashish |
| 🎮 **O'yin** | Har bir mavzu uchun 3 tadan mustaqil o'yin (jami 12 ta), taymer, tanga, XP, nishon |
| 🎥 **Video** | Responsive YouTube video, subtitr, qayta ko'rish, "tugatdim" belgisi |
| 👤 **Profil** | Ism, 10 xil avatar, daraja/XP, nishonlar, yutuqlar |
| ⚙️ **Sozlamalar** | Tungi rejim, ovoz, animatsiya, yuqori kontrast, shrift o'lchami, progressni tozalash |
| 📊 **Statistika** | O'rganish/viktorina/umumiy progress halqalari, o'yin va viktorina tarixi grafigi |
| 🏆 **Sertifikat** | Barcha bo'lim tugatilgach avtomatik yaratiladi — PNG, PDF va chop etish |
| ✨ **Bilag'on AI** | Google Gemini bilan ishlaydigan, **faqat joriy mavzu bo'yicha** javob beradigan yordamchi (ovozli savol-javob) |

### Gamifikatsiya

- 🪙 Tangalar, ⭐ XP va darajalar
- 🥉🥈🥇💎👑 Bronza / Kumush / Oltin / Olmos / Usta nishonlari
- 🎁 Kunlik mukofot sandig'i (har kuni bir marta)
- 🎡 Omadli g'ildirak (tangaga aylantirish)
- 📅 Kunlik va haftalik vazifalar (missiyalar)
- 🏅 Yutuqlar tizimi + **yashirin (maxfiy) yutuqlar** (easter egg'lar: maskotni 10 marta silash, logotipni 7 marta bosish, va h.k.)
- 📈 Mahalliy reyting (shu qurilmadagi eng yaxshi natijalar)

## 🎯 Mavzuni almashtirish

Butun sayt matni, darslari, viktorinasi va o'yinlari **bitta o'zgaruvchiga** bog'langan:

```ts
// src/data/topics.ts
export const TOPIC: string = "Internet xavfsizligi";
```

Mumkin bo'lgan qiymatlar va ularga mos o'yinlar:

| TOPIC | O'yinlar |
|---|---|
| `"Yo'l qoidalari"` | Svetofor o'yini · Yo'lni kesib o't · Yo'l belgilarini top |
| `"Yong'in xavfsizligi"` | Xavfli buyumlarni top · Yong'indan qoch (labirint) · Qutqaruvga qo'ng'iroq qil |
| `"Internet xavfsizligi"` | Xavfsiz/Firibgar ajratish · Kuchli parol yasash · Maxfiy ma'lumotni himoya qilish |
| `"Chiqindilarni saralash"` | To'g'ri qutiga tashlash · Tezkor saralash poygasi · Bog'ni tozalash |

`TOPIC` qiymatini o'zgartirib faylni saqlashning o'zi yetarli — barcha matnlar, illyustratsiyalar, 15 ta viktorina savoli va 3 ta o'yin avtomatik yangilanadi.

## 🧱 Texnologiyalar

- React 18 + Vite 5 + **TypeScript** (strict mode)
- Tailwind CSS 3
- Framer Motion (animatsiyalar, drag-and-drop)
- **Lottie** (qo'lda yaratilgan yulduzcha animatsiyasi - yuklanish ekranida)
- React Router 6 (`HashRouter`)
- Lucide Icons
- **Web Speech API** — ovozli o'qish (Speech Synthesis) va ovozdan matn (Speech Recognition)
- **html-to-image** + **jsPDF** — sertifikatni PNG/PDF qilib yuklab olish
- **vite-plugin-pwa** — offline ishlash, ilova sifatida o'rnatish
- **Google Gemini API** — Vercel/Netlify serverless funksiyasi orqali (kalit faqat serverda)

### Muhim texnik izohlar (halollik uchun)

- **"Bilag'on AI"** — Gemini kaliti sozlangan bo'lsa (Vercel/Netlify), haqiqiy AI javob beradi va **faqat joriy `TOPIC` mavzusiga oid savollarga** javob berish uchun maxsus sozlangan (system prompt orqali). Mavzudan tashqari savol berilsa, muloyimlik bilan rad etib, mavzuga qaytaradi. Agar backend mavjud bo'lmasa (masalan **GitHub Pages**'da, chunki u yerda serverless funksiya ishlamaydi) yoki tarmoq xatosi yuz bersa, avtomatik ravishda oddiy kalit-so'z asosidagi yordamchiga o'tadi — foydalanuvchi buzilishni sezmaydi.
- **API kaliti hech qachon brauzerga yuborilmaydi** — u faqat server (serverless funksiya) muhitida `GEMINI_API_KEY` sifatida saqlanadi.
- **Ovozli o'qish** qurilma/brauzeringizda o'zbekcha ovoz mavjudligiga bog'liq (Web Speech API brauzer tomonidan ta'minlanadi). O'zbekcha ovoz topilmasa, eng yaqin mavjud ovoz bilan o'qiladi.
- **Mahalliy reyting** faqat shu brauzer/qurilmadagi natijalarni ko'rsatadi — global (umumiy) reyting mavjud emas.

## ✨ Bilag'on AI'ni sozlash (Gemini)

1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) saytidan bepul Gemini API kalitini oling.
2. **Lokal ishlash uchun**: loyiha ildizida `.env` fayl yarating (`.env.example`dan nusxa oling) va shu ko'rinishda yozing:
   ```
   GEMINI_API_KEY=sizning_kalitingiz
   ```
   `.env` fayli `.gitignore`da — u hech qachon GitHub'ga push qilinmaydi. `npm run dev` buyrug'ining o'zi `/api/ask-ai` so'rovini avtomatik ushlab, Gemini'ga yuboradi (Vercel/Netlify CLI kerak emas).
3. **Production uchun** (Vercel yoki Netlify): loyiha sozlamalaridagi **Environment Variables** bo'limiga `GEMINI_API_KEY` nomi bilan qo'shing va qayta deploy qiling.
4. GitHub Pages'da bu funksiya ishlamaydi (u faqat statik fayllarni joylashtiradi) — bunday holatda AI Yordamchi avtomatik oddiy (kalit-so'z) rejimda ishlaydi.

## 📂 Loyiha tuzilmasi

```
api/
  ask-ai.ts         # Vercel serverless funksiyasi (Gemini bilan gaplashadi)
  _lib/askAi.ts     # Umumiy mantiq (Vercel + Netlify + dev-server uchun bir xil)
netlify/
  functions/ask-ai.ts  # Netlify funksiyasi (xuddi shu _lib/askAi.ts'dan foydalanadi)
vite-plugins/
  aiDevMiddleware.ts   # `npm run dev`da /api/ask-ai'ni lokal ishlatish uchun plugin
src/
  components/   # Qayta ishlatiluvchi UI (Navbar, Mascot, Badge, GameHUD, StatChart, ...)
  context/      # AppContext - profil, tanga, XP, nishon, missiya, sozlamalar
  data/         # topics.ts, achievements.ts, missions.ts, avatars.ts, quotes.ts, guide.ts
  games/        # 12 ta o'yin komponenti + GameRouter
  hooks/        # useSound, useSpeechSynthesis, useSpeechRecognition, useGameEngine, ...
  pages/        # Home, Learning, Quiz, Game, Video, Profile, Settings, Statistics, Certificate, AskAI
  types/        # Markaziy TypeScript tur ta'riflari
  utils/        # scoreUtils, formatDate, aiAssistant (zaxira/oflayn yordamchi), cn
```

## 🚀 O'rnatish va ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda avtomatik ochiladi: `http://localhost:5173`

### Production build

```bash
npm run build     # TypeScript tekshiruvi + Vite build + PWA fayllari
npm run preview    # Yig'ilgan versiyani lokal tekshirish
```

## 🌍 Deploy qilish

Loyiha `HashRouter` va nisbiy (`base: './'`) yo'llardan foydalanadi, shuning uchun quyidagi platformalarning barchasida qo'shimcha sozlovsiz ishlaydi:

### Vercel
```bash
vercel
```
(`vercel.json` mavjud — SPA rewrite qoidasi bilan)

### Netlify
```bash
netlify deploy --prod
```
(`netlify.toml` mavjud — `npm run build` va `dist/` papkasi avtomatik aniqlanadi)

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist
```

Joylashtirgandan so'ng `public/sitemap.xml` va `index.html` ichidagi `https://example.com/` manzillarini haqiqiy domeningizga almashtiring.

## ♿ Qulaylik (Accessibility)

- To'liq klaviatura navigatsiyasi va "asosiy tarkibga o'tish" havolasi
- ARIA yorliqlari barcha interaktiv elementlarda
- Yuqori kontrast va 3 xil shrift o'lchami (Sozlamalar)
- Barcha SVG illyustratsiyalarda `alt`/`role="img"` matnlar

## 📜 Litsenziya

Ta'lim maqsadida yaratilgan loyiha. Barcha illyustratsiyalar original SVG shaklida chizilgan (mualliflik huquqisiz).

---

Made with ❤️ · **AI Asoslari Yakuniy Imtihon**
