/* globals __DEV__ */
import Phaser from 'phaser'
import Ship from '../sprites/Ship'

export default class extends Phaser.State {
  init () {
    this.score = 0
    this.money = 0
  }
  preload () {
    let level = localStorage.getItem('currentLevel')
    if(!level  || level > this.cache.getJSON('commonLevelConfig').levelsCount){
      level = 1
      localStorage.setItem('currentLevel', 1)
    }
    this.load.json('levelConfig', 'assets/levels/'+level+'/config.json')
    this.load.tilemap('tilemap', 'assets/levels/'+level+'/map.json', null, Phaser.Tilemap.TILED_JSON)
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.stage.backgroundColor = '#0f93ff'

    this.loadLevelConfig()

    /***** Загружаем слои карты *****/
    this.map = this.add.tilemap('tilemap');
    if(this.levelConfig.tiles){
      this.map.addTilesetImage('tiles', this.levelConfig.tiles);
    }else{
      this.map.addTilesetImage('tiles', 'tiles');
    }
    
    this.map.setCollisionBetween(0, 900); // все тайлы устанавливаем как непроходимые
    this.layer = this.map.createLayer('Layer 1');
    this.layer2 = this.map.createLayer('Layer 2');

    /***** Загружаем объекты с карты *****/
    this.points = game.add.group();
    this.points.enableBody = true; 
    this.coins = game.add.group();
    this.coins.enableBody = true;
    this.chests = game.add.group();
    this.chests.enableBody = true;
    
    if (this.map.objects['Objects 1']) {
      const mapObjects = this.map.objects['Objects 1']
      mapObjects.forEach(obj => {
        let curY = obj.y - this.map.tileHeight
        if(obj.type == 'chests'){
          this.chests.create(obj.x, curY, 'chest');
        }else if(obj.type == 'coins'){
          this.coins.create(obj.x, curY, 'coin');
        }else if(obj.type == 'points'){
          this.points.create(obj.x, curY, 'flag');
        }  
      });
    }

    /***** Игрок *****/
    this.ship = new Ship({
      game: this,
      x: this.levelConfig.startPosition.x,
      y: this.levelConfig.startPosition.y,
      asset: 'ship'
    })
    this.game.add.existing(this.ship)
    this.ship.scale.setTo(0.5, 0.5)
    this.game.physics.arcade.enable(this.ship)
    this.ship.body.collideWorldBounds = true


    /***** АУдио *****/
    this.getCoinAudio = this.game.add.audio('getCoin')
    this.getChestAudio = this.game.add.audio('getChest')
    this.bgAudio = this.game.add.audio('bgAudio')
    this.game.sound.setDecodedCallback([ this.getCoinAudio, this.getChestAudio, this.bgAudio ], this.startAudio, this)

    this.createTexts()

    if(1==1){ // читер!!!
      const key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
      key1.onDown.add(
        () => { 
          this.score = this.levelConfig.chestsCount
          this.getChestAudio.play()
          console.log('well done')
        }, 
        this)
      game.input.keyboard.removeKeyCapture(Phaser.Keyboard.ONE);
    }
  }

  update (){
    this.game.physics.arcade.collide(this.ship, this.layer) // проверяем столкновения спрайта персонажа с тайлами карты
    this.game.physics.arcade.overlap(this.ship, this.chests, this.collectChests, null, this)
    this.game.physics.arcade.overlap(this.ship, this.coins, this.collectCoins, null, this)
    this.game.physics.arcade.overlap(this.ship, this.points, this.doFinish, null, this)
  }

  loadLevelConfig(){
    this.levelConfig = this.cache.getJSON('levelConfig')
    console.log('levelConfig', this.levelConfig)
  }

  collectChests (player, chest) {
    // Removes the star from the screen
    chest.kill();
    this.getChestAudio.play()
    //  Add and update the score
    this.score ++
    this.chestsText.text = 'Chests: ' + this.score
  }

  collectCoins(player, coin) {
    // Removes the star from the screen
    coin.kill();
    this.getCoinAudio.play()
    //  Add and update the score
    this.money += 10
    this.coinsText.text = 'Coins: ' + this.money    
  }

  doFinish(player, flag){
    if(this.score >= this.levelConfig.chestsCount){
        this.bgAudio.stop()
        this.state.start('MiniGame')
    }
  }

  createTexts(){
    /***** Выводим текст *****/
    this.levelText = this.add.text(800, 30, 'Level: '+this.levelConfig.level)
    this.levelText.font = 'Bangers'
    this.levelText.padding.set(10, 16)
    this.levelText.fontSize = 20
    this.levelText.stroke = '#000000';
    this.levelText.strokeThickness = 5;
    this.levelText.fill = '#77BFA3'
    this.levelText.smoothed = false
    this.levelText.anchor.setTo(0.5)


    this.coinsText = this.add.text(20, 10, 'Coins: 0')
    this.coinsText.font = 'Bangers'
    this.coinsText.padding.set(10, 16)
    this.coinsText.fontSize = 30
    this.coinsText.stroke = '#000000';
    this.coinsText.strokeThickness = 8;
    this.coinsText.fill = '#77BFA3'
    this.coinsText.smoothed = false
    this.coinsText.anchor.setTo(0)

    this.chestsText = this.add.text(20, 50, 'Chests: 0')
    this.chestsText.font = 'Bangers'
    this.chestsText.padding.set(10, 16)
    this.chestsText.fontSize = 30
    this.chestsText.stroke = '#000000';
    this.chestsText.strokeThickness = 8;
    this.chestsText.fill = '#77BFA3'
    this.chestsText.smoothed = false
    this.chestsText.anchor.setTo(0)
  }

  startAudio(){
    this.bgAudio.loopFull()
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
