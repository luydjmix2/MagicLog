$(document).ready(function () {
    // alert('inventario');
    listInventari();

    $('#formInventory').submit(function (eventformInven) {
        eventformInven.preventDefault();
        console.log('stop form');
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
                data.forEach(element => {
                    // console.log(element.id);
                    var rData = [
                        element.id,
                        element.sku,
                        element.nombre,
                        element.cantidad,
                        element.precio
                    ];
                    table.row.add(rData).draw(false);
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
            "usurioid": "7",
            "nombre": "asd7",
            "sku": "asd127",
            "cantidad": "12",
            "precio": "1245678",
            "status": ""
        }),
    }).done(function (data, textStatus, jqXHR) {
        if (console && console.log) {
            data.forEach(element => {
                console.log(element);
            });
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (console && console.log) {
            console.log(jqXHR.responseText);
            // JSON.parse(jqXHR.responseText, function(k, v) {
            //     console.log(k + ":" + v);

            // });

        }
    });

}