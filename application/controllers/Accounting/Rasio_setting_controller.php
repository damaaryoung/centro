
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rasio_setting_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AccountingModel/Rasio_setting_model');
       
    }

    public function get_kode_kantor(){

		$kode_kantor = $this->Rasio_setting_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}
	public function get_sysdate(){

		$sysdate = $this->Rasio_setting_model->sysdate();

		$data['sysdate'] = $sysdate;
		echo json_encode($data);
	}

    // Rasio Setting
    public function rasio_setting(){
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
			$this->load->view('ViewAccounting/rasio_setting_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}

    public function get_data_rasio_setting(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_tgl_laporan = $this->input->post('src_tgl_laporan');
		
		$data_rasio = $this->Rasio_setting_model->get_data_rasio_setting($src_kode_kantor, $src_tgl_laporan);

		$data['data_rasio'] = $data_rasio;
		echo json_encode($data);
	}

    // Rasio Setting Master
    public function rasio_master(){
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
			$this->load->view('ViewAccounting/rasio_setting_master.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
    public function get_data_rasio_master(){
		$data_master = $this->Rasio_setting_model->get_master();
		$data['data_master'] = $data_master;
		echo json_encode($data);
	}
	public function insert_master(){
		$modal_jenis       = $this->input->post('modal_jenis');
		$modal_flag_mutasi = $this->input->post('modal_flag_mutasi');
		$modal_kode_perk1  = $this->input->post('modal_kode_perk1');
		$modal_kode_perk2  = $this->input->post('modal_kode_perk2');	
		$userID            = $this->session->userdata('userIdLogin');


		$data_details = $this->Rasio_setting_model->insert_master($modal_jenis,
                                                                        $modal_flag_mutasi,
                                                                        $modal_kode_perk1,
                                                                        $modal_kode_perk2,
                                                                        $userID);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
    public function delete_rencana(){
		$jenis     = $this->input->post('jenis');
		
		$delete = $this->Rasio_setting_model->delete_rencana($jenis);

		$data['delete'] = $delete;
		echo json_encode($data);
	}
    public function get_details(){
		$jenis     = $this->input->post('jenis');

		$data['data_detail']     = $this->Rasio_setting_model->get_details($jenis);
	
		echo json_encode($data);
	}
	public function update_master(){

		$modal_jenis_update       = $this->input->post('modal_jenis_update');
		$modal_kode_perk1_update  = $this->input->post('modal_kode_perk1_update');
		$modal_kode_perk2_update  = $this->input->post('modal_kode_perk2_update');
		$modal_flag_mutasi_update = $this->input->post('modal_flag_mutasi_update');	
		$jenis                    = $this->input->post('jenis');
		$userID                   = $this->session->userdata('userIdLogin');


		$update = $this->Rasio_setting_model->update_rencana($modal_jenis_update,
		    														         $modal_kode_perk1_update,
		    														         $modal_kode_perk2_update,
                                                                             $modal_flag_mutasi_update,
		    														         $jenis,
		    														         $userID);
		$data['update'] = $update;
		echo json_encode($data);
		
	}
    public function search_data_rasio_master(){
        $src_search     = $this->input->post('src_search');
		$data_master = $this->Rasio_setting_model->search_data_rasio_master($src_search);
		$data['data_master'] = $data_master;
		echo json_encode($data);
	}
}