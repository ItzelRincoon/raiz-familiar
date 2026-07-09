import { useState } from 'react';
import { Lock, Clock, Trophy, Star, X, Check, Plus, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface TriviaQuestion {
  id: number;
  question: string;
  score: number;
  players: number;
  options: string[];
  correctIndex: number;
  answered: number | null;
}

export function TimeCapsules() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [capsuleTitle, setCapsuleTitle] = useState('');
  const [capsuleDate, setCapsuleDate] = useState('');
  const [capsuleMessage, setCapsuleMessage] = useState('');
  const [showAllTrivia, setShowAllTrivia] = useState(false);

  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([
    {
      id: 1, question: '¿En qué año se casaron Abuelo José y Abuela María?', score: 100, players: 12,
      options: ['1945', '1950', '1952', '1948'], correctIndex: 2, answered: null,
    },
    {
      id: 2, question: '¿Cuál es el platillo favorito de la familia?', score: 75, players: 18,
      options: ['Tamales', 'Mole', 'Pozole', 'Enchiladas'], correctIndex: 1, answered: null,
    },
    {
      id: 3, question: '¿Dónde nació Mamá Carmen?', score: 50, players: 9,
      options: ['Oaxaca', 'Veracruz', 'Puebla', 'Guadalajara'], correctIndex: 2, answered: null,
    },
    { id: 4, question: '¿Cuántos hijos tuvo Abuelo José?', score: 60, players: 14, options: ['2', '3', '4', '5'], correctIndex: 1, answered: null },
    { id: 5, question: '¿En qué ciudad vive Sofía actualmente?', score: 80, players: 7, options: ['Madrid', 'Buenos Aires', 'Miami', 'París'], correctIndex: 2, answered: null },
  ]);

  const capsules = [
    { id: 1, title: 'Mensaje para el 2027', from: 'Abuela María', unlockDate: 'Enero 1, 2027', daysLeft: 203 },
    { id: 2, title: 'Boda de Ana', from: 'Familia García', unlockDate: 'Junio 15, 2026', daysLeft: 3 },
    { id: 3, title: 'Graduación de Diego', from: 'Papá Carlos', unlockDate: 'Diciembre 10, 2026', daysLeft: 181 },
  ];

  const allTrivia = showAllTrivia ? triviaQuestions : triviaQuestions.slice(0, 3);

  const handleAnswer = (questionId: number, answerIdx: number) => {
    setTriviaQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId && q.answered === null) {
          const isCorrect = answerIdx === q.correctIndex;
          if (isCorrect) {
            toast(`🎉 ¡Correcto! +${q.score} puntos`);
          } else {
            toast(`❌ Incorrecto. La respuesta era: ${q.options[q.correctIndex]}`);
          }
          return { ...q, answered: answerIdx };
        }
        return q;
      })
    );
  };

  const handleCreateCapsule = () => {
    if (!capsuleTitle.trim()) { toast('⚠️ Escribe un título para la cápsula'); return; }
    if (!capsuleDate) { toast('⚠️ Elige la fecha de apertura'); return; }
    toast(`⏳ ¡Cápsula "${capsuleTitle}" creada! Se abrirá el ${capsuleDate}`);
    setShowCreateModal(false);
    setCapsuleTitle('');
    setCapsuleDate('');
    setCapsuleMessage('');
  };

  return (
    <div className="min-h-screen pb-8" style={{ background: 'var(--rf-bg)' }}>
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C' }}>
          Cápsulas & Trivia
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginTop: '4px' }}>
          Mensajes del futuro y desafíos familiares
        </p>
      </div>

      {/* Time Capsules Section */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={24} color="#8B5E3C" />
          <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.5rem', color: '#2D2D2D' }}>
            Cápsulas del Tiempo
          </h2>
        </div>

        <div className="space-y-4">
          {capsules.map((capsule) => (
            <div key={capsule.id} className="p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.08)', border: '2px solid #B2AC88' }}>
              <div className="absolute top-4 right-4 opacity-10">
                <Lock size={80} color="#8B5E3C" />
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.375rem', color: '#2D2D2D', marginBottom: '8px' }}>{capsule.title}</h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#8B5E3C', marginBottom: '12px' }}>De: {capsule.from}</p>
                  </div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lock size={28} color="#8B5E3C" />
                  </div>
                </div>

                <div className="p-4 mb-4" style={{ backgroundColor: 'var(--rf-bg)', borderRadius: '16px' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#8B5E3C', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Se desbloquea</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', color: '#2D2D2D', fontWeight: 600 }}>{capsule.unlockDate}</p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C', fontWeight: 700, lineHeight: '1' }}>{capsule.daysLeft}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#6B6B6B', marginTop: '4px' }}>días</p>
                    </div>
                  </div>
                </div>

                <div style={{ width: '100%', height: '8px', backgroundColor: '#F5EDD3', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min((1 - capsule.daysLeft / 365) * 100, 100)}%`, height: '100%', backgroundColor: '#8B5E3C', borderRadius: '4px' }} />
                </div>

                {capsule.daysLeft <= 5 && (
                  <button
                    onClick={() => toast(`🎁 ¡Abriendo cápsula "${capsule.title}"!`)}
                    className="w-full mt-4"
                    style={{ padding: '14px', fontSize: '1rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '52px' }}
                  >
                    <Clock size={18} /> ¡Abrir Cápsula Ahora!
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          style={{ width: '100%', marginTop: '16px', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-card)', color: '#8B5E3C', border: '2px solid #8B5E3C', borderRadius: '16px', cursor: 'pointer', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <Plus size={22} /> Crear Nueva Cápsula
        </button>
      </div>

      {/* Trivia Section */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={24} color="#8B5E3C" />
          <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.5rem', color: '#2D2D2D' }}>Trivia Familiar</h2>
        </div>

        <div className="space-y-4">
          {allTrivia.map((trivia, idx) => {
            return (
              <div key={trivia.id} className="p-6" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.08)' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Star size={24} color="white" fill="white" />
                  </div>
                  <div className="flex-1">
                    <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.125rem', color: '#2D2D2D', marginBottom: '8px', lineHeight: '1.4' }}>
                      {trivia.question}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#8B5E3C', fontWeight: 600 }}>+{trivia.score} puntos</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#6B6B6B' }}>{trivia.players} jugadores</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {trivia.options.map((answer, ansIdx) => {
                    const isAnswered = trivia.answered !== null;
                    const isSelected = trivia.answered === ansIdx;
                    const isCorrect = ansIdx === trivia.correctIndex;
                    let bg = '#FFF3DD';
                    let borderColor = 'transparent';
                    let textColor = '#2D2D2D';
                    if (isAnswered) {
                      if (isCorrect) { bg = '#E8F5E9'; borderColor = '#4CAF50'; textColor = '#2D2D2D'; }
                      else if (isSelected) { bg = '#FEECEC'; borderColor = '#C44536'; textColor = '#2D2D2D'; }
                    }

                    return (
                      <button
                        key={ansIdx}
                        onClick={() => handleAnswer(trivia.id, ansIdx)}
                        disabled={isAnswered}
                        style={{
                          width: '100%', padding: '16px 20px', fontSize: '1rem', fontWeight: 500,
                          fontFamily: 'Inter, sans-serif', backgroundColor: bg, color: textColor,
                          border: `2px solid ${borderColor}`, borderRadius: '16px',
                          cursor: isAnswered ? 'default' : 'pointer',
                          textAlign: 'left', transition: 'all 0.2s', minHeight: '56px',
                          display: 'flex', alignItems: 'center', gap: '12px',
                          opacity: isAnswered && !isSelected && !isCorrect ? 0.5 : 1
                        }}
                        onMouseEnter={(e) => { if (!isAnswered) { e.currentTarget.style.borderColor = '#8B5E3C'; e.currentTarget.style.backgroundColor = 'white'; } }}
                        onMouseLeave={(e) => { if (!isAnswered) { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.backgroundColor = '#FFF3DD'; } }}
                      >
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: `2px solid ${isAnswered && isCorrect ? '#4CAF50' : isAnswered && isSelected ? '#C44536' : '#8B5E3C'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', color: isAnswered && isCorrect ? '#4CAF50' : isAnswered && isSelected ? '#C44536' : '#8B5E3C', flexShrink: 0 }}>
                          {isAnswered && isCorrect ? <Check size={14} /> : isAnswered && isSelected ? '✗' : String.fromCharCode(65 + ansIdx)}
                        </div>
                        {answer}
                      </button>
                    );
                  })}
                </div>

                {trivia.answered !== null && (
                  <div className="mt-4 p-3" style={{ backgroundColor: trivia.answered === trivia.correctIndex ? '#E8F5E9' : '#FFF3DD', borderRadius: '12px' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#2D2D2D', textAlign: 'center' }}>
                      {trivia.answered === trivia.correctIndex ? `🎉 ¡Excelente! +${trivia.score} puntos ganados` : `💡 Sigue intentando en la próxima trivia`}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => { setShowAllTrivia(!showAllTrivia); if (!showAllTrivia) toast('📚 Cargando más preguntas...'); }}
          style={{ width: '100%', marginTop: '16px', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          {showAllTrivia ? 'Ver Menos' : 'Ver Todas las Trivias'} <ChevronRight size={20} style={{ transform: showAllTrivia ? 'rotate(270deg)' : 'rotate(90deg)' }} />
        </button>
      </div>

      {/* Create Capsule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-end justify-center z-50" style={{ backgroundColor: 'rgba(45, 45, 45, 0.6)' }} onClick={() => setShowCreateModal(false)}>
          <div className="w-full max-w-2xl mx-4 mb-4" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', padding: '32px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#8B5E3C' }}>Nueva Cápsula</h2>
              <button onClick={() => setShowCreateModal(false)} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={22} color="#8B5E3C" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Título de la Cápsula</label>
                <input type="text" value={capsuleTitle} onChange={(e) => setCapsuleTitle(e.target.value)} placeholder="Ej: Mensaje para mis nietos" style={{ width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', border: '2px solid rgba(139, 94, 60, 0.2)', borderRadius: '14px', color: '#2D2D2D', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fecha de Apertura</label>
                <input type="date" value={capsuleDate} onChange={(e) => setCapsuleDate(e.target.value)} style={{ width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', border: '2px solid rgba(139, 94, 60, 0.2)', borderRadius: '14px', color: '#2D2D2D', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mensaje (opcional)</label>
                <textarea value={capsuleMessage} onChange={(e) => setCapsuleMessage(e.target.value)} placeholder="Escribe un mensaje especial para el futuro..." rows={4} style={{ width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', border: '2px solid rgba(139, 94, 60, 0.2)', borderRadius: '14px', color: '#2D2D2D', outline: 'none', resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>
            </div>

            <button onClick={handleCreateCapsule} style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Lock size={22} /> Crear Cápsula del Tiempo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
