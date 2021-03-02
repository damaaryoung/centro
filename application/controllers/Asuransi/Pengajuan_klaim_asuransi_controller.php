
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pengajuan_klaim_asuransi_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Pengajuan_klaim_asuransi_model');
       
    }
    public function menu_klaim_jaminan(){
		$this->session->unset_userdata('pengajuan_klaim');
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		$data1['pengajuan_klaim']    = '1';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/pengajuan_klaim_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function menu_klaim_jiwa(){
		$this->session->unset_userdata('pengajuan_klaim');
        $session         = $this->session->userdata('nama');
        $kode_kantor     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		$data1['pengajuan_klaim']    = '2';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/pengajuan_klaim_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function get_data(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$menu = $this->session->userdata('pengajuan_klaim');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$klaim_jaminan = $this->Pengajuan_klaim_asuransi_model->get_list_klaim_jaminan($src_kode_kantor,$jenis);

		$data['klaim_jaminan'] = $klaim_jaminan;
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

		$klaim_jaminan = $this->Pengajuan_klaim_asuransi_model->search_polis_rek($src_search,$jenis);

		$data['klaim_jaminan'] = $klaim_jaminan;
		echo json_encode($data);
	}
	public function get_kode_kantor(){

		$kode_kantor = $this->Pengajuan_klaim_asuransi_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}
	public function get_data_cover_jaminan(){
		$modal_rek_polis_jaminan = $this->input->post('modal_rek_polis_jaminan');
		$jenis_asuransi          = 'JAMINAN';

		$data_details       = $this->Pengajuan_klaim_asuransi_model->get_data_jaminan($modal_rek_polis_jaminan,$jenis_asuransi);
		$data['data_details']       = $data_details;
		echo json_encode($data);
	}
	public function pengajuan_klaim_jaminan_process(){
		$files	                        = $this->input->post('files');
		$modal_rek_jaminan			    = $this->input->post('modal_rek_jaminan');
		$modal_reff_asuransi_jaminan	= $this->input->post('modal_reff_asuransi_jaminan');
		$modal_jenis_klaim_jaminan	    = $this->input->post('modal_jenis_klaim_jaminan');
		$jenis_asuransi                 = 'JAMINAN';				
		$userID                         = $this->session->userdata('nik');
		if(isset($_FILES["files"])){
			
			$fileName 	= $_FILES["files"]["name"];
			$tmpName  	= $_FILES["files"]["tmp_name"];
			$error 		= $_FILES["files"]["error"];

			$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
			$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';

			if (!file_exists("$root_document/public_centro")){
				mkdir("$root_document/public_centro");
			} 
				
			if (!file_exists("$root_document/public_centro/$modal_rek_jaminan")) {
				mkdir("$root_document/public_centro/$modal_rek_jaminan");
			}
			if (!file_exists("$root_document/public_centro/$modal_rek_jaminan/klaim_asuransi_jaminan")) {
				mkdir("$root_document/public_centro/$modal_rek_jaminan/klaim_asuransi_jaminan");
			}

 
			$config['upload_path']   = "$root_document/public_centro/$modal_rek_jaminan/klaim_asuransi_jaminan";
			$config['allowed_types'] = "*";
			$config['overwrite']	 = false;
			$config['file_name'] = $modal_rek_jaminan;

			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('files') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				$pathFile = "public_centro/$modal_rek_jaminan/klaim_asuransi_jaminan/$namafileUpload";
				$data_details = $this->Pengajuan_klaim_asuransi_model->pengajuan_klaim_jaminan($modal_rek_jaminan,
																						$modal_reff_asuransi_jaminan,
																						$userID,
																						$root_document,
																						$root_address,
																						$pathFile,
																						$jenis_asuransi,
																						$modal_jenis_klaim_jaminan);
																						
				echo json_encode([
					"success" => true,
					"message" => "",
					"data" => $data
				]);
			}
		}
	}
	public function delete_pengajuan_klaim_jaminan(){
		$rekening	    = $this->input->post('rekening');
		$jenis	        = $this->input->post('jenis');
		$no_transaksi	= $this->input->post('no_transaksi');
		$delete = $this->Pengajuan_klaim_asuransi_model->delete_pengajuan_klaim_jaminan($rekening,$jenis,$no_transaksi);

		$data['delete'] = $delete;
		echo json_encode($data);
	}
	public function get_data_update(){
		$rekening = $this->input->post('rekening');
		$jenis = $this->input->post('jenis');
		$no_reff_asuransi = $this->input->post('no_reff_asuransi');
		$no_transaksi = $this->input->post('no_transaksi');

		$data_details         = $this->Pengajuan_klaim_asuransi_model->get_data_update_jaminan($rekening,$jenis,$no_reff_asuransi,$no_transaksi);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
	public function update_process(){
		
		$rek_update			= $this->input->post('rek_update');
		$no_transaksi	    = $this->input->post('no_transaksi');
		$jenis_asuransi	    = $this->input->post('jenis_asuransi');
		$upload_update      = $this->input->post('upload_update');	
		$jenis_klaim        = $this->input->post('jenis_klaim');				
		$userID             = $this->session->userdata('nik');

		if($upload_update == '0'){
			$update = $this->Pengajuan_klaim_asuransi_model->update_jaminan_without_upload($rek_update,$no_transaksi,$jenis_asuransi,$upload_update,$jenis_klaim,$userID);

			$data['update'] = $update;
			echo json_encode($data);
		}else if($upload_update == '1'){
			if(isset($_FILES["files"])){
			
				$fileName 	= $_FILES["files"]["name"];
				$tmpName  	= $_FILES["files"]["tmp_name"];
				$error 		= $_FILES["files"]["error"];
	
				$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
				$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';
	
				if (!file_exists("$root_document/public_centro")){
					mkdir("$root_document/public_centro");
				} 
					
				if (!file_exists("$root_document/public_centro/$rek_update")) {
					mkdir("$root_document/public_centro/$rek_update");
				}
				if (!file_exists("$root_document/public_centro/$rek_update/klaim_asuransi_jaminan")) {
					mkdir("$root_document/public_centro/$rek_update/klaim_asuransi_jaminan");
				}
	
	 
				$config['upload_path']   = "$root_document/public_centro/$rek_update/klaim_asuransi_jaminan";
				$config['allowed_types'] = "*";
				$config['overwrite']	 = false;
				$config['file_name'] = $rek_update;
	
				$this->load->library('upload', $config);
				if(!$this->upload->do_upload('files') ){
					echo $this->upload->display_errors();
				} else{
					$data = $this->upload->data();
					$namafileUpload = $data["file_name"];
					$pathFile = "public_centro/$rek_update/klaim_asuransi_jaminan/$namafileUpload";
					$data_details = $this->Pengajuan_klaim_asuransi_model->update_jaminan_with_upload($rek_update,
																									$no_transaksi,
																									$jenis_asuransi,
																									$jenis_klaim,
																									$userID,
																									$root_document,
																									$root_address,
																									$pathFile);
																							
					echo json_encode([
						"success" => true,
						"message" => "",
						"data" => $data
					]);
				}
			}
		}
		
	}

	/// JIWA ///
	public function get_data_cover_jiwa(){
		$modal_rek_polis_jiwa = $this->input->post('modal_rek_polis_jiwa');
		$jenis_asuransi          = 'JIWA';

		$data_details       = $this->Pengajuan_klaim_asuransi_model->get_data_jiwa($modal_rek_polis_jiwa,$jenis_asuransi);
		$data['data_details']       = $data_details;
		echo json_encode($data);
	}
	public function pengajuan_klaim_jiwa_process(){
		$files	                    = $this->input->post('files');
		$modal_rek_jiwa			    = $this->input->post('modal_rek_jiwa');
		$modal_reff_asuransi_jiwa	= $this->input->post('modal_reff_asuransi_jiwa');
		$modal_jenis_klaim_jiwa	    = $this->input->post('modal_jenis_klaim_jiwa');
		$jenis_asuransi             = 'JIWA';				
		$userID                     = $this->session->userdata('nik');
		if(isset($_FILES["files"])){
			
			$fileName 	= $_FILES["files"]["name"];
			$tmpName  	= $_FILES["files"]["tmp_name"];
			$error 		= $_FILES["files"]["error"];

			$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
			$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';

			if (!file_exists("$root_document/public_centro")){
				mkdir("$root_document/public_centro");
			} 
				
			if (!file_exists("$root_document/public_centro/$modal_rek_jiwa")) {
				mkdir("$root_document/public_centro/$modal_rek_jiwa");
			}
			if (!file_exists("$root_document/public_centro/$modal_rek_jiwa/klaim_asuransi_jiwa")) {
				mkdir("$root_document/public_centro/$modal_rek_jiwa/klaim_asuransi_jiwa");
			}

 
			$config['upload_path']   = "$root_document/public_centro/$modal_rek_jiwa/klaim_asuransi_jiwa";
			$config['allowed_types'] = "*";
			$config['overwrite']	 = false;
			$config['file_name'] = $modal_rek_jiwa;

			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('files') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				$pathFile = "public_centro/$modal_rek_jiwa/klaim_asuransi_jiwa/$namafileUpload";
				$data_details = $this->Pengajuan_klaim_asuransi_model->pengajuan_klaim_jiwa($modal_rek_jiwa,
																						$modal_reff_asuransi_jiwa,
																						$userID,
																						$root_document,
																						$root_address,
																						$pathFile,
																						$jenis_asuransi,
																						$modal_jenis_klaim_jiwa);
																						
				echo json_encode([
					"success" => true,
					"message" => "",
					"data" => $data
				]);
			}
		}
	}



}