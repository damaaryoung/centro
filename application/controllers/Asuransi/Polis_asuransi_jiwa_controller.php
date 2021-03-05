
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Polis_asuransi_jiwa_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Polis_asuransi_jiwa_model');
       
    }
    public function main_view_polis_asuransi_jiwa(){
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){
			$this->load->view('ViewAsuransi/polis_asuransi_jiwa_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function get_data_polis_jiwa(){
		$date       = $this->Polis_asuransi_jiwa_model->sysdate();
		$rekap_jaminan = $this->Polis_asuransi_jiwa_model->get_data_polis_jiwa($date);

		$data['sysdate']       = $date;
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

		$jenis_asuransi = 'JIWA';
		
		$data_details = $this->Polis_asuransi_jiwa_model->get_data_detail($rekening,$jenis_asuransi);

		$data['data_details']       = $data_details;
		echo json_encode($data);

	}
	public function polis_jiwa_process(){
		$modal_no_polis     = $this->input->post('modal_no_polis');
		$modal_status_endorsement  = $this->input->post('modal_status_endorsement');
		$rekening           = $this->input->post('rekening');
		$jenis_asuransi = 'JIWA';
		$userID                = $this->session->userdata('nik');
		$proses = $this->Polis_asuransi_jiwa_model->polis_jiwa_process($modal_no_polis,$modal_status_endorsement,$rekening,$jenis_asuransi,$userID);
		
		
		$data['proses']       = $proses;
		echo json_encode($data);
	}
	public function search_periode(){
		$date       = $this->input->post('src_periode');
		$rekap_jaminan = $this->Polis_asuransi_jiwa_model->get_data_polis_jiwa($date);

		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function get_search(){
		$search       = $this->input->post('src_search');
		$rekap_jaminan = $this->Polis_asuransi_jiwa_model->get_search($search);

		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
}