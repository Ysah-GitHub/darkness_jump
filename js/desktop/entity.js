var entity = {
  generate: {
    speed: 1,
    number: 0,
    timeout: null
  },
  list: [] // [width, height, x, y, speed, color]
}

function entity_generate(){
  entity.list.push([50, 50, , engine.width, 1, "rgb(255, 75, 75)"]);
  entity.generate.timeout = setTimeout(entity_generate, ((((Math.floor(Math.random() * 10) + 1) * entity.generate.speed) * 100)));
}

// function entity_move_left(entity){
//   player.move.interval = setInterval(function(){
//     player.x -= 5 * player.speed;
//     if (player.x < player.x_min) {
//       player.x = player.x_min;
//     }
//   }, 5);
// }
