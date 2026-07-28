// Shartli tarzda CSS klasslarini birlashtiruvchi kichik yordamchi funksiya
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
