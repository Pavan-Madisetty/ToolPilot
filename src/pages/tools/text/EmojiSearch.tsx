import { useState } from 'react';
import { ToolPageWrapper } from '@/components/shared/ToolPageWrapper';
import { Search } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

interface EmojiItem {
  emoji: string;
  name: string;
  category: string;
  keywords: string[];
  supportsSkinTone?: boolean;
}

const EMOJIS: EmojiItem[] = [
  // Smileys & Emotion
  { emoji: '😀', name: 'Grinning Face', category: 'Smileys', keywords: ['happy', 'smile', 'face', 'grinning'] },
  { emoji: '😃', name: 'Grinning Face with Big Eyes', category: 'Smileys', keywords: ['happy', 'joy', 'smile', 'face'] },
  { emoji: '😄', name: 'Grinning Face with Smiling Eyes', category: 'Smileys', keywords: ['happy', 'laugh', 'smile', 'face'] },
  { emoji: '😁', name: 'Beaming Face with Smiling Eyes', category: 'Smileys', keywords: ['happy', 'teeth', 'smile', 'face'] },
  { emoji: '😆', name: 'Grinning Squinting Face', category: 'Smileys', keywords: ['happy', 'laugh', 'squint', 'face'] },
  { emoji: '😅', name: 'Grinning Face with Sweat', category: 'Smileys', keywords: ['happy', 'sweat', 'laugh', 'relief'] },
  { emoji: '🤣', name: 'Rolling on the Floor Laughing', category: 'Smileys', keywords: ['lol', 'laugh', 'rolling', 'funny'] },
  { emoji: '😂', name: 'Face with Tears of Joy', category: 'Smileys', keywords: ['lol', 'laugh', 'tears', 'funny'] },
  { emoji: '🙂', name: 'Slightly Smiling Face', category: 'Smileys', keywords: ['smile', 'face', 'happy'] },
  { emoji: '😉', name: 'Winking Face', category: 'Smileys', keywords: ['wink', 'face', 'happy'] },
  { emoji: '😊', name: 'Smiling Face with Smiling Eyes', category: 'Smileys', keywords: ['happy', 'blush', 'smile', 'face'] },
  { emoji: '😇', name: 'Smiling Face with Halo', category: 'Smileys', keywords: ['angel', 'halo', 'good', 'face'] },
  { emoji: '🥰', name: 'Smiling Face with Hearts', category: 'Smileys', keywords: ['love', 'hearts', 'affection', 'face'] },
  { emoji: '😍', name: 'Smiling Face with Heart-Eyes', category: 'Smileys', keywords: ['love', 'heart', 'adore', 'face'] },
  { emoji: '🤩', name: 'Star-Struck', category: 'Smileys', keywords: ['star', 'eyes', 'excited', 'wow'] },
  { emoji: '😘', name: 'Face Blowing a Kiss', category: 'Smileys', keywords: ['kiss', 'love', 'kissing', 'face'] },
  { emoji: '😜', name: 'Winking Face with Tongue', category: 'Smileys', keywords: ['tongue', 'wink', 'silly', 'face'] },
  { emoji: '😎', name: 'Smiling Face with Sunglasses', category: 'Smileys', keywords: ['cool', 'sunglasses', 'sun', 'glasses'] },
  { emoji: '🥳', name: 'Partying Face', category: 'Smileys', keywords: ['party', 'celebrate', 'horn', 'hat'] },
  { emoji: '😢', name: 'Crying Face', category: 'Smileys', keywords: ['sad', 'cry', 'tears', 'upset'] },
  { emoji: '😭', name: 'Loudly Crying Face', category: 'Smileys', keywords: ['sad', 'cry', 'tears', 'sob'] },
  { emoji: '😱', name: 'Face Screaming in Fear', category: 'Smileys', keywords: ['scared', 'scream', 'shock', 'wow'] },
  { emoji: '😡', name: 'Pouting Face', category: 'Smileys', keywords: ['angry', 'mad', 'rage', 'face'] },
  { emoji: '😷', name: 'Face with Medical Mask', category: 'Smileys', keywords: ['sick', 'mask', 'doctor', 'ill'] },
  { emoji: '🤖', name: 'Robot', category: 'Smileys', keywords: ['robot', 'bot', 'machine', 'technology'] },
  { emoji: '👻', name: 'Ghost', category: 'Smileys', keywords: ['ghost', 'spooky', 'halloween', 'scary'] },
  { emoji: '💀', name: 'Skull', category: 'Smileys', keywords: ['skull', 'death', 'dead', 'skeleton'] },
  { emoji: '💩', name: 'Pile of Poop', category: 'Smileys', keywords: ['poop', 'poo', 'dung', 'funny'] },

  // Gestures & People (Supports skin tone)
  { emoji: '👍', name: 'Thumbs Up', category: 'Gestures', keywords: ['yes', 'agree', 'good', 'ok'], supportsSkinTone: true },
  { emoji: '👎', name: 'Thumbs Down', category: 'Gestures', keywords: ['no', 'disagree', 'bad'], supportsSkinTone: true },
  { emoji: '👌', name: 'OK Hand', category: 'Gestures', keywords: ['ok', 'good', 'correct'], supportsSkinTone: true },
  { emoji: '👋', name: 'Waving Hand', category: 'Gestures', keywords: ['hello', 'bye', 'wave', 'hi'], supportsSkinTone: true },
  { emoji: '👏', name: 'Clapping Hands', category: 'Gestures', keywords: ['clap', 'applause', 'bravo'], supportsSkinTone: true },
  { emoji: '🙌', name: 'Raising Hands', category: 'Gestures', keywords: ['hooray', 'celebrate', 'hallelujah'], supportsSkinTone: true },
  { emoji: '🙏', name: 'Folded Hands', category: 'Gestures', keywords: ['please', 'thank you', 'pray', 'hope'], supportsSkinTone: true },
  { emoji: '💪', name: 'Flexed Biceps', category: 'Gestures', keywords: ['strong', 'flex', 'power', 'muscle'], supportsSkinTone: true },

  // Animals & Nature
  { emoji: '🐶', name: 'Dog Face', category: 'Animals', keywords: ['dog', 'puppy', 'pet', 'animal'] },
  { emoji: '🐱', name: 'Cat Face', category: 'Animals', keywords: ['cat', 'kitten', 'pet', 'animal'] },
  { emoji: '🐭', name: 'Mouse Face', category: 'Animals', keywords: ['mouse', 'rodent', 'animal'] },
  { emoji: '🐰', name: 'Rabbit Face', category: 'Animals', keywords: ['rabbit', 'bunny', 'animal'] },
  { emoji: '🦊', name: 'Fox', category: 'Animals', keywords: ['fox', 'animal', 'wild'] },
  { emoji: '🐻', name: 'Bear', category: 'Animals', keywords: ['bear', 'animal', 'wild'] },
  { emoji: '🐼', name: 'Panda', category: 'Animals', keywords: ['panda', 'animal', 'china'] },
  { emoji: '🦁', name: 'Lion', category: 'Animals', keywords: ['lion', 'animal', 'wild', 'king'] },
  { emoji: '🐸', name: 'Frog', category: 'Animals', keywords: ['frog', 'animal', 'amphibian'] },
  { emoji: '🐵', name: 'Monkey Face', category: 'Animals', keywords: ['monkey', 'animal', 'chimp'] },
  { emoji: '🦖', name: 'T-Rex', category: 'Animals', keywords: ['dinosaur', 'trex', 'reptile'] },
  { emoji: '🐝', name: 'Honeybee', category: 'Animals', keywords: ['bee', 'insect', 'bug', 'honey'] },
  { emoji: '🦋', name: 'Butterfly', category: 'Animals', keywords: ['butterfly', 'insect', 'bug', 'wings'] },
  { emoji: '🌲', name: 'Evergreen Tree', category: 'Nature', keywords: ['tree', 'forest', 'pine', 'nature'] },
  { emoji: '🌸', name: 'Cherry Blossom', category: 'Nature', keywords: ['flower', 'sakura', 'pink', 'spring'] },
  { emoji: '🌍', name: 'Globe Europe-Africa', category: 'Nature', keywords: ['earth', 'globe', 'world', 'planet'] },
  { emoji: '☀️', name: 'Sun', category: 'Nature', keywords: ['sun', 'sunny', 'day', 'weather', 'hot'] },
  { emoji: '🌙', name: 'Crescent Moon', category: 'Nature', keywords: ['moon', 'night', 'sky'] },
  { emoji: '🌧️', name: 'Cloud with Rain', category: 'Nature', keywords: ['rain', 'weather', 'cloud', 'wet'] },
  { emoji: '🔥', name: 'Fire', category: 'Nature', keywords: ['fire', 'flame', 'hot', 'burn'] },
  { emoji: '⚡', name: 'High Voltage', category: 'Nature', keywords: ['lightning', 'electricity', 'bolt', 'power'] },

  // Food & Drink
  { emoji: '🍎', name: 'Red Apple', category: 'Food', keywords: ['apple', 'fruit', 'red', 'healthy'] },
  { emoji: '🍌', name: 'Banana', category: 'Food', keywords: ['banana', 'fruit', 'yellow'] },
  { emoji: '🍉', name: 'Watermelon', category: 'Food', keywords: ['watermelon', 'fruit', 'summer'] },
  { emoji: '🍕', name: 'Pizza', category: 'Food', keywords: ['pizza', 'cheese', 'slice', 'italian'] },
  { emoji: '🍔', name: 'Hamburger', category: 'Food', keywords: ['burger', 'beef', 'fastfood'] },
  { emoji: '🍟', name: 'French Fries', category: 'Food', keywords: ['fries', 'potato', 'fastfood'] },
  { emoji: '🍩', name: 'Doughnut', category: 'Food', keywords: ['donut', 'sweet', 'dessert'] },
  { emoji: '🍪', name: 'Cookie', category: 'Food', keywords: ['cookie', 'sweet', 'biscuit'] },
  { emoji: '🍿', name: 'Popcorn', category: 'Food', keywords: ['popcorn', 'snack', 'movie'] },
  { emoji: '🍺', name: 'Beer Mug', category: 'Food', keywords: ['beer', 'drink', 'alcohol', 'pub'] },
  { emoji: '☕', name: 'Hot Beverage', category: 'Food', keywords: ['coffee', 'cup', 'cafe', 'hot'] },

  // Travel & Activities
  { emoji: '⚽', name: 'Soccer Ball', category: 'Activities', keywords: ['soccer', 'football', 'ball', 'sports'] },
  { emoji: '🏀', name: 'Basketball', category: 'Activities', keywords: ['basketball', 'ball', 'sports'] },
  { emoji: '🏈', name: 'American Football', category: 'Activities', keywords: ['football', 'sports'] },
  { emoji: '🚴', name: 'Bicyclist', category: 'Activities', keywords: ['cycling', 'bike', 'rider', 'sports'], supportsSkinTone: true },
  { emoji: '🏃', name: 'Runner', category: 'Activities', keywords: ['run', 'running', 'exercise', 'sports'], supportsSkinTone: true },
  { emoji: '🏊', name: 'Swimmer', category: 'Activities', keywords: ['swim', 'swimming', 'pool', 'sports'], supportsSkinTone: true },
  { emoji: '🎮', name: 'Video Game', category: 'Activities', keywords: ['game', 'controller', 'playstation', 'xbox'] },
  { emoji: '✈️', name: 'Airplane', category: 'Travel', keywords: ['flight', 'plane', 'travel', 'vacation'] },
  { emoji: '🚀', name: 'Rocket', category: 'Travel', keywords: ['rocket', 'space', 'ship', 'launch'] },

  // Objects & Symbols
  { emoji: '💻', name: 'Laptop', category: 'Objects', keywords: ['laptop', 'computer', 'pc', 'tech'] },
  { emoji: '📱', name: 'Mobile Phone', category: 'Objects', keywords: ['phone', 'mobile', 'cellphone', 'tech'] },
  { emoji: '💡', name: 'Light Bulb', category: 'Objects', keywords: ['light', 'idea', 'brain', 'bulb'] },
  { emoji: '📖', name: 'Open Book', category: 'Objects', keywords: ['book', 'read', 'learn', 'study'] },
  { emoji: '🔑', name: 'Key', category: 'Objects', keywords: ['key', 'lock', 'unlock', 'secret'] },
  { emoji: '🔒', name: 'Locked', category: 'Objects', keywords: ['lock', 'secure', 'private', 'safe'] },
  { emoji: '🎯', name: 'Bullseye', category: 'Objects', keywords: ['target', 'hit', 'dart', 'goal'] },
  { emoji: '🎨', name: 'Artist Palette', category: 'Objects', keywords: ['art', 'paint', 'draw', 'design'] },
  { emoji: '🎵', name: 'Musical Note', category: 'Symbols', keywords: ['music', 'note', 'sound', 'melody'] },
  { emoji: '💖', name: 'Sparkling Heart', category: 'Symbols', keywords: ['love', 'heart', 'sparkle'] },
  { emoji: '💔', name: 'Broken Heart', category: 'Symbols', keywords: ['sad', 'heart', 'break', 'love'] },
  { emoji: '💯', name: 'Hundred Points', category: 'Symbols', keywords: ['100', 'perfect', 'score', 'excellent'] },
  { emoji: '⚠️', name: 'Warning', category: 'Symbols', keywords: ['warning', 'alert', 'danger', 'caution'] },
];

const SKIN_TONES = [
  { code: '', label: 'Default', bg: '#FFD225' },
  { code: '🏻', label: 'Light', bg: '#F7D4BD' },
  { code: '🏼', label: 'Medium-Light', bg: '#E2B897' },
  { code: '🏽', label: 'Medium', bg: '#C59674' },
  { code: '🏾', label: 'Medium-Dark', bg: '#9E6B4E' },
  { code: '🏿', label: 'Dark', bg: '#5C3F34' },
];

export default function EmojiSearch() {
  const { addToast } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkinTone, setSelectedSkinTone] = useState<string>('');
  const categories = ['All', 'Smileys', 'Gestures', 'Animals', 'Nature', 'Food', 'Activities', 'Travel', 'Objects', 'Symbols'];

  let filteredEmojis = EMOJIS;

  if (activeCategory !== 'All') {
    filteredEmojis = filteredEmojis.filter((item) => item.category === activeCategory);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredEmojis = filteredEmojis.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords.some((kw) => kw.includes(query))
    );
  }

  const handleCopyEmoji = (baseEmoji: string, supportsSkinTone?: boolean) => {
    const finalEmoji = supportsSkinTone ? baseEmoji + selectedSkinTone : baseEmoji;
    navigator.clipboard.writeText(finalEmoji);

    addToast({
      type: 'success',
      title: 'Emoji Copied',
      message: `Copied ${finalEmoji} to clipboard!`,
    });
  };

  return (
    <ToolPageWrapper toolId="emoji-search">
      <div className="space-y-6">
        {/* Controls Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Field */}
          <div className="md:col-span-8 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[var(--text-tertiary)] group-focus-within:text-[var(--primary)] transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search emojis by name, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all font-medium h-12 text-sm"
            />
          </div>

          {/* Skin Tone Selector */}
          <div className="md:col-span-4 flex items-center gap-2 justify-end">
            <span className="text-xs font-semibold text-[var(--text-tertiary)] mr-2">Tone:</span>
            <div className="flex gap-1.5 bg-[var(--bg-elevated)] p-1 rounded-xl border border-[var(--border-default)]">
              {SKIN_TONES.map((tone) => (
                <button
                  key={tone.label}
                  onClick={() => setSelectedSkinTone(tone.code)}
                  className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                    selectedSkinTone === tone.code
                      ? 'ring-2 ring-[var(--primary)] border-white scale-110'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: tone.bg }}
                  title={tone.label}
                  aria-label={`Select ${tone.label} skin tone`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Category segment buttons */}
        <div className="flex flex-wrap gap-2 py-2 border-b border-[var(--border-default)]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[var(--primary)] text-white shadow-sm'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Emoji Cards Grid */}
        {filteredEmojis.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {filteredEmojis.map((item) => {
              const displayEmoji = item.supportsSkinTone ? item.emoji + selectedSkinTone : item.emoji;
              return (
                <button
                  key={item.name}
                  onClick={() => handleCopyEmoji(item.emoji, item.supportsSkinTone)}
                  className="p-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] hover:border-[var(--primary)] hover:shadow-sm transition-all flex flex-col items-center justify-center gap-2 group relative cursor-pointer"
                  title={`Click to copy ${item.name}`}
                >
                  <span className="text-3xl transition-transform group-hover:scale-110 select-none">
                    {displayEmoji}
                  </span>
                  <span className="text-[10px] font-medium text-[var(--text-tertiary)] text-center line-clamp-1 w-full uppercase">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-4xl block mb-3">🔍</span>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">No emojis matched your search</p>
          </div>
        )}
      </div>
    </ToolPageWrapper>
  );
}
