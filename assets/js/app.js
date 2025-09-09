document.addEventListener("DOMContentLoaded", function () {
  //
});

// Charts
const usersChart = new Chart(document.getElementById("usersChart"), {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Users",
        data: [200, 400, 600, 800, 1200, 1500, 1800, 2200, 2500, 3000, 3500, 4000],
        borderWidth: 2,
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        fill: true,
      },
    ],
  },
  options: { responsive: true, plugins: { legend: { display: false } } },
});

const revenueChart = new Chart(document.getElementById("revenueChart"), {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 3000, 2500, 3200, 4000, 4500, 4800, 5000, 5200, 6000, 7000],
        borderWidth: 1,
        backgroundColor: "rgba(40, 167, 69, 0.4)",
      },
    ],
  },
  options: { responsive: true, plugins: { legend: { display: false } } },
});
