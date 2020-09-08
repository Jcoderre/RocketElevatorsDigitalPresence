
function myFunction(){
    var HybCheckBox = document.getElementById("HybCheckBox");
    var HybText = document.getElementById("HybChoiceText");
    var HybForm = document.getElementById("HybForm");
    var AptCheckBox = document.getElementById("AptCheckBox");
    var AptText = document.getElementById("AptChoiceText");
    var AptForm = document.getElementById("AptForm");
    var ComCheckBox = document.getElementById("ComCheckBox");
    var ComText = document.getElementById("ComChoiceText");
    var ComForm = document.getElementById("ComForm");
    var CorpCheckBox = document.getElementById("CorpCheckBox");
    var CorpText = document.getElementById("CorpChoiceText");
    var CorpForm = document.getElementById("CorpForm");

    if (HybCheckBox.checked == true){
        HybText.style.display = "block";
        HybForm.style.display = "block";
    }   else {
        HybText.style.display = "none"; 
        HybForm.style.display = "none";
    }

    if (AptCheckBox.checked == true){
        AptText.style.display = "block";
        AptForm.style.display = "block";
    }   else {
        AptText.style.display = "none"; 
        AptForm.style.display = "none";
    }

    if (ComCheckBox.checked == true){
        ComText.style.display = "block";
        ComForm.style.display = "block";
    }   else {
        ComText.style.display = "none"; 
        ComForm.style.display = "none";
    }

    if (CorpCheckBox.checked == true){
        CorpText.style.display = "block";
        CorpForm.style.display = "block";
    }   else {
        CorpText.style.display = "none"; 
        CorpForm.style.display = "none";
    }

}   
/*
$("#product-line-cost").change(function(event){
    event.preventDefault();
    var $input = $(this).find("input[type='radio']:checked");
    var input = $input.val();
    $("#cost-result").text(input);
})
*/
$("#max24").keyup(function() {
    if ($(this).val() > 24){
        $(this).val(24);
    } 
})

$("#CageComElevatorNb").on("change keyup", function(){
    var input = $(this).val();
    $("#elevator-needed").text(input);
})


$("#requestQuote").on("change", function(){
    var $x = $(this).find("[name=CageComElevatorNb]");
    var x = $x.val();
    var $y = $(this).find('#product-line-cost', 'input[type="radio"]:checked');
    var y = $y.val();
    var total_Cost = x * y;
    $("#cost-result").text(total_Cost);
    console.log(total_Cost);

})


