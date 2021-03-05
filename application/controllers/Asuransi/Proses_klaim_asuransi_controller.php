
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Proses_klaim_asuransi_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        //$this->load->model('AsuransiModel/Rekap_titipan_asuransi_model');
       
    }
    public function index(){
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){
			$this->load->view('ViewAsuransi/proses_klaim_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
}