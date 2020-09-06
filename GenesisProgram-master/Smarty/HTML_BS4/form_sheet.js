
    $("#requestQuote").on("submit", function(event) {
        event.preventDefault();
        var $buildingChoice = $(this).find("[name=building]");
        var buildingChoice = $buildingChoice.val();
        $("#selectedBuildType").text("You choose " + buildingChoice + " as building type");
    });
