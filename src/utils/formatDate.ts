// Ba'zi brauzerlarda 'uz-UZ' lokali uchun oy nomlari to'liq qo'llab-quvvatlanmaydi
// (masalan "2026 M07 28" kabi noto'g'ri chiqishi mumkin), shuning uchun oy
// nomlarini o'zimiz qo'lda belgilaymiz - bu har doim to'g'ri o'zbekcha chiqishini kafolatlaydi.
const UZ_MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
];

export function formatUzbekDate(date: Date): string {
  return `${date.getDate()}-${UZ_MONTHS[date.getMonth()]}, ${date.getFullYear()}-yil`;
}

export function formatUzbekShortDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}`;
}
