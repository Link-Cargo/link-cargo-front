import { useState, useEffect } from 'react';

export const useTutorial = () => {
  const [isShow, setIsShow] = useState(false);
  const [isTodayShow, setIsTodayShow] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    const hideTutorialDate = localStorage.getItem('hideTutorialDate');
    const todayDate = getTodayDate();

    if (!hideTutorialDate || hideTutorialDate !== todayDate) {
      setIsShow(true);
    }
  }, []);

  const onClose = () => {
    setIsShow(false);
  };

  const onTodayHideToggle = () => {
    const newValue = !isTodayShow;
    setIsTodayShow(newValue);

    if (newValue) {
      localStorage.setItem('hideTutorialDate', getTodayDate());
    } else {
      localStorage.removeItem('hideTutorialDate');
    }
  };

  return {
    isShow,
    isTodayShow,
    onClose,
    onTodayHideToggle,
  };
};
