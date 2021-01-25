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

	public function upload_efiling(){
		date_default_timezone_set('Asia/Jakarta');

		$file		 	= $this->input->post('file');
		$idFile			= $this->input->post('idFile');
		$post_no_rekening	= $this->input->post('no_rekening');
		$kd_kantor		= $this->input->post('kd_kantor');
		$tgl_realisasi	= $this->input->post('tgl_realisasi');

		$model = new EFilingModel();
		$model->post_no_rekening = $post_no_rekening; 
		$query_no_rekening =$model->query_cek_no_rekening();
		
		if(!empty($query_no_rekening['no_rekening_lama'])) {
			// $model->no_rekening = $query_no_rekening['kode_kantor'];
			// var_dump($model->no_rekening); die();
			// $list_dmy = $model->query_list_dmy();
			
			// list($d,$m,$y) = explode("-", $list_dmy['tgl_realisasi']);
			// $kode_kantor = $list_dmy['kode_kantor'];
			echo "yes";
		}else{
			$no_rekening = $post_no_rekening;
			list($d,$m,$y) 	= explode("-", isset($tgl_realisasi) ? $tgl_realisasi : date('d-m-Y') );
			var_dump($d); die();
			$kode_kantor = $kode_kantor;
		}
		
		$root_server    = $_SERVER["DOCUMENT_ROOT"];//103.31.232.146/API_WEBTOOL3/public/
		$pathFileUpload	= "$root_server/efiling/$y/$m/$kode_kantor/$no_rekening";
		
		
// 		if(isset($_FILES["file"])){
			
// 			$fileName 	= $_FILES["file"]["name"];
// 			$tmpName  	= $_FILES["file"]["tmp_name"];
// 			$error 		= $_FILES["file"]["error"];
// 			$fileName   	= str_replace(", ","-",str_replace(",","-",$fileName));
// 			$fileName   	= str_replace("&","-",$fileName);
// 			$fileName       = str_replace('(','-',$fileName);
// 			$fileName   	= str_replace(')','',$fileName);

// 			if (!file_exists("$root_server/public")){
// 				mkdir("$root_server/public");
// 			} 
				
// 			if (!file_exists("$root_server/public/$no_rekening")) {
// 				mkdir("$root_server/public/$no_rekening");
// 			}
// 			if (!file_exists("$root_server/public/$no_rekening/efiling")) {
// 				mkdir("$root_server/public/$no_rekening/efiling");
// 			}

// 			$config['upload_path']   ="$root_server/public/$no_rekening/efiling/";
// 			$config['allowed_types'] = "*";
// 			$config['overwrite']	 = false;
// 			$config['file_name'] = $idFile."..".$fileName ;

// 			$this->load->library('upload', $config);
// 			if(!$this->upload->do_upload('file') ){
// 				echo $this->upload->display_errors();
// 			} else{
// 				$data = $this->upload->data();
// 				$namafileUpload = $data["file_name"];
// 				//	$this->AsetDokumenUpdateModel->updateCoverNotes($CoverNotesID,$namafileUpload);
// 				// $this->AsetDokumenUpdateModel->insertCoverNotes($CoverNotesNoReff,$CoverNotesAgunanID,$namafileUpload);
// 				$data = array(
// 					"link" => "$root_server/public/$no_rekening/efiling/$namafileUpload",
// 					"filename" => $namafileUpload
// 				);
// 				echo json_encode([
// 					"success" => true,
// 					"message" => "",
// 					"data" => $data
// 				]);
// 			}
// 		}
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
			$model->search = $this->input->post('search');
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

	public function simpan_efiling(){
		// $kk = json_encode($this->input->post('kk'));
		$model = new EFilingModel(); // nama class model
		$model->ktp = json_encode($this->input->post('ktp'));
		var_dump($model->ktp); die();
		$model->no_rekening = $this->input->post('no_rekening');
		$insertdata = $model->queryInsertFile();
		echo json_encode([
			"success" => true,
			"message" => $insertdata,
			"data" => null
		]);
	}
}

