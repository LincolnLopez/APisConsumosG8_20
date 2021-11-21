var UrlGetSocios ='http://localhost:90/G8_20/Controller/socios.php?op=Getsocios';
var UrlInsertarSocios ='http://localhost:90/G8_20/Controller/socios.php?op=Insert_socios';
var UrlGetUno ='http://localhost:90/G8_20/Controller/socios.php?op=GetUno';
var UrlActualizarSocios ='http://localhost:90/G8_20/Controller/socios.php?op=Update_socios';
var UrlEliminarSocios = 'http://localhost:90/G8_20/Controller/socios.php?op=Delete_socios';

$(document).ready(function(){
    CargarSocios();
});
function CargarSocios(){
    $.ajax({
        url: UrlGetSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NOMBRE+'</td>'+
                '<td>'+MiItems[i].RAZON_SOCIAL+'</td>'+
                '<td>'+MiItems[i].DIRECCION+'</td>'+
                '<td>'+MiItems[i].TIPO_SOCIO+'</td>'+
                '<td>'+MiItems[i].CONTACTO+'</td>'+
                '<td>'+MiItems[i].EMAIL+'</td>'+
                '<td>'+MiItems[i].FECHA_CREADO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+MiItems[i].TELEFONO+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarSocio('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarSocio('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+     
             '</tr>';
             $('.Socios').html(Valores);
            }
        }
    });
}
    function AgregarSocio(){
        var datosSocio = {
            ID: $('#ID').val(),
            NOMBRE: $('#NOMBRE').val(),
            RAZON_SOCIAL: $('#RAZON_SOCIAL').val(),
            DIRECCION: $('#DIRECCION').val(),
            TIPO_SOCIO: $('#TIPO_SOCIO').val(),
            CONTACTO: $('#CONTACTO').val(),
            EMAIL: $('#EMAIL').val(),
            FECHA_CREADO: $('#FECHA_CREADO').val(),
            ESTADO: $('#ESTADO').val(),
            TELEFONO: $('#TELEFONO').val(),
        };
        var datosSociojson= JSON.stringify(datosSocio);
    
        $.ajax({
            url: UrlInsertarSocios,
            type: 'POST',
            data: datosSociojson, 
            datatype: 'JSON',
            contentType: 'application/json',
            success: function(response){
                console.log(response);
    
            }
    
        });
        alert("Socio Agregado");
    }

    function CargarSocio(ID_SOCIO){
        var datosSocio = {
            ID:ID_SOCIO  
        };
        var datosSociojson= JSON.stringify(datosSocio);
    
        $.ajax ({ 
            url:UrlGetUno,
            type:'POST',
            data:datosSociojson,
            datatype:'JSON',
            contentType: 'application/json',
            success: function(response){
                var MiItems = response;

                $('#ID').val(MiItems[0].ID);
                $('#NOMBRE').val(MiItems[0].NOMBRE);
                $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
                $('#DIRECCION').val(MiItems[0].DIRECCION);
                $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
                $('#CONTACTO').val(MiItems[0].CONTACTO);
                $('#EMAIL').val(MiItems[0].EMAIL);
                $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
                $('#ESTADO').val(MiItems[0].ESTADO);
                $('#TELEFONO').val(MiItems[0].TELEFONO);
                var btnactualizar = '<input type="submit" id=" btn btn_actualizar" onclick="ActualizarSocio('+MiItems[0].ID+')"'+
                'value="Actualizar Socio" class="btn btn-primary"></input>';
            
                $('.btnagregar') .html(btnactualizar) ;
            }
        });
    }
    function ActualizarSocio(ID_SOCIO_NEGOCIO){
        var datosSocio = {
            ID:$('#ID').val(),
            NOMBRE: $('#NOMBRE').val(),
            RAZON_SOCIAL: $('#RAZON_SOCIAL').val(),
            DIRECCION: $('#DIRECCION').val(),
            TIPO_SOCIO: $('#TIPO_SOCIO').val(),
            CONTACTO: $('#CONTACTO').val(),
            EMAIL: $('#EMAIL').val(),
            FECHA_CREADO: $('#FECHA_CREADO').val(),
            ESTADO: $('#ESTADO').val(),
            TELEFONO: $('#TELEFONO').val()
        };
        var datosSociojson= JSON.stringify(datosSocio);
    
        $.ajax({
            url: UrlActualizarSocios ,
            type:'PUT',
            data:datosSociojson,
            datatype:'JSON',
            contentType: 'application/json',
            success: function(response){
                console.log(response);
            }
        });
        alert("Socio Actualizado ");
    }    

    function EliminarSocio(ID){
        var datosSocio= {
                ID:ID
            };
        var datosSociojson = JSON.stringify(datosSocio);
    
        $.ajax({
            url: UrlEliminarSocios,
            type:'DELETE',
            data:datosSociojson,
            datatype:'JSON',
            contentType: 'application/json',
            success: function(response){
                console.log(response);
            }
        });
        alert("Socio Eliminado");
        CargarSocios();
    }


















  
