/* globals __DEV__ */
import Phaser from 'phaser'
//import Mushroom from '../sprites/Mushroom'
import Ship from '../sprites/Ship'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.load.tilemap('tilemap', 'assets/images/maps/s5.json', null, Phaser.Tilemap.TILED_JSON);
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.stage.backgroundColor = '#0000ff'
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

    this.map = this.add.tilemap('tilemap');
    this.map.addTilesetImage('tiles', 'tiles');
    this.map.setCollisionBetween(0, 95); // все тайлы от 1 до 25 устанавливаем как непроходимые
    this.layer = this.map.createLayer('Layer 1');
   
    
    
    //this.map.addTilesetImage('tiles', 'tiles');
    //this.map.setCollisionBetween(0, 95); // все тайлы от 1 до 25 устанавливаем как непроходимые
    //this.layer = map.createLayer('Layer 1');


    this.ship = new Ship({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'ship'
    })
    this.game.add.existing(this.ship)
    this.ship.scale.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.ship)

  }

  update (){
    this.game.physics.arcade.collide(this.ship, this.layer); // проверяем столкновения спрайта персонажа с тайлами карты
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
