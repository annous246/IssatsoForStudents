window.addEventListener('unload', function() {
    // Send a logout request to the server
    fetch('/offline', {
      method: 'GET',
    });
  });