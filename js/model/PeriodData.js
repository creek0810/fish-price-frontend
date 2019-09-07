define([
  "backbone",
  "fetchData",
], function(Backbone, FetchData) {
  let PeriodData = Backbone.Model.extend({
    defaults: {
      "data": "",
    },
    getData: async function(url) {
      const periodData = await FetchData.getData(url);
      this.set({data: periodData});
    }
  });
  return PeriodData;
});

