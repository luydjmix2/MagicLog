$(document).ready(function() {
    // alert("hola");
    $("#floatingPasswordConf").on('keyup', function() {
        var parenPass = $('#floatingPassword').val();
        var cildPass = $(this).val();
        // console.log('cambio' + parenPass + cildPass);
        // if (parenPass != cildPass) {
        //     $('.validPass').removeClass('visually-hidden');
        //     $('button[type="submit"]').prop('disabled', 'disabled');
        // } else {
        //     $('.validPass').removeClass('visually-hidden');
        //     $('.validPass').addClass('visually-hidden');
        //     $('button[type="submit"]').prop('disabled', 'disabled');
        //     $('button[type="submit"]').removeAttr('disabled');
        // }
        ativeAlert(parenPass != cildPass, '.validPass', 'Not Is icual your password.');
    });

    $("#floatingInputEmail").on('keyup', function() {
        var email = $(this).val();
        console.log('mail');
        ativeAlert(!validateEmail(email), '.validEmail', 'The value in input email not is one email.');
    });

    $("#formRegister").submit(function(eventBtFmRegis) {
        // var data = $(this).serialize();
        eventBtFmRegis.preventDefault();

        console.log('bt');
        create()

    });

});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function ativeAlert(params, alertClass, message) {
    if (params) {
        $(alertClass).removeClass('visually-hidden');
        enableAler(alertClass, message)
        $('button[type="submit"]').prop('disabled', 'disabled');
    } else {
        $(alertClass).removeClass('visually-hidden');
        $(alertClass).addClass('visually-hidden');
        $('button[type="submit"]').prop('disabled', 'disabled');
        $('button[type="submit"]').removeAttr('disabled');
    }
}


function create() {
    var email = $('input[type="email"]').val();
    var password = $('input[type="password"]').val();
    // console.log(email + password);

    $.ajax({
            // En data puedes utilizar un objeto JSON, un array o un query string
            data: JSON.stringify({
                "username": "",
                "mail": email,
                "password": password,
                "status": "1"
            }),
            contentType: "application/json; charset=utf-8",
            //Cambiar a type: POST si necesario
            type: "POST",
            // Formato de datos que se espera en la respuesta
            dataType: "json",
            // URL a la que se enviará la solicitud Ajax
            url: "http://localhost:8080/api/usuario/create",
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

function enableAler(alertIdenti, message) {
    $(alertIdenti).removeClass('visually-hidden');
    if (message != '') {
        $(alertIdenti).html(message);
    }

}

function disableAler(alertIdenti, message) {
    $(alertIdenti).removeClass('visually-hidden');
    $(alertIdenti).addClass('visually-hidden');
    if (message != '') {
        $(alertIdenti).html(message);
    }
}