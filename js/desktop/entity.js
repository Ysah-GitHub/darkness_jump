app.entity = {
  width: null,
  height: null,
  x_min: null,
  x_max: null,
  y_min: null,
  y_max: null,
  move: {base: null, interval: null},
  spawn: {rate: 1, timeout: null},
  explosion: {list: [], active: false, speed: null, melt_speed: null},
  remove: [],
  list: []
};

function entity_load(){
  entity_size_value_default();
  entity_move_value_default();
  entity_limit_default();
  app.entity.explosion = {list: [], active: false, speed: entity_speed(0.5), melt_speed: entity_speed(0.1)};
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
  return ((app.entity.width + app.entity.height) / 60) * speed;
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
  entity.x -= entity.speed * app.engine.refresh.frame;
  if (entity.x < app.entity.x_min) {
    app.entity.remove.push(entity);
    entity_explosion(entity, "left");
  }
}

function entity_move_right(entity){
  entity.x += entity.speed * app.engine.refresh.frame;
  if (entity.x > app.entity.x_max) {
    app.entity.remove.push(entity);
    entity_explosion(entity, "right");
  }
}

function entity_move_down(entity){
  entity.y += entity.speed * app.engine.refresh.frame;
  if (entity.y > app.entity.y_max) {
    app.entity.remove.push(entity);
    entity_explosion(entity, "center");
  }
}

function entity_move_stop(){
  engine_refresh_remove(entity_move);
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
    stage_end(false);
  }
}

function entity_explosion(entity, direction){
  let tmp_number = 20 * ((entity.width / app.entity.width) * (entity.height / app.entity.height));
  let tmp_size = (app.entity.width + app.entity.height) / 8;
  let tmp_x = entity.x + entity.width / 2;
  let tmp_y = (entity.y + entity.height / 2) - tmp_size / 2;
  let tmp_y_max = app.entity.y_max + app.entity.height - app.entity.height / 4;
  let tmp_blur = tmp_size * 0.5;


  let tmp_entity = [];

  if (direction == "left") {
    for (let i = 0; i < tmp_number; i++) {
      tmp_entity.push({
        width: tmp_size,
        height: tmp_size,
        x: 0,
        y: tmp_y,
        y_max: tmp_y_max,
        velocity: (Math.floor(Math.random() * 100) / 50) * entity.speed,
        vertical: app.entity.explosion.speed,
        horizontal: (Math.floor(Math.random() * 100) / 15) * (entity.speed / 8),
        color: entity.color.replace(")", ", " + Math.random().toFixed(1) + ")"),
        blur: tmp_blur
      });
    }
  }
  else if (direction == "right") {
    for (let i = 0; i < tmp_number; i++) {
      tmp_entity.push({
        width: tmp_size,
        height: tmp_size,
        x: app.engine.width,
        y: tmp_y,
        y_max: tmp_y_max,
        velocity: (Math.floor(Math.random() * 100) / 50) * entity.speed,
        vertical: app.entity.explosion.speed,
        horizontal: -Math.abs(Math.floor(Math.random() * 100) / 15) * (entity.speed / 8),
        color: entity.color.replace(")", ", " + Math.random().toFixed(1) + ")"),
        blur: tmp_blur
      });
    }
  }
  else if (direction == "center") {
    for (let i = 0; i < tmp_number; i++) {
      tmp_entity.push({
        width: tmp_size,
        height: tmp_size,
        x: tmp_x,
        y: tmp_y,
        y_max: tmp_y_max,
        velocity: (Math.floor(Math.random() * 100) / 50) * entity.speed,
        vertical: app.entity.explosion.speed,
        horizontal: ((Math.floor(Math.random() * 100) / 50) - (Math.floor(Math.random() * 100) / 50)) * (entity.speed / 8),
        color: entity.color.replace(")", ", " + Math.random().toFixed(1) + ")"),
        blur: tmp_blur
      });
    }
  }

  app.entity.explosion.list.push(tmp_entity);

  if (app.entity.explosion.active == false) {
    app.entity.explosion.active = true;
    engine_refresh_add(entity_explosion_move);
    engine_element_add("engine_draw_entity_explosion", engine_draw_entity_explosion);
  }
}

function entity_explosion_all(){
  for (let i = 0; i < app.entity.list.length; i++) {
    entity_explosion(app.entity.list[i], "center");
  }
}

function entity_explosion_move(){
  let tmp_frame = app.engine.refresh.frame;
  for (let i = 0; i < app.entity.explosion.list.length; i++) {
    let tmp_length = 0;
    for (let j = 0; j < app.entity.explosion.list[i].length; j++) {
      app.entity.explosion.list[i][j].velocity -= (app.entity.explosion.list[i][j].vertical / 75) * tmp_frame;
      if (app.entity.explosion.list[i][j].y < app.entity.explosion.list[i][j].y_max) {
        app.entity.explosion.list[i][j].y -= (app.entity.explosion.list[i][j].vertical + app.entity.explosion.list[i][j].velocity) * tmp_frame - (app.entity.explosion.speed * tmp_frame);
        if (app.entity.explosion.list[i][j].velocity > 1) {
          app.entity.explosion.list[i][j].x += (app.entity.explosion.list[i][j].horizontal * app.entity.explosion.list[i][j].velocity) * tmp_frame;
        }
        else {
          app.entity.explosion.list[i][j].x += app.entity.explosion.list[i][j].horizontal * tmp_frame;
        }
      }
      else {
        if (app.entity.explosion.list[i][j].height > 0) {
          app.entity.explosion.list[i][j].height -= app.entity.explosion.melt_speed;
          app.entity.explosion.list[i][j].y_max += app.entity.explosion.melt_speed;
          app.entity.explosion.list[i][j].y = app.entity.explosion.list[i][j].y_max;
        }
        else {
          tmp_length++;
          app.entity.explosion.list[i][j].height = 0;
        }
      }
    }
    if (tmp_length == app.entity.explosion.list[i].length) {
      app.entity.explosion.list.splice([i], 1);
      if (app.entity.explosion.list.length == 0) {
        entity_explosion_stop();
      }
    }
  }
}

function entity_explosion_stop(){
  engine_element_remove("engine_draw_entity_explosion");
  engine_refresh_remove(entity_explosion_move);
  app.entity.explosion.active = false;
}
