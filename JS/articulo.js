var UrlGetArticulos ='http://34.68.196.220:90/G8_20/Articulos/controller/Articulos.php?op=getArticulos';
var urlpostArticulos = 'http://34.68.196.220:90/G8_20/Articulos/controller/Articulos.php?op=insertArticulos';
var UrlGetUno = 'http://34.68.196.220:90/G8_20/Articulos/controller/Articulos.php?op=getArticulo';
var UrlPutArticulo = 'http://34.68.196.220:90/G8_20/Articulos/controller/Articulos.php?op=updateArticulos';
var UrlDeleteArticulo = 'http://34.68.196.220:90/G8_20/Articulos/controller/Articulos.php?op=deleteArticulos';
$(document).ready(function(){
    CargarArticulos();
});

function CargarArticulos(){
    $.ajax({
        url: UrlGetArticulos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].DESCRIPCION+'</td>'+
                '<td>'+MiItems[i].UNIDAD+'</td>'+
                '<td>'+MiItems[i].COSTO+'</td>'+
                '<td>'+MiItems[i].PRECIO+'</td>'+
                '<td>'+MiItems[i].APLICA_ISV+'</td>'+
                '<td>'+MiItems[i].PORCENTAJE_ISV+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+   
                '<td>'+
                '<button class="btn btn-warning" onclick="GetArticulo('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarArticulo('+MiItems[i].ID+')">Eliminar</button>'+      
                '<td>'+  
             '</tr>';
             $('.articulos').html(Valores);
            }
        }
    });
}
function AgregarArticulo(){
    var datosArticulos={
            DESCRIPCION: $('#DESCRIPCION').val(),
            UNIDAD: $('#UNIDAD').val(),
            COSTO: $('#COSTO').val(),
            PRECIO: $('#PRECIO').val(),
            APLICA_ISV: $('#APLICA_ISV').val(),
            PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
            ID_SOCIO: $('#ID_SOCIO').val()
    };
    var datosArticulosjson= JSON.stringify(datosArticulos);

    $.ajax({
       url:urlpostArticulos,
       type:'POST',
       data: datosArticulosjson,
       datatype: 'JSON',
       contentType: 'application/json',
       succes: function(response){
           console.log(response);
       }
    });
    alert("Articulo Agregado");
    location.reload()
}
function GetArticulo(idArticulo){
    var datosArticulo = {
        ID: idArticulo
        };
   var datosArticulojson=JSON.stringify(datosArticulo);
    $.ajax({
        url:UrlGetUno,
        type: 'POST',
        data: datosArticulojson,
        datatype:'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems= response;
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            var btnactulizar='<input type="submit" id="btn_Actualizar" onclick="ActualizarArticulo('+MiItems[0].ID+')" value="Actualizar Articulo" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactulizar);
        }
   });
}
function ActualizarArticulo(idArticulo){
    var datosArticulo={
        DESCRIPCION: $('#DESCRIPCION').val(),
        UNIDAD: $('#UNIDAD').val(),
        COSTO: $('#COSTO').val(),
        PRECIO: $('#PRECIO').val(),
        APLICA_ISV: $('#APLICA_ISV').val(),
        PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
        ESTADO: 'A',
        ID_SOCIO: $('#ID_SOCIO').val(),
        ID:idArticulo
    };
    var datosArticulojson= JSON.stringify(datosArticulo);
    $.ajax({
        url: UrlPutArticulo,
        type: 'PUT',
        data: datosArticulojson,
        datatype:'JSON',
        contentType: 'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Articulo Actualizado");
}
function EliminarArticulo(idArticulo){
var datosArticulo={
    ID: idArticulo
    };
var datosArticulojson=JSON.stringify(datosArticulo);
$.ajax({
    url:UrlDeleteArticulo,
    type:'DELETE',
    data: datosArticulojson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        console.log(response);
    }
 });
 alert("Articulo Eliminado");
 CargarArticulos();
}
