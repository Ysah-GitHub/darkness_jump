app.control = {
  action_keydown: {left: [], right: [], jump: [], dash: [], start: [], return: []},
  action_keyup: {left: [], right: [], jump: [], dash: [], start: [], return: []}
}

function control_keydown_set(){
  window.addEventListener("keydown", control_keydown);
}

function control_keydown_unset(){
  window.removeEventListener("keydown", control_keydown);
}

function control_keydown(){
  switch (event.keyCode) {
    case app.config.input["left"].keyCode: control_keydown_action("left"); break;
    case app.config.input["right"].keyCode: control_keydown_action("right"); break;
    case app.config.input["jump"].keyCode: control_keydown_action("jump"); break;
    case app.config.input["dash"].keyCode: control_keydown_action("dash"); break;
    case app.config.input["start"].keyCode: control_keydown_action("start"); break;
    case app.config.input["return"].keyCode: control_keydown_action("return"); break;
  }
}

function control_keydown_action(key){
  let tmp_action = [];
  for (let i = 0; i < app.control.action_keydown[key].length; i++) {
    app.control.action_keydown[key][i][1](...app.control.action_keydown[key][i][2]);
    if (app.control.action_keydown[key][i][3]) {
      tmp_action.push(app.control.action_keydown[key][i]);
    }
  }
  for (let i = 0; i < tmp_action.length; i++) {
    control_keydown_action_remove(key, tmp_action[i][0]);
  }
}

function control_keydown_action_add(key, name, action, arguments, remove){
  app.control.action_keydown[key].push([name, action, arguments, remove]);
}

function control_keydown_action_remove(key, name){
  for (let i = 0; i < app.control.action_keydown[key].length; i++) {
    if (app.control.action_keydown[key][i][0] == name) {
      app.control.action_keydown[key].splice(i, 1);
      break;
    }
  }
}

function control_keydown_action_reset(key){
  app.control.action_keydown[key] = [];
}

function control_keydown_action_reset_all(){
  control_keydown_action_reset("left");
  control_keydown_action_reset("right");
  control_keydown_action_reset("jump");
  control_keydown_action_reset("dash");
  control_keydown_action_reset("start");
  control_keydown_action_reset("return");
}

function control_keyup_set(){
  window.addEventListener("keyup", control_keyup);
}

function control_keyup_unset(){
  window.removeEventListener("keyup", control_keyup);
}

function control_keyup(){
  switch (event.keyCode) {
    case app.config.input["left"].keyCode: control_keyup_action("left"); break;
    case app.config.input["right"].keyCode: control_keyup_action("right"); break;
    case app.config.input["jump"].keyCode: control_keyup_action("jump"); break;
    case app.config.input["dash"].keyCode: control_keyup_action("dash"); break;
    case app.config.input["start"].keyCode: control_keyup_action("start"); break;
    case app.config.input["return"].keyCode: control_keyup_action("return"); break;
  }
}

function control_keyup_action(key){
  let tmp_action = [];
  for (let i = 0; i < app.control.action_keyup[key].length; i++) {
    app.control.action_keyup[key][i][1](...app.control.action_keyup[key][i][2]);
    if (app.control.action_keyup[key][i][3]) {
      tmp_action.push(app.control.action_keyup[key][i]);
    }
  }
  for (let i = 0; i < tmp_action.length; i++) {
    control_keyup_action_remove(key, tmp_action[i][0]);
  }
}

function control_keyup_action_add(key, name, action, arguments, remove){
  app.control.action_keyup[key].push([name, action, arguments, remove]);
}

function control_keyup_action_remove(key, name){
  for (let i = 0; i < app.control.action_keyup[key].length; i++) {
    if (app.control.action_keyup[key][i][0] == name) {
      app.control.action_keyup[key].splice(i, 1);
      break;
    }
  }
}

function control_keyup_action_reset(key){
  app.control.action_keyup[key] = [];
}

function control_keyup_action_reset_all(){
  control_keyup_action_reset("left");
  control_keyup_action_reset("right");
  control_keyup_action_reset("jump");
  control_keyup_action_reset("dash");
  control_keyup_action_reset("start");
  control_keyup_action_reset("return");
}
