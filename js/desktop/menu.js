function menu_main_interface(){
  let tmp_menu = document.createElement("div")
  tmp_menu.id = "menu";
  tmp_menu.className = "main";

  let tmp_start = document.createElement("div");
  tmp_start.id = "menu_main_start";
  tmp_start.className = "text";
  tmp_start.textContent = "Start";
  tmp_start.onclick = function(){document.getElementById("menu").remove(); menu_selection()};
  tmp_menu.append(tmp_start);

  let tmp_options = document.createElement("div");
  tmp_options.id = "menu_main_options";
  tmp_options.className = "text";
  tmp_options.textContent = "Options";
  tmp_options.onclick = function(){document.getElementById("menu").remove(); options_interface()};
  tmp_menu.append(tmp_options);

  document.getElementById("interface").append(tmp_menu);
}

function menu_selection(){
  let tmp_menu = document.createElement("div");
  tmp_menu.id = "menu";
  tmp_menu.className = "selection";

  let tmp_menu_left = document.createElement("div");
  tmp_menu_left.id = "menu_selection_left";
  tmp_menu.append(tmp_menu_left);

  for (let i = 0; i < app.stage.list.length; i++) {
    let tmp_title = document.createElement("span");
    tmp_title.id = app.stage.list[i];
    tmp_title.className = "text menu_selection_left_stage";
    tmp_title.textContent = app.stage.list[i];
    tmp_title.onclick = function(){menu_interface_selection_right(app.stage.list[i])};
    tmp_menu_left.append(tmp_title);
  }

  let tmp_menu_right = document.createElement("div");
  tmp_menu_right.id = "menu_selection_right";
  tmp_menu_right.className = app.stage.list[0];
  tmp_menu.append(tmp_menu_right);

  document.getElementById("interface").append(tmp_menu);

  document.getElementById("menu_selection_left").children[0].click();
}

function menu_interface_selection_right(stage){
  app.stage.current.name = stage;
  if (app.score[stage].impossible.completed || app.score[stage].hard.completed) {
    app.stage.current.difficulty = "impossible";
  }
  else if (app.score[stage].medium.completed) {
    app.stage.current.difficulty = "hard";
  }
  else if (app.score[stage].easy.completed) {
    app.stage.current.difficulty = "medium";
  }
  else {
    app.stage.current.difficulty = "easy";
  }

  if (document.getElementById("menu_selection_right")) {
    document.getElementById(document.getElementById("menu_selection_right").className).classList.remove("selected");
    document.getElementById("menu_selection_right").remove();
  }

  document.getElementById(stage).classList.add("selected");

  let tmp_menu = document.createElement("div");
  tmp_menu.id = "menu_selection_right";
  tmp_menu.className = stage;

  let tmp_title = document.createElement("span");
  tmp_title.id = "menu_selection_right_stage";
  tmp_title.className = "text";
  tmp_title.textContent = stage;
  tmp_menu.append(tmp_title);

  let tmp_icon = document.createElement("span");
  tmp_icon.id = "menu_selection_icon_close";
  tmp_icon.className = "icon close";
  tmp_icon.onclick = function(){
    app.stage.current.name = null;
    app.stage.current.difficulty = null;
    document.getElementById("menu").remove();
    menu_main_interface();
  };
  tmp_icon.append(icon_close(app.engine.height * 0.05, app.engine.height * 0.05));
  tmp_menu.append(tmp_icon);

  let tmp_difficulty = document.createElement("div");
  tmp_difficulty.id = "menu_selection_difficulty";

  tmp_difficulty.append(menu_interface_selection_right_difficulty_input("Easy"));
  tmp_difficulty.append(menu_interface_selection_right_difficulty_input("Medium"));
  tmp_difficulty.append(menu_interface_selection_right_difficulty_input("Hard"));

  if (app.score[stage].easy.completed && app.score[stage].medium.completed && app.score[stage].hard.completed) {
    tmp_difficulty.append(menu_interface_selection_right_difficulty_input("Impossible"));
  }

  tmp_menu.append(tmp_difficulty);

  let tmp_start = document.createElement("div");
  tmp_start.id = "menu_selection_start";
  tmp_start.className = "text";
  tmp_start.textContent = "Start";
  tmp_start.onclick = stage_start;
  tmp_menu.append(tmp_start);

  let tmp_music = document.createElement("div");
  tmp_music.id = "menu_selection_music";
  tmp_music.className = "text";
  tmp_music.textContent = "music : " + app.music.list[stage].name + " / " + app.music.list[stage].author;
  tmp_menu.append(tmp_music);

  let tmp_music_duration = document.createElement("div");
  tmp_music_duration.id = "menu_selection_music_duration";
  tmp_music_duration.className = "text";
  tmp_music_duration.textContent = app.music.list[stage].duration.minute + ":" + app.music.list[stage].duration.second;
  tmp_menu.append(tmp_music_duration);

  document.getElementById("menu").append(tmp_menu);

  menu_interface_selection_right_difficulty(app.stage.current.difficulty);
}

function menu_interface_selection_right_difficulty(difficulty){
  document.getElementById(app.stage.current.difficulty).classList.remove("selected");

  app.stage.current.difficulty = difficulty;
  document.getElementById(app.stage.current.difficulty).classList.add("selected");
  menu_interface_selection_right_score();
}

function menu_interface_selection_right_difficulty_input(name) {
  let tmp_input = document.createElement("span");
  tmp_input.id = name.toLowerCase();
  tmp_input.className = "text";
  tmp_input.textContent = name;
  tmp_input.onclick = function(){menu_interface_selection_right_difficulty(name.toLowerCase())};
  return tmp_input;
}

function menu_interface_selection_right_score(){
  if (document.getElementById("menu_selection_score")) {
    document.getElementById("menu_selection_score").remove();
  }
  tmp_score = document.createElement("div");
  tmp_score.id = "menu_selection_score";
  tmp_score.className = "text";
  tmp_score.textContent = "Score : " + app.score[app.stage.current.name][app.stage.current.difficulty].score;
  document.getElementById("menu_selection_start").after(tmp_score);
}
