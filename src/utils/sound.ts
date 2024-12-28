export const playNotificationSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
  audio.play();
};