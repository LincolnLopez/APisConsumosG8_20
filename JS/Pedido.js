var UrlGetPedido = 'http://localhost:90/G8_20/controller/pedidos.php?op=GetPedidos';
var UrlPostPedido = 'http://localhost:90/G8_20/controller/pedidos.php?op=InsertPedido';
var UrlGetUno = 'http://localhost:90/G8_20/controller/pedidos.php?op=GetPedido';
var UrlPutPedido = 'http://localhost:90/G8_20/controller/pedidos.php?op=UpdatePedido';
var UrlDeletePedido = 'http://localhost:90/G8_20/controller/pedidos.php?op=DeletePedido';

$(document).ready(function () {
    CargarPedidos();
});

function CargarPedidos() {
    $.ajax({
        url: UrlGetPedido,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var MiItems = response;
            var valores = '';
            for (i = 0; i < MiItems.length; i++) {
                valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td>' + MiItems[i].FECHA_PEDIDO + '</td>' +
                    '<td>' + MiItems[i].DETALLE + '</td>' +
                    '<td>' + MiItems[i].SUB_TOTAL + '</td>' +
                    '<td>' + MiItems[i].TOTAL_ISV + '</td>' +
                    '<td>' + MiItems[i].TOTAL + '</td>' +
                    '<td>' + MiItems[i].FECHA_ENTREGA + '<td>' +
                    '<td>' + MiItems[i].ESTADO + '<td>' +
                    '<td>' +
                    '<button class="btn btn-outline-warning" onclick="CargarPedido(' + MiItems[i].ID + ')">Editar</button>' +
                    '<button class="btn btn-outline-warning" onclick="EliminarPedido(' + MiItems[i].ID + ')">Eliminar</button>' +
                    '<td>' +
                    '</tr>';
                $('.pedidos').html(valores);
            }
        }
    });
}
function AgregarPedido() {
    var datospedido = {
        ID: $('#ID').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response)
        }
    });
    alert("Pedido Agregado");
}
function CargarPedido(idpedido){
    var datospedido = {
        ID: idpedido
    };
    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido(' + MiItems[0].ID + ')"'+
            ' value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });

}

function ActualizarPedido(idpedido){
    var datospedido = {
        ID:idpedido,
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson= JSON.stringify(datospedido);
    $.ajax({
        url: UrlPutPedido,
        type: 'PUT',
        data:datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Pedido Actualizado");
}
function EliminarPedido(idpedido){
    var datospedido = {
        ID: idpedido
    };

    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data:datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}