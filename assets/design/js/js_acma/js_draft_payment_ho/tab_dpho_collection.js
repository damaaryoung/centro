    var table_dp_collection = $('#table-dp-collection').DataTable({
        // responsive: true
            "scrollY": "300px",
    "scrollCollapse": true,
    "paging": false,
    // "ordering": false,
    "columnDefs": [{
            "width": "8%",
            "targets": 0
        },
        {
            "width": "10%",
            "targets": 1
        },
        {
            "width": "20%",
            "targets": 2
        },
        {
            "width": "8%",
            "targets": 3
        },
        {
            "width": "10%",
            "targets": 4
        },
        {
            "width": "10%",
            "targets": 5
        },
        {
            "width": "10%",
            "targets": 6
        },
        {
            "width": "10%",
            "targets": 7
        },
        {
            "width": "20%",
            "targets": 8
        }
    ]

    //     "bInfo" : false,
    // "paging" : false,
    // "scrollY": "360px",
    // "scrollCollapse": true
    });
    var list_branch_child_dphobfr = 'ALL'; //default pada saat menu dibuka
    var check_lenght_coll = '';
    var list_data_coll = '';
    var amount_coll = '';
    $('#inp-total-dpho-collection').val(0);
    var total_amt_dpho_coll = parseInt($('#inp-total-dpho-collection').val());
    var class_code_collection = $('#slc-dpho-collection-class-code').val();
    var object_type_collection = $('#slc-dpho-collection-tipe-objek').val();
    //========================================== FUNCTION KLICK TAB COLLECTION ===================================================//
    // function js_dpho_collection() {
    //     var class_code_collection = $('#slc-dpho-collection-class-code').val();
    //     var object_type_collection = $('#slc-dpho-collection-tipe-objek').val();
    //     //$('#slc-dpho-collection-area').empty().append("<option value='' selected='true'>--SILAHKAN PILIH--</option>");
    //     localStorage.setItem("menu", "dpho_collection");
    //     console.log(class_code_collection);
    //     get_area_dphonsb('#slc-dpho-collection-area');
    //     clear_dpho_collection();
    //     if (class_code_collection !== '') {
    //         get_class_code_collection();
    //         get_bank_pengirim('#slc-dpho-collection-bank-pengirim');
    //         get_objgroup_bycode();
    //     } else {

    //     }

    // } //TUTUP FUNCTION JS COLLECTION


    //========================================== FUNCTION UNTUK VALIDASI MAX DATE 30 HARI ===================================================//
    $('#div-tgl-awal-collection-dp,#div-tgl-akhir-collection-dp').datetimepicker({
        format: 'DD-MMM-YYYY',
        allowInputToggle: true
    });

    var tgl_awal_collection = '';
    $('#div-tgl-awal-collection-dpho').datetimepicker({
            format: 'DD-MMM-YYYY',
            allowInputToggle: true,
            maxDate: new Date()
        })
        .on("dp.change", function(e) {
            var date = e.date;
            var dDate = date._d;
            var new_date = new Date(dDate);
            var new2_date = new Date(dDate);
            tgl_awal_collection = new_date;
            new2_date.setDate(new2_date.getDate() + 30);
            if (new2_date > new Date(today)) {
                new2_date = new Date(today);
            }
            $('#div-tgl-akhir-collection-dpho').data("DateTimePicker").date(new2_date);
        });

    $('#div-tgl-akhir-collection-dpho').datetimepicker({
        format: 'DD-MMM-YYYY',
        allowInputToggle: true,
        maxDate: new Date()
    }).on("dp.change", function(e) {
        var date = e.date;
        var dDate = date._d;
        var new_date = new Date(dDate);
        // if (new_date < new Date(tgl_awal_collection)) {

        //     alert_error('Tanggal akhir tidak boleh lebih kecil dari tanggal awal');
        //     new_date = new Date(today);
        //     //$('#inp-tgl-akhir-dpho-collection').val('');
        //     $("#inp-tgl-akhir-dpho-collection").val('');
        // } else {
        //     $('#div-tgl-akhir-collection-dpho').data("DateTimePicker").date(new_date);
        // }

            $('#div-tgl-akhir-collection-dpho').data("DateTimePicker").date(new_date);

    });

    //========================================== FUNCTION CLICK BANK ===================================================//
    $('#div-bank-dpho-collection').click(function() {
        get_bank_collection();
    });

    //========================================== FUNCTION CLICK PV ===================================================//
    $('#div-pv-no-dpho-collection').click(function() {
        get_pv_collection();
    });

    //========================================== FUNCTION CLICK SEARCH PV ===================================================//
    $('#btn-search-pv-no-dpho-collection').click(function() {
        get_pv_collection();
    });

    //========================================== FUNCTION CLEAR COLLECTION ===================================================//
    $('#btn-clear-dpho-collection').click(function() {
        clear_dpho_collection();
    });

    //========================================== GET BRANCH FROM AREA ===================================================//
    $('#slc-dpho-collection-area').change(function() {
        get_branch_list_coll($('#slc-dpho-collection-area').val());
    });

    //========================================== FUNCTION BTN CANCEL PV COLLECTION ===================================================//
    $('#btn-cancel-dpho-collection').click(function() {

        if (check_session() === 'true') {

            check_lenght_coll = $('#table-dp-collection').find('.check-dpho-coll').filter(':checked').length;
            console.log(check_lenght_coll);
            var branch_id_ho = $('#hdn-dpho-branch-code').val();
            var class_code = $('#slc-dpho-collection-class-code').val();
            var pv_no = $('#inp-pv-no-dpho-collection').val();
            console.log(branch_id_ho, class_code, pv_no);
            if (check_lenght_coll === 0) {
                console.log('eror confirm');
                alert_error('Pilih PV yang akan dicancel terlebih dahulu !');
            } else {
                alert_confirm('Apakah anda yakin ingin mengcancel data ?', function() {
                    cancel_collection_pv(branch_id_ho, class_code, pv_no);
                }); //alert confirm 
            }

        } else if (check_session() === 'false') {
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                localStorage.clear();
                window.location.href = base_url + "Controller_login/login_view";
            });
        }

    });

    //========================================== FUNCTION CLICK PV ===================================================//
    $('#div-pv-no-dpho-collection').click(function() {
        class_code_collection = $('#slc-dpho-collection-class-code').val();
        object_type_collection = $('#slc-dpho-collection-tipe-objek').val();
        if (class_code_collection === null || class_code_collection === '') {
            alert_error('Pilih Class Code Terlebih Dahulu ');
            $('#div-class-code-dpho-collection').addClass('has-error');
        } else if (object_type_collection === null || object_type_collection === '') {
            alert_error('Pilih Tipe Objek Terlebih Dahulu ');
            $('#div-tipe-objek-dpho-collection').addClass('has-error');
        } else {
            $('#div-class-code-dpho-collection').removeClass('has-error');
            $('#div-tipe-objek-dpho-collection').removeClass('has-error');
            get_pv_collection();
        }
    });

    //========================================== FUNCTION CLICK SEARCH PV  ===================================================//
    $('#btn-search-pv-no-dpho-collection').click(function() {
        if (check_session() === 'true') {
            class_code_collection = $('#slc-dpho-collection-class-code').val();
            object_type_collection = $('#slc-dpho-collection-tipe-objek').val();
            if (class_code_collection === null || class_code_collection === '') {
                alert_error('Pilih Class Code Terlebih Dahulu ');
                $('#div-class-code-dpho-collection').addClass('has-error');
            } else if (object_type_collection === null || object_type_collection === '') {
                alert_error('Pilih Tipe Objek Terlebih Dahulu ');
                $('#div-tipe-objek-dpho-collection').addClass('has-error');
            } else {
                $('#div-class-code-dpho-collection').removeClass('has-error');
                $('#div-tipe-objek-dpho-collection').removeClass('has-error');
                get_pv_collection();
            }

        } else if (check_session() === 'false') {
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                localStorage.clear();
                window.location.href = base_url + "Controller_login/login_view";
            });
        }

    });


    //========================================== BTN GENEREATE ===================================================//
    $('#btn-generate-dpho-collection').click(function() {
        if (check_session() === 'true') {
            check_lenght_coll = $('#table-dp-collection').find('.check-dpho-coll').filter(':checked').length;
            console.log(check_lenght_coll);
            list_data_coll = table_dp_collection.data();
            console.log(list_data_coll);
            var branch_id_ho = $('#hdn-dpho-branch-code').val();
            console.log(branch_id_ho);
            var pv_no = $('#inp-pv-no-dpho-collection').val();
            class_code_collection = $('#slc-dpho-collection-class-code').val();
            console.log('terpencet');
            if (check_lenght_coll === 0) {
                console.log('eror confirm');
                alert_error('Pilih PV yang akan digenerate terlebih dahulu !');

            } else {

                alert_confirm('Apakah anda yakin ingin generate text file ?', function() {
                    //confirm_collection(branch_id_ho, pv_no, class_code_collection);
                    get_text_file_coll(branch_id_ho, pv_no, class_code_collection);

                });

            }


        } else if (check_session() === 'false') {
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                localStorage.clear();
                window.location.href = base_url + "Controller_login/login_view";
            });
        }

    });

    //========================================== BUTTON CLICK SEARCH ===================================================//
    $('#btn-search-dpho-collection').click(function() {
        if (check_session() === 'true') {
            class_code_collection = $('#slc-dpho-collection-class-code').val();
            object_type_collection = $('#slc-dpho-collection-tipe-objek').val();
            var tgl_awal = $('#inp-tgl-awal-dpho-collection').val();
            var tgl_akhir = $('#inp-tgl-akhir-dpho-collection').val();
            var coll_bank = $('#inp-dpho-collection-bank').val();
            var bank_code = $('#hdn-bank-code-dpho-collection').val();
            var pv_no = $('#inp-pv-no-dpho-collection').val();
            var area_coll = $('#slc-dpho-collection-area').val();
            if (class_code_collection === '') {
                alert_error('Pilih class code terlebih dahulu');
                $('#div-class-code-dpho-collection').addClass('has-error');

            } else if (tgl_awal === '' && tgl_akhir === '') {
                alert_error('Isi tanggal approve terlebih dahulu');
                $('#div-tgl-awal-collection-dpho').addClass('has-error');
                $('#div-tgl-akhir-collection-dpho').addClass('has-error');
            } else if (tgl_awal === '') {
                alert_error('Isi tanggal approve terlebih dahulu');
                $('#div-tgl-awal-collection-dpho').addClass('has-error');
            } else if (tgl_akhir === '') {
                alert_error('Isi tanggal approve terlebih dahulu');
                $('#div-tgl-akhir-collection-dpho').addClass('has-error');
            } else if (area_coll === '') {
                alert_error('Pilih area terlebih dahulu');
                $('#div-area-dpho-collection').addClass('has-error');
            } else if (object_type_collection === '') {
                alert_error('Pilih tipe objek terlebih dahulu');
                $('#div-tipe-objek-dpho-collection').addClass('has-error');
            } else if (coll_bank === '') {
                alert_error('Pilih bank code terlebih dahulu');
                $('#div-bank-dpho-collection').addClass('has-error');
            } else if (pv_no === '') {
                alert_error('Pilih PV no terlebih dahulu');
                $('#div-pv-no-dpho-collection').addClass('has-error');
            } else {
                if (coll_bank == 'ALL') {
                    bank_code = 'ALL';
                }
                $('#div-class-code-dpho-collection').removeClass('has-error');
                $('#div-tgl-awal-collection-dpho').removeClass('has-error');
                $('#div-tgl-akhir-collection-dpho').removeClass('has-error');
                $('#div-tgl-awal-collection-dpho').removeClass('has-error');
                $('#div-tgl-akhir-collection-dpho').removeClass('has-error');
                $('#div-area-dpho-collection').removeClass('has-error');
                $('#div-tipe-objek-dpho-collection').removeClass('has-error');
                $('#div-bank-dpho-collection').removeClass('has-error');
                $('#div-pv-no-dpho-collection').removeClass('has-error');
                console.log(list_branch_child_dphobfr);
                display_collection(class_code_collection, object_type_collection, tgl_awal, tgl_akhir, bank_code, pv_no, list_branch_child_dphobfr);
            }

        } else if (check_session() === 'false') {
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                localStorage.clear();
                window.location.href = base_url + "Controller_login/login_view";
            });
        }

    });


    //========================================== FUNCTION CHECK ALL TABLE COLLECTION ===================================================//
    // $('#checkbox-dpho-coll').click(function() {
    //     var cust_dp = table_dp_collection.data();
    //     console.log(cust_dp);
    //     var tot = 0;
    //     for (var i = 0; i < cust_dp.length; i++) {
    //         $('#inp-total-dpho-collection').val(0);
    //         if ($('#checkbox-dpho-coll').is(":checked")) {
    //             $('.check-dpho-coll').prop('checked', true);

    //             var amount_coll = accounting.unformat(cust_dp[i][6]);
    //             console.log(amount_coll);
    //             tot += parseInt(amount_coll);
    //             console.log(tot);
    //         } else {
    //             $('.check-dpho-coll').prop('checked', false);
    //         }
    //         if (i + 1 === cust_dp.length) {
    //             $('#inp-total-dpho-collection').val(accounting.formatMoney(tot, '', 2, ',', '.'));
    //             total_amt_dpho_coll = tot;
    //         }
    //     }

    // });


    $('#checkbox-dpho-coll').click(function() {
   // var cust_dp = table_dp_collection.data();
    var cust_dp = table_dp_collection.rows( { search: 'applied' } ).data();
    var tot = 0;
    console.log(cust_dp);
    for (var i = 0; i < cust_dp.length; i++) {
        if ($('#checkbox-dpho-coll').is(":checked")) {
            $('.check-dpho-coll').prop('checked', true);

            var amount_coll = accounting.unformat(cust_dp[i][6]);
            console.log(amount_coll);
            tot += parseInt(amount_coll);
            console.log(tot);
        } else {
            $('.check-dpho-coll').prop('checked', false);
        }
        if (i + 1 === cust_dp.length) {
            $('#inp-total-dpho-collection').val(accounting.formatMoney(tot, '', 2, ',', '.'));
            total_amt_dpho_coll = tot;
        }
    }

});




    //========================================== FUNCTION TOTAL AMOUNT ===================================================//
    // $('#table-dp-collection').on('click', '.check-dpho-coll', function() {
    //     var check_id = (this.id).substr(16, 1);
    //     console.log(check_id);
    //     data_dp = table_dp_collection.rows().data();
    //     console.log(data_dp);
    //     var angka = accounting.unformat(data_dp[check_id][6]);
    //     console.log(angka);
    //     if ($('#check-dpho-coll-' + check_id).is(':checked')) {
    //         console.log('angka : ' + angka);
    //         total_amt_dpho_coll += parseFloat(angka);
    //         $('#inp-total-dpho-collection').val(accounting.formatMoney(total_amt_dpho_coll, '', 2, ',', '.'));
    //     } else {
    //         total_amt_dpho_coll -= parseFloat(angka);
    //         // console.log('uncheck cuy');
    //         $('#inp-total-dpho-collection').val(accounting.formatMoney(total_amt_dpho_coll, '', 2, ',', '.'));
    //         console.log(total_amt_dpho_coll);
    //     }

    // });


    $('#table-dp-collection').on('click', '.check-dpho-coll', function() {
    var check_len = (this.id).length;
    console.log(check_len);    
    var check_id = (this.id).substr(16, check_len);
    data_dp = table_dp_collection.rows().data();
    console.log(data_dp);
    console.log(data_dp.length);
    var jml_data_cek = $('input.check-dpho-coll:checked').length;
    var angka = accounting.unformat(data_dp[check_id][6]);
    console.log(angka);
    console.log(jml_data_cek);
    //untuk issue bila cuma ada 1 row diceklist ,cek all harus terceklist
    if (data_dp.length == 1) {

        if ($('#check-dpho-coll-' + check_id).is(':checked')) {
            console.log('angka : ' + angka);
            total_amt_dpho_coll += parseFloat(angka);
            console.log(total_amt_dpho_coll);
            $('#inp-total-dpho-collection').val(accounting.formatMoney(total_amt_dpho_coll, '', 2, ',', '.')); // total_amt_cust_dp
            $('#checkbox-dpho-coll').prop('checked', true);
        } else {
            total_amt_dpho_coll -= parseFloat(angka);
            $('#inp-total-dpho-collection').val(accounting.formatMoney(total_amt_dpho_coll, '', 2, ',', '.'));
            console.log(total_amt_dpho_coll);
            $('#checkbox-dpho-coll').prop('checked', false);
        }

    } else {
        if (data_dp.length == jml_data_cek) {
            $('#checkbox-dpho-coll').prop('checked', true);
        } else {
            $('#checkbox-dpho-coll').prop('checked', false);
        }

            if ($('#check-dpho-coll-' + check_id).is(':checked')) {
        console.log('angka : ' + angka);
        total_amt_dpho_coll += parseFloat(angka);
        console.log(total_amt_dpho_coll);
        $('#inp-total-dpho-collection').val(accounting.formatMoney(total_amt_dpho_coll, '', 2, ',', '.')); // total_amt_cust_dp
    } else {
        total_amt_dpho_coll -= parseFloat(angka);
        $('#inp-total-dpho-collection').val(accounting.formatMoney(total_amt_dpho_coll, '', 2, ',', '.'));
        console.log(total_amt_dpho_coll);
    }

    }

});

    //========================================== FUNCTION CLEAR ===================================================//
    function clear_dpho_collection() {
        $('.res-global').val('');
        $('.res-select').prop('selectedIndex', 0);
        $('#btn-generate-dpho-collection').prop("disabled", true);
        $('#btn-cancel-dpho-collection').prop("disabled", true);
        $('#total_amt_dpho_coll').val(0);
        $('#checkbox-dpho-coll').prop("checked", false);
        table_dp_collection.clear().draw();
        $('#inp-dpho-collection-bank').val('ALL');
        get_area_dphonsb('#slc-dpho-collection-area');
        list_branch_child_dphobfr = 'ALL';
        $('#inp-tgl-awal-dpho-collection').val('');
        $('#inp-tgl-akhir-dpho-collection').val('');
    };



    //========================================== GET CLASS CODE COLLECTION ===================================================//
    function get_class_code_collection() {
        $.ajax({
            url: "Controller_draft_payment_ho_collection/get_classcode_collection",
            type: 'GET',
            dataType: 'json',
            //async : false,
            cache: false,
            success: function(response) {
                if (JSON.stringify(response).includes('Timeout')) {
                    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');

                } else if (response) {
                    try {

                        if (response['status'] === true) {
                            console.log(response);
                            $('#slc-dpho-collection-class-code').empty();
                            $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo('#slc-dpho-collection-class-code').addClass('form-control');
                            $.each(response['data2'], function(list) {

                                $('#slc-dpho-collection-class-code').append('<option value="' + this['acct_interface_group'] + '">' + this['acct_interface_group'] + ' - ' + this['acct_brief_desc'] + '</option>');
                            });

                        } else {
                            console.log('Error Get Class Code Collection');
                            alert_error(response['data']);
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e)
                        alert_error(e);
                    }
                } //if response

            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });
    };

    //========================================== GET OBJ GROUP COLLECTION ===================================================//
    function get_objgroup_bycode() {
        $.ajax({
            url: "Controller_draft_payment_ho_collection/get_objgroup_bycode",
            type: 'POST',
            dataType: 'json',
            data: {
                "obj_group_code": "('001','002')",//Hanya untuk menampilkan parameter objek motor dan mobil

            },
            //async : false,
            cache: false,
            success: function(response) {
                if (JSON.stringify(response).includes('Timeout')) {
                    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');

                } else if (response) {
                    try {
                        console.log(response['status']);
                        if (response['status'] === true) {
                            console.log(response);
                            $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo('#slc-dpho-collection-tipe-objek').addClass('form-control');
                            $.each(response['data'], function(list) {

                                $('#slc-dpho-collection-tipe-objek').append('<option value="' + this['obj_group_code'] + '">' + this['obj_group_code'] + ' - ' + this['obj_group_desc'] + '</option>');
                            });

                        } else {
                            console.log('Error Get Tipe Objek Collection');
                            alert_error(response['data']);
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                } //if response

            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });
    };

    //========================================== GET BANK COLLECTION ===================================================//
    function get_bank_collection() {
        var branch_id = $('#hdn-dpho-branch-code').val();
        $.ajax({
            url: "Controller_draft_payment_ho_collection/get_bank_collection",
            type: 'POST',
            dataType: 'json',
            data: {
                "branch_id": branch_id
            },
            cache: false,
            success: function(response) {
                if (JSON.stringify(response).includes('Timeout')) {
                    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');

                } else if (response) {
                    try {

                        if (response['status'] === true) {
                            console.log(response);
                            tbl_bank_insentif.clear().draw();
                            var data = [];

                            $.each(response['data'], function(i) {
                                data.push([
                                    this['bankCode'],
                                    this['bankName']
                                ]);
                            });
                            console.log(data);
                            tbl_bank_insentif.rows.add(data).draw(false);

                            tbl_bank_insentif.row.add([
                                '- ALL -',
                                '- ALL -'
                            ]).draw();



                            $('#modal-bank-insentif').modal('show');
                        } else {
                            //console.log('Error Get Class Code Collection');
                            alert_error(response['data']);
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e)
                        alert_error(e);
                    }
                } //if response

            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });
    };

    //========================================== GET PV COLLECTION ===================================================//
    function get_pv_collection() {
        class_code_collection = $('#slc-dpho-collection-class-code').val();
        object_type_collection = $('#slc-dpho-collection-tipe-objek').val();
        $.ajax({
            url: "Controller_draft_payment_ho_collection/get_pv_collection",
            type: 'POST',
            dataType: 'json',
            data: {
                "class_code": class_code_collection,
                "object_code": object_type_collection
            },
            //async : false,
            cache: false,
            success: function(response) {
                if (JSON.stringify(response).includes('Timeout')) {
                    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');

                } else if (response) {
                    try {
                        console.log(response['status']);
                        if (response['status'] === true) {
                            console.log(response['data']);
                            table_nopv.clear().draw();

                        var data_arr = [];
                        $.each(response['data'], function(index) {
                            data_arr.push([
                             this['payment_no'],
                             this['create_date']
                            ]);
                        });
                        console.log(data_arr);
                        table_nopv.rows.add(data_arr).draw(false);
                        $("#modal-nopv").modal({
                            show: true,
                            backdrop: 'static'
                        });

                        } else {
                            alert_error(response['data']);
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                } //if response

            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });
    };


    //========================================== FUNCTION GET BRANCH LIST ===================================================//
    function get_branch_list_coll(branch_area) {
        list_branch_child_dphobfr = '';

        //var branch_area_dphonsb = $('#slc-dpho-nsb-area').val();
        $.ajax({
            url: "Controller_draft_payment_ho_collection/get_list_branch_child",
            type: 'POST',
            timeput: 10000,
            dataType: 'json',
            data: {
                branch_parent: branch_area,
            },

            success: function(response) {
                console.log("ajax response success");
                if (response) {
                    try {
                        if (response['Status'] == 500) {
                            alert_error(response['Data']);
                        } else {
                            list_branch_child_dphobfr = response;
                            console.log(list_branch_child_dphobfr);
                        }
                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(response);
                        console.log(e);
                        alert_error(e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
                    alert_error('Koneksi ke server gagal, silahkan coba lagi!')
                } else {
                    alert_error(response);
                }
            }
        });
    };

    //========================================== DISPLAY DTL PV COLLECTION ===================================================//
    function display_collection(class_code, object_type, tgl_awal, tgl_akhir, bank_code, pv_no, list_branch) {
        $.ajax({
            url: "Controller_draft_payment_ho_collection/display_collection",
            type: 'POST',
            dataType: 'json',
            data: {
                "class_code": class_code,
                "object_code": object_type,
                "payment_no": pv_no,
                "bank_id": bank_code,
                "branch_code": list_branch,
                "tgl_awal": tgl_awal,
                "tgl_akhir": tgl_akhir

            },
            //async : false,
            cache: false,
            success: function(response) {
                if (JSON.stringify(response).includes('Timeout')) {
                    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');

                } else if (response) {
                    try {
                        console.log(response['status']);
                        if (response['status'] === true) {
                            table_dp_collection.clear().draw();
                            $('#checkbox-dpho-coll').prop("checked", false);
                            var tot_amt = 0;
                            if (response['data'].length > 0) {

                                console.log(response['data']);

                                    // var total = this['total'];
                                    // var branch_id = this['branch_code'];
                                    // var bank_id = this['bank_id'];
                                    // var empl_npk = this['id_proff_coll'];
                                    var data = [];

                                    $.each(response['data'], function(index) {
                                        var empl = this['id_proff_coll'];
                                        if (empl == null  || empl == ' ') {
                                            empl = null;
                                        }else{
                                           empl =  this['id_proff_coll'] + ' - ' + this['empl_name'];
                                        }
                                        console.log(empl);
                                        data.push([
                                            '<input type="checkbox" id= "check-dpho-coll-' + index + '" class="check-dpho-coll">',
                                            this['branch_code'] + ' - ' + this['branch_code2'],
                                            empl,
                                            this['unit'],
                                            accounting.formatMoney(this['amount'], '', 2, ',', '.'),
                                            accounting.formatMoney(this['tax'], '', 2, ',', '.'),
                                            accounting.formatMoney(this['total'], '', 2, ',', '.'),
                                            this['payment_no'],
                                            this['bank_id'] + ' - ' + this['bank_name'],
                                        ]);
                                    });
                                    console.log(data);
                                    table_dp_collection.rows.add(data).draw(false);
                                console.log(tot_amt);
                                $('#btn-generate-dpho-collection').prop('disabled', false);
                                $('#btn-cancel-dpho-collection').prop("disabled", false);
                            } //response data . lenght
                            else {
                                alert_info('Data tidak ditemukan');
                            }

                        } else {
                            alert_error(response['data']);
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        alert_error(e);
                    }
                } //if response

            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });
    };

    //========================================== CONFIRM / INSERT PAYMENT RESULT COLLECTION ===================================================//   
    function insert_payment_result_coll(branch_id, pv_no, class_code) {

        $.ajax({
            url: base_url + "Controller_draft_payment_ho_collection/payment_result_coll",
            type: 'POST',
            dataType: 'json',
            data: {
                "p_branch_id_ho": branch_id_ho,
                "pv_no": pv_no
            },

            success: function(response) {
                console.log(response);
                console.log(response['success']);
                if (response) {
                    try {

                        var result = response['result'];
                        if (result === false) {
                            alert_error(response['status']);
                        } else {
                            table_dp_collection.clear().draw();
                            $('#btn-generate-dpho-collection').prop('disabled', true);
                            $('#inp-total-dpho-collection').val('');
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });

    }

    //========================================== GET TXT EXPORT COLLECTION ===================================================//
    function get_text_export_coll(class_code, pv_no, data) {
        var branch_id_ho = $('#hdn-dpho-branch-code').val();
        var pv_no_csv = pv_no;
        var d = new Date,
            dformat = [
                d.getDate().padLeft(),
                (d.getMonth() + 1).padLeft(),
                d.getFullYear()
            ].join('-') +
            ' ' + [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()
            ].join('.');
        $.ajax({
            url: "Controller_draft_payment_ho/get_export_file_coll",
            type: 'POST',
            timeput: 10000,
            dataType: 'TEXT',
            data: {
                class_code: class_code,
                pv_no: pv_no,
            },

            success: function(response) {

                var result = response['status'];

                if (result == '500') {
                    cancel_collection(branch_id_ho, pv_no, class_code);
                } else {
                    console.log("ajax response success");
                    console.log(response);
                    var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'EXPORT_' + pv_no_csv + '.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    //export_collection(branch_id_ho, pv_no, class_code);
                }
            },
            error: function(response) {
                console.log(response);
                cancel_collection(branch_id, pv_no, class_code);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });
    }

    //========================================== CONFIRM GENERATE COLLECTION ===================================================//
    function confirm_collection(branch_id, pv_no, class_code) {
        console.log(list_data_coll);
        var data_arr = [];
        for (var i = 0; i < list_data_coll.length; i++) {
            if ($('#check-dpho-coll-' + i).is(":checked")) {
                data_arr.push({
                    payment_detail_id: null //list_data_coll[i][9] group by
                });
            }
        }
        console.log(data_arr);
        $.ajax({
            url: base_url + "Controller_draft_payment_ho_collection/confirm_collection",
            type: 'POST',
            dataType: 'json',
            data: {
                "branch_id_ho": branch_id,
                "pv_no": pv_no,
                "class_code": class_code,
                "data": data_arr
            },

            success: function(response) {
                console.log(response);
                if (response) {
                    try {
                        var data = response['data'];
                        var status = response['status'];
                        if (status == '500') {
                            console.log(data)
                            cancel_collection(branch_id, pv_no, class_code);
                        } else {
                            table_dp_collection.clear().draw();
                            $('#btn-generate-dpho-collection').prop('disabled', true);
                            $('#inp-total-dpho-collection').val('');
                            //get_text_export_coll(class_code, pv_no);
                            //export_collection(class_code, pv_no);
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });

    }

    //========================================== EXPORT TXT FILE COLLECTION ===================================================//
    function export_collection(branch_id, pv_no, class_code) {

        $.ajax({
            url: base_url + "Controller_draft_payment_ho_collection/export_collection",
            type: 'POST',
            dataType: 'json',
            data: {
                "branch_id_ho": branch_id,
                "pv_no": pv_no,
                "class_code": class_code
            },

            success: function(response) {
                console.log(response);
                if (response) {
                    try {
                        var status = response['status'];
                        var data = response['data'];
                        console.log(data, status);
                        if (status == '500') {
                            console.log(data);
                            cancel_collection(branch_id, pv_no, class_code);
                        } else {
                            //get_text_export_coll(class_code, pv_no,data);
                            alert_info(data);
                            table_dp_collection.clear().draw();
                            $('#btn-generate-dpho-collection').prop('disabled', true);
                            $('#inp-total-dpho-collection').val('');
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });

    }

    //========================================== CANCEL GENERATE COLLECTIO ===================================================//
    function cancel_collection(branch_id, pv_no, class_code) {

        $.ajax({
            url: base_url + "Controller_draft_payment_ho_collection/cancel_collection",
            type: 'POST',
            dataType: 'json',
            data: {
                "branch_id_ho": branch_id,
                "pv_no": pv_no,
                "class_code": class_code
            },

            success: function(response) {
                console.log(response);
                if (response) {
                    try {

                        var status = response['data'];
                        var data = response['data'];
                        if (status == '500') {
                            alert_error(data);
                        } else {
                            alert_info(data);
                            table_dp_collection.clear().draw();
                            $('#btn-generate-dpho-collection').prop('disabled', true);
                            $('#inp-total-dpho-collection').val('');
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });

    }

    //========================================== FUNCTION CANCEL PV COLLECTION ===================================================//
    function cancel_collection_pv(br_id, class_code, pv_no) {
        $.ajax({
            url: base_url + "Controller_draft_payment_ho_collection/cancel_collection_pv",
            type: 'POST',
            dataType: 'json',
            data: {
                "br_id": br_id,
                "class_code": class_code,
                "pv_no": pv_no
            },

            success: function(response) {
                console.log(response);
                if (response) {
                    try {
                        var data = response['data']['data'];
                        var status = response['data']['status'];
                        console.log(data);
                        if (status == true) {
                            alert_info(data);
                            clear_dpho_collection();
                        } else {
                            alert_error(data);
                            clear_dpho_collection();
                        }
                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });
    }

        


    // FUNCTION BARU GENERATE SATU SERVICE
    function get_text_file_coll(branch_id, pv_no, class_code) {
        console.log(list_data_coll);
        var data_arr = [];
        // for (var i = 0; i < list_data_coll.length; i++) {
        //     if ($('#check-dpho-coll-' + i).is(":checked")) {
        //         data_arr.push({
        //             payment_detail_id: null //list_data_coll[i][9] group by
        //         });
        //     }
        // }
        //hanya untuk set null array nya agar tidak error di java
            data_arr.push({ 
    payment_detail_id: ""
    });
        console.log(data_arr);
        var branch_id_ho = $('#hdn-dpho-branch-code').val();
        var pv_no_csv = pv_no;
        var d = new Date,
            dformat = [
                d.getDate().padLeft(),
                (d.getMonth() + 1).padLeft(),
                d.getFullYear()
            ].join('-') +
            ' ' + [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()
            ].join('.');
        $.ajax({
            url: "Controller_draft_payment_ho/get_export_file_coll",
            type: 'POST',
            timeput: 10000,
            dataType: 'TEXT',
            data: {
                "branch_id_ho": branch_id,
                "pv_no": pv_no,
                "class_code": class_code,
                "data": data_arr
            },

            success: function(response) {
                console.log(response);
            if (response) {
                try {

                var result = response['status'];
                console.log(response);
                if (result == '500') {
                    cancel_collection(branch_id, pv_no, class_code);
                } else {
                    console.log(response);
                    if (response == '500') {
                        //cek data pada saat diolah di php
                        alert_error('Error generate text file, periksa data kembali');
                       //cancel_collection(branch_id, pv_no, class_code);
                    }else{
                        var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                        var downloadLink = document.createElement("a");
                        downloadLink.href = uri;
                        downloadLink.download = 'EXPORT_' + pv_no_csv + '.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        table_dp_collection.clear().draw();
                        $('#btn-generate-dpho-collection').prop('disabled', true);
                        $('#inp-total-dpho-collection').val('');
                        alert_info('Nomor PV: '+ pv_no +' sudah dikonfirmasi');
                        clear_dpho_collection();
                    }

                }
                             } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error(e);
                }
            }
            },
            error: function(response) {
                console.log(response);
                //cancel_collection(branch_id, pv_no, class_code);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });
    }