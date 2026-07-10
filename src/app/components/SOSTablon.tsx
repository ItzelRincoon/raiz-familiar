import { useState } from 'react';
import { AlertCircle, MapPin, Phone, Clock, ShoppingCart, Wrench, Heart, X, Check, Plus, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Request {
  id: number;
  author: string;
  message: string;
  type: string;
  location: string;
  time: string;
  responses: number;
  helped: boolean;
}

export function SOSTablon() {
  const [requests, setRequests] = useState<Request[]>([
    { id: 1, author: 'Tía Rosa', message: 'Voy al súper, ¿alguien necesita algo?', type: 'shopping', location: 'Walmart Centro', time: 'Hace 15 min', responses: 3, helped: false },
    { id: 2, author: 'Diego', message: '¿Alguien tiene un desarmador Phillips? Lo necesito urgente', type: 'tools', location: 'Casa de Mamá', time: 'Hace 1 hora', responses: 5, helped: false },
    { id: 3, author: 'Mamá Carmen', message: '¿Quién puede ayudarme con la comida del domingo?', type: 'help', location: 'Mi casa', time: 'Hace 2 horas', responses: 7, helped: false },
  ]);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [showCallConfirm, setShowCallConfirm] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState('help');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'shopping': return <ShoppingCart size={20} />;
      case 'tools': return <Wrench size={20} />;
      case 'help': return <Heart size={20} />;
      default: return <AlertCircle size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'shopping': return '#B2AC88';
      case 'tools': return '#8B5E3C';
      case 'help': return '#C44536';
      default: return '#6B6B6B';
    }
  };

  const handleHelp = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === id && !r.helped) {
          toast(`✅ ¡Ofreciste ayuda! La familia lo sabrá.`);
          return { ...r, helped: true, responses: r.responses + 1 };
        }
        return r;
      })
    );
  };

  const handleLocationShare = () => {
    setLocationShared(!locationShared);
    toast(locationShared ? '📍 Ubicación dejada de compartir' : '📍 ¡Ubicación compartida con la familia!');
  };

  const handleNewRequest = () => {
    if (!newMessage.trim()) { toast('⚠️ Escribe tu solicitud'); return; }
    const newReq: Request = {
      id: Date.now(), author: 'Tú', message: newMessage,
      type: newType, location: newLocation || 'Mi ubicación',
      time: 'Ahora mismo', responses: 0, helped: false
    };
    setRequests((prev) => [newReq, ...prev]);
    toast('📢 ¡Solicitud publicada! Tu familia la verá.');
    setShowNewRequest(false);
    setNewMessage('');
    setNewLocation('');
    setNewType('help');
  };

  const handleComments = (req: Request) => {
    toast(`💬 ${req.responses} respuesta${req.responses !== 1 ? 's' : ''} de la familia`);
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--rf-bg)' }}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle size={32} color="#8B5E3C" />
          <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C' }}>
            S.O.S. Tablón
          </h1>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B' }}>
          Ayuda rápida entre familia
        </p>
      </div>

      {/* Emergency Call Button */}
      <div className="px-6 mb-6">
        <button
          onClick={() => setShowCallConfirm(true)}
          style={{ width: '100%', padding: '24px', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Inter, sans-serif', backgroundColor: '#C44536', color: 'white', border: 'none', borderRadius: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(196, 69, 54, 0.3)', minHeight: '80px' }}
        >
          <Phone size={28} />
          Llamar para Ayuda Urgente
        </button>
      </div>

      {/* Active Requests */}
      <div className="px-6 mb-6">
        <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.25rem', color: '#2D2D2D', marginBottom: '16px' }}>
          Solicitudes Activas
        </h3>

        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="p-6" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.08)', borderLeft: `6px solid ${getTypeColor(request.type)}` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: getTypeColor(request.type), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    {getTypeIcon(request.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', marginBottom: '4px' }}>
                      {request.author}
                    </p>
                    <p style={{ fontFamily: 'Merriweather, serif', fontSize: '1.125rem', color: '#2D2D2D', lineHeight: '1.5', marginBottom: '12px' }}>
                      {request.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 mb-4" style={{ backgroundColor: 'var(--rf-bg)', borderRadius: '16px' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} color="#8B5E3C" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#2D2D2D' }}>{request.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} color="#6B6B6B" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#6B6B6B' }}>{request.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleHelp(request.id)}
                  style={{
                    flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: request.helped ? '#B2AC88' : '#8B5E3C',
                    color: 'white', border: 'none', borderRadius: '12px', cursor: request.helped ? 'default' : 'pointer',
                    minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background-color 0.2s'
                  }}
                >
                  {request.helped ? <><Check size={18} /> Ayuda Ofrecida</> : 'Yo Puedo Ayudar'}
                </button>
                <button
                  onClick={() => handleComments(request)}
                  style={{ padding: '16px', fontSize: '1rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', color: '#8B5E3C', border: '2px solid #8B5E3C', borderRadius: '12px', cursor: 'pointer', minWidth: '80px', minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <MessageCircle size={16} /> {request.responses}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Sharing */}
      <div className="px-6">
        <div className="p-6" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '24px', boxShadow: '0 8px 24px rgba(139, 94, 60, 0.12)', border: '2px solid #B2AC88' }}>
          <div className="flex items-center gap-3 mb-4">
            <MapPin size={24} color="#8B5E3C" />
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.375rem', color: '#2D2D2D' }}>Compartir Ubicación</h3>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginBottom: '20px', lineHeight: '1.6' }}>
            Permite que tu familia sepa dónde estás cuando necesites ayuda o estés disponible para ayudar.
          </p>
          <div className="mb-4" style={{ height: '200px', backgroundColor: '#F5EDD3', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(139, 94, 60, 0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #B2AC88 0%, #8B5E3C 50%, #B2AC88 100%)', opacity: 0.1 }} />
            <div className="relative text-center">
              <MapPin size={48} color={locationShared ? '#8B5E3C' : '#B2AC88'} style={{ transition: 'color 0.3s' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: locationShared ? '#8B5E3C' : '#6B6B6B', marginTop: '12px', fontWeight: locationShared ? 600 : 400, transition: 'all 0.3s' }}>
                {locationShared ? '✅ Compartiendo tu ubicación...' : 'Mapa de ubicaciones familiares'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLocationShare}
            style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: locationShared ? '#B2AC88' : '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '60px', transition: 'background-color 0.2s' }}
          >
            <MapPin size={20} />
            {locationShared ? 'Dejar de Compartir' : 'Compartir Mi Ubicación'}
          </button>
        </div>
      </div>

      {/* FAB - New Request */}
      <button
        onClick={() => setShowNewRequest(true)}
        style={{ position: 'fixed', bottom: '96px', right: '24px', width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#8B5E3C', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 24px rgba(139, 94, 60, 0.4)', zIndex: 100, fontSize: '2rem', color: 'white' }}
      >
        <Plus size={32} />
      </button>

      {/* Call Confirm Modal */}
      {showCallConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-6" style={{ backgroundColor: 'rgba(45, 45, 45, 0.7)' }} onClick={() => setShowCallConfirm(false)}>
          <div style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FEECEC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Phone size={40} color="#C44536" />
            </div>
            <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#2D2D2D', marginBottom: '12px' }}>
              Llamada de Emergencia
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginBottom: '32px', lineHeight: '1.6' }}>
              ¿Deseas notificar a toda la familia con una llamada de ayuda urgente?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowCallConfirm(false)} style={{ flex: 1, padding: '18px', fontSize: '1rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', color: '#8B5E3C', border: '2px solid #8B5E3C', borderRadius: '16px', cursor: 'pointer', minHeight: '56px' }}>
                Cancelar
              </button>
              <button onClick={() => { toast('📞 ¡Alerta enviada a toda la familia!'); setShowCallConfirm(false); }} style={{ flex: 1, padding: '18px', fontSize: '1rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#C44536', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', minHeight: '56px' }}>
                Llamar Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 flex items-end justify-center z-50" style={{ backgroundColor: 'rgba(45, 45, 45, 0.6)' }} onClick={() => setShowNewRequest(false)}>
          <div className="w-full max-w-2xl mx-4 mb-4" style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', padding: '32px', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#8B5E3C' }}>Nueva Solicitud</h2>
              <button onClick={() => setShowNewRequest(false)} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={22} color="#8B5E3C" />
              </button>
            </div>

            {/* Type selector */}
            <div className="mb-4">
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tipo de ayuda</label>
              <div className="flex gap-3">
                {[{ id: 'help', label: 'Ayuda', icon: Heart }, { id: 'shopping', label: 'Compras', icon: ShoppingCart }, { id: 'tools', label: 'Herramientas', icon: Wrench }].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button key={t.id} onClick={() => setNewType(t.id)} style={{ flex: 1, padding: '12px 8px', backgroundColor: newType === t.id ? '#FFF3DD' : 'transparent', border: `2px solid ${newType === t.id ? '#8B5E3C' : 'rgba(139,94,60,0.2)'}`, borderRadius: '14px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
                      <Icon size={20} color={newType === t.id ? '#8B5E3C' : '#6B6B6B'} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: newType === t.id ? 600 : 500, color: newType === t.id ? '#8B5E3C' : '#6B6B6B' }}>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>¿Qué necesitas?</label>
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Describe lo que necesitas..." rows={3} style={{ width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', border: '2px solid rgba(139, 94, 60, 0.2)', borderRadius: '14px', color: '#2D2D2D', outline: 'none', resize: 'none' }} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ubicación</label>
                <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Ej: Mi casa, Casa de Mamá..." style={{ width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--rf-bg)', border: '2px solid rgba(139, 94, 60, 0.2)', borderRadius: '14px', color: '#2D2D2D', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#8B5E3C'} onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'} />
              </div>
            </div>

            <button onClick={handleNewRequest} style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <AlertCircle size={22} /> Publicar Solicitud
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
