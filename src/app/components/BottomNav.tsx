import { Home, Users, Calendar, BookOpen, Lock, AlertCircle, Plus, Settings } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'tree', icon: Users, label: 'Árbol' },
    { id: 'events', icon: Calendar, label: 'Eventos' },
    { id: 'cookbook', icon: BookOpen, label: 'Recetas' },
    { id: 'more', icon: Settings, label: 'Más' },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'var(--rf-card)',
        borderTop: '2px solid var(--rf-border-light, rgba(139, 94, 60, 0.15))',
        boxShadow: '0 -4px 24px rgba(139, 94, 60, 0.08)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                flex: 1,
                padding: '12px 8px',
                backgroundColor: isActive ? 'var(--rf-bg)' : 'transparent',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                minHeight: '68px'
              }}
            >
              <Icon
                size={24}
                color={isActive ? '#8B5E3C' : '#6B6B6B'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#8B5E3C' : '#6B6B6B'
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
