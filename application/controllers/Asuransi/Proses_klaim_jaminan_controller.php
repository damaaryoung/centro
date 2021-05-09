
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Proses_klaim_jaminan_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Proses_klaim_asuransi_model');
       
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

        $data1['proses_klaim']    = '1';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/proses_klaim_jaminan_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
    public function get_kode_kantor(){

		$kode_kantor = $this->Proses_klaim_asuransi_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}
    public function get_data(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$menu = $this->session->userdata('proses_klaim');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$klaim_jaminan = $this->Proses_klaim_asuransi_model->get_list_klaim($src_kode_kantor,$jenis);

		$data['klaim_jaminan'] = $klaim_jaminan;
		echo json_encode($data);
	}
    public function get_data_search(){
		$src_search = $this->input->post('src_search');
		$menu = $this->session->userdata('proses_klaim');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$klaim_jaminan = $this->Proses_klaim_asuransi_model->search_polis_rek($src_search,$jenis);

		$data['klaim_jaminan'] = $klaim_jaminan;
		echo json_encode($data);
	}
    public function get_data_update(){
		$rekening = $this->input->post('rekening');
		$jenis = $this->input->post('jenis');
		$no_reff_asuransi = $this->input->post('no_reff_asuransi');
		$no_transaksi = $this->input->post('no_transaksi');

		$data_details         = $this->Proses_klaim_asuransi_model->get_data_update($rekening,$jenis,$no_reff_asuransi,$no_transaksi);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
    public function proses_return(){
		$rek_update = $this->input->post('rek_update');
		$no_transaksi = $this->input->post('no_transaksi');
		$jenis_asuransi = $this->input->post('jenis_asuransi');
        $ket_return = $this->input->post('ket_return');
        $status = '1';
        $userID             = $this->session->userdata('nik');
		$pic = $this->session->userdata('nama') . " (" . $userID . ")";

		$ket_return = $ket_return . " - PIC : " . $pic;

		$result  = $this->Proses_klaim_asuransi_model->proses_return($rek_update,$no_transaksi,$jenis_asuransi,$status,$userID,$ket_return);
		$data['result'] = $result;
		echo json_encode($data);
	}
    public function proses_simpan(){
		$rek_update = $this->input->post('rek_update');
		$no_transaksi = $this->input->post('no_transaksi');
		$jenis_asuransi = $this->input->post('jenis_asuransi');
        $status = '2';
        $userID             = $this->session->userdata('nik');

		$result  = $this->Proses_klaim_asuransi_model->proses_simpan($rek_update,$no_transaksi,$jenis_asuransi,$status,$userID);
		$data['result'] = $result;
		echo json_encode($data);
	}
    public function proses_email(){
        $nama_nasabah_email   = $this->input->post('nama_nasabah_email');
        $no_polis_email       = $this->input->post('no_polis_email');
        $tgl_klaim            = $this->input->post('tgl_klaim');
        $email_insco          = $this->input->post('email_insco');
        $rek_update           = $this->input->post('rek_update');
        $no_transaksi         = $this->input->post('no_transaksi');
		$modal_email_penerima = $this->input->post('modal_email_penerima');
        $userID               = $this->session->userdata('nik');
		$jenis                = 'JAMINAN';
		$file_attach          = [];
        
        $data['nama_nasabah']  = $nama_nasabah_email;
        $data['no_polis']      = $no_polis_email;
		$data['rek_update']    = $rek_update;
        $data['tgl_klaim']     = $tgl_klaim;

		$get_attachment = $this->Proses_klaim_asuransi_model->get_attachment($rek_update,$jenis,$no_transaksi);
		$file_attach = json_decode($get_attachment[0]['file_name']);
		
		$idx = 1;
		$attach = '';  
		foreach ($file_attach as $row){
			$attach .= $idx . '  <a href="'.$get_attachment[0]['root_address'].$get_attachment[0]['path_file'].$row.'" target="_blank">'.$row.'</a> <br><br>';
					$idx++;
		}
		$data['attach'] = $attach;
	    $email = $this->load->view('ViewAsuransi/cetak/email_insco.php', $data, TRUE);

		$email = array(
			'subyek' => 'Klaim Asuransi Jaminan',
			'tujuan' => $modal_email_penerima,
			'cc' => 'staf_tisupport@kreditmandiri.co.id, it@kreditmandiri.co.id, dudik.bdg@kreditmandiri.co.id, mufti@kreditmandiri.co.id',
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

        $data['result_update']  = $this->Proses_klaim_asuransi_model->proses_email($rek_update,$no_transaksi,$userID);
		echo json_encode($data);
    }
	public function get_data_reject(){
		$rekening = $this->input->post('rekening');
		$jenis = $this->input->post('jenis');
		$no_reff_asuransi = $this->input->post('no_reff_asuransi');
		$no_transaksi = $this->input->post('no_transaksi');

		$data_details         = $this->Proses_klaim_asuransi_model->get_data_reject($rekening,$jenis,$no_reff_asuransi,$no_transaksi);
		$data['data_details'] = $data_details;
		echo json_encode($data);
	}
	public function proses_upload_reject(){
		$files	             = $this->input->post('files');
		$rekening		     = $this->input->post('rekening');
		$jenis	             = $this->input->post('jenis');
		$no_reff_asuransi	 = $this->input->post('no_reff_asuransi');
		$no_transaksi	     = $this->input->post('no_transaksi');
		$fileUploadsLength	 = $this->input->post('fileUploadsLength');
		$userID              = $this->session->userdata('nik');
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

			if (!file_exists("$root_document/public_centro")){
				mkdir("$root_document/public_centro");
			} 
				
			if (!file_exists("$root_document/public_centro/$rekening")) {
				mkdir("$root_document/public_centro/$rekening");
			}
			if (!file_exists("$root_document/public_centro/$rekening/klaim_asuransi_jaminan")) {
				mkdir("$root_document/public_centro/$rekening/klaim_asuransi_jaminan");
			}

 
			$config['upload_path']   = "$root_document/public_centro/$rekening/klaim_asuransi_jaminan";
			$config['allowed_types'] = "*";
			$config['overwrite']	 = false;
			$config['file_name'] = 'reject_'.$fileName;

			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('files') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				$pathFile = "public_centro/$rekening/klaim_asuransi_jaminan/";
				array_push($fileUploads, $namafileUpload);
				$files_upload = json_encode($fileUploads);
				
				$data_details = $this->Proses_klaim_asuransi_model->upload_file_reject($rekening,
																					$jenis,
																					$no_transaksi,
																					$userID,
																					$files_upload);															
				echo json_encode([
					"success" => true,
					"message" => "",
					"data" => $data
				]);
			}
		}
	}
	public function proses_delete_upload_reject(){
		$rekening		     = $this->input->post('rekening');
		$jenis	             = $this->input->post('jenis');
		$no_reff_asuransi	 = $this->input->post('no_reff_asuransi');
		$no_transaksi	     = $this->input->post('no_transaksi');
		$userID              = $this->session->userdata('nik');
		// $parsedArray =  explode(",",$this->input->post('fileUploads'));
		// $fileUploads = array();
		
		$fileUploadsLength	 = $this->input->post('fileUploadsLength');
		$parsedArray = $this->input->post('fileUploads');
		$fileUploads = array();
		
		
	
		if($fileUploadsLength > 0){
			for($i = 0; $i < $fileUploadsLength; $i++){
				array_push($fileUploads, $parsedArray[$i]);
			}
		}
		$files_upload = json_encode($fileUploads);
		$delete_process = $this->Proses_klaim_asuransi_model->delete_file_reject($rekening,$jenis,$userID,$no_transaksi,$files_upload);

		echo json_encode($delete_process);
	}
	public function proses_reject(){
		$rekening		     = $this->input->post('rekening');
		$jenis	             = $this->input->post('jenis');
		$no_reff_asuransi	 = $this->input->post('no_reff_asuransi');
		$no_transaksi	     = $this->input->post('no_transaksi');
		$ket_reject          = $this->input->post('ket_reject');
		$userID              = $this->session->userdata('nik');
		
		
		$proses_reject = $this->Proses_klaim_asuransi_model->proses_reject($rekening,$jenis,$userID,$no_transaksi,$ket_reject);

		echo json_encode($proses_reject);
	}
}