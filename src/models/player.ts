import EventEmitter from '@/common/event-emitter';
import { URL_AUDIO } from '@/common/game-constants';
import Tree from './tree';

export default class Player {
  static audio: HTMLAudioElement;

  static initialize() {
    this.audio = new Audio();
    this.audio.src = URL_AUDIO;
    this.audio.volume = 0.5;
    this.audio.controls = true;
    this.audio.loop = true;

    EventEmitter.subscribe('toggle:audio', this.toggleAudio);
    if (Tree.filter.filter.player) {
      document.addEventListener('click', () => {
        if (Tree.filter.filter.player) {
          this.audio.play();
        }
      }, { once: true });
    }
  }

  static toggleAudio() {
    if (Tree.filter.filter.player) {
      Player.playAudio();
    } else {
      Player.stopAudio();
    }
  }

  static playAudio() {
    this.audio.play();
  }

  static stopAudio() {
    this.audio.pause();
  }
}
