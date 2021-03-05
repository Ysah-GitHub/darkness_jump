app.entity = {
  width: null,
  height: null,
  x_min: null,
  x_max: null,
  y_min: null,
  y_max: null,
  move: {base: null, interval: null},
  spawn: {rate: 1, timeout: null},
  explosion: {list: [], interval: null},
  remove: [],
  list: []
};

function entity_load(){
  entity_size_value_default();
  entity_move_value_default();
  entity_limit_default();
}

function entity_reset(){
  app.entity.spawn.rate = 1;
  app.entity.list = [];
}

function entity_size_value_default(){
  app.entity.width = Math.round(app.engine.height / 30);
  app.entity.height = Math.round(app.engine.height / 30);
}

function entity_move_value_default(){
  app.entity.move.base = app.entity.width / 30;
}

function entity_limit_default(){
  app.entity.x_min = 0 - app.entity.width;
  app.entity.x_max = app.engine.width;
  app.entity.y_min = 0;
  app.entity.y_max = app.engine.ground_height - app.entity.height;
}

function entity_speed(speed){
  return (app.entity.move.base * (1000 / app.config.video.interval)) * speed;
}

function entity_spawn_update(decrement, value_max){
  if (app.entity.spawn.rate > value_max) {
    app.entity.spawn.rate -= decrement;
  }
}

function entity_spawn_clear(){
  clearTimeout(app.entity.spawn.timeout);
}

function entity_move(){
  for (let i = 0; i < app.entity.remove.length; i++) {
    entity_remove(app.entity.remove[i]);
  }
  app.entity.remove = [];

  for (let i = 0; i < app.entity.list.length; i++) {
    app.entity.list[i].move(app.entity.list[i]);
    entity_hitbox(app.entity.list[i]);
  }
}

function entity_move_left(entity){
  entity.x -= entity.speed;
  if (entity.x < app.entity.x_min) {
    app.entity.remove.push(entity);
    if (app.config.video.explosion == "visible") {
      entity_explosion(entity, "left");
    }
  }
}

function entity_move_right(entity){
  entity.x += entity.speed;
  if (entity.x > app.entity.x_max) {
    entity_remove(entity);
  }
}

function entity_move_down(entity){
  entity.y += entity.speed;
  if (entity.y > app.entity.y_min) {
    entity_remove(entity);
  }
}

function entity_move_stop(){
  clearInterval(app.entity.move.interval);
}

function entity_new(entity){
  entity.id = app.entity.list.length;
  app.entity.list.push(entity);
}

function entity_remove(entity){
  score_add(entity.score);
  app.entity.list.splice(app.entity.list.indexOf(entity), 1);
}

function entity_remove_all(){
  score_add(app.entity.list.length);
  app.entity.list = [];
}

function entity_hitbox(entity){
  if (
    (entity.x - app.player.width) < app.player.x &&
    (entity.x + entity.width) > app.player.x &&
    (entity.y - app.player.height) < app.player.y &&
    (entity.y + entity.height) > app.player.y
  ) {
    stage_over();
  }
}

function entity_explosion(entity, direction){
  let tmp_number = 25 * ((entity.width / app.entity.width) * (entity.height / app.entity.height));
  let tmp_size = (app.entity.width + app.entity.height) / 8;
  let tmp_x = entity.x + entity.width / 2;
  let tmp_y = (entity.y + entity.height / 2) - tmp_size / 2;


  let tmp_entity = {
    color: entity.color,
    blur: tmp_size * 0.5,
    y_max: app.entity.y_max + app.entity.height - app.entity.height / 4,
    list: [],
  };

  if (direction == "left") {
    for (let i = 0; i < tmp_number; i++) {
      tmp_entity.list.push({
        width: tmp_size,
        height: tmp_size,
        x: 0,
        y: tmp_y,
        y_max: tmp_entity.y_max,
        velocity: (Math.floor(Math.random() * 100) / 50) * 2,
        vertical: entity.speed / 2,
        horizontal: (Math.floor(Math.random() * 100) / 15) * (entity.speed / 8)
      });
    }
  }
  else if (direction == "center") {
    for (let i = 0; i < tmp_number; i++) {
      tmp_entity.list.push({
        width: tmp_size,
        height: tmp_size,
        x: tmp_x,
        y: tmp_y,
        y_max: tmp_entity.y_max,
        velocity: (Math.floor(Math.random() * 100) / 50) * 2,
        vertical: entity.speed / 2,
        horizontal: ((Math.floor(Math.random() * 100) / 50) - (Math.floor(Math.random() * 100) / 50)) * (entity.speed / 8)
      });
    }
  }

  app.entity.explosion.list.push(tmp_entity);

  if (app.entity.explosion.interval == null) {
    app.entity.explosion.interval = setInterval(entity_explosion_move, 1000 / app.config.video.interval, (1000 / app.config.video.interval) / 160);
    engine_element_add("engine_draw_entity_explosion", engine_draw_entity_explosion);
  }
}

function entity_explosion_all(){
  for (let i = 0; i < app.entity.list.length; i++) {
    entity_explosion(app.entity.list[i], "center");
  }
}

function entity_explosion_move(velocity_decrement){
  for (let i = 0; i < app.entity.explosion.list.length; i++) {
    let tmp_length = 0;
    for (let j = 0; j < app.entity.explosion.list[i].list.length; j++) {
      app.entity.explosion.list[i].list[j].velocity -= velocity_decrement;
      if (app.entity.explosion.list[i].list[j].y < app.entity.explosion.list[i].y_max) {
        app.entity.explosion.list[i].list[j].y -= app.entity.explosion.list[i].list[j].vertical * app.entity.explosion.list[i].list[j].velocity - app.player.speed.gravity;
        if (app.entity.explosion.list[i].list[j].velocity > 1) {
          app.entity.explosion.list[i].list[j].x += app.entity.explosion.list[i].list[j].horizontal * app.entity.explosion.list[i].list[j].velocity;
        }
        else {
          app.entity.explosion.list[i].list[j].x += app.entity.explosion.list[i].list[j].horizontal;
        }
      }
      else {
        if (app.entity.explosion.list[i].list[j].height > 0) {
          app.entity.explosion.list[i].list[j].height -= app.player.speed.move / 40;
          app.entity.explosion.list[i].list[j].y_max += app.player.speed.move / 40;
          app.entity.explosion.list[i].list[j].y = app.entity.explosion.list[i].list[j].y_max;
        }
        else {
          tmp_length++;
          app.entity.explosion.list[i].list[j].height = 0;
        }
      }
    }
    if (tmp_length == app.entity.explosion.list[i].list.length) {
      app.entity.explosion.list.splice([i], 1);
      if (app.entity.explosion.list.length == 0) {
        entity_explosion_stop();
      }
    }
  }
}

function entity_explosion_stop(){
  engine_element_remove("engine_draw_entity_explosion");
  clearInterval(app.entity.explosion.interval);
  app.entity.explosion.interval = null;
}
