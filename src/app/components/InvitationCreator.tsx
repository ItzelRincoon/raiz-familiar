import { useState } from 'react';
import { Send, Sparkles, X, Calendar, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export function InvitationCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState('carne-asada');
  const [showPreview, setShowPreview] = useState(false);
  const [eventTitle, setEventTitle] = useState('Carne Asada en el Rancho');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('14:00');
  const [eventLocation, setEventLocation] = useState('El Rancho de la Familia');
  const [eventMessage, setEventMessage] = useState('¡Nos encantaría que nos acompañes en este día especial!');

  const templates = [
    { id: 'carne-asada', name: 'Carne Asada', emoji: '🥩', color: '#C44536' },
    { id: 'boda', name: 'Boda', emoji: '💒', color: '#B2AC88' },
    { id: 'cumpleanos', name: 'Cumpleaños', emoji: '🎂', color: '#8B5E3C' },
  ];

  const currentTemplate = templates.find((t) => t.id === selectedTemplate)!;

  const handleTemplateChange = (id: string) => {
    setSelectedTemplate(id);
    const defaults: Record<string, { title: string; location: string; msg: string }> = {
      'carne-asada': { title: 'Carne Asada en el Rancho', location: 'El Rancho de la Familia', msg: '¡Nos encantaría que nos acompañes en este día especial!' },
      'boda': { title: 'Nuestra Boda', location: 'Hacienda El Paraíso', msg: '¡Es el día más especial de nuestras vidas y queremos compartirlo contigo!' },
      'cumpleanos': { title: 'Celebración de Cumpleaños', location: 'Casa de la Familia', msg: '¡Ven a celebrar este día tan especial con nosotros!' },
    };
    setEventTitle(defaults[id].title);
    setEventLocation(defaults[id].location);
    setEventMessage(defaults[id].msg);
  };

  const handleWhatsApp = () => {
    const dateStr = eventDate ? new Date(eventDate).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Fecha por confirmar';
    const text = encodeURIComponent(
      `${currentTemplate.emoji} *${eventTitle}*\n\n📅 ${dateStr}\n🕒 ${eventTime} hrs\n📍 ${eventLocation}\n\n${eventMessage}\n\n_Enviado desde Raíz Familiar_ 🌳`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    toast('📱 Abriendo WhatsApp...');
  };

  const inputStyle = {
    width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif',
    backgroundColor: 'var(--rf-bg)', border: '2px solid rgba(139, 94, 60, 0.2)',
    borderRadius: '12px', color: '#2D2D2D', outline: 'none'
  };

  return (
    <div className="min-h-screen pb-8" style={{ background: 'var(--rf-bg)' }}>
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C' }}>Crear Invitación</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginTop: '4px' }}>Invita a tu familia con estilo</p>
      </div>

      {/* Template Selection */}
      <div className="px-6 mb-6">
        <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          Tipo de Evento
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {templates.map((template) => (
            <button key={template.id} onClick={() => handleTemplateChange(template.id)} style={{ padding: '20px 12px', backgroundColor: selectedTemplate === template.id ? 'white' : '#F5EDD3', border: selectedTemplate === template.id ? `3px solid ${template.color}` : 'none', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s', minHeight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '2.5rem' }}>{template.emoji}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', fontWeight: selectedTemplate === template.id ? 600 : 500, color: selectedTemplate === template.id ? template.color : '#6B6B6B' }}>
                {template.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="px-6 mb-6">
        <div className="p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(139, 94, 60, 0.12)' }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: currentTemplate.color }} />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-15" style={{ background: '#B2AC88' }} />

          <div className="relative">
            <div className="text-center mb-6">
              <span style={{ fontSize: '4rem', marginBottom: '16px', display: 'block' }}>
                {currentTemplate.emoji}
              </span>
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C', marginBottom: '16px' }}>
                ¡Estás Invitado!
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Título del Evento
                </label>
                <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} style={inputStyle} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Fecha</label>
                  <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={inputStyle} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
                </div>
                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Hora</label>
                  <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} style={inputStyle} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Ubicación</label>
                <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} style={inputStyle} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>

              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Mensaje Especial</label>
                <textarea value={eventMessage} onChange={(e) => setEventMessage(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 space-y-3">
        <button
          onClick={handleWhatsApp}
          style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '60px' }}
        >
          <Send size={22} />
          Enviar por WhatsApp
        </button>
        <button
          onClick={() => setShowPreview(true)}
          style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-card)', color: '#8B5E3C', border: '2px solid #8B5E3C', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '60px' }}
        >
          <Sparkles size={22} />
          Vista Previa
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-6" style={{ backgroundColor: 'rgba(45, 45, 45, 0.7)' }} onClick={() => setShowPreview(false)}>
          <div style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', width: '100%', maxWidth: '400px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            {/* Preview header */}
            <div className="relative flex items-center justify-center py-10" style={{ background: `linear-gradient(135deg, ${currentTemplate.color}88 0%, ${currentTemplate.color} 100%)` }}>
              <button onClick={() => setShowPreview(false)} style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={20} color="#2D2D2D" />
              </button>
              <div className="text-center">
                <span style={{ fontSize: '5rem', display: 'block', marginBottom: '8px' }}>{currentTemplate.emoji}</span>
                <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                  ¡Estás Invitado!
                </h2>
              </div>
            </div>

            <div className="p-6">
              <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.5rem', color: '#2D2D2D', marginBottom: '20px', textAlign: 'center' }}>
                {eventTitle}
              </h3>

              <div className="space-y-3 mb-6">
                {eventDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: 'var(--rf-bg)', borderRadius: '14px' }}>
                    <Calendar size={20} color="#8B5E3C" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#2D2D2D' }}>
                      {new Date(eventDate).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: 'var(--rf-bg)', borderRadius: '14px' }}>
                  <Clock size={20} color="#8B5E3C" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#2D2D2D' }}>{eventTime} hrs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: 'var(--rf-bg)', borderRadius: '14px' }}>
                  <MapPin size={20} color="#8B5E3C" />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#2D2D2D' }}>{eventLocation}</span>
                </div>
              </div>

              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: '#6B6B6B', textAlign: 'center', fontStyle: 'italic', marginBottom: '24px', lineHeight: '1.6' }}>
                "{eventMessage}"
              </p>

              <button
                onClick={() => { setShowPreview(false); handleWhatsApp(); }}
                style={{ width: '100%', padding: '18px', fontSize: '1.0625rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '58px' }}
              >
                <Send size={20} /> Enviar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
