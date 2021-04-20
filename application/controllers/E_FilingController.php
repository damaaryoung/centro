<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class E_FilingController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
		$this->load->model('EFilingModel/EFilingModel');
		$this->load->model('AsetDokumenModel/AsetDokumenEntryModel');
	}

	public function index()
    {
        $session = $this->session->userdata('nama');
		$session_user_id = $this->session->userdata('userIdLogin');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		$data['Modaldetail_efiling'] = $this->load->view('ViewEFiling/modal_detail_efiling', NULL, TRUE);
		$data['Modalview_efiling'] = $this->load->view('ViewEFiling/modal_view_efiling', NULL, TRUE);

		if($session != ''){
			$data['kode_kantor'] = $this->session->userdata('kd_cabang');
			$data['divisi_id'] = $this->session->userdata('divisi_id'); 
            $data['selectKodeKantor'] = $this->AsetDokumenEntryModel->selectKodeKantor();
			$this->load->view('ViewEFiling/ViewListEFiling.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}

	public function UserAccess_Efiling(){// untuk mengaktifkan menu perubahan status 
		$model = new EFilingModel();
		$model->userID = $this->input->post('user_id');
		$model->divisi_id = $this->input->post('divisi_id');
		$model->jabatan = $this->input->post('jabatan');
		$data = $model->user_access_efiling();
		echo json_encode($data);
	}

	public function Update_status(){ //update status verifikasi 
		$model = new EFilingModel();
		$model->no_rekening = $this->input->post('no_rekening');
		$model->userID = $this->input->post('user_id');
		$model->status = $this->input->post('status');
		$data = $model->update_status_verifikasi();
		echo json_encode($data);
	}
}

