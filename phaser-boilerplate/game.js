// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let player;
let player2;
let cursors;

function preload() {
  this.load.image(
    "player",
    "https://labs.phaser.io/assets/sprites/phaser-dude.png"
  );
}

function create() {
  player = this.physics.add.sprite(400, 300, "player");
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Reset velocity
  player.setVelocity(0);

  // Handle movement
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-200);
  } else if (cursors.down.isDown) {
    player.setVelocityY(200);
  }

  // Log player's x and y coordinates on each frame
  console.log(`Player position: X = ${player.x}, Y = ${player.y}`);
}
