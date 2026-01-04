import React from 'react';
import './PomodoroTimer.css';
import { Button } from '../UI';

/**
 * Componente principal do Timer Pomodoro
 */
const PomodoroTimer = ({
  timeLeft,
  isRunning,
  currentMode,
  sessionsCompleted,
  onToggle,
  onReset,
  onSkip,
  formatTime,
  progress,
}) => {
  const getModeInfo = () => {
    switch (currentMode) {
      case 'work':
        return {
          title: '🎯 Foco no Trabalho',
          color: '#ef4444',
          emoji: '⏰',
        };
      case 'shortBreak':
        return {
          title: '☕ Pausa Curta',
          color: '#10b981',
          emoji: '😌',
        };
      case 'longBreak':
        return {
          title: '🌴 Pausa Longa',
          color: '#3b82f6',
          emoji: '🎉',
        };
      default:
        return {
          title: '🎯 Pomodoro',
          color: '#667eea',
          emoji: '⏰',
        };
    }
  };

  const modeInfo = getModeInfo();

  return (
    <div className="pomodoro-timer" style={{ '--mode-color': modeInfo.color }}>
      <div className="pomodoro-header">
        <h2 className="pomodoro-title">{modeInfo.title}</h2>
        <div className="pomodoro-sessions">
          <span className="sessions-label">Pomodoros Completos:</span>
          <span className="sessions-count">{sessionsCompleted}</span>
        </div>
      </div>

      <div className="timer-circle-container">
        <svg className="progress-ring" width="300" height="300">
          <circle
            className="progress-ring-circle-bg"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="transparent"
            r="140"
            cx="150"
            cy="150"
          />
          <circle
            className="progress-ring-circle"
            stroke={modeInfo.color}
            strokeWidth="12"
            strokeLinecap="round"
            fill="transparent"
            r="140"
            cx="150"
            cy="150"
            style={{
              strokeDasharray: `${2 * Math.PI * 140}`,
              strokeDashoffset: `${2 * Math.PI * 140 * (1 - progress() / 100)}`,
              transition: 'stroke-dashoffset 1s linear',
            }}
          />
        </svg>
        
        <div className="timer-display">
          <div className="timer-emoji">{modeInfo.emoji}</div>
          <div className="timer-time">{formatTime(timeLeft)}</div>
          <div className="timer-mode">{currentMode === 'work' ? 'Trabalhando' : 'Pausa'}</div>
        </div>
      </div>

      <div className="timer-controls">
        <Button
          variant={isRunning ? 'secondary' : 'primary'}
          onClick={onToggle}
          className="control-btn control-btn-main"
        >
          {isRunning ? '⏸ Pausar' : '▶ Iniciar'}
        </Button>
        
        <Button
          variant="secondary"
          onClick={onReset}
          className="control-btn"
          disabled={isRunning}
        >
          🔄 Resetar
        </Button>
        
        <Button
          variant="secondary"
          onClick={onSkip}
          className="control-btn"
        >
          ⏭ Pular
        </Button>
      </div>

      <div className="timer-info">
        <p className="info-text">
          {currentMode === 'work' 
            ? 'Mantenha o foco! Você está no modo trabalho.' 
            : 'Relaxe e descanse. Você merece!'}
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
