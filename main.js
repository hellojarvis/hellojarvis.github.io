requirejs.config({
    paths: {
        superagent: 'https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min'
    }
});

requirejs(["superagent"], function(request) {
  setServingText(request);
  setInterval(function() {
    setServingText(request);
  }, 100000);
});

function setServingText(request) {
  request
  .get("https://hellojarvis.herokuapp.com/metrics")
  .end(function(err, res) {
    var servingText = "Jarvis sent " + res.body['num_reminders'] + " reminders to " + res.body['num_users'] + " users.";
    document.getElementById('served').textContent = servingText;
  });
}
