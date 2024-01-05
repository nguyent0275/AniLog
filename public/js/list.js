const completedButton = $("#completed");
completedButton.on("click", () => {
  $("#completed-table").attr("style", "display: block");
  $("#watching-table").attr("style", "display: none");
  $("#planning-table").attr("style", "display: none");
})

const watchingButton = $("#watching");
watchingButton.on("click", () => {
  $("#completed-table").attr("style", "display: none");
  $("#watching-table").attr("style", "display: block");
  $("#planning-table").attr("style", "display: none");
})

const planningButton = $("#planning");
planningButton.on("click", () => {
  $("#completed-table").attr("style", "display: none");
  $("#watching-table").attr("style", "display: none");
  $("#planning-table").attr("style", "display: block");
})
