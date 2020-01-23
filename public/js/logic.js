

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

}