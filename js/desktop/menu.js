function menu_main_interface(){
  let tmp_menu = document.createElement("div")
  tmp_menu.id = "menu";
  tmp_menu.className = "main";

  let tmp_start = document.createElement("div");
  tmp_start.id = "menu_main_start";
  tmp_start.className = "text";
  tmp_start.textContent = translation().start;
  tmp_start.onclick = function(){document.getElementById("menu").remove(); menu_selection()};
  tmp_menu.append(tmp_start);

  let tmp_options = document.createElement("div");
  tmp_options.id = "menu_main_options";
  tmp_options.className = "text";
  tmp_options.textContent = translation().options;
  tmp_options.onclick = function(){document.getElementById("menu").remove(); options_interface()};
  tmp_menu.append(tmp_options);

  document.getElementById("interface").append(tmp_menu);
}

function menu_selection(stage){
  let tmp_menu = document.createElement("div");
  tmp_menu.id = "menu";
  tmp_menu.className = "selection";

  let tmp_menu_left = document.createElement("div");
  tmp_menu_left.id = "menu_selection_left";
  tmp_menu.append(tmp_menu_left);

  let tmp_stage_list = app.stage.list.slice().reverse();
  for (let i = 0; i < tmp_stage_list.length; i++) {
    let tmp_title_textContent = "";
    let tmp_title_text = tmp_stage_list[i].split("_");
    for (let i = 0; i < tmp_title_text.length; i++) {
      if (i > 0) {
        tmp_title_textContent += " ";
      }
      tmp_title_textContent += tmp_title_text[i].charAt(0).toUpperCase() + tmp_title_text[i].slice(1);
    }

    let tmp_title = document.createElement("span");
    tmp_title.id = tmp_stage_list[i];
    tmp_title.className = "text menu_selection_left_stage";
    tmp_title.textContent = tmp_title_textContent;
    tmp_title.onclick = function(){menu_interface_selection_right(tmp_stage_list[i])};
    tmp_menu_left.append(tmp_title);
  }

  let tmp_menu_right = document.createElement("div");
  tmp_menu_right.id = "menu_selection_right";
  tmp_menu_right.className = tmp_stage_list[0];
  tmp_menu.append(tmp_menu_right);

  document.getElementById("interface").append(tmp_menu);

  if (stage == null) {
    document.getElementById("menu_selection_left").children[0].click();
  }
  else {
    document.getElementById(stage).click();
  }
}

function menu_interface_selection_right(stage){
  app.stage.current.name = stage;

  if (!app.score[stage].easy.completed) {
    app.stage.current.difficulty = "easy";
  }
  else if (!app.score[stage].medium.completed) {
    app.stage.current.difficulty = "medium";
  }
  else if (!app.score[stage].hard.completed) {
    app.stage.current.difficulty = "hard";
  }
  else {
    app.stage.current.difficulty = "impossible";
  }

  if (document.getElementById("menu_selection_right")) {
    document.getElementById(document.getElementById("menu_selection_right").className).classList.remove("selected");
    document.getElementById("menu_selection_right").remove();
  }

  document.getElementById(stage).classList.add("selected");

  let tmp_menu = document.createElement("div");
  tmp_menu.id = "menu_selection_right";
  tmp_menu.className = stage;

  let tmp_title_textContent = "";
  let tmp_title_text = stage.split("_");
  for (let i = 0; i < tmp_title_text.length; i++) {
    if (i > 0) {
      tmp_title_textContent += " ";
    }
    tmp_title_textContent += tmp_title_text[i].charAt(0).toUpperCase() + tmp_title_text[i].slice(1);
  }
  let tmp_title = document.createElement("span");
  tmp_title.id = "menu_selection_right_stage";
  tmp_title.className = "text";
  tmp_title.textContent = tmp_title_textContent;
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

  let tmp_information = document.createElement("div");
  tmp_information.id = "menu_selection_information";

  let tmp_link = document.createElement("a");
  tmp_link.id = "menu_selection_link_music";
  tmp_link.href = app.music.list[stage].link;
  tmp_link.target = "_blank";

  let tmp_music = document.createElement("div");
  tmp_music.id = "menu_selection_music";
  tmp_music.className = "text";
  tmp_music.textContent = translation().music + " : " + app.music.list[stage].name + " / " + app.music.list[stage].author;
  tmp_link.append(tmp_music);

  let tmp_icon_link = document.createElement("span");
  tmp_icon_link.id = "menu_selection_music_icon_link";
  tmp_icon_link.className = "icon";
  tmp_icon_link.append(icon_link(app.engine.height * 0.02, app.engine.height * 0.02));
  tmp_link.append(tmp_icon_link);

  tmp_information.append(tmp_link);

  tmp_menu.append(tmp_information);

  let tmp_difficulty = document.createElement("div");
  tmp_difficulty.id = "menu_selection_difficulty";

  let tmp_array = ["easy", "medium", "hard", "impossible"];
  for (let i = 0; i < tmp_array.length; i++) {
    let tmp_difficulty_input = document.createElement("span");
    tmp_difficulty_input.id = tmp_array[i];
    tmp_difficulty_input.className = "text difficulty";
    tmp_difficulty_input.textContent = translation()[tmp_array[i]];
    if (i == 0 || app.score[app.stage.current.name][tmp_array[i - 1]].completed) {
      tmp_difficulty_input.classList.add("selectable");
      tmp_difficulty_input.onclick = function(){menu_interface_selection_right_difficulty(tmp_array[i])};
      tmp_difficulty.append(tmp_difficulty_input);
    }
    else {
      tmp_difficulty.append(tmp_difficulty_input);
      let tmp_icon_padlock = document.createElement("span");
      tmp_icon_padlock.className = "icon";
      tmp_icon_padlock.append(icon_padlock(app.engine.height * 0.02, app.engine.height * 0.02));
      tmp_difficulty.append(tmp_icon_padlock);
    }
  }

  let tmp_start = document.createElement("div");
  tmp_start.id = "menu_selection_start";
  tmp_start.className = "text";
  tmp_start.textContent = translation().start;
  tmp_start.onclick = stage_start;
  tmp_difficulty.append(tmp_start);

  tmp_menu.append(tmp_difficulty);

  document.getElementById("menu").append(tmp_menu);

  menu_interface_selection_right_difficulty(app.stage.current.difficulty);
}

function menu_interface_selection_right_difficulty(difficulty){
  document.getElementById(app.stage.current.difficulty).classList.remove("selected");

  app.stage.current.difficulty = difficulty;
  document.getElementById(app.stage.current.difficulty).classList.add("selected");
  menu_interface_selection_right_score();
}

function menu_interface_selection_right_score(){
  if (document.getElementById("menu_selection_score")) {
    document.getElementById("menu_selection_score").remove();
  }
  tmp_score = document.createElement("div");
  tmp_score.id = "menu_selection_score";
  tmp_score.className = "text";
  tmp_score.textContent = translation().score + " : " + app.score[app.stage.current.name][app.stage.current.difficulty].score;
  document.getElementById("menu_selection_link_music").after(tmp_score);
}
