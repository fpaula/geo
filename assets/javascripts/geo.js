var Geo = {
  _userGeo: null,
  get: function(successCallback) {
    if (this._userGeo) {
      return successCallback(this._userGeo);
    }
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(
      function(position){
        Geo._userGeo = position;
        successCallback(position);
      },
      function(error){
        console.warn('ERROR(' + error.code + '): ' + error.message);
      },
      options
    );
  },
  print: function(containerSelector) {
    this.get(function(geo){
      var container = $(containerSelector);
      var ul = $('<ul></ul>');
      ul.append(Geo.createPrintElement("Speed", geo.speed));
      ul.append(Geo.createPrintElement("Heading", geo.heading));
      ul.append(Geo.createPrintElement("Altitude Accuracy", geo.altitudeAccuracy));
      ul.append(Geo.createPrintElement("Accuracy", geo.accuracy));
      ul.append(Geo.createPrintElement("Altitude", geo.altitude));
      ul.append(Geo.createPrintElement("Longitude", geo.longitude));
      ul.append(Geo.createPrintElement("Latitude", geo.latitude));
      container.append(ul);

      return container;
    });
  },
  createPrintElement: function (key, value) {
    return $("<li>" + key + ": " + value + "</li>");
  }
};

Zepto(function($){
  $('button').on('click', function(){
    Geo.print('.result');
  });
});