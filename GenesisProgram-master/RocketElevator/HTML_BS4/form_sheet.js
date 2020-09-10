



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

/********** Lock Nb of hour that can be input by users ************/

$("#max24").keyup(function() {
    if ($(this).val() > 24){
        $(this).val(24);
    } 
})

    $(document).change(function(){
        var $prod_line = $(this).find("input[type='radio'][name=OptCheck]:checked");
        var prod_line = $prod_line.val() || 0;
        $("#cost-result").text(prod_line);
        
            /********** Generate the estimated cost for Commercial use and Number of Elevator needed  **********/

        $("#ComForm").on("change keyup", function() {
            var $elevNum = $(this).find("[name=CageComElevatorNb]"); // Scope the Nb of elevator needed
            var elevNum = $elevNum.val();   // Set value
            var total_Cost = elevNum * prod_line; // multiply

            $("#cost-result").text(total_Cost + "$");
            $("#elevator-needed").text(elevNum);
            })

            /*********** Generate the estimate Cost For Corporative use and Number of Elevator needed  ************/

        $("#CorpForm").on("change keyup", function(){
            var $occByFloor = $(this).find("[name=OccByFloor_corp]"); // Scope the Nb of Occupant By Floor
            var occByFloor = $occByFloor.val();   
            var $nbOfBasement = $(this).find("[name=NbBasement_corp]"); // Scope the Nb of Basement
            var nbOfBasement = $nbOfBasement.val();   
            var $nbOfFloor = $(this).find("[name=NbFloor_Corp]");   //Scope the Nb of Floor
            var nbOfFloor = $nbOfFloor.val();   
            var nbOfStories = +nbOfFloor + +nbOfBasement; 
            var totalOcc = occByFloor * nbOfStories;
            var nbOfElevator = totalOcc / parseInt("1000", 10);
            var nbOfColumn = nbOfStories / parseInt("20", 10);
            var nbOfElevByColumn = Math.ceil(nbOfElevator) / Math.ceil(nbOfColumn);
            var totalElev = Math.ceil(nbOfElevByColumn) * Math.ceil(nbOfColumn) || 0;          
            var total_Cost = Math.ceil(totalElev) * prod_line; // multiply

            $("#elevator-needed").text(Math.ceil(totalElev));
            $("#cost-result").text(Math.ceil(total_Cost));   
            })

            /*********** Generate the estimate Cost For Hybrid use and Number of Elevator needed  ************/

        $("#HybForm").on("change keyup", function(){
            var $occByFloor = $(this).find("[name=OccByFloor_Hyb]"); // Scope the Nb of Occupant By Floor
            var occByFloor = $occByFloor.val();   
            var $nbOfBasement = $(this).find("[name=NbBasement_Hyb]"); // Scope the Nb of Basement
            var nbOfBasement = $nbOfBasement.val();   
            var $nbOfFloor = $(this).find("[name=NbFloor_Hyb]");   //Scope the Nb of Floor 
            var nbOfFloor = $nbOfFloor.val();  
            var nbOfStories = +nbOfFloor + +nbOfBasement;
            var totalOcc = occByFloor * nbOfStories;
            var nbOfElevator = totalOcc / parseInt("1000", 10) ; 
            var nbOfColumn = nbOfStories / parseInt("20", 10) ;
            var nbOfElevByColumn = Math.ceil(nbOfElevator) / Math.ceil(nbOfColumn);
            var totalElev = Math.ceil(nbOfElevByColumn) * Math.ceil(nbOfColumn) ||0;           
            var total_Cost = totalElev * prod_line; // multiply

            $("#elevator-needed").text(totalElev);
            $("#cost-result").text(Math.ceil(total_Cost));
            })

            /************  Generate the estimate Cost for Residential and the number of Elevator needed*********/
            
        $("#AptForm").on('change keyup', function(){
            var $NbOfApart = $(this).find("[name=NbDoor_res]");
            var NbOfApart = $NbOfApart.val();
            var $NbOfFloor = $(this).find("[name=NbFloor_res]");
            var NbOfFloor = $NbOfFloor.val();
            var AvrgDoor = +NbOfApart / +NbOfFloor;
            var NbElev_res = Math.ceil(AvrgDoor) / 6; // Num of elevator
            var NbColumn_res = NbOfFloor / parseInt("20", 10);
            var NbRealElev_res = Math.ceil(NbElev_res) * Math.ceil(NbColumn_res) || 0 ;
            var totalCost = NbRealElev_res * prod_line;
        
            $("#elevator-needed").text(Math.ceil(NbRealElev_res));
            $("#cost-result").text(Math.ceil(totalCost));
        })
    })