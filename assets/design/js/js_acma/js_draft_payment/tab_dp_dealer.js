$('#datatable-deal-pph').hide();

var table_dp_dealer = $('#table-dp-dealer').DataTable({
  responsive: true,
    "columnDefs": [
    { "width": "10%", "targets": 0 }
  ]
});


var table_dp_deal_pph = $('#table-dp-deal-pph').DataTable({
  responsive: true,
    "columnDefs": [

    { "width": "10%", "targets": 0 }
  ]
});


var option_value = $('#slc-dp-sd-class-code').val();
$('#slc-dp-sd-class-code').on('change', function() { 	
 console.log(this.value);
 if (this.value === 'b_adm_dlr') {
 	console.log('b_adm_dlr');
 	$('#datatable-deal-pph').hide();
 	$('#datatable-dealer').show();
 } else if (this.value === 'b_hd_cb'){
 	console.log('b_hd_cb');
 	// $('#').css()
 	$('#datatable-dealer').hide();
 	$('#datatable-deal-pph').show();
 }


});








