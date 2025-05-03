document.getElementById('catchReportForm').onsubmit = function() {
        if (!navigator.onLine) {
            alert("You are currently offline. Your report will be saved locally.");
        }
    };

    window.addEventListener('online', function() {
        fetch('/catch-report/sync-offline-reports', { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    alert('Offline reports synced successfully!');
                }
            });
    });

  document.getElementById('catchReportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    if (navigator.onLine) {
      // Online: send data via AJAX
      fetch('/catch-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(res => {
        if (res.ok) {
          alert('Catch report submitted successfully!');
          form.reset();
        } else {
          alert('Error submitting report.');
        }
      })
      .catch(() => {
        alert('Network error. Saving report locally.');
        saveReportLocally(data);
      });
    } else {
      // Offline: save locally
      saveReportLocally(data);
      alert('You are offline. Your report has been saved locally.');
      form.reset();
    }
  });

  function saveReportLocally(report) {
    let reports = JSON.parse(localStorage.getItem('offlineReports')) || [];
    reports.push(report);
    localStorage.setItem('offlineReports', JSON.stringify(reports));
  }