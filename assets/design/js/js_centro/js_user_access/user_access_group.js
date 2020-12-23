var dataTableeee = [];
var menuDataArr = [];
var data = [];
var dataAkses = [];
var arrSaveUserAccess = [];
var base_url = $('#base_url').val();
var id_header = '';
var id_user_get = '';
var MenuData = '';
var AksesData = '';
var search = '';
var input_nama_grup = '';
var input_deskripsi = '';
var groupHeader = '';

$(document).ready(function () {     
   
    get_data_awal();    
});

$('#btnTambah').click(function (){
    $('#modalGropMenu').modal('show');
    $('#input_nama_grup').val(''); 
    $('#input_deskripsi').val(''); 
    
    document.getElementById("exampleModalCenterTitle1").innerHTML = 'Tambah Group Menu';

    data = [];
    menuDataArr = [];

    $.ajax({
            url : base_url + "UserAccessController/getDetail",
            type : "POST",
            dataType : "json",
            data : {"id_header" : id_header},
            success : function(response) {
            console.log(response);
            
                MenuData  = response.MenuData;

                for(i = 0; i < MenuData.length; i++ ){
                    data = [ '<tr>' +
                                '<td> '+ MenuData[i]['menu_access_name'] +' </td>' +
                                '<td><input type="checkbox" value="check" id="akses'+ MenuData[i]['access_id'] +'"/> </td>' +
                            '</tr>'];
                    menuDataArr.push(data); 
                }    
                $('#tableAkses1 > tbody:first').html(menuDataArr);

                $('#loading2').hide();
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Data, Mohon Coba Kembali Beberapa Saat Lagi');
                $('#loading').hide();
            }
    }); 

});

function save_tambah_grup(){
    $('#loading2').show();  
    input_nama_grup = $('#input_nama_grup').val(); 
    input_deskripsi = $('#input_deskripsi').val();  

    console.log(input_nama_grup + ' ' + input_deskripsi + ' ' + base_url);

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
    console.log(arrSaveUserAccess, lengthParsed);

    $.ajax({
        url : base_url + "UserAccessController/addNewGroup",
        type : "POST",
        dataType : "json",
        data : {"input_nama_grup"   : input_nama_grup,
                "input_deskripsi"   : input_deskripsi,
                "arrSaveUserAccess" : arrSaveUserAccess,
                "lengthParsed"      : lengthParsed},
        success : function(response) {
           console.log('sukses : ' + response);
           $('#modalGropMenu').modal('hide');
           get_data_awal();
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal setting user acces, mohon coba beberapa saat lagi');
            window.location = base_url + 'UserAccessController/groupAccessIndex';
        }
    });    

};

function get_data_awal(){
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "UserAccessController/getListGroupMenu",
            type : "POST",
            dataType : "json",
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
}

function getDetail(id_header){
    $('#modalGropMenuEdit').modal('show');
    
    document.getElementById("exampleModalCenterTitleEdit").innerHTML = 'Tambah Group Menu';

    data = [];
    menuDataArr = [];

    $.ajax({
            url : base_url + "UserAccessController/get_detail_group",
            type : "POST",
            dataType : "json",
            data : {"id_header" : id_header},
            success : function(response) {
            console.log(response);
            
                MenuData    = response.MenuData;
                AksesData   = response.AksesData;
                groupHeader = response.GroupHeader;

                for(i = 0; i < MenuData.length; i++ ){
                    data = [ '<tr>' +
                                '<td> '+ MenuData[i]['menu_access_name'] +' </td>' +
                                '<td><input type="checkbox" value="check" id="akses_edit'+ MenuData[i]['access_id'] +'"/> </td>' +
                            '</tr>'];
                    menuDataArr.push(data); 
                }    
                $('#tableAkses_edit > tbody:first').html(menuDataArr);

                for(i = 0; i < AksesData.length; i++){
                    $('#akses_edit'+AksesData[i]['access_id']).prop("checked", true);
                }
                $('#id_header_edit').val(id_header); 
                $('#input_nama_grup_edit').val(groupHeader[0]['group_access']);
                $('#input_deskripsi_edit').val(groupHeader[0]['description']);

                $('#loading3').hide();
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Data, Mohon Coba Kembali Beberapa Saat Lagi');
                $('#loading').hide();
            }
    }); 
}

function update_group_menu(){
    $('#loading3').show();  
    input_nama_grup = $('#input_nama_grup_edit').val(); 
    input_deskripsi = $('#input_deskripsi_edit').val(); 
    id_header       = $('#id_header_edit').val(); 

    console.log(input_nama_grup + ' ' + id_header+ ' ' + input_deskripsi + ' ' + base_url);

    for(i = 0; i < MenuData.length; i++ ){
        if ($("#akses_edit"+MenuData[i]['access_id']).is(":checked")){
            checked = 'Y';
        }else{
            checked = 'N';
        }

        data = [MenuData[i]['access_id'], checked];
        arrSaveUserAccess.push(data); 
    }  
    lengthParsed = arrSaveUserAccess.length;
    console.log(arrSaveUserAccess, lengthParsed);

    $.ajax({
        url : base_url + "UserAccessController/update_group",
        type : "POST",
        data : {"input_nama_grup"   : input_nama_grup,
                "input_deskripsi"   : input_deskripsi,
                "arrSaveUserAccess" : arrSaveUserAccess,
                "lengthParsed"      : lengthParsed,
                "id_header"         : id_header},
        success : function(response) {
           console.log('sukses : ' + response);
           $('#modalGropMenuEdit').modal('hide');
           get_data_awal();
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal setting user acces, mohon coba beberapa saat lagi');
            window.location = base_url + 'UserAccessController/groupAccessIndex';
        }
    });    
}