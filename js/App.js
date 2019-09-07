// this is a controller
define([
  "backbone",
  "./model/API",
  "./model/FishList",
  "./model/OneDayData",
  "./model/PeriodData",
  "./view/OneDayForm",
  "./view/PeriodForm"
], function (Backbone, API, FishList, OneDayData, PeriodData, OneDayForm, PeriodForm) {
  let App = Backbone.Model.extend({
    initialize: function () {
      this.view = {
        "form": {},
        "panel": {}
      };
      this.model = {};
      this.initializeModel();
      this.initializeView();
    },
    initializeModel: function () {
      this.model.oneDayData = new OneDayData();
      this.model.periodData = new PeriodData();
      this.model.api = new API();
      this.model.oneDayFishList = new FishList();
      this.model.periodFishList = new FishList();
    },
    initializeView: function () {
      this.view.form.oneDayForm = new OneDayForm({
        model: this.model.oneDayFishList,
        setPanel: this.setPanel.bind(this),
        getFishList: this.getFishList.bind(this),
        getOneDayData: this.getOneDayData.bind(this)
      });
      this.view.form.periodForm = new PeriodForm({
        model: this.model.periodFishList,
        setPanel: this.setPanel.bind(this),
        getFishList: this.getFishList.bind(this),
        getPeriodData: this.getPeriodData.bind(this)
      });
    },
    setPanel: function (curPanel) {
      Object.keys(this.view.form).map((key) => {
        if (curPanel === this.view.form[key]) {
          this.view.form[key].toggle(true);
        } else {
          this.view.form[key].toggle(false);
        }
      });
    },
    getFishList: function (model, startDate, endDate) {
      const url = this.model.api.getFishListUrl(startDate, endDate);
      model.getData(url);
    },
    getOneDayData: function (date, market, fish) {
      const url = this.model.api.getOneDayDataUrl(date, market, fish);
      this.model.oneDayData.getData(url);
    },
    getPeriodData: function (startDate, endDate, market, fish) {
      const url = this.model.api.getPeriodDataUrl(startDate, endDate, market, fish);
      this.model.periodData.getData(url);
    }
  });
  return App;
});
