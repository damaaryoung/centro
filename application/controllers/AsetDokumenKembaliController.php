<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AsetDokumenKembaliController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
		$this->load->model('AsetDokumenModel/AsetDokumenKembaliModel');
       
	}

	/// START DISPLAY CONTROL///
	public function displayDetails(){
		$nomorAgunan 	= $this->input->post('nomorAgunan');
		$nomorRefAgunan = $this->input->post('nomorRefAgunan');
		$agunanID		= $this->input->post('agunanID');

		$data['getJaminanHeader']			= $this->AsetDokumenKembaliModel->getJaminanHeader($nomorAgunan , $nomorRefAgunan);
		$data['getJaminanDokument']			= $this->AsetDokumenKembaliModel->getJaminanDokument($agunanID, $nomorRefAgunan);
		$data['getJaminanHistory']	    	= $this->AsetDokumenKembaliModel->getJaminanHistory($nomorRefAgunan);

		
		echo json_encode($data);
		
	}
	
	public function kembaliDokumen(){
		$mainIdKembali 	                  = $this->input->post('mainIdKembali');
		$mainNomorKembali                 = $this->input->post('mainNomorKembali');
		$mainNoReffKembali		          = $this->input->post('mainNoReffKembali');
		$mainAreaKerjaKembali 		      = $this->input->post('mainAreaKerjaKembali');
		$mainTanggalKembali               = $this->input->post('mainTanggalKembali');
		$mainTransaksiKembali		      = $this->input->post('mainTransaksiKembali');
		$mainNamaKembali 	              = $this->input->post('mainNamaKembali');
		$mainKeteranganKembali            = $this->input->post('mainKeteranganKembali');
		$mainAlamatKembali		          = $this->input->post('mainAlamatKembali');
		$mainKotaKembali 	              = $this->input->post('mainKotaKembali');
		$mainJenisPengurusanKembali       = $this->input->post('mainJenisPengurusanKembali');
		$mainNomorRekeningKembali		  = $this->input->post('mainNomorRekeningKembali');
		$mainTanggalRealisasiKembali 	  = $this->input->post('mainTanggalRealisasiKembali');
		$jenisJaminanKembali 			  = $this->input->post('jenisJaminanKembali');
		$verifikasi						  = $this->input->post('verifikasi');
		$rodaKendaraanKembali 		      = $this->input->post('rodaKendaraanKembali');
		$mainTanggalRencanaKembali 		  = $this->input->post('mainTanggalRencanaKembali');
		$jaminanDokumentID				  = $this->input->post('jaminanDokumentID');


		$mainIdHistory                = $this->input->post('mainIdHistory');
		$mainNomorHistory             = $this->input->post('mainNomorHistory');
		$mainNoReffHistory            = $this->input->post('mainNoReffHistory');
		$mainAreaKerjaHistory         = $this->input->post('mainAreaKerjaHistory');
		$mainTanggalHistory           = $this->input->post('mainTanggalHistory');
		$mainTransaksiHistory         = $this->input->post('mainTransaksiHistory');
		$mainNamaHistory              = $this->input->post('mainNamaHistory');
		$mainKeteranganHistory        = $this->input->post('mainKeteranganHistory');
		$mainAlamatHistory            = $this->input->post('mainAlamatHistory');
		$mainKotaHistory              = $this->input->post('mainKotaHistory');
		$mainJenisPengurusanHistory   = $this->input->post('mainJenisPengurusanHistory');
		$mainNomorRekeningHistory     = $this->input->post('mainNomorRekeningHistory');
		$mainTanggalRealisasiHistory  = $this->input->post('mainTanggalRealisasiHistory');
		$jenisJaminanHistory          = $this->input->post('jenisJaminanHistory');
		$rodaKendaraanHistory         = $this->input->post('rodaKendaraanHistory');
		$mainTanggalRencanaHistory    = $this->input->post('mainTanggalRencanaHistory');
		$mainStatusHistory            = $this->input->post('mainStatusHistory');

		$data['model'] = $this->AsetDokumenKembaliModel->kembaliDokumen($mainIdHistory,
																		$mainNomorHistory, 
																		$mainNoReffHistory,
																		$mainAreaKerjaHistory, 
																		$mainTanggalHistory, 
																		$mainTransaksiHistory, 
																		$mainNamaHistory,
																		$mainKeteranganHistory,
																		$mainAlamatHistory, 
																		$mainKotaHistory, 
																		$mainJenisPengurusanHistory, 
																		$mainNomorRekeningHistory, 
																		$mainTanggalRealisasiHistory,
																		$jenisJaminanHistory, 
																		$rodaKendaraanHistory,
																		$mainTanggalRencanaHistory,
																		$mainStatusHistory ,
																		$mainTransaksiKembali,
																		$mainIdKembali,
																		$mainKeteranganKembali,
																		$mainTanggalRencanaKembali);

		
		// function(){
		// 	$data['mainIdHistory']                = $mainIdHistory;
		// 	$data['mainNomorHistory']             = $mainNomorHistory;
		// 	$data['mainNoReffHistory']            = $mainNoReffHistory;
		// 	$data['mainAreaKerjaHistory']         = $mainAreaKerjaHistory;
		// 	$data['mainTanggalHistory']           = $mainTanggalHistory;
		// 	$data['mainTransaksiHistory']         = $mainTransaksiHistory;
		// 	$data['mainNamaHistory']              = $mainNamaHistory;
		// 	$data['mainKeteranganHistory']        = $mainKeteranganHistory;
		// 	$data['mainAlamatHistory']            = $mainAlamatHistory;
		// 	$data['mainKotaHistory']              = $mainKotaHistory;
		// 	$data['mainJenisPengurusanHistory']   = $mainJenisPengurusanHistory;
		// 	$data['mainNomorRekeningHistory']     = $mainNomorRekeningHistory;
		// 	$data['mainTanggalRealisasiHistory']  = $mainTanggalRealisasiHistory;
		// 	$data['jenisJaminanHistory']          = $jenisJaminanHistory;
		// 	$data['rodaKendaraanHistory']         = $rodaKendaraanHistory;
		// 	$data['mainTanggalRencanaHistory']    = $mainTanggalRencanaHistory;
		// 	$data['mainStatusHistory']            = $mainStatusHistory;
	
	
		// 	$data['mainIdKembali']			          = $mainIdKembali;
		// 	$data['mainNomorKembali']			      = $mainNomorKembali;
		// 	$data['mainNoReffKembali']			      = $mainNoReffKembali;
		// 	$data['mainAreaKerjaKembali']	          = $mainAreaKerjaKembali;
		// 	$data['mainTanggalKembali']			      = $mainTanggalKembali;
		// 	$data['mainTransaksiKembali']		      = $mainTransaksiKembali;
		// 	$data['mainNamaKembali']			      = $mainNamaKembali;
		// 	$data['mainKeteranganKembali']		      = $mainKeteranganKembali;
		// 	$data['mainAlamatKembali']				  = $mainAlamatKembali;
		// 	$data['mainKotaKembali']				  = $mainKotaKembali;
		// 	$data['mainJenisPengurusanKembali']		  = $mainJenisPengurusanKembali;
		// 	$data['mainNomorRekeningKembali']		  = $mainNomorRekeningKembali;
		// 	$data['mainTanggalRealisasiKembali']	  = $mainTanggalRealisasiKembali;
		// 	$data['jenisJaminanKembali']			  = $jenisJaminanKembali;
		// 	$data['verifikasi']			              = $verifikasi;
		// 	$data['rodaKendaraanKembali']		      = $rodaKendaraanKembali;
		// 	$data['mainTanggalRencanaKembali'] = $mainTanggalRencanaKembali;
		// 	$data['jaminanDokumentID']			      = $jaminanDokumentID;

		// }
	

		echo json_encode($data);
	}
}