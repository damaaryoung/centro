var table_asuransi_dpho = $('#tbl-insr-pv-ho').DataTable({
    "bInfo" : false,
    "paging" : false,
    "scrollY": "360px",
    "scrollCollapse": true
});

/*if ($('#tab-dpho-asuransi').length) {
    get_area_insr();
    get_bank_dp_insr();
    get_insr_insr();
}
*/
    

//$('#inp-date-start-pv-insr').val(today);
//$('#inp-date-end-pv-insr').val(today);

$('#div-date-start-pv-insr').datetimepicker({
    format : 'DD-MMM-YYYY',
    maxDate : 'now',
    allowInputToggle : true

}).on("dp.change", function(e){
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);

    $('#div-date-end-pv-insr').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }

    $('#div-date-end-pv-insr').data("DateTimePicker").maxDate(new_date);
    $('#div-date-end-pv-insr').data("DateTimePicker").date(new_date);
});

$('#div-date-end-pv-insr').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
});

//CHANGE

$('#slc-insr-id-insr').change(function(){
    var insr_bank_id = $('#slc-insr-id-insr').val();
    console.log(insr_bank_id);
    var insr_id = insr_bank_id.split('-')[0];
    console.log(insr_id);
    var bank_id = insr_bank_id.split('-')[1];
    //bank_id = bank_id.trim();
    console.log(bank_id);

    $.ajax({
        url : base_url+"Controller_draft_payment_ho_insurance/get_bank_name_insr",
        dataType : 'JSON',
        type : 'POST',
        data: {
            bank_id: bank_id
        },
        cache : false,
        success : function(response){
            console.log(response);
            if (response) {
                try{
                    var status = response['status'];
                    if (status == true){
                        $.each(response['data'], function(i){
                        var bank_code = response['data'][i]['bankCode'];
                        var bank_name = response['data'][i]['bankName'];
                        $('#inp-bank-pv-insr').val(bank_code + ' - ' + bank_name);
                        })
                    }
                    else{
                        var notif = response['data'];
                        alert_error(notif);
                        $('#inp-bank-pv-insr').val('');
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
});

$('input[type=radio][name=rad-insr-type]').change(function() {
    get_insr_insr();
});

$('#btn-search-invoice-insr').click(function(){

    var insr_id = $('#slc-insr-id-insr').val().split('-')[0];
    if ((insr_id == null) || (insr_id == '')){
        alert_error('Pilih asuransi terlebih dahulu!');
    }
    else{
        var insr_type = $('input[name=rad-insr-type]:checked').val();
        console.log(insr_id);
        console.log(insr_type);
        $.ajax({
            url: base_url+'Controller_draft_payment_ho_insurance/get_list_invoice_insr',
            dataType : 'JSON',
            type : 'POST',
            data: {
                insr_type: insr_type,
                insr_id: insr_id
            },
            cache : false,
            success : function(response){
                console.log(response);
                if (response) {
                    try{
                        var status = response['status'];
                        if (status == true){
                            var data = response['data'];
                            if(data.length == 0){
                                alert_error('Tidak ada data');
                            }
                            else{
                                $('#modal-invoice-no-insr').modal({
                                    show : true,
                                    backdrop : 'static'
                                });

                                table_invc_no_insr.clear().draw();
                                $.each(data, function(index){
                                    var invoice_no = data[index];

                                    table_invc_no_insr.row.add([
                                        invoice_no
                                        ]).draw(false);
                                });
                            }
                        }
                        else{
                            var alert = response['alert'];
                            alert_error(alert);
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
});

var hasil_no_invc = '';
var pilih_invc;
$('#tbl-list-invc-no').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
    $(this).removeClass('selected');
    pilih_invc = '';
    }
    else{
    table_invc_no_insr.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    pilih_invc = table_invc_no_insr.row( this ).data();
    hasil_no_invc = pilih_invc[0];
    }
});

$('#tbl-list-invc-no').on( 'dblclick', 'tr', function () {
    $('#modal-invoice-no-insr').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    $('#inp-invoice-no-insr').val(hasil_no_invc);
});

$('#btn-conf-invc-no').click(function(){
    $('#modal-invoice-no-insr').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    $('#inp-invoice-no-insr').val(hasil_no_invc);
});

$('#btn-display-insr-dpho').click(function(){
    var class_code_insr = $('#slc-cl-code-insr').val();
    var insr_id_insr = $('#slc-insr-id-insr').val().split('-')[0];
    var insr_type_insr = $('input[name=rad-insr-type]:checked').val();
    var start_date_insr = $('#inp-date-start-pv-insr').val();
    var end_date_insr = $('#inp-date-end-pv-fdc').val();
    var area_insr = $('#slc-area-pv-insr').val();
    var bank_insr = $('#inp-bank-pv-insr').val();
    var invoice_insr = $('#inp-invoice-no-insr').val();
    console.log(start_date_insr);
    if ((class_code_insr == null) || (class_code_insr == '')){
        alert_error('Pilih class code terlebih dahulu!');
    }
    else if((insr_id_insr == null) || (insr_id_insr == '')){
        alert_error('Pilih asuransi terlebih dahulu!');
    }
    else if((start_date_insr == null) || (start_date_insr == '')){
        alert_error('Start date tidak boleh kosong!');
    }
    else if((end_date_insr == null) || (end_date_insr == '')){
        alert_error('End date tidak boleh kosong!');
    }
    else if((area_insr == null) || (area_insr == '')){
        alert_error('Pilih area terlebih dahulu!');
    }
    else if((bank_insr == null) || (bank_insr == '')){
        alert_error('Pilih bank terlebih dahulu!');
    }
    else if((invoice_insr == null) || (invoice_insr == '')){
        alert_error('Pilih invoice terlebih dahulu!');
    }
    else{
        $.ajax({
            url : base_url+"Controller_draft_payment_ho_insurance/display_insr",
            dataType : 'JSON',
            type : 'POST',
            data: {
                insr_type: insr_type_insr,
                insr_id: insr_id_insr,
                invoice_no: invoice_insr,
                start_date: start_date_insr,
                end_date: end_date_insr
            },
            cache : false,
            success : function(response){
                console.log(response);
                if (response) {
                    try{
                        var status = response['status'];
                        if (status == true){
                            var data = response['data'];

                            if(data.length == 0){
                                alert_error('Tidak ada data');
                            }
                            else{
                                table_asuransi_dpho.clear().draw();

                                var total_amount_ins = 0;

                                $.each(data, function(i){
                                    var invoice_no = data[i]['invoice_no'];
                                    var contract_no = data[i]['contract_no'];
                                    var customer_name = data[i]['customer_name'];
                                    var address = data[i]['address'];
                                    var premi_amount = data[i]['premi_amount'];
                                    var reconsile = data[i]['reconsile'];
                                    var status_desc = data[i]['status_desc'];

                                    table_asuransi_dpho.row.add([
                                        //'',
                                        invoice_no,
                                        contract_no,
                                        customer_name,
                                        address,
                                        premi_amount,
                                        reconsile,
                                        status_desc
                                    ]).draw(false);

                                    total_amount_ins += parseInt(premi_amount);
                                    $('#total-amt-premi-insr').val(accounting.formatMoney(total_amount_ins, '', 2, ',', '.'));
                                    console.log(total_amount_ins);
                                })
                            }

                        }
                        else{
                            var notif = response['alert'];
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
                //if (response['responseText'] === "") {
                //    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                //        localStorage.clear();
                //        window.location.href = base_url + "Controller_login/login_view";
                //    });
                //}
            }
        });
    }

});

$('#btn-save-insr-dpho').click(function(){
    var bank_pengirim = $('#slc-bank-pengirim-insr').val();
   /* if ((bank_pengirim == null) || (bank_pengirim == '')){
        alert_error('Bank pengirim tidak boleh kosong!');
    }
    else{*/
        alert_confirm('Apakah anda yakin untuk create PV dan generate file?', function(){

            var insr_id = $('#slc-insr-id-insr').val().split('-')[0];
            var invoice_no = $('#inp-invoice-no-insr').val();
            var insr_type = $('input[name=rad-insr-type]:checked').val();
            var bank_insr = $('#inp-bank-pv-insr').val().split('-')[0].trim();

            var total_amt_insr = $('#total-amt-premi-insr').val();
            var cl_code = $('#slc-cl-code-insr').val();

            var data_table_insr = table_asuransi_dpho.data();
            var dataa = [];
                for (var i = 0; i < data_table_insr.length; i++) {
                    dataa.push({
                    contract_no: data_table_insr[i][1],
                    amount_detail: data_table_insr[i][4],
                    })
                }

            console.log(bank_insr);


            $.ajax({
                url : base_url+"Controller_draft_payment_ho_insurance/save_pv",
                dataType : 'JSON',
                type : 'POST',
                timeput : 10000,
                dataType :'text',
                data: {
                    insr_id: insr_id,
                    invoice_no: invoice_no,
                    insr_type: insr_type,
                    bank_id_insr: bank_insr,
                    amount: total_amt_insr,
                    class_code: cl_code,
                    bank_pengirim: bank_pengirim,
                    list_detail: dataa
                },
                //async: false,
                cache : false,
                success : function(response){
                    console.log(response);
                    if(response){
                        try{
                            var nopv = response.split(',')[12].substring(0, 13);;
                            console.log(nopv);

                            var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                            var downloadLink = document.createElement("a");
                            downloadLink.href = uri;
                            downloadLink.download = 'EXPORT_'+nopv+'.csv';
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                        }
                        catch(e){
                            $('#loading-ajax').hide();
                            alert_error(e);
                        }
                    }
                    else{
                        alert_error('Terjadi kesalahan');
                    }
                },
                error : function(response){
                    console.log(response);
                    alert_error(response);
                }
            });
        });
    //}
    
});

function get_insr_insr() {
    var rad_insr_type = $('input[name=rad-insr-type]:checked').val();
    $.ajax({
        url : base_url+"Controller_draft_payment_ho_insurance/get_list_insr_insr",
        dataType : 'JSON',
        type : 'POST',
        data: {
            insr_type : rad_insr_type
        },
        cache : false,
        success : function(response){
            console.log(response);
            if (response) {
                try{
                    $('#slc-insr-id-insr').empty();

                    var status = response['status'];
                    if (status == true){
                        $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-insr-id-insr').addClass('form-control');
                        $.each(response['data'], function(i){
                        var insr_id = response['data'][i]['insr_id'];
                        var insr_name = response['data'][i]['insr_name'];
                        var insr_bank = response['data'][i]['bank_id'];

                        $('#slc-insr-id-insr').append('<option value="'+insr_id+'-'+insr_bank+'">'+insr_id+ ' - ' +insr_name+ 

                            '</option>');
                        })
                    }
                    else{
                        var alert = response['data'];
                        alert_error(alert);
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
