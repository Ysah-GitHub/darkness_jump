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
  engine_size_default();

  player_load();
  engine_element_add("engine_draw_player", engine_draw_player);
  engine_element_add("engine_draw_start", engine_draw_start);

  engine_create();

  engine_event_click_set();
  engine_event_click_add("engine_start", engine_start, ((engine.width / 2) - 110), ((engine.height / 2) - 60), 220, 80);

  engine.refresh = window.requestAnimationFrame(engine_refresh);
}

function engine_size_default(){
  engine.width = window.innerWidth;
  engine.height = window.innerHeight / 2;
}

function engine_create(){
  let tmp_engine = document.createElement("canvas");
  tmp_engine.id = "engine";
  tmp_engine.width = engine.width;
  tmp_engine.height = engine.height;
  document.body.prepend(tmp_engine);
}

function engine_start(){
  console.log("start !");
}

function engine_refresh(){
  let ctx = document.getElementById("engine").getContext("2d");
  ctx.clearRect(0, 0, engine.width, engine.height);

  for (let i = 0; i < engine.element.length; i++) {
    engine.element[i][1](ctx);
  }

  engine.refresh = window.requestAnimationFrame(engine_refresh);
}

function engine_event_click_set(){
  engine.event.click = [];
  document.getElementById("engine").addEventListener("click", engine_event_click);
}

function engine_event_click_unset(){
  delete engine.event.click;
  document.getElementById("engine").removeEventListener("click", engine_event_click);
}

function engine_event_click(event){
  // console.log("x : " + event.clientX);
  // console.log("y : " + event.clientY);
  // console.log("------------");
  for (let i = 0; i < engine.event.click.length; i++) {
    if (
      event.clientX > engine.event.click[i][2] &&
      event.clientX < engine.event.click[i][2] + engine.event.click[i][4] &&
      event.clientY > engine.event.click[i][3] &&
      event.clientY < engine.event.click[i][3] + engine.event.click[i][5]
    ) {
      engine.event.click[i][1]();
    }
  }
}

function engine_event_click_add(name, func, x, y, width, height){
  engine.event.click.push([name, func, x, y, width, height]);
}

function engine_draw_player(ctx){
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function engine_draw_start(ctx){
  ctx.font = "60px Lucida Console";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.textAlign = "center";
  ctx.fillText("Start", (engine.width / 2), (engine.height / 2));
}
