<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BSSController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
		$this->load->model('BSSModel/BSSModel');
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
		$data['ModalReceivedBSS'] = $this->load->view('ViewBSS/ReceivedBSS', NULL, TRUE);
		$data['ModalMigrasiBSS'] = $this->load->view('ViewBSS/MigrasiBSS', NULL, TRUE);
		$data['ModalSendBSSPic'] = $this->load->view('ViewBSS/BsstoPic', NULL, TRUE);

		// $kode_kantor = $this->session->userdata('kd_cabang');
		$data['kode_kantor'] = $this->session->userdata('kd_cabang');
		if($session != ''){
			$model = new BSSModel(); 

			$model->user = $this->session->userdata('nama');
			$model->kode_cabang = $this->session->userdata('kd_cabang'); 
			$data['notify'] = $model->get_notify_received_bss();
			
			$data['getAll'] = $model->getDataBSS();
			$data['selectKodeKantor'] = $this->AsetDokumenEntryModel->selectKodeKantor();
			$this->load->view('ViewBSS/ViewListBSS.php', $data);

		}
		else{
			redirect('LoginController/index'); 
		}
	}

	public function getAreaKode(){
		$session = $this->session->userdata('nama');
		if($session != ''){
			$kodeArea = $this->AsetDokumenEntryModel->selectKodeKantor();
			echo json_encode($kodeArea);
		}else{
			redirect('LoginController/index'); 
		}
	}

	public function get_user_received_bss(){
		$session = $this->session->userdata('nama');
		if($session != ''){
			$model = new BSSModel();  
			$model->userId = $this->session->userdata('userIdLogin'); 
			$model->jabatan = $this->session->userdata('jabatan');
			$model->kode_cabang = $this->session->userdata('kd_cabang'); 
			$list = $model->query_user_received_bss();
			echo json_encode($list);
		}else{
			redirect('LoginController/index'); 
		}
	}

	public function getKartuBSS(){
		$session = $this->session->userdata('nama');
		if($session != ''){
			$model = new BSSModel(); 
			$model->userId = $this->session->userdata('userIdLogin'); 
			$kodeKartuNumber = $model->getKartuNumberBSS();
			echo json_encode($kodeKartuNumber);
		}else{
			redirect('LoginController/index'); 
		}
	}

	public function getKolektor(){
		$session = $this->session->userdata('nama');
		if($session != ''){
			$kolektor = $this->BSSModel->queryGetKolektor();
			echo json_encode($kolektor);
		}else{
			redirect('LoginController/index'); 
		}
	}

	public function getSearch(){
		$data = null;
		$model = new BSSModel(); // nama class model
		$model->kd_cabang = $this->session->userdata('kd_cabang');
		$model->status	= $this->input->post('status');
		$model->area	= $this->input->post('area');
		$model->search = $this->input->post('search');
		$searchlist = $model->querySearch();
		if( count($searchlist) > 0){
			$data = $searchlist;
			$success = true;
			$message = '';
		}else {
			$data = null ;
			$message = "Data is not found";
			$success = false;
		};

		echo json_encode([
			"success" => $success,
			"message" => $message,
			"data" => $data
		]);
	}

	public function sendBSS() {
		$data = null;
		$model = new BSSModel(); // nama class model
		$model->kartu_number_awal	= $this->input->post('kartu_number_awal');
		$model->kartu_number_akhir	= $this->input->post('kartu_number_akhir');
		$model->area_kerja	= $this->input->post('area_kerja');
		$model->userId = $this->session->userdata('userIdLogin'); 
		$insertdata = $model->queryInsertBSS();
		echo json_encode([
			"success" => true,
			"message" => "Send BSS From GA to Area Kerja Success ",
			"data" => null
		]);
	}

	public function get_received_bss(){
		$divisi_id = $this->session->userdata('divisi_id');
		$session = $this->session->userdata('nama');
		if($session != ''){
			$model = new BSSModel();
			$model->divisi = $divisi_id; 
			$model->user = $this->session->userdata('nama');
			$model->kode_cabang = $this->session->userdata('kd_cabang'); 
			$data =$model->get_received_bss();
			echo json_encode([
				"success" => true,
				"message" => "",
				"divisi_id" => $divisi_id,
				"data" => $data
			]);
		}
		else{
			redirect('LoginController/index'); 
		}
	}

	public function search_received_bss(){
		$session = $this->session->userdata('nama');
		if($session != ''){
			$model = new BSSModel(); 
			$model->kode_cabang = $this->session->userdata('kd_cabang'); 
			$model->no_received	= $this->input->post('no_received');
			$data =$model->get_search_received_bss();
			echo json_encode([
				"success" => true,
				"message" => "",
				"data" => $data
			]);
		}
	}

	public function insertReceivedApproved() {
		$data = null;
		$model = new BSSModel(); // nama class model
		$model->divisi_id = $this->session->userdata('divisi_id');
		$model->kode_cabang = $this->session->userdata('kd_cabang'); 
		$model->userId = $this->session->userdata('userIdLogin'); 
		$model->id	= $this->input->post('id');
		$model->kartu_number_awal	= $this->input->post('no_awal');
		$model->kartu_number_akhir	= $this->input->post('no_akhir');
		$model->nama_user_send	= $this->input->post('nama_user_send');
		$model->is_migrasi	= $this->input->post('is_migrasi');
		$model->user_id_received	= $this->input->post('user_id_received');
		$model->kode_kantor_received	= $this->input->post('kode_kantor_received');
		$model->keterangan	= $this->input->post('keterangan');
		$model->appoved	= $this->input->post('appoved');
		$insertdata = $model->queryInsertReceivedApprov();
		echo json_encode([
			"success" => true,
			"message" => $insertdata,
			"data" => null
		]);
	}

	public function send_bss_to_pic(){
		$model = new BSSModel(); // nama class model
		$model->kartu_number_awal	= $this->input->post('kartu_number_awal');
		$model->kartu_number_akhir	= $this->input->post('kartu_number_akhir');
		$model->user_id_received	= $this->input->post('user_id_received');
		$model->userId = $this->session->userdata('userIdLogin'); 
		$insertdata = $model->queryInsertBSStoPIC();
		echo json_encode([
			"success" => true,
			"message" => $insertdata,
			"data" => null
		]);
	}

	public function update_assign_kolektor(){
		$model = new BSSModel(); // nama class model
		$model->userId = $this->session->userdata('userIdLogin'); 
		$model->user_id_request = $this->input->post('user_id_request');
		$model->kartu_number =$this->input->post('kartu_number');
		$model->kolektor_id = $this->input->post('kolektor_id');
		$send_to_kolektor = $model->queryAssigntoKolektor();
		echo json_encode([
			"success" => true,
			"message" => $send_to_kolektor,
			"data" => null
		]);
	}

	public function update_from_assign(){
		$model = new BSSModel(); // nama class model
		$model->userId = $this->session->userdata('userIdLogin'); 
		$model->kartu_number =$this->input->post('kartu_number');
		$model->status_assign = $this->input->post('status_assign');
		$model->keterangan = $this->input->post('keterangan');
		$send_to_assign = $model->queryUpdateAssign();
		echo json_encode([
			"success" => $send_to_assign['success'],
			"message" => $send_to_assign['msg'],
			"data" => null
		]);
	}

	public function migrasi(){
		$model = new BSSModel(); // nama class model
		$model->userId = $this->session->userdata('userIdLogin'); 
		$model->kode_kantor = $this->session->userdata('kd_cabang');
		$model->kartu_number_awal = $this->input->post('kartu_number_awal'); 
		$model->kartu_number_akhir = $this->input->post('kartu_number_akhir'); 
		$model->kode_kantor_received = $this->input->post('kode_kantor_received'); 
		$send_migrasi = $model->queryMigrasi();
		echo json_encode([
			"success" => $send_migrasi['success'],
			"message" => $send_migrasi['msg'],
			"data" => null
		]);
	}

	public function getLogBSS(){
		$data = null;
		$model = new BSSModel(); // nama class model
		$model->kartu_number	= $this->input->post('kartu_number');
		$loglist = $model->queryLogBSS();
		if( count($loglist) > 0){
			$data = $loglist;
			$success = true;
			$message = '';
		}else {
			$data = null ;
			$message = "Data is not found";
			$success = false;
		};

		echo json_encode([
			"success" => $success,
			"message" => $message,
			"data" => $data
		]);
	}

}
