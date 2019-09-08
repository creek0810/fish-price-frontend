define([
  "backbone",
], function(Backbone){
  let TablePanel = Backbone.View.extend({
    el: "#app",
    events: {
      "click #show_table": "setPanel",
    },
    initialize: function(config) {
      // controller function
      this.setPanelCallBack = config.setPanel;
      // listen to model
      this.listenTo(this.model.get("periodData"), "change", this.renderPeriodTable);
      this.listenTo(this.model.get("oneDayData"), "change", this.renderOneDayTable);
    },
    renderPeriodTable: function() {
      const data = this.model.get("periodData").get("data");
      const result = Object.keys(data).reduce((acc, marketName) => {
        const marketResult = data[marketName].reduce((acc, data) => {
          return `${acc} 
            <tr>
              <td>${marketName}</td>
              <td>${data.date}</td>
              <td>${data.price}</td>
              <td>${data.volume}</td>
            </tr>
          `;
        }, "");
        return `${acc}${marketResult}`;
      }, "");
      document.getElementById("period_table_data").innerHTML = result;
    },
    renderOneDayTable: function() {
      const data = this.model.get("oneDayData").get("data");
      const result = Object.keys(data).reduce((acc, cur) => {
        return `${acc} 
          <tr>
            <td>${cur}</td>
            <td>${data[cur].price}</td>
            <td>${data[cur].volume}</td>
          </tr>
        `;
      }, "");
      document.getElementById("oneday_table_data").innerHTML = result;
    },
    setMode: function(mode) {
      const container = {
        oneDay: "oneday_table",
        period: "period_table",
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
        document.getElementById("show_table").classList.add("custom_btn_active");
        document.getElementById("show_table_container").classList.remove("hide");
      }else{
        document.getElementById("show_table").classList.remove("custom_btn_active");
        document.getElementById("show_table_container").classList.add("hide");
      }
    },
  });
  return TablePanel;
});