import type { AvatarOption } from '../types';

export const AVATARS: AvatarOption[] = [
  { id: 'owl', emoji: '🦉', label: 'Boyqush' },
  { id: 'fox', emoji: '🦊', label: 'Tulki' },
  { id: 'cat', emoji: '🐱', label: 'Mushuk' },
  { id: 'panda', emoji: '🐼', label: 'Panda' },
  { id: 'lion', emoji: '🦁', label: 'Sher' },
  { id: 'rabbit', emoji: '🐰', label: 'Quyon' },
  { id: 'unicorn', emoji: '🦄', label: 'Yakkashox' },
  { id: 'dino', emoji: '🦕', label: 'Dinozavr' },
  { id: 'penguin', emoji: '🐧', label: 'Pingvin' },
  { id: 'koala', emoji: '🐨', label: 'Koala' },
];

export function getAvatarEmoji(id: string): string {
  return AVATARS.find((a) => a.id === id)?.emoji ?? '🦉';
}
