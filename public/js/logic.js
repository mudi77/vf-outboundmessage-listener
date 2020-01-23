

let update = () => {

    $.ajax({
        url: '/render',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',

        success: function (data) {
            let dataContainer = document.getElementById("resultDataContainer");
            dataContainer.innerHTML = JSON.stringify(data, undefined, 2);
        }
    });

};



window.onload = function(){

    setInterval( () => { update() }, 3000, false);

    $( "#del" ).click(function() {
        $.ajax({
            url: '/del',
            type: 'POST',
            success: function () {
                document.getElementById("resultDataContainer").innerHTML = "";
            }
        });
    });

}