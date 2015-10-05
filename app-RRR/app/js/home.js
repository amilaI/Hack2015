
/* var parseData = {epClientString : clientString};

    var request = $.ajax({
      url: CARD_API_URL + "getEpData",
      type: "get",
      data: parseData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
      // Log a message to the console
      response = JSON.stringify(response, null, "\t");
      $('.loadingDiv').hide();
      $('#epdataDiv').show();
      $('#currentEPdata').val(response);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
        "The following error occurred: "+
        textStatus, errorThrown
        );
      $('.loadingDiv').hide();
      $('.searcherrorMsg').show();
    });*/


$('#createARelaeseForm').on('submit', function(e) {

    e.preventDefault();  //prevent form from submitting
   // $('#createReleaseNowProgress').show();
    var projectKEY=$('#projectKEY_createForm').val();

    var selectedVersionID = $( "#versionListId option:selected" ).val();
    var selectedVersionName = $( "#versionListId option:selected" ).text();

    var selectedProgramName = $( "#programName_createForm option:selected" ).text();
    var teamName_createForm = $( "#teamName_createForm option:selected" ).text();

    var releasedescription_createForm=$('#releasedescription_createForm').val();
    var stgDate_createForm=$('#stgDate_createForm').val();
    var prdDate_createForm=$('#prdDate_createForm').val();

    console.log(projectKEY+teamName_createForm+selectedVersionID+ " ss"+selectedVersionName+selectedProgramName+releasedescription_createForm+stgDate_createForm+prdDate_createForm);

    if(selectedVersionName){
      var releaseDiv = "<tr class=\"releaseDiv\"><td><img src=\"img/listview.png\" style=\"width:50px\" class=\"responsive-img\"></td><td>"+teamName_createForm+"</td><td>"+selectedVersionName+"</td><td>"+stgDate_createForm+"</td><td>"+prdDate_createForm+"</td><td></td></tr>";
      $('#releaseTable').append(releaseDiv);
      $('#createReleaseNowProgress').hide();
      $('#modal1').closeModal();
      Materialize.toast('Release Successfully Created in RRR MS', 3000, 'rounded');
    }
 /* var jsonData = {projectKEY : projectKEY , selectedVersionName :selectedVersionName , selectedVersionID:selectedVersionID ,selectedProgramName:selectedProgramName,teamName_createForm:teamName_createForm,releasedescription_createForm:releasedescription_createForm,stgDate_createForm:stgDate_createForm,prdDate_createForm:prdDate_createForm};
    var parseData = JSON.stringify(jsonData);

    var request = $.ajax({
      url: "http://localhost:8081/createReleaseNode",
      type: "POST",
      data: parseData
,
    headers: {
      'Content-Type': 'application/json'
    }
    });
    request.done(function (response, textStatus, jqXHR){

      $('#createReleaseNowProgress').hide();
      $('#modal1').closeModal();
       Materialize.toast('Release Successfully Created in RRR MS', 3000, 'rounded');

    });
  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){

    $('#errorMsgBodyMigrate').html("Real Ed User Authentication Failed");
    console.log(errorThrown + textStatus + jqXHR);
    $('#createReleaseNowProgress').hide();
  });
*/






});


$( "#getReleasesForProject" ).on( "click", function() {

  console.log("Calling JIRA API for data");
  var projectKEY_createForm=$('#projectKEY_createForm').val();
  if(projectKEY_createForm){
    $('#progressBar1').show();
  }
  console.log(projectKEY_createForm);
  var request = $.ajax({
    url: "http://localhost:8080/getJIRAProjects?projectKEY_createForm="+ projectKEY_createForm,
    type: "get"
  });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
      // Log a message to the console

      var optionsValues = '<select id="versionListId">';
      $.each(response.body, function() {
        console.log(this.id+"  "+this.name);
        optionsValues += '<option value="' + this.id + '">' + this.name + '</option>';
      });
      optionsValues += '</select>';

      $("#relaseDropDownAppender").html(optionsValues);
      $('#progressBar1').hide();
      $('#versionListId').material_select();
      //alert(response.body);
      response = JSON.stringify(response.body, null, "\t");
      //console.log(response);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error(
        "The following error occurred: "+
        textStatus, errorThrown
        );
    });
  });

$(document).on('click', '.releaseDiv', function(e) {
console.dir(e);
var projectKEY=$('#projectKEY_createForm').val();

    var selectedVersionID = $( "#versionListId option:selected" ).val();
    var selectedVersionName = $( "#versionListId option:selected" ).text();

    var selectedProgramName = $( "#programName_createForm option:selected" ).text();
    var teamName_createForm = $( "#teamName_createForm option:selected" ).text();

    var releasedescription_createForm=$('#releasedescription_createForm').val();
    var stgDate_createForm=$('#stgDate_createForm').val();
    var prdDate_createForm=$('#prdDate_createForm').val();
location.href ="releaseView.html?projectKEY="+ projectKEY +"&selectedVersionName="+ selectedVersionName+"&releasedescription_createForm="+ releasedescription_createForm + "&stgDate_createForm="+stgDate_createForm+"&prdDate_createForm="+prdDate_createForm;
});