define([
  "backbone",
], function(Backbone){
  let OneDayForm = Backbone.View.extend({
    el: "#app",
    events: {
      "click #oneday": "setPanel",
      "click #oneday_execution": "getOneDayData",
      "change #date": "getFishList",
      "change #oneday_market": "renderFishList"
    },
    initialize: function(config) {
      // controller function
      this.setPanelCallBack = config.setPanel;
      this.getFishListCallBack = config.getFishList;
      this.getOneDayDataCallBack = config.getOneDayData;
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
      document.getElementById("oneday_marketList").innerHTML = result;
    },
    renderFishList: function(e) {
      const data = this.model.get("data");
      if(e.target.value in data) {
        const result = data[e.target.value].reduce((acc, cur) => {
          return `${acc} <option value="${cur}">${cur}<option>`;
        }, "");
        document.getElementById("oneday_fishList").innerHTML = result;
      }
    },
    setPanel: function() {
      this.setPanelCallBack(this);
    },
    getFishList: function(e) {
      const date = e.target.value;
      this.getFishListCallBack(this.model, date, date);
    },
    toggle: function(show) {
      if(show){
        document.getElementById("oneday").classList.add("custom_btn_active");
        document.getElementById("oneday_form").classList.remove("hide");
      }else{
        document.getElementById("oneday").classList.remove("custom_btn_active");
        document.getElementById("oneday_form").classList.add("hide");
      }
    },
    getOneDayData: function() {
      const date = document.getElementById("date").value;
      const market = document.getElementById("oneday_market").value;
      const fish = document.getElementById("oneday_fish").value;
      this.getOneDayDataCallBack(date, market, fish);
    }
  });
  return OneDayForm;
});