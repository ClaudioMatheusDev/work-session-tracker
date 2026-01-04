import React, { useState } from 'react';
import { usePomodoro } from '../hooks/usePomodoro';
import { PomodoroTimer, PomodoroSettings, PomodoroStats } from '../components/Pomodoro';
import { Button } from '../components/UI';
import './PomodoroPage.css';

/**
 * Página principal do Pomodoro
 */
const PomodoroPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const pomodoro = usePomodoro();

  // Solicitar permissão para notificações ao carregar
  React.useEffect(() => {
    pomodoro.requestNotificationPermission();
  }, [pomodoro]);

  return (
    <div className="pomodoro-page">
      <div className="pomodoro-page-header">
        <h1 className="page-title">🍅 Pomodoro Timer</h1>
        <p className="page-subtitle">
          Técnica Pomodoro para melhorar seu foco e produtividade
        </p>
        <Button
          variant="secondary"
          onClick={() => setShowSettings(!showSettings)}
          className="settings-toggle-btn"
        >
          {showSettings ? '❌ Fechar Configurações' : '⚙️ Configurações'}
        </Button>
      </div>

      {showSettings && (
        <PomodoroSettings
          settings={pomodoro.settings}
          onUpdate={pomodoro.updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <PomodoroTimer
        timeLeft={pomodoro.timeLeft}
        isRunning={pomodoro.isRunning}
        currentMode={pomodoro.currentMode}
        sessionsCompleted={pomodoro.sessionsCompleted}
        onToggle={pomodoro.toggleTimer}
        onReset={pomodoro.resetTimer}
        onSkip={pomodoro.skipToNext}
        formatTime={pomodoro.formatTime}
        progress={pomodoro.progress}
      />

      <PomodoroStats
        totalPomodoros={pomodoro.totalPomodoros}
        sessionsCompleted={pomodoro.sessionsCompleted}
        settings={pomodoro.settings}
        onReset={pomodoro.resetStats}
      />
    </div>
  );
};

export default PomodoroPage;
