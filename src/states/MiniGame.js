/* globals __DEV__ */
import Phaser from 'phaser'
//import Mushroom from '../sprites/Mushroom'
//import Ship from '../sprites/Ship'

export default class extends Phaser.State {
  init () {
    this.score = 0
    this.money = 0
  }
  preload () {
    //this.load.tilemap('tilemap', 'assets/images/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.stage.backgroundColor = '#00ff00'

    this.button = game.add.button(game.world.centerX - 95, 400, 'buttonNext', this.actionOnClick, this/*, 2, 1, 0*/);
    /*const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)*/

    

  }

  update (){
    /*this.game.physics.arcade.collide(this.ship, this.layer) // проверяем столкновения спрайта персонажа с тайлами карты
    this.game.physics.arcade.overlap(this.ship, this.chests, this.collectChests, null, this)
    this.game.physics.arcade.overlap(this.ship, this.coins, this.collectCoins, null, this)
    this.game.physics.arcade.overlap(this.ship, this.points, this.doFinish, null, this)*/
  }

  actionOnClick () {
    // Следующий уровень
    let level = localStorage.getItem('currentLevel')
    console.log('click', level)
    localStorage.setItem('currentLevel', ++level)

    this.state.start('Game')
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
