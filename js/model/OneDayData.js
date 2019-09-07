define([
  "backbone",
  "fetchData"
], function(Backbone, FetchData) {
  let OneDayData = Backbone.Model.extend({
    defaults: {
      "data": "",
    },
    getData: async function (url) {
      const data = await FetchData.getData(url);
      this.set({data: data});
    }
  });
  return OneDayData;
});
