
/**************** Show the Appropriate question line ****************/

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

    if (HybCheckBox.checked == true){               // For Hybrid select
        HybText.style.display = "block";
        HybForm.style.display = "block";
    }   else {
        HybText.style.display = "none"; 
        HybForm.style.display = "none";
    }

    if (AptCheckBox.checked == true){               // For Residential Select
        AptText.style.display = "block";
        AptForm.style.display = "block";
    }   else {
        AptText.style.display = "none"; 
        AptForm.style.display = "none";
    }

    if (ComCheckBox.checked == true){               // For Commercial Select
        ComText.style.display = "block";
        ComForm.style.display = "block";
    }   else {
        ComText.style.display = "none"; 
        ComForm.style.display = "none";
    }

    if (CorpCheckBox.checked == true){              //For Corporative Select
        CorpText.style.display = "block";
        CorpForm.style.display = "block";
    }   else {
        CorpText.style.display = "none"; 
        CorpForm.style.display = "none";
    }

}  

/*
$("#product-line-cost").change(function(){
    var $input = $(this).find("input[type='radio']:checked");
    var input = $input.val();
    $("#cost-result").text(input);
})
*/

/********** Lock Nb of hour that can be input by users ************/

$("#max24").keyup(function() {
    if ($(this).val() > 24){
        $(this).val(24);
    } 
})

/******* Show Nb of elevator need for Commercial use**********/

$("#CageComElevatorNb").on("change keyup", function(){
    var input = $(this).val();
    $("#elevator-needed").text(input);
})

/********** Generate the estimated cost of per Elevator need **********/

$("#requestQuote").on("change keyup", function(){
    var $elevNum = $(this).find("[name=CageComElevatorNb]"); // Scope the Nb of elevator needed
    var elevNum = $elevNum.val();   // Set value
    var $prod_line = $(this).find("#elevator_result, input[name=OptCheck]:checked"); // scope the checked Production line needed
    var prod_line = $prod_line.val(); // set value
    var total_Cost = elevNum * prod_line // multiply
     $("#cost-result").text(total_Cost);
    
})




