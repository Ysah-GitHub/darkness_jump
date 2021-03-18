function stage_spider_dance_start_easy(){
  music_play("spider_dance");
  app.music.curent.onplay = function(){
    stage_event_add(function(){app.entity.spawn.rate = 1.2}, 0);
    stage_event_add(function(){stage_spider_dance_entity_down(0.5)}, 0);
    stage_event_add(function(){entity_spawn_clear(); entity_explosion_all(); entity_remove_all(); stage_spider_dance_entity(0.5)}, 17);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 33);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 37);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 42);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 50);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 54);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 56);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 58);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 60);
    stage_event_add(function(){entity_spawn_clear(); stage_spider_dance_entity_down(0.5)}, 65);
    stage_event_add(function(){entity_spawn_clear(); stage_spider_dance_entity_down(0.6)}, 83);
    stage_event();
  };
  app.music.curent.onended = function(){stage_end(true)};
}

function stage_spider_dance_start_medium(){
  music_play("spider_dance");
  app.music.curent.onplay = function(){
    stage_event_add(function(){stage_spider_dance_entity_down(0.6)}, 0);
    stage_event_add(function(){entity_spawn_clear(); entity_explosion_all(); entity_remove_all(); stage_spider_dance_entity(0.6)}, 17);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 33);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 37);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 42);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 50);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 54);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 56);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 58);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 60);
    stage_event_add(function(){entity_spawn_clear(); stage_spider_dance_entity_down(0.6)}, 65);
    stage_event_add(function(){entity_spawn_clear(); stage_spider_dance_entity_down(0.7)}, 83);
    stage_event();
  };
  app.music.curent.onended = function(){stage_end(true)};
}

function stage_spider_dance_start_hard(){
  music_play("spider_dance");
  app.music.curent.onplay = function(){
    stage_event_add(function(){app.entity.spawn.rate = 0.8}, 0);
    stage_event_add(function(){stage_spider_dance_entity_down(0.9)}, 0);
    stage_event_add(function(){entity_spawn_clear(); entity_explosion_all(); entity_remove_all(); stage_spider_dance_entity(0.9)}, 17);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 33);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 37);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 42);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 50);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 54);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 56);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 58);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 60);
    stage_event_add(function(){entity_spawn_clear(); stage_spider_dance_entity_down(0.9)}, 65);
    stage_event_add(function(){entity_spawn_clear(); stage_spider_dance_entity_down(1)}, 83);
    stage_event();
  };
  app.music.curent.onended = function(){stage_end(true)};
}

function stage_spider_dance_start_impossible(){
  music_play("spider_dance");
  app.music.curent.onplay = function(){
    stage_event_add(function(){app.entity.spawn.rate = 0.5}, 0);
    stage_event_add(function(){stage_spider_dance_entity_down(1)}, 0);
    stage_event_add(function(){entity_spawn_clear(); entity_explosion_all(); entity_remove_all(); stage_spider_dance_entity(1)}, 17);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 33);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 37);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 42);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 50);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 54);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 56);
    stage_event_add(function(){stage_spider_dance_entity_wall("right")}, 58);
    stage_event_add(function(){stage_spider_dance_entity_wall("left")}, 60);
    stage_event_add(function(){entity_spawn_clear(); stage_spider_dance_entity_down(1)}, 65);
    stage_event_add(function(){entity_spawn_clear(); stage_spider_dance_entity_down(1.2)}, 83);
    stage_event();
  };
  app.music.curent.onended = function(){stage_end(true)};
}

function stage_spider_dance_entity(speed){
  let tmp_random_number = Math.floor(Math.random() * 2);
  if (tmp_random_number == 0) {
    stage_spider_dance_entity_top(speed, stage_spider_dance_entity);
  }
  else if (tmp_random_number == 1) {
    stage_spider_dance_entity_bottom(speed, stage_spider_dance_entity);
  }
}

function stage_spider_dance_entity_top(speed, func){
  let tmp_x;
  let tmp_move;
  let tmp_random_timer = (((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate) * 100);

  if (app.stage.current.difficulty == "impossible") {
    let tmp_random_number = Math.floor(Math.random() * 2);
    if (tmp_random_number == 0) {
      tmp_move = entity_move_left;
      tmp_x = app.engine.width;
    }
    else {
      tmp_move = entity_move_right;
      tmp_x = 0 - app.entity.width;
    }
  }
  else {
    tmp_move = entity_move_right;
    tmp_x = 0 - app.entity.width;
  }

  entity_new({
    width: app.entity.width,
    height: app.entity.height,
    x: tmp_x,
    y: app.engine.ground_height - app.entity.height * 2,
    speed: entity_speed(speed),
    color: "rgb(150, 75, 255)",
    move: tmp_move,
    score: 1
  });

  app.entity.spawn.timeout = setTimeout(function(){func(speed, func)}, tmp_random_timer);
}

function stage_spider_dance_entity_bottom(speed, func){
  let tmp_random_timer = (((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate) * 100);

  entity_new({
    width: app.entity.width,
    height: app.entity.height,
    x: app.engine.width,
    y: app.engine.ground_height - app.entity.height,
    speed: entity_speed(speed),
    color: "rgb(150, 75, 255)",
    move: entity_move_left,
    score: 1
  });

  app.entity.spawn.timeout = setTimeout(function(){func(speed, func)}, tmp_random_timer);
}

function stage_spider_dance_entity_down(speed){
  let tmp_random_timer;

  switch (app.stage.current.difficulty) {
    case "easy":
      tmp_random_timer = ((((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate / 5) * 100));
      break;
    case "medium":
      tmp_random_timer = ((((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate / 7) * 100));
      break;
    case "hard":
      tmp_random_timer = ((((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate / 9) * 100));
      break;
    case "impossible":
      tmp_random_timer = ((((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate / 10) * 100));
  }

  entity_new({
    width: app.entity.width,
    height: app.entity.height,
    x: (Math.random() * (engine.width - app.entity.width)),
    y: (0 - app.entity.height),
    speed: entity_speed(speed),
    color: "rgb(150, 75, 255)",
    move: entity_move_down,
    score: 1
  });

  app.entity.spawn.timeout = setTimeout(stage_spider_dance_entity_down, tmp_random_timer, speed);
}

function stage_spider_dance_entity_wall(move){
  let tmp_x;
  let tmp_move;
  let tmp_speed;
  let tmp_number;
  let tmp_interval;

  if (move == "left") {
    tmp_move = entity_move_left;
    tmp_x = app.engine.width;
  }
  else {
    tmp_move = entity_move_right;
    tmp_x = 0 - app.entity.width;
  }

  switch (app.stage.current.difficulty) {
    case "easy": tmp_speed = 0.5; tmp_number = 2; tmp_interval = 4; break;
    case "medium": tmp_speed = 0.6; tmp_number = 3; tmp_interval = 4; break;
    case "hard": tmp_speed = 0.9; tmp_number = 4; tmp_interval = 4; break;
    case "impossible": tmp_speed = 1; tmp_number = 5; tmp_interval = 4;
  }

  for (let i = 0; i < tmp_number; i++) {
    entity_new({
      width: app.entity.width,
      height: app.entity.height,
      x: tmp_x,
      y: (app.engine.ground_height - app.entity.height - ((app.entity.height * tmp_interval) * i)),
      speed: entity_speed(tmp_speed),
      color: "rgb(150, 75, 255)",
      move: tmp_move,
      score: 1
    });
  }
}
