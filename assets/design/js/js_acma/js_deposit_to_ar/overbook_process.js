 //table titipan ke ar untuk pencarian detail berdasarkan nomor memo
 var table_titipan_ke_ar = $('#table-titipan-ke-ar').DataTable({ 
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false
});



//table ar ke titipan untuk pencarian detail berdasarkan nomor memo
var table_ar_ke_titipan = $('#table-ar-ke-titipan').DataTable({
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false
}); 
/* tabel titipan ke Denda untuk pencarian detail berdasarkan nomor memo*/
var table_titipan_ke_denda = $('#table-titipan-ke-denda').DataTable({
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false
});
/* tabel titipan ke Denda untuk pencarian detail berdasarkan nomor memo*/
var table_denda_ke_titipan = $('#table-denda-ke-titipan').DataTable({       
   "scrollY":        "300px",
   "scrollCollapse": true,
   "paging":         false
}); 
/* tabel titipan ke titipan tanpa nama untuk pencarian detail berdasarkan nomor memo*/
var table_titipan_ke_titipan_tanpa_nama = $('#table-titipan-ke-titipan-tanpa-nama').DataTable({     
    "columnDefs": [
    {
        "targets": [ 4 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 6 ],
        "visible": false,
        "searchable": false
    }
    ],
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false
});
/*tabel titipan tanpa nama ke titipan untuk pencarian detail berdasarkan nomor memo*/
var table_titipan_tanpa_nama_ke_titipan = $('#table-titipan-tanpa-nama-ke-titipan').DataTable({     
    "columnDefs": [
    {
        "targets": [ 2 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 4 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 5 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 6 ],
        "visible": false,
        "searchable": false
    }
    ],
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false

}); 

var table_memo_rv = $('#tbl-memo-rv-ovb').DataTable({
    "columnDefs" : [
    {
        "targets": [ 3 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 4 ],
        "visible": false,
        "searchable": false
    }],
    "paging":  true
});
/*tabel titipan a ke titipan b untuk pencarian detail berdasarkan nomor memo*/


/*function tabelttnttp(){
    $('#check-all-ttanpa-nama-titipan2').on( 'click', function () {
        t.row.add( [
            '<input id= "check-ttanpa-nama-titipans' + index + '" class="check_ttanpa_nama_titipan" type="checkbox">',
            '<input id= "check-ttanpa-nama-titipas' + index + '" class="form-control inp-number input-smn" type="text">',
            '<input id= "check-ttanpa-nama-titips' + index + '" class="form-control inp-number input-smn" type="text">',
            '<input id= "check-ttanpa-nama-titis' + index + '" class="form-control inp-number input-smn" type="text">',
            '<input id= "check-ttanpa-nama-tits' + index + '" class="form-control inp-number input-smn" type="text">',
            '<input id= "check-ttanpa-nama-tis' + index + '" class="form-control inp-number input-smn" type="text">',
            '<input id= "check-ttanpa-nama-ts' + index + '" class="form-control inp-number input-smn" type="text">',
            '<input id= "check-ttanpa-nama-s' + index + '" class="form-control inp-number input-smn" type="text">',
            '<input id= "check-ttanpa-nams' + index + '" class="form-control inp-number input-smn" type="text">',
            '<input id= "check-ttanpa-nas' + index + '" class="form-control inp-number input-smn" type="text">',
            ] ).draw( false );

        counter++;
    } );

    $('#check-all-ttanpa-nama-titipan2').click();
}*/




var table_titipana_ke_titipanb = $('#table-titipanA-ketitipanB').DataTable({            
    //hide column datatables
    columnDefs: [
    {
        "targets": [ 1 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 4 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 7 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 10 ],
        "visible": false,
        "searchable": false
    }
    ],
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false
}); 
/*tabel titipan ke pendapatan untuk pencarian detail berdasarkan nomor memo*/
var table_titipan_ke_pendapatan = $('#table-titipan-ke-pendapatan').DataTable({     
    //responsive: true,
    columnDefs: [
    {
        "targets": [ 3 ],
        "visible": false,
        "searchable": false
    }
    ],
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false
}); 

/*tabel titipan tanpa nama ke mu finance*/
var table_ttn_muf = $('#table-ttn-muf').DataTable({       
    columnDefs: [    
    {
        "targets": [ 3 ],
        "visible": false,
        "searchable": false
    },
    {
        "targets": [ 4 ],
        "visible": false,
        "searchable": false
    }
    ],
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false
});

var select_branch = '';
var select_tab_ovb = '';
var kode_cabang_detail = '';
var nama_cabang_detail = '';
var no_memo = '';

$('.btn-simpan-ovb').prop('disabled', true);
$('.btn-konfirmasi-ovb').prop('disabled', true);
$('.btn-print-ovb').prop('disabled', true);
$('.btn-cancel-ovb').prop('disabled', true);

var role = '';

if (!localStorage.getItem('role_user_ovb')) {

	$.ajax({
		url : base_url + "Controller_home/get_detail_user",
		cache : false,
        async:false,
        success : function(response){
         console.log(response);
         localStorage.setItem('role_user_ovb', response);
         role = $.parseJSON(localStorage.getItem('role_user_ovb'));
         console.log(role);
     },
     error: function(response){
         console.log(response);
     }
 });
}
else{
	role = $.parseJSON(localStorage.getItem('role_user_ovb'));
    console.log(role);
}

var role_bool = false; 
for (var i = 0; i < role.length; i++) {
   if (role[i].role_code === 'ADH_OVB') {

        // alert_error('bukan sebagai adh');
        role_bool = true;
        disbadhbtnrst();
        disbadhbtncfm();
        disbadhbtncnl();
        $('#create-new-memo-kontrak, #slc-tab-ovb').prop('disabled', true);
        break;
    }
    else{

        role_bool = false;
        //$('#search-memo-kontrak').prop("disabled", true);
    }
}



// if (role_bool == true) {
//     disbadhbtnrst();
//     disbadhbtncfm();
//     disbadhbtncnl();
//     $('#create-new-memo-kontrak, #slc-tab-ovb').prop('disabled', true);
// }

/*--------------------------------button kembali ke menu awal--------------------------------*/
$('#back-to-search-memo').click(function(){
	window.location.href=base_url+"controller_deposit_to_ar";
});
/*--------------------------------button kembali ke menu awal--------------------------------*/


/*--------------- Disable Alphabet ---------------*/
/*$('.inp-number').on('keydown', function(e) {
	-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
	&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
	&& 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) 
	&& (96 > e.keyCode || 105 < e.keyCode)
	&& e.preventDefault()
});*/

/*--------------- Disable Number -----------------*/
/*$('.inp-alphabet').on('keydown', function(e){
	var keyCode = (e.keyCode ? e.keyCode : e.which);
	if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 111) || 105 < keyCode) { 
		e.preventDefault();
	}
});
*/
/*--------------- Disable Symbol ----------------*/
/*$('.inp-alphabet-number').on('keydown', function(e){
	-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
	&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
	&& 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 90 < e.keyCode) 
	&& (96 > e.keyCode || 105 < e.keyCode)
	&& e.preventDefault()
});*/

/*--------------- Ambil Value code cabang dan nama cabang ---------------*/
$('.menu-tab-ovb').hide();
kode_cabang_detail = $('#branch-code').val();
nama_cabang_detail = $('#branch-name').val();
if(kode_cabang_detail !=='0000'){
	console.log("masuk sebagai cabang");			
	$('#div-list-branch').show();			
			//$('#slc-branch-depositar').prop('disabled', true);
			$('<option/>').val(kode_cabang_detail).html(kode_cabang_detail+' - '+nama_cabang_detail).appendTo('#slc-branch-depositar');
		}else
		{
			get_data_branch('#slc-branch-depositar');
			$('#slc-branch-depositar').prop('disabled', false);
			//$('#div-list-branch').show();				
		}

        /*--------------------------------cari berdasarkan nomor memo--------------------------------*/
        $('#search-memo-kontrak').click(function() {
            no_memo = $('#inp-nomor-memo').val();
            select_branch = $('#slc-branch-depositar').val();
            console.log(no_memo, no_memo.length, select_branch);
            if (no_memo === '' && select_branch === '') {
                alert_error("SILAHKAN INPUT 12 DIGIT NOMOR MEMO  DAN PILIH CABANG");
                $('#nomor-memo-validasi, #div-list-branch').addClass('has-error');
            } else if (no_memo === '' && select_branch !== '') {
                alert_error("SILAHKAN INPUT 12 DIGIT NOMOR MEMO");
                $('#nomor-memo-validasi').addClass('has-error');
                $('#div-list-branch').removeClass('has-error');
            } else if (no_memo.length !== 12 && select_branch === '') {
                alert_error("SILAHKAN INPUT 12 DIGIT NOMOR MEMO  DAN PILIH CABANG");
                $('#nomor-memo-validasi, #div-list-branch').addClass('has-error');
            } else if (no_memo.length === 12 && select_branch === '') {
                alert_error("SILAHKAN PILIH CABANG");
                $('#nomor-memo-validasi').removeClass('has-error');
                $('#div-list-branch').addClass('has-error');
            } else if (no_memo.length === '' && select_branch !== '') {
                alert_error("Silahkan Input 12 Digit Nomor Memo");
                $('#nomor-memo-validasi').addClass('has-error');
                $('#div-list-branch').removeClass('has-error');
            } else {

                $('#div-list-branch, #nomor-memo-validasi').removeClass('has-error');
                $.ajax({
                    url: base_url + "Controller_deposit_to_ar/search_no_memo",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        nomor_memo: no_memo,
                        branch_code: select_branch
                    },
                    cache: false,
                    success: function(response) {
                        console.log(response);
                        if (response['Status'] == "500") {
                            console.log(response['ErrorMessage']);
                            alert_error(response['ErrorMessage']);
                        } else {
                            kode_cabang_detail = $('#branch-code').val();
                            nama_cabang_detail = $('#branch-name').val();
                            $('#div-list-branch').show();
                            $('#slc-branch-depositar').prop('disabled', true);
                            $('#src-no-memo-rv').prop('disabled', true);
                            $('<option/>').val(kode_cabang_detail).html(kode_cabang_detail + ' - ' + nama_cabang_detail).appendTo('#slc-branch-depositar');
                            $('#back-to-search-memo').show();
                            $('#kode-cabang').show();
                            $('#menu-tab-utama').show();
                            $('#memo-tanggal').show();
                            $('#content-sub-tab').show();
                            $('.menu-tab-ovb').show();			
                            $('#panel-memo').hide();
                            $('#detail-titipan-tab').show();                                           
                            console.log('tes');

                    if (response.checkstatus == 1) //status sudah di konfirmasi
                    {
                        alert_info("data telah di konfirmasi");
                        chekcedall();
                        disbchkhead();
                        disbfieldovb();                        
                        $('.res-global').prop('readonly', true);
                        $('.btn-print-ovb').prop('disabled', false);
                        $('#btn-save-titipan-ar,  #btn-confirm-titipan-ar, #btn-cancel-titipan-ar').prop('disabled', true); 
                        $('#btn-save-ar-titipan, #btn-confirm-ar-titipan, #btn-cancel-ar-titipan').prop('disabled', true);
                        $('#btn-save-titipan-denda, #btn-confirm-titipan-denda, #btn-cancel-titipan-denda').prop('disabled', true);
                        $('#btn-save-denda-titipan, #btn-confirm-denda-titipan, #btn-cancel-denda-titipan').prop('disabled', true);
                        $('#btn-save-titip-titipan-tanpa-nama, #btn-confirm-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama').prop('disabled', true);
                        $('#btn-save-titipan-tanpa-nama-ke-titipan, #btn-confirm-titipan-tanpa-nama-ke-titipan, #btn-cancel-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
                        $('#btn-save-titipan-a-ke-b, #btn-confirm-titipan-a-ke-b, #btn-cancel-titipan-a-ke-b').prop('disabled', true);
                        $('#btn-save-titipan-pendapatan, #btn-confirm-titipan-pendapatan, #btn-cancel-titipan-pendapatan').prop('disabled', true);
                        $('#btn-save-ttn-muf, #btn-confirm-ttn-muf, #btn-cancel-ttn-muf').prop('disabled', true);


                    } else if (response.checkstatus == 2) //status sudah diancel
                    {
                        alert_info("data telah di cancel");
                        chekcedall();
                        disbchkhead();
                        disbfieldovb();
                        chekcedall();
                        $('#inp-no-kontrak-titipan-ar').prop('readonly', true);
                        $('#inp-no-kontrak-titipan-a, #inp-no-kontrak-titipan-b').prop('disabled', true);
                        $('#btn-save-titipan-ar, #btn-confirm-titipan-ar, #btn-cancel-titipan-ar, #btn-print-titipan-ar').prop('disabled', true);
                        $('#btn-save-ar-titipan, #btn-confirm-ar-titipan, #btn-cancel-ar-titipan, #btn-print-ar-titipan').prop('disabled', true);
                        $('#btn-save-titipan-denda, #btn-confirm-titipan-denda, #btn-cancel-titipan-denda, #btn-print-titipan-denda').prop('disabled', true);
                        $('#btn-save-denda-titipan, #btn-confirm-denda-titipan, #btn-cancel-denda-titipan, #btn-print-denda-titipan').prop('disabled', true);
                        $('#btn-save-titip-titipan-tanpa-nama, #btn-confirm-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama, #btn-print-titip-titipan-tanpa-nama').prop('disabled', true);
                        $('#btn-save-titipan-tanpa-nama-ke-titipan, #btn-confirm-titipan-tanpa-nama-ke-titipan, #btn-cancel-titipan-tanpa-nama-ke-titipan, #btn-print-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
                        $('#btn-save-titipan-a-ke-b, #btn-confirm-titipan-a-ke-b, #btn-cancel-titipan-a-ke-b, #btn-print-titipan-a-ke-b').prop('disabled', true);
                        $('#btn-save-titipan-pendapatan, #btn-confirm-titipan-pendapatan, #btn-cancel-titipan-pendapatan, #btn-print-titipan-pendapatan').prop('disabled', true);
                        $('#btn-save-ttn-muf, #btn-confirm-ttn-muf, #btn-cancel-ttn-muf, #btn-print-ttn-muf').prop('disabled', true);

                    } else //status baru di save
                    {
                        alert_info("data telah di save");
                        chekcedall();
                        disbchkhead();
                        disbfieldovb();                                                             
                        $('#inp-no-kontrak-titipan-ar').prop('readonly', true);
                        $('#inp-no-kontrak-ar-titipan').prop('readonly', true);                        
                        $('#btn-save-titipan-ar, #btn-print-titipan-ar').prop('disabled', true);
                        $('#btn-save-ar-titipan, #btn-print-ar-titipan').prop('disabled', true);
                        $('#btn-save-titipan-denda, #btn-print-titipan-denda').prop('disabled', true);
                        $('#btn-save-denda-titipan, #btn-print-denda-titipan').prop('disabled', true);
                        $('#btn-save-titip-titipan-tanpa-nama, #btn-print-titip-titipan-tanpa-nama').prop('disabled', true);
                        $('#btn-save-titipan-tanpa-nama-ke-titipan, #btn-print-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
                        $('#btn-save-titipan-a-ke-b, #btn-print-titipan-a-ke-b').prop('disabled', true);
                        $('#btn-save-titipan-pendapatan, #btn-print-titipan-pendapatan').prop('disabled', true);
                        $('#btn-save-ttn-muf, #btn-print-ttn-muf').prop('disabled', true);
                        if (role_bool == true) {
                            disbadhbtnrst();
                            disbadhbtncfm();
                            disbadhbtncnl();
                            $('#create-new-memo-kontrak, #slc-tab-ovb').prop('disabled', true);
                        }
                        else {
                            endbtncnl(); 
                            endbtncfm();
                        }

                    }

                    switch (response.ob_type) {
                        //titipan ke angsuran
                        case '0':
                        {

                                //menuju tab yang dipilih
                                // hide button $('#tampil-data-titipan-pendapatan').toggle(false);
                                $('#titipan-group').html('Titipan ke Angsuran');        
                                $('#ar-ke-titipan, #titipan-tanpa-nama, #denda-ke-titipan, #ttn-to-muf').hide();
                                $('#search-no-kontrak-titipan-ar').toggle(false); //$('#reset-data-titipan-ar
                                $('#inp-contract-id-titipan-ar').val(response['contract_id']);
                                $('#inp-nama-nasabah-titipan-ar').val(response['nama_nasabah']);
                                $('#inp-saldo-titipan-ar').val(accounting.formatMoney(response['saldo'], '', 2, ',', '.'));
                                $('#inp-memo-titipan-ar').val(no_memo);
                                $('#check-all-angsuran').prop('disabled', true);
                                $('#check-all-angsuran').prop('checked', true);
                                $('#inp-no-kontrak-titipan-ar').val(response['nomor_contract']);
                                table_titipan_ke_ar.clear();
                                $.each(response['ListTitipAr'], function(index) {
                                    table_titipan_ke_ar.row.add([
                                        '<input id="check-angsurans' + index + '" class="check_angsuran chk_list_dtl" type="checkbox" disabled checked>',
                                        response['ListTitipAr'][index]['deskripsi'],
                                        accounting.formatMoney(response['ListTitipAr'][index]['angsuran'], '', 2, ',', '.'),
                                        response['ListTitipAr'][index]['angsuran_ke'],
                                        response['ListTitipAr'][index]['tgl_penerimaan'],
                                        ]).draw(false);

                                });
                                break;
                            }
                        //titipan tanpa nama ke titipan
                        case '1':
                        {                                
                            $('#titipan, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
                            $('#menu-tab-utama a[href="#detail-titipan-tanpa-nama-tab"]').tab('show');
                            $('#search-no-kontrak-ttn-ketitipan').toggle(false); // #reset-data-ttn-ketitipan
                            $('#inp-no-rv-titipan-tanpa-nama-ketitipan').val(response['listTTanpaNamaToTitip'][0]['nomor_rv']);
                            $('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').val(response['listTTanpaNamaToTitip'][0]['nomor_contract_tujuan']);
                            $('#inp-memo-ttanpanama-ketitipan').val(no_memo);
                            table_titipan_tanpa_nama_ke_titipan.clear();
                            $.each(response['listTTanpaNamaToTitip'], function(index) {
                                table_titipan_tanpa_nama_ke_titipan.row.add([                                        
                                    '<input id= "check-ttanpa-nama-titipans' + index + '" class="check_ttanpa_nama_titipan" type="checkbox" disabled checked>',
                                    response['listTTanpaNamaToTitip'][index]['nomor_rv'],
                                    response['listTTanpaNamaToTitip'][index]['deposit_date'],
                                    accounting.formatMoney(response['listTTanpaNamaToTitip'][index]['current_balance'], '', 2, ',', '.'),
                                    response['listTTanpaNamaToTitip'][index]['deskripsi'],
                                    response['listTTanpaNamaToTitip'][index]['nama_nasabah'],
                                    response['listTTanpaNamaToTitip'][index]['contract_id'],
                                    response['listTTanpaNamaToTitip'][index]['nomor_contract_tujuan'],
                                    response['listTTanpaNamaToTitip'][index]['no_angsuran'],
                                    accounting.formatMoney(response['listTTanpaNamaToTitip'][index]['nominal_angsuran'], '', 2, ',', '.')
                                    ]).draw(false);
                            });

                            break;
                        }
                        //angsuran ke titipan    
                        case '2':
                        {
                            console.log("tab angsuran ke titipan");
                            $('#titipan, #titipan-tanpa-nama, #denda-ke-titipan, #ttn-to-muf').hide();
                            $('#menu-tab-utama a[href="#detail-ar-ke-titipan-tab"]').tab('show');
                            $('#search-no-kontrak-ar-titipan').toggle(false); //, #reset-data-ar-titipan
                            $('#inp-contract-id-ar-titipan').val(response['contract_id']);
                            $('#inp-no-kontrak-ar-titipan').val(response['nomor_contract']);
                            $('#inp-memo-ar-titipan').val(no_memo);
                            $('#check-all-angsuran-titip').prop('checked', true);
                            $('#check-all-angsuran-titip').prop('disabled', true);
                            $('#inp-nama-nasabah-ar-titipan').val(response['nama_nasabah']);
                            table_ar_ke_titipan.clear();
                            $.each(response['listArToTitip'], function(index) {
                                table_ar_ke_titipan.row.add([                                        
                                    '<input id= "check-ar-titips' + index + '" class="check_ar_titip" type="checkbox" disabled checked>',
                                    response['listArToTitip'][index]['deskripsi'],
                                    response['listArToTitip'][index]['no_referensi'],
                                    response['listArToTitip'][index]['tgl_penerimaan'],
                                    response['listArToTitip'][index]['no_angsuran'],
                                    accounting.formatMoney(response['listArToTitip'][index]['nominal_angsuran'], '', 2, ',', '.')
                                    ]).draw(false);
                            });
                            break;
                        }
                        //denda ke titipan
                        case '3':
                        {
                            console.log("tab denda ke titipan");
                            $('#titipan, #titipan-tanpa-nama, #ar-ke-titipan, #ttn-to-muf').hide();
                            $('#menu-tab-utama a[href="#detail-denda-ke-titipan-tab"]').tab('show');
                            $('#search-no-kontrak-denda-titipan').toggle(false); //, #reset-data-denda-titipan'
                            $('#inp-contract-id-denda-titipan').val(response['contract_id']);
                            $('#inp-no-kontrak-denda-titipan').val(response['nomor_contract']);
                            $('#inp-memo-denda-ketitipan').val(no_memo);
                            $('#inp-nama-nasabah-denda-titipan').val(response['nama_nasabah']); 
                            $('#inp-saldo-denda-titipan').val(accounting.formatMoney(response['saldo'], '', 2, ',', '.'));
                            table_denda_ke_titipan.clear();
                            $.each(response['listDendaToTitip'], function(index) {
                                table_denda_ke_titipan.row.add([
                                    '<input id= "check-denda-titips' + index + '" class="check_denda_titip" type="checkbox" disabled checked>',
                                    response['listDendaToTitip'][index]['deskripsi'],
                                    response['listDendaToTitip'][index]['no_angsuran'],
                                    accounting.formatMoney(response['listDendaToTitip'][index]['denda'],'', 2, ',', '.'),
                                    '<input type="text" disabled id= "denda_overbook' + index + '" class="form-control inp-number input-smn inp-denda-ovb" type="text" value = '+ accounting.formatMoney(response['listDendaToTitip'][index]['denda_overbook'], '', 2, ',', '.') + '></input>',
                                    response['listDendaToTitip'][index]['tanggal_penerimaan'],
                                    ]).draw(false);
                            });

                            break;
                        }
                        //titipan ke denda
                        case '4':
                        {
                            console.log("tab titipan ke denda");
                            $('#titipan-group').html('Titipan ke Denda');
                            $('#titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
                            $('#detail-titipan-tab a[href="#tab-titipan-ke-denda"]').tab('show');
                            $('#search-no-kontrak-titipan-denda').toggle(false); //, #reset-data-titipan-denda
                            $('#inp-contract-id-titipan-denda').val(response['contract_id']);
                            $('#inp-no-kontrak-titipan-denda').val(response['nomor_contract']);
                            $('#inp-memo-titipan-denda').val(no_memo);
                            $('#inp-nama-nasabah-titipan-denda').val(response['nama_nasabah']);
                            $('#inp-saldo-titipan-denda').val(accounting.formatMoney(response['saldo'], '', 2, ',', '.'));
                            table_titipan_ke_denda.clear();
                            $.each(response['listTitipDenda'], function(index) {
                                table_titipan_ke_denda.row.add([
                                    '<input id= "check-titip-dendas' + index + '" class="check_titip_denda" type="checkbox" disabled checked>',
                                    response['listTitipDenda'][index]['deskripsi'],
                                    response['listTitipDenda'][index]['no_angsuran'],
                                    accounting.formatMoney(response['listTitipDenda'][index]['denda'],'', 2, ',', '.'),
                                    '<input type="text" disabled id= "titipan' + index + '" class="form-control input-smn" type="text" value = '+ accounting.formatMoney(response['listTitipDenda'][index]['titipan'], '', 2, ',', '.') +' ></input>',
                                    //accounting.formatMoney(response['listTitipDenda'][index]['titipan'],'', 2, ',', '.'),
                                    response['listTitipDenda'][index]['tanggal'],
                                    ]).draw(false);
                            });


                            break;
                        }
                        //titipan ke titipan tanpa nama    
                        case '5':
                        {
                            console.log("tab titipan ke titipan tanpa nama");
                            $('#titipan-group').html('Titipan ke Titipan Tanpa Nama');
                            $('#titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
                            $('#detail-titipan-tab a[href="#tab-titipan-ke-titipan-tanpa-nama"]').tab('show');
                            $('#search-no-kontrak-titipan-ketitipan-tanpa-nama').toggle(false); //, #reset-data-titipan-ttanpanama
                            $('#inp-contract-id-titip-titipan-tanpa-nama').val(response['contract_id']);
                            $('#inp-no-kontrak-titip-titipan-tanpa-nama').val(response['nomor_contract']);
                            $('#inp-memo-titipan-titipan-tanpa-nama').val(no_memo);
                            $('#inp-nama-nasabah-titip-titipan-tanpa-nama').val(response['nama_nasabah']);
                            $('#inp-saldo-titip-titipan-tanpa-nama').val(accounting.formatMoney(response['saldo'], '', 2, ',', '.'));
                            table_titipan_ke_titipan_tanpa_nama.clear();
                            $.each(response['listTitipToTTanpaNama'], function(index) {
                                table_titipan_ke_titipan_tanpa_nama.row.add([
                                    '<input id= "check-titip-ttns' + index + '" class="check-titip-ttn" type="checkbox" disabled checked>',
                                    response['listTitipToTTanpaNama'][index]['deskripsi'],
                                    response['listTitipToTTanpaNama'][index]['no_angsuran'],
                                    '<input type="text" disabled id= "nominal-pindah' + index + '" class="form-control input-smn" type="text" value = '+ accounting.formatMoney(response['listTitipToTTanpaNama'][index]['nominal_dipindahkan'], '', 2, ',', '.') +' ></input>',
                                    response['listTitipToTTanpaNama'][index]['reference_no'],
                                    response['listTitipToTTanpaNama'][index]['tanggal_penerimaan'],
                                    response['listTitipToTTanpaNama'][index]['document_no'],
                                    ]).draw(false);
                            });

                            break;
                        }
                        //titipan ke pendapatan                            
                        case '7':
                        {
                            console.log("tab titipan ke pendapatan");
                            $('#titipan-group').html('Titipan ke Pendapatan');
                            $('#titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
                            $('#detail-titipan-tab a[href="#tab-titipan-ke-pendapatan"]').tab('show');
                            $('#tampil-data-titipan-pendapatan').toggle(false);
                            $('#inp-memo-titipan-ke-pendapatan').val(no_memo);
                            table_titipan_ke_pendapatan.clear();
                            $.each(response['listTitipPend'], function(index) {
                                table_titipan_ke_pendapatan.row.add([
                                    '<input id= "check-titipan-pends' + index + '" class="check_titipan_pend" type="checkbox" disabled checked>',
                                    response['listTitipPend'][index]['nomor'],
                                    response['listTitipPend'][index]['contract_no'],
                                    response['listTitipPend'][index]['contract_id'],
                                    response['listTitipPend'][index]['customer_name'],
                                    response['listTitipPend'][index]['installment_no'],
                                    response['listTitipPend'][index]['transaction_date'],                                        
                                    accounting.formatMoney(response['listTitipPend'][index]['current_ballance'],'', 2, ',', '.') 

                                    ]).draw(false);
                            });
                            break;
                        }
                        //titipan a ke b
                        case '11':
                        {
                            console.log("tab titipan a ke b");
                            $('#titipan-group').html('Titipan A ke Titipan B');
                            $('#titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
                            $('#detail-titipan-tab a[href="#tab-titipanA-ke-titipanB"]').tab('show');
                            $('#search-no-kontrak-titipana-titipanb').toggle(false); //, #reset-data-titipana-titipanb
                            $('#inp-no-kontrak-titipan-a').val(response['listTitipAToB'][0]['contract_noa']);
                            $('#inp-no-kontrak-titipan-b').val(response['listTitipAToB'][0]['contract_nob']);
                            $('#inp-memo-titipan-akeb').val(no_memo);
                            table_titipana_ke_titipanb.clear();
                            $.each(response['listTitipAToB'], function(index) {
                                table_titipana_ke_titipanb.row.add([
                                    '<input id= "check-titipa-to-titipbs' + index + '" class="check_titipa_totitipb" type="checkbox" disabled checked>',
                                    response['listTitipAToB'][index]['contract_ida'],
                                    response['listTitipAToB'][index]['contract_noa'],
                                    response['listTitipAToB'][index]['nama_a'],
                                    response['listTitipAToB'][index]['installment_a'],                                        
                                    accounting.formatMoney(response['listTitipAToB'][index]['jumlah_a'],'', 2, ',', '.'),
                                    response['listTitipAToB'][index]['tanggal'],
                                    response['listTitipAToB'][index]['contract_idb'],
                                    response['listTitipAToB'][index]['contract_nob'],
                                    response['listTitipAToB'][index]['nama_b'],
                                    response['listTitipAToB'][index]['installment_b'],
                                    '<input type="text" disabled id= "jumlahb' + index + '" class="form-control input-smn" type="text" value = '+ accounting.formatMoney(response['listTitipAToB'][index]['jumlah_b'], '', 2, ',', '.') +' ></input>',
                                    ]).draw(false);
                            });
                            break;
                        }
                        case '8':
                        {
                            console.log("tab titipan tanpa nama ke muf finance");

                            $('#titipan, #titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan').hide();
                            $('#menu-tab-utama a[href="#detail-ttn-muf-tab"]').tab('show');
                            $('#tampil-data-ttn-muf').toggle(false); //, #reset-data-ttn-muf
                            $('#slc-ttn-muf').val(response['listTtnMuf'][0]['interface_code']);
                            $('#inp-memo-ttn-ke-muf').val(response['listTtnMuf'][0]['nomor_memo']);
                            table_ttn_muf.clear();
                            $.each(response['listTtnMuf'], function(index) {
                                table_ttn_muf.row.add([
                                    '<input id= "check-ttn-tomufs' + index + '" class="check_ttn_tomuf chk_list_dtl" type="checkbox" disabled checked>', 
                                    response['listTtnMuf'][index]['reference_no'],                                      
                                    accounting.formatMoney(response['listTtnMuf'][index]['current_balance'], '', 2, ',', '.'), 
                                    response['listTtnMuf'][index]['transaction_code'],                                      
                                    response['listTtnMuf'][index]['branch_code'],
                                    ]).draw(false);
                            });
                            break;
                        }

                        
                    }
                }

            },
            error: function(response) {
                console.log(response);

            }
        });
}
})
 /*--------------------------------cari berdasarkan nomor memo--------------------------------*/

 /*----- create new data overbook (memunculkan tab tab yang ingin dipilih) -----*/
 $('#create-new-memo-kontrak').click(
     function() {

      select_branch = $('#slc-branch-depositar').val();
      select_tab_ovb = $('#slc-tab-ovb').val();
      console.log(select_tab_ovb)


      if (select_branch === '' && select_tab_ovb === '00') {
       alert_error("SILAHKAN PILIH CABANG DAN PILIH TAB");
       $('#div-list-branch, #div-list-tab').addClass('has-error');
       $('#nomor-memo-validasi').removeClass('has-error');
   } else if(select_tab_ovb === '00'){
       alert_error('silahkan pilih tab');
       $('#div-list-tab').addClass('has-error');
   }
   else {
       kode_cabang_detail = $('#branch-code').val();
       nama_cabang_detail = $('#branch-name').val();
       $('.menu-tab-ovb').show();
       console.log(select_branch)
       switch (select_tab_ovb) {
        case '0':
        { 
            setTimeout(function(){ table_titipan_ke_ar.draw(); }, 0);
            $('#titipan-group').html('Titipan ke Angsuran');        
            $('#ar-ke-titipan, #titipan-tanpa-nama, #denda-ke-titipan, #ttn-to-muf').hide();
            $('#titipan-to-denda-ovb, #titipan-to-pendapatan-ovb, #titipan-to-ttn-ovb, #titipana-to-titipanb-ovb').hide();
            $('#titipan-to-ar-ovb ').tab('show');
            break;
        }
        case '1':
        {
         setTimeout(function(){ table_titipan_tanpa_nama_ke_titipan.draw(); }, 0);
         $('#titipan, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
         $('#menu-tab-utama a[href="#detail-titipan-tanpa-nama-tab"]').tab('show');
         break;
     }
     case '2':
     {

        setTimeout(function(){ table_ar_ke_titipan.draw(); }, 0);
        $('#titipan, #titipan-tanpa-nama, #denda-ke-titipan, #ttn-to-muf').hide();
        $('#menu-tab-utama a[href="#detail-ar-ke-titipan-tab"]').tab('show');
        break;
    }
    case '3':
    {
        setTimeout(function(){ table_denda_ke_titipan.draw(); }, 0);
        $('#titipan, #titipan-tanpa-nama, #ar-ke-titipan, #ttn-to-muf').hide();
        $('#menu-tab-utama a[href="#detail-denda-ke-titipan-tab"]').tab('show');
        break;
    }
    case '4':
    {
        setTimeout(function(){ table_titipan_ke_denda.draw(); }, 0);
        $('#titipan-group').html('Titipan ke Denda');
        $('#titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
        $('#titipan-to-ar-ovb,  #titipan-to-pendapatan-ovb, #titipan-to-ttn-ovb, #titipana-to-titipanb-ovb').hide();					
        $('#detail-titipan-tab a[href="#tab-titipan-ke-denda"]').tab('show');
        break;
    }
    case '5':
    {
        setTimeout(function(){ table_titipan_ke_titipan_tanpa_nama.draw(); }, 0);
        $('#titipan-group').html('Titipan ke Titipan Tanpa Nama');
        $('#titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
        $('#titipan-to-ar-ovb,  #titipan-to-pendapatan-ovb, #titipan-to-denda-ovb, #titipana-to-titipanb-ovb').hide();					
        $('#detail-titipan-tab a[href="#tab-titipan-ke-titipan-tanpa-nama"]').tab('show');
        break;
    }
    case '7':
    {
        setTimeout(function(){ table_titipan_ke_pendapatan.draw(); }, 0);
        $('#titipan-group').html('Titipan ke Pendapatan');
        $('#titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
        $('#titipan-to-ar-ovb,  #titipan-to-ttn-ovb, #titipan-to-denda-ovb, #titipana-to-titipanb-ovb').hide();
        $('titipan-to-pendapatan-ovb').tab('show');
        $('#detail-titipan-tab a[href="#tab-titipan-ke-pendapatan"]').tab('show');
        break;
    }
    case '8':
    {
        setTimeout(function(){ table_ttn_muf.draw(); }, 0);
        $('#titipan, #ar-ke-titipan, #denda-ke-titipan, #titipan-tanpa-nama').hide();
        $('#menu-tab-utama a[href="#detail-ttn-muf-tab"]').tab('show');
        break;					
    }
    case '11':
    {

        setTimeout(function(){ table_titipana_ke_titipanb.draw(); }, 0);
        $('#titipan-group').html('Titipan A ke Titipan B');
        $('#titipan-tanpa-nama, #ar-ke-titipan, #denda-ke-titipan, #ttn-to-muf').hide();
        $('#titipan-to-ar-ovb,  #titipan-to-pendapatan-ovb, #titipan-to-denda-ovb, #titipan-to-ttn-ovb').hide();
        $('#detail-titipan-tab a[href="#tab-titipanA-ke-titipanB"]').tab('show');
        break;
    }
}			

if (kode_cabang_detail !== '0000') {
    console.log("masuk sebagai cabang");
    $('#div-list-branch').hide();
    $('<option/>').val(kode_cabang_detail).html(kode_cabang_detail + ' - ' + nama_cabang_detail).appendTo('#slc-branch-depositar');
    $('#back-to-search-memo').show();
    $('#kode-cabang').show();
    $('#menu-tab-utama').show();
    $('#content-sub-tab').show();
    $('#panel-memo').hide();
} else {
    debugger;
    get_data_branch('#slc-branch-depositar');
    $('#slc-branch-depositar').prop('disabled', false);
    $('#div-list-branch').hide();
    $('#back-to-search-memo').show();
    $('#kode-cabang').show();
    $('#menu-tab-utama').show();
    $('#memo-tanggal').show();
    $('#content-sub-tab').show();
    $('#panel-memo').hide();
}
}

});
 /*--------------------------------create new data overbook --------------------------------*/

/* $('.inp-number').focus(function () {
    var number = $(this).val().replace(/,/gi, '').replace('.00', '');
    $(this).val(number);
});

 $('.inp-number').blur(function () {
    $(this).val(accounting.formatMoney($(this).val(), '', 2, ',', '.'));
});

 $('.inp-number').keypress(function (e) {
    if ($.isNumeric($(this).attr('max'))) {
        if (e.which == 8 || e.which == 0) {

        } else if (e.which < 48 || e.which > 57 || e.which === 101 || e.which === 44 || $(this).val().length === parseInt($(this).attr('max'))) {
            return false;
        } else if ($(this).val().length === 0 && e.which === 32) {
            return false;
        }
    } else {
        if (e.which == 8 || e.which == 0) {

        } else if (e.which < 48 || e.which > 57 || e.which === 101 || e.which === 44) {
            return false;
        } else if ($(this).val().length === 0 && e.which === 32) {
            return false;
        }
    }
});*/

function formatuangovb(a) {
    var nilai = $("#"+a).val();
    $("#"+a).val(accounting.formatMoney(nilai, '', 2, ',', '.'));
}
function unformatuangovb(a) {
    var nilai = $("#"+a).val();
    $("#"+a).val(accounting.unformat(nilai));
}

function disbchkhead(){
    $('#check-all-angsuran').prop('disabled', true);
    $('#check-all-angsuran-titip').prop('disabled', true);
    $('#check-all-titipdenda').prop('disabled', true);
    $('#check-all-dendatitip').prop('disabled', true);
    $('#check-all-titipttanpa-nama').prop('disabled', true);
    $('#check-all-titip-to-pendapatan').prop('disabled', true);
    $('#check-all-ttanpa-nama-titipan').prop('disabled', true);
    $('#check-all-ttn-muf').prop('disabled', true);
    $('#check-all-titipa-to-titipb').prop('disabled', true);
}

function chekcedall(){
    $('#check-all-angsuran').prop('checked', true);
    $('#check-all-angsuran-titip').prop('checked', true);
    $('#check-all-titipdenda').prop('checked', true);
    $('#check-all-dendatitip').prop('checked', true);
    $('#check-all-titipttanpa-nama').prop('checked', true);
    $('#check-all-titip-to-pendapatan').prop('checked', true);
    $('#check-all-ttanpa-nama-titipan').prop('checked', true);
    $('#check-all-ttn-muf').prop('checked', true);
    $('#check-all-titipa-to-titipb').prop('checked', true);
}


function disbfieldovb(){
    $('#inp-no-rv-titipan-tanpa-nama-ketitipan').prop('disabled', true); 
    $('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').prop('disabled', true);
    $('#inp-no-kontrak-titipan-a').prop('disabled', true);
    $('#inp-no-kontrak-titipan-b').prop('disabled', true);
    $('#inp-no-kontrak-titipan-denda').prop('disabled', true);
    $('#inp-no-kontrak-titip-titipan-tanpa-nama').prop('disabled', true);
}

function disbadhbtnrst() {
    $('#reset-data-titipan-ar').prop('disabled', true);
    $('#reset-data-ar-titipan').prop('disabled', true);
    $('#reset-data-titipan-denda').prop('disabled', true);
    $('#reset-data-denda-titipan').prop('disabled', true);
    $('#reset-data-titipan-ttanpanama').prop('disabled', true);
    $('#reset-data-titipan-pendapatan').prop('disabled', true);
    $('#reset-data-ttn-ketitipan').prop('disabled', true);
    $('#reset-data-ttn-muf').prop('disabled', true);
    $('#reset-data-titipana-titipanb').prop('disabled', true);
}

function enbdbtnsave(){
    $('#btn-save-titipan-ar').prop('disabled', false);
    $('#btn-save-ar-titipan').prop('disabled', false);
    $('#btn-save-titipan-denda').prop('disabled', false);
    $('#btn-save-denda-titipan').prop('disabled', false);
    $('#btn-save-titip-titipan-tanpa-nama').prop('disabled', false);
    $('#btn-save-titipan-pendapatan').prop('disabled', false);
    $('#btn-save-titipan-tanpa-nama-ke-titipan').prop('disabled', false);
    $('#btn-save-ttn-muf').prop('disabled', false);
    $('#btn-save-titipan-a-ke-b').prop('disabled', false);
}

function endbtncnl(){
    $('#btn-cancel-titipan-ar').prop('disabled', false);
    $('#btn-cancel-ar-titipan').prop('disabled', false);
    $('#btn-cancel-titipan-denda').prop('disabled', false);
    $('#btn-cancel-denda-titipan').prop('disabled', false);
    $('#btn-cancel-titip-titipan-tanpa-nama').prop('disabled', false);
    $('#btn-cancel-titipan-pendapatan').prop('disabled', false);
    $('#btn-cancel-titipan-tanpa-nama-ke-titipan').prop('disabled', false);
    $('#btn-cancel-ttn-muf').prop('disabled', false);
    $('#btn-cancel-titipan-a-ke-b').prop('disabled', false);
}

function endbtncfm(){
    $('#btn-confirm-titipan-ar').prop('disabled', false);
    $('#btn-confirm-ar-titipan').prop('disabled', false);
    $('#btn-confirm-titipan-denda').prop('disabled', false);
    $('#btn-confirm-denda-titipan').prop('disabled', false);
    $('#btn-confirm-titip-titipan-tanpa-nama').prop('disabled', false);
    $('#btn-confirm-titipan-pendapatan').prop('disabled', false);
    $('#btn-confirm-titipan-tanpa-nama-ke-titipan').prop('disabled', false);
    $('#btn-confirm-ttn-muf').prop('disabled', false);
    $('#btn-confirm-titipan-a-ke-b').prop('disabled', false);
}


function disbadhbtncfm(){
    $('#btn-confirm-titipan-ar').prop('disabled', true); 
    $('#btn-confirm-ar-titipan').prop('disabled', true); 
    $('#btn-confirm-titipan-denda').prop('disabled', true); 
    $('#btn-confirm-denda-titipan').prop('disabled', true); 
    $('#btn-confirm-titip-titipan-tanpa-nama').prop('disabled', true); 
    $('#btn-confirm-titipan-pendapatan').prop('disabled', true); 
    $('#btn-confirm-titipan-tanpa-nama-ke-titipan').prop('disabled', true); 
    $('#btn-confirm-ttn-muf').prop('disabled', true); 
    $('#btn-confirm-titipan-a-ke-b').prop('disabled', true); 
}

function disbadhbtncnl(){
    $('#btn-cancel-titipan-ar').prop('disabled', true);
    $('#btn-cancel-ar-titipan').prop('disabled', true);
    $('#btn-cancel-titipan-denda').prop('disabled', true);
    $('#btn-cancel-denda-titipan').prop('disabled', true);
    $('#btn-cancel-titip-titipan-tanpa-nama').prop('disabled', true);
    $('#btn-cancel-titipan-pendapatan').prop('disabled', true);
    $('#btn-cancel-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
    $('#btn-cancel-ttn-muf').prop('disabled', true);
    $('#btn-cancel-titipan-a-ke-b').prop('disabled', true);
}


