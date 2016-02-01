function checkAndAddElement() {
    var doesResultExist = $("#price-per-sqft").text();
    var isRent = $(".for-rent-row").text();
    console.log("doesResultExist?", doesResultExist);

    if(!!doesResultExist){
        return;
    } else {
        var htmlPrice = $(".main-row.home-summary-row").eq(0).text();
        var htmlSqft = $(".addr_bbs").eq(2).text();

        var price = convertToNum(htmlPrice);
        var sqft = convertToNum(htmlSqft);
        var pricePerSqft = 0;

        if(!!isRent) {
            pricePerSqft = divideAndRound(price, sqft, 3);
        } else {
            pricePerSqft = divideAndRound(price, sqft, 0);
        }

        $(".main-row.home-summary-row").eq(0).after(function(){
            return "<span id='price-per-sqft'>Price/Sqft: $" + pricePerSqft + "</span>";
        });
    }
}

$(document).ready(function() {
    checkAndAddElement();
});

$(document).on("click", function(event) {
    //Specific to zillow loading view.
    //Future stuff to look at would be chrome.runtime or some other extension API to check url changes
    //And use that to trigger function when done
    var myVar = setTimeout(function(){ checkAndAddElement(); }, 5000);
});

function convertToNum(string) {
    var number = Number(string.replace(/[^0-9\.]+/g,""));
    return number;
}

function divideAndRound(price, sqft, decimals){
    var val = price / sqft;
    return val.toFixed(decimals);
}