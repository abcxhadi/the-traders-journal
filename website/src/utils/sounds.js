// A simple pre-loaded audio player for UI sounds.

const clickSoundUrl = 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_9c32e5f8f3.mp3';

let audio;

try {
  audio = new Audio(clickSoundUrl);
  audio.preload = 'auto';
} catch (error) {
  console.error("Could not create audio object", error);
}


/**
 * Plays the pre-loaded click sound.
 * It resets the sound to the beginning if it's already playing.
 */
export const playClickSound = () => {
  if (!audio) {
    console.error("Audio object is not available.");
    return;
  }
  
  try {
    audio.currentTime = 0;
    audio.play().catch(error => {
      // Autoplay was prevented. This is common in browsers.
      // We can ignore this error for UI sounds, as the user interaction
      // which triggers this function should also allow audio to play.
      if (error.name !== 'NotAllowedError') {
        console.error("Error playing sound:", error);
      }
    });
  } catch (error) {
    console.error("Could not play sound", error);
  }
};
