define([
  "backbone",
  "fetchData",
], function(Backbone, FetchData) {
  let FishList = Backbone.Model.extend({
    defaults: {
      "data": "",
    },
    getData: async function(url) {
      const fishList = await FetchData.getData(url);
      this.set({data: fishList});
    }
  });
  return FishList;
});
