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
			
            $data['selectKodeKantor'] = $this->AsetDokumenEntryModel->selectKodeKantor();
			$this->load->view('ViewEFiling/ViewListEFiling.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	
	public function getEfiling(){
		$session = $this->session->userdata('nama');
		$divisi_id = $this->session->userdata('divisi_id');
		$jabatan = $this->session->userdata('jabatan');
		if($session != ''){
			$model = new EFilingModel();
			$model->kode_cabang = $this->session->userdata('kd_cabang'); 
			$data =$model->get_efiling();
			if( count($data) > 0){
				$data = $data;
				$success = true;
				$message = '';
			}else {
				$data = '' ;
				$message = "Data does not exist";
				$success = false;
			};

			echo json_encode([
				"success" => $success,
				"message" => $message,
				"divisi_id" => $divisi_id,
				"jabatan" => $jabatan,
				"data" => $data
			]);
		}
		else{
			redirect('LoginController/index'); 
		}
	}


	public function efiling_detail(){
		$session = $this->session->userdata('nama');
		if($session != ''){
			$model = new EFilingModel();
			$model->no_rekening = $this->input->post('no_rekening');
			$data =$model->query_detail_efiling();
			// var_dump(json_encode($data['nasabah_ktp'])); die();
			echo json_encode([
				"success" => true,
				"message" => "",
				"data" => $data
			]);
		}
		else{
			redirect('LoginController/index'); 
		}
	}

	public function getSearch(){
		$session = $this->session->userdata('nama');
		$divisi_id = $this->session->userdata('divisi_id');
		$jabatan = $this->session->userdata('jabatan');
		if($session != ''){
			$model = new EFilingModel();
			$model->kode_kantor = $this->input->post('kode_kantor');
			$model->baki_debet = $this->input->post('baki_debet');
			$model->status_verifikasi = $this->input->post('status_verifikasi');
			$model->no_rekening = $this->input->post('no_rekening');
			$data =$model->query_filter_efiling();
			if( count($data) > 0){
				$data = $data;
				$success = true;
				$message = '';
			}else {
				$data = '' ;
				$message = "Data is not found";
				$success = false;
			};

			echo json_encode([
				"success" => $success,
				"message" => $message,
				"divisi_id" => $divisi_id,
				"jabatan" => $jabatan,
				"data" => $data
			]);
		}else{
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
}

