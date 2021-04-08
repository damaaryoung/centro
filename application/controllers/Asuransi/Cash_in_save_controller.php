
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cash_in_save_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Cash_in_save_model');
       
    }
    public function index(){
        $this->session->unset_userdata('proses_klaim');
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
			$this->load->view('ViewAsuransi/cis_pengajuan.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
    public function get_kode_kantor(){

		$kode_kantor = $this->Cash_in_save_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}
	public function get_asuransi(){

		$get_asuransi = $this->Cash_in_save_model->get_asuransi();
		$sysdate = $this->Cash_in_save_model->sysdate();

		$data['get_asuransi'] = $get_asuransi;
		$data['sysdate'] = $sysdate;
		echo json_encode($data);
	}
    public function get_data_cis(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		
		$data_cis = $this->Cash_in_save_model->get_data_cis($src_kode_kantor);

		$data['data_cis'] = $data_cis;
		echo json_encode($data);
	}
	public function pengajuan_cis(){
		$modal_nama_asuransi   = $this->input->post('modal_nama_asuransi');
		$modal_tgl_cover	   = $this->input->post('modal_tgl_cover');
		$modal_kantor_cabang   = $this->input->post('modal_kantor_cabang');
		$modal_limit_kas       = $this->input->post('modal_limit_kas');
		$modal_saldo_akhir_kas = $this->input->post('modal_saldo_akhir_kas');				
		$userID                = $this->session->userdata('nik');
		$data_details = $this->Cash_in_save_model->pengajuan_cis($modal_nama_asuransi,
																	$modal_tgl_cover,
																	$modal_kantor_cabang,
																	$modal_limit_kas,
																	$modal_saldo_akhir_kas,
																	$userID);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
	public function get_details(){
		$id             = $this->input->post('id');
		$no_transaksi   = $this->input->post('no_transaksi');
		$kode_kantor = $this->session->userdata('kd_cabang');
        $divisi_id   = $this->session->userdata('divisi_id');

		$data['data_cis']     = $this->Cash_in_save_model->get_details($id,$no_transaksi);
		if($kode_kantor == '00' || $divisi_id == 'IT'){ 
			$data['kode_kantor']  = $this->Cash_in_save_model->selectKodeKantor();
		}
		$data['get_asuransi'] = $this->Cash_in_save_model->get_asuransi();
		echo json_encode($data);
	}
	public function update_cis(){

		$id_update                    = $this->input->post('id_update');
		$no_transaksi_update	      = $this->input->post('no_transaksi_update');
		$modal_nama_asuransi_update   = $this->input->post('modal_nama_asuransi_update');
		$modal_kantor_cabang_update   = $this->input->post('modal_kantor_cabang_update');
		$modal_tgl_cover_update       = $this->input->post('modal_tgl_cover_update');		
		$modal_limit_kas_update       = $this->input->post('modal_limit_kas_update');			
		$modal_saldo_akhir_kas_update = $this->input->post('modal_saldo_akhir_kas_update');		
		$userID                       = $this->session->userdata('nik');
		
		
		$update = $this->Cash_in_save_model->update_cis_without_upload($id_update,
		    														         $no_transaksi_update,
		    														         $modal_nama_asuransi_update,
		    														         $modal_kantor_cabang_update,
		    														         $modal_tgl_cover_update,
		    														         $modal_limit_kas_update,
		    														         $modal_saldo_akhir_kas_update,
		    														         $userID);
		$data['update'] = $update;
		echo json_encode($data);
		
	}
	public function delete_cis(){
		$id           = $this->input->post('id');
		$no_transaksi = $this->input->post('no_transaksi');
		$status       = $this->input->post('status');
		
		$data_cis = $this->Cash_in_save_model->delete_cis($id,$no_transaksi,$status);

		$data['data_cis'] = $data_cis;
		echo json_encode($data);
	}

	/// pengcoveran CIS ///
	public function index_cover(){
        $this->session->unset_userdata('proses_klaim');
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
			$this->load->view('ViewAsuransi/cis_pengcoveran.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	public function proses_email_cis(){
		$userID       = $this->session->userdata('nik');
		$checkArray   = $this->input->post('checkArray');
		$lengthParsed = $this->input->post('lengthParsed');
		$modal_email_penerima = $this->input->post('modal_email_penerima');
		$userID                       = $this->session->userdata('nik');
		$id_data = '';
		
		for($i = 0; $i < $lengthParsed; $i++){
			if($i == 0){
				$id_data = $checkArray[$i][0];
			}else{
				$id_data = $id_data . ",".$checkArray[$i][0];
			}
		}
		$get_data_send_mail = $this->Cash_in_save_model->get_data_send_mail($id_data);
		
		$idx = 1;
		$body = '';
		foreach ($get_data_send_mail as $row){
			$body .= "<tr>" .
										 "<td>".$idx.'</td>' .
										 "<td>".$row['nama_kantor'].'</td>' .
										 "<td>".$row['limit_kas'].'</td>' .    
										 "<td>".$row['saldo_kas'].'</td>' .  
										 '</tr>';
										$idx++;
		}
		$data['get_data_send_mail'] = $body;
      
		$email = $this->load->view('ViewAsuransi/cetak/email_cis.php', $data, TRUE);

		$email = array(
			'subyek' => 'Pengcoveran CIS',
			'tujuan' => $modal_email_penerima,
			'cc' => 'staf_tisupport@kreditmandiri.co.id, it@kreditmandiri.co.id',
			'pesan' => $email
			// 'attach1' => $req->file('attach1')
		);
		require_once("vendor/autoload.php");
		$client = new \GuzzleHttp\Client();
		$request = $client->request('POST', 'http://103.31.232.149:3838/email',  [
			'Content-type' => 'application/x-www-form-urlencoded',
			'form_params'          => $email
		]);
		$response = $request->getBody()->getContents();
		$sendEmail = json_decode($response, true);


        $data['userID']  = $userID;
        $data['checkArray']      = $checkArray;
        $data['lengthParsed']     = $lengthParsed;
        $data['result']  = $this->Cash_in_save_model->send_mail_status($id_data,$userID);
		echo json_encode($data);
	}

	public function proses_upload(){
		$files	                      = $this->input->post('files');
		$id_update                    = $this->input->post('id_update');
		$no_transaksi_update	      = $this->input->post('no_transaksi_update');	
		$userID                       = $this->session->userdata('nik');
		$fileUploadsLength	 = $this->input->post('fileUploadsLength');
		$parsedArray =  explode(",",$this->input->post('fileUploads'));
		$fileUploads = array();

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
	
		    if(!file_exists("$root_document/public_centro")){
		    	mkdir("$root_document/public_centro");
		    } 
		    if(!file_exists("$root_document/public_centro/asuransi_cis")){
		    	mkdir("$root_document/public_centro/asuransi_cis");
		    } 
		    if(!file_exists("$root_document/public_centro/asuransi_cis/$no_transaksi_update")) {
		    	mkdir("$root_document/public_centro/asuransi_cis/$no_transaksi_update");
		    }
	
	 
		    $config['upload_path']   = "$root_document/public_centro/asuransi_cis/$no_transaksi_update";
		    $config['allowed_types'] = "*";
		    $config['overwrite']	 = false;
		    $config['file_name']     = $fileName;
	
			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('files') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				$pathFile = "public_centro/asuransi_cis/$no_transaksi_update/";

				array_push($fileUploads, $namafileUpload);
				$files_upload = json_encode($fileUploads);

				
				$data_details = $this->Cash_in_save_model->update_upload($id_update,
		    														         $no_transaksi_update,
		    														         $userID,
																			 $root_document,
																			 $root_address,
																			 $pathFile,
																			 $files_upload);
																						
				echo json_encode([
					"success" => true,
					"message" => "",
					"data" => $data
				]);
			}
		}
	}
	public function proses_delete_upload(){
		$id_update                    = $this->input->post('id_update');
		$no_transaksi_update	      = $this->input->post('no_transaksi_update');	
		$userID                       = $this->session->userdata('nik');
		
		$fileUploadsLength	 = $this->input->post('fileUploadsLength');
		$parsedArray = $this->input->post('fileUploads');
		$fileUploads = array();
		
			
		if($fileUploadsLength > 0){
			for($i = 0; $i < $fileUploadsLength; $i++){
				array_push($fileUploads, $parsedArray[$i]);
			}
		}
		$files_upload = json_encode($fileUploads);

		$delete_process = $this->Cash_in_save_model->delete_upload($id_update,
		    														$no_transaksi_update,
		    														$userID,
																	$files_upload);
		echo json_encode($delete_process);
	}
	public function add_notes(){
		$id           = $this->input->post('id');
		$no_transaksi = $this->input->post('no_transaksi');
		$modal_notes  = $this->input->post('modal_notes');
		$userID       = $this->session->userdata('nik');
		
		$data_cis = $this->Cash_in_save_model->add_notes($id,$no_transaksi,$modal_notes,$userID);

		$data['data_cis'] = $data_cis;
		echo json_encode($data);
	}
	public function get_data_search(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$src_search = $this->input->post('src_search');
		
		$data_cis = $this->Cash_in_save_model->get_data_search($src_kode_kantor,$src_search);

		$data['data_cis'] = $data_cis;
		echo json_encode($data);
	}


}