var dataTableeee = [];
var menuDataArr = [];
var data = [];
var dataAkses = [];
var arrSaveUserAccess = [];
var base_url = $('#base_url').val();
var id_headeruser_id = '';
var id_user_get = '';
var MenuData = '';
var AksesData = '';
var search = '';


$(document).ready(function () {     
   
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "UserAccessController/getListUser",
            type : "POST",
            dataType : "json",
            data : {"" : ""},
            success : function(response) {
                $('#employeeTable').DataTable().clear();
                $('#employeeTable').DataTable().destroy();
                dataTableeee.push(response); 
                $('#employeeTable > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#employeeTable').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading').hide();  
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Data, Mohon Coba Kembali Beberapa Saat Lagi');
                $('#loading').hide();
            }
    });    
    
});

$('input').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        searchData();
    }
}); 

function getDetail(user_id){
    $('#loading1').show();
    $('#exampleModalCenter').modal('show');
    document.getElementById("exampleModalCenterTitle").innerHTML = 'User Access ' + user_id ;
    data = [];
    menuDataArr = [];

    $.ajax({
            url : base_url + "UserAccessController/getDetail",
            type : "POST",
            dataType : "json",
            data : {"user_id" : user_id},
            success : function(response) {
            console.log(response);
            
                MenuData  = response.MenuData;
                AksesData = response.AksesData;

                for(i = 0; i < MenuData.length; i++ ){
                    data = [ '<tr>' +
                                '<td> '+ MenuData[i]['menu_access_name'] +' </td>' +
                                '<td><input type="checkbox" value="check" id="akses'+ MenuData[i]['access_id'] +'"/> </td>' +
                            '</tr>'];
                    menuDataArr.push(data); 
                }    
                $('#tableAkses > tbody:first').html(menuDataArr);

                for(i = 0; i < AksesData.length; i++){
                    $('#akses'+AksesData[i]['access_id']).prop("checked", true);
                }
                $('#loading1').hide(); 
                $('#id_user_get').val(id_header); 

                $('#loading1').hide();
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Data, Mohon Coba Kembali Beberapa Saat Lagi');
                $('#loading').hide();
            }
    }); 
}

function saveUserAccess(){
    arrSaveUserAccess = [];
    var checked = '';
    id_user_get = $('#id_user_get').val();
    $('#loading1').show();

    for(i = 0; i < MenuData.length; i++ ){
        if ($("#akses"+MenuData[i]['access_id']).is(":checked")){
            checked = 'Y';
        }else{
            checked = 'N';
        }

        data = [MenuData[i]['access_id'], checked];
        arrSaveUserAccess.push(data); 
    }  
    lengthParsed = arrSaveUserAccess.length;
      
    $.ajax({
        url : base_url + "UserAccessController/userAccessProcess",
        type : "POST",
        dataType : "json",
        data : {"id_user_get"       : id_user_get,
                "arrSaveUserAccess" : arrSaveUserAccess,
                "lengthParsed"      : lengthParsed},
        success : function(response) {
           console.log('sukses : ' + response);
           $('#exampleModalCenter').modal('hide');
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal setting user acces, mohon coba beberapa saat lagi');
            window.location = base_url + 'DashboardController/index';
        }
    });    

}

function searchData(){
    
    dataTableeee = [];
    $('#loading').show(); 
    search = $('#search').val(); 
    console.log(search);

    $.ajax({
            url : base_url + "UserAccessController/getSearch",
            type : "POST",
            dataType : "json",
            data : {"search" : search},
            success : function(response) {
                $('#employeeTable').DataTable().clear();
                $('#employeeTable').DataTable().destroy();
                dataTableeee.push(response); 
                $('#employeeTable > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#employeeTable').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading').hide();  
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Data Tidak Ditemukan');
                $('#loading').hide();
            }
    });    
}