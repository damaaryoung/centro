<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PemindahanUpdateController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('PemindahanLokasiJaminanModel/PemindahanUpdateModel');
       // $this->load->database('DB_NEWWEBTOOL', TRUE);
       
	}

	public function index(){
        $session = $this->session->userdata('nama');
		$kode_kantor = $this->session->userdata('kd_cabang');
		$tblID = $this->input->post('tblID');
		$tblNomor = $this->input->post('tblNomor');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		$data['ModalJaminanDokumen'] = $this->load->view('ViewPemindahanLokasiJaminan/Insert/ModalJaminanDokumen.php', NULL, TRUE);

		if($session != ''){
            $data['getPemindahanJaminanDetail'] = $this->PemindahanUpdateModel->getPemindahanJaminanDetail($tblNomor);
            $data['selectKodeKantor'] = $this->PemindahanUpdateModel->selectKodeKantor();
			$this->load->view('ViewPemindahanLokasiJaminan/Update/PemindahanLokasiUpdate.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
    }
}