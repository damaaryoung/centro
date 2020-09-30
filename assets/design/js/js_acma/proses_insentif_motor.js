//if (localStorage.getItem("menu_alias_am") === "PIM") {

$(document).ready(function(){

    setInterval(function() {
         if(check_session() == "false"){
            console.log(check_session());
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
        }
       }, 300 * 1000);

});

var selected_penerima;
var count = 0;
var tbl_main_pim = $('#tbl-main-pim').DataTable({
    "paging": false,
    "scrollY": "360px",
    "scrollCollapse": true,

    "columnDefs": [
            {
                "targets": [ 9 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 10 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 11 ],
                "visible": false,
                "searchable": false
            }
        ],

    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    
                    var proposal = formatToNumber(aData[6]);
                    var pengajuan = formatToNumber(aData[7]);
                    var sisatac = formatToNumber(aData[8]);
                    var flag = Number(aData[11]);
                    if ( proposal != pengajuan )
                    {
                        $('td', nRow).css('background-color', 'Magenta');
                    }
                    if ( flag == 1 )
                    {
                        $('td', nRow).css('background-color', '#ED4337');
                    }
                }

});

$('#btn-close-alert').hide();
var tbl_detail_dealer_pim = $('#tbl-detail-dealer-pim').DataTable({
    "paging": false,
    "scrollY": "360px",
    "scrollCollapse": true,
    "columnDefs": [
            {
                "targets": [ 6 ],
                "visible": false,
                "searchable": false
            }
        ],
    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {

                
                                
                    var proposal = formatToNumber(aData[3]);
                    var pengajuan = formatToNumber(aData[4]);
                    var sisatac = formatToNumber(aData[5]);
                    if ( proposal != pengajuan )
                    {
                        $('td', nRow).css('background-color', 'Magenta');
                    }
                    if ( pengajuan > sisatac )
                    {
                        $('td', nRow).css('background-color', '#ED4337');
                    }
                    
                }

});

var tbl_penerima_pim = $('#tbl-penerima-pim').DataTable({
    "paging": false,
    "scrollY": "360px",
    "scrollCollapse": true,
    "columnDefs": [
            {
                "targets": [ 9 ],
                "visible": false,
                "searchable": false
            }
        ]
});
tbl_penerima_pim.draw();
var tbl_nopengajuan_pim = $('#tbl-nopengajuan-pim').DataTable();

var tbl_npk_pim = $('#tbl-npk-pim').DataTable({
        "columnDefs": [
            {
                "targets": [ 6 ],
                "visible": false,
                "searchable": false
            }
        ]

});
tbl_npk_pim.draw();
//var selected_row_dtl_dealer_pim;


function formatToNumber(a){
    a = a.replace(/[^\d.-]/g, '') * 1;
    return a;
}

function autoFormat(id) {
            
            
            // When user select text in the document, also abort.
            var selection = window.getSelection().toString();
            if ( selection !== '' ) {
                return;
            }
            
            // When the arrow keys are pressed, abort.
            if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
                return;
            }
            
            
            var $this = $('#'+id);
            // Get the value.
            var input = $this.val();
            var input = input.replace(/[\D\s\._\-]+/g, "");
                    input = input ? parseInt( input, 10 ) : 0;

                    $this.val( function() {
                        return ( input === 0 ) ? "" : input.toLocaleString( "en-US" );
                    } );
        }

jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
    return this.flatten().reduce( function ( a, b ) {
        if ( typeof a === 'string' ) {
            a = a.replace('Rp.', '');
            a = a.replace(/[^\d.-]/g, '') * 1;
            console.log(a);
        }
        if ( typeof b === 'string' ) {
            b = b.replace('Rp.', '');
            b = b.replace(/[^\d.-]/g, '') * 1;
        }
        // console.log(a);
        // console.log(b);
        return a + b;
    }, 0 );
} );

$('#slc-channel-pim').change(function() {
   var pilihan = $('#slc-channel-pim').val();
   var slc_id = $('#slc-portofolio-pim');
   
   $('#inp-nopengajuan-pim').val("");
   slc_id.html('');
   if(pilihan == "01"){
    $(slc_id).append('<option value="00">SEMUA</option>');
    $(slc_id).append('<option value="01">MOTOR BARU (NMC)</option>');
    $(slc_id).append('<option value="02">MOTOR BEKAS (UMC)</option>');
   } else {
    $(slc_id).append('<option value="03">MOTOR MULTIGUNA (MGM)</option>');
   }
});

$('#slc-portofolio-pim').change(function() {
   $('#inp-nopengajuan-pim').val("");
});

$('#inp-periode-pim').change(function() {
   $('#inp-nopengajuan-pim').val("");
});

    var sumtacmain = 0;
    var sumpengmain = 0;
    var sumpropmain = 0;
    var sumunitmain = 0;

$("#inp-checkAll-pim").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);

    if(this.checked){
    sumtacmain = accounting.unformat(tbl_main_pim.column( 8 ).data().sum());
    sumpengmain = accounting.unformat(tbl_main_pim.column( 7 ).data().sum());
    sumpropmain = accounting.unformat(tbl_main_pim.column( 6 ).data().sum());
    sumunitmain = tbl_main_pim.column( 5 ).data().sum();

    
    } else {
    sumtacmain = 0;
    sumpengmain = 0;
    sumpropmain = 0;
    sumunitmain = 0;  
    }

    $('#tbl-main-pim, #inp-sumunitmain-pim').val(accounting.formatNumber(sumunitmain));
    $('#tbl-main-pim, #inp-sumpropmain-pim').val(accounting.formatNumber(sumpropmain));
    $('#tbl-main-pim, #inp-sumpengmain-pim').val(accounting.formatNumber(sumpengmain));
    $('#tbl-main-pim, #inp-sumtacmain-pim').val(accounting.formatNumber(sumtacmain));
});

    
$('#tbl-main-pim').on( 'click', '.ckbox2', function () {
    if($('input:checkbox:checked', tbl_main_pim[0]).not("#inp-checkAll-pim").length == tbl_main_pim.data().length ){
        $("#inp-checkAll-pim").prop("checked",true);
    } else {
        $("#inp-checkAll-pim").prop("checked",false);
    }
    var dataz = tbl_main_pim.row($(this).closest('tr')).data();
    if(this.checked){
        sumtacmain  += accounting.unformat(dataz[8]);;
        sumpengmain += accounting.unformat(dataz[7]);
        sumpropmain += accounting.unformat(dataz[6]);
        sumunitmain += accounting.unformat(dataz[5]);
    } else {
        sumtacmain  -= accounting.unformat(dataz[8]);;
        sumpengmain -= accounting.unformat(dataz[7]);
        sumpropmain -= accounting.unformat(dataz[6]);
        sumunitmain -= accounting.unformat(dataz[5]);
    }


    $('#tbl-main-pim, #inp-sumunitmain-pim').val(accounting.formatNumber(sumunitmain));
    $('#tbl-main-pim, #inp-sumpropmain-pim').val(accounting.formatNumber(sumpropmain));
    $('#tbl-main-pim, #inp-sumpengmain-pim').val(accounting.formatNumber(sumpengmain));
    $('#tbl-main-pim, #inp-sumtacmain-pim').val(accounting.formatNumber(sumtacmain));

});

$('#btn-lihat-data-pim').click(function() {
     //var format_tgl_1 = $('#inp-tgl-awal').val();
    var channel = $('#slc-channel-pim').val();
    var porto = $('#slc-portofolio-pim').val();
    var periode = $('#inp-periode-pim').val();
    var no_pengajuan = $('#inp-nopengajuan-pim').val();
    var isDisable = "";
    sumtacmain = 0;
    sumpengmain = 0;
    sumpropmain = 0;
    sumunitmain = 0;
    $('#tbl-main-pim, #inp-sumunitmain-pim').val(sumunitmain);
    $('#tbl-main-pim, #inp-sumpropmain-pim').val(sumpropmain);
    $('#tbl-main-pim, #inp-sumpengmain-pim').val(sumpengmain);
    $('#tbl-main-pim, #inp-sumtacmain-pim').val(sumtacmain);
    $("#inp-checkAll-pim").prop("checked",false);
    if(no_pengajuan.trim() != ""){
        isDisable = "disabled";
    }
    localStorage.setItem("channel",channel);
    localStorage.setItem("portofolio",porto);
    localStorage.setItem("no_pengajuan",no_pengajuan);


    $.ajax({
    url: "Controller_proses_insentif_motor/post_summary_pim",
    type: 'POST',
    dataType:'json',
    data:{
        "channel": channel,
        "portofolio": porto,
        "periode": periode,
        "no_pengajuan": no_pengajuan
    },

    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                tbl_main_pim.clear().draw();
                $.each(res['Data'], function(index) {
                         
                        tbl_main_pim.row.add([
                            '<input type="checkbox" class="ckbox2" '+isDisable+'>',
                            (index+1),
                            this['namadealer'],
                            '<button type="button" class="btn btncls-dtl-pim btn-info btn-search" id="btn-detail-dealer-pimdummy"><span class="glyphicon glyphicon-list-alt"></span></button>',
                            this['noProposal'],
                            this['unit'],
                            accounting.formatNumber(this['amt_proposal']),
                            accounting.formatNumber(this['amt_pengajuan']),
                            accounting.formatNumber(this['max_tac']),
                            this['unit_id'],
                            this['dealer'],
                            this['flag']
                            ]).draw(false);
            });
            var sumtac = accounting.formatNumber(tbl_main_pim.column( 8 ).data().sum());
            var sumpeng = accounting.formatNumber(tbl_main_pim.column( 7 ).data().sum());
            var sumprop = accounting.formatNumber(tbl_main_pim.column( 6 ).data().sum());
            var sumunit = tbl_main_pim.column( 5 ).data().sum();

            if(isDisable == "disabled"){
            $('#tbl-main-pim, #inp-sumunitmain-pim').val(sumunit);
            $('#tbl-main-pim, #inp-sumpropmain-pim').val(sumprop);
            $('#tbl-main-pim, #inp-sumpengmain-pim').val(sumpeng);
            $('#tbl-main-pim, #inp-sumtacmain-pim').val(sumtac);
            }
            //$('#tbl-main-pim').find('tfoot').html('');
            //$('#tbl-main-pim').find('tfoot').append('<tr><td></td><td></td><td></td><td></td><td><b>Grand Total:</b></td><td>'+sumunit+'</td><td>'+sumprop+'</td><td>'+sumpeng+'</td><td>'+sumtac+'</td><td></td></tr>');
        }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Data tidak ditemukan !<br/> error => "+e);
                    tbl_main_pim.clear().draw();
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });

    
    if(no_pengajuan.trim() != ""){
        $('#btn-batal-pengajuan-pim').prop('disabled', false);
        $('#btn-buat-pengajuan-pim').prop('disabled', true);
        $('#btn-simpan-dtl-pim').prop('disabled', true); 
        $("#inp-checkAll-pim").prop('disabled', true);
          
    } else {
       $('#btn-batal-pengajuan-pim').prop('disabled', true);
        $('#btn-buat-pengajuan-pim').prop('disabled', false);
        $('#btn-simpan-dtl-pim').prop('disabled', false);
        $("#inp-checkAll-pim").prop('disabled', false);
    }
    
	//alert(tes);
});

// ------------------------------ DATEPICKER ------------------------------ //
//$(".bootstrap-datetimepicker-widget [title='Select Decade']").removeAttr("data-action");
$("#inp-periode-pim").datetimepicker({
   // minViewMode: 'months',
   format: "YYYYMM",
   ignoreReadonly: true,
    viewMode: 'months',
    defaultDate:new Date(),
    maxDate: new Date(),
    minDate: new Date(new Date().getFullYear() - 2,0,0)
    //pickTime: false
}).on('dp.show dp.update', function () {
$(".datepicker-years .picker-switch").removeAttr('title')
    .css('cursor', 'default')  
    .css('background', 'inherit') 
    .on('click', function (e) {
        e.stopPropagation();
    });
});


// ------------------------------ TOMBOL DETAIL PADA TABEL ------------------------------ //
$('#tbl-main-pim').on( 'click', '.btncls-dtl-pim', function () {
     selected_data = tbl_main_pim.row($(this).closest('tr')).data();
     localStorage.setItem("unit_id",selected_data[9]);
     $("#inp-hdealcode-pim").val(selected_data[10]);
     localStorage.setItem("dealcode",selected_data[10]);
     tbl_penerima_pim.clear().draw();

     isi_table_detail();


    $('#detail-dealer-pim').show();
    $('#main-pim').hide();
    tbl_penerima_pim.draw();

});

 function isi_table_detail(){
    var nopeng = localStorage.getItem("no_pengajuan");

     if (nopeng.trim() == ""){
        nopeng = null;
     }

    $.ajax({
    url: "Controller_proses_insentif_motor/post_detail_pim",
    type: 'POST',
    dataType:'json',
    data:{
        "unit_id": localStorage.getItem("unit_id"),
        "channel" : localStorage.getItem("channel"),
        "portofolio" : localStorage.getItem("portofolio"),
        "no_pengajuan" : nopeng
    },

    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                tbl_detail_dealer_pim.clear().draw();
                $.each(res['Data'], function(index) {
                         
                        tbl_detail_dealer_pim.row.add([
                            (index+1),
                            this['no_kontrak'],
                            this['nama_cust'],
                            accounting.formatNumber(this['amt_proposal']),
                            accounting.formatNumber(this['amt_pengajuan']),
                            accounting.formatNumber(this['max_tac']),
                            this['hdr_id']
                            ]).draw(false);
            });
            var sumtac = accounting.formatNumber(tbl_detail_dealer_pim.column( 5 ).data().sum());
            var sumpeng = accounting.formatNumber(tbl_detail_dealer_pim.column( 4 ).data().sum());
            var sumprop = accounting.formatNumber(tbl_detail_dealer_pim.column( 3 ).data().sum());
            //$('#tbl-detail-dealer-pim').find('tfoot').html('');
            //$('#tbl-detail-dealer-pim').find('tfoot').append('<tr><td></td><td></td><td><b>Grand Total:</b></td><td>'+sumprop+'</td><td>'+sumpeng+'</td><td>'+sumtac+'</td></tr>');
            $('#tbl-detail-dealer-pim, #inp-sumpropdet-pim').val(sumprop);
            $('#tbl-detail-dealer-pim, #inp-sumpengdet-pim').val(sumpeng);
            $('#tbl-detail-dealer-pim, #inp-sumtacdet-pim').val(sumtac);
        }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
 
 }
// ------------------------------ PANGGIL MODAL ------------------------------ //
$('#btn-callmodal-nopengajuan-pim').on("click", function () {
    $('#modal-nopengajuan-pim').modal('show');
    var periode = $('#inp-periode-pim').val();
    $.ajax({
    url: "Controller_proses_insentif_motor/post_lov_nopengajuan_pim",
    type: 'POST',
    dataType:'json',
    data:{
        "periode": periode
    },

    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                tbl_nopengajuan_pim.clear().draw();
                $.each(res['Data'], function(index) {
                         
                        tbl_nopengajuan_pim.row.add([
                            this['nopengajuan'],
                            this['tanggal']
                            ]).draw(false);
            });
            
            }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });


    $('#btn-pilih-nopengajuan-pim').click( function () {
        var data =tbl_nopengajuan_pim.row('.selected').data();
        $('#inp-nopengajuan-pim').val(data[0]);
        if(data[0] != null || data[0] != "")
        $('#btn-close-nopengajuan-pim').click();
        $('#btn-lihat-data-pim').click();
    } );
});


$('#btn-bersihkan-pim').click(function() {
    location.reload();
});

$('#btn-buat-pengajuan-pim').click(function() {
    var listData =[];
    var cek = true;
    if($('input:checkbox:checked', tbl_main_pim[0]).not("#inp-checkAll-pim").length > 0 ){
    $('input:checkbox:checked', tbl_main_pim[0]).not("#inp-checkAll-pim").each(function() {
            var tes = tbl_main_pim.row($(this).closest('tr') ).data();
            if(Number(tes[11]) == 1){
             alert_error("ada kontrak yang sisa tac lebih kecil dari nilai pengajuan");
             listData =[];
             cek=false;
             return false;
            } else{
                listData.push(Number(tes[9]));
            }
        })
    if(cek){
    $.ajax({
    url: "Controller_proses_insentif_motor/post_create_pengajuan",
    type: 'POST',
    dataType:'json',
    data:{
        "unit_id": listData,
        "channel" : localStorage.getItem('channel'),
        "portofolio" : localStorage.getItem('portofolio')
    },

    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                if(res['Data'].includes("Gagal")){
                    alert_error(res['Data']);
                } else {
                alert_info("Pengajuan berhasil dibuat dengan nomor "+res['Data'], function(){
                    $('#inp-nopengajuan-pim').val(res['Data']);
                    $('#btn-lihat-data-pim').click();

                });
                }
                //tbl_main_pim.clear().draw();
                
            }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });

    alert_info("OK");
    console.log(listData);
        }
    }
    else {

        alert_error("tidak ada yang dipilih");
    }
});

$('#btn-batal-pengajuan-pim').click(function() {

    //$('#modal-batal-pim').modal('show');
    alert_confirm('Anda yakin membatalkan pengajuan dengan no '+localStorage.getItem("no_pengajuan")+' ?',function(){
        var nopeng = localStorage.getItem("no_pengajuan");
    $.ajax({
    url: "Controller_proses_insentif_motor/post_cancel_pengajuan",
    type: 'POST',
    dataType:'json',
    data:{
        "no_pengajuan": nopeng
    },
    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                if(res['Data'] == true){
                    alert_info("Berhasil Membatalkan Pengajuan "+nopeng, function(){
                        tbl_main_pim.clear().draw();
                    $('#btn-bersihkan-pim').click();

                    });
                    
                } else {
                    alert_error("Gagal");
                }      
            }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
    });

    

});


// ------------------------------ HALAMAN DETAIL DEALER ------------------------------ //

$('#btn-kembali-dtl-pim').click(function() {
    $('#detail-dealer-pim').hide();
    $('#btn-lihat-data-pim').click();
    $('#main-pim').show();
});

$('#btn-simpan-dtl-pim').on("click", function () {
    var flag=true;
    tbl_penerima_pim.data().each( function ( value, index ) {

        var dtl_id = $('#inp-dtlid-pim'+index).val();
        var job = $('#inp-job-pim'+index).val();
        var nik = $('#inp-nik-pim'+index).val();
        var npwp = $('#inp-npwp-pim'+index).val();
        var bank_code = $('#inp-bankcode-pim'+index).val();
        var norek = $('#inp-norek-pim'+index).val();
        var amt_proposal = formatToNumber($('#inp-proposal-pim'+index).val());
        var amt_pengajuan = formatToNumber($('#inp-pengajuan-pim'+index).val());

        if(norek == null || norek =="" || bank_code == null || bank_code == "-"){
            alert_error("kode bank dan rekening tidak boleh kosong");
            flag=false;
            return false;
        }

    });

    if(flag){
    tbl_penerima_pim.data().each( function ( value, index ) {
        
        var dtl_id = $('#inp-dtlid-pim'+index).val();
        var job = $('#inp-job-pim'+index).val();
        var nik = $('#inp-nik-pim'+index).val();
        var npwp = $('#inp-npwp-pim'+index).val();
        var bank_code = $('#inp-bankcode-pim'+index).val();
        var norek = $('#inp-norek-pim'+index).val();
        var amt_proposal = formatToNumber($('#inp-proposal-pim'+index).val());
        var amt_pengajuan = formatToNumber($('#inp-pengajuan-pim'+index).val());


    $.ajax({
    url: "Controller_proses_insentif_motor/post_update_penerima",
    type: 'POST',
    dataType:'json',
    data:{
        "dtl_id": dtl_id,
        "job": job,
        "nik": nik,
        "npwp": npwp,
        "bank_code": bank_code,
        "norek": norek,
        "amt_proposal": amt_proposal,
        "amt_pengajuan": amt_pengajuan
    },

    success: function(response) {
        
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                console.log("OK");
                count= count + 1;
                console.log(count);
                if(res['Data'] ){
                alert_info("Data Berhasil Disimpan");
                isi_table_detail();
                } else {
                    alert_info("Terjadi Kesalahan");
                }
            }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
    
    } );
    }
});

$('#tbl-detail-dealer-pim tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
           // $(this).removeClass('selected');
        }
        else {
            tbl_detail_dealer_pim.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var data =tbl_detail_dealer_pim.row('.selected').data();
            isi_table_penerima_pim(data);
        }
    } );

$('#tbl-penerima-pim').on( 'click', '.btncls-penerima-pim', function () {
     selected_data = tbl_penerima_pim.row($(this).closest('tr')).data();
     var dealercode = $("#inp-hdealcode-pim").val();
     var job =$("#inp-job-pim"+selected_data[9]).val();
     selected_penerima = selected_data[9];


    $.ajax({
    url: "Controller_proses_insentif_motor/post_lov_npk_pim",
    type: 'POST',
    dataType:'json',
    data:{
        "job": job,
        "nik": dealercode
    },

    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                tbl_npk_pim.clear().draw();
                $.each(res['data'], function(index) {
                         
                        tbl_npk_pim.row.add([
                            this['job'],
                            this['nik'],
                            this['nama'],
                            this['npwp'],
                            this['bank'],
                            this['norek'],
                            this['bank_code']
                            ]).draw(false);
            });
                $('#modal-npk-pim').modal('show');
            }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });

});

function isi_table_penerima_pim(data){
    //alert(data[1]);

    // panggil ajax disini nanti

    tbl_penerima_pim.clear().draw();

    $.ajax({
    url: "Controller_proses_insentif_motor/post_penerima_pim",
    type: 'POST',
    dataType:'json',
    data:{
        "hdr_id": data[6]
    },

    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            var sumpeng = 0;
            var sumprop = 0;
            var size = res['Data'].length;
            var nopeng = localStorage.getItem("no_pengajuan");
            var isDisable = "";

            if(nopeng.trim() != ""){
                isDisable = "disabled";
            }
            try {
                tbl_penerima_pim.clear().draw();
                $.each(res['Data'], function(index) {
                        var amt_proposal2 = this['amt_proposal'];
                        var amt_proposal = accounting.formatNumber(this['amt_proposal']);
                        var amt_pengajuan = accounting.formatNumber(this['amt_pengajuan']);

                        var nama = this['nama'];
                        var npwp = this['npwp'];
                        var norek = this['norek'];
                        var bank = this['bank'];

                        if(nama == "null" ||  nama == null){
                            nama ="";
                        }
                        if(npwp == "null" ||  npwp == null){
                            npwp ="";
                        }
                        if(norek == "null" ||  norek == null){
                            norek ="";
                        }
                        if(bank == "null" ||  bank == null){
                            bank ="";
                        }


                        tbl_penerima_pim.row.add([
                            '<input type="text" class="form-control" id="inp-job-pim'+index+'" style="width:100%" value="'+this['job']+'"disabled>',
                            '<input type="text" class="form-control" id="inp-nik-pim'+index+'" style="width:100%" value="'+this['nik']+'"disabled>'+'<input type="hidden" class="form-control" id="inp-dtlid-pim'+index+'" style="width:100%" value="'+this['dtl_id']+'"disabled>',
                            '<button type="button" class="btn btncls-penerima-pim btn-info btn-search" id="btn-penerima-pim'+index+'" '+isDisable+'><span class="glyphicon glyphicon-search"></span></button>',
                            '<input type="text" class="form-control" id="inp-nama-pim'+index+'" style="width:100%" value="'+nama+'"disabled>',
                            '<input type="text" class="form-control" id="inp-npwp-pim'+index+'" style="width:100%" value="'+npwp+'"disabled>',
                            '<input type="text" class="form-control" id="inp-bank-pim'+index+'" style="width:100%" value="'+bank+'"disabled>'+'<input type="hidden" class="form-control" id="inp-bankcode-pim'+index+'" style="width:100%" value="'+this['bank_code']+'"disabled>',
                            '<input type="text" class="form-control" id="inp-norek-pim'+index+'" style="width:100%" value="'+norek+'"disabled>',
                            '<input type="text" class="form-control" id="inp-proposal-pim'+index+'" style="width:100%" value="'+amt_proposal+'"disabled>',
                            '<input type="text" class="form-control " id="inp-pengajuan-pim'+index+'" value="'+amt_pengajuan+'"onblur="validasiMaxPengajuan_pim('+amt_proposal2+','+index+'),hitungulang_pim('+size+')" onkeyup="autoFormat(\'inp-pengajuan-pim'+index+'\')" style="width:100%" '+isDisable+'>',
                            index
                            ]).draw(false);
                        sumpeng +=formatToNumber(amt_pengajuan);
                        sumprop +=formatToNumber(amt_proposal);
            });
                //var sumpeng = tbl_penerima_pim.column( 7 ).data().sum();
                //var sumprop = tbl_penerima_pim.column( 7 ).data().sum();
                sumpeng = accounting.formatNumber(sumpeng);
                sumprop = accounting.formatNumber(sumprop);
                //$('#tbl-penerima-pim').find('tfoot').html('');
                //$('#tbl-penerima-pim').find('tfoot').append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td><b>Grand Total:</b></td><td>'+sumprop+'</td><td>'+sumpeng+'</td><td></td></tr>');
                $('#tbl-penerima-pim, #inp-sumproppen-pim').val(sumprop);
                $('#tbl-penerima-pim, #inp-sumpengpen-pim').val(sumpeng);
            }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
}

function hitungulang_pim(size){
    var sumpeng = 0;
    var sumprop = 0;
    for(i = 0;i<size;i++){
            sumpeng+=formatToNumber($('#inp-pengajuan-pim'+i).val());
            sumprop+=formatToNumber($('#inp-proposal-pim'+i).val());
    }
    sumpeng = accounting.formatNumber(sumpeng);
    sumprop = accounting.formatNumber(sumprop);
    $('#tbl-penerima-pim, #inp-sumproppen-pim').val(sumprop);
    $('#tbl-penerima-pim, #inp-sumpengpen-pim').val(sumpeng);
                //$('#tbl-penerima-pim').find('tfoot').html('');
                //$('#tbl-penerima-pim').find('tfoot').append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td><b>Grand Total:</b></td><td>'+sumprop+'</td><td>'+sumpeng+'</td><td></td></tr>');

}

function validasiMaxPengajuan_pim(max,index){
    var nilai = formatToNumber($('#inp-pengajuan-pim'+index).val());
    if(nilai > max){
        alert_error("Pengajuan tidak boleh lebih besar dari proposal");
        $('#inp-pengajuan-pim'+index).val(accounting.formatNumber(max));
    }
    if(nilai < 0){
        alert_error("Pengajuan tidak boleh negatif");
        $('#inp-pengajuan-pim'+index).val(0);
    }

}


// ------------------------------ HALAMAN MODAL ------------------------------ //

$('#tbl-nopengajuan-pim tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            //$(this).removeClass('selected');
            $('#btn-pilih-nopengajuan-pim').click();
        }
        else {
            tbl_nopengajuan_pim.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

        }


    } );


$('#tbl-npk-pim tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            //$(this).removeClass('selected');
        }
        else {
            tbl_npk_pim.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

        }
    } );


$('#btn-pilih-npk-pim').click(function() {
    var data =tbl_npk_pim.row('.selected').data();

    if(data[0] !=null){
    $('#inp-job-pim'+selected_penerima).val(data[0]);
    $('#inp-nik-pim'+selected_penerima).val(data[1]);
    $('#inp-nama-pim'+selected_penerima).val(data[2]);
    $('#inp-npwp-pim'+selected_penerima).val(data[3]);
    $('#inp-bank-pim'+selected_penerima).val(data[4]);
    $('#inp-norek-pim'+selected_penerima).val(data[5]);
    $('#inp-bankcode-pim'+selected_penerima).val(data[6]);
    $('#btn-close-npk-pim').click();
}

});

$('#btn-konfrim-batal-pim').click(function() {
    var nopeng = localStorage.getItem("no_pengajuan");
    $('#btn-close-batal-pim').click();
    $.ajax({
    url: "Controller_proses_insentif_motor/post_cancel_pengajuan",
    type: 'POST',
    dataType:'json',
    data:{
        "no_pengajuan": nopeng
    },
    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                tbl_main_pim.clear().draw();
                if(res['Data'] == true){
                    alert_info("Berhasil");
                } else {
                    alert_error("Gagal");
                }      
            }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });

});


// $('#btn-pilih-nopengajuan-pim').click( function () {
//         var data =tbl_nopengajuan_pim.row('.selected').data();
//         $('#inp-nopengajuan-pim').val(data[0]);
//         if(data[0] != null || data[0] != "")
//         $('#btn-close-nopengajuan-pim').click();
//     } );


// $('#inp-nopengajuan-pim2').blur(function() {
//     var eee = $('#inp-nopengajuan-pim2').val();
//     eee = Number(eee)+1;
//     $('#inp-nopengajuan-pim3').val(eee);
// });


//} // tutup menu alias
