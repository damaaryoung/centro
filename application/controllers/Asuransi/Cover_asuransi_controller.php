
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cover_asuransi_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Cover_asuransi_model');
       
    }

    public function view_cover_jaminan(){
		$this->session->unset_userdata('menu_cover_asuransi');
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		$data1['menu_cover_asuransi']    = '1';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/cover_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function view_cover_jiwa(){
		$this->session->unset_userdata('menu_cover_asuransi');
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		
		$data1['menu_cover_asuransi']    = '2';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/cover_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	public function get_data_rekap_jaminan(){
		$sysdate       = $this->Cover_asuransi_model->sysdate();
		$rekap_jaminan = $this->Cover_asuransi_model->get_data_rekap_jaminan($sysdate);

		$data['sysdate']       = $sysdate;
		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function get_data_rekap_jiwa(){
		$sysdate       = $this->Cover_asuransi_model->sysdate();
		$rekap_jaminan = $this->Cover_asuransi_model->get_data_rekap_jiwa($sysdate);

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

		if($menu_kode == '1'){
			$jenis_asuransi = 'JAMINAN';
		}else if($menu_kode == '2'){
			$jenis_asuransi = 'JIWA';
		}

		$data_details = $this->Cover_asuransi_model->get_data_detail($rekening,$jenis_asuransi);
		$data_okupasi = $this->Cover_asuransi_model->get_data_okupasi();

		$data['data_details']       = $data_details;
		$data['data_okupasi']       = $data_okupasi;
		echo json_encode($data);


	}

	public function cover_jaminan_process(){
		$rekening              = $this->input->post('rekening');
		$data_okupasi_jaminan  = $this->input->post('data_okupasi_jaminan');
		$premi_jaminan         = $this->input->post('premi_jaminan');  
		$rate_jaminan          = $this->input->post('rate_jaminan');  
		$userID                = $this->session->userdata('userIdLogin');

		$data_details = $this->Cover_asuransi_model->cover_jaminan($rekening,$data_okupasi_jaminan,$premi_jaminan,$rate_jaminan,$userID);

		$data['data_details']       = $data_details;
		echo json_encode($data);
	}

	public function cover_jiwa_process(){
		$files	= $this->input->post('files');
		$rekening			    = $this->input->post('rekening');
		$modal_rate_jiwa	    = $this->input->post('modal_rate_jiwa');
		$modal_premi_jiwa	    = $this->input->post('modal_premi_jiwa');
		$modal_extra_premi_jiwa	= $this->input->post('modal_extra_premi_jiwa');
		$userID                = $this->session->userdata('userIdLogin');
		if(isset($_FILES["files"])){
			
			$fileName 	= $_FILES["files"]["name"];
			$tmpName  	= $_FILES["files"]["tmp_name"];
			$error 		= $_FILES["files"]["error"];
			// $fileName   	= str_replace(", ","-",str_replace(",","-",$fileName));
			// $fileName   	= str_replace("&","-",$fileName);
			// $fileName       = str_replace('(','-',$fileName);
			// $fileName   	= str_replace(')','',$fileName);

			$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
			$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';

			if (!file_exists("$root_document/public_centro")){
				mkdir("$root_document/public_centro");
			} 
				
			if (!file_exists("$root_document/public_centro/$rekening")) {
				mkdir("$root_document/public_centro/$rekening");
			}
			if (!file_exists("$root_document/public_centro/$rekening/asuransi_jiwa")) {
				mkdir("$root_document/public_centro/$rekening/asuransi_jiwa");
			}

 
			$config['upload_path']   = "$root_document/public_centro/$rekening/asuransi_jiwa";
			$config['allowed_types'] = "*";
			$config['overwrite']	 = false;
			$config['file_name'] = $rekening;

			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('files') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				$pathFile = "public_centro/$rekening/asuransi_jiwa/$namafileUpload";
				$data_details = $this->Cover_asuransi_model->cover_jiwa($rekening,
																			$userID,
																			$modal_rate_jiwa,
																			$modal_premi_jiwa,
																			$modal_extra_premi_jiwa,
																			$root_document,
																			$root_address,
																			$pathFile
																		);
				echo json_encode([
					"success" => true,
					"message" => "",
					"data" => $data
				]);
			}
		}
	}
}