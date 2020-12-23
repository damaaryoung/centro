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
			echo json_encode([
				"success" => true,
				"message" => "",
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
		$file		 		= $this->input->post('file');
		$no_rekening	= $this->input->post('no_rekening');
		$idFile				= $this->input->post('idFile');

		// date_default_timezone_set('Asia/Jakarta');
		// $date = date('m-d-Y');
		$root_server    = $_SERVER["DOCUMENT_ROOT"];//103.31.232.146/API_WEBTOOL3/public/
		$folder_master	= $no_rekening;
		// list($m,$d,$y)=explode('-',$date);
		
		
		if(isset($_FILES["file"])){
			
			$fileName 	= $_FILES["file"]["name"];
			$tmpName  	= $_FILES["file"]["tmp_name"];
			$error 		= $_FILES["file"]["error"];
			$fileName   	= str_replace(", ","-",str_replace(",","-",$fileName));
			$fileName   	= str_replace("&","-",$fileName);
			$fileName       = str_replace('(','-',$fileName);
			$fileName   	= str_replace(')','',$fileName);

			if (!file_exists("$root_server/efiling")){
				mkdir("$root_server/efiling");
			} 
				
			if (!file_exists("$root_server/efiling/$folder_master/efiling/")) {
				mkdir("$root_server/efiling/$folder_master/efiling/");
			}
//103.31.232.146/API_WEBTOOL3/public/8103020205750002/efiling/kk..WhatsApp Image 2020-09-04 at 17.31.14.jpeg
			$config['upload_path']   ="$root_server/efiling/$folder_master/efiling/";
			$config['allowed_types'] = "*";
			$config['overwrite']	 = false;
			$config['file_name'] = $idFile."..".$fileName ;

			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('file') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				//	$this->AsetDokumenUpdateModel->updateCoverNotes($CoverNotesID,$namafileUpload);
				// $this->AsetDokumenUpdateModel->insertCoverNotes($CoverNotesNoReff,$CoverNotesAgunanID,$namafileUpload);
				$data = array(
					"link" => "$root_server/efiling/$folder_master/efiling/$namafileUpload",
					"filename" => $namafileUpload
				);
				echo json_encode([
					"success" => true,
					"message" => "",
					"data" => $data
				]);
			}
		}
	}

	public function efiling_detail(){
		$session = $this->session->userdata('nama');
		if($session != ''){
			$model = new EFilingModel();
			$model->no_rekening = $this->input->post('no_rekening');
			$data =$model->query_detail_efiling();
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
}