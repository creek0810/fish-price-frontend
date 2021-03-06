define([
  "backbone",
], function(Backbone){
  let PeriodForm = Backbone.View.extend({
    el: "#app",
    events: {
      "click #period": "setForm",
      "click #period_execution": "getPeriodData",
      "change #startDate": "getFishList",
      "change #endDate": "getFishList",
      "change #period_market": "renderFishList"
    },
    initialize: function(config) {
      // controller function
      this.setFormCallBack = config.setForm;
      this.getFishListCallBack = config.getFishList;
      this.getPeriodDataCallBack = config.getPeriodData;
      // add id to this form which will determine the mode of table and chart panel
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
      // avoid the condition that endDate field is empty
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
    setForm: function() {
      this.setFormCallBack(this);
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