
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pengajuan_refund_asuransi_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Pengajuan_refund_asuransi_model');
       
    }
    public function menu_refund_jaminan(){
		$this->session->unset_userdata('pengajuan_refund');
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		$data1['pengajuan_refund']    = '1';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/pengajuan_refund_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function menu_refund_jiwa(){
		$this->session->unset_userdata('pengajuan_refund');
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		$data1['pengajuan_refund']    = '2';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/pengajuan_refund_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
    public function get_kode_kantor(){

		$kode_kantor = $this->Pengajuan_refund_asuransi_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}
	public function get_data(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$menu = $this->session->userdata('pengajuan_refund');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$klaim_jaminan = $this->Pengajuan_refund_asuransi_model->get_list_refund_data($src_kode_kantor,$jenis);

		$data['refund'] = $klaim_jaminan;
		echo json_encode($data);
	}
    public function get_data_search(){
		$src_search = $this->input->post('src_search');
		$menu = $this->session->userdata('pengajuan_klaim');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$klaim_jaminan = $this->Pengajuan_refund_asuransi_model->search_polis_rek($src_search,$jenis);

		$data['refund'] = $klaim_jaminan;
		echo json_encode($data);
	}



    public function get_data_cover_jaminan(){
		$modal_rek_polis_jaminan = $this->input->post('modal_rek_polis_jaminan');
		$jenis_asuransi          = 'JAMINAN';

		$data_details       = $this->Pengajuan_refund_asuransi_model->get_data_jaminan($modal_rek_polis_jaminan,$jenis_asuransi);
		$data['data_details']       = $data_details;
		echo json_encode($data);
	}
	public function pengajuan_refund_jaminan_process(){
	    //	$files	                        = $this->input->post('files');
		$modal_rek_jaminan			    = $this->input->post('modal_rek_jaminan');
		$modal_reff_asuransi_jaminan	= $this->input->post('modal_reff_asuransi_jaminan');
		$modal_jenis_refund_jaminan	    = $this->input->post('modal_jenis_refund_jaminan');
		$jenis_asuransi                 = 'JAMINAN';				
		$userID                         = $this->session->userdata('nik');

		$data_details = $this->Pengajuan_refund_asuransi_model->pengajuan_refund_jaminan($modal_rek_jaminan,
																						$modal_reff_asuransi_jaminan,
																						$userID,
																						$jenis_asuransi,
																						$modal_jenis_refund_jaminan);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
	public function delete_pengajuan_refund(){
		$rekening	    = $this->input->post('rekening');
		$jenis	        = $this->input->post('jenis');
		$no_transaksi	= $this->input->post('no_transaksi');
		$delete = $this->Pengajuan_refund_asuransi_model->delete_pengajuan_klaim_jaminan($rekening,$jenis,$no_transaksi);

		$data['delete'] = $delete;
		echo json_encode($data);
	}




    public function get_data_cover_jiwa(){
		$modal_rek_polis_jiwa = $this->input->post('modal_rek_polis_jiwa');
		$jenis_asuransi          = 'JIWA';

		$data_details       = $this->Pengajuan_refund_asuransi_model->get_data_jiwa($modal_rek_polis_jiwa,$jenis_asuransi);
		$data['data_details']       = $data_details;
		echo json_encode($data);
	}
	public function pengajuan_refund_jiwa_process(){
		$modal_rek_jiwa			    = $this->input->post('modal_rek_jiwa');
		$modal_reff_asuransi_jiwa	= $this->input->post('modal_reff_asuransi_jiwa');
		$modal_jenis_refund_jiwa    = $this->input->post('modal_jenis_refund_jiwa');
		$jenis_asuransi             = 'JIWA';				
		$userID                     = $this->session->userdata('nik');

		$data_details = $this->Pengajuan_refund_asuransi_model->pengajuan_klaim_jiwa($modal_rek_jiwa,
																					$modal_reff_asuransi_jiwa,
																					$userID,
																					$jenis_asuransi,
																					$modal_jenis_refund_jiwa);
		echo json_encode($data_details);
	}


    public function get_data_update(){
		$rekening = $this->input->post('rekening');
		$jenis = $this->input->post('jenis');
		$no_reff_asuransi = $this->input->post('no_reff_asuransi');
		$no_transaksi = $this->input->post('no_transaksi');

		$data_details         = $this->Pengajuan_refund_asuransi_model->get_data_update_jaminan($rekening,$jenis,$no_reff_asuransi,$no_transaksi);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
	public function update_process(){
		
		$rek_update			= $this->input->post('rek_update');
		$no_transaksi	    = $this->input->post('no_transaksi');
		$jenis_asuransi	    = $this->input->post('jenis_asuransi');
		$upload_update      = $this->input->post('upload_update');	
		$jenis_refund       = $this->input->post('jenis_refund');
		$status             = '0';				
		$userID             = $this->session->userdata('nik');

	
		$update = $this->Pengajuan_refund_asuransi_model->update_without_upload($rek_update,$no_transaksi,$jenis_asuransi,$upload_update,$jenis_refund,$userID,$status);

		$data['update'] = $update;
		echo json_encode($data);		
	}
    public function proses_upload(){
		$files	             = $this->input->post('files');
		$up_rek		         = $this->input->post('up_rek');
		$up_polis	         = $this->input->post('up_polis');
		$fileUploadsLength	 = $this->input->post('fileUploadsLength');
		$proses_flag	     = $this->input->post('proses_flag');
		$menu                = $this->session->userdata('pengajuan_refund');
		$userID              = $this->session->userdata('nik');
		$parsedArray =  explode(",",$this->input->post('fileUploads'));
		$fileUploads = array();
		
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}			
		if($fileUploadsLength > 0){
			for($i = 0; $i < $fileUploadsLength; $i++){
				array_push($fileUploads, $parsedArray[$i]);
			}
		}
		
		if(isset($_FILES["files"])){
			
			$fileName 	= $_FILES["files"]["name"];
			$tmpName  	= $_FILES["files"]["tmp_name"];
			$error 		= $_FILES["files"]["error"];

			$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
			$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';

			if($jenis == 'JAMINAN'){
				if (!file_exists("$root_document/public_centro")){
					mkdir("$root_document/public_centro");
				} 
					
				if (!file_exists("$root_document/public_centro/$up_rek")) {
					mkdir("$root_document/public_centro/$up_rek");
				}
				if (!file_exists("$root_document/public_centro/$up_rek/refund_asuransi_jaminan")) {
					mkdir("$root_document/public_centro/$up_rek/refund_asuransi_jaminan");
				}	 
				$config['upload_path']   = "$root_document/public_centro/$up_rek/refund_asuransi_jaminan";
				$pathFile = "public_centro/$up_rek/refund_asuransi_jaminan/";

			}else if($jenis == 'JIWA'){
				if (!file_exists("$root_document/public_centro")){
					mkdir("$root_document/public_centro");
				} 
					
				if (!file_exists("$root_document/public_centro/$up_rek")) {
					mkdir("$root_document/public_centro/$up_rek");
				}
				if (!file_exists("$root_document/public_centro/$up_rek/refund_asuransi_jiwa")) {
					mkdir("$root_document/public_centro/$up_rek/refund_asuransi_jiwa");
				}
	
	 
				$config['upload_path']   = "$root_document/public_centro/$up_rek/refund_asuransi_jiwa";

				$pathFile = "public_centro/$up_rek/refund_asuransi_jiwa/";
			}

			
			$config['allowed_types'] = "*";
			$config['overwrite']	 = false;
			$config['file_name'] = $fileName;

			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('files') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				array_push($fileUploads, $namafileUpload);
				$files_upload = json_encode($fileUploads);


				if($proses_flag == 1){
					$data_details = $this->Pengajuan_refund_asuransi_model->upload_file($up_rek,
																						$up_polis,
																						$userID,
																						$fileUploadsLength,
																						$jenis,
																						$root_document,
																						$root_address,
																						$pathFile,
																						$files_upload);

				}else if($proses_flag == 2){
					$no_transaksi	     = $this->input->post('no_transaksi');
					$data_details = $this->Pengajuan_refund_asuransi_model->upload_file_update($up_rek,
																						$up_polis,
																						$no_transaksi,
																						$jenis,
																						$userID,
                                                                                        $root_document,
																						$root_address,
																						$pathFile,
																						$files_upload);
				}																
				echo json_encode([
					"success" => true,
					"message" => "",
					"data" => $data
				]);
			}
		}
	}
	public function proses_delete_upload(){
		$menu                = $this->session->userdata('pengajuan_refund');
		$userID              = $this->session->userdata('nik');
		$up_rek		         = $this->input->post('up_rek');
		$up_polis	         = $this->input->post('up_polis');
		$proses_flag	     = $this->input->post('proses_flag');
		
		$fileUploadsLength	 = $this->input->post('fileUploadsLength');
		$parsedArray = $this->input->post('fileUploads');
		$fileUploads = array();
		
		
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}			
		if($fileUploadsLength > 0){
			for($i = 0; $i < $fileUploadsLength; $i++){
				array_push($fileUploads, $parsedArray[$i]);
			}
		}
		$files_upload = json_encode($fileUploads);

		if($proses_flag == 1){
			$delete_process = $this->Pengajuan_refund_asuransi_model->delete_upload_file($up_rek,$jenis,$files_upload);
		}else if($proses_flag == 2){
			$no_transaksi	     = $this->input->post('no_transaksi');
			$delete_process = $this->Pengajuan_refund_asuransi_model->delete_file_update($up_rek,
																				$up_polis,
																				$no_transaksi,
																				$jenis,
																				$userID,
																				$files_upload);
		}
		echo json_encode($delete_process);
	}




}