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

function entity_reload(){
  entity.number = 0;
  entity.spawn.rate = 1;
  entity.list = {}
}

function entity_size_default(){
  entity.width = Math.round(engine.height / 30);
  entity.height = Math.round(engine.height / 30);
}

function entity_move_value_default(){
  entity.move.base = (entity.width / 7);
}

function entity_new(width, height, x, y, speed, color, func, remove){
  let id = entity.number += 1;
  entity.list[id] = {id: id, width: width, height: height, x: x, y: y, speed: speed, color: color, move: {func: func, interval: null}};
  entity.list[id].move.func(entity.list[id]);
}

function entity_new_red_nostalgia(){
  entity_new(entity.width, entity.height, engine.width, (engine.config.interface.ground_height - entity.height), (entity.move.base), "rgb(255, 75, 75)", entity_move_left);
}

function entity_new_purple_nostalgia(){
  entity_new(entity.width, entity.height, engine.width, (engine.config.interface.ground_height - entity.height * (Math.floor(Math.random() * 3) + 1)), (entity.move.base), "rgb(150, 75, 255)", entity_move_left);
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

function entity_move_stop(tmp_entity){
  clearInterval(tmp_entity.move.interval);
}

function entity_move_stop_all(){
  for (let i = 0; i < Object.keys(entity.list).length; i++) {
    let tmp_entity = entity.list[Object.keys(entity.list)[i]]
    entity_move_stop(tmp_entity);
  }
}

function entity_remove(tmp_entity){
  entity_move_stop(tmp_entity);
  delete entity.list[tmp_entity.id];
  stage_score_add(1);
}

function entity_hitbox(tmp_entity){
  if (
    (tmp_entity.x - player.width) < player.x &&
    (tmp_entity.x + tmp_entity.width) > player.x &&
    (tmp_entity.y - player.height) < player.y &&
    (tmp_entity.y + tmp_entity.height) > player.y
  ) {
    stage_over();
  }
}
