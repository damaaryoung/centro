<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AsetDokumenPinjamController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
		$this->load->model('AsetDokumenModel/AsetDokumenPinjamModel');
       
	}

	/// START DISPLAY CONTROL///
	public function displayDetails(){
		$nomorAgunan 	= $this->input->post('nomorAgunan');
		$nomorRefAgunan = $this->input->post('nomorRefAgunan');
		$agunanID		= $this->input->post('agunanID');

		$data['getJaminanHeader']			= $this->AsetDokumenPinjamModel->getJaminanHeader($nomorAgunan , $nomorRefAgunan);
		$data['getJaminanDokument']			= $this->AsetDokumenPinjamModel->getJaminanDokument($agunanID, $nomorRefAgunan);

		
		echo json_encode($data);
		
	}
	public function getNotaris(){
		$data['getKodeNotaris']			= $this->AsetDokumenPinjamModel->getKodeNotaris();
		$getKodeNotaris = $this->AsetDokumenPinjamModel->getKodeNotaris();

		foreach ($getKodeNotaris as $row) :
			$nama = $row['nama'];
			$kota = $row['kota_notaris'];
			$alamat = $row['alamat_notaris'];
			
			$data1[]    = ['<tr> <td>'. $row['kode'] . '</td> <td>'
										. $row['nama']. '</td> <td>'
										. $row['flg_aktif'].'</td> <td>'
										. '<button type="button" class="btn btn-warning btn-sm btnPilihNotaris"
											 data-nama="'.$nama.'" 
											 data-kota="'.$kota.'" 
											 data-alamat="'.$alamat.'"
											style ="padding-left: 5px;"> Pilih </button> </td> </tr>'];
		endforeach;	
		
		echo json_encode($data1);
	}
	public function getJenisPengurusan(){
		$getJaminanPengurusan			= $this->AsetDokumenPinjamModel->getJaminanPengurusan();
		// $data				= $this->AsetDokumenPinjamModel->sysdate();
		foreach ($getJaminanPengurusan as $row) :
			$kode = $row['kode'];
			$nama = $row['nama'];
			$keterangan = $row['keterangan'];
			$flag = $row['flg_aktif'];
			$sysdate =  $row['sysdate'];
			
			
			$data1[]    = ['<tr> <td>'. $kode .'</td> <td>'
							. $nama .'</td> <td>'
							. $keterangan.'</td> <td>'
							. $flag .'</td> <td>'
							. '<button type="button" class="btn btn-warning btn-sm btnPiliJenis"
								data-nama="'.$nama.'" 
								data-keterangan="'.$keterangan.'" 
								data-sysdate ="'.$sysdate.'"
								style ="padding-left: 5px;"> Pilih </button> </td> </tr>'];
		endforeach;	


		echo json_encode($data1);
		 //['date'=> $data,
	}
	public function pinjamData(){
		$mainAreaKerjaPinjam        = $this->input->post('mainAreaKerjaPinjam');
		$mainTanggalPinjam          = $this->input->post('mainTanggalPinjam');
		$mainTransaksiPinjam        = $this->input->post('mainTransaksiPinjam');
		$mainNamaPinjam             = $this->input->post('mainNamaPinjam');
		$mainKeteranganPinjam       = $this->input->post('mainKeteranganPinjam');
		$mainAlamatPinjam           = $this->input->post('mainAlamatPinjam');
		$mainKotaPinjam             = $this->input->post('mainKotaPinjam');
		$mainJenisPengurusanPinjam  = $this->input->post('mainJenisPengurusanPinjam');
		$mainNomorRekeningPinjam 	= $this->input->post('mainNomorRekeningPinjam');
		$mainTanggalRealisasiPinjam = $this->input->post('mainTanggalRealisasiPinjam');
		$mainIdPinjam				= $this->input->post('mainIdPinjam');
		$jenisJaminanPinjam			= $this->input->post('jenisJaminanPinjam');
		$rodaKendaraanPinjam		= $this->input->post('rodaKendaraanPinjam');
		$verifikasi					= $this->input->post('verifikasi');
		$mainTanggalRencanaKembaliPinjam = $this->input->post('mainTanggalRencanaKembaliPinjam');
		$jaminanDokumentID 			= $this->input->post('jaminanDokumentID');

		$this->AsetDokumenPinjamModel->pinjamDokumen($mainIdPinjam,
																$mainTanggalPinjam,
																$mainNamaPinjam,
																$mainAlamatPinjam,
																$mainKotaPinjam,
																$jenisJaminanPinjam,
																$rodaKendaraanPinjam,
																$mainTransaksiPinjam, 
																$mainKeteranganPinjam, 
																$mainJenisPengurusanPinjam,
																$mainAreaKerjaPinjam,
																$mainNomorRekeningPinjam,
																$mainTanggalRealisasiPinjam,
																$verifikasi,
																$mainTanggalRencanaKembaliPinjam,
																$jaminanDokumentID);



		$data['mainAreaKerjaPinjam'] = $this->input->post('mainAreaKerjaPinjam');
		$data['mainTanggalPinjam'] =  $this->input->post('mainTanggalPinjam');
		$data['mainTransaksiPinjam'] =  $this->input->post('mainTransaksiPinjam');
		$data['mainNamaPinjam'] =  $this->input->post('mainNamaPinjam');
		$data['mainKeteranganPinjam'] = $this->input->post('mainKeteranganPinjam'); 
		$data['mainAlamatPinjam'] = $this->input->post('mainAlamatPinjam');
		$data['mainKotaPinjam'] = $this->input->post('mainKotaPinjam');
		$data['mainJenisPengurusanPinjam'] =  $this->input->post('mainJenisPengurusanPinjam');
		$data['mainNomorRekeningPinjam'] = $this->input->post('mainNomorRekeningPinjam');
		$data['mainTanggalRealisasiPinjam'] = $this->input->post('mainTanggalRealisasiPinjam');
		$data['mainIdPinjam'] = $this->input->post('mainIdPinjam');
		$data['jenisJaminanPinjam'] = $this->input->post('jenisJaminanPinjam');
		$data['rodaKendaraanPinjam'] = $this->input->post('rodaKendaraanPinjam');
		$data['verifikasi'] = $this->input->post('verifikasi');
		$data['mainTanggalRencanaKembaliPinjam'] = $this->input->post('mainTanggalRencanaKembaliPinjam');
		$data['jaminanDokumentID'] = $this->input->post('jaminanDokumentID');
		echo json_encode($data);

	}

}