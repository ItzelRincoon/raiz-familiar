import { useState, useEffect } from 'react';
import { Bell, Shield, Eye, Globe, Moon, ChevronRight, User, Volume2, X, Camera, Check } from 'lucide-react';
import { toast } from 'sonner';

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: '56px', height: '32px', borderRadius: '16px',
        backgroundColor: active ? '#8B5E3C' : '#D4C9B8',
        border: 'none', cursor: 'pointer',
        position: 'relative', transition: 'background-color 0.25s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: '4px',
        left: active ? '28px' : '4px',
        width: '24px', height: '24px', borderRadius: '50%',
        backgroundColor: 'white',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        transition: 'left 0.25s',
      }} />
    </button>
  );
}

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileName, setProfileName] = useState('Mi Perfil');
  const [profileBio, setProfileBio] = useState('Miembro de la Familia García');
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      toast(next ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado');
      return next;
    });
  };

  const openProfileEdit = () => {
    setEditName(profileName);
    setEditBio(profileBio);
    setShowProfileEdit(true);
  };

  const saveProfile = () => {
    if (!editName.trim()) { toast('⚠️ El nombre no puede estar vacío'); return; }
    setProfileName(editName.trim());
    setProfileBio(editBio.trim());
    setShowProfileEdit(false);
    toast('✅ Perfil actualizado');
  };

  const sections = [
    {
      title: 'Notificaciones',
      items: [
        { icon: Bell, label: 'Notificaciones push', description: 'Recibe alertas de la familia', type: 'toggle' as const, value: notifications, onToggle: () => { setNotifications((p) => !p); toast(!notifications ? '🔔 Notificaciones activadas' : '🔕 Notificaciones desactivadas'); } },
        { icon: Volume2, label: 'Sonidos', description: 'Sonidos al recibir mensajes', type: 'toggle' as const, value: soundEnabled, onToggle: () => { setSoundEnabled((p) => !p); toast(!soundEnabled ? '🔊 Sonidos activados' : '🔇 Sonidos desactivados'); } },
      ],
    },
    {
      title: 'Privacidad',
      items: [
        { icon: Eye, label: 'Perfil privado', description: 'Solo familia puede ver tu perfil', type: 'toggle' as const, value: privateProfile, onToggle: () => { setPrivateProfile((p) => !p); toast(!privateProfile ? '🔒 Perfil privado activado' : '🔓 Perfil público'); } },
        { icon: Shield, label: 'Seguridad', description: 'Contraseña y verificación', type: 'navigate' as const, value: false, onToggle: () => toast('🔐 Función disponible próximamente') },
      ],
    },
    {
      title: 'Apariencia',
      items: [
        { icon: Moon, label: 'Modo oscuro', description: darkMode ? 'Activo — fondo oscuro' : 'Inactivo — fondo claro', type: 'toggle' as const, value: darkMode, onToggle: toggleDarkMode },
      ],
    },
    {
      title: 'General',
      items: [
        { icon: Globe, label: 'Idioma', description: 'Español', type: 'navigate' as const, value: false, onToggle: () => toast('🌎 Más idiomas próximamente') },
      ],
    },
  ];

  const cardBg = darkMode ? '#2B2018' : 'var(--rf-card)';
  const textMain = darkMode ? '#F0E8D8' : '#2D2D2D';
  const textMuted = darkMode ? '#A89880' : '#6B6B6B';
  const surfaceBg = darkMode ? '#231910' : 'var(--rf-bg)';

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--rf-bg)' }}>
      <div className="p-6 pb-4">
        <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C' }}>
          Configuración
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: textMuted, marginTop: '4px' }}>
          Personaliza tu experiencia
        </p>
      </div>

      {/* Profile Card */}
      <div className="px-6 mb-6">
        <button
          onClick={openProfileEdit}
          className="w-full text-left"
          style={{ padding: '20px', backgroundColor: cardBg, borderRadius: '24px', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#8B5E3C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={36} color="white" />
          </div>
          <div className="flex-1">
            <h3 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.25rem', color: textMain, marginBottom: '4px' }}>{profileName}</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#8B5E3C' }}>{profileBio}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: textMuted, marginTop: '4px' }}>
              Código: GARCIA2024
            </p>
          </div>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: surfaceBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ChevronRight size={20} color="#8B5E3C" />
          </div>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: '#8B5E3C', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              {section.title}
            </h3>
            <div style={{ backgroundColor: cardBg, borderRadius: '24px', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.06)', overflow: 'hidden' }}>
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{ padding: '20px', borderBottom: idx < section.items.length - 1 ? `1px solid ${darkMode ? 'rgba(255,200,140,0.1)' : 'rgba(178,172,136,0.2)'}` : 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: surfaceBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={22} color="#8B5E3C" />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: textMain, marginBottom: '2px' }}>{item.label}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: textMuted }}>{item.description}</p>
                    </div>
                    {item.type === 'toggle'
                      ? <Toggle active={item.value} onToggle={item.onToggle} />
                      : <button onClick={item.onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><ChevronRight size={20} color="#B2AC88" /></button>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mt-8 text-center">
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#B2AC88' }}>
          Raíz Familiar v1.0.0 · Con ❤️ para la familia
        </p>
      </div>

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 flex items-end justify-center z-50" style={{ backgroundColor: 'rgba(45, 45, 45, 0.65)' }} onClick={() => setShowProfileEdit(false)}>
          <div className="w-full max-w-2xl mx-4 mb-4" style={{ backgroundColor: cardBg, borderRadius: '32px', padding: '32px', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#8B5E3C' }}>Editar Perfil</h2>
              <button onClick={() => setShowProfileEdit(false)} style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: surfaceBg, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={22} color="#8B5E3C" />
              </button>
            </div>

            {/* Avatar picker */}
            <div className="flex justify-center mb-6">
              <div style={{ position: 'relative', width: '96px', height: '96px' }}>
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: '#8B5E3C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={48} color="white" />
                </div>
                <button
                  onClick={() => toast('📸 Selección de foto próximamente')}
                  style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#B2AC88', border: '3px solid var(--rf-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <Camera size={14} color="white" />
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Nombre
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Tu nombre en la familia"
                  style={{ width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', backgroundColor: surfaceBg, border: '2px solid rgba(139, 94, 60, 0.2)', borderRadius: '14px', color: textMain, outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#8B5E3C'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Descripción / Rol en la familia
                </label>
                <input
                  type="text"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Ej: Abuela, el alma de la familia"
                  style={{ width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', backgroundColor: surfaceBg, border: '2px solid rgba(139, 94, 60, 0.2)', borderRadius: '14px', color: textMain, outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#8B5E3C'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'}
                />
              </div>
            </div>

            <button
              onClick={saveProfile}
              style={{ width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600, fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '60px' }}
            >
              <Check size={22} /> Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
