var $prod_line;
var prod_line;
var type;


/**************** Show the Appropriate Question line ****************/

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
        type = 0;
        HybText.style.display = "block";
        HybForm.style.display = "block";
    }   else {
        HybText.style.display = "none"; 
        HybForm.style.display = "none";
    }

    if (AptCheckBox.checked == true){               // For Residential Select
        type = 1;
        AptText.style.display = "block";
        AptForm.style.display = "block";
    }   else {
        AptText.style.display = "none"; 
        AptForm.style.display = "none";
    }

    if (ComCheckBox.checked == true){               // For Commercial Select
        type = 2;
        ComText.style.display = "block";
        ComForm.style.display = "block";
    }   else {
        ComText.style.display = "none"; 
        ComForm.style.display = "none";
    }

    if (CorpCheckBox.checked == true){              //For Corporative Select
        type = 3;
        CorpText.style.display = "block";
        CorpForm.style.display = "block";
    }   else {
        CorpText.style.display = "none"; 
        CorpForm.style.display = "none";
    }

}  

/********** Lock Nb of hour that can be input by users ************/

$("#max24").keyup(function() {
    if ($(this).val() > 24){
        $(this).val(24);
    } 
})

/********** function estimated cost for Commercial use and Number of Elevator needed  **********/

function CommCalculate() {
    $prod_line = $("#product-line-cost").find("input[type='radio'][name=OptCheck]:checked");
    prod_line = $prod_line.val() || 0;

    var $elevNum = $("#ComForm").find("[id=CageComElevatorNb]"); // Scope the Nb of elevator needed
    var elevNum = $elevNum.val() || 0;   // Set value
    var raw_total_Cost = elevNum * prod_line ; // multiply
    var roundedCost = raw_total_Cost.toFixed(2); // fix 2 digits after comma
    var total_Cost = Number(roundedCost);   // set to number
    var price = total_Cost,                 // format price to $ CAD
        locale = "en-CA",
        currency = "CAD";
    
    var formatter = new Intl.NumberFormat (locale, {
        style: "currency",
        currency: currency,
    });

    var formattedPrice = formatter.format(price);

    $("#cost-result").text(formattedPrice);
    $("#elevator-needed").text(elevNum);
    
}


 /************  function estimate Cost for Residential and the number of Elevator needed*********/

function ResidentialCalculate() {
    $prod_line = $("#product-line-cost").find("input[type='radio'][name=OptCheck]:checked");
    prod_line = $prod_line.val() || 0;

    var $NbOfApart =  $("#AptForm").find("[name=NbDoor_res]");
    var NbOfApart = $NbOfApart.val();
    var $NbOfFloor =  $("#AptForm").find("[name=NbFloor_res]");
    var raw_NbOfFloor = $NbOfFloor.val();
    var $NbBasements_res =  $("#AptForm").find("[name=NbBasements_res]");
    var NbBasements_res = $NbBasements_res.val();
    var NbOfFloor = raw_NbOfFloor - NbBasements_res;
    var AvrgDoor = +NbOfApart / +NbOfFloor;
    var NbElev_res = Math.ceil(AvrgDoor) / 6; // Num of elevator
    var NbColumn_res = NbOfFloor / parseInt("20", 10) ;
    var NbRealElev_res = Math.ceil(NbElev_res) * Math.ceil(NbColumn_res)  || 0 ;     // ceiling number and force but 0 instead of NaN  
    var raw_total_Cost = NbRealElev_res * prod_line;
    var roundedCost  = raw_total_Cost.toFixed(2);        // fix 2 digits after comma
    var total_Cost   = Number(roundedCost);       // set to number
    var price = total_Cost,                    // format price to $ CAD     
        locale = "en-CA",
        currency = "CAD";
    
    var formatter = new Intl.NumberFormat (locale, {
        style: "currency",
        currency: currency,
    });

    var formattedPrice = formatter.format(price);

    
    $("#elevator-needed").text(NbRealElev_res);
    $("#cost-result").text(formattedPrice);
}

/*********** function estimate Cost For Corporative use and Number of Elevator needed  ************/

function CorporateCalculate() {
    $prod_line = $("#product-line-cost").find("input[type='radio'][name=OptCheck]:checked");
    prod_line = $prod_line.val() || 0;

    var $occByFloor = $("#CorpForm").find("[name=OccByFloor_corp]"); // Scope the Nb of Occupant By Floor
    var occByFloor = $occByFloor.val();   
    var $nbOfBasement = $("#CorpForm").find("[name=NbBasement_corp]"); // Scope the Nb of Basement
    var nbOfBasement = $nbOfBasement.val();   
    var $nbOfFloor = $("#CorpForm").find("[name=NbFloor_Corp]");   //Scope the Nb of Floor
    var nbOfFloor = $nbOfFloor.val();   
    var nbOfStories = +nbOfFloor - +nbOfBasement;       //set to number
    var totalOcc = occByFloor * nbOfStories;
    var nbOfElevator = totalOcc / parseInt("1000", 10);
    var nbOfColumn = nbOfStories / parseInt("20", 10);
    var nbOfElevByColumn = Math.ceil(nbOfElevator) / Math.ceil(nbOfColumn);         // Ceiling numbers to higher decimal 
    var totalElev = Math.ceil(nbOfElevByColumn) * Math.ceil(nbOfColumn) || 0;        // ceiling number and force but 0 instead of NaN  
    var raw_total_Cost = Math.ceil(totalElev) * prod_line; // multiply
    var roundedCost = raw_total_Cost.toFixed(2);        // fix 2 digits after comma
    var total_Cost = Number(roundedCost);       // set to number
    var price = total_Cost,                     // format price to $ CAD
        locale = "en-CA",
        currency = "CAD";
    
    var formatter = new Intl.NumberFormat (locale, {
        style: "currency",
        currency: currency,
    });

    var formattedPrice = formatter.format(price);


    $("#elevator-needed").text(totalElev);
    $("#cost-result").text(formattedPrice);   
}


/*********** function  estimate Cost For Hybrid use and Number of Elevator needed  ************/

function hybridCalculate() {
    $prod_line = $("#product-line-cost").find("input[type='radio'][name=OptCheck]:checked");
    prod_line = $prod_line.val() || 0;

    var $occByFloor = $("#HybForm").find("[name=OccByFloor_Hyb]"); // Scope the Nb of Occupant By Floor
    var occByFloor = $occByFloor.val();   
    var $nbOfBasement = $("#HybForm").find("[name=NbBasement_Hyb]"); // Scope the Nb of Basement
    var nbOfBasement = $nbOfBasement.val();   
    var $nbOfFloor = $("#HybForm").find("[name=NbFloor_Hyb]");   //Scope the Nb of Floor 
    var nbOfFloor = $nbOfFloor.val();  
    var nbOfStories = +nbOfFloor - +nbOfBasement;       //set to number
    var totalOcc = occByFloor * nbOfStories;
    var nbOfElevator = totalOcc / parseInt("1000", 10) ; 
    var nbOfColumn = nbOfStories / parseInt("20", 10) ;
    var nbOfElevByColumn = Math.ceil(nbOfElevator) / Math.ceil(nbOfColumn);     // Ceiling numbers to higher decimal 
    var totalElev = Math.ceil(nbOfElevByColumn) * Math.ceil(nbOfColumn) ||0;    // ceiling number and force but 0 instead of NaN         
    var raw_total_Cost = totalElev * prod_line; // multiply
    var roundedCost = raw_total_Cost.toFixed(2);        // fix 2 digits after comma
    var total_Cost = Number(roundedCost);       // set to number
    var price = total_Cost,                     // format price to $ CAD
        locale = "en-CA",
        currency = "CAD";
    
    var formatter = new Intl.NumberFormat (locale, {
        style: "currency",
        currency: currency,
    });

    var formattedPrice = formatter.format(price);

    $("#elevator-needed").text(totalElev);
    $("#cost-result").text(formattedPrice);
}


/********** Reset to default value ******/

function resetComValue() {
    $("#CageComElevatorNb").val("");
}

function resetResValue() {
    $("#NbBasements_res").val("");
    $("#NbFloor_res").val("");
    $("#NbDoor_res").val("");
}

function resetCorpValue() {
    $("#sepTenantNb").val("");
    $("#NbFloor_Corp").val("");
    $("#NbBasement_corp").val("");
    $("#CorpParkNb").val("");
    $("#OccByFloor_corp").val("");
}

function resetHybValue() {
    $("#BusinessHybridNb").val("");
    $("#NbFloor_Hyb").val("");
    $("#NbBasement_Hyb").val("");
    $("#HybParkNb").val("");
    $("#OccByFloor_Hyb").val("");
    $("#max24").val("");
}

/********* If Appropriate Question Line Select Do Calculation  *********/

function final() {
    if (type === 0) {
        hybridCalculate();
        resetComValue();
        resetResValue();
        resetCorpValue();
    } else if (type === 1) {
        ResidentialCalculate();
        resetComValue();
        resetCorpValue(); 
    } else if (type === 2) {
        CommCalculate();
        resetResValue();
        resetCorpValue();                                       
        resetHybValue();
    } else if (type === 3) {
        CorporateCalculate();
        resetComValue();
        resetResValue();
        resetHybValue()   
    }
}

/********* If Appropriate Product line Button Select Show Calculation ********/

function Btn_Select() {
    if ($("#Std_Check").prop("checked")) {

        final();
    }
    else if ($("#Prem_Check").prop("checked")) {
        
        final();
    } 
    else if ($("#Exc_Check").prop("checked")) {             

        final();
    }            
}

/************* Show the final Result of the selected Production Line **************/
$(function () {  

        $("#requestQuote").on("change keyup click", function() {
            Btn_Select();           
        })
}) 
    
