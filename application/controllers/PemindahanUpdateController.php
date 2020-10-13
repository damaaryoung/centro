<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PemindahanUpdateController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('PemindahanLokasiJaminanModel/PemindahanUpdateModel');
       // $this->load->database('DB_NEWWEBTOOL', TRUE);
       
	}

	public function index(){
        $session                     = $this->session->userdata('nama');
		$kode_kantor                 = $this->session->userdata('kd_cabang');
		$tblID                       = $this->input->post('tblID');
		$tblNomor                    = $this->input->post('tblNomor');
		$data['js']                  = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']                 = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']              = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar']             = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']              = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar']             = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		$data['ModalJaminanDokumen'] = $this->load->view('ViewPemindahanLokasiJaminan/Insert/ModalJaminanDokumen.php', NULL, TRUE);

		$data['getNomor']            = $this->input->post('tblNomor');
		$data['getId']               = $this->input->post('tblID');
		if($session != ''){
			$getJaminanPemindahanHeader = $this->PemindahanUpdateModel->getJaminanPemindahanHeader($tblNomor);
			foreach ($getJaminanPemindahanHeader as $row) :
				$data['nomor'] =  $row['nomor'];
				$data['tgl'] =  $row['tgl'];
				$data['kode_kantor_asal'] =  $row['kode_kantor_asal'];
				$data['kode_kantor_tujuan'] =  $row['kode_kantor_tujuan'];
				$data['ket'] =  $row['ket'];
				$data['verifikasi'] =  $row['verifikasi'];
				$data['lokasi_penyimpanan'] =  $row['lokasi_penyimpanan'];
			endforeach;	
			
			$data['selectKodeKantor'] = $this->PemindahanUpdateModel->selectKodeKantor();
			$data['getCentro'] = $this->PemindahanUpdateModel->getCentro();
			$this->load->view('ViewPemindahanLokasiJaminan/Update/PemindahanLokasiUpdate.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function getDataDetail(){
        
		$dataNomor                    = $this->input->post('dataNomor');
		$getPemindahanJaminanDetail   = $this->PemindahanUpdateModel->getPemindahanJaminanDetail($dataNomor);
		
		foreach ($getPemindahanJaminanDetail as $row) :
			$data[]    = ['<tr> <td>'. $row['no_reff'] . '</td> <td>'
										. $row['agunan_id'] . '</td> <td>'
										. $row['jenis'] .'</td> <td>'
										. $row['deskripsi_ringkas'] .'</td> <td>'
										. '<button type="button" class="btn btn-danger btn-sm btnDeleteJaminanData" style ="padding-left: 5px;"'
										.           'data-nomorreff="'.$row['no_reff'].'"'
										.           'data-agunanid="'.$row['agunan_id'] .'"'
										.           'data-jenis="'. $row['jenis'] .'"'
										.           'data-deskripsi="'.$row['deskripsi_ringkas'].'"'
										.           'name="btnDeleteJaminanData">' 
										.           '<i style="padding-left: 5px;" class="fa fa-trash"></i> </button>  </td> </tr>',$row['no_reff'], $row['agunan_id']];

		endforeach;	
		echo json_encode($data);
	}
	public function updatePemindahanLokasiJaminan(){
		
	}
}