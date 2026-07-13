import { useState, useEffect, useRef } from 'react';
import { Mic, Play, Pause, Heart, Clock, X, Square, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Memory {
  id: number;
  name: string;
  title: string;
  duration: string;
  time: string;
  likes: number;
  liked: boolean;
  playing: boolean;
}

const WAVE_HEIGHTS = Array.from({ length: 40 }, () => Math.floor(Math.random() * 70) + 15);

export function HomeDashboard() {
  const [memories, setMemories] = useState<Memory[]>([
    { id: 1, name: 'Abuela María', title: 'Recuerdo de la cosecha', duration: '2:34', time: 'Hace 2 horas', likes: 12, liked: false, playing: false },
    { id: 2, name: 'Tío Roberto', title: 'Historia del rancho', duration: '4:12', time: 'Ayer', likes: 8, liked: false, playing: false },
    { id: 3, name: 'Mamá Carmen', title: 'Canción de cuna', duration: '1:45', time: 'Hace 3 días', likes: 15, liked: true, playing: false },
  ]);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingDone, setRecordingDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => setRecordingSeconds((s) => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRecording]);

  const formatSeconds = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const togglePlay = (id: number) => {
    setMemories((prev) => prev.map((m) => {
      if (m.id === id) {
        if (!m.playing) toast('▶️ Reproduciendo memoria...');
        return { ...m, playing: !m.playing };
      }
      return { ...m, playing: false };
    }));
  };

  const toggleLike = (id: number) => {
    setMemories((prev) => prev.map((m) => {
      if (m.id === id) {
        const nowLiked = !m.liked;
        toast(nowLiked ? '❤️ ¡Me encanta este recuerdo!' : '🤍 Like removido');
        return { ...m, liked: nowLiked, likes: nowLiked ? m.likes + 1 : m.likes - 1 };
      }
      return m;
    }));
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setRecordingDone(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingDone(true);
  };

  const closeModal = () => {
    if (isRecording) return;
    setShowRecordModal(false);
    setIsRecording(false);
    setRecordingSeconds(0);
    setRecordingDone(false);
  };

  const saveRecording = () => {
    toast('🎙️ ¡Memoria de voz guardada! Tu familia podrá escucharla.');
    setShowRecordModal(false);
    setIsRecording(false);
    setRecordingSeconds(0);
    setRecordingDone(false);
  };

  return (
    <>
      {/* CSS for waveform animation */}
      <style>{`
        @keyframes wave-bar {
          0%   { transform: scaleY(0.25); }
          100% { transform: scaleY(1); }
        }
        .wave-bar-anim {
          animation: wave-bar var(--dur, 0.4s) ease-in-out infinite alternate;
          transform-origin: center;
        }
      `}</style>

      <div className="min-h-screen pb-28" style={{ background: 'var(--rf-bg)' }}>
        {/* Header */}
        <div className="p-6 pb-4">
          <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C', marginBottom: '8px' }}>
            ¡Hola, Familia!
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B' }}>
            Jueves, 12 de Junio
          </p>
        </div>

        {/* Pregunta de la Semana */}
        <div className="px-6 mb-6">
          <div className="p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(139, 94, 60, 0.12)', border: '2px solid #B2AC88' }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: '#B2AC88' }} />
            <div className="relative">
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#8B5E3C', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Pregunta de la Semana
              </span>
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.5rem', color: '#2D2D2D', marginTop: '12px', marginBottom: '16px', lineHeight: '1.4' }}>
                ¿Cuál es tu recuerdo favorito de las fiestas familiares?
              </h2>
              <button
                onClick={() => setShowRecordModal(true)}
                style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', minHeight: '52px', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <Mic size={20} />
                Responder con Audio
              </button>
            </div>
          </div>
        </div>

        {/* Memorias Recientes */}
        <div className="px-6">
          <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.25rem', color: '#2D2D2D', marginBottom: '16px' }}>
            Memorias Recientes
          </h3>

          <div className="space-y-4">
            {memories.map((memory) => (
              <div key={memory.id} className="p-5" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.08)' }}>
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => togglePlay(memory.id)}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: memory.playing ? '#B2AC88' : '#8B5E3C', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background-color 0.2s' }}
                  >
                    {memory.playing ? <Pause size={24} color="white" fill="white" /> : <Play size={24} color="white" fill="white" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', marginBottom: '4px' }}>{memory.name}</p>
                    <h4 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.125rem', color: '#2D2D2D', marginBottom: '8px' }}>{memory.title}</h4>

                    {/* Static waveform */}
                    <div className="flex items-center gap-0.5 mb-3" style={{ height: '32px' }}>
                      {WAVE_HEIGHTS.map((h, i) => (
                        <div key={i} style={{ width: '3px', height: `${h}%`, backgroundColor: '#B2AC88', borderRadius: '2px', opacity: 0.55 }} />
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} /> {memory.time}
                        </span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#8B5E3C' }}>{memory.duration}</span>
                      </div>
                      <button onClick={() => toggleLike(memory.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '4px' }}>
                        <Heart size={18} color={memory.liked ? '#C44536' : '#B2AC88'} fill={memory.liked ? '#C44536' : 'none'} style={{ transition: 'all 0.2s' }} />
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: memory.liked ? '#C44536' : '#6B6B6B', fontWeight: memory.liked ? 600 : 400 }}>{memory.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAB */}
        <button
          onClick={() => setShowRecordModal(true)}
          style={{ position: 'fixed', bottom: '96px', right: '24px', width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#8B5E3C', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 24px rgba(139, 94, 60, 0.4)', zIndex: 100 }}
        >
          <Mic size={32} color="white" />
        </button>
      </div>

      {/* Recording Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 flex items-end justify-center z-50" style={{ backgroundColor: 'rgba(45, 45, 45, 0.6)' }} onClick={closeModal}>
          <div className="w-full max-w-2xl mx-4 mb-4" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', padding: '32px', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#8B5E3C' }}>
                Grabar Memoria
              </h2>
              {!isRecording && (
                <button onClick={closeModal} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={22} color="#8B5E3C" />
                </button>
              )}
            </div>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginBottom: '24px', textAlign: 'center' }}>
              {recordingDone ? '¡Grabación lista! Guárdala para que tu familia la escuche.'
                : isRecording ? 'Grabando tu memoria de voz...'
                : 'Comparte un recuerdo con tu familia en audio'}
            </p>

            {/* Animated waveform */}
            <div className="flex items-center justify-center gap-1 mb-2" style={{ height: '64px' }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={isRecording ? 'wave-bar-anim' : ''}
                  style={{
                    width: '5px',
                    height: recordingDone ? `${WAVE_HEIGHTS[i % 40] * 0.5}%` : isRecording ? '80%' : '18%',
                    backgroundColor: recordingDone ? '#B2AC88' : isRecording ? '#C44536' : '#D4C9B8',
                    borderRadius: '3px',
                    transition: !isRecording ? 'height 0.3s, background-color 0.3s' : 'none',
                    ['--dur' as string]: `${0.2 + (i % 7) * 0.06}s`,
                  }}
                />
              ))}
            </div>

            {/* Timer */}
            {isRecording && (
              <p style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#C44536', marginBottom: '8px' }}>
                {formatSeconds(recordingSeconds)}
              </p>
            )}
            <div style={{ height: '24px' }} />

            {/* Buttons */}
            <div className="flex gap-3">
              {!isRecording && !recordingDone && (
                <button onClick={startRecording} style={{ flex: 1, padding: '20px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#C44536', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '64px' }}>
                  <Mic size={24} /> Empezar a Grabar
                </button>
              )}
              {isRecording && (
                <button onClick={stopRecording} style={{ flex: 1, padding: '20px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '64px' }}>
                  <Square size={22} fill="white" /> Detener ({formatSeconds(recordingSeconds)})
                </button>
              )}
              {recordingDone && (
                <>
                  <button onClick={() => { setRecordingDone(false); setRecordingSeconds(0); }} style={{ padding: '20px 24px', fontSize: '1rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', color: '#8B5E3C', border: '2px solid #8B5E3C', borderRadius: '16px', cursor: 'pointer', minHeight: '64px' }}>
                    Repetir
                  </button>
                  <button onClick={saveRecording} style={{ flex: 1, padding: '20px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '64px' }}>
                    <Check size={24} /> Guardar Memoria
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
