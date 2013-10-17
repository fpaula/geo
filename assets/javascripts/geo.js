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
      ul.append(Geo._createPrintElement("Speed", geo.speed));
      ul.append(Geo._createPrintElement("Heading", geo.heading));
      ul.append(Geo._createPrintElement("Altitude Accuracy", geo.altitudeAccuracy));
      ul.append(Geo._createPrintElement("Accuracy", geo.accuracy));
      ul.append(Geo._createPrintElement("Altitude", geo.altitude));
      ul.append(Geo._createPrintElement("Longitude", geo.longitude));
      ul.append(Geo._createPrintElement("Latitude", geo.latitude));
      container.append(ul);

      return container;
    });
  },
  _createPrintElement: function (key, value) {
    return $("<li>" + key + ": " + value + "</li>");
  }
};

Zepto(function($){
  $('button').on('click', function(){
    Geo.print('.result');
  });
});