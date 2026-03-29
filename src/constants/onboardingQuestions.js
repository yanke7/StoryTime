export const ONBOARDING_QUESTIONS = [
  {
    id: 'heroName',
    type: 'text',
    question: "What's your hero's name?",
    placeholder: 'Type a name...',
    emoji: '🦸',
  },
  {
    id: 'adventureType',
    type: 'choice',
    question: 'Where does the adventure happen?',
    emoji: '🗺️',
    options: [
      { value: 'an enchanted forest', label: 'Enchanted Forest', emoji: '🌲' },
      { value: 'outer space', label: 'Outer Space', emoji: '🚀' },
      { value: 'an underwater kingdom', label: 'Under the Sea', emoji: '🌊' },
      { value: 'a magical castle', label: 'Magic Castle', emoji: '🏰' },
    ],
  },
  {
    id: 'sidekick',
    type: 'choice',
    question: 'Pick your sidekick!',
    emoji: '🤝',
    options: [
      { value: 'a friendly dragon', label: 'Friendly Dragon', emoji: '🐉' },
      { value: 'a clever robot', label: 'Clever Robot', emoji: '🤖' },
      { value: 'a talking fox', label: 'Talking Fox', emoji: '🦊' },
      { value: 'a tiny wizard', label: 'Tiny Wizard', emoji: '🧙' },
    ],
  },
  {
    id: 'problem',
    type: 'choice',
    question: "What's the big problem to solve?",
    emoji: '❓',
    options: [
      { value: 'finding a lost treasure', label: 'Lost Treasure', emoji: '💎' },
      { value: 'stopping a scary storm', label: 'Scary Storm', emoji: '⛈️' },
      { value: 'helping a new friend in trouble', label: 'Help a Friend', emoji: '🤗' },
      { value: 'breaking a magic spell', label: 'Magic Spell', emoji: '✨' },
    ],
  },
];
