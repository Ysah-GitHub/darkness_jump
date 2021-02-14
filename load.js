var app = {
  version: "a.1.3.1",
  device: device(),
  language: language()
};

window.onload = function(){
  // service_worker();
  load_file();
};

function service_worker(){
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service_worker.js");
  };
}

function load(){
  engine_load();
}

function load_file(){
  load_file_css(load_file_list_css(app.device));
}

function load_file_list_css(device){
  // --- Main Files
  let tmp_file_list = [
    "css/reset.css",
    "css/main.css"
  ];

  // --- Desktop Files
  if (device == "desktop") {
    tmp_file_list = tmp_file_list.concat([
      "css/desktop/animation.css",
      "css/desktop/engine.css",
      "css/desktop/interface.css",
      "css/desktop/options.css",
      "css/desktop/icon.css"
    ]);
  }
  // --- Smartphone Files
  else {
    tmp_file_list = tmp_file_list.concat([

    ]);
  }

  return tmp_file_list;
}

function load_file_list_js(device){
  // --- Main Files
  let tmp_file_list = [

  ];

  // --- Desktop Files
  if (device == "desktop") {
    tmp_file_list = tmp_file_list.concat([
      "js/desktop/control.js",
      "js/desktop/player.js",
      "js/desktop/entity.js",
      "js/desktop/engine.js",
      "js/desktop/interface.js",
      "js/desktop/icon.js",
      "js/desktop/stage.js",
      "js/desktop/music.js"
    ]);
  }
  // --- Smartphone Files
  else {
    tmp_file_list = tmp_file_list.concat([

    ]);
  }

  return tmp_file_list;
}

function load_file_css(file_list){
  let tmp_file = document.createElement("link");
  tmp_file.rel = "stylesheet";
  tmp_file.href = file_list[0];
  file_list.splice(0, 1);

  if (file_list.length > 0) {
    tmp_file.onload = function(){load_file_css(file_list)};
    tmp_file.onerror = function(){load_file_css(file_list)};
  }
  else {
    tmp_file.onload = function(){load_file_js(load_file_list_js(app.device))};
    tmp_file.onerror = function(){load_file_js(load_file_list_js(app.device))};
  }

  document.head.append(tmp_file);
}

function load_file_js(file_list){
  if (file_list.length > 0) {
    let tmp_file = document.createElement("script");
    tmp_file.src = file_list[0];
    file_list.splice(0, 1);
    tmp_file.onload = function(){load_file_js(file_list)};
    tmp_file.onerror = function(){load_file_js(file_list)};

    document.body.append(tmp_file);
  }
  else {
    load();
  }
}

function device(){
  return /Mobi/.test(navigator.userAgent) ? "smartphone" : "desktop";
}

function language(){
  let tmp_language = navigator.language.substr(0,2);
  let tmp_language_available = ["en", "fr"];
  return tmp_language_available.includes(tmp_language) ? tmp_language : "en";
}
