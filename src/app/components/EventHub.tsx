import { useState } from 'react';
import { QrCode, Calendar, Users, MapPin, Image as ImageIcon, X, Check, Plus, Download } from 'lucide-react';
import { toast } from 'sonner';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  rsvp: number;
  total: number;
  type: string;
  description: string;
}

export function EventHub() {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Boda de Ana & Miguel', date: '15 Jun 2026', location: 'Hacienda El Paraíso', rsvp: 45, total: 60, type: 'wedding', description: 'Celebración de matrimonio en la hacienda familiar. Vestimenta formal. Confirmar antes del 1 de junio.' },
    { id: 2, name: 'Carne Asada Familiar', date: '2 Jun 2026', location: 'El Rancho de la Familia', rsvp: 23, total: 30, type: 'gathering', description: 'Reunión mensual familiar. Traer algo para compartir. Niños bienvenidos.' },
    { id: 3, name: 'Cumpleaños Abuela María', date: '10 Jul 2026', location: 'Casa de Papá Carlos', rsvp: 38, total: 50, type: 'birthday', description: '83 años de nuestra querida abuela. Habrá mole y tamales. Sorpresa especial a las 7pm.' },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showQR, setShowQR] = useState<Event | null>(null);
  const [rsvpDone, setRsvpDone] = useState<Set<number>>(new Set());
  const guestPhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleRSVP = (event: Event) => {
    if (rsvpDone.has(event.id)) {
      toast('✅ Ya confirmaste tu asistencia a este evento');
      return;
    }
    setEvents((prev) => prev.map((e) => e.id === event.id ? { ...e, rsvp: e.rsvp + 1 } : e));
    setRsvpDone((prev) => new Set(prev).add(event.id));
    setSelectedEvent((prev) => prev && prev.id === event.id ? { ...prev, rsvp: prev.rsvp + 1 } : prev);
    toast(`🎉 ¡Asistencia confirmada para ${event.name}!`);
  };

  const handlePhotoUpload = () => {
    toast('📸 Función de subir fotos disponible próximamente');
  };

  const handleDownloadQR = () => {
    toast('⬇️ Código QR guardado en tu galería');
  };

  return (
    <div className="min-h-screen pb-8" style={{ background: 'var(--rf-bg)' }}>
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C' }}>
          Eventos Familiares
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginTop: '4px' }}>
          Celebraciones y reuniones
        </p>
      </div>

      {/* Event List */}
      <div className="px-6 mb-6 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="p-6" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.08)' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.375rem', color: '#2D2D2D', marginBottom: '8px' }}>
                  {event.name}
                </h3>
                <div className="flex flex-col gap-2">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={16} /> {event.date}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={16} /> {event.location}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#8B5E3C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={16} /> {event.rsvp}/{event.total} confirmados
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div style={{ width: '100%', height: '8px', backgroundColor: '#F5EDD3', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(event.rsvp / event.total) * 100}%`, height: '100%', backgroundColor: '#8B5E3C', borderRadius: '4px', transition: 'width 0.4s' }} />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedEvent(event)}
                style={{ flex: 1, padding: '14px', fontSize: '1rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', minHeight: '52px' }}
              >
                Ver Detalles
              </button>
              <button
                onClick={() => setShowQR(event)}
                style={{ width: '52px', height: '52px', backgroundColor: '#B2AC88', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <QrCode size={24} color="white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Event: Wedding Hub */}
      <div className="px-6 mb-6">
        <div className="p-6" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(139, 94, 60, 0.12)', border: '2px solid #B2AC88' }}>
          <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.5rem', color: '#8B5E3C', marginBottom: '16px' }}>
            Boda de Ana & Miguel
          </h3>

          {/* QR Section */}
          <div className="mb-6 p-5" style={{ backgroundColor: 'var(--rf-bg)', borderRadius: '16px' }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Código QR del Evento
              </span>
              <button onClick={handleDownloadQR} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#8B5E3C', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}>
                <Download size={16} /> Guardar
              </button>
            </div>
            <div className="flex justify-center p-4">
              <div style={{ width: '160px', height: '160px', backgroundColor: 'var(--rf-card)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #8B5E3C' }}>
                <QrCode size={120} color="#2D2D2D" />
              </div>
            </div>
            <p style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#6B6B6B', marginTop: '12px' }}>
              Escanea para compartir fotos
            </p>
          </div>

          {/* Live Gallery */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', fontWeight: 600, color: '#2D2D2D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={20} /> Galería en Vivo
              </h4>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#8B5E3C', fontWeight: 600 }}>
                {guestPhotos.length} fotos
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {guestPhotos.map((photo, idx) => (
                <button
                  key={photo}
                  onClick={() => toast('🖼️ Foto en pantalla completa próximamente')}
                  style={{
                    aspectRatio: idx % 5 === 0 ? '1/1.3' : idx % 3 === 0 ? '1/0.8' : '1/1',
                    backgroundColor: '#F5EDD3', borderRadius: '12px', overflow: 'hidden',
                    position: 'relative', border: 'none', cursor: 'pointer', padding: 0
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, #B2AC88 0%, #8B5E3C 100%)`, opacity: 0.3 }}>
                    <ImageIcon size={24} color="white" opacity={0.6} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePhotoUpload}
            style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <Plus size={22} /> Subir Foto
          </button>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-end justify-center z-50" style={{ backgroundColor: 'rgba(45, 45, 45, 0.6)' }} onClick={() => setSelectedEvent(null)}>
          <div className="w-full max-w-2xl mx-4 mb-4" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', padding: '32px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#8B5E3C', marginBottom: '8px' }}>
                  {selectedEvent.name}
                </h2>
                <div className="flex flex-col gap-2">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={18} /> {selectedEvent.date}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} /> {selectedEvent.location}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedEvent(null)} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <X size={24} color="#8B5E3C" />
              </button>
            </div>

            <div className="p-5 mb-6" style={{ backgroundColor: 'var(--rf-bg)', borderRadius: '20px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: '#2D2D2D', lineHeight: '1.7' }}>
                {selectedEvent.description}
              </p>
            </div>

            {/* RSVP Counter */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#2D2D2D' }}>
                  Confirmaciones
                </span>
                <span style={{ fontFamily: 'Merriweather, serif', fontSize: '1.25rem', color: '#8B5E3C', fontWeight: 700 }}>
                  {selectedEvent.rsvp}/{selectedEvent.total}
                </span>
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: '#F5EDD3', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${(selectedEvent.rsvp / selectedEvent.total) * 100}%`, height: '100%', backgroundColor: '#8B5E3C', borderRadius: '5px', transition: 'width 0.4s' }} />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleRSVP(selectedEvent)}
                style={{
                  flex: 1, padding: '18px', fontSize: '1.125rem', fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: rsvpDone.has(selectedEvent.id) ? '#B2AC88' : '#8B5E3C',
                  color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '60px'
                }}
              >
                {rsvpDone.has(selectedEvent.id) ? <><Check size={22} /> Confirmado</> : '¡Confirmar Asistencia!'}
              </button>
              <button onClick={() => { setShowQR(selectedEvent); setSelectedEvent(null); }} style={{ width: '60px', height: '60px', backgroundColor: 'var(--rf-bg)', border: '2px solid #8B5E3C', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <QrCode size={28} color="#8B5E3C" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(45, 45, 45, 0.7)' }} onClick={() => setShowQR(null)}>
          <div className="w-full max-w-sm mx-6" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQR(null)} style={{ position: 'absolute', top: '16px', right: '16px', width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={20} color="#8B5E3C" />
            </button>

            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.375rem', color: '#8B5E3C', marginBottom: '8px' }}>
              {showQR.name}
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#6B6B6B', marginBottom: '24px' }}>
              Comparte este código con tu familia
            </p>

            <div style={{ width: '200px', height: '200px', backgroundColor: 'var(--rf-bg)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #8B5E3C', margin: '0 auto 24px' }}>
              <QrCode size={150} color="#2D2D2D" />
            </div>

            <button onClick={handleDownloadQR} style={{ width: '100%', padding: '18px', fontSize: '1.0625rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '58px' }}>
              <Download size={20} /> Descargar QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
