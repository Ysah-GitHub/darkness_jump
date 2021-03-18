var app = {
  version: "a.1.5.0",
  device: app_device()
};

function app_config_save(){
  localStorage.setItem("config_" + app.version, JSON.stringify(app.config));
}

function app_config_load(){
  if (localStorage.getItem("config_" + app.version)) {
    // temp add name of version for developpement
    app.config = JSON.parse(localStorage.getItem("config_" + app.version));
  }
  else {
    app.config = app_config_default();
    app_config_save();
  }
}

function app_config_default(){
  return tmp_config = {
    video: {
      resolution: screen.width + "x" + screen.height
    },
    interface: {
      language: app_language_default(),
      ground_color: "#555555",
      score: "visible",
      timer: "visible"
    },
    input: {
      left: {key: "ArrowLeft", keyCode: 37},
      right: {key: "ArrowRight", keyCode: 39},
      jump: {key: "Space", keyCode: 32},
      dash: {key: "d", keyCode: 68},
      start: {key: "Enter", keyCode: 13},
      return: {key: "Backspace", keyCode: 8}
    },
    audio: {
      volume: 0.35
    }
  };
}

function app_language_default(){
  let tmp_language = navigator.language.substr(0,2);
  let tmp_language_available = ["en", "fr"];
  return tmp_language_available.includes(tmp_language) ? tmp_language : "en";
}

function app_device(){
  return /Mobi/.test(navigator.userAgent) ? "smartphone" : "desktop";
}

function app_file_list_css(){
  let tmp_file_list = {
    main: [
      "css/reset.css",
      "css/main.css"
    ],
    desktop: [
      "css/desktop/animation.css",
      "css/desktop/icon.css",
      "css/desktop/menu.css",
      "css/desktop/options.css",
      "css/desktop/stage.css"
    ],
    smartphone: []
  };

  return tmp_file_list.main.concat(tmp_file_list[app.device]);
}

function app_file_list_css_load(file_list){
  let tmp_file = document.createElement("link");
  tmp_file.rel = "stylesheet";
  tmp_file.href = file_list[0];
  file_list.splice(0, 1);

  if (file_list.length > 0) {
    tmp_file.onload = function(){app_file_list_css_load(file_list)};
    tmp_file.onerror = function(){app_file_list_css_load(file_list)};
  }
  else {
    tmp_file.onload = function(){app_file_list_js_load(app_file_list_js())};
    tmp_file.onerror = function(){app_file_list_js_load(app_file_list_js())};
  }

  document.head.append(tmp_file);
}

function app_file_list_js(){
  let tmp_file_list = {
    main: [],
    desktop: [
      "js/desktop/translation/" + app.config.interface.language + "/translation.js",
      "js/desktop/menu.js",
      "js/desktop/options.js",
      "js/desktop/control.js",
      "js/desktop/player.js",
      "js/desktop/entity.js",
      "js/desktop/engine.js",
      "js/desktop/icon.js",
      "js/desktop/stage.js",
      "js/desktop/score.js",
      "js/desktop/music.js",
      "js/desktop/stage/bonetrousle.js",
      "js/desktop/stage/spider_dance.js",
    ],
    smartphone: []
  };

  return tmp_file_list.main.concat(tmp_file_list[app.device]);
}

function app_file_list_js_load(file_list){
  if (file_list.length > 0) {
    let tmp_file = document.createElement("script");
    tmp_file.src = file_list[0];
    file_list.splice(0, 1);
    tmp_file.onload = function(){app_file_list_js_load(file_list)};
    tmp_file.onerror = function(){app_file_list_js_load(file_list)};

    document.body.append(tmp_file);
  }
  else {
    load();
  }
}

window.onload = function(){
  app_config_load();
  app_file_list_css_load(app_file_list_css());
};

function load(){
  let tmp_element = document.createElement("canvas");
  tmp_element.id = "engine";
  document.body.prepend(tmp_element);

  tmp_element = document.createElement("div");
  tmp_element.id = "interface";
  document.body.prepend(tmp_element);

  menu_main_interface();

  score_load();
  engine_load();
}
