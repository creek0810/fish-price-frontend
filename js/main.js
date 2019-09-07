require.config({
  paths: {
    jquery: ["https://code.jquery.com/jquery-3.4.1.min"],
    underscore: ["https://underscorejs.org/underscore-min"],
    backbone: ["https://backbonejs.org/backbone-min"],
    bootstrap: ["https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min"],
    fetchData: ["./lib/fetchData"],
    chart: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart"]
  },
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone",
    },
    bootstrap: {
      deps: ["jquery"]
    },
    fetchData: {
      exports: "FetchData"
    },
    chart: {
      exports: "Chart"
    }
  }
});

require([
  "./App",
  "bootstrap"
], function (App) {
  let app = new App();
});
