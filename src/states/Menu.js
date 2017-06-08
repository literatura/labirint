/* globals __DEV__ */
import Phaser from 'phaser'
import LabelButton from '../common/LabelButton'

export default class extends Phaser.State {
  init () {
    this.score = 0
    this.money = 0
  }
  preload () {
    this.load.json('commonLevelConfig', 'assets/levels/common.json')
  }

  create () {
    this.add.sprite(0, 0, 'menuBg')

    this.introText = this.add.text(this.world.centerX, this.world.centerY - 160 , 'Sea adventures =)')
    this.introText.font = 'Bangers'
    this.introText.padding.set(10, 16)
    this.introText.fontSize = 40
    this.introText.stroke = '#000000';
    this.introText.strokeThickness = 5;
    this.introText.fill = '#77BFA3'
    this.introText.smoothed = false
    this.introText.anchor.setTo(0.5)

    this.buttons = []
    const commonLevelConfig = this.cache.getJSON('commonLevelConfig')
    for (let i = 1; i <= commonLevelConfig.levelsCount; i++) {
      this.buttons.push(
        new LabelButton(this.game, (200+i*80), this.world.centerY, "landButton", i, () => { this.actionOnClick(i)} , this)
      )
    }; 
  }

  actionOnClick (num) {
    //console.log('click', num)
    // Следующий уровень
    /*let level = localStorage.getItem('currentLevel')
    if(!level){
      localStorage.setItem('currentLevel', 1)
    } */   
    localStorage.setItem('currentLevel', num)
    this.state.start('Game')
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
