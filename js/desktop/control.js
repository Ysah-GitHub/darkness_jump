var control = {
  default: {left: 37, right: 39, jump: 32, start: 13},
  custom: {left: null, right: null, jump: null, start: null},
  action_keydown: {left: [], right: [], jump: [], start: []},
  action_keyup: {left: [], right: [], jump: [], start: []}
}

function control_keydown_set(){
  window.addEventListener("keydown", control_keydown);
}

function control_keydown_unset(){
  window.removeEventListener("keydown", control_keydown);
}

function control_keydown(){
  switch (event.keyCode) {
    case control.default["left"]: control_keydown_action("left"); break;
    case control.default["right"]: control_keydown_action("right"); break;
    case control.default["jump"]: control_keydown_action("jump"); break;
    case control.default["start"]: control_keydown_action("start"); break;
  }
}

function control_keydown_action(key){
  let tmp_action = [];
  for (let i = 0; i < control.action_keydown[key].length; i++) {
    control.action_keydown[key][i][1](...control.action_keydown[key][i][2]);
    if (control.action_keydown[key][i][3]) {
      tmp_action.push(control.action_keydown[key][i]);
    }
  }
  for (let i = 0; i < tmp_action.length; i++) {
    control_keydown_action_remove(key, tmp_action[i][0]);
  }
}

function control_keydown_action_add(key, name, action, arguments, remove){
  control.action_keydown[key].push([name, action, arguments, remove]);
}

function control_keydown_action_remove(key, name){
  for (let i = 0; i < control.action_keydown[key].length; i++) {
    if (control.action_keydown[key][i][0] == name) {
      control.action_keydown[key].splice(i, 1);
      break;
    }
  }
}

function control_keydown_action_reset(key){
  control.action_keydown[key] = [];
}

function control_keydown_action_reset_all(){
  control_keydown_action_reset("left");
  control_keydown_action_reset("right");
  control_keydown_action_reset("jump");
  control_keydown_action_reset("start");
}

function control_keyup_set(){
  window.addEventListener("keyup", control_keyup);
}

function control_keyup_unset(){
  window.removeEventListener("keyup", control_keyup);
}

function control_keyup(){
  switch (event.keyCode) {
    case control.default["left"]: control_keyup_action("left"); break;
    case control.default["right"]: control_keyup_action("right"); break;
    case control.default["jump"]: control_keyup_action("jump"); break;
    case control.default["start"]: control_keyup_action("start"); break;
  }
}

function control_keyup_action(key){
  let tmp_action = [];
  for (let i = 0; i < control.action_keyup[key].length; i++) {
    control.action_keyup[key][i][1](...control.action_keyup[key][i][2]);
    if (control.action_keyup[key][i][3]) {
      tmp_action.push(control.action_keyup[key][i]);
    }
  }
  for (let i = 0; i < tmp_action.length; i++) {
    control_keyup_action_remove(key, tmp_action[i][0]);
  }
}

function control_keyup_action_add(key, name, action, arguments, remove){
  control.action_keyup[key].push([name, action, arguments, remove]);
}

function control_keyup_action_remove(key, name){
  for (let i = 0; i < control.action_keyup[key].length; i++) {
    if (control.action_keyup[key][i][0] == name) {
      control.action_keyup[key].splice(i, 1);
      break;
    }
  }
}

function control_keyup_action_reset(key){
  control.action_keyup[key] = [];
}

function control_keyup_action_reset_all(){
  control_keyup_action_reset("left");
  control_keyup_action_reset("right");
  control_keyup_action_reset("jump");
  control_keyup_action_reset("start");
}
