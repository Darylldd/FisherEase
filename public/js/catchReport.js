document.querySelectorAll('.approve-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const reportId = button.getAttribute('data-id');
        try {
            const response = await fetch(`/catch-report/approve/${reportId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            alert(data.message);
            location.reload();
        } catch (error) {
            console.error('Error approving report:', error);
        }
    });
});


document.querySelectorAll('.flag-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const reportId = button.getAttribute('data-id');
        try {
            const response = await fetch(`/catch-report/flag/${reportId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if (data.success) {
                alert('Report flagged!');
                location.reload();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error flagging report:', error);
        }
    });
});
