$(document).ready(function() {

    $("#formLogin").submit(function(eventBtFmRegis) {
        eventBtFmRegis.preventDefault();
        console.log('bt');
        login();

    });

});


function login() {
    var email = $('input[type="email"]').val();
    var password = $('input[type="password"]').val();
    console.log(email + password);

    $.ajax({
            // En data puedes utilizar un objeto JSON, un array o un query string
            data: JSON.stringify({
                "mail": email,
                "password": password,
            }),
            contentType: "application/json; charset=utf-8",
            //Cambiar a type: POST si necesario
            type: "POST",
            // Formato de datos que se espera en la respuesta
            dataType: "json",
            // URL a la que se enviará la solicitud Ajax
            url: "http://localhost:8080/api/usuario/login",
        })
        .done(function(data, textStatus, jqXHR) {
            if (console && console.log) {
                // console.log("La solicitud se ha completado correctamente.");
                window.location = '/inicio';
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            if (console && console.log) {
                // console.log("La solicitud a fallado: " + textStatus);
                // console.log("error:" + errorThrown);
                // console.log("respuesta:" + JSON.stringify(jqXHR));

                // console.log(jqXHR.responseText);
                JSON.parse(jqXHR.responseText, function(k, v) {
                    // console.log(k + ":" + v);
                    if (k == "validatorKey" && v == "not_unique") {
                        enableAler(".validEmail", 'your email already exists.');
                    }

                    switch (true) {
                        case (k == "validatorKey" && v == "isLongEnough"):
                            enableAler(".validPass", 'your password is less than 8 characters long.');
                            break;

                        default:
                            break;
                    }
                });

            }
        });
}