import React, { useState } from 'react';
import './PomodoroSettings.css';
import { Card, Input, Button } from '../UI';

/**
 * Componente para configurar o Timer Pomodoro
 */
const PomodoroSettings = ({ settings, onUpdate, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (field, value) => {
    const numValue = parseInt(value) || 1;
    setLocalSettings((prev) => ({
      ...prev,
      [field]: Math.max(1, Math.min(numValue, 60)), // Entre 1 e 60 minutos
    }));
  };

  const handleSave = () => {
    onUpdate(localSettings);
    if (onClose) onClose();
  };

  const handleReset = () => {
    const defaultSettings = {
      workTime: 25,
      shortBreak: 5,
      longBreak: 15,
      sessionsUntilLongBreak: 4,
    };
    setLocalSettings(defaultSettings);
  };

  return (
    <Card title="⚙️ Configurações do Pomodoro" className="pomodoro-settings">
      <div className="settings-grid">
        <Input
          type="number"
          label="⏰ Tempo de Trabalho (minutos)"
          value={localSettings.workTime}
          onChange={(e) => handleChange('workTime', e.target.value)}
          min="1"
          max="60"
        />

        <Input
          type="number"
          label="☕ Pausa Curta (minutos)"
          value={localSettings.shortBreak}
          onChange={(e) => handleChange('shortBreak', e.target.value)}
          min="1"
          max="60"
        />

        <Input
          type="number"
          label="🌴 Pausa Longa (minutos)"
          value={localSettings.longBreak}
          onChange={(e) => handleChange('longBreak', e.target.value)}
          min="1"
          max="60"
        />

        <Input
          type="number"
          label="🔢 Pomodoros até Pausa Longa"
          value={localSettings.sessionsUntilLongBreak}
          onChange={(e) => handleChange('sessionsUntilLongBreak', e.target.value)}
          min="1"
          max="10"
        />
      </div>

      <div className="settings-info">
        <p className="info-item">
          📌 <strong>Técnica Pomodoro:</strong> Trabalhe por {localSettings.workTime} minutos
        </p>
        <p className="info-item">
          ☕ Pausa curta de {localSettings.shortBreak} minutos
        </p>
        <p className="info-item">
          🌴 A cada {localSettings.sessionsUntilLongBreak} pomodoros, pausa longa de {localSettings.longBreak} minutos
        </p>
      </div>

      <div className="settings-actions">
        <Button variant="secondary" onClick={handleReset}>
          🔄 Valores Padrão
        </Button>
        <Button variant="primary" onClick={handleSave}>
          💾 Salvar Configurações
        </Button>
      </div>
    </Card>
  );
};

export default PomodoroSettings;
