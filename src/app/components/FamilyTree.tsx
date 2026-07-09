import { useState } from 'react';
import { X, ChevronRight, Plus, Mic, Image, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  birth: string;
  bio: string;
  x: number;
  y: number;
  generation: number;
}

type ModalView = 'profile' | 'legacy' | 'add';

export function FamilyTree() {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [modalView, setModalView] = useState<ModalView>('profile');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newBirth, setNewBirth] = useState('');

  const familyMembers: FamilyMember[] = [
    { id: 1, name: 'Abuelo José', relation: 'Patriarca', birth: '1940', bio: 'Fundador de la tradición familiar de las reuniones dominicales. Trabajó toda su vida en el campo y enseñó a sus hijos el valor del trabajo duro.', x: 50, y: 10, generation: 1 },
    { id: 2, name: 'Abuela María', relation: 'Matriarca', birth: '1943', bio: 'Guardiana de las recetas familiares. Su cocina siempre estuvo llena de amor y sus historias mantienen viva nuestra historia.', x: 50, y: 25, generation: 1 },
    { id: 3, name: 'Papá Carlos', relation: 'Padre', birth: '1968', bio: 'Heredó el amor por la tierra de su padre. Expandió el negocio familiar y siempre priorizó la unión familiar.', x: 30, y: 45, generation: 2 },
    { id: 4, name: 'Mamá Carmen', relation: 'Madre', birth: '1970', bio: 'Maestra de profesión y corazón. Organizadora de todas las celebraciones familiares.', x: 30, y: 60, generation: 2 },
    { id: 5, name: 'Tío Roberto', relation: 'Tío', birth: '1972', bio: 'El contador de historias de la familia. Documentó nuestra genealogía completa.', x: 70, y: 45, generation: 2 },
    { id: 6, name: 'Sofía', relation: 'Hija', birth: '1995', bio: 'Primera de la familia en estudiar en el extranjero. Mantiene vivas las tradiciones a distancia.', x: 20, y: 80, generation: 3 },
    { id: 7, name: 'Diego', relation: 'Hijo', birth: '1998', bio: 'Chef profesional que fusiona las recetas tradicionales con técnicas modernas.', x: 40, y: 80, generation: 3 },
  ];

  const legacyMemories = [
    { id: 1, type: 'audio', label: 'Historia del rancho', duration: '3:12' },
    { id: 2, type: 'photo', label: 'Boda 1965', duration: '' },
    { id: 3, type: 'audio', label: 'Consejos de vida', duration: '1:45' },
    { id: 4, type: 'photo', label: 'Cosecha 1978', duration: '' },
  ];

  const openMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setModalView('profile');
  };

  const closeModal = () => {
    setSelectedMember(null);
    setModalView('profile');
  };

  const saveNewMember = () => {
    if (!newName.trim()) {
      toast('⚠️ Escribe el nombre del familiar');
      return;
    }
    toast(`✅ ${newName} agregado al árbol familiar`);
    setShowAddModal(false);
    setNewName('');
    setNewRelation('');
    setNewBirth('');
  };

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--rf-bg)', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="p-6 pb-4 flex items-start justify-between">
        <div>
          <h1 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C' }}>
            Árbol Familiar
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B', marginTop: '4px' }}>
            Explora tu legado familiar
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            width: '52px', height: '52px', borderRadius: '50%',
            backgroundColor: '#8B5E3C', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(139, 94, 60, 0.3)',
            marginTop: '4px'
          }}
        >
          <Plus size={26} color="white" />
        </button>
      </div>

      {/* Tree Visualization */}
      <div className="px-6">
        <div className="relative" style={{
          backgroundColor: 'var(--rf-card)', borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(139, 94, 60, 0.12)',
          padding: '32px 20px', minHeight: '600px'
        }}>
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ borderRadius: '24px' }}>
            <line x1="50%" y1="17.5%" x2="30%" y2="52.5%" stroke="#B2AC88" strokeWidth="2" opacity="0.4" />
            <line x1="50%" y1="17.5%" x2="70%" y2="52.5%" stroke="#B2AC88" strokeWidth="2" opacity="0.4" />
            <line x1="30%" y1="52.5%" x2="20%" y2="80%" stroke="#B2AC88" strokeWidth="2" opacity="0.4" />
            <line x1="30%" y1="52.5%" x2="40%" y2="80%" stroke="#B2AC88" strokeWidth="2" opacity="0.4" />
          </svg>

          {/* Family Member Nodes */}
          {familyMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => openMember(member)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${member.x}%`,
                top: `${member.y}%`,
                padding: '16px 20px',
                backgroundColor: member.generation === 1 ? '#8B5E3C' : member.generation === 2 ? '#B2AC88' : 'white',
                border: member.generation === 3 ? '3px solid #8B5E3C' : 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(139, 94, 60, 0.15)',
                minWidth: '140px',
                minHeight: '68px',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
            >
              <p style={{ fontFamily: 'Merriweather, serif', fontSize: '1rem', fontWeight: 700, color: member.generation === 3 ? '#2D2D2D' : 'white', marginBottom: '4px' }}>
                {member.name}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: member.generation === 3 ? '#6B6B6B' : 'rgba(255,255,255,0.9)' }}>
                {member.relation} · {member.birth}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 flex items-end justify-center z-50"
          style={{ backgroundColor: 'rgba(45, 45, 45, 0.6)' }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-2xl mx-4 mb-4"
            style={{
              backgroundColor: 'var(--rf-card)', borderRadius: '32px',
              maxHeight: '85vh', overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {modalView === 'profile' ? (
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '2rem', color: '#8B5E3C', marginBottom: '8px' }}>
                      {selectedMember.name}
                    </h2>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#6B6B6B' }}>
                      {selectedMember.relation} · Nacido en {selectedMember.birth}
                    </p>
                  </div>
                  <button onClick={closeModal} style={{
                    width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)',
                    border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}>
                    <X size={24} color="#8B5E3C" />
                  </button>
                </div>

                <div className="mb-6">
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Biografía
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem', color: '#2D2D2D', lineHeight: '1.7' }}>
                    {selectedMember.bio}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => toast(`🎙️ Agregar audio para ${selectedMember.name}`)}
                    style={{
                      padding: '16px', backgroundColor: 'var(--rf-bg)', color: '#8B5E3C',
                      border: '2px solid #8B5E3C', borderRadius: '14px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', fontWeight: 600
                    }}
                  >
                    <Mic size={18} /> Audio
                  </button>
                  <button
                    onClick={() => toast(`📸 Agregar foto para ${selectedMember.name}`)}
                    style={{
                      padding: '16px', backgroundColor: 'var(--rf-bg)', color: '#8B5E3C',
                      border: '2px solid #8B5E3C', borderRadius: '14px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', fontWeight: 600
                    }}
                  >
                    <Image size={18} /> Foto
                  </button>
                  <button
                    onClick={() => setModalView('legacy')}
                    style={{
                      flex: 1, padding: '16px', fontSize: '1rem', fontWeight: 600,
                      fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white',
                      border: 'none', borderRadius: '14px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '56px'
                    }}
                  >
                    Ver Legado Completo <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setModalView('profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    <ChevronRight size={24} color="#8B5E3C" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#8B5E3C' }}>
                    Legado de {selectedMember.name}
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  {legacyMemories.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4" style={{
                      backgroundColor: 'var(--rf-bg)', borderRadius: '16px'
                    }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        backgroundColor: '#8B5E3C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        {item.type === 'audio' ? <Mic size={22} color="white" /> : <Image size={22} color="white" />}
                      </div>
                      <div className="flex-1">
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#2D2D2D' }}>
                          {item.label}
                        </p>
                        {item.duration && (
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#8B5E3C' }}>
                            {item.duration}
                          </p>
                        )}
                      </div>
                      <button onClick={() => toast(`▶️ Reproduciendo: ${item.label}`)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <ChevronRight size={20} color="#8B5E3C" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { toast(`❤️ Memoria de ${selectedMember.name} marcada como favorita`); }}
                  style={{
                    width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600,
                    fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white',
                    border: 'none', borderRadius: '16px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', minHeight: '60px'
                  }}
                >
                  <Heart size={20} fill="white" /> Guardar en Favoritos
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 flex items-end justify-center z-50"
          style={{ backgroundColor: 'rgba(45, 45, 45, 0.6)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-2xl mx-4 mb-4"
            style={{ backgroundColor: 'var(--rf-card)', borderRadius: '32px', padding: '32px', boxShadow: '0 20px 60px rgba(139, 94, 60, 0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: 'Merriweather, serif', fontSize: '1.75rem', color: '#8B5E3C' }}>
                Agregar Familiar
              </h2>
              <button onClick={() => setShowAddModal(false)} style={{
                width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--rf-bg)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
              }}>
                <X size={22} color="#8B5E3C" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { label: 'Nombre completo', value: newName, setter: setNewName, placeholder: 'Ej: Ana García' },
                { label: 'Relación familiar', value: newRelation, setter: setNewRelation, placeholder: 'Ej: Hija, Sobrino, Abuelo...' },
                { label: 'Año de nacimiento', value: newBirth, setter: setNewBirth, placeholder: 'Ej: 1985' },
              ].map((field) => (
                <div key={field.label}>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#8B5E3C', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', padding: '16px', fontSize: '1rem', fontFamily: 'Inter, sans-serif',
                      backgroundColor: 'var(--rf-bg)', border: '2px solid rgba(139, 94, 60, 0.2)',
                      borderRadius: '14px', color: '#2D2D2D', outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8B5E3C'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(139, 94, 60, 0.2)'}
                  />
                </div>
              ))}
            </div>

            <button onClick={saveNewMember} style={{
              width: '100%', padding: '18px', fontSize: '1.125rem', fontWeight: 600,
              fontFamily: 'Inter, sans-serif', backgroundColor: '#8B5E3C', color: 'white',
              border: 'none', borderRadius: '16px', cursor: 'pointer', minHeight: '60px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
            }}>
              <Plus size={22} /> Agregar al Árbol
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
