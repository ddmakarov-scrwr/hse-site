window.onload = function () {
  const map = L.map('map').setView([55.8039, 37.4016], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  L.marker([55.8039, 37.4016])
    .addTo(map)
    .bindPopup('МИЭМ ВШЭ — Таллинская 34')
    .openPopup();

  const data = [
    {
      x: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      y: [85, 80, 75, 70],
      type: 'bar'
    }
  ];

  const layout = {
    title: 'Уровень владения технологиями',
    yaxis: {
      title: 'Проценты'
    }
  };

  Plotly.newPlot('plot', data, layout, { responsive: true });
};
