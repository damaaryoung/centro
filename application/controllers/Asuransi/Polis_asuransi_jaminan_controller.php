
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Polis_asuransi_jaminan_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Polis_asuransi_jaminan_model');
       
    }
    public function main_view_polis_asuransi_jaminan(){
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){
			$this->load->view('ViewAsuransi/polis_asuransi_jaminan_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function get_data_polis_jaminan(){
		$sysdate       = $this->Polis_asuransi_jaminan_model->sysdate();
		$rekap_jaminan = $this->Polis_asuransi_jaminan_model->get_data_polis_jaminan($sysdate);

		$data['sysdate']       = $sysdate;
		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function get_data_detail(){
		$rekening           = $this->input->post('rekening');
		$agunanid           = $this->input->post('agunanid');
		$nasabahid          = $this->input->post('nasabahid');
		$no_reff_asuransi   = $this->input->post('no_reff_asuransi');
		$no_reff_jaminan    = $this->input->post('no_reff_jaminan');
		$menu_kode          = $this->input->post('menu_kode');

		$jenis_asuransi = 'JAMINAN';
		
		$data_details = $this->Polis_asuransi_jaminan_model->get_data_detail($rekening,$jenis_asuransi);

		$data['data_details']       = $data_details;
		echo json_encode($data);

	}

	public function polis_jaminan_process(){
		$modal_no_polis     = $this->input->post('modal_no_polis');
		$rekening           = $this->input->post('rekening');
		$jenis_asuransi = 'JAMINAN';

		$proses = $this->Polis_asuransi_jaminan_model->polis_jaminan_process($modal_no_polis,$rekening,$jenis_asuransi);
		
		
		$data['proses']       = $proses;
		echo json_encode($data);
	}
}