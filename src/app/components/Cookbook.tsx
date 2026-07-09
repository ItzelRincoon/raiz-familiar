import { useState, useEffect, useRef } from 'react';
import { ChefHat, Clock, Users, Play, Pause, X, Volume2, Plus, Mic } from 'lucide-react';
import { toast } from 'sonner';

interface Recipe {
  id: number;
  name: string;
  author: string;
  time: string;
  servings: number;
  category: string;
  hasAudioSecret: boolean;
  audioPlaying: boolean;
  audioProgress: number;
}

const ingredients = [
  '2 kg de pollo en piezas', '4 chiles anchos', '3 chiles mulatos', '2 chiles pasilla',
  '100g de chocolate de mesa', '1/4 taza de ajonjolí', '1/2 taza de almendras',
  '1/2 taza de pasitas', '2 jitomates grandes', '1 cebolla mediana', '4 dientes de ajo',
];

const steps = [
  'Desvenar los chiles, tostarlos ligeramente y remojar en agua caliente por 20 minutos.',
  'Tostar las almendras, ajonjolí y pasitas en un comal. Reservar.',
  'Licuar los chiles con jitomate, cebolla, ajo y las especias tostadas hasta obtener una pasta suave.',
  'En una olla grande, cocinar el pollo hasta que esté dorado. Retirar y reservar.',
  'En la misma olla, freír la pasta de chile hasta que espese y cambie de color.',
  'Agregar el chocolate, caldo y el pollo. Cocinar a fuego lento por 45 minutos.',
  'Servir caliente con arroz blanco y tortillas recién hechas.',
];

const waveHeights = Array.from({ length: 30 }, () => Math.random() * 80 + 10);

export function Cookbook() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([
    { id: 1, name: 'Mole de Abuela', author: 'Abuela María', time: '3 horas', servings: 8, category: 'Principal', hasAudioSecret: true, audioPlaying: false, audioProgress: 0 },
    { id: 2, name: 'Tamales Navideños', author: 'Tía Rosa', time: '2 horas', servings: 24, category: 'Festivo', hasAudioSecret: true, audioPlaying: false, audioProgress: 0 },
    { id: 3, name: 'Arroz con Leche', author: 'Mamá Carmen', time: '45 min', servings: 6, category: 'Postre', hasAudioSecret: false, audioPlaying: false, audioProgress: 0 },
    { id: 4, name: 'Pozole Rojo', author: 'Abuela María', time: '4 horas', servings: 10, category: 'Principal', hasAudioSecret: true, audioPlaying: false, audioProgress: 0 },
    { id: 5, name: 'Pan de Muerto', author: 'Tío Roberto', time: '2.5 horas', servings: 12, category: 'Festivo', hasAudioSecret: true, audioPlaying: false, audioProgress: 0 },
    { id: 6, name: 'Flan Napolitano', author: 'Abuela María', time: '1 hora', servings: 8, category: 'Postre', hasAudioSecret: false, audioPlaying: false, audioProgress: 0 },
  ]);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleAudio = (recipeId: number) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === recipeId) {
          const nowPlaying = !r.audioPlaying;
          if (nowPlaying) toast('🎙️ Escuchando secreto de cocina...');
          return { ...r, audioPlaying: nowPlaying };
        }
        return { ...r, audioPlaying: false };
      })
    );
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe((prev) => prev ? { ...prev, audioPlaying: !prev.audioPlaying } : prev);
    }
  };

  useEffect(() => {
    const playingId = recipes.find((r) => r.audioPlaying)?.id;
    if (playingId) {
      progressRef.current = setInterval(() => {
        setRecipes((prev) =>
          prev.map((r) => {
            if (r.id === playingId) {
              const newProgress = r.audioProgress + 2;
              if (newProgress >= 100) {
                toast('✅ Audio terminado');
                return { ...r, audioPlaying: false, audioProgress: 0 };
              }
              return { ...r, audioProgress: newProgress };
            }
            return r;
          })
        );
      }, 100);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [recipes.find((r) => r.audioPlaying)?.id]);

  const openRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const currentRecipeData = selectedRecipe ? recipes.find((r) => r.id === selectedRecipe.id) : null;

  return (
    <div className="min-h-screen pb-8" style={{ background: 'var(--rf-bg)' }}>
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ChefHat size={32} color="#8B5E3C" />
            <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C' }}>
              Recetario Familiar
            </h1>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B' }}>
            Secretos culinarios de generación en generación
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#8B5E3C', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.3)', flexShrink: 0 }}
        >
          <Plus size={26} color="white" />
        </button>
      </div>

      {/* Recipe Grid */}
      <div className="px-6">
        <div className="grid grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => openRecipe(recipe)}
              className="relative overflow-hidden text-left"
              style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.08)', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <div className="relative" style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #B2AC88 0%, #8B5E3C 100%)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChefHat size={48} color="white" opacity={0.4} />
                </div>
                {recipe.hasAudioSecret && (
                  <div className="absolute top-3 right-3 px-3 py-1.5 flex items-center gap-1" style={{ backgroundColor: '#8B5E3C', borderRadius: '8px' }}>
                    <Volume2 size={14} color="white" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'white', fontWeight: 600 }}>Audio</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.125rem', color: '#2D2D2D', marginBottom: '6px', lineHeight: '1.3' }}>
                  {recipe.name}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#8B5E3C', marginBottom: '8px' }}>
                  por {recipe.author}
                </p>
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {recipe.time}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={12} /> {recipe.servings}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {currentRecipeData && (
        <div className="fixed inset-0 flex items-end justify-center z-50" style={{ backgroundColor: 'rgba(45, 45, 45, 0.6)' }} onClick={() => setSelectedRecipe(null)}>
          <div className="w-full max-w-2xl mx-4 mb-4" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            {/* Header Image */}
            <div className="relative" style={{ height: '200px', background: 'linear-gradient(135deg, #B2AC88 0%, #8B5E3C 100%)', borderRadius: '32px 32px 0 0' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <ChefHat size={80} color="white" opacity={0.3} />
              </div>
              <button onClick={() => setSelectedRecipe(null)} className="absolute top-4 right-4" style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--rf-card)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <X size={24} color="#8B5E3C" />
              </button>
            </div>

            <div className="p-6">
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C', marginBottom: '8px' }}>
                {currentRecipeData.name}
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginBottom: '16px' }}>
                Receta de {currentRecipeData.author}
              </p>

              <div className="flex items-center gap-6 mb-6 pb-6" style={{ borderBottom: '2px solid #F5EDD3' }}>
                {[{ label: 'Tiempo', val: currentRecipeData.time }, { label: 'Porciones', val: `${currentRecipeData.servings} personas` }].map((meta) => (
                  <div key={meta.label}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#8B5E3C', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>{meta.label}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', color: '#2D2D2D', fontWeight: 600 }}>{meta.val}</p>
                  </div>
                ))}
              </div>

              {/* Audio Secret */}
              {currentRecipeData.hasAudioSecret && (
                <div className="mb-6 p-5" style={{ backgroundColor: 'var(--rf-bg)', borderRadius: '20px', border: '2px solid #8B5E3C' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Volume2 size={20} color="#8B5E3C" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      Secreto de {currentRecipeData.author}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#6B6B6B', marginBottom: '12px', fontStyle: 'italic' }}>
                    "El secreto está en el amor con que se prepara..."
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() => toggleAudio(currentRecipeData.id)}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: currentRecipeData.audioPlaying ? '#B2AC88' : '#8B5E3C', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background-color 0.2s' }}
                    >
                      {currentRecipeData.audioPlaying
                        ? <Pause size={20} color="white" fill="white" />
                        : <Play size={20} color="white" fill="white" />}
                    </button>
                    <div className="flex-1 flex items-center gap-0.5" style={{ height: '28px' }}>
                      {waveHeights.map((h, i) => (
                        <div key={i} style={{
                          width: '4px',
                          height: `${h}%`,
                          backgroundColor: currentRecipeData.audioPlaying && i < (currentRecipeData.audioProgress / 100) * 30 ? '#8B5E3C' : '#B2AC88',
                          borderRadius: '2px',
                          opacity: 0.7,
                          transition: 'background-color 0.2s'
                        }} />
                      ))}
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#8B5E3C', fontWeight: 600 }}>1:23</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: '4px', backgroundColor: '#D4C9B8', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${currentRecipeData.audioProgress}%`, height: '100%', backgroundColor: '#8B5E3C', borderRadius: '2px', transition: 'width 0.1s linear' }} />
                  </div>
                </div>
              )}

              {/* Ingredients */}
              <div className="mb-6">
                <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.375rem', color: '#2D2D2D', marginBottom: '16px' }}>Ingredientes</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start gap-3 mb-3" style={{ padding: '12px 16px', backgroundColor: idx % 2 === 0 ? '#FFF3DD' : 'transparent', borderRadius: '12px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5E3C', marginTop: '6px', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#2D2D2D', lineHeight: '1.6' }}>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="mb-6">
                <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.375rem', color: '#2D2D2D', marginBottom: '16px' }}>Preparación</h3>
                <div className="space-y-4">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#8B5E3C', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', fontWeight: 700, flexShrink: 0 }}>
                        {idx + 1}
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#2D2D2D', lineHeight: '1.7', paddingTop: '8px' }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => { toast('🎙️ Grabando secreto de audio...'); setSelectedRecipe(null); }} style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', color: '#8B5E3C', border: '2px solid #8B5E3C', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '60px' }}>
                <Mic size={22} /> Agregar Mi Secreto de Audio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Recipe Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-end justify-center z-50" style={{ backgroundColor: 'rgba(45, 45, 45, 0.6)' }} onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-2xl mx-4 mb-4" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', padding: '32px', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#8B5E3C' }}>Nueva Receta</h2>
              <button onClick={() => setShowAddModal(false)} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={22} color="#8B5E3C" />
              </button>
            </div>
            {['Nombre de la receta', 'Autor / Quién la preparaba', 'Tiempo de preparación', 'Número de porciones'].map((label, i) => (
              <div key={label} className="mb-4">
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
                <input type="text" placeholder={['Ej: Chiles en Nogada', 'Ej: Tía Lupita', 'Ej: 2 horas', 'Ej: 8'][i]} style={{ width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', border: '2px solid rgba(139, 94, 60, 0.2)', borderRadius: '14px', color: '#2D2D2D', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>
            ))}
            <button onClick={() => { toast('🍽️ ¡Receta agregada al recetario familiar!'); setShowAddModal(false); }} style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Plus size={22} /> Agregar Receta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
