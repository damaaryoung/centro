var tbl_appcan2 = $('#id-tbl-approval-can2').DataTable({

	"responsive":true,
	"scrollY":        "370px",
	"scrollCollapse": true,
	"paging":         false,
});

var arrJob = [];
var arrCbng = [];
var dataArea = [];
var dataJob=[];
var arrBm = [];
var arrArea = [];
var flag = '';
var arrCheck = [];
var index = [];
var array_temp = [];
var flag_save = '';
var cab = '';
var cab_name = '';
var branch_code = '';
var branch_name = '';

var today = new Date();
var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var m_names = new Array("", "Jan", "Feb", "Mar",
  	"Apr", "May", "Jun", "Jul", "Aug", "Sep",
  	"Oct", "Nov", "Dec");
  if (dd < 10) {
  	dd = '0' + dd
  }
  // if(mm<10) {
  //  mm = '0'+mm
  // }
  today = dd + '-' + m_names[mm] + '-' + yyyy;
  $('#inp-appibam-date').val(today);

  $('#inp-appibam-date').datetimepicker({
  	format: 'DD-MMM-YYYY',
  	allowInputToggle: true,
   //minDate: new Date(year, month-1, day-1),
   maxDate :  new Date(),
 });

  $('#btn-clear-ibam-can2').click(function(){
  	history.go(0);
  })

  $('#div-table-job').on('click','#id-tbl-appibam-can2 tbody','.check-tbl-appr-can2', function(){
  	var pushi = [];
  	for (var i = 0; i < tbl_appibam2.data().length; i++) {
  		if ($('#check-tbl-appribamlist'+i).is(":checked")) {  
  			pushi.push(i);

  		}
  	}

  	if(pushi.length == 1){
  		$('#btn-hist-ibam-can2').prop('disabled',false);
  		$('#slc-appibam-status').prop('disabled',false);
  		$('#btn-detail-appribam').prop('disabled',false);
  		$('#tt-appibam').prop('disabled',false);
  		$('#div-appr-status').removeClass('has-error');
  		$('#div-reason-appr').removeClass('has-error');
  	}else if(pushi.length > 1){
  		$('#slc-appibam-status').prop('disabled',false);
  		$('#btn-detail-appribam').prop('disabled',false);
  		$('#tt-appibam').prop('disabled',false);
  		$('#btn-hist-ibam-can2').prop('disabled',true);
  		$('#div-appr-status').removeClass('has-error');
  		$('#div-reason-appr').removeClass('has-error');
  	}else{
  		$('#btn-hist-ibam-can2').prop('disabled',true);
  		$('#slc-appibam-status').prop('disabled',true);
  		$('#btn-detail-appribam').prop('disabled',true);
  		$('#tt-appibam').prop('disabled',true);
  		$('#div-appr-status').removeClass('has-error');
  		$('#div-reason-appr').removeClass('has-error');
  		$('#slc-appibam-status').val(0);
  		$('#tt-appibam').val('');
  	}
  });

  $('#div-table-job').on('click','#chk-all-app-ibam',function(){
  	var pushi1 = [];
  	if($('#chk-all-app-ibam').is(':checked')){
  		for (var i = 0; i < tbl_appibam2.rows().data().length; i++) {
  			if ($('#check-tbl-appribamlist'+i+'').prop('disabled') === false) {
  				$('#check-tbl-appribamlist'+i+'').prop('checked',true);
  				$('#slc-appibam-status').prop('disabled',false);
  				$('#btn-detail-appribam').prop('disabled',false);
  				$('#tt-appibam').prop('disabled',false);
  				$('#div-appr-status').removeClass('has-error');
  				$('#div-reason-appr').removeClass('has-error');
  				pushi1.push(i);
  			}
  		}

  		if(pushi1.length == 1){
  			$('#btn-hist-ibam-can2').prop('disabled',false);
  		}else{
  			$('#btn-hist-ibam-can2').prop('disabled',true);
  		}

  	} else {
  		$('.check-tbl-appr-can2').prop('checked',false);
  		$('#slc-appibam-status').prop('disabled',true);
  		$('#btn-detail-appribam').prop('disabled',true);
  		$('#btn-hist-ibam-can2').prop('disabled',true);
  		$('#tt-appibam').prop('disabled',true);
  		$('#div-appr-status').removeClass('has-error');
  		$('#div-reason-appr').removeClass('has-error');
  		$('#slc-appibam-status').val(0);
  		$('#tt-appibam').val('');
  	}
  });

  $('#btn-hist-ibam-can2').click(function(){

  	var br_id = "";
  	var registrasi = "";

  	if($('input:checkbox:checked').not("#chk-all-app-ibam").length < 1){
  		alert_info('Tidak Ada Data yang dipilih !');
  	}else {

  		for (var i = 0; i < tbl_appibam2.rows().data().length; i++) {

  			if ($('#check-tbl-appribamlist'+i).is(":checked")) {
  				registrasi = tbl_appibam2.rows().data()[i][1];
  				var b_tbl = tbl_appibam2.rows().data()[i][2];
  				br_id = b_tbl.substr(0,4);

  			}	

  		}
  		history_ibam(registrasi,br_id);	
  	}


  })

  $('#btn-save-appribam123').click(function(){
  	var arrSaveC2 = [];

  	if($('#slc-job-appribam').val() == ''){
  		alert_info('Silahkan Pilih Job terlebih dahulu');
  		$('#div-jobibam').addClass('has-error');
  	}else if($('input:checkbox:checked').not("#chk-all-app-ibam").length < 1){
  		alert_info('Tidak Ada Data yang dipilih !');
  	}
  	else{

  		$('#div-jobibam').removeClass('has-error');
  		var apprdate = $('#inp-appibam-date').val();

  		var stat = $('#slc-appibam-status').val();
  		var apprstat = stat.substr(0,4);
  		var tt = $('#tt-appibam').val();
  		var reason = tt.toUpperCase();

  		for (var i = 0; i < tbl_appibam2.rows().data().length; i++) {

  			if ($('#check-tbl-appribamlist'+i).is(":checked")) {
  				var b_tbl = tbl_appibam2.rows().data()[i][2];
  				var branch = b_tbl.substr(0,4);
  				var d_tbl  = tbl_appibam2.rows().data()[i][3];
  				var branch_new = d_tbl.substr(0,4);

  				if($('#inp-level-appibam').val() == '2' && (tbl_appibam2.rows().data()[i][5] == null || tbl_appibam2.rows().data()[i][6] == null)){
  					alert_info('Approval Sebelumnya belum lengkap pada no Register ' +tbl_appibam2.rows().data()[i][1]);
  					return false;
  				}else if($('#inp-level-appibam').val() == '3' && (tbl_appibam2.rows().data()[i][7] == null || tbl_appibam2.rows().data()[i][8] == null)){
  					alert_info('Approval Sebelumnya belum lengkap pada no Register ' +tbl_appibam2.rows().data()[i][1]);
  					return false;
  				}else if($('#slc-appibam-status option:selected').val() == '0'){
  					alert_info('Approval status/reason belum diisi');
  					$('#div-appr-status').addClass('has-error');
  				}else if(apprdate == ''){
  					alert_info('Approval date tidak boleh kosong');
  					$('#div-inp-appr-date').addClass('has-error');
  				}else if(reason == ''){
  					alert_info('Approval status/reason belum diisi');
  					$('#div-reason-appr').addClass('has-error');
  				}else{
  					flag = 0;
  					apprdate = new Date(apprdate).format("yyyy-mm-dd");

  					if ($('#inp-level-appibam').val() == '1' && branch == arrBm[0].branch_area) {
  						$('#inp-appid123-appibam').val('2');
  					} else if($('#inp-level-appibam').val() == '1' && branch_new == arrBm[0].branch_area){
  						$('#inp-appid123-appibam').val('3');
  					}

  				}

  				arrSaveC2.push({
  					level : $('#inp-level-appibam').val(),
  					apprid : $('#inp-appid123-appibam').val(),
  					branch : branch,
  					branch_new : branch_new,
  					reg : tbl_appibam2.rows().data()[i][1],
  					zip : '',
  					szip : '',
  					apprdate : apprdate,
  					apprstat : apprstat,
  					reason : reason
  				})
				//}

			}
			
		}
		
		if (stat == 'APPR') {
			stat = "Approval"
		} else {
			stat = "Reject"
		}

		if (flag == 0) {
			alert_confirm("Apakah anda yakin akan melakukan "+stat+ " terhadap data tersebut ?", function(){
				save_approval_ibam(arrSaveC2);
			});
		}


	}
});

  $('#btn-detail-appribam').click(function(){

  	var arrCsv = [];
  	var register = '';
  	var scrCab = '';
  	var destCab = '';

  	for (var i = 0; i < tbl_appibam2.rows().data().length; i++) {
  		if ($('#check-tbl-appribamlist'+i).is(":checked")) {
  			var no_register = tbl_appibam2.rows().data()[i][1];
  			var b_tbl = tbl_appibam2.rows().data()[i][2];
  			var b_tbl2 = tbl_appibam2.rows().data()[i][3];
  			var branch = b_tbl.substr(0,4);
  			scrCab = b_tbl;
  			destCab = b_tbl2;
  			scrCab = scrCab.substring(scrCab.indexOf("-")+1,scrCab.length).trim();
  			destCab = destCab.substring(destCab.indexOf("-")+1,destCab.length).trim();
  			arrCsv.push({
  				register : no_register,
  			});
  		}

  	}

  	for (var i = 0; i < arrCsv.length; i++) {
  		register = register+arrCsv[i].register+'#';
  	}
  	register = register.substring(0,register.length-1);

  	if(arrCsv.length > 1){
  		scrCab = '';
  		destCab = '';
  	}

  	generate_csv_kontrak(register,scrCab,destCab);

  });

  $('#slc-job-appribam').change(function(){

    var apprid = $('#slc-job-appribam').val();
    for (var i = 0; i < arrJob.length; i++) {
      if(arrJob[i].apprid == apprid){
       $('#inp-level-appibam').val(arrJob[i].level);
       $('#inp-appid123-appibam').val(arrJob[i].apprid);
     }
   }
   var level = $('#inp-level-appibam').val();
   if($('#slc-job-appribam').val() == ''){
    tbl_appibam2.clear().draw(); 
  }else if (level == 1) {
    var apid = '';
    if(arrBm.length == 0){
      return;
    }else{
      getListApprIbam(arrBm,level,apid);
    }
  } else {
    if(dataArea.length == 0){
      return;
    }else{
      getListApprIbam(dataArea,level,apprid);
    }
  }

});

  $('#APIB').on('click',function(){
  	$('#loading-ajax').show();
  });

 //================================================================== Function ============================================================= 

 if (localStorage.getItem("menu_alias_am") === "APIB") {
 	if(check_session()=== 'false'){
 		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
 			localStorage.clear();
 			window.location.href = base_url + "Controller_login/login_view";
 		});
 	}else{
 		arrAll = [];

 		$.ajax({
 			url: base_url + "Controller_approval_ibam/privillage_job",
 			cache: false,
 			success: function(response){

 				try{
 					console.log(response);
 					var data = $.parseJSON(response);
 					dataArea = [];
 					dataJob=[];
 					arrBm = [];
 					arrArea = [];
 					var job = '';

 					for (var i = 0; i < data[1].length; i++) {
 						var sbtArea = data[1][i].branch_code;
 						sbtArea = sbtArea.substr(0,2);

 						arrArea.push({
 							branch_area : data[1][i].branch_code
 						})

 						if(sbtArea == '00'){
 							dataArea.push({
 								branch_area : data[1][i].branch_code
 							});
 						}else{
 							arrBm.push({
 								branch_area : data[1][i].branch_code
 							})
 						}

 						console.log(data[1][i].branch_name);
 					}
 					for (var i = 0; i < data[0].length; i++) {
 						dataJob.push({
 							job : data[0][i].job_desc
 						});
 					}

 					for (var i = 0; i < dataJob.length; i++) {
 						job = job+dataJob[i].job+'#';
 					}
 					job = job.substring(0,job.length-1);

 					login_ibam_appr(job);

 				}catch(e){
 					$('#loading-ajax').hide();
 					console.log(e);
 					alert_error("Terjadi Kesalahan => "+e);
 				}

 			},
 			error: function(response){
 				console.log(response);
 				alert_error('Error Connection');
 			}
 		});

 		appr_job();

 	}

 }

 function login_ibam_appr(job){
 	$.ajax({
 		'url' :'Controller_approval_ibam/log_approval_ibam',
 		'type' :'POST',
 		'data' : {
 			job
 		},

 		success : function(response){

 			arrJob = [];
 			try{
 				console.log(response);

 				var v = $.parseJSON(response);

 				flag = 1;
 				for (var i = 0; i < v['data'].length; i++) {
 					arrJob.push({
 						'job' : v['data'][i].job,
 						'apprid' : v['data'][i].appid,
 						'level' : v['data'][i].level
 					});

 				}

 				if(arrJob.length < 1 ){
 					alert_error('User Tidak Masuk dalam Approval Branch Setting Approval IBAM');
 					$('#content-canvas1-appibam').prop('hidden');
 					$('#content-canvas2-appibam').prop('hidden');
 					flag = 0;
 				}else if(arrJob.length == 1 && v['data'][0].level == 0){
 					alert_error('Anda tidak berhak mengakses menu ini');
 					$('#content-canvas1-appibam').prop('hidden');
 					$('#content-canvas2-appibam').prop('hidden');
 					flag = 0;
 				}else if(arrJob.length > 1){
          $('#content-canvas2-appibam').removeProp('hidden');
          $('#div-job-appribam').removeProp('hidden');
          $('<option/>').val('').html('- PILIH JOB -').appendTo('#slc-job-appribam').addClass('form-control');

          for (var i = 0; i < arrJob.length; i++) {
           if(arrJob[i].job == 'ARH'){
            continue;
          }
          $('#slc-job-appribam').append('<option value="'+ arrJob[i].apprid+'">'+arrJob[i].job+'</option>');

        }

        flag = 0;

        var arrTable = [];
        arrTable.push({
          branch_area : '9999'
        })
        getListApprIbam(arrTable,1,2);

        tbl_appibam2.clear().draw(); 

      }else{
        $('#inp-level-appibam').val(arrJob[0].level);
        $('#inp-appid123-appibam').val(arrJob[0].apprid);
        flag = 1;
      }


      if(flag == 1){
        var level = $('#inp-level-appibam').val();
        var apid = $('#inp-appid123-appibam').val();
        getListApprIbam(arrArea,level,apid);
      }
    }catch(e){
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Terjadi Kesalahan => "+e);
   }

 },error:function(response){
  alert_error('Error Connection');

}

});
 }

 function getListApprIbam(dataArea,level,appid){

 	$.ajax({
 		'url' : 'Controller_approval_ibam/list_appr_ibam',
 		'type': 'POST',
		//dataType: 'json',
		data: {
			dataArea,level,appid
		},
		success : function(response){
			try{
				var response = $.parseJSON(response);
				if (response['status'] == true) {
					$('#content-canvas1-appibam').prop('hidden');
					$('#content-canvas2-appibam').removeProp('hidden');
					$('#div-jobibam').removeClass('has-error');
					var appibam2 = [];
					arrCbng = [];
					tbl_appibam2.clear().draw(); 
					for (var i = 0; i < response['data'].length; i++) {

						var pr_date =  response['data'][i].apprdate;
						pr_date = new Date(pr_date).format("dd-mmm-yyyy");

						appibam2.push([
							'<input class="check-tbl-appr-can2" id="check-tbl-appribamlist'+i+'" type="checkbox">',
							response['data'][i].no_reg,
							response['data'][i].branch + '-' + response['data'][i].branch_name ,
							response['data'][i].branch_new + '-' + response['data'][i].branch_new_name, 
							pr_date,
							response['data'][i].bm_src,
							response['data'][i].bm_dst,
							response['data'][i].aom,
							response['data'][i].arm,
							response['data'][i].rdh_src,
							//response['data'][i].rdh_dst,
							response['data'][i].odh,
							response['data'][i].cdh


							]);

					}

					// arrCbng.push({
					// 	'cabang' : response['cabang']
					// })
					
					
					tbl_appibam2.rows.add(appibam2).draw();

					for (var i = 0; i < tbl_appibam2.data().length; i++) {
						if (tbl_appibam2.data()[i].includes("REJC")) {
							document.getElementById("id-tbl-appibam-can2").getElementsByTagName("tr")[i+1].style.backgroundColor = "rgb(241, 241, 241)"; 
						} 
					}

					$("#id-tbl-appibam-can2 td:contains('REJC')").html("Reject")
					$("#id-tbl-appibam-can2 td:contains('APPR')").html("Approve")

					var level = $('#inp-level-appibam').val();

					for (var i = 0; i < tbl_appibam2.rows().data().length; i++) {
						var b_tbl = tbl_appibam2.rows().data()[i][2];
						var branch = b_tbl.substr(0,4);
						var d_tbl  = tbl_appibam2.rows().data()[i][3];
						var branch_new = d_tbl.substr(0,4);

						

						if ((level == 1 && arrBm[0].branch_area == branch) && tbl_appibam2.rows().data()[i][5] != null)  {
							$('#check-tbl-appribamlist'+i).prop('disabled',true);

						}else if ((level == 1 && arrBm[0].branch_area == branch_new) && tbl_appibam2.rows().data()[i][6] != null)  {
							$('#check-tbl-appribamlist'+i).prop('disabled',true);

						}else if ( tbl_appibam2.rows().data()[i][7] != null && $('#inp-appid123-appibam').val() == 4)  {
							$('#check-tbl-appribamlist'+i).prop('disabled',true);

						}else if( tbl_appibam2.rows().data()[i][8] != null && $('#inp-appid123-appibam').val()== 5){
							$('#check-tbl-appribamlist'+i).prop('disabled',true);

						}else if( tbl_appibam2.rows().data()[i][9] != null && $('#inp-appid123-appibam').val() == 6){
							$('#check-tbl-appribamlist'+i).prop('disabled',true);

						}else if( tbl_appibam2.rows().data()[i][10] != null && $('#inp-appid123-appibam').val() == 7){
							$('#check-tbl-appribamlist'+i).prop('disabled',true);

						}else if( tbl_appibam2.rows().data()[i][11] != null && $('#inp-appid123-appibam').val() == 8){
							$('#check-tbl-appribamlist'+i).prop('disabled',true);

						}
						
					}
				}
			}catch(e){
				console.log(e);
				alert_error('Terjadi kesalahan =>'+e);
				tbl_appibam2.clear().draw(); 
			}
		},error:function(response){
			alert_error('Error Connection');
			tbl_appibam2.clear().draw(); 

		}

	})
 }

 function save_approval_ibam(arrayData){

 	$.ajax({
 		'url' :'Controller_approval_ibam/confirm_appr_ibam',
 		'type' :'POST',
 		'data' : {
 			arrayData
 		},
 		success : function(response){

      try{
       console.log(response);

       var v = $.parseJSON(response);
       var level = $('#inp-level-appibam').val();
       var apid = $('#inp-appid123-appibam').val();
       if(v['status'] == '200'){
        var status = $('#slc-appibam-status').val();
        var jobs = $('#slc-job-appribam').val();
        if(status=='APPR'){
         status = 'Approve';
       }else{
         status = 'Reject';
       }
       alert_info('Data Berhasil di '+ status, function(){
         if(arrJob.length > 1){
          if(jobs <= 3){
           getListApprIbam(arrBm,level,apid);
         }else{
           getListApprIbam(dataArea,level,apid);
         }
       }else{

        getListApprIbam(arrArea,level,apid);
      }

    });

       $('#div-appr-status').removeClass('has-error');
       $('#div-inp-appr-date').removeClass('has-error');
       $('#div-reason-appr').removeClass('has-error');
       $('#slc-appibam-status').prop('disabled',true);
       $('#tt-appibam').prop('disabled',true);
       $('#btn-detail-appribam').prop('disabled',true);
       $('#btn-hist-ibam-can2').prop('disabled',true);
       flag = 1;

     }else {
      alert_error(v['message']);
      $('#div-appr-status').removeClass('has-error');
      $('#div-inp-appr-date').removeClass('has-error');
      $('#div-reason-appr').removeClass('has-error');
      flag = 0;
    }
  }catch(e){
   $('#loading-ajax').hide();
   console.log(e);
   alert_error("Terjadi Kesalahan => "+e);
 }
},error:function(response){
  alert_error("Konekasi terputus, Tidak Terhubung Dengan Server");

}

})
 }

 function appr_job(){
 	var job = '';

 	$.ajax({
 		'url' :'Controller_approval_ibam/approval_job_ibam',
 		'type' :'POST',
 		'data' :{job},
 		success : function(response){
 			try{
 				console.log(response);

 				var v = $.parseJSON(response);
 				var djob = [];
 				var row_dtable = new Array();


 				for (var i = 0; i < v["data"].length; i++) {

 					row_dtable += "<th>" + v["data"][i].job + "</th>";
 				}

 				var input ='<input class="checks-app-ibam" id="chk-all-app-ibam" type="checkbox">';

 				var row_tableFull = "<th>"+input+"</th>"+"<th>"+"Register"+"</th>"+"<th>"+"Cabang Asal"+"</th>"+"<th>"+ "Cabang Tujuan"+"</th>"+"<th>"+"Proses Terakhir"+"</th>"+row_dtable;

 				$('#div-table-job').empty();
 				$('#div-table-job').append('<table id="id-tbl-appibam-can2" class="table" width="100%"><thead><tr>' + row_tableFull + '</tr></thead></table>');
 				tbl_appibam2 = $('#id-tbl-appibam-can2').DataTable({
 					"responsive":     true,
					"ordering" : false,
 					"scrollY":        "70vh",
 					"scrollCollapse": true,
 					"paging":         false,
 				});

 				if($(tbl_appibam2.column(5).header()).html() == 'KCB ASAL'){
 					$(tbl_appibam2.column(5).header()).html('KCB Asal');
 				}
 				if($(tbl_appibam2.column(6).header()).html() == 'KCB TUJUAN'){
 					$(tbl_appibam2.column(6).header()).html('KCB Tujuan');
 				}

 			}catch(e){
 				$('#loading-ajax').hide();
 				console.log(e);
 				alert_error("Terjadi Kesalahan => "+e);
 			}

 		},error:function(response){
 			alert_error('Error Connection');

 		}
 	})
 }

 function generate_csv_kontrak(register,cabAwal,cabDest){

 	var ket_status ;
 	var today = new Date();
 	var dd = today.getDate();
 	var mm = today.getMonth()+1; 
 	var yyyy = today.getFullYear();
 	today = mm + '-' + dd + '-' + yyyy;
 	var time = new Date();
 	var s = time.getSeconds();
 	var m = time.getMinutes();
 	var h = time.getHours();
 	time = h+'.'+m+'.'+s;

 	$.ajax({
 		url: base_url + "Controller_approval_ibam/get_Csv_Kontrak",
 		dataType: 'text',
 		type: 'POST',
 		data:{register},
 		cache: false,
 		success: function(response){   

 			if(response) {
 				try {
 					console.log("ajax response success"); 
 					console.log(response);
 					var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                        //window.open(uri, 'test.csv');
                        var downloadLink = document.createElement("a");
                        downloadLink.href = uri;
                        
                        downloadLink.download = 'IBAM'+' '+cabAwal+ '-' +cabDest+'.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                      }catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Terjadi Kesalahan => " + e);
                  }
                }else{
                 alert_error(response);
               }  

             },
             error:function(response){
               console.log(response);
               alert_error(response);
             }
           });
 }