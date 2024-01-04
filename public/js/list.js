const completedButton = $("#completed");
completedButton.on("click", showCompletedTable());
function showCompletedTable() {
  $(".completed-table").attr("display", block);
  $(".watching-table").attr("display", none);
  $(".planning-table").attr("display", none);
}

const watchingButton = $("#watching");
watchingButton.on("click", showWatchingTable());
function showWatchingTable() {
  $(".completed-table").attr("display", none);
  $(".watching-table").attr("display", block);
  $(".planning-table").attr("display", none);
}

const planningButton = $("#planning");
planningButton.on("click", showPlanningTable());
function showPlanningTable() {
  $(".completed-table").attr("display", none);
  $(".watching-table").attr("display", none);
  $(".planning-table").attr("display", block);
}
