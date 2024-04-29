const lineChartData = (transactionsDate, array) => {
  const dateList = array?.map(function (item) {
    return item[0];
  });

  const valueList = array?.map(function (item) {
    return +item[1];
  });

  const OptionTransaction = {
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 1,
        min: 0,
        max: 400,
      },
    ],
    title: [
      {
        show: !dateList.length,
        textStyle: {
          color: "grey",
          fontSize: 14,
        },
        text:
          "No " +
          transactionsDate.charAt(0).toUpperCase() +
          transactionsDate.slice(1) +
          "ly data available",
        left: "center",
        top: "center",
        // left: "left",
        // text:
        //   transactionsDate.charAt(0).toUpperCase() +
        //   transactionsDate.slice(1) +
        //   "ly Transaction",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        data: dateList,
      },
    ],
    yAxis: [{}],
    grid: [
      {
        bottom: "10%",
        left: "8%",
        right: "2%",
      },
    ],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: valueList,
        smooth: true,
      },
    ],
    // graphic: {
    //   show: false,
    //   type: "text",
    //   left: "center",
    //   top: "middle",
    //   ...(dateList.length ? {} : { style: { text: "No data available" } }),
    //   //   style: dateList.length ? {} : { text: "No data available" },
    // },
  };

  return OptionTransaction;
};
export { lineChartData };
