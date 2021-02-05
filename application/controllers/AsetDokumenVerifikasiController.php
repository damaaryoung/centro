<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AsetDokumenVerifikasiController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
		$this->load->model('AsetDokumenModel/AsetDokumenVerifikasiModel');
		$this->load->model('AsetDokumenModel/AsetDokumenUpdateModel');
       
	}

	/// START DISPLAY CONTROL///
	public function index(){
		$session = $this->session->userdata('nama');
		$kode_kantor = $this->session->userdata('kd_cabang');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		$data['selectKodeKantor'] = $this->AsetDokumenVerifikasiModel->selectKodeKantor();

		$data['VerifikasiMainModal'] = $this->load->view('ViewAsetDokumen/Verifikasi/VerifikasiMainModal.php', NULL, TRUE);
		$data['VerifikasiModalSertifikat'] = $this->load->view('ViewAsetDokumen/Verifikasi/VerifikasiDataSertifikat.php', NULL, TRUE);
		$data['VerifikasieModalBPKB'] = $this->load->view('ViewAsetDokumen/Verifikasi/VerifikasiDataBPKB.php', NULL, TRUE);
		$data['VerifikasiModalEmas'] = $this->load->view('ViewAsetDokumen/Verifikasi/VerifikasiDataEmas.php', NULL, TRUE);


		if($session != ''){
			$this->load->view('ViewAsetDokumen/MainViewVerifikasi.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function displayDetails(){
		$nomorAgunan 	= $this->input->post('nomorAgunan');
		$nomorRefAgunan = $this->input->post('nomorRefAgunan');
		$agunanID		= $this->input->post('agunanID');

		$data['getJaminanHeader']	 		= $this->AsetDokumenVerifikasiModel->getJaminanHeader($nomorAgunan , $nomorRefAgunan);
		$data['getJaminanDokument']			= $this->AsetDokumenVerifikasiModel->getJaminanDokument($agunanID, $nomorRefAgunan);
		$data['getJaminanSLIK']			= $this->AsetDokumenUpdateModel->getJaminanSLIK($agunanID);

		$data['nomorRefAgunan'] = $nomorRefAgunan;
		$data['agunanID'] = $agunanID;
		
		echo json_encode($data);
	}
	public function verifikasi(){
		
		$idHeader 			 = $this->input->post('idHeader');
		$nomorHeader		 = $this->input->post('nomorHeader');
		$noRefHeader		 = $this->input->post('noRefHeader');
		$verifHeader		 = $this->input->post('verifHeader');
		$idDokument  		 = $this->input->post('idDokument');
		$varIdAgunanDokument = $this->input->post('varIdAgunanDokument');
		$verifDokument		 = $this->input->post('verifDokument');

		$this->AsetDokumenVerifikasiModel->verifikasiHeader($idHeader,$verifHeader,$verifDokument,$varIdAgunanDokument,$idDokument);

		$data['idHeader'] 			 = $idHeader;
		$data['nomorHeader'] 		 = $nomorHeader;
		$data['noRefHeader']         = $noRefHeader;
		$data['verifHeader'] 		 = $verifHeader;
		$data['idDokument'] 		 = $idDokument;
		$data['varIdAgunanDokument'] = $varIdAgunanDokument;
		$data['verifDokument'] 		 = $verifDokument;
		echo json_encode($data);
	}
	public function getDataSearch(){
		$search 	= $this->input->post('search');
		$status     = $this->input->post('status');
        $kode_kantor = $this->input->post('kode_kantor');
		$searchlist = $this->AsetDokumenVerifikasiModel->searching($search,$status,$kode_kantor);
		if(count($searchlist) == 0){
			$data [] = '';
		}else{
			foreach ($searchlist as $row) :
				$nomor              = $row['nomor'];
				$tgl                = $row['tgl'];
				$nama               = $row['nama'];
				$alamat             = $row['alamat'];
				$jenis_jaminan      = $row['jenis_jaminan'];
				$status             = $row['status'];
				$kontrak_status     = $row['kontrak_status'];  
				
				
				$data[]    = 	['<tr> <td>'. $row['nomor'] . '</td> <td>'
											. $row['tgl']. '</td> <td>'
											. $row['nama'].'</td> <td>'
											. $row['alamat'] . '</td> <td>'
											. $row['jenis_jaminan']. '</td> <td>'
											. $row['status'].'</td> <td>'
											. $row['kontrak_status'].'</td> <td>'
											. $row['verifikasi'].'</td> <td>'
											. '<button type="button" class="btn btn-success btn-sm btnVerifikasi" style ="padding-left: 5px;"
														data-nomor="'.$row['nomor'].'"
														data-noref="'.$row['no_reff'].'" 
														data-status="'.$row['status'].'"
														data-id="'.$row['id'].'"
														data-agunanid="'.$row['agunan_id'].'"
														name="btnVerifikasi"> 
														<i style="padding-left: 5px;" class="fa fa-check"></i>
												</button>  </td> </tr>'];
												
										
			endforeach;	
		}
		echo json_encode($data);
	}

	public function getDataAwal(){
		$kode_kantor = $this->session->userdata('kd_cabang');
		
		$ListAssetVerifikasi = $this->AsetDokumenVerifikasiModel->listDokumenVerifikasi($kode_kantor);
		if(count($ListAssetVerifikasi) == 0){
			$data [] = '';
		}else{
			foreach ($ListAssetVerifikasi as $row) :
				$nomor              = $row['nomor'];
				$tgl                = $row['tgl'];
				$nama               = $row['nama'];
				$alamat             = $row['alamat'];
				$jenis_jaminan      = $row['jenis_jaminan'];
				$status             = $row['status'];
				$kontrak_status     = $row['kontrak_status'];  
				
				
				$data[]    = 	['<tr> <td>'. $row['nomor'] . '</td> <td>'
											. $row['tgl']. '</td> <td>'
											. $row['nama'].'</td> <td>'
											. $row['alamat'] . '</td> <td>'
											. $row['jenis_jaminan']. '</td> <td>'
											. $row['status'].'</td> <td>'
											. $row['kontrak_status'].'</td> <td>'
											. $row['verifikasi'].'</td> <td>'
											. '<button type="button" class="btn btn-success btn-sm btnVerifikasi" style ="padding-left: 5px;"
														data-nomor="'.$row['nomor'].'"
														data-noref="'.$row['no_reff'].'" 
														data-status="'.$row['status'].'"
														data-id="'.$row['id'].'"
														data-agunanid="'.$row['agunan_id'].'"
														name="btnVerifikasi"> 
														<i style="padding-left: 5px;" class="fa fa-check"></i>
												</button>  </td> </tr>'];
												
										
			endforeach;	
		}
		//$data['mantap'] = 'mantap';
		echo json_encode($data);
	}

	
		
    
    	
}