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
