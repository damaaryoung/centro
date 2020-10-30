<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AsetDokumenPenyerahanController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
		$this->load->model('AsetDokumenModel/AsetDokumenPenyerahanModel');
		$this->load->model('AsetDokumenModel/AsetDokumenUpdateModel');
       
	}

	/// START DISPLAY CONTROL///
	public function displayDetails(){
		$nomorAgunan 	= $this->input->post('nomorAgunan');
		$nomorRefAgunan = $this->input->post('nomorRefAgunan');
		$agunanID		= $this->input->post('agunanID');
		$data_rekening  = $this->input->post('data_rekening');

		$data['getJaminanHeader']			= $this->AsetDokumenPenyerahanModel->getJaminanHeader($nomorAgunan , $nomorRefAgunan);
		$data['getJaminanDokument']			= $this->AsetDokumenPenyerahanModel->getJaminanDokument($agunanID, $nomorRefAgunan);
		$data['getJaminanSLIK']			= $this->AsetDokumenUpdateModel->getJaminanSLIK($agunanID);
		$data['validasiLokasiJaminan']		= $this->AsetDokumenPenyerahanModel->validasiLokasiJaminan($agunanID, $nomorRefAgunan);
		$data['validasSaldoRekening']		= $this->AsetDokumenPenyerahanModel->validasSaldoRekening($data_rekening);
		echo json_encode($data);
		
	}

	public function penyerahanData(){
		$mainAreaKerjaPenyerahan        = $this->input->post('mainAreaKerjaPenyerahan');
		$mainTanggalPenyerahan          = $this->input->post('mainTanggalPenyerahan');
		$mainTransaksiPenyerahan        = $this->input->post('mainTransaksiPenyerahan');
		$mainNamaPenyerahan             = $this->input->post('mainNamaPenyerahan');
		$mainKeteranganPenyerahan       = $this->input->post('mainKeteranganPenyerahan');
		$mainAlamatPenyerahan           = $this->input->post('mainAlamatPenyerahan');
		$mainKotaPenyerahan             = $this->input->post('mainKotaPenyerahan');
		$mainJenisPengurusanPenyerahan  = $this->input->post('mainJenisPengurusanPenyerahan');
		$mainNomorRekeningPenyerahan 	= $this->input->post('mainNomorRekeningPenyerahan');
		$mainTanggalRealisasiPenyerahan = $this->input->post('mainTanggalRealisasiPenyerahan');
		$mainIdPenyerahan				= $this->input->post('mainIdPenyerahan');
		$jenisJaminanPenyerahan			= $this->input->post('jenisJaminanPenyerahan');
		$rodaKendaraanPenyerahan		= $this->input->post('rodaKendaraanPenyerahan');
		$verifikasi					= $this->input->post('verifikasi');
		$mainTanggalRencanaKembaliPenyerahan = $this->input->post('mainTanggalRencanaKembaliPenyerahan');
		$jaminanDokumentID 			= $this->input->post('jaminanDokumentID');

		$this->AsetDokumenPenyerahanModel->PenyerahanDokumen($mainIdPenyerahan,
																$mainTanggalPenyerahan,
																$mainNamaPenyerahan,
																$mainAlamatPenyerahan,
																$mainKotaPenyerahan,
																$jenisJaminanPenyerahan,
																$rodaKendaraanPenyerahan,
																$mainTransaksiPenyerahan, 
																$mainKeteranganPenyerahan, 
																$mainJenisPengurusanPenyerahan,
																$mainAreaKerjaPenyerahan,
																$mainNomorRekeningPenyerahan,
																$mainTanggalRealisasiPenyerahan,
																$verifikasi,
																$mainTanggalRencanaKembaliPenyerahan,
																$jaminanDokumentID);



		$data['mainAreaKerjaPenyerahan'] = $this->input->post('mainAreaKerjaPenyerahan');
		$data['mainTanggalPenyerahan'] =  $this->input->post('mainTanggalPenyerahan');
		$data['mainTransaksiPenyerahan'] =  $this->input->post('mainTransaksiPenyerahan');
		$data['mainNamaPenyerahan'] =  $this->input->post('mainNamaPenyerahan');
		$data['mainKeteranganPenyerahan'] = $this->input->post('mainKeteranganPenyerahan'); 
		$data['mainAlamatPenyerahan'] = $this->input->post('mainAlamatPenyerahan');
		$data['mainKotaPenyerahan'] = $this->input->post('mainKotaPenyerahan');
		$data['mainJenisPengurusanPenyerahan'] =  $this->input->post('mainJenisPengurusanPenyerahan');
		$data['mainNomorRekeningPenyerahan'] = $this->input->post('mainNomorRekeningPenyerahan');
		$data['mainTanggalRealisasiPenyerahan'] = $this->input->post('mainTanggalRealisasiPenyerahan');
		$data['mainIdPenyerahan'] = $this->input->post('mainIdPenyerahan');
		$data['jenisJaminanPenyerahan'] = $this->input->post('jenisJaminanPenyerahan');
		$data['rodaKendaraanPenyerahan'] = $this->input->post('rodaKendaraanPenyerahan');
		$data['verifikasi'] = $this->input->post('verifikasi');
		$data['mainTanggalRencanaKembaliPenyerahan'] = $this->input->post('mainTanggalRencanaKembaliPenyerahan');
		$data['jaminanDokumentID'] = $this->input->post('jaminanDokumentID');
		echo json_encode($data);

	}


}