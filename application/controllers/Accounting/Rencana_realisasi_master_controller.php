
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rencana_realisasi_master_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AccountingModel/Rencana_realisasi_master_model');
       
    }
    public function index(){
        $session             = $this->session->userdata('nama');
        $data['kode_kantor'] = $this->session->userdata('kd_cabang');
        $data['divisi_id']   = $this->session->userdata('divisi_id');
		$data['js']          = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']         = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']      = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar']     = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']      = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar']     = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){
			$this->load->view('ViewAccounting/rencana_realisasi_master_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	public function get_jenis(){
		$sysdate = $this->Rencana_realisasi_master_model->sysdate();
		$data['sysdate'] = $sysdate;
		echo json_encode($data);
	}
	public function get_data_rencana_realisasi_master(){
		$data_master = $this->Rencana_realisasi_master_model->get_master();
		$data['data_master'] = $data_master;
		echo json_encode($data);
	}
	public function insert_master(){
		$modal_jenis       = $this->input->post('modal_jenis');
		$modal_flag_mutasi = $this->input->post('modal_flag_mutasi');
		$modal_kode_perk = $this->input->post('modal_kode_perk');	
		$userID            = $this->session->userdata('userIdLogin');

		$data_details = $this->Rencana_realisasi_master_model->insert_master($modal_jenis,
																	$modal_flag_mutasi,
																	$modal_kode_perk,
																	$userID);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
	public function delete_master(){
		$jenis     = $this->input->post('jenis');

		$delete = $this->Rencana_realisasi_master_model->delete_rencana($jenis);

		$data['delete'] = $delete;
		echo json_encode($data);
	}
	public function get_details(){
		$jenis     = $this->input->post('jenis');
         $divisi_id      = $this->session->userdata('divisi_id');
		$data['data_detail']     = $this->Rencana_realisasi_master_model->get_details($jenis);
		echo json_encode($data);
	}
	public function update_master(){

		$modal_jenis_update       = $this->input->post('modal_jenis_update');
		$modal_flag_mutasi_update = $this->input->post('modal_flag_mutasi_update');
		$modal_kode_perk_update = $this->input->post('modal_kode_perk_update');
		$jenis                    = $this->input->post('jenis');
		$userID                   = $this->session->userdata('userIdLogin');
		$update = $this->Rencana_realisasi_master_model->update_rencana($modal_jenis_update,
		    														         $modal_flag_mutasi_update,
                                                                             $modal_kode_perk_update,
                                                                             $jenis,
		    														         $userID);
		$data['update'] = $update;
		echo json_encode($data);
	}

    public function search(){
		$search        = $this->input->post('src_search');
		$rekap_jenis = $this->Rencana_realisasi_master_model->get_search($search);
		$data['rekap_jenis'] = $rekap_jenis;
		echo json_encode($data);

	}
}