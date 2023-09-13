function getCostPerQualityIssueChart(ctx) {
  const labels = [
    'Cracked Sink',
    'Wrong Remnant',
    'Short Piece',
    'Silicone',
    'Missed Appt'
  ]
  const data = [10, 5, 3, 2, 0]

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data, axis: 'y' }]
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      elements: {
        bar: {
          backgroundColor: '#e56820'
        }
      },
      scales: {
        y: {
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })

  Chart.register({
    id: 'render-bar-labels',
    afterDraw(chart) {
      const { ctx, data, config, chartArea, scales } = chart

      if (config.type !== 'bar') return 0

      data.datasets[0].data.forEach((v, i) => {
        ctx.save()
        ctx.font = 'normal 20px sans-serif'
        ctx.fillText(
          `${v} ${data.labels[i]}s`,
          chartArea.left + 16,
          scales.y.getPixelForValue(i) + 8
        )
      })
    }
  })

  return chart
}
