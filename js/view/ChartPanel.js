define([
    "backbone",
    "chart"
  ], function(Backbone, Chart){
    let ChartPanel = Backbone.View.extend({
      el: "#app",
      events: {
        "click #show_chart": "setPanel",
      },
      initialize: function(config) {
        // controller function
        this.setPanelCallBack = config.setPanel;
        // listen to model
        this.listenTo(this.model.get("periodData"), "change", this.renderPeriodChart);
        this.listenTo(this.model.get("oneDayData"), "change", this.renderOneDayChart);
        // view var
        this.backgroundColor = [
          "#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c",
          "#9287e7", "#27A1EA", "#4EBECD", "#9CDC82", "#FF9F69",
          "#E9668E", "#747BE1", "#39B3EA", "#40CEC7", "#D4EC59",
          "#FA816D", "#D660A8", "#6370DE", "#35C5EA", "#63D5B2",
          "#FFDA43", "#FB6E6C", "#B55CBD", "#668ED6", "#9FCDFD"
        ]
        this.oneDayChart = [];
        this.periodChart = [];
      },
      renderChart: function (ctx, data, type) {
        return new Chart(ctx, {
          type: type,
          data: data,
          options: {
            scales: {
              xAxes: [{
                display: (type == "doughnut") ? false : true
              }],
              yAxes: [{
                display: (type == "doughnut") ? false : true
              }]
            },
            maintainAspectRatio: false
          }
        });
      },
      renderPeriodChart: function() {
        const data = this.model.get("periodData").get("data");
        let marketLabel = Object.keys(data);
        let dateLabel = data[marketLabel[0]].map((el) => el["date"]);
        let chartData = [
          {
            ctx: "period_canvasPrice",
            data: {
              labels: dateLabel,
              datasets: marketLabel.map((marketName, index) => {
                return {
                  label: marketName,
                  lineTension: 0,
                  backgroundColor: this.backgroundColor[index],
                  borderColor: this.backgroundColor[index],
                  borderWidth: 1,
                  fill: false,
                  data: data[marketName].map(el => el.price)
                };
              })
            },
            type: "line"
          },
          {
            ctx: "period_canvasVolume",
            data: {
              labels: dateLabel,
              datasets: marketLabel.map((marketName, index) => {
                return {
                  label: marketName,
                  lineTension: 0,
                  backgroundColor: this.backgroundColor[index],
                  borderColor: this.backgroundColor[index],
                  borderWidth: 1,
                  fill: false,
                  data: data[marketName].map(el => el.volume)
                };
              })
            },
            type: "line"
          },
          {
            ctx: "canvasSalesVolumeDoughnut",
            data: {
              labels: marketLabel,
              datasets: [{
                backgroundColor: this.backgroundColor,
                data: marketLabel.map(marketName => {
                  const result = data[marketName].reduce((acc, el) => acc + el["volume"], 0);
                  return Math.floor(result * 100) / 100;
                })
              }]
            },
            type: "doughnut"
          },
          {
            ctx: "canvasTotalAmountDoughnut",
            data: {
              labels: marketLabel,
              datasets: [{
                backgroundColor: this.backgroundColor,
                data: marketLabel.map(marketName => {
                  const result = data[marketName].reduce((acc, el) => acc + (el["volume"] * el["price"]), 0);
                  return Math.floor(result * 100) / 100;
                })
              }]
            },
            type: "doughnut"
          }
        ]
        this.periodChart.map(obj => obj.destroy());
        this.periodChart = chartData.map((el) => {
          return this.renderChart(document.getElementById(el["ctx"]), el["data"], el["type"]);
        });
      },
      renderOneDayChart: function() {
        const data = this.model.get("oneDayData").get("data");
        let marketLabel = Object.keys(data);
        let volume = Object.keys(data).map(el => data[el]["volume"]);
        let price = Object.keys(data).map(el => data[el]["price"]);
        let chartData = [
          {
            ctx: "oneday_canvasVolume",
            data: {
              labels: marketLabel,
              datasets: [{
                backgroundColor: this.backgroundColor,
                data: marketLabel.map(marketName => data[marketName].volume) 
              }]
            },
            type: "doughnut"
          },
          {
            ctx: "canvasProfit",
            data: {
              labels: marketLabel,
              datasets: [{
                backgroundColor: this.backgroundColor,
                data: marketLabel.map(marketName => data[marketName].volume * data[marketName].price) 
              }]
            },
            type: "doughnut"
          },
          {
            ctx: "oneday_canvasPrice",
            data: {
              labels: ["平均價"],
              datasets: marketLabel.map((marketName, index) => {
                return {
                  label: marketName,
                  backgroundColor: this.backgroundColor[index],
                  data: [data[marketName].price]
                }
              })
            },
            type: "bar",
          }
        ]
        this.oneDayChart.map(obj => obj.destroy());
        this.oneDayChart = chartData.map((el) => {
          return this.renderChart(document.getElementById(el["ctx"]), el["data"], el["type"]);
        });
      },
      setMode: function(mode) {
        const container = {
          oneDay: "oneday_chart",
          period: "period_chart",
        }
        Object.keys(container).forEach(key => {
          if(key === mode){
            document.getElementById(container[key]).classList.remove("hide");
          }else{
            document.getElementById(container[key]).classList.add("hide");
          }
        });
      },
      setPanel: function() {
        this.setPanelCallBack(this);
      },
      toggle: function(show) {
        if(show){
          document.getElementById("show_chart").classList.add("custom_btn_active");
          document.getElementById("show_chart_container").classList.remove("hide");
        }else{
          document.getElementById("show_chart").classList.remove("custom_btn_active");
          document.getElementById("show_chart_container").classList.add("hide");
        }
      },
    });
    return ChartPanel;
  });