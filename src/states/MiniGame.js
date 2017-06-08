/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.openedChestCount = 0
    this.objectButtons = []
    this.chestButtons = []
    this.failCount = 0
  }
  preload () {
  }

  create () {
    this.add.sprite(0, 0, 'minigameBg')

    this.levelConfig = this.cache.getJSON('levelConfig')
    console.log('level', this.levelConfig)
    
    const i = 0
    this.chestButtons.push(
      game.add.button(game.world.centerX, this.world.centerY+200, 'chest64', () => { this.handleChestClick(i)}, this, 0, 0, 0)
    )
    this.chestButtons[i].scale.setTo(1.5, 1.5)
    this.chestButtons[i].anchor.setTo(0.5)

    this.desk = this.add.sprite(game.world.centerX, this.world.centerY, 'desk')
    this.desk.anchor.setTo(0.5)

    this.generateObjects()

    this.missAudio = this.game.add.audio('miss')
    this.successAudio = this.game.add.audio('getChest')
  }

  update (){
  }

  generateObjects(){
    const commonConfig = this.cache.getJSON('commonLevelConfig')
    commonConfig.words.forEach((item) => {
      console.log('fff', item)
      this.objectButtons.push(
        game.add.button(
          this.getCoordX(), 
          this.getCoordY(),
          'minigameObjects', 
          () => { this.handleObjectClick(item.word) }, 
          this, 
          item.object_id,
          item.object_id,
          item.object_id,
          item.object_id)
      )
    })
    this.failCount = 0
    this.levelWord = commonConfig.words[game.rnd.between(0, (commonConfig.words.length-1))].word
  }

  getCoordX(){
    let x = game.rnd.between(50, 1550)
    // чтобы объект не оказался за доской
    if(x > (game.world.centerX - 350) && x < (game.world.centerX + 350)){
      x = this.getCoordX()
    }
    return x
  }

  getCoordY(){
    let y = game.rnd.between(50, 750)
    // чтобы объект не оказался за доской
    if(y > (game.world.centerY - 80) && y < (game.world.centerY + 80)){
      y = this.getCoordY()
    }
    return y
  }

  handleObjectClick(word){
    console.log('click', word)
    if(word == this.levelWord){
      this.successAudio.play()
      this.goToNextLevel()
    }else{
       this.missAudio.play()
       this.failCount++
       if(this.failCount >= 2){
        this.goToCurrentLevel()
       }
    }
  }

  handleChestClick(num){
    this.chestButtons[num].setFrames(1)
    let word = this.add.text(game.world.centerX, this.world.centerY, this.levelWord)
    //this.levelText.font = 'Bangers'
    word.padding.set(10, 16)
    word.fontSize = 50
    word.stroke = '#333333';
    word.strokeThickness = 7;
    word.fill = '#FFFFFF'
    word.smoothed = false
    word.anchor.setTo(0.5)
    this.openedChestCount++
  }

  goToNextLevel(){
    let level = localStorage.getItem('currentLevel')
    console.log('click', level)
    localStorage.setItem('currentLevel', ++level)
    setTimeout(() => {
      this.state.start('Game')
    }, 500)    
  }

  goToCurrentLevel(){
    setTimeout(() => {
      this.state.start('Game')
    }, 500) 
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
