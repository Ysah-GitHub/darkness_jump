var entity = {
  score: 0,
  list: {},
  spawnrate: 1,
  timeout: null
}

function entity_generate(){
  entity.score++;
  entity.list[entity.score] = {
    id: entity.score,
    width: 50,
    height: 50,
    x: engine.width,
    y: (engine.height - 50),
    speed: 1,
    color: "rgb(255, 75, 75)",
    move: {func: function(){entity_move_left(entity.list[entity.score])}, interval: null}
  };
  entity.list[entity.score].move.func();
  entity.timeout = setTimeout(entity_generate, ((((Math.floor(Math.random() * 10) + 1) * entity.spawnrate) * 100)));
}

function entity_move_left(tmp_entity){
  tmp_entity.move.interval = setInterval(function(){
    tmp_entity.x -= 5 * tmp_entity.speed;
    if (tmp_entity.x < (0 - tmp_entity.width)) {
      clearInterval(tmp_entity.move.interval);
      delete entity.list[tmp_entity.id];
    }
  }, 5);
}
