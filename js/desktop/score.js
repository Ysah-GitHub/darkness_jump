function score_save(){
  localStorage.setItem("score", JSON.stringify(app.score));
}

function score_load(){
  if (localStorage.getItem("score")) {
    app.score = JSON.parse(localStorage.getItem("score"));
  }
  else {
    app.score = score_default();
    score_save();
  }
}

function score_default(){
  let tmp_score = {};
  for (let i = 0; i < app.stage.list.length; i++) {
    tmp_score[app.stage.list[i]] = {
      easy: {score: 0, completed: false},
      medium: {score: 0, completed: false},
      hard: {score: 0, completed: false},
      impossible: {score: 0, completed: false},
    };
  }
  return tmp_score;
}

function score_set(){
  app.score.tmp = 0;
}

function score_unset(){
  delete app.score.tmp;
}

function score_add(score){
  app.score.tmp += score;
  score_interface_update();
}

function score_update(){
  if (app.score.tmp > app.score[app.stage.current.name][app.stage.current.difficulty].score) {
    app.score[app.stage.current.name][app.stage.current.difficulty].score = app.score.tmp;
  }
}

function score_interface(){
  if (app.config.interface.score == "visible" && !document.getElementById("score")) {
    let tmp_score = document.createElement("span");
    tmp_score.id = "score";
    document.getElementById("interface").prepend(tmp_score);
  }
}

function score_interface_update(){
  if (app.config.interface.score == "visible") {
    document.getElementById("score").textContent = app.score.tmp;
  }
}

function score_interface_remove(){
  if (document.getElementById("score")) {
    document.getElementById("score").remove();
  }
}
