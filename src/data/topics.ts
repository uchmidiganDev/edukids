import type { TopicData } from '../types';

// =====================================================================
// MARKAZIY SOZLAMA: Saytning mavzusini shu yerda o'zgartiring!
// Faqat shu bitta o'zgaruvchini almashtirsangiz, butun sayt matni,
// darslari, viktorinasi va o'yinlari avtomatik yangilanadi.
// =====================================================================
export const TOPIC: string = "Internet xavfsizligi";

// Tanlash mumkin bo'lgan mavzular:
// "Yo'l qoidalari" | "Yong'in xavfsizligi" | "Internet xavfsizligi" | "Chiqindilarni saralash"

const badgeThreshold = { bronze: 40, silver: 70, gold: 100, diamond: 140, master: 180 };

export const topicsData: Record<string, TopicData> = {
  "Yo'l qoidalari": {
    key: 'yol-qoidalari',
    title: "Yo'l qoidalari",
    subtitle: "Yo'lda o'zingni xavfsiz tut!",
    emoji: '🚦',
    heroIllustration: 'road',
    theme: {
      primary: 'bubble',
      gradient: 'from-bubble-300 via-sunny-200 to-leafy-200',
      darkGradient: 'dark:from-bubble-900 dark:via-slate-800 dark:to-leafy-900',
    },
    mascotMessage: "Salom, do'stim! Men Bilag'onman. Keling, birga yo'l qoidalarini o'rganamiz!",
    learning: [
      { id: 1, type: 'lesson', emoji: '🚦', title: "Svetofor nima?", text: "Svetofor — yo'lda tartibni saqlaydigan yorug'lik chirog'i. Uning uchta rangi bor: qizil, sariq va yashil. Har bir rang o'z ma'nosiga ega!", example: "Ko'chada svetoforni ko'rsang, uning rangiga qarab harakat qil.", miniQuiz: { question: "Svetoforda nechta rang bor?", options: ['2', '3', '4', '5'], correctIndex: 1 } },
      { id: 2, type: 'lesson', emoji: '🔴', title: "Qizil rang — TO'XTA!", text: "Svetoforda qizil chiroq yonganda, barcha mashinalar va piyodalar to'xtashi kerak. Bu eng muhim qoida!", example: "Mashinalar qizil chiroqda to'xtaydi, sen ham to'xtashing kerak.", miniQuiz: { question: "Qizil rang nimani anglatadi?", options: ['Yur', "To'xta", 'Sakra', 'Uxla'], correctIndex: 1 } },
      { id: 3, type: 'lesson', emoji: '🟡', title: "Sariq rang — TAYYORLAN!", text: "Sariq chiroq \"tayyorlaning\" degani. Piyodalar hali yo'lga chiqmasin, mashinalar sekinlashsin.", example: "Sariq yonganda, hali yo'lga chiqma, tayyorlan.", miniQuiz: { question: "Sariq rangda nima qilish kerak?", options: ['Yugurish', 'Tayyorlanish', 'Qichqirish', 'Sakrash'], correctIndex: 1 } },
      { id: 4, type: 'lesson', emoji: '🟢', title: "Yashil rang — YUR!", text: "Yashil chiroq yonganda, atrofga qarab, xavfsiz bo'lsa yo'lga chiqish mumkin. Lekin baribir ehtiyot bo'lish kerak!", example: "Yashil yonganda ham avval chapga-o'ngga qarab, keyin yur.", miniQuiz: { question: "Yashil chiroqda nima qilamiz?", options: ["Ko'zni yumamiz", 'Atrofga qarab yuramiz', "Yugurib o'tamiz", 'Kutib turamiz'], correctIndex: 1 } },
      { id: 5, type: 'lesson', emoji: '🦓', title: "Zebra yo'lak nima?", text: "Yo'ldagi oq-qora chiziqlar \"zebra yo'lak\" deyiladi. Piyodalar faqat shu yerdan yo'lni kesib o'tishlari kerak.", example: "Maktabga borayotganda faqat zebra yo'lakdan o't.", miniQuiz: { question: "Zebra yo'lak qanday ko'rinadi?", options: ['Qizil doira', 'Oq-qora chiziqlar', 'Sariq uchburchak', "Ko'k kvadrat"], correctIndex: 1 } },
      { id: 6, type: 'tip', emoji: '🤝', title: "Xavfsizlik maslahati", text: "Yo'lni kesib o'tishdan oldin doim kattalarning qo'lidan ushlang. Yolg'iz yo'l harakatiga chiqmang!", example: "Yo'lga chiqishdan oldin doim opa yoki akangning qo'lidan ushla.", miniQuiz: { question: "Yo'lni kim bilan kesib o'tish kerak?", options: ["Yolg'iz", 'Kattalar bilan', 'Uxlab', 'Yugurib'], correctIndex: 1 } },
      { id: 7, type: 'fact', emoji: '💡', title: "Bilasizmi?", text: "Dunyodagi birinchi svetofor 1868-yilda Londonda ishlatilgan! U gaz bilan yonar edi.", example: "Hozirgi svetoforlar esa elektr bilan ishlaydi.", miniQuiz: { question: "Birinchi svetofor qachon ishlatilgan?", options: ['1868', '1995', '2000', '1750'], correctIndex: 0 } },
      { id: 8, type: 'lesson', emoji: '🌉', title: "Piyodalar ko'prigi", text: "Katta va band yo'llarda maxsus piyodalar ko'prigi yoki yer osti o'tish yo'li bo'ladi. Xavfsizlik uchun doim shulardan foydalaning.", example: "Katta ko'chadan o'tishda ko'prik bo'lsa, pastdan emas, ko'prikdan yur.", miniQuiz: { question: "Katta yo'lda qayerdan o'tish xavfsizroq?", options: ['Mashinalar orasidan', "Piyodalar ko'prigidan", "Yo'l o'rtasidan", 'Yugurib'], correctIndex: 1 } },
      { id: 9, type: 'lesson', emoji: '🚲', title: "Velosiped qoidalari", text: "Velosiped yoki samokatda yurganda kaska taqish va faqat maxsus yo'lakchadan yurish kerak.", example: "Ko'chada emas, hovlida yoki velosiped yo'lagida uchib yur.", miniQuiz: { question: "Velosipedda yurganda nima kerak?", options: ['Soyabon', 'Kaska', 'Sumka', 'Soat'], correctIndex: 1 } },
      { id: 10, type: 'summary', emoji: '📝', title: "Qisqacha xulosa", text: "Qizil — to'xta, sariq — tayyorlan, yashil — yur. Har doim chapga, o'ngga va yana chapga qarang, kattalar bilan yo'lni kesib o'ting!", example: "Qizil-to'xta, sariq-tayyorlan, yashil-yur, deb yodda tut!", miniQuiz: { question: "Yo'l qoidalarining eng muhimi nima?", options: ['Tez yugurish', 'Ehtiyotkorlik', "O'ynash", 'Shovqin qilish'], correctIndex: 1 } },
    ],
    quiz: [
      { id: 1, question: "Svetoforda qizil rang yonganda nima qilish kerak?", options: ["Yugurish kerak", "To'xtash kerak", "Qo'shiq aytish kerak", "Sakrash kerak"], correctIndex: 1, explanation: "Qizil rang xavf haqida ogohlantiradi, shuning uchun to'xtash kerak." },
      { id: 2, question: "Piyodalar yo'lni qayerdan kesib o'tishlari kerak?", options: ["Istalgan joydan", "Zebra yo'lakdan", "Yo'l o'rtasidan sakrab", "Mashinalar orasidan"], correctIndex: 1, explanation: "Zebra yo'lak — piyodalar uchun maxsus xavfsiz joy." },
      { id: 3, question: "Sariq chiroq nimani anglatadi?", options: ["Tez yugurish", "Tayyorlanish", "Uxlash", "O'ynash"], correctIndex: 1, explanation: "Sariq rang — tayyorlanish va diqqat bilan kutish signali." },
      { id: 4, question: "Yo'lni kesib o'tishdan oldin nima qilish kerak?", options: ["Musiqa tinglash", "Chapga, o'ngga va yana chapga qarash", "Ko'zni yumish", "Telefonga qarash"], correctIndex: 1, explanation: "Atrofni ko'zdan kechirish xavfsizlikni ta'minlaydi." },
      { id: 5, question: "Yashil chiroq yonganda nima qilish mumkin?", options: ["Atrofga qarab, xavfsiz bo'lsa o'tish", "Yugurib o'tish", "Ko'zni yumib o'tish", "Sakrab o'tish"], correctIndex: 0, explanation: "Yashil chiroqda ham avval atrofga qarash kerak." },
      { id: 6, question: "Bolalar yo'lda kim bilan yurishlari kerak?", options: ["Yolg'iz", "Kattalar bilan", "Faqat do'stlari bilan", "Hech kim bilan"], correctIndex: 1, explanation: "Kattalar bolalarni xavfsiz yo'l harakatida yordam beradi." },
      { id: 7, question: "Yo'l belgilari nima uchun kerak?", options: ["Chiroyli bo'lishi uchun", "Haydovchi va piyodalarni ogohlantirish uchun", "O'yin uchun", "Hech qanday maqsadsiz"], correctIndex: 1, explanation: "Yo'l belgilari xavf haqida oldindan ogohlantiradi." },
      { id: 8, question: "Mashinada o'tirganda nima taqish kerak?", options: ["Shlyapa", "Xavfsizlik kamari", "Ko'zoynak", "Qo'lqop"], correctIndex: 1, explanation: "Xavfsizlik kamari to'satdan to'xtashda himoya qiladi." },
      { id: 9, question: "Piyodalar svetofor bo'lmagan joyda yo'lni qanday kesib o'tishlari kerak?", options: ["Yugurib", "Diqqat bilan, atrofni ko'zdan kechirib", "Ko'zni yumib", "Telefon bilan gaplashib"], correctIndex: 1, explanation: "Diqqat va ehtiyotkorlik har doim birinchi o'rinda." },
      { id: 10, question: "Velosipedda yurganda nima kiyish tavsiya etiladi?", options: ["Shlyapa", "Kaska (himoya)", "Sandal", "Hech narsa"], correctIndex: 1, explanation: "Kaska boshni jarohatdan asraydi." },
      { id: 11, question: "Piyodalar ko'prigi nima uchun kerak?", options: ["O'ynash uchun", "Yo'lni xavfsiz kesib o'tish uchun", "Rasm chizish uchun", "Uxlash uchun"], correctIndex: 1, explanation: "Ko'prik piyodalarni mashinalardan uzoqroq, xavfsiz o'tkazadi." },
      { id: 12, question: "Yo'lda telefonga qarab yurish nima uchun xavfli?", options: ["Ko'z charchaydi", "Atrofni ko'rmay qolasan", "Telefon buziladi", "Hech qanday xavf yo'q"], correctIndex: 1, explanation: "Telefonga qarab yurganda xavfni ko'rmay qolishing mumkin." },
      { id: 13, question: "Avtobusda ketayotganda nima qilish kerak?", options: ["Turib yurish", "Joyida (yoki ushlab) o'tirish", "Deraza ochish", "Baqirish"], correctIndex: 1, explanation: "Joyingda tinch o'tirish xavfsizlikni ta'minlaydi." },
      { id: 14, question: "Yomg'ir yoki qorda yo'lda yurishda nima muhim?", options: ["Tez yugurish", "Ko'proq ehtiyot bo'lish", "Sakrab yurish", "Ko'zni yumish"], correctIndex: 1, explanation: "Sirpanchiq yo'lda ehtiyotkorlik ayniqsa muhim." },
      { id: 15, question: "Yo'l harakati qoidalariga rioya qilish kimga foyda?", options: ["Faqat haydovchilarga", "Hammaga, jumladan piyodalarga", "Faqat politsiyaga", "Hech kimga"], correctIndex: 1, explanation: "Qoidalar hamma — piyoda, haydovchi va yo'lovchilar uchun xavfsizlikni ta'minlaydi." },
    ],
    games: [
      { id: 'traffic-light', title: "Svetofor o'yini", emoji: '🚦', description: "Svetofor rangini va yo'l holatini ko'rib, to'g'ri harakatni tanla!", instructions: ["Ekranda svetofor rangi va mashina bor-yo'qligini ko'rasan.", "TO'XTA, KUT yoki YUR tugmalaridan to'g'risini bos.", "To'g'ri javob uchun +10, xato uchun -5 ball olasan.", "Vaqt tugagach yakuniy natijangni ko'rasan!"], badgeThreshold },
      { id: 'cross-road', title: "Yo'lni kesib o't", emoji: '🚶', description: "To'g'ri payt kelganda yo'lni xavfsiz kesib o't!", instructions: ["Ekranda mashinalar chapdan-o'ngga harakatlanadi.", "Yo'l bo'sh bo'lganda \"O'T!\" tugmasini bos.", "To'g'ri vaqtda o'tsang +10, mashina yaqin bo'lsa -5 ball.", "Vaqt tugaguncha imkoncha ko'proq marta xavfsiz o't!"], badgeThreshold },
      { id: 'sign-match', title: "Yo'l belgilarini top", emoji: '🪧', description: "Yo'l belgisi va uning ma'nosini juftlashtir!", instructions: ["Kartochkalar teskari turadi.", "Ikkita kartochkani ochib, mos juftni top.", "Mos juft topsang +10 ball.", "Barcha juftlarni eng tez top!"], badgeThreshold },
    ],
    video: { title: "Yo'l harakati qoidalari bo'yicha video qo'llanma", blurb: "Ushbu video orqali yo'lda qanday xavfsiz yurish kerakligini yana bir bor mustahkamlaymiz.", videoId: 'aqz-KE-bpKQ' },
  },

  "Yong'in xavfsizligi": {
    key: 'yongin-xavfsizligi',
    title: "Yong'in xavfsizligi",
    subtitle: "Olov bilan hazil yo'q!",
    emoji: '🔥',
    heroIllustration: 'fire',
    theme: {
      primary: 'sunny',
      gradient: 'from-sunny-400 via-candy-200 to-sunny-100',
      darkGradient: 'dark:from-sunny-900 dark:via-slate-800 dark:to-candy-900',
    },
    mascotMessage: "Salom! Men Bilag'onman. Yong'in xavfsizligi haqida muhim narsalarni birga o'rganamiz!",
    learning: [
      { id: 1, type: 'lesson', emoji: '🔥', title: "Olov nima?", text: "Olov issiqlik va yorug'lik beradi, ovqat pishirish va isinish uchun foydali. Lekin nazoratsiz olov juda xavfli bo'lishi mumkin!", example: "Sham yoqilganda olov chiqadi, lekin unga qo'l tekkizma.", miniQuiz: { question: "Olov nima beradi?", options: ['Faqat hid', 'Issiqlik va yorug\'lik', 'Shovqin', 'Hech narsa'], correctIndex: 1 } },
      { id: 2, type: 'lesson', emoji: '🕯️', title: "Gugurt bilan o'ynamang", text: "Gugurt, otash tosh va sham — kattalar buyumi. Bolalar ular bilan hech qachon o'ynamasligi kerak.", example: "Uyda gugurt ko'rsang, tegmasdan kattalarga ayt.", miniQuiz: { question: "Gugurt bilan kim o'ynashi mumkin?", options: ['Bolalar', 'Hech kim, faqat kattalar ehtiyotkorlik bilan ishlatadi', 'Har kim', 'Kichik bolalar'], correctIndex: 1 } },
      { id: 3, type: 'lesson', emoji: '🔌', title: "Elektr asboblari xavfi", text: "Uzilgan simlar, isitgichlar va prizalar yong'inga sabab bo'lishi mumkin. Ularga faqat kattalar tegishi kerak.", example: "Uzilgan simni ko'rsang, tegmay kattalarga ayt.", miniQuiz: { question: "Uzilgan elektr simiga kim tegishi mumkin?", options: ['Bolalar', 'Faqat mutaxassis kattalar', 'Har kim', 'Mushuklar'], correctIndex: 1 } },
      { id: 4, type: 'lesson', emoji: '🚨', title: "Agar yong'in chiqsa", text: "Yong'in chiqsa, darhol kattalarga xabar bering va uydan tashqariga chiqing. Hech qachon yashirinmang!", example: "Tutun ko'rsang, darhol xonadan chiq va kattalarga ayt.", miniQuiz: { question: "Yong'in chiqsa birinchi nima qilish kerak?", options: ['Yashirinish', 'Tashqariga chiqib, kattalarga aytish', "O'ynashda davom etish", "Derazani yopish"], correctIndex: 1 } },
      { id: 5, type: 'lesson', emoji: '🧯', title: "101 — qutqaruv xizmati", text: "Yong'in chiqsa 101 raqamiga qo'ng'iroq qiling. Ismingiz va manzilingizni aniq ayting.", example: "Agar yolg'iz qolsang va yong'in ko'rsang, 101 ga qo'ng'iroq qil.", miniQuiz: { question: "Yong'in xizmatining raqami nechi?", options: ['101', '102', '103', '100'], correctIndex: 0 } },
      { id: 6, type: 'tip', emoji: '🛑', title: "To'xta, Yot, Aylan!", text: "Agar kiyimingiz alangalansa: TO'XTA, YERGA YOT va AYLAN — bu olovni o'chirishga yordam beradi.", example: "Kiyimga o't tutashsa, yugurma - to'xta, yot, aylan!", miniQuiz: { question: "Kiyimga o't tutashsa nima qilish kerak?", options: ['Yugurish', "To'xtab, yotib, aylanish", 'Suvga sakrash', "Qichqirib yugurish"], correctIndex: 1 } },
      { id: 7, type: 'fact', emoji: '💡', title: "Bilasizmi?", text: "Tutun signalizatori (detektor) uy ichida tutunni sezib, ovoz chiqarib xabar beradi. U har uyda bo'lishi kerak!", example: "Uyda tutun signalizatori bo'lsa, xavfni oldindan bilib olamiz.", miniQuiz: { question: "Tutun signalizatori nima qiladi?", options: ['Musiqa chaladi', 'Tutunni sezib ogohlantiradi', 'Sovutadi', 'Yoritadi'], correctIndex: 1 } },
      { id: 8, type: 'lesson', emoji: '🍳', title: "Oshxona xavfsizligi", text: "Oshxonada gaz plita va qaynayotgan idishlar juda issiq bo'ladi. Bolalar oshxonada kattalarsiz ovqat pishirmasligi kerak.", example: "Onang ovqat pishirayotganda plitaga yaqinlashma.", miniQuiz: { question: "Oshxonada eng xavfli narsa nima?", options: ["O'yinchoq", 'Issiq plita', 'Stol', 'Stul'], correctIndex: 1 } },
      { id: 9, type: 'lesson', emoji: '🏫', title: "Yong'in mashqi", text: "Maktabda yong'in signali chalinsa, tartib bilan, yugurmasdan chiqish yo'lidan tashqariga chiqish kerak.", example: "Yong'in signali chalinsa, o'qituvchi aytgan yo'nalishda tinch chiq.", miniQuiz: { question: "Maktabda yong'in signali chalinsa nima qilish kerak?", options: ['Yugurish', 'Tartib bilan chiqish', 'Yashirinish', 'Davom etish'], correctIndex: 1 } },
      { id: 10, type: 'summary', emoji: '📝', title: "Qisqacha xulosa", text: "Olov bilan o'ynamang, xavfli buyumlarga tegmang, yong'in chiqsa kattalarga ayting va 101 raqamiga qo'ng'iroq qiling.", example: "Olov bilan o'ynama, xavf sezsang kattalarga ayt, 101 ni yodda tut!", miniQuiz: { question: "Yong'in haqida eng muhim qoida nima?", options: ["O'ynash mumkin", 'Ehtiyot bo\'lish va kattalarga aytish', 'Yashirinish', 'Hech narsa qilmaslik'], correctIndex: 1 } },
    ],
    quiz: [
      { id: 1, question: "Yong'in chiqqanda qaysi raqamga qo'ng'iroq qilish kerak?", options: ["100", "101", "102", "103"], correctIndex: 1, explanation: "101 — yong'in xavfsizligi xizmatining raqami." },
      { id: 2, question: "Bolalar nima bilan o'ynamasligi kerak?", options: ["To'p bilan", "Gugurt bilan", "Qo'g'irchoq bilan", "Velosiped bilan"], correctIndex: 1, explanation: "Gugurt olov chiqaradi va juda xavfli." },
      { id: 3, question: "Agar kiyimingizga o't tutashsa, nima qilish kerak?", options: ["Yugurish", "To'xtab, yerga yotib, aylanish", "Sakrash", "Suvga sakrash"], correctIndex: 1, explanation: "\"To'xta, Yot, Aylan\" olovni o'chirishga yordam beradi." },
      { id: 4, question: "Yong'in chiqqanda birinchi nima qilish kerak?", options: ["Yashirinish", "Kattalarga xabar berish va tashqariga chiqish", "O'yinni davom ettirish", "Derazani yopish"], correctIndex: 1, explanation: "Xavfsizlik uchun tezda tashqariga chiqish kerak." },
      { id: 5, question: "Tutun signalizatori nima ish qiladi?", options: ["Musiqa chaladi", "Tutunni sezib ovoz beradi", "Yorug'lik beradi", "Sovutadi"], correctIndex: 1, explanation: "U tutunni sezganda signal berib, xavf haqida ogohlantiradi." },
      { id: 6, question: "Elektr prizalariga kim tegishi mumkin?", options: ["Har kim", "Faqat kattalar", "Faqat bolalar", "Hech kim"], correctIndex: 1, explanation: "Elektr toki xavfli, shuning uchun faqat kattalar ehtiyotkorlik bilan foydalanadi." },
      { id: 7, question: "Yong'in vaqtida nima qilmaslik kerak?", options: ["Tashqariga chiqish", "Yashirinish (masalan, karavot ostiga)", "Kattalarga aytish", "101 ga qo'ng'iroq qilish"], correctIndex: 1, explanation: "Yashirinish qutqaruvchilarga topishni qiyinlashtiradi va xavflidir." },
      { id: 8, question: "Olovdan foydalanishning foydali tomoni nima?", options: ["Faqat o'yin uchun", "Isinish va ovqat pishirish uchun", "Qog'oz yoqish uchun", "Foydasi yo'q"], correctIndex: 1, explanation: "Nazorat ostidagi olov uy xo'jaligida foydali." },
      { id: 9, question: "Kim gugurt yoki otash tosh ishlatishi mumkin?", options: ["Kichik bolalar", "Faqat kattalar ehtiyotkorlik bilan", "Har kim", "Hech kim hech qachon"], correctIndex: 1, explanation: "Bu buyumlar faqat ehtiyotkor kattalar tomonidan ishlatilishi kerak." },
      { id: 10, question: "101 raqamiga qo'ng'iroq qilganda nima aytish kerak?", options: ["Hech narsa", "Ismingiz va aniq manzilingizni", "Sevimli o'yinchoq nomini", "Qo'shiq aytish"], correctIndex: 1, explanation: "Aniq ma'lumot qutqaruvchilarga tezroq yetib borishga yordam beradi." },
      { id: 11, question: "Oshxonada bolalar nima qilmasligi kerak?", options: ["Ovqat yeyish", "Gaz plitasida mustaqil pishirish", "Suv ichish", "O'tirish"], correctIndex: 1, explanation: "Gaz plitasi juda issiq va xavfli, faqat kattalar foydalanishi kerak." },
      { id: 12, question: "Yong'in signalizatori uyda qayerga o'rnatiladi?", options: ["Yerga", "Shift yoki devorga", "Derazaga", "Eshikka"], correctIndex: 1, explanation: "Tutun yuqoriga ko'tarilgani uchun signalizator shiftga o'rnatiladi." },
      { id: 13, question: "Yong'in chiqqanda liftdan foydalanish mumkinmi?", options: ["Ha, tezroq", "Yo'q, zinapoyadan tushish kerak", "Farqi yo'q", "Faqat kattalar uchun mumkin"], correctIndex: 1, explanation: "Yong'inda lift to'xtab qolishi mumkin, shuning uchun zinapoyadan tushish xavfsizroq." },
      { id: 14, question: "Sham yoqilgan xonada nima qilish kerak emas?", options: ["O'qish", "Yolg'iz qoldirib chiqib ketish", "O'tirish", "Suhbatlashish"], correctIndex: 1, explanation: "Yonayotgan shamni hech qachon nazoratsiz qoldirmaslik kerak." },
      { id: 15, question: "Yong'in o'chirgich (ognetushitel) nima uchun kerak?", options: ["O'yin uchun", "Kichik yong'inni o'chirish uchun", "Bo'yash uchun", "Suv ichish uchun"], correctIndex: 1, explanation: "Ognetushitel boshlang'ich kichik yong'inni tezda o'chirishga yordam beradi." },
    ],
    games: [
      { id: 'find-danger', title: "Xavfli buyumlarni top!", emoji: '🔥', description: "Rasmlar orasidan yong'in uchun xavfli buyumlarni belgilangan vaqtda toping!", instructions: ["Ekranda turli buyumlar rasmlari paydo bo'ladi.", "Faqat yong'in uchun XAVFLI buyumlarni bosing.", "To'g'ri tanlov uchun +10, xato uchun -5 ball.", "Vaqt tugaguncha imkoncha ko'proq to'g'ri javob toping!"], badgeThreshold },
      { id: 'escape-maze', title: "Yong'indan qoch!", emoji: '🧯', description: "Labirint ichida olovdan saqlanib, chiqish eshigini top!", instructions: ["O'q tugmalar yoki barmoq bilan katakma-katak yur.", "Olov turgan katakchalarga kirma.", "Chiqish eshigiga yetib olsang +50 ball va g'alaba!", "Vaqtdan oldin yetib borishga harakat qil!"], badgeThreshold },
      { id: 'emergency-call', title: "Qutqaruvga qo'ng'iroq qil", emoji: '📞', description: "To'g'ri favqulodda raqamni tez bosib chaqir!", instructions: ["Ekranda vaziyat tasviri chiqadi.", "Telefon raqamlaridan to'g'risini (101) tanlab bos.", "To'g'ri tanlov uchun +10 ball.", "Vaqtda ko'proq to'g'ri chaqiruv qiling!"], badgeThreshold },
    ],
    video: { title: "Yong'in xavfsizligi bo'yicha video qo'llanma", blurb: "Ushbu video orqali yong'in chiqqanda qanday harakat qilish kerakligini yana bir bor mustahkamlaymiz.", videoId: 'aqz-KE-bpKQ' },
  },

  "Internet xavfsizligi": {
    key: 'internet-xavfsizligi',
    title: "Internet xavfsizligi",
    subtitle: "Internetda xavfsiz bo'l!",
    emoji: '🛡️',
    heroIllustration: 'shield',
    theme: {
      primary: 'grape',
      gradient: 'from-grape-400 via-bubble-300 to-grape-200',
      darkGradient: 'dark:from-grape-900 dark:via-slate-800 dark:to-bubble-900',
    },
    mascotMessage: "Salom, do'stim! Men Bilag'onman. Internetda xavfsiz yurish sirlarini birga o'rganamiz!",
    learning: [
      { id: 1, type: 'lesson', emoji: '🔒', title: "Parol nima uchun kerak?", text: "Parol — sizning shaxsiy ma'lumotlaringizni himoya qiluvchi maxfiy so'z. Uni hech kimga, hatto do'stlaringizga ham aytmang!", example: "Parolingni hech kimga, hatto eng yaqin do'stingga ham aytma.", miniQuiz: { question: "Parolni kimga aytish mumkin?", options: ['Hammaga', 'Hech kimga (kerak bo\'lsa faqat ota-onaga)', 'Do\'stlarga', 'Internetdagilarga'], correctIndex: 1 } },
      { id: 2, type: 'lesson', emoji: '🙊', title: "Shaxsiy ma'lumotni oshkor qilmang", text: "Ismingiz, manzilingiz, telefon raqamingiz va maktabingiz haqida notanish odamlarga internetda yozmang.", example: "Kimdir manzilingizni so'rasa, \"ota-onamdan so'rang\" deb javob ber.", miniQuiz: { question: "Internetda kimga uy manzilingizni aytish mumkin?", options: ["Hech kimga notanish bo'lsa", 'Hammaga', "O'yinchilarga", "Kanal egasiga"], correctIndex: 0 } },
      { id: 3, type: 'lesson', emoji: '👤', title: "Notanish odamlar bilan ehtiyot bo'ling", text: "Internetdagi har bir kishi aytganidek bo'lavermaydi. Notanish odam bilan uchrashishga hech qachon rozi bo'lmang.", example: "Notanish odam sovg'a va'da qilsa ham, hech qachon ishonma.", miniQuiz: { question: "Notanish odam uchrashuvga chaqirsa nima qilish kerak?", options: ['Borish', 'Rad etib, kattalarga aytish', 'Sir saqlash', "Do'stlik qilish"], correctIndex: 1 } },
      { id: 4, type: 'lesson', emoji: '⚠️', title: "Firibgar xabarlarni tanish", text: "\"Siz yutdingiz!\" yoki \"Parolingizni yuboring\" kabi xabarlar ko'pincha firibgarlik bo'ladi. Ularga ishonmang!", example: "\"Siz yutdingiz!\" degan xabarlarga hech qachon ishonma.", miniQuiz: { question: "Qaysi xabar firibgarlik bo'lishi mumkin?", options: ['"Uyga kel"', '"Sovg\'a yutdingiz, ma\'lumot yuboring"', '"Uy vazifasi bormi?"', '"Salom, qalaysan?"'], correctIndex: 1 } },
      { id: 5, type: 'lesson', emoji: '👨‍👩‍👧', title: "Kattalardan so'rang", text: "Noma'lum link yoki xabar kelsa, avval ota-onangiz yoki boshqa kattalardan so'rang.", example: "Har qanday shubhali narsa ko'rsang, ota-onangdan so'ra.", miniQuiz: { question: "Notanish link kelsa avval nima qilish kerak?", options: ['Bosish', 'Kattalardan so\'rash', 'Do\'stlarga yuborish', "O'chirib qo'yish"], correctIndex: 1 } },
      { id: 6, type: 'lesson', emoji: '💬', title: "Onlayn xushmuomalalik", text: "Internetda ham boshqalarga yomon so'z yozmang. Bu \"kiberbulling\" deyiladi va juda yomon narsa.", example: "Do'stingga internetda ham mehribon so'zlar yoz.", miniQuiz: { question: "Kiberbulling nima?", options: ['Yaxshi so\'z aytish', "Internetda birovni xafa qilish", "O'yin o'ynash", 'Rasm chizish'], correctIndex: 1 } },
      { id: 7, type: 'tip', emoji: '📵', title: "Ekran vaqtini nazorat qiling", text: "Ko'p vaqt ekranga qarash ko'zlarga zararli. Har kuni belgilangan vaqtda dam oling va tashqarida o'ynang.", example: "Har kuni 1 soat o'ynagach, tashqarida sayr qil.", miniQuiz: { question: "Ekran vaqtidan keyin nima qilish yaxshi?", options: ["Yana o'ynash", 'Tashqarida dam olish', 'Uxlamaslik', 'Hech narsa'], correctIndex: 1 } },
      { id: 8, type: 'fact', emoji: '💡', title: "Bilasizmi?", text: "Kuchli parolda katta-kichik harflar, raqamlar va belgilar bo'lishi kerak. \"12345\" kabi parollar juda zaif!", example: "\"Salom123\" emas, \"S@l0m!2025\" kabi parol yozing.", miniQuiz: { question: "Kuchli parolda nima bo'lishi kerak?", options: ['Faqat raqamlar', 'Harflar, raqamlar va belgilar', 'Faqat ism', "Bo'sh joy"], correctIndex: 1 } },
      { id: 9, type: 'lesson', emoji: '📸', title: "Internetga tushgan narsa qoladi", text: "Internetga yuklagan rasm yoki video hech qachon to'liq o'chib ketmaydi. Shuning uchun ulashishdan oldin o'ylab ko'r.", example: "Har qanday rasmni yuklashdan oldin ota-onangdan so'ra.", miniQuiz: { question: "Internetga yuklangan rasm haqida to'g'ri fikr qaysi?", options: ['Darhol yo\'qoladi', 'Doim qolib ketishi mumkin', 'Hech kim ko\'rmaydi', 'Ahamiyati yo\'q'], correctIndex: 1 } },
      { id: 10, type: 'summary', emoji: '📝', title: "Qisqacha xulosa", text: "Parolingizni hech kimga aytmang, shaxsiy ma'lumotni oshkor qilmang, firibgar xabarlarga ishonmang va shubha tug'ilsa kattalardan so'rang!", example: "Parolni yashir, ma'lumotni oshkor qilma, shubha bo'lsa kattalardan so'ra!", miniQuiz: { question: "Internetda eng muhim qoida nima?", options: ["Hamma bilan do'stlashish", 'Ehtiyotkor va ogoh bo\'lish', "Ko'p o'ynash", 'Reklama bosish'], correctIndex: 1 } },
    ],
    quiz: [
      { id: 1, question: "Parolingizni kimga aytish mumkin?", options: ["Hammaga", "Hech kimga, kerak bo'lsa faqat ota-onangizga", "Internetdagi notanish odamga", "Do'stlaringizning hammasiga"], correctIndex: 1, explanation: "Parol maxfiy bo'lishi va faqat eng ishonchli kattalarga ma'lum bo'lishi kerak." },
      { id: 2, question: "\"Siz sovg'a yutdingiz, ma'lumotlaringizni yuboring\" degan xabarni ko'rsangiz nima qilasiz?", options: ["Darhol ma'lumot yuboraman", "Ishonmayman va kattalarga aytaman", "Do'stlarimga ulashaman", "Xursand bo'lib bosaman"], correctIndex: 1, explanation: "Bunday xabarlar odatda firibgarlik bo'ladi." },
      { id: 3, question: "Internetda notanish odam uchrashuvga chaqirsa nima qilish kerak?", options: ["Darhol boraman", "Rozi bo'lmayman va kattalarga aytaman", "Manzilimni yuboraman", "Yolg'iz boraman"], correctIndex: 1, explanation: "Notanish odamlar bilan hech qachon yolg'iz uchrashmaslik kerak." },
      { id: 4, question: "Kuchli parolga misol qaysi?", options: ["12345", "parol", "Ali2010", "M9$kLp2!qX"], correctIndex: 3, explanation: "Kuchli parolda harflar, raqamlar va maxsus belgilar aralash bo'ladi." },
      { id: 5, question: "Kiberbulling nima?", options: ["Internetda o'yin o'ynash", "Internetda birovni xafa qilish, haqorat qilish", "Video ko'rish", "Rasm chizish"], correctIndex: 1, explanation: "Kiberbulling — internet orqali birovga ruhiy zarar yetkazish." },
      { id: 6, question: "Notanish link kelsa nima qilish kerak?", options: ["Darhol bosaman", "Bosishdan oldin kattalardan so'rayman", "Do'stlarimga yuboraman", "Har doim bosaman"], correctIndex: 1, explanation: "Noma'lum linklar xavfli dasturlarga olib borishi mumkin." },
      { id: 7, question: "Internetda o'z manzilingizni notanishlarga yozish nega xavfli?", options: ["Xat kelishi mumkin", "Sizni topib, zarar yetkazishlari mumkin", "Hech qanday xavf yo'q", "Foydali bo'ladi"], correctIndex: 1, explanation: "Shaxsiy ma'lumotlar yomon niyatli odamlar qo'liga tushishi mumkin." },
      { id: 8, question: "Ekran vaqti haqida to'g'ri fikr qaysi?", options: ["Cheksiz ekran qarash zararli emas", "Belgilangan vaqtda dam olish kerak", "Kechasi bilan telefon o'ynash yaxshi", "Ekran vaqti muhim emas"], correctIndex: 1, explanation: "Ko'zlar va uyqu uchun ekran vaqtini cheklash muhim." },
      { id: 9, question: "Agar internetda kimdir sizni xafa qilsa (kiberbulling), nima qilish kerak?", options: ["Javob berib janjallashaman", "Kattalarga aytaman", "Sir saqlayman", "Hech narsa qilmayman"], correctIndex: 1, explanation: "Kattalarga aytish eng to'g'ri va xavfsiz yechim." },
      { id: 10, question: "Shaxsiy ma'lumotlarga nimalar kiradi?", options: ["Sevimli rang", "Ism, manzil, telefon raqam", "Sevimli multfilm", "Sevimli o'yinchoq"], correctIndex: 1, explanation: "Bular sizni aniqlash uchun ishlatilishi mumkin bo'lgan maxfiy ma'lumotlar." },
      { id: 11, question: "Ijtimoiy tarmoqda profilni kim ko'rishi kerak?", options: ["Faqat ishonchli odamlar", "Hamma internet foydalanuvchilari", "Notanishlar ham", "Farqi yo'q"], correctIndex: 0, explanation: "Profilni faqat tanish va ishonchli odamlarga ochiq qilish xavfsizroq." },
      { id: 12, question: "Onlayn o'yinda notanish odam do'st bo'lishni so'rasa nima qilish kerak?", options: ["Darhol qo'shish", "Ehtiyot bo'lish, kattalardan maslahat so'rash", "Manzilni berish", "Uchrashuvga rozi bo'lish"], correctIndex: 1, explanation: "Notanish odamlar bilan onlaynda ham ehtiyot bo'lish kerak." },
      { id: 13, question: "Wi-Fi parolini kim bilan bo'lishish mumkin?", options: ["Har kim bilan", "Faqat oila a'zolari bilan", "Notanishlar bilan", "Internetdagilar bilan"], correctIndex: 1, explanation: "Wi-Fi paroli ham maxfiy ma'lumot hisoblanadi." },
      { id: 14, question: "Agar sayt shubhali ko'rinsa (masalan juda ko'p reklama chiqsa) nima qilish kerak?", options: ["Davom etish", "Yopib, kattalarga aytish", "Ma'lumot kiritish", "Do'stlarga ulashish"], correctIndex: 1, explanation: "Shubhali saytlarni darhol yopib, kattalarga xabar berish kerak." },
      { id: 15, question: "Kiberbulling yuz bersa kimga murojaat qilish kerak?", options: ["Hech kimga", "Ishonchli katta odamga", "Notanish odamga", "Hamma internet foydalanuvchilariga"], correctIndex: 1, explanation: "Ishonchli katta odam yordam berib, muammoni hal qilishga ko'maklashadi." },
    ],
    games: [
      { id: 'scam-finder', title: "Xabarlarni ajrating: Xavfsiz yoki Firibgar?", emoji: '🛡️', description: "Kelayotgan xabarlarni sudrab, to'g'ri qutiga tashlang!", instructions: ["Ekranda xabar kartochkasi paydo bo'ladi.", "Kartochkani sudrab \"✅ Xavfsiz\" yoki \"🚫 Firibgar\" qutisiga tashlang.", "To'g'ri javob uchun +10, xato uchun -5 ball.", "Barcha xabarlarni tugatib, yakuniy ballingizni ko'ring!"], badgeThreshold },
      { id: 'password-builder', title: "Kuchli parol yasa!", emoji: '🔐', description: "Harf, raqam va belgilarni tanlab, eng kuchli parolni yasa!", instructions: ["Pastdagi bo'laklardan (harf, raqam, belgi) birma-bir tanla.", "Parol qanchalik xilma-xil bo'lsa, kuch darajasi oshadi.", "Har bir yaxshi tanlov uchun ball olasan.", "Eng kuchli parolni yasab, yakuniy ballingni ko'r!"], badgeThreshold },
      { id: 'protect-info', title: "Maxfiy ma'lumotni himoya qil", emoji: '🙈', description: "Har bir ma'lumotni \"Maxfiy\" yoki \"Bo'lishish mumkin\" deb belgila!", instructions: ["Ekranda shaxsiy ma'lumot kartochkasi chiqadi.", "\"Maxfiy\" yoki \"Bo'lishish mumkin\" tugmasini bos.", "To'g'ri javob uchun +10, xato uchun -5 ball.", "Barcha kartochkalarni belgilab, natijangni ko'r!"], badgeThreshold },
    ],
    video: { title: "Internet xavfsizligi bo'yicha video qo'llanma", blurb: "Ushbu video orqali internetda xavfsiz yurish qoidalarini yana bir bor mustahkamlaymiz.", videoId: 'aqz-KE-bpKQ' },
  },

  "Chiqindilarni saralash": {
    key: 'chiqindi-saralash',
    title: "Chiqindilarni saralash",
    subtitle: "Tabiatni birga asraymiz!",
    emoji: '♻️',
    heroIllustration: 'recycle',
    theme: {
      primary: 'leafy',
      gradient: 'from-leafy-400 via-sunny-200 to-leafy-200',
      darkGradient: 'dark:from-leafy-900 dark:via-slate-800 dark:to-sunny-900',
    },
    mascotMessage: "Salom! Men Bilag'onman. Keling, chiqindilarni to'g'ri saralashni birga o'rganamiz!",
    learning: [
      { id: 1, type: 'lesson', emoji: '🗑️', title: "Chiqindi nima?", text: "Chiqindi — biz foydalanib bo'lgan va endi kerak bo'lmagan narsalar. Ularni to'g'ri joyga tashlash muhim!", example: "Ishlatilgan qog'ozni axlat qutisiga tashla, yerga tashlama.", miniQuiz: { question: "Chiqindi nima?", options: ["Yangi o'yinchoq", "Kerak bo'lmagan narsa", 'Sovg\'a', 'Kitob'], correctIndex: 1 } },
      { id: 2, type: 'lesson', emoji: '♻️', title: "Nega saralash kerak?", text: "Chiqindilarni saralash tabiatni asrab qoladi va ularni qayta ishlatish imkonini beradi.", example: "Saralangan chiqindi qayta ishlanib, yangi buyumga aylanadi.", miniQuiz: { question: "Saralash nima uchun kerak?", options: ["Vaqt o'tkazish uchun", 'Tabiatni asrash uchun', "O'yin uchun", 'Kerak emas'], correctIndex: 1 } },
      { id: 3, type: 'lesson', emoji: '📄', title: "Qog'oz chiqindilari", text: "Gazeta, kitob va qog'oz qutilar — qog'oz uchun mo'ljallangan ko'k konteynerga tashlanadi.", example: "Eski daftar va gazetalarni ko'k konteynerga tashla.", miniQuiz: { question: "Gazeta qaysi konteynerga tashlanadi?", options: ['Sariq', "Ko'k (qog'oz)", 'Yashil', 'Qora'], correctIndex: 1 } },
      { id: 4, type: 'lesson', emoji: '🥤', title: "Plastik chiqindilari", text: "Plastik butilka va paketlar plastik uchun mo'ljallangan sariq konteynerga tashlanadi.", example: "Bo'sh suv butilkasini sariq konteynerga tashla.", miniQuiz: { question: "Plastik butilka qaysi rangga tashlanadi?", options: ["Ko'k", 'Sariq', 'Yashil', 'Jigarrang'], correctIndex: 1 } },
      { id: 5, type: 'lesson', emoji: '🍾', title: "Shisha chiqindilari", text: "Shisha idish va butilkalar shisha uchun mo'ljallangan yashil konteynerga tashlanadi.", example: "Sinib qolgan shisha idishni ehtiyotkorlik bilan yashil konteynerga tashla (kattalar yordamida).", miniQuiz: { question: "Shisha butilka qaysi konteynerga tashlanadi?", options: ['Sariq', 'Yashil', "Ko'k", 'Jigarrang'], correctIndex: 1 } },
      { id: 6, type: 'lesson', emoji: '🍌', title: "Organik chiqindilar", text: "Meva po'stlog'i va ovqat qoldiqlari organik chiqindi hisoblanadi va jigarrang konteynerga tashlanadi.", example: "Meva po'chog'ini jigarrang konteynerga yoki kompostga tashla.", miniQuiz: { question: "Olma po'chog'i qanday chiqindi?", options: ['Plastik', 'Organik', 'Shisha', "Qog'oz"], correctIndex: 1 } },
      { id: 7, type: 'tip', emoji: '🌍', title: "Kamaytir, Qayta ishlat, Qayta foydalan", text: "Iloji boricha kamroq chiqindi hosil qiling, buyumlarni qayta ishlating va qayta foydalaning.", example: "Eski kiyimni tashlash o'rniga ukangga ber - bu qayta foydalanish!", miniQuiz: { question: "3R nimalarni anglatadi?", options: ["O'qi-Yoz-Chiz", 'Kamaytir-Qayta ishlat-Qayta foydalan', 'Ranglar', 'Hech narsa'], correctIndex: 1 } },
      { id: 8, type: 'fact', emoji: '💡', title: "Bilasizmi?", text: "Bitta shisha butilka qayta ishlanmasa, tabiatda parchalanishi uchun 1 milliondan ortiq yil kerak bo'lishi mumkin!", example: "Shuning uchun shishani albatta qayta ishlashga topshiramiz.", miniQuiz: { question: "Shisha butilka tabiatda necha yilda parchalanadi?", options: ['1 kun', '1 hafta', '1 milliondan ortiq yil', '1 oy'], correctIndex: 2 } },
      { id: 9, type: 'lesson', emoji: '🌳', title: "Daraxt ekish", text: "Daraxt ekish havoni tozalaydi va hayvonlarga uy beradi. Chiqindilarni to'g'ri saralash ham daraxtlarni asraydi (chunki qog'oz daraxtdan tayyorlanadi).", example: "Bahorda oilang bilan bitta ko'chat ek.", miniQuiz: { question: "Qog'oz nimadan tayyorlanadi?", options: ['Plastikdan', 'Daraxtdan', 'Metalldan', 'Shishadan'], correctIndex: 1 } },
      { id: 10, type: 'summary', emoji: '📝', title: "Qisqacha xulosa", text: "Chiqindilarni to'g'ri konteynerlarga: qog'oz, plastik, shisha va organikka ajratib tashlang — bu Yer sayyoramizni asraydi!", example: "Har bir chiqindi o'z qutisiga - qog'oz, plastik, shisha, organik!", miniQuiz: { question: "Chiqindini qayerga tashlash kerak?", options: ['Yerga', "To'g'ri konteynerga", 'Daryoga', "Ko'chaga"], correctIndex: 1 } },
    ],
    quiz: [
      { id: 1, question: "Chiqindilarni saralash nima uchun kerak?", options: ["Vaqtni behuda o'tkazish uchun", "Tabiatni asrab qolish uchun", "O'yin uchun", "Hech qanday sabab yo'q"], correctIndex: 1, explanation: "Saralash qayta ishlashni osonlashtiradi va tabiatni asraydi." },
      { id: 2, question: "Gazeta va kitoblar qaysi chiqindi turiga kiradi?", options: ["Plastik", "Qog'oz", "Shisha", "Organik"], correctIndex: 1, explanation: "Gazeta va kitoblar qog'ozdan tayyorlangan." },
      { id: 3, question: "Plastik butilka qaysi konteynerga tashlanadi?", options: ["Ko'k (qog'oz)", "Sariq (plastik)", "Yashil (shisha)", "Jigarrang (organik)"], correctIndex: 1, explanation: "Sariq konteyner plastik uchun mo'ljallangan." },
      { id: 4, question: "Meva po'stlog'i qanday chiqindi hisoblanadi?", options: ["Plastik", "Shisha", "Organik", "Qog'oz"], correctIndex: 2, explanation: "Meva po'stlog'i tabiiy, organik chiqindi hisoblanadi." },
      { id: 5, question: "Shisha butilkalar qaysi rangdagi konteynerga tashlanadi?", options: ["Qizil", "Yashil", "Oq", "Qora"], correctIndex: 1, explanation: "Yashil konteyner shisha uchun ishlatiladi." },
      { id: 6, question: "\"3R\" tamoyili nimani anglatadi?", options: ["O'qi, Yoz, Chiz", "Kamaytir, Qayta ishlat, Qayta foydalan", "Rang, Rasm, Rost", "Hech narsani"], correctIndex: 1, explanation: "3R — Reduce, Reuse, Recycle: kamaytirish, qayta foydalanish, qayta ishlash." },
      { id: 7, question: "Chiqindilarni saralamasdan hammasini bir joyga tashlasak nima bo'ladi?", options: ["Tabiat yaxshilanadi", "Tabiat ifloslanadi va qayta ishlash qiyinlashadi", "Hech narsa o'zgarmaydi", "Foydali bo'ladi"], correctIndex: 1, explanation: "Aralash chiqindilarni qayta ishlash ancha qiyin va qimmat bo'ladi." },
      { id: 8, question: "Qaysi buyumni qayta ishlatish mumkin?", options: ["Yeb bo'lingan olma po'stlog'i", "Shisha butilka", "Ishlatilgan salfetka", "Chirigan meva"], correctIndex: 1, explanation: "Shisha butilkalarni yuvib, qayta-qayta ishlatish mumkin." },
      { id: 9, question: "Organik chiqindilardan nima tayyorlash mumkin?", options: ["O'g'it (kompost)", "Yangi kitob", "Yangi shisha", "Yangi plastik"], correctIndex: 0, explanation: "Organik chiqindilar chirib, tuproq uchun foydali o'g'itga aylanadi." },
      { id: 10, question: "Chiqindilarni to'g'ri saralash kimning vazifasi?", options: ["Faqat kattalarning", "Hammamizning, bolalar ham yordam bera oladi", "Faqat davlatning", "Hech kimning"], correctIndex: 1, explanation: "Har bir inson, jumladan bolalar ham tabiatni asrashga hissa qo'sha oladi." },
      { id: 11, question: "Batareyka (batareya) qanday chiqindi hisoblanadi?", options: ["Oddiy chiqindi", "Maxsus (zaharli) chiqindi", "Organik", "Qog'oz"], correctIndex: 1, explanation: "Batareyka tarkibida zararli moddalar bor, alohida topshirilishi kerak." },
      { id: 12, question: "Eski kiyimlarni qayta ishlatish mumkinmi?", options: ["Yo'q", "Ha, ukaga yoki muhtojlarga berish mumkin", "Faqat yoqish kerak", "Faqat tashlash kerak"], correctIndex: 1, explanation: "Kiyimlarni berish orqali ularni qayta foydalanish mumkin." },
      { id: 13, question: "Daraxt kesilishining oldini olish uchun nima qilish kerak?", options: ["Qog'ozni behuda ishlatmaslik", "Ko'proq qog'oz sarflash", "Kitob o'qimaslik", "Hech narsa"], correctIndex: 0, explanation: "Qog'ozni tejash daraxtlarni asrashga yordam beradi." },
      { id: 14, question: "Plastik paketlar o'rniga nima ishlatish mumkin?", options: ["Yana plastik paket", "Qayta ishlatiladigan sumka", "Qog'oz yirtish", "Hech narsa"], correctIndex: 1, explanation: "Qayta ishlatiladigan sumka plastik chiqindini kamaytiradi." },
      { id: 15, question: "Chiqindilarni saralash kimning ishi?", options: ["Faqat kattalarning", "Hamma oila a'zolarining, jumladan bolalarning", "Faqat davlatning", "Hech kimning"], correctIndex: 1, explanation: "Butun oila birgalikda chiqindilarni saralashi mumkin." },
    ],
    games: [
      { id: 'sort-waste', title: "Chiqindilarni to'g'ri qutiga tashla!", emoji: '♻️', description: "Har bir chiqindini sudrab, mos qutiga tashla: qog'oz, plastik, shisha yoki organik!", instructions: ["Ekranda chiqindi buyumi paydo bo'ladi.", "Uni sudrab to'g'ri qutiga (qog'oz, plastik, shisha, organik) tashlang.", "To'g'ri javob uchun +10, xato uchun -5 ball.", "Barcha buyumlarni saralab, yakuniy ballingizni ko'ring!"], badgeThreshold },
      { id: 'sorting-race', title: "Tezkor saralash poygasi", emoji: '⚡', description: "Vaqt o'tgan sari tezlashadigan chiqindilarni saralash poygasi!", instructions: ["Chiqindilar tobora tezroq paydo bo'ladi.", "Har birini to'g'ri qutiga sudrab yoki bosib tashla.", "Har bosqichda tezlik oshadi!", "Iloji boricha ko'proq to'g'ri saralab, rekord o'rnat!"], badgeThreshold },
      { id: 'clean-park', title: "Bog'ni tozalaymiz", emoji: '🌳', description: "Bog'da sochilib yotgan chiqindilarni yig'ib, bog'ni tozala!", instructions: ["Bog' rasmida chiqindi buyumlari yashiringan.", "Har bir chiqindini bosib yig'.", "Har chiqindi uchun +10 ball.", "Vaqt tugaguncha bog'ni imkon qadar tozala!"], badgeThreshold },
    ],
    video: { title: "Chiqindilarni saralash bo'yicha video qo'llanma", blurb: "Ushbu video orqali chiqindilarni qanday to'g'ri saralashni yana bir bor mustahkamlaymiz.", videoId: 'aqz-KE-bpKQ' },
  },
};

// Joriy tanlangan mavzu ma'lumotlari (butun sayt shu obyektdan foydalanadi)
export const currentTopic: TopicData = topicsData[TOPIC];

export const topicList = Object.keys(topicsData);
