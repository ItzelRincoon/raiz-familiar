import { Outlet, useLocation, useNavigate } from 'react-router';
import { BottomNav } from './BottomNav';

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeScreen = location.pathname.split('/')[1] || 'home';

  const handleNavigate = (screen: string) => {
    navigate(`/${screen}`);
  };

  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        <Outlet />
      </div>
      <BottomNav activeScreen={activeScreen} onNavigate={handleNavigate} />
    </div>
  );
}
