var engine = {};

function engine_element_add(name, func, arguments){
  engine.element.push([name, func, arguments]);
}

function engine_element_remove(name){
  for (let i = 0; i < engine.element.length; i++) {
    if (engine.element[i][0] == name) {
      engine.element.splice(i, 1);
      break;
    }
  }
}

function engine_load(){
  engine.element = [];
  engine.event = [];
  engine_size_auto();

  player_load();
  engine_element_add("engine_draw_player", engine_draw_player);

  engine_create();
  engine.refresh = window.requestAnimationFrame(engine_refresh);

  window.addEventListener("resize", engine_resize);
}

function engine_size_auto(){
  engine.width = window.innerWidth;
  engine.height = window.innerHeight / 2;
}

function engine_resize(){
  engine_size_auto();
  player_limit_default();
  player_position_default();
  document.getElementById("engine").width = engine.width;
  document.getElementById("engine").height = engine.height;
}

function engine_create(){
  let tmp_engine = document.createElement("canvas");
  tmp_engine.id = "engine";
  tmp_engine.width = engine.width;
  tmp_engine.height = engine.height;
  document.body.prepend(tmp_engine);
}

function engine_start(){
  interface_start_remove();
  interface_options_remove();
  entity_generate();
  engine_element_add("engine_draw_entity", engine_draw_entity);
}

function engine_refresh(){
  let ctx = document.getElementById("engine").getContext("2d");
  ctx.clearRect(0, 0, engine.width, engine.height);

  for (let i = 0; i < engine.element.length; i++) {
    engine.element[i][1](ctx);
  }

  engine.refresh = window.requestAnimationFrame(engine_refresh);
}

function engine_draw_player(ctx){
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function engine_draw_entity(ctx){
  for (let i = 0; i < Object.keys(entity.list).length; i++) {
    let tmp_entity = entity.list[Object.keys(entity.list)[i]]
    ctx.fillStyle = tmp_entity.color;
    ctx.fillRect(tmp_entity.x, tmp_entity.y, tmp_entity.width, tmp_entity.height);
  }
}
