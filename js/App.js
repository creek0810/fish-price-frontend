// this is a controller
define([
  "backbone",
  "./model/API",
  "./model/FishList",
  "./model/OneDayData",
  "./model/PeriodData",
  "./view/OneDayForm",
  "./view/PeriodForm",
  "./view/TablePanel"
], function (Backbone, API, FishList, OneDayData, PeriodData, OneDayForm, PeriodForm, TablePanel) {
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
      this.model.api = new API();
      this.model.oneDayFishList = new FishList();
      this.model.periodFishList = new FishList();
      this.model.dataModel = new Backbone.Model().set({
        oneDayData: new OneDayData(),
        periodData: new PeriodData()
      });
    },
    initializeView: function () {
      this.view.form.oneDayForm = new OneDayForm({
        model: this.model.oneDayFishList,
        setPanel: this.setPanel.bind(this),
        getFishList: this.getFishList.bind(this),
        getOneDayData: this.getOneDayData.bind(this),
        mode: "oneDay"
      });
      this.view.form.periodForm = new PeriodForm({
        model: this.model.periodFishList,
        setPanel: this.setPanel.bind(this),
        getFishList: this.getFishList.bind(this),
        getPeriodData: this.getPeriodData.bind(this),
        mode: "period"
      });
      this.view.panel.tablePanel = new TablePanel({
        model: this.model.dataModel
      });
    },
    setPanel: function (curPanel) {
      Object.keys(this.view.form).map((key) => {
        if (curPanel === this.view.form[key]) {
          this.view.form[key].toggle(true);
          this.view.panel.tablePanel.setMode(curPanel.mode);
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
      const model = this.model.dataModel.get("oneDayData");
      model.getData(url);
    },
    getPeriodData: function (startDate, endDate, market, fish) {
      const url = this.model.api.getPeriodDataUrl(startDate, endDate, market, fish);
      const model = this.model.dataModel.get("periodData");
      model.getData(url);
    }
  });
  return App;
});
