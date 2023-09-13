function getTotalCostVTimeChart(ctx, defaultUnit = 'quarter') {
  const data = [
    {
      x: '2023-01-06 23:39:30',
      y: 4000
    },
    {
      x: '2023-02-06 23:39:30',
      y: 4300
    },
    {
      x: '2023-02-16 23:39:30',
      y: 4100
    },
    {
      x: '2023-03-06 23:39:30',
      y: 1000
    },
    {
      x: '2023-04-07 01:00:28',
      y: 3000
    },
    {
      x: '2023-05-17 01:00:28',
      y: 2200
    },
    {
      x: '2023-06-12 01:00:28',
      y: 5500
    },
    {
      x: '2023-07-07 01:00:28',
      y: 3000
    },
    {
      x: '2023-07-17 01:00:28',
      y: 700
    },
    {
      x: '2023-12-17 09:00:28',
      y: 2000
    }
  ]

  const totalDuration = 1000
  const delayBetweenPoints = totalDuration / data.length

  const previousY = ctx =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(['y'], true).y

  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0
        }
        ctx.xStarted = true
        return ctx.index * delayBetweenPoints
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0
        }
        ctx.yStarted = true
        return ctx.index * delayBetweenPoints
      }
    }
  }

  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{ data }]
    },
    options: {
      animation,
      responsive: true,
      elements: {
        point: {
          radius: 10,
          hoverRadius: 15,
          backgroundColor: '#e56820'
        },
        line: { borderColor: '#ff853f' }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: defaultUnit // week, month, quarter, year
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: val => moneyPrinter.format(val)
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
}
