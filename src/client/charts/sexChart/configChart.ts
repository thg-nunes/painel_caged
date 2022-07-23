import { Series } from "../../../interfaces/graficos/series"

type SexChartConfigProps = {
  yAxisType: string
  sexData: [...[string, number]]
  widthScreen: number
}

export const sexChartConfig = ({ sexData, yAxisType, widthScreen }: SexChartConfigProps) => {
  const colorsCollection = [
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

  const chartDataCategory: string[] = []
  const chartDataCategoryValues: Series[] = []
  const valuesColumns: number[] = []

  if(sexData !== undefined){
    sexData.forEach(arr => {
      chartDataCategory.push(arr[0])
      valuesColumns.push(arr[1])
    })
  }

  for (let i = 0; i < valuesColumns.length; i++) {
    chartDataCategoryValues.push({
      value: valuesColumns[i],
      itemStyle: { color: colorsCollection[i] },
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
      itemSize: widthScreen >= 768 && widthScreen <= 1024 ? 11 : 12,
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
      width: yAxisType ? '85%' : '95%',
      top: '10%',
      left: '1%',
      right: '1%',
      bottom: '5%',
    },
    label: {
      show: true,
      color: 'rgb(0, 0, 0)',
      fontWeight: 'bold',
      position: yAxisType ? 'right' : 'top',
      fontSize: widthScreen >= 320 && widthScreen <= 768 ? 10 : 12
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: 'black',
        fontSize: widthScreen >= 320 && widthScreen <= 768 ? 9 : 12,
        fontWeight: widthScreen >= 320 && widthScreen <= 768 ? 'bold' : 'normal',
      },
      zlevel: 2,
      minInterval: widthScreen >= 320 && widthScreen <= 768 ? 10000 : null
    },
    yAxis: {
      type: 'category' ,
      data: chartDataCategory,
      axisLabel: {
        color: 'black',
        fontSize: widthScreen >= 320 && widthScreen <= 768 ? 10 : 12,
        fontWeight: widthScreen >= 320 && widthScreen <= 768 ? 'bold' : 'normal'
      },
      axisTick: {
        show: widthScreen >= 320 && widthScreen <= 768 ? false : true
      },
      zlevel: 2,
    },
    series: [
      {
        data: chartDataCategoryValues,
        color: '#0374F0',
        type: 'bar',
        barWidth: '40%',
      },
    ],
  }

  return option
}
