import React, { useState } from 'react';
import { X, Coffee, Clock, Sparkles, Flame, Globe } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  nativeName: string;
  culture: string;
  region: string;
  brewTime: string;
  strength: 'Mellow' | 'Medium' | 'Kadak (Strong)' | 'Intense';
  tagline: string;
  ingredients: string[];
  steps: string[];
  lore: string;
  icon: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'adrak-elaichi',
    name: 'Adrak Elaichi Kadak Chai',
    nativeName: 'अदरक इलायची कड़क चाय',
    culture: 'Indian Tapri Culture',
    region: 'North India & Tapris Nationwide',
    brewTime: '8-10 mins',
    strength: 'Kadak (Strong)',
    tagline: 'The undisputed soul of monsoon mornings and winter evenings.',
    icon: '🫖',
    ingredients: [
      '1 cup filtered water',
      '1 cup whole buffalo or full-cream milk',
      '2.5 tbsp Assam CTC granular black tea',
      '1 inch freshly crushed ginger root (adrak)',
      '3 green cardamom pods (crushed open)',
      '2 tsp raw cane sugar or crushed jaggery (gud)',
    ],
    steps: [
      'Bring water to a rolling boil with crushed ginger and crushed cardamom pods in a heavy saucepan.',
      'Boil for 2-3 minutes until golden spice oils infuse into the water.',
      'Add granular CTC black tea and simmer on medium heat for 2 minutes to develop deep brisk color.',
      'Pour in full-cream milk and sugar. Bring the tea to a foaming boil 3 times (the tapri "ubal" ritual).',
      'Strain hot into cutting glasses or clay kulhads from a height of 1 foot to aerate natural froth.',
    ],
    lore: 'Roadside chaiwalas crush spices with a heavy brass mortar and pestle right in front of you—the metallic clinking is the heartbeat of Indian mornings.',
  },
  {
    id: 'tokyo-matcha',
    name: 'Ceremonial Matcha Latte',
    nativeName: '宇治抹茶ラテ',
    culture: 'Japanese Kissaten & Tea Ceremony',
    region: 'Uji, Kyoto & Tokyo Kissatens',
    brewTime: '4 mins',
    strength: 'Medium',
    tagline: 'Vibrant emerald green, umami depth, and silky microfoam.',
    icon: '🍵',
    ingredients: [
      '2g (1.5 chashaku scoops) Ceremonial Grade Uji Matcha',
      '60ml hot water at 75°C (167°F)',
      '180ml lightly steamed oat milk or whole milk',
      '1 tsp wild blossom honey or wasanbon sugar (optional)',
    ],
    steps: [
      'Sift matcha powder through a fine stainless steel mesh strainer into a warmed chawan bowl.',
      'Add 60ml of hot water (never boiling, to protect the delicate sweet L-theanine amino acids).',
      'Whisk briskly using a bamboo chasen in a rapid "W" motion from the wrist until a dense jade-green microfoam forms.',
      'Gently pour warm steamed milk down the edge of the glass, creating elegant layered ombre swirls.',
    ],
    lore: 'Zen monks originally consumed matcha before dawn to cultivate calm alert presence (zazen)—the perfect accompaniment to rain against window panes.',
  },
  {
    id: 'paris-cortado',
    name: 'Montmartre Velvet Cortado',
    nativeName: 'Café Cortado Français',
    culture: 'Parisian Café & Flânerie',
    region: 'Montmartre & Left Bank, Paris',
    brewTime: '3 mins',
    strength: 'Intense',
    tagline: 'Equal parts dark bittersweet espresso and silky textured milk.',
    icon: '☕',
    ingredients: [
      'Double shot (60ml) dark roasted espresso (Arabica & Robusta blend)',
      '60ml whole milk steamed to silky microfoam (flat white texture)',
      'A pinch of raw demerara sugar',
      'Warm buttered croissant on the side',
    ],
    steps: [
      'Pull a rich double espresso with a thick golden-hazelnut crema into a heavy 130ml glass tumbler.',
      'Steam fresh cold milk to 60°C (140°F), focusing on microfoam without giant bubbles.',
      'Pour steamed milk at a 1:1 ratio directly into the espresso center, cutting through the crema.',
      'Serve immediately on a small zinc saucer with a tiny silver spoon and buttered croissant.',
    ],
    lore: 'The word cortado comes from "cortar" (to cut)—the warm milk cuts the espresso acidity while preserving the full potency of the roast.',
  },
  {
    id: 'nordic-cocoa',
    name: 'Viennese Spiced Hot Cocoa',
    nativeName: 'Krydret Varm Sjokolade',
    culture: 'Scandinavian Hygge & Nordic Cabins',
    region: 'Oslo, Bergen & Viennese Salons',
    brewTime: '8 mins',
    strength: 'Mellow',
    tagline: 'Melted dark chocolate, cinnamon stick, sea salt & vanilla cream.',
    icon: '🪵',
    ingredients: [
      '70g 72% dark chocolate (chopped into fine shavings)',
      '1.5 cups whole milk',
      '1/4 cup heavy cream',
      '1 cinnamon bark stick',
      '1 star anise pod',
      'Pinch of sea salt flakes',
      'Dollop of fresh whipped chantilly cream',
    ],
    steps: [
      'Heat milk, cream, cinnamon stick, and star anise in a saucepan over low heat until gentle steaming.',
      'Remove whole spices and whisk in the chopped dark chocolate until fully melted and glossy.',
      'Add a pinch of sea salt to unlock the deep cacao depth.',
      'Pour into heavy stoneware pottery mugs and crown with cold whipped cream and chocolate dust.',
    ],
    lore: 'In Scandinavian winters where daylight lasts just 4 hours, hot cocoa enjoyed by stone fireplaces embodies "koselig"—the feeling of warm contentment.',
  },
  {
    id: 'moroccan-mint',
    name: 'Maghrebi Fresh Mint Tea',
    nativeName: 'أتاي بالنعناع',
    culture: 'North African Hospitality',
    region: 'Marrakech, Morocco',
    brewTime: '6 mins',
    strength: 'Medium',
    tagline: 'Gunpowder green tea poured from high heights with fresh spearmint.',
    icon: '🌿',
    ingredients: [
      '2 tbsp Chinese gunpowder green tea pearls',
      'Large generous bunch of fresh organic spearmint (Naanâ)',
      '2.5 cups boiling water',
      '3-4 sugar cubes or cane sugar',
    ],
    steps: [
      'Rinse gunpowder tea pearls with a splash of boiling water to awaken the leaves, then discard water.',
      'Add 2 cups boiling water and steep on low heat for 2 minutes.',
      'Stuff fresh spearmint leaves into the metal teapot and add sugar.',
      'Pour tea from at least 18 inches above the ornate patterned glasses to create the signature froth ("the crown" or rezza).',
      'Pour back into the pot and repeat twice to ensure even temperature and flavor.',
    ],
    lore: 'In Moroccan tradition, the first glass is as gentle as life, the second is as strong as love, and the third is as soothing as death.',
  },
  {
    id: 'turkish-coffee',
    name: 'Istanbul Sand-Brewed Kahve',
    nativeName: 'Türk Kahvesi',
    culture: 'Ottoman Coffee House Tradition',
    region: 'Grand Bazaar, Istanbul',
    brewTime: '5 mins',
    strength: 'Intense',
    tagline: 'Extra-finely powdered beans slow-boiled in a copper cezve.',
    icon: '☕',
    ingredients: [
      '1 rounded tbsp flour-fine ground dark coffee',
      '1 fincan (espresso cup) cold filtered water',
      '1 tsp sugar (Orta Şekerli - medium sweet)',
      '2 green cardamom seeds (optional)',
      'Pistachio Turkish delight to serve',
    ],
    steps: [
      'Combine cold water, coffee, and sugar into a solid brass or copper cezve pot. Stir once gently.',
      'Place over gentle heat (or hot pan sand) without stirring.',
      'As it heats, a thick dark foam (köpük) will rise to the surface.',
      'Just before boiling over, spoon the rich foam into serving cups.',
      'Return pot to heat for 10 seconds, then pour the remaining coffee down the side of the cup without breaking the foam.',
    ],
    lore: 'Recognized as UNESCO Intangible Cultural Heritage, Turkish coffee is served with a small glass of water to cleanse the palate before the first sip.',
  },
];

export const ChaiMenuModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl glass-panel-deep shadow-2xl border border-[#ffecd6]/20 p-5 sm:p-6 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ffecd6]/10 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e8934a]/20 flex items-center justify-center text-[#f2b877]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#f5e9dc]">
                World Comfort Drinks & Brewing Rituals
              </h2>
              <p className="text-[11px] text-[#f5e9dc]/60">
                Centuries of tea, coffee, and spice mastery across world cultures
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#f5e9dc]/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recipe Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none">
          {RECIPES.map((recipe) => (
            <button
              key={recipe.id}
              type="button"
              onClick={() => setSelectedRecipe(recipe)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedRecipe.id === recipe.id
                  ? 'bg-[#e8934a] text-[#0b0705] font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-[#f5e9dc]/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{recipe.icon}</span>
              <span>{recipe.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Selected Recipe Details */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Title Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#ffecd6]/10 flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedRecipe.icon}</span>
                <h3 className="text-lg font-bold text-[#f5e9dc]">{selectedRecipe.name}</h3>
              </div>
              <span className="font-devanagari text-sm font-semibold text-[#f2b877]">
                {selectedRecipe.nativeName}
              </span>
            </div>

            <p className="text-xs italic text-[#f2b877]/90 font-display">
              "{selectedRecipe.tagline}"
            </p>

            <div className="flex items-center gap-3 text-[11px] text-[#f5e9dc]/60 pt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#f2b877]" />
                {selectedRecipe.brewTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#e8934a]" />
                {selectedRecipe.strength}
              </span>
              <span>·</span>
              <span>{selectedRecipe.region}</span>
            </div>
          </div>

          {/* Ingredients & Steps Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Ingredients */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#ffecd6]/10 space-y-2">
              <h4 className="text-xs font-semibold text-[#f2b877] uppercase tracking-wider">
                Ingredients Needed
              </h4>
              <ul className="space-y-1.5 text-xs text-[#f5e9dc]/80">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#f2b877] font-bold">•</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brewing Steps */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#ffecd6]/10 space-y-2">
              <h4 className="text-xs font-semibold text-[#f2b877] uppercase tracking-wider">
                Brewing Method
              </h4>
              <ol className="space-y-2 text-xs text-[#f5e9dc]/80">
                {selectedRecipe.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-[#f2b877] w-4 text-right shrink-0 mt-0.5">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Lore Callout */}
          <div className="p-3.5 rounded-2xl bg-[#e8934a]/10 border border-[#f2b877]/20 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#f2b877] shrink-0 mt-0.5" />
            <div className="text-xs text-[#f5e9dc]/90">
              <strong className="text-[#f2b877]">Cultural Lore: </strong>
              {selectedRecipe.lore}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
