import { TreePine } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export function OnboardingScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEnter = (code: string) => {
    if (code.trim()) {
      login(code);
      navigate('/home');
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: 'var(--rf-bg)' }}>
      <div className="w-full max-w-md space-y-8">
        {/* Tree Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl opacity-30" style={{ background: '#B2AC88' }}></div>
            <TreePine size={120} strokeWidth={1.5} style={{ color: '#8B5E3C' }} className="relative" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2.5rem', color: '#2D2D2D', fontWeight: 700 }}>
            Raíz Familiar
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', color: '#6B6B6B' }}>
            Conecta con tu legado familiar
          </p>
        </div>

        {/* Input Card */}
        <div
          className="p-8 shadow-lg"
          style={{
            backgroundColor: 'var(--rf-card)',
            borderRadius: '24px',
            boxShadow: '0 8px 24px rgba(139, 94, 60, 0.12)'
          }}
        >
          <label
            htmlFor="familyCode"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#8B5E3C',
              display: 'block',
              marginBottom: '12px',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}
          >
            Código Familiar
          </label>
          <input
            id="familyCode"
            type="text"
            placeholder="Ingresa tu código"
            style={{
              width: '100%',
              padding: '18px 20px',
              fontSize: '1.25rem',
              fontFamily: 'Inter, sans-serif',
              backgroundColor: 'var(--rf-bg)',
              border: '2px solid rgba(139, 94, 60, 0.2)',
              borderRadius: '16px',
              color: '#2D2D2D',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#8B5E3C'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleEnter((e.target as HTMLInputElement).value);
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.getElementById('familyCode') as HTMLInputElement;
              handleEnter(input.value);
            }}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '18px',
              fontSize: '1.125rem',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              backgroundColor: '#8B5E3C',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              minHeight: '60px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 94, 60, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Entrar
          </button>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#6B6B6B',
          fontFamily: 'Inter, sans-serif',
          marginTop: '24px'
        }}>
          ¿No tienes código? Contacta a tu familia
        </p>
      </div>
    </div>
  );
}
