import React, { useState } from 'react';
import { X, Coffee, Clock, Sparkles, Flame } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  hindiName: string;
  region: string;
  brewTime: string;
  strength: 'Mellow' | 'Medium' | 'Kadak (Strong)' | 'Very Strong';
  tagline: string;
  ingredients: string[];
  steps: string[];
  tapriLore: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'adrak-elaichi',
    name: 'Adrak Elaichi Kadak Chai',
    hindiName: 'अदरक इलायची कड़क चाय',
    region: 'North India & Tapris Nationwide',
    brewTime: '8-10 mins',
    strength: 'Kadak (Strong)',
    tagline: 'The undisputed soul of Indian winter and monsoon mornings.',
    ingredients: [
      '1 cup water',
      '1 cup whole milk',
      '2 tbsp Assam CTC black tea',
      '1 inch freshly crushed ginger (adrak)',
      '3 green cardamom pods (crushed open)',
      '2 tsp sugar or crushed jaggery (gud)',
    ],
    steps: [
      'In a saucepan, bring 1 cup of water to a rolling boil with the crushed ginger and cardamom.',
      'Boil for 2-3 minutes until the water takes on a rich golden spiced aroma.',
      'Add the CTC black tea leaves. Simmer on medium heat for 2 minutes to extract the deep brisk color.',
      'Pour in whole milk and sugar. Bring the tea to a foaming boil 3 times (the tapri "ubal" ritual).',
      'Strain hot into cutting glasses or clay kulhads from a height of 1 foot to create natural froth.',
    ],
    tapriLore: 'Roadside chaiwalas crush whole spices right in front of you using a heavy brass pestle—the sound echoes like music.',
  },
  {
    id: 'bombay-cutting',
    name: 'Bombay Cutting Chai',
    hindiName: 'बॉम्बे कटिंग चाय',
    region: 'Mumbai, Maharashtra',
    brewTime: '7 mins',
    strength: 'Very Strong',
    tagline: 'Half a glass of pure lightning to keep Mumbai moving.',
    ingredients: [
      '3/4 cup water',
      '3/4 cup full-cream milk',
      '2.5 tbsp dark granular CTC tea',
      '1/2 inch crushed ginger',
      '2 crushed green cardamoms',
      '1 clove (laung)',
      '2 tsp sugar',
    ],
    steps: [
      'Boil water with ginger and clove until deeply aromatic.',
      'Add double the usual quantity of tea leaves—cutting chai demands uncompromising strength.',
      'Add milk and boil down until reduced by 20% into a rich, caramel-hued decoction.',
      'Strain half a glass into classic ribbed cutting glasses nestled in wire caddies.',
    ],
    tapriLore: 'Named "cutting" because one full cup is split into two half servings, perfect for sharing a quick conversation with friends before catching the local train.',
  },
  {
    id: 'irani-chai',
    name: 'Hyderabadi Irani Chai',
    hindiName: 'हैदराबादी ईरानी चाय',
    region: 'Hyderabad & Old Mumbai Cafes',
    brewTime: '30 mins (Slow Simmer)',
    strength: 'Kadak (Strong)',
    tagline: 'Velvety, slow-condensed milk poured over dark tea liquor.',
    ingredients: [
      '2 cups full-fat buffalo milk (condensed with mawa/condensed milk)',
      '1.5 cups water',
      '3 tbsp premium Assam dust & leaf tea',
      '4 crushed cardamom pods',
      '2 tbsp sugar',
      'Fresh Bun Maska (warm buttered pav) to accompany',
    ],
    steps: [
      'In pot 1: Slow boil milk until it reduces to half, becoming silky, creamy, and golden.',
      'In pot 2 (sealed with dough): Simmer tea and water on low ember heat for 25 minutes into a potent, dark "decoction".',
      'To serve: Pour 1/3 cup of steaming dark tea decoction into a cup, then top with 2/3 cup of rich reduced sweet milk.',
      'Serve alongside warm Bun Maska dipped straight into the chai foam.',
    ],
    tapriLore: 'Introduced by Persian Zoroastrian immigrants in the 19th century, Irani cafes with bentwood chairs and marble tables became legendary institutions of poetry and debate.',
  },
  {
    id: 'kashmiri-kahwa',
    name: 'Kashmiri Kahwa & Saffron',
    hindiName: 'कश्मीरी कहवा',
    region: 'Kashmir Valley',
    brewTime: '6 mins',
    strength: 'Mellow',
    tagline: 'Golden elixir of saffron threads, green tea, and slivered almonds.',
    ingredients: [
      '2 cups water',
      '1 tbsp Kashmiri green tea leaves',
      '8-10 saffron strands (kesar)',
      '2 green cardamoms (lightly bruised)',
      '1 small cinnamon stick',
      '1 tbsp slivered blanched almonds',
      '1 tbsp wild honey',
    ],
    steps: [
      'Boil water with cinnamon and cardamom for 3 minutes.',
      'Turn off flame, add green tea leaves and saffron strands. Cover and steep for 2-3 minutes.',
      'Place slivered almonds in ceramic cups, drizzle honey, and strain the fragrant golden liquor over.',
    ],
    tapriLore: 'Traditionally brewed in a copper samovar heated by glowing coals, Kahwa is a gesture of royal Himalayan hospitality.',
  },
  {
    id: 'sulaimani-chai',
    name: 'Sulaimani Spiced Tea',
    hindiName: 'सुलेमानी चाय',
    region: 'Malabar Coast, Kerala',
    brewTime: '5 mins',
    strength: 'Medium',
    tagline: 'Amber black tea with sweet mint, cardamom, and a splash of lemon.',
    ingredients: [
      '2 cups water',
      '1.5 tsp black tea leaves',
      '2 green cardamoms (crushed)',
      '1 small cinnamon bark',
      '4 fresh mint leaves',
      '1 tbsp jaggery or sugar',
      'Juice of 1/2 fresh lime',
    ],
    steps: [
      'Boil water with cardamom, cinnamon, and jaggery for 3 minutes.',
      'Add black tea leaves, boil for 1 minute only to prevent bitterness.',
      'Turn off flame, drop in fresh bruised mint leaves, squeeze fresh lime juice, and strain into clear glasses.',
    ],
    tapriLore: 'An Arabic-influenced digestive brew celebrated after heavy Malabar feasts. Legend says King Solomon himself savored a version of this tea.',
  },
];

export const ChaiMenuModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl glass-panel-deep shadow-2xl border border-[#ffecd6]/20 p-5 sm:p-6 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ffecd6]/10 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e8934a]/20 flex items-center justify-center text-[#f2b877]">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#f5e9dc]">
                The Tapri Menu & Secret Recipes
              </h2>
              <p className="text-[11px] text-[#f5e9dc]/60">
                Centuries of spice mastery, regional rituals, and brewing secrets
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
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedRecipe.id === recipe.id
                  ? 'bg-[#e8934a] text-[#0b0705] font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-[#f5e9dc]/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {recipe.name.split(' ')[0]} {recipe.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Selected Recipe Details */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Title Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-[#ffecd6]/10 flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="text-lg font-bold text-[#f5e9dc]">
                {selectedRecipe.name}
              </h3>
              <span className="font-devanagari text-sm font-semibold text-[#f2b877]">
                {selectedRecipe.hindiName}
              </span>
            </div>

            <p className="text-xs italic text-[#f2b877]/90 font-display">
              "{selectedRecipe.tagline}"
            </p>

            <div className="flex items-center gap-3 text-[11px] text-[#f5e9dc]/60 pt-1">
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

          {/* Tapri Lore Callout */}
          <div className="p-3.5 rounded-2xl bg-[#e8934a]/10 border border-[#f2b877]/20 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#f2b877] shrink-0 mt-0.5" />
            <div className="text-xs text-[#f5e9dc]/90">
              <strong className="text-[#f2b877]">Tapri Lore: </strong>
              {selectedRecipe.tapriLore}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
