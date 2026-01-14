import { useState } from 'react';
import { ArrowLeft, Save, Camera, Plus } from 'lucide-react';

interface UserData {
    name: string;
    avatar: string;
    location: string;
    bio?: string;
    job?: string;
    education?: string;
    height?: string;
    bodyType?: string;
    relationshipStatus?: string;
    religion?: string;
    languages?: string[];
    [key: string]: any;
}

interface ProfileEditViewProps {
  onBack: () => void;
  user: UserData;
  onSave: (updates: any) => void;
}

export default function ProfileEditView({ onBack, user, onSave }: ProfileEditViewProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    location: user.location || '',
    bio: user.bio || '',
    job: user.job || '',
    education: user.education || '',
    height: user.height || '',
    bodyType: user.bodyType || '',
    relationshipStatus: user.relationshipStatus || '',
    religion: user.religion || '',
    languages: user.languages?.join(', ') || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({
        ...formData,
        languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean)
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Editar Perfil</h1>
        </div>

        {/* Photos Section */}
        <div>
            <h3 className="font-semibold text-gray-900 mb-3">Suas Fotos</h3>
            <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-purple-100 rounded-xl flex items-center justify-center text-4xl border-2 border-purple-500 relative">
                    {user.avatar}
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm">
                         <Camera size={12} className="text-purple-600" />
                    </div>
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="aspect-square bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                        <Plus size={24} />
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Adicione até 6 fotos para mostrar quem você é.</p>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Informações Básicas</h3>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
            </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minha História (Bio)</label>
                <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder="Conte um pouco sobre você..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
            </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Sobre Mim</h3>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Altura</label>
                    <input
                        type="text"
                        value={formData.height}
                        onChange={(e) => handleChange('height', e.target.value)}
                        placeholder="Ex: 1.75m"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Físico</label>
                    <select
                        value={formData.bodyType}
                        onChange={(e) => handleChange('bodyType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                        <option value="">Selecione</option>
                        <option value="Atlético">Atlético</option>
                        <option value="Médio">Médio</option>
                        <option value="Magro">Magro</option>
                        <option value="Plus Size">Plus Size</option>
                    </select>
                </div>
            </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status de Relacionamento</label>
                <select
                    value={formData.relationshipStatus}
                    onChange={(e) => handleChange('relationshipStatus', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                >
                    <option value="">Selecione</option>
                    <option value="Solteiro(a)">Solteiro(a)</option>
                    <option value="Divorciado(a)">Divorciado(a)</option>
                    <option value="Viúvo(a)">Viúvo(a)</option>
                    <option value="Separado(a)">Separado(a)</option>
                </select>
            </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profissão</label>
                <input
                    type="text"
                    value={formData.job}
                    onChange={(e) => handleChange('job', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Educação</label>
                <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => handleChange('education', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Religião / Crenças</label>
                <input
                    type="text"
                    value={formData.religion}
                    onChange={(e) => handleChange('religion', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idiomas (separados por vírgula)</label>
                <input
                    type="text"
                    value={formData.languages}
                    onChange={(e) => handleChange('languages', e.target.value)}
                    placeholder="Português, Inglês, Espanhol..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
            </div>

        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all flex items-center justify-center gap-2"
        >
          <Save size={20} />
          <span>Salvar Alterações</span>
        </button>
      </div>
    </div>
  );
}
