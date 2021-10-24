$(document).ready(function () {

    $("#formLogin").submit(function (eventBtFmRegis) {
        eventBtFmRegis.preventDefault();
        // console.log('bt');
        login();

    });

});


function login() {
    var email = $('input[type="email"]').val();
    var password = $('#floatingPassword').val();
    console.log(email + password);
    var settings = {
        "url": "http://localhost:8080/api/usuario/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Cookie": "connect.sid=s%3A5D4Oz-pJDTAxlffgOJlMZGT0AFK2afx2.tcyRBTpkBxSHsttkUeNXkaunVaACRabn0c5Nt%2FRvaFI"
        },
        "data": JSON.stringify({
            "mail": "" + email + "",
            "password": password,
            "status": "1"
        }),
    };

    $.ajax(settings).done(function (data, textStatus, jqXHR) {
        console.log(textStatus);
        console.log(jqXHR);
        if (console && console.log) {
            // console.log("La solicitud se ha completado correctamente.");
            console.log(data);

            if (data == email) {
                $.cookie('userMail', data, { expires: 0.1, path: '/' });
                window.location = '/inicio';
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (console && console.log) {
            // console.log("La solicitud a fallado: " + textStatus);
            // console.log("error:" + errorThrown);
            // console.log("respuesta:" + JSON.stringify(jqXHR));

            // console.log(jqXHR.responseText);
            JSON.parse(jqXHR.responseText, function (k, v) {
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