import { Plus, Lock, AlertCircle, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function MoreMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };
  const menuItems = [
    { id: 'invitation', icon: Plus, label: 'Crear Invitación', color: '#8B5E3C', description: 'Invita a eventos familiares' },
    { id: 'capsules', icon: Lock, label: 'Cápsulas & Trivia', color: '#B2AC88', description: 'Mensajes del futuro y juegos' },
    { id: 'sos', icon: AlertCircle, label: 'S.O.S. Tablón', color: '#C44536', description: 'Ayuda rápida entre familia' },
  ];

  const settingsItems = [
    { id: 'settings', icon: Settings, label: 'Configuración' },
    { id: 'logout', icon: LogOut, label: 'Cerrar Sesión' },
  ];

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--rf-bg)' }}>
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 style={{
          fontFamily: 'Merriweather, serif',
          fontSize: '2rem',
          color: '#8B5E3C',
        }}>
          Más Opciones
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginTop: '4px' }}>
          Explora todas las funciones
        </p>
      </div>

      {/* Main Menu Items */}
      <div className="px-6 mb-8">
        <div className="space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="w-full text-left"
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--rf-card)',
                  borderRadius: '24px',
                  boxShadow: '0 4px 12px rgba(139, 94, 60, 0.08)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    backgroundColor: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={32} color="white" />
                </div>
                <div className="flex-1">
                  <h3 style={{
                    fontFamily: 'Merriweather, serif',
                    fontSize: '1.25rem',
                    color: '#2D2D2D',
                    marginBottom: '4px'
                  }}>
                    {item.label}
                  </h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9375rem',
                    color: '#6B6B6B'
                  }}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-6">
        <h3 style={{
          fontFamily: 'Merriweather, serif',
          fontSize: '1.25rem',
          color: '#2D2D2D',
          marginBottom: '16px'
        }}>
          Cuenta
        </h3>
        <div className="space-y-3">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'logout') {
                    logout();
                    navigate('/login');
                  } else if (item.id === 'settings') {
                    navigate('/settings');
                  } else {
                    toast('⚙️ Función disponible próximamente');
                  }
                }}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  backgroundColor: 'var(--rf-card)',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(139, 94, 60, 0.06)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  minHeight: '60px'
                }}
              >
                <Icon size={22} color="#6B6B6B" />
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: '#2D2D2D',
                  fontWeight: 500
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
