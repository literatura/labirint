import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('tiles', 'assets/images/tiles/tiles_sheet4.png');
    this.load.image('tiles2', 'assets/images/tiles/mapPack_tilesheet_32.png');
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('chest', 'assets/images/chest.png');
    this.load.spritesheet('chest64', 'assets/images/chest64x64.png', 64, 64)
    this.load.spritesheet('minigameObjects', 'assets/images/minigame-objects.png', 64, 64)
    
    this.load.image('coin', 'assets/images/coinGold.png');
    this.load.image('flag', 'assets/images/flagGreen.png');
    this.load.image('buttonNext', 'assets/images/buttonNext.png');
    this.load.image('buttonBg', 'assets/images/buttonBigBg.png');
    //this.load.image('buttonSmallBg', 'assets/images/buttonSmallBg.png');
    this.load.image('landButton', 'assets/images/islandButton.png');
    this.load.image('menuBg', 'assets/images/menu-background.jpg');
    this.load.image('minigameBg', 'assets/images/minigame-background.jpg');
    this.load.image('desk', 'assets/images/desk.png')

    this.load.audio('bgAudio', 'assets/audio/240376__edtijo__happy-8bit-pixel-adenture.mp3');
    this.load.audio('getCoin', 'assets/audio/p-ping.mp3');
    this.load.audio('getChest', 'assets/audio/sword.mp3');
    this.load.audio('miss', 'assets/audio/miss.mp3');
  }

  create () {
    let level = localStorage.getItem('currentLevel')
    console.log('load level', level)
    if(!level){
      localStorage.setItem('currentLevel', 1)
    }
    this.state.start('Menu')
  }
}
