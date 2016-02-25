    var weatherData = {};
    var googleData = {};

  $(document).ready(function(){
    var baseUrl = 'https://api.forecast.io/forecast/';
    var locationUrl= 'https://maps.googleapis.com/maps/api/geocode/json?address=';

    $('#get-weather').on('click', google);

    function googleUrl (location){
      return locationUrl + location;
    };

    function google(){
      var location = $('#location').val();
      console.log(location);
      var jsonGoogle = {
        url: googleUrl(location),
        success: googleSuccess,
        error: errorHandler
      };
      $.ajax(jsonGoogle);
      console.log(location);
    };

    function googleSuccess(google){
      console.log(google);
      var lat = google.results[0].geometry.location.lat;
      var lon = google.results[0].geometry.location.lng;
      var ajaxOptions = {
        url: buildUrl(lat,lon),
        dataType: 'jsonp',
        success: showInfoSuccess,
        error: errorHandler
      };

      $.ajax(ajaxOptions);

    }

    function buildUrl(lat, lon){
      return baseUrl + apiKey+'/'+lat+','+lon;
    };

    // function getWeather(){
    //   var lat = $('#latitude').val();
    //   var lon = $('#longitude').val();
    //   var options = {
    //     url: buildUrl(lat, lon),
    //     dataType: 'jsonp',
    //     success: successHandler,
    //     error: errorHandler
    //   };
    //
    //   $.ajax(options);
    // }

    function successHandler(data){
      weatherData = data;
      $('#output').text(JSON.stringify(data));
      console.log(data);
      console.log(weatherData);
    }

    function errorHandler(err){
      console.log(err);
    }

    function showInfo(lat, lon){
      // var lat = $('#latitude').val();
      // var lon = $('#longitude'.val();
      var ajaxOptions = {
        url: buildUrl(lat,lon),
        dataType: 'jsonp',
        success: showInfoSuccess,
        error: errorHandler
      };

      $.ajax(ajaxOptions);
    }

    function showInfoSuccess(data){
      console.log(data);
      var source = $('#info').html();
      var template = Handlebars.compile(source);
      var w = data.currently;
      var extractedData = {
        temperature: w.temperature,
        feels_like: w.apparentTemperature,
        icon: w.icon || 'clear-day',
        summary: w.summary,
        humidity: w.humidity,

      };
      var html = template(extractedData);
      $('#output').html(html);
    }

  });
