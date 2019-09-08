define([
  "backbone",
], function(Backbone){
  let PeriodForm = Backbone.View.extend({
    el: "#app",
    events: {
      "click #period": "setPanel",
      "click #period_execution": "getPeriodData",
      "change #startDate": "getFishList",
      "change #endDate": "getFishList",
      "change #period_market": "renderFishList"
    },
    initialize: function(config) {
      // controller function
      this.setPanelCallBack = config.setPanel;
      this.getFishListCallBack = config.getFishList;
      this.getPeriodDataCallBack = config.getPeriodData;
      // controller mode var
      this.mode = config.mode;
      // listen to model
      this.listenTo(this.model, "change", this.renderMarketList);
    },
    renderMarketList: function() {
      const marketName = Object.keys(this.model.get("data"));
      const result = marketName.reduce((acc, cur) => {
        return `${acc} <option value="${cur}">${cur}</option>`
      }, "");
      document.getElementById("period_marketList").innerHTML = result;
    },
    renderFishList: function(e) {
      const data = this.model.get("data");
      if(e.target.value in data) {
        const result = data[e.target.value].reduce((acc, cur) => {
          return `${acc} <option value="${cur}">${cur}<option>`;
        }, "");
        document.getElementById("period_fishList").innerHTML = result;
      }
    },
    getFishList: function() {
      const startDate = document.getElementById("startDate").value;
      let endDate = document.getElementById("endDate").value;
      endDate = (endDate === "") ? startDate : endDate;
      this.getFishListCallBack(this.model, startDate, endDate);
    },
    getPeriodData: function() {
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const market = document.getElementById("period_market").value;
      const fish = document.getElementById("period_fish").value;
      this.getPeriodDataCallBack(startDate, endDate, market, fish);
    },
    setPanel: function() {
      this.setPanelCallBack(this);
    },
    toggle: function(show) {
      if(show){
        document.getElementById("period").classList.add("custom_btn_active");
        document.getElementById("period_form").classList.remove("hide");
      }else{
        document.getElementById("period").classList.remove("custom_btn_active");
        document.getElementById("period_form").classList.add("hide");
      }
    }
  });
  return PeriodForm;
});