// 🛠 Store chart instances in the window object to avoid redeclaration
window.speciesChartInstance = window.speciesChartInstance || null;
window.statusChartInstance = window.statusChartInstance || null;
window.dailyChartInstance = window.dailyChartInstance || null;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/analytics");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log("📊 Received Data:", data); // Debugging log

        if (!data) {
            throw new Error("Missing API response data");
        }

        // Update dashboard counters
        document.getElementById("totalReports").innerText = data.totalReports ?? "N/A";
        document.getElementById("approvedReports").innerText = data.approvedReports ?? "N/A";
        document.getElementById("flaggedReports").innerText = data.flaggedReports ?? "N/A";

        // Render charts
        renderCharts(data.speciesData, data.statusData, data.dailyReports);
    } catch (error) {
        console.error("❌ Error loading analytics data:", error);
    }
});

function renderCharts(speciesData, statusData, dailyReports) {
    const speciesLabels = speciesData.map(item => item.species);
    const speciesCounts = speciesData.map(item => item.count);

    const statusLabels = statusData.map(item => item.status);
    const statusCounts = statusData.map(item => item.count);

    const dailyLabels = dailyReports.map(item => item.report_date.split("T")[0])
    const dailyCounts = dailyReports.map(item => item.count);

    // 🚨 Destroy existing charts if they exist
    if (window.speciesChartInstance) window.speciesChartInstance.destroy();
    if (window.statusChartInstance) window.statusChartInstance.destroy();
    if (window.dailyChartInstance) window.dailyChartInstance.destroy();

    // 🎨 Create new charts
    window.speciesChartInstance = new Chart(document.getElementById("speciesChart"), {
        type: "bar",
        data: { labels: speciesLabels, datasets: [{ label: "Species", data: speciesCounts, backgroundColor: "blue" }] }
    });

    window.statusChartInstance = new Chart(document.getElementById("statusChart"), {
        type: "pie",
        data: { labels: statusLabels, datasets: [{ data: statusCounts, backgroundColor: ["green", "red", "yellow"] }] }
    });

    window.dailyChartInstance = new Chart(document.getElementById("dailyChart"), {
        type: "line",
        data: { labels: dailyLabels, datasets: [{ label: "Reports Over Time", data: dailyCounts, borderColor: "orange", fill: false }] }
    });
}
