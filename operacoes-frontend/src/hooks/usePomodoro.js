import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook customizado para gerenciar o Timer Pomodoro
 */
export const usePomodoro = () => {
  // Configurações padrão (em minutos)
  const [settings, setSettings] = useState({
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4,
  });

  // Estado do timer
  const [timeLeft, setTimeLeft] = useState(settings.workTime * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState('work'); 
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalPomodoros, setTotalPomodoros] = useState(0);

  const intervalRef = useRef(null);
  const audioRef = useRef(null);


  useEffect(() => {
    
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRQ0PVqvn77BdGAg+ltryxnMnBSl+zPLaizsIGGS57OihUhELTKXh8bllHAU2jdXzzn0vBSF1xe/glEILD1ms6O6rWBUIQJva8sFuJAUuhM/y1YU5BxpqvOzooll==');
  }, []);


  const getInitialTime = useCallback((mode) => {
    switch (mode) {
      case 'work':
        return settings.workTime * 60;
      case 'shortBreak':
        return settings.shortBreak * 60;
      case 'longBreak':
        return settings.longBreak * 60;
      default:
        return settings.workTime * 60;
    }
  }, [settings]);


  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);


  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    

    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Não foi possível tocar o áudio:', err));
    }


    if ('Notification' in window && Notification.permission === 'granted') {
      const messages = {
        work: 'Pomodoro concluído! Hora de fazer uma pausa.',
        shortBreak: 'Pausa curta finalizada! Pronto para trabalhar?',
        longBreak: 'Pausa longa finalizada! Vamos voltar ao trabalho!',
      };
      new Notification('Pomodoro Timer', {
        body: messages[currentMode],
        icon: '/favicon.ico',
      });
    }


    if (currentMode === 'work') {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      setTotalPomodoros((prev) => prev + 1);


      if (newSessionsCompleted % settings.sessionsUntilLongBreak === 0) {
        setCurrentMode('longBreak');
        setTimeLeft(settings.longBreak * 60);
      } else {
        setCurrentMode('shortBreak');
        setTimeLeft(settings.shortBreak * 60);
      }
    } else {

      setCurrentMode('work');
      setTimeLeft(settings.workTime * 60);
    }
  }, [currentMode, sessionsCompleted, settings]);

  // Iniciar/Pausar timer
  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  // Resetar timer
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getInitialTime(currentMode));
  }, [currentMode, getInitialTime]);

  // Pular para próximo modo
  const skipToNext = useCallback(() => {
    setIsRunning(false);
    
    if (currentMode === 'work') {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      
      if (newSessionsCompleted % settings.sessionsUntilLongBreak === 0) {
        setCurrentMode('longBreak');
        setTimeLeft(settings.longBreak * 60);
      } else {
        setCurrentMode('shortBreak');
        setTimeLeft(settings.shortBreak * 60);
      }
    } else {
      setCurrentMode('work');
      setTimeLeft(settings.workTime * 60);
    }
  }, [currentMode, sessionsCompleted, settings]);

  // Atualizar configurações
  const updateSettings = useCallback((newSettings) => {
    setSettings(newSettings);
    setIsRunning(false);
    setCurrentMode('work');
    setTimeLeft(newSettings.workTime * 60);
  }, []);


  const resetStats = useCallback(() => {
    setSessionsCompleted(0);
    setTotalPomodoros(0);
  }, []);


  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);


  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);


  const progress = useCallback(() => {
    const total = getInitialTime(currentMode);
    return ((total - timeLeft) / total) * 100;
  }, [timeLeft, currentMode, getInitialTime]);

  return {

    timeLeft,
    isRunning,
    currentMode,
    sessionsCompleted,
    totalPomodoros,
    settings,
    

    toggleTimer,
    resetTimer,
    skipToNext,
    updateSettings,
    resetStats,
    requestNotificationPermission,
    formatTime,
    progress,
  };
};
