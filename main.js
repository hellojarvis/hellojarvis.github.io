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
    var servingText = "Jarvis has served over 10000 reminders.";
    document.getElementById('served').textContent = servingText;
}
