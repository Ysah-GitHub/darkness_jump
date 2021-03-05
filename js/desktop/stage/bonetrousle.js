function stage_bonetrousle_start_easy(){
  music_play("bonetrousle");
  app.music.curent.onplay = function(){
    stage_event_add(stage_bonetrousle_red_left, 0);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all(); stage_bonetrousle_red_range_left([1, 2, 3, 2, 1])}, 7);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(3, 1)}, 13);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1)}, 19);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1)}, 21);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1)}, 23);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1)}, 25);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all(); stage_bonetrousle_red_range_left([1, 2, 4, 2, 1])}, 32);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(9, 0.5)}, 33);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all()}, 35);
    stage_event_add(function(){stage_bonetrousle_red_range_left([1, 2, 3, 2, 1])}, 35);
    stage_event_add(function(){stage_bonetrousle_red_range_left([1, 2, 3, 2, 1])}, 38);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(3, 1)}, 40);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1)}, 42);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1)}, 44);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1)}, 46);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1)}, 50);
    stage_event();
  };
  app.music.curent.onended = stage_end;
}

function stage_bonetrousle_start_medium(){
  music_play("bonetrousle");
  app.music.curent.onplay = function(){
    stage_event_add(stage_bonetrousle_red_left, 0);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all(); stage_bonetrousle_red_range_left([1, 2, 5, 2, 1])}, 7);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 0.8)}, 13);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.4)}, 19);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.2)}, 21);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.2)}, 23);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.2)}, 25);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all(); stage_bonetrousle_red_range_left([1, 3, 5, 3, 1])}, 32);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(9, 0.5)}, 33);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all()}, 35);
    stage_event_add(function(){stage_bonetrousle_red_range_left([1, 5, 6, 5, 1])}, 35);
    stage_event_add(function(){stage_bonetrousle_red_range_left([1, 3, 5, 3, 1])}, 38);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1.2)}, 40);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.2)}, 42);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.2)}, 44);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.2)}, 46);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.2)}, 50);
    stage_event();
  };
  app.music.curent.onended = stage_end;
}

function stage_bonetrousle_start_hard(){
  music_play("bonetrousle");
  app.music.curent.onplay = function(){
    stage_event_add(stage_bonetrousle_red_left, 0);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all(); stage_bonetrousle_red_range_left([1, 3, 6, 3, 1])}, 7);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 0.3)}, 13);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(6, 0.4)}, 19);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(6, 0.5)}, 21);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 1.6)}, 23);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(6, 1.6)}, 25);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all(); stage_bonetrousle_red_range_left([2, 4, 6, 4, 2])}, 32);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(9, 0.6)}, 33);
    stage_event_add(function(){entity_explosion_all(); entity_remove_all()}, 35);
    stage_event_add(function(){stage_bonetrousle_red_range_left([2, 4, 7, 4, 2])}, 35);
    stage_event_add(function(){stage_bonetrousle_red_range_left([1, 3, 7, 3, 1])}, 38);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(6, 1.6)}, 40);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(7, 0.5)}, 42);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 0.8)}, 44);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(4, 1.6)}, 46);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(7, 0.3)}, 50);
    stage_event();
  };
  app.music.curent.onended = stage_end;
}

function stage_bonetrousle_start_impossible(){
  music_play("bonetrousle");
  app.music.curent.onplay = function(){
    stage_event_add(function(){app.entity.spawn.rate = 0.5}, 0);
    stage_event_add(stage_bonetrousle_red_left, 0);
    stage_event_add(function(){stage_bonetrousle_red_range_left([1, 5, 8, 5, 1])}, 7);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(7, 0.3)}, 13);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(8, 0.4)}, 19);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(7, 0.5)}, 21);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(6, 1.8)}, 23);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(7, 1.8)}, 25);
    stage_event_add(function(){stage_bonetrousle_red_range_left([3, 6, 9, 6, 3])}, 32);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(9, 1.8)}, 33);
    stage_event_add(function(){stage_bonetrousle_red_range_left([4, 8, 8, 8, 4])}, 35);
    stage_event_add(function(){stage_bonetrousle_red_range_left([2, 8, 4, 8, 2])}, 38);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(7, 1.8)}, 40);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(8, 0.5)}, 42);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(6, 0.8)}, 44);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(5, 0.3)}, 46);
    stage_event_add(function(){stage_bonetrousle_red_left_custom(9, 2)}, 50);
    stage_event();
  };
  app.music.curent.onended = stage_end;
}

function stage_bonetrousle_red_left(){
  let tmp_speed;
  let tmp_random_timer = (((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate) * 100);

  switch (app.stage.current.difficulty) {
    case "easy":
      tmp_speed = 1;
      break;
    case "medium":
      tmp_speed = 1.2;
      entity_spawn_update(0.005, 0.8);
      break;
    case "hard":
      tmp_speed = 1.4;
      entity_spawn_update(0.005, 0.6);
      break;
    case "impossible":
      if (Math.floor(Math.random() * 2) == 0) {
        tmp_speed = Math.floor(Math.random() * 100) / 100 + 1;
      }
      else {
        tmp_speed = Math.floor(Math.random() * 100) / 100 + 0.5;
      }
  }

  entity_new({
    width: app.entity.width,
    height: app.entity.height,
    x: app.engine.width,
    y: (app.engine.ground_height - app.entity.height),
    speed: entity_speed(tmp_speed),
    color: "rgb(255, 75, 75)",
    move: entity_move_left,
    score: 1
  });

  app.entity.spawn.timeout = setTimeout(stage_bonetrousle_red_left, tmp_random_timer);
}

function stage_bonetrousle_red_left_custom(height, speed){
  entity_new({
    width: app.entity.width,
    height: app.entity.height * height,
    x: app.engine.width,
    y: app.engine.ground_height - (app.entity.height * height),
    speed: entity_speed(speed),
    color: "rgb(255, 75, 75)",
    move: entity_move_left,
    score: height
  });
}

function stage_bonetrousle_red_range_left(entity_array){
  let tmp_speed;
  let tmp_random_timer = (((Math.floor(Math.random() * 8) + 3) * app.entity.spawn.rate) * 100);
  switch (app.stage.current.difficulty) {
    case "easy": tmp_speed = 1; break;
    case "medium": tmp_speed = 1.2; break;
    case "hard": tmp_speed = 1.4; break;
    case "impossible": tmp_speed = 1.8;
  }
  stage_bonetrousle_red_left_custom(entity_array[0], tmp_speed);
  entity_array.splice(0, 1);
  entity_spawn_clear();
  if (entity_array.length > 0) {
    app.entity.spawn.timeout = setTimeout(stage_bonetrousle_red_range_left, 90, entity_array);
  }
  else {
    app.entity.spawn.timeout = setTimeout(stage_bonetrousle_red_left, tmp_random_timer);
  }
}
