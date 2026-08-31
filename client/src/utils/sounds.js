import timerSound1 from '../assets/time-notif-1.mp3'
import timerSound2 from '../assets/time-notif-2.mp3'
import timerSound3 from '../assets/time-notif-3.mp3'
import timerSound4 from '../assets/time-notif-4.mp3'

const sounds = {
    v1: timerSound1,
    v2: timerSound2,
    v3: timerSound3,
    v4: timerSound4
}

export const playSound = (sound, volume) => {
    const audio = new Audio(sounds[sound]);
    audio.volume = volume / 100;
    audio.play();
};