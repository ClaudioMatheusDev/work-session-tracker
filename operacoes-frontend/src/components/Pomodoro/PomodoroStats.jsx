import React from 'react';
import './PomodoroStats.css';
import { Card, Button } from '../UI';

/**
 * Componente para exibir estatísticas do Pomodoro
 */
const PomodoroStats = ({ totalPomodoros, sessionsCompleted, settings, onReset }) => {
  const totalWorkMinutes = totalPomodoros * settings.workTime;
  const totalHours = Math.floor(totalWorkMinutes / 60);
  const remainingMinutes = totalWorkMinutes % 60;

  const completeCycles = Math.floor(sessionsCompleted / settings.sessionsUntilLongBreak);
  const currentCycleProgress = sessionsCompleted % settings.sessionsUntilLongBreak;

  return (
    <Card title="📊 Estatísticas Pomodoro" className="pomodoro-stats">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍅</div>
          <div className="stat-value">{totalPomodoros}</div>
          <div className="stat-label">Pomodoros Totais</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">
            {totalHours}h {remainingMinutes}m
          </div>
          <div className="stat-label">Tempo de Foco</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-value">{completeCycles}</div>
          <div className="stat-label">Ciclos Completos</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">
            {currentCycleProgress}/{settings.sessionsUntilLongBreak}
          </div>
          <div className="stat-label">Progresso Atual</div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Progresso até Pausa Longa</span>
          <span className="progress-percentage">
            {Math.round((currentCycleProgress / settings.sessionsUntilLongBreak) * 100)}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${(currentCycleProgress / settings.sessionsUntilLongBreak) * 100}%`,
            }}
          />
        </div>
      </div>

      {totalPomodoros > 0 && (
        <div className="stats-actions">
          <Button variant="secondary" onClick={onReset} className="reset-stats-btn">
            🗑️ Resetar Estatísticas
          </Button>
        </div>
      )}

      <div className="stats-tips">
        <h4 className="tips-title">💡 Dicas da Técnica Pomodoro:</h4>
        <ul className="tips-list">
          <li>🎯 Foque 100% durante os 25 minutos de trabalho</li>
          <li>📵 Elimine todas as distrações (redes sociais, notificações)</li>
          <li>☕ Use as pausas para descansar de verdade</li>
          <li>🚶 Levante-se e movimente-se nas pausas longas</li>
          <li>📝 Anote ideias que surgirem para não perder o foco</li>
        </ul>
      </div>
    </Card>
  );
};

export default PomodoroStats;
