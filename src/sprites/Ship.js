import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.cursors = game.input.keyboard.createCursorKeys() 
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update () {	  	
  	this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    let k = 1
    if(this.spacebar.isDown){
        k = 1.7
    }

    if (this.cursors.left.isDown)    {
        if(this.angle != 90){
        	this.angle = 90
        }
        this.body.velocity.x = -128*k;
    }
    else if (this.cursors.right.isDown )
    {
        if(this.angle != -90){
        	this.angle = -90
        }
        this.body.velocity.x = 128*k;
    }
    else if (this.cursors.up.isDown)
    {
        if(this.angle != 180){
        	this.angle = 180
        }
        this.body.velocity.y = -128*k;
    }
    else if (this.cursors.down.isDown)
    {
        if(this.angle != 0){
        	this.angle = 0
        }
        this.body.velocity.y = 128*k;
    }
  }
}
