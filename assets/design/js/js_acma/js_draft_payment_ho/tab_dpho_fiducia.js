var table_fiducia_dpho = $('#tbl-fiducia-pv-ho').DataTable({
    //"responsive" : true,
    //"bFilter" : true,
    //"bPaginate" : true,
    "bInfo" : false,
    "paging" : false
    //"scrollY": "360px",
    //"scrollCollapse": true
});

var table_list_pv_fdc = $('#tbl-list-nopv').DataTable();

$("#inp-date-start-pv-fdc").val(today);
$('#inp-date-end-pv-fdc').val(today);

$('#div-date-start-pv-fdc').datetimepicker({
    format : 'DD-MMM-YYYY',
    maxDate : 'now',
    allowInputToggle : true

}).on("dp.change", function(e){
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);

    $('#div-date-end-pv-fdc').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }

    $('#div-date-end-pv-fdc').data("DateTimePicker").maxDate(new_date);
    $('#div-date-end-pv-fdc').data("DateTimePicker").date(new_date);
});

$('#div-date-end-pv-fdc').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
});

if ($('#tab-dpho-fiducia').length) {
    get_area_dphonsb('#slc-area-pv-fdc');
    get_bank_dp_fdc();
    get_class_codes('#slc-cc-fdc', 'DPH1');
    $('#slc-list-tab-dpho').val('01');
}

function get_bank_dp_fdc() {
    $.ajax({
        url : base_url+"Controller_draft_payment_ho_fiducia/get_bank_fdc",
        dataType : 'JSON',
        type : 'POST',
        data: {
            "bank_stat": "7",
            "bank_br_id": "0000"
        },
        cache : false,
        success : function(response){
            console.log(response);
            if (response) {
                try{
                    $('#slc-bank-pv-fdc').empty();

                    var status = response['status'];
                    if (status == true){
                        $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-bank-pv-fdc').addClass('form-control');
                        $('#slc-bank-pv-fdc').append('<option value="ALL">ALL - ALL</option>');
                        $.each(response['data'], function(i){
                        var bank_code = response['data'][i]['bankCode'];
                        var bank_name = response['data'][i]['bankName'];
                        $('#slc-bank-pv-fdc').append('<option value="'+bank_code+'">'+bank_code+ ' - ' +bank_name+ '</option>');
                        })
                    }
                    else{
                        var notif = response['notif'];
                        alert_error(notif);
                    }
                    
                }
                catch(e){
                    $('#loading-ajax').hide();
                    alert_error(e);
                }
            }
            else{
                alert_error("Cek Jaringan");
            }
        },
        error : function(response){
            console.log(response);
            /*if (response['responseText'] === "") {
                alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                    localStorage.clear();
                    window.location.href = base_url + "Controller_login/login_view";
                });
            }*/
        }
    });
}

$('#slc-area-pv-fdc').change(function(){
    var area = $('#slc-area-pv-fdc').val();
    console.log(area);
});

$('#btn-list-pv-fdc').click(function(){
     var cc_fdc = $('#slc-cc-fdc').val();
    if ((cc_fdc == null) || (cc_fdc == '')){
        alert_error('Silakan pilih class code terlebih dahulu!');
    }
    else{
        var area = $('#slc-area-pv-fdc').val();
        if ((area == null) || (area == '')){
            alert_error('Silakan pilih area terlebih dahulu!');
        }
        else{
            var bank = $('#slc-bank-pv-fdc').val();
            if ((bank == null) || (bank == '')){
            alert_error('Silakan pilih bank terlebih dahulu!');
            }
            else{
                var start_date = $('#inp-date-start-pv-fdc').val();
                var end_date = $('#inp-date-end-pv-fdc').val();
                $.ajax({
                url: "Controller_draft_payment_ho_fiducia/get_list_pv_fdc",
                dataType : 'JSON',
                type: 'POST',
                data: {
                    bank: bank,
                    start_date: start_date,
                    end_date: end_date,
                    area: area
                },
                cache: false,

                success: function(response){
                    console.log(response);
                    if (response) {
                        try {
                            var status = response['status'];
                            if(status == true){
                                var data = response['data'];
                                if(data.length == 0){
                                    alert_error('Tidak ada data');
                                }
                                else{
                                    $('#modal-nopv').modal({
                                        show : true,
                                        backdrop : 'static'
                                    });
                                    table_list_pv_fdc.clear().draw();
                                    $.each(data, function(index){
                                        var pv_no = data[index];

                                        table_list_pv_fdc.row.add([
                                            pv_no
                                            ]).draw(false);
                                    });
                                }
                            }
                            else{
                                alert_error(response['alert']);
                            }
                        } catch (e) {
                            console.log(e);
                            $('#loading-ajax').hide();
                            alert_error("Terjadi Kesalahan" + e);
                        }
                    }
                },
                error: function(response){
                    console.log(response);
                }
            });
            }
        }
    }
});


$('#btn-search-pv-fdc').click(function(){
    var cc_fdc = $('#slc-cc-fdc').val();
    if ((cc_fdc == null) || (cc_fdc == '')){
        alert_error('Silakan pilih class code terlebih dahulu!');
    }
    else{
        var area_fdc = $('#slc-area-pv-fdc').val();
        if ((area_fdc == null) || (area_fdc == '')){
            alert_error('Silakan pilih area terlebih dahulu!');
        }
        else{
            var bank_fdc = $('#slc-bank-pv-fdc').val();
            if ((bank_fdc == null) || (bank_fdc == '')){
            alert_error('Silakan pilih bank terlebih dahulu!');
            }
            else{
                var no_pv = $('#inp-pvno-fdc').val();
                if ((no_pv == null) || (no_pv == '')){
                alert_error('Silakan pilih No. PV terlebih dahulu!');
                }
                else{
                    $.ajax({
                        url: "Controller_draft_payment_ho_fiducia/get_detail_pv_fdc",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            pv_no: no_pv
                        },
                        cache: false,

                        success: function(response){
                            console.log(response);
                            if (response) {
                                try {
                                    var status = response['status'];
                                    if(status == true){
                                        var detailPv = response['detailPv'];
                                        if(detailPv.length == 0){
                                            alert_error('Tidak ada data');
                                        }
                                        else{
                                            var total_amt_fdc = 0;
                                            table_fiducia_dpho.clear().draw();
                                            $.each(detailPv, function(index){
                                                var notary_code = detailPv[index]['notary_code'];
                                                var branch_id = detailPv[index]['branch_id'];
                                                var fpd_no = detailPv[index]['fpd_no'];
                                                var total_unit = detailPv[index]['total_unit'];
                                                var notary_amt = detailPv[index]['notary_amt'];
                                                var pnbp_amt = detailPv[index]['pnbp_amt'];
                                                var bank = detailPv[index]['bank'];
                                                var tax_amt = detailPv[index]['tax_amt'];
                                                var total_amt = detailPv[index]['total_amt'];
                                                var pv_no = detailPv[index]['pv_no'];
                                                var bank_tujuan = detailPv[index]['bank_tujuan'];
                                                table_fiducia_dpho.row.add([
                                                    notary_code,
                                                    branch_id,
                                                    fpd_no,
                                                    total_unit,
                                                    notary_amt,
                                                    pnbp_amt,
                                                    bank,
                                                    tax_amt,
                                                    total_amt,
                                                    pv_no,
                                                    bank_tujuan 
                                                    ]).draw(false);
                                                total_amt_fdc += parseInt(total_amt);
                                                $('#inp-total-amt-fdc').val(accounting.formatMoney(total_amt_fdc, '', 2, ',', '.'));
                                            });
                                            console.log(total_amt_fdc);
                                        }
                                    }
                                    else{
                                        var alert = response['alert'];
                                        alert_error(alert);
                                    }
                                } catch (e) {
                                    console.log(e);
                                    $('#loading-ajax').hide();
                                    alert_error("Terjadi Kesalahan" + e);
                                }
                            }
                        },
                        error: function(response){
                            console.log(response);
                        }
                    });
                }
                
            }
        }
    }
    
});

$('#btn-generate-fiducia').click(function(){
    var no_pv  = $('#inp-pvno-fdc').val();
    var total_amt = $('#inp-total-amt-fdc').val();
    var tbl_fdc_length = table_fiducia_dpho.data().length;

    alert_confirm('Apakah anda yakin generate file?', function(){
        $.ajax({
            url : base_url + "Controller_draft_payment_ho_fiducia/generate_dpho_fdc",
            type : 'POST',
            timeput : 10000,
            dataType :'text',
            data : {
                no_pv : no_pv,
                total_amt_fdc: total_amt,
                seq : tbl_fdc_length
            },
            cache : false,
            success : function(response){
                console.log(response);
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                var downloadLink = document.createElement("a");
                downloadLink.href = uri;
                downloadLink.download = 'EXPORT_'+no_pv+'.csv';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            },
            error : function(response){
                console.log(response);
            }
        });
    });
       
});

$('#btn-clear-dpho-fdc').click(function(){

});