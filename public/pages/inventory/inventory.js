$(document).ready(function () {
    // alert('inventario');
    listInventari();
    // console.log($.cookie('userMail'));
    $('#formInventory').submit(function (eventformInven) {
        eventformInven.preventDefault();
        console.log('stop form');
        cleanAlerts();
        createInventory();
    });
});

function listInventari() {
    var table = $('#dataTable').DataTable();
    $.ajax({
        // En data puedes utilizar un objeto JSON, un array o un query string
        contentType: "application/json; charset=utf-8",
        //Cambiar a type: POST si necesario
        type: "GET",
        // Formato de datos que se espera en la respuesta
        dataType: "json",
        // URL a la que se enviará la solicitud Ajax
        url: "http://localhost:8080/api/inventario/list",
    })
        .done(function (data, textStatus, jqXHR) {
            if (console && console.log) {
                // console.log("La solicitud se ha completado correctamente.");
                // console.log(data);

                // console.log($.cookie('userId'));
                // $("#listItem").html('');
                var userId = '';
                var mail = $.cookie("userMail");
                // console.log(mail);
                var settings = {
                    "url": "http://localhost:8080/api/usuario/find/mail/" + mail,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Cookie": "connect.sid=s%3AxUg-6ndGYOEuAWleNr1saG9K5H5an9Am.DUAaTc4QL5PT4T5qkuf%2F8X652bcNNhIRlJ6l46iFs2Y"
                    },
                };

                $.ajax(settings).done(function (response) {
                    //  console.log(response);
                    response.forEach(elementA => {
                        // console.log(element);
                        // console.log(elementA.id);
                        userId = elementA.id;
                    });

                    data.forEach(element => {
                        // console.log(element);

                        console.log(userId);
                        if (element.usurioid == userId) {
                            var rData = [
                                element.id,
                                element.sku,
                                element.nombre,
                                element.cantidad,
                                element.precio
                            ];
                            table.row.add(rData).draw(false);
                        }
                    });
                });
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (console && console.log) {
                // console.log("La solicitud a fallado: " + textStatus);
                // console.log("error:" + errorThrown);
                // console.log("respuesta:" + JSON.stringify(jqXHR));

                console.log(jqXHR.responseText);
                // JSON.parse(jqXHR.responseText, function(k, v) {
                //     console.log(k + ":" + v);

                // });

            }
        });
}

function createInventory() {
    var sku = $('#floatingSKU').val();
    var nombre = $('#floatingNombre').val();
    var cantidad = $('#floatingCantidad').val();
    var precio = $('#floatingPrecio').val();

    var userId = '';
    var mail = $.cookie("userMail");
    // console.log(mail);
    var settings = {
        "url": "http://localhost:8080/api/usuario/find/mail/" + mail,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Cookie": "connect.sid=s%3AxUg-6ndGYOEuAWleNr1saG9K5H5an9Am.DUAaTc4QL5PT4T5qkuf%2F8X652bcNNhIRlJ6l46iFs2Y"
        },
    };

    $.ajax(settings).done(function (response) {
        //  console.log(response);
        response.forEach(elementA => {
            // console.log(element);
            // console.log(elementA.id);
            userId = elementA.id;
        });

        $.ajax({
            // En data puedes utilizar un objeto JSON, un array o un query string
            contentType: "application/json; charset=utf-8",
            //Cambiar a type: POST si necesario
            type: "POST",
            // Formato de datos que se espera en la respuesta
            dataType: "json",
            // URL a la que se enviará la solicitud Ajax
            url: "http://localhost:8080/api/inventario/create",
            "data": JSON.stringify({
                "usurioid": userId,
                "nombre": nombre,
                "sku": sku,
                "cantidad": cantidad,
                "precio": precio,
                "status": ""
            }),
        }).done(function (data, textStatus, jqXHR) {
            if (console && console.log) {
                location.reload(true);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (console && console.log) {
                console.log(jqXHR.responseText);
                var listClassAlertCssUnique = { "nombre": ".validNombre", "sku": ".validSKU" };
                var listTextAlertUnique = { "nombre": "El nombre de producto ya existe.", "sku": "El SKU ya existe" };
                var path = '';
                JSON.parse(jqXHR.responseText, function (k, v) {

                    if (k == "path") {
                        path = v;
                    }

                    switch (true) {
                        case (k == "validatorKey" && v == "not_unique"):
                            console.log(k + ":" + v);
                            console.log(path);
                            console.log(listClassAlertCssUnique[path]);
                            enableAler(listClassAlertCssUnique[path], listTextAlertUnique[path]);
                            break;

                        default:
                            break;
                    }
                });

            }
        });
    });



}

function cleanAlerts() {
    $(".alert.alert-danger").removeClass('visually-hidden');
    $(".alert.alert-danger").addClass('visually-hidden');
}


