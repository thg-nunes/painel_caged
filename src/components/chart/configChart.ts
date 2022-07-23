import { Series } from "../../interfaces/graficos/series"

type ConfigToChartProps = {
  yAxisType: string | undefined
  widthScreen: number
  dataChart: [...[string, number]]
}

export function configToChart({ yAxisType, dataChart, widthScreen }: ConfigToChartProps) {

  const colorsColection = [
    '#FFBE7D',
    '#5B9F51',
    '#9fcbe8',
    '#F7B538',
    '#108BA8',
    '#D57195',
    '#F28E2C',
    '#11A896',
    '#B6982C',
    '#525174',
    '#3B6065',
  ]

  const dataChartCategory: string[] = []
  const dataChartCategoryQuantity: Series[] = []
  const quantityColumns: number[] = []

  if(dataChart !== undefined) {
    dataChart.forEach(arr => {
      dataChartCategory.push(arr[0])
      quantityColumns.push(arr[1])
    })
  }

  for (let i = 0; i < quantityColumns.length; i++) {
    dataChartCategoryQuantity.push({
      value: quantityColumns[i],
      itemStyle: { color: colorsColection[i] },
    })
  }

  const option = {
      tooltip: {
        trigger: 'axis',
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        itemSize: 11,
        showTitle: true,
        feature: {
          type: "png",
          saveAsImage: {
            show: true,
            title: ' ',
            iconStyle: {
              borderWidth: 1.5,
            },
          },
          magicType: {
            show: true,
            title: ' ',
            type: ['line'],
            iconStyle: {
              borderWidth: 1.5,
            },
          },
          restore: {
            show: true,
            title: ' ',
            iconStyle: {
              borderWidth: 1.5,
            },
          },
        },
      },
      grid: {
        containLabel: true,
        width: '85%',
        top: yAxisType ? '5%' : '10%',
        left: '4%',
        right: '1%',
        bottom: '5%',
      },
      label: {
        show: true,
        color: 'rgb(0, 0, 0)',
        fontWeight: 'bold',
        position: 'right',
        fontSize: 10
      },
      xAxis: {
        type: 'value',
        data: dataChartCategoryQuantity,
        axisLabel: {
          color: 'black',
          fontWeight: 'normal',
          fontSize: 10
        },
        axisTick: {
          show: false
        },
        zlevel: 2,
        minInterval: (widthScreen >= 320 && widthScreen <= 768) ? 10000 : 3000
      },
      yAxis: {
        type: 'category',
        data: dataChartCategory ,
        axisLabel: {
          color: 'black',
          fontSize: (widthScreen >= 320 && widthScreen <= 768) ? 9 : 11,
          fontWeight: (widthScreen >= 320 && widthScreen <= 768) ? 'bold' : 'normal'
        },
        axisTick: {
          show: false
        },
        zlevel: 2
      },
      series: [
        {
          data: dataChartCategoryQuantity,
          color: '#0374F0',
          type: 'bar',
          barWidth: '40%',
        },
      ],
  }

  return option
}
