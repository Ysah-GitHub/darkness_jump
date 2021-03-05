function stage_nostalgia_start(){
  music_play("bonetrousle");
  app.music.curent.onplay = function(){
    stage_event_add(stage_nostalgia_red_left, 0);
    stage_event_add(stage_nostalgia_red_wall_left, 32);
    stage_event_add(stage_nostalgia_red_wall_left, 35);
    stage_event_add(stage_nostalgia_red_wall_left, 38);
    stage_event_add(stage_nostalgia_red_wall_left, 41);
    stage_event_add(stage_nostalgia_red_wall_left, 44);
    stage_event_add(stage_nostalgia_red_wall_left, 47);
    stage_event_add(function(){
      entity_spawn_clear();
      entity_explosion(50, (app.entity.width / 5), (app.entity.height / 5), 0.5);
      engine_element_add("engine_draw_entity_explosion", engine_draw_entity_explosion);
      entity_remove_all();
      music_play("spider_dance");
      stage_nostalgia_purple_left();
    }, 58);
    stage_event_add(stage_nostalgia_purple_wall_left, 91);
    stage_event_add(stage_nostalgia_purple_wall_right, 96);
    stage_event_add(stage_nostalgia_purple_wall_left, 101);
    stage_event_add(stage_nostalgia_purple_wall_right, 106);
    stage_event_add(stage_nostalgia_purple_wall_left, 111);
    stage_event_add(stage_nostalgia_purple_wall_right, 116);
    stage_event_add(stage_nostalgia_purple_wall_left, 121);
    stage_event_add(function(){entity_spawn_clear(); stage_nostalgia_purple_down()}, 124);
    stage_event_add(function(){
      entity_spawn_clear();
      entity_explosion(50, (app.entity.width / 5), (app.entity.height / 5), 0.5);
      engine_element_add("engine_draw_entity_explosion", engine_draw_entity_explosion);
      entity_remove_all();
      stage_end();
    }, 163);
    stage_event();
  };
}

function stage_nostalgia_red_left(){
  entity_new({
    width: app.entity.width,
    height: app.entity.height,
    x: engine.width,
    y: (engine.ground_height - app.entity.height),
    speed: entity_speed(1),
    color: "rgb(255, 75, 75)",
    move: entity_move_left,
    score: 1
  });

  if (app.entity.spawn.rate > 0.6) {
    app.entity.spawn.rate -= 0.005;
  }
  app.entity.move.base += (app.entity.width / 30) * 0.003;
  app.entity.spawn.timeout = setTimeout(stage_nostalgia_red_left, ((((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate) * 100)));
}

function stage_nostalgia_red_wall_left(){
  entity_new({
    width: app.entity.width,
    height: app.entity.height * 5,
    x: engine.width,
    y: engine.ground_height - (app.entity.height * 5),
    speed: entity_speed(0.9),
    color: "rgb(255, 75, 75)",
    move: entity_move_left,
    score: 4
  });
}

function stage_nostalgia_purple_left(){
  entity_new({
    width: app.entity.width,
    height: app.entity.height,
    x: engine.width,
    y: (engine.ground_height - app.entity.height * (Math.floor(Math.random() * 2) + 1)),
    speed: entity_speed(1),
    color: "rgb(150, 75, 255)",
    move: entity_move_left,
    score: 1
  });

  app.entity.spawn.timeout = setTimeout(stage_nostalgia_purple_left, ((((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate) * 100)));
}

function stage_nostalgia_purple_down(){
  entity_new({
    width: app.entity.width,
    height: app.entity.height,
    x: (Math.random() * (engine.width - app.entity.width)),
    y: (0 - app.entity.height),
    speed: entity_speed(0.5),
    color: "rgb(150, 75, 255)",
    move: entity_move_down,
    score: 1
  });

  app.entity.spawn.timeout = setTimeout(stage_nostalgia_purple_down, ((((Math.floor(Math.random() * 8) + 3) * 0.1) * 100)));
}

function stage_nostalgia_purple_wall_left(){
  let tmp_number = Math.round((engine.height / 2) / (app.entity.height * 4));
  for (let i = 0; i < tmp_number; i++) {
    entity_new({
      width: app.entity.width,
      height: app.entity.height,
      x: engine.width,
      y: (engine.ground_height - app.entity.height - ((app.entity.height * 4) * i)),
      speed: entity_speed(1.2),
      color: "rgb(150, 75, 255)",
      move: entity_move_left,
      score: 8
    });
  }
}

function stage_nostalgia_purple_wall_right(){
  let tmp_number = Math.round((engine.height / 2) / (app.entity.height * 4));
  for (let i = 0; i < tmp_number; i++) {
    entity_new({
      width: app.entity.width,
      height: app.entity.height,
      x: 0 - app.entity.width,
      y: (engine.ground_height - app.entity.height - ((app.entity.height * 4) * i)),
      speed: entity_speed(0.8),
      color: "rgb(150, 75, 255)",
      move: entity_move_right,
      score: 8
    });
  }
}
