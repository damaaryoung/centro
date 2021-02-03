
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rekap_titipan_asuransi_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Rekap_titipan_asuransi_model');
       
    }

    public function view_rekap_jaminan(){
		$this->session->unset_userdata('menu_rekap_asuransi');
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		$data1['menu_rekap_asuransi']    = '1';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/rekap_titipan_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function view_rekap_jiwa(){
		$this->session->unset_userdata('menu_rekap_asuransi');
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		
		$data1['menu_rekap_asuransi']    = '2';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/rekap_titipan_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	public function get_data_rekap_jaminan(){
		$sysdate       = $this->Rekap_titipan_asuransi_model->sysdate();
		$rekap_jaminan = $this->Rekap_titipan_asuransi_model->get_data_rekap_jaminan($sysdate);

		$data['sysdate']       = $sysdate;
		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function get_data_rekap_jiwa(){
		$sysdate       = $this->Rekap_titipan_asuransi_model->sysdate();
		$rekap_jaminan = $this->Rekap_titipan_asuransi_model->get_data_rekap_jiwa($sysdate);

		$data['sysdate']       = $sysdate;
		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
}