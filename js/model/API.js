define([
  "backbone",
], function(Backbone) {
  let API = Backbone.Model.extend({
    defaults: {
      "fishList": "http://140.121.197.196/service/fishPriceBackend/fish",
      "oneDayData": "http://140.121.197.196/service/fishPriceBackend/fish",
      "periodData": "http://140.121.197.196/service/fishPriceBackend/fish"
    },
    getFishListUrl: function(startDate, endDate){
      return `${this.get("fishList")}/${startDate}/${endDate}`;
    },
    getOneDayDataUrl: function(date, market, fish) {
      return `${this.get("fishList")}/${date}/${market}/${fish}/price`;
    },
    getPeriodDataUrl: function(startDate, endDate, market, fish) {
      return `${this.get("fishList")}/${startDate}/${endDate}/${market}/${fish}/price`;
    }
  });
  return API;
});
