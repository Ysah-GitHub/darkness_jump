var entity = {
  width: null,
  height: null,
  score: 0,
  number: 0,
  list: {},
  spawn: {
    rate: 1,
    timeout: null
  },
  move: {base: null}
}

function entity_load(){
  entity_size_default();
  entity_move_value_default();
}

function entity_size_default(){
  entity.width = Math.round(engine.height / 30);
  entity.height = Math.round(engine.height / 30);
}

function entity_move_value_default(){
  entity.move.base = (entity.width / 7);
}

function dev_entity_start(){
  entity_new_red();
  entity.spawn.timeout = setTimeout(dev_entity_start, ((((Math.floor(Math.random() * 8) + 3) * entity.spawn.rate) * 100)));
}

function entity_new(width, height, x, y, speed, color, func, remove){
  let id = entity.number += 1;
  entity.list[id] = {id: id, width: width, height: height, x: x, y: y, speed: speed, color: color, move: {func: func, interval: null}};
  entity.list[id].move.func(entity.list[id]);
}

function entity_new_red(){
  entity_new(entity.width, entity.height, engine.width, (engine.ground.height - entity.height), (entity.move.base * 1), "rgb(255, 75, 75)", entity_move_left);
}

function entity_move_left(tmp_entity){
  tmp_entity.move.interval = setInterval(function(){
    tmp_entity.x -= tmp_entity.speed;
    if (tmp_entity.x < 0) {
      entity_remove(tmp_entity);
    }
    entity_hitbox(tmp_entity);
  }, 5);
}

function entity_remove(tmp_entity){
  clearInterval(tmp_entity.move.interval);
  delete entity.list[tmp_entity.id];
  entity.score++;
}

function entity_hitbox(tmp_entity){
  if (
    (tmp_entity.x - player.width) < player.x &&
    (tmp_entity.x + tmp_entity.width) > player.x &&
    (tmp_entity.y - player.height) < player.y &&
    (tmp_entity.y + tmp_entity.height) > player.y
  ) {
    alert("game over");
  }
}
