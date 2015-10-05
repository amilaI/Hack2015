


$(function(){
    //alert(getUrlParameter('projectKEY'));
    $('#releaseNameR').html(getUrlParameter('selectedVersionName'));
    $('#releseDiscR').html(getUrlParameter('releasedescription_createForm'));
    $('#relesePrdDateR').html(getUrlParameter('stgDate_createForm'));
    $('#releseStgDateR').html(getUrlParameter('prdDate_createForm'));



});


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};



$( "#approveWithConditionsBtn" ).on( "click", function() {

    Materialize.toast('This Release is approved with conditions.', 3000, 'rounded');
    $('#rejecTBtn').remove();
    $('#aproveBtn').remove();
});

$( "#aproveBtn" ).on( "click", function() {

    Materialize.toast('This Release is approved.', 3000, 'rounded');
    $('#rejecTBtn').remove();
    $('#appConBtn').remove();
});

$( "#rejectBtn" ).on( "click", function() {

    Materialize.toast('This Release was rejected.', 3000, 'rounded');
    $('#aproveBtn').remove();
    $('#appConBtn').remove();

});
$( "#hightSelect" ).on( "click", function() {
$('#riskImpact').show();

});

/*$( "#hightSelect" ).select(function() {
  alert( "Handler for .select() called." );
  $('#riskImpact').show();
});*/


var request = $.ajax({
    url: "http://localhost:8081/getJenkinsData",
    type: "get"
  });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){

      console.log(response.totalCount + " " +response.childReports[0].result.passCount + "  " + response.childReports[0].result.failCount);
      $('#totalCountJEN').html(response.totalCount);
      $('#passedCountJEN').html(response.childReports[0].result.passCount);
      $('#failedCountJEN').html(response.childReports[0].result.failCount);


        $( '.jenText' ).css( "font-size", "18px" );
         $( '.jenText' ).css( "font-weight", "bold" );

/*
      $("#relaseDropDownAppender").html(optionsValues);

      response = JSON.stringify(response.body, null, "\t");
      //console.log(response);*/
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
        "The following error occurred: "+
        textStatus, errorThrown
        );
    });


    $('.jiraPreloader').show();
    var request = $.ajax({
    url: "http://localhost:8080/drawReleaseBurnDownchart",
    type: "get"
  });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
      console.log(response);
      console.log(response.body.completedcount + " " +response.body.incompletedcount);
      $('.jiraPreloader').hide();
      $('#container').show();
          $(function () {
      $('#container').highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Release Burndown Chart'
        },
        subtitle: {
          text: 'Source: jira.pearsoncmg.com'
        },
        xAxis: {
          categories: [
          'SPRINTS'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'ORIGINAL TIME ESTIMATE'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Work completed',
          data: [response.body.completedcount]

        }, {
          name: 'Work Remaining',
          data: [response.body.incompletedcount],

        }]
      });
});

    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
        "The following error occurred: "+
        textStatus, errorThrown
        );
      $('.jiraPreloader').hide();
    });




