function setServingText(request) {
  request
  .get("https://hellojarvis.herokuapp.com/metrics")
  .end(function(err, res) {
    var servingText = "Jarvis sent " + res.body['num_reminders'] + " reminders to " + res.body['num_users'] + " users.";
    document.getElementById('served').textContent = servingText;
  });
}

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

	var handler = StripeCheckout.configure({
		key: 'pk_test_TKp9AXtzoJkgWJN2W2RAr03p',
		image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
		locale: 'auto',
		token: function(token) {
      console.log(token);
      request
      .get('https://hellojarvis.herokuapp.com/donate')
      .query({token: token.id})
      .end(function(err, res) {
        console.log(err);
        console.log(res);
      });
		}
	});

	document.getElementById('donate').addEventListener('click', function(e) {
		// Open Checkout with further options:
		handler.open({
			name: 'Jarvis',
			description: 'Donation',
			amount: 200,
      image: 'jarvis.jpg',
      bitcoin: true
		});
		e.preventDefault();
	});
  window.addEventListener('popstate', function() {
    handler.close();
  });
});


