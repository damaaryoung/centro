
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
        $data['kode_kantor']     = $this->session->userdata('kd_cabang');
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
        $data['kode_kantor']     = $this->session->userdata('kd_cabang');
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
		$menu = $this->session->userdata('menu_cover_asuransi');
		$divisi_id  = $this->session->userdata('divisi_id');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		$date       = $this->Cover_asuransi_model->sysdate();
		if($divisi_id == 'ASURANSI'){
			$rekap_jaminan = $this->Cover_asuransi_model->get_data_cover_team_asuransi($date,$jenis);
		}else{
			$rekap_jaminan = $this->Cover_asuransi_model->get_data_cover($date,$jenis);
		}

		$data['sysdate']       = $date;
		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function get_data_rekap_jiwa(){
		$menu = $this->session->userdata('menu_cover_asuransi');
		$divisi_id  = $this->session->userdata('divisi_id');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		$date          = $this->Cover_asuransi_model->sysdate();
		if($divisi_id == 'ASURANSI'){
			$rekap_jaminan = $this->Cover_asuransi_model->get_data_cover_team_asuransi($date,$jenis);
		}else{
			$rekap_jaminan = $this->Cover_asuransi_model->get_data_cover($date,$jenis);
		}
		$data['sysdate']       = $date;
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
		$rekening               = $this->input->post('rekening');
		$data_okupasi_jaminan   = $this->input->post('data_okupasi_jaminan');
		$premi_jaminan          = $this->input->post('premi_jaminan'); 
		$premi_jaminan_request  = $this->input->post('premi_jaminan_request');  
		$rate_jaminan           = $this->input->post('rate_jaminan');  
		$userID                 = $this->session->userdata('nik');

		$data_details = $this->Cover_asuransi_model->cover_jaminan($rekening,$data_okupasi_jaminan,$premi_jaminan,$premi_jaminan_request,$rate_jaminan,$userID);

		$data['data_details']       = $data_details;
		echo json_encode($data);
	}
	public function cover_jiwa_process(){
		$rekening			      = $this->input->post('rekening');
		$modal_rate_jiwa	      = $this->input->post('modal_rate_jiwa');
		$modal_premi_jiwa	      = $this->input->post('modal_premi_jiwa');
		$modal_extra_premi_jiwa   = $this->input->post('modal_extra_premi_jiwa');
		$modal_premi_jiwa_request = $this->input->post('modal_premi_jiwa_request'); 
		$userID                   = $this->session->userdata('nik');
		$data_details = $this->Cover_asuransi_model->cover_jiwa($rekening,
																			$userID,
																			$modal_rate_jiwa,
																			$modal_premi_jiwa,
																			$modal_extra_premi_jiwa,
																			$modal_premi_jiwa_request
																		);
		$data['data_details']       = $data_details;
		echo json_encode($data);
	}
	public function proses_done(){
		$rekening              = $this->input->post('rekening');
		$userID                = $this->session->userdata('nik');

		$menu              = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$data_details = $this->Cover_asuransi_model->proses_done($rekening,$userID,$jenis);

		$data['data_details']       = $data_details;
		echo json_encode($data);
	}
	public function search_periode(){
		$date          = $this->input->post('src_tgl_realisasi');
		$menu          = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		$rekap_jaminan = $this->Cover_asuransi_model->get_data_cover($date,$jenis);

		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function search(){
		$search        = $this->input->post('src_search');
		$menu          = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		$rekap_jaminan = $this->Cover_asuransi_model->get_search($jenis,$search);

		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);

	}
	public function get_search_status(){
		$status            = $this->input->post('src_status');
		$src_tgl_realisasi = $this->input->post('src_tgl_realisasi');
		$menu              = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		
		$rekap_jaminan = $this->Cover_asuransi_model->get_search_status($jenis,$status,$src_tgl_realisasi);

		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);

	}
	public function export(){
		$periode        = $this->input->post('periode');
		$menu          = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		require_once("vendor/autoload.php");
		$spreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();
		$Excel_writer = new PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);

		$spreadsheet->setActiveSheetIndex(0);
		$activeSheet = $spreadsheet->getActiveSheet();

		 
		$activeSheet->setCellValue('A1', 'No');
		$activeSheet->setCellValue('B1', 'No Rekening');
		$activeSheet->setCellValue('C1', 'Product Code');
		$activeSheet->setCellValue('D1', 'CIF no');
		$activeSheet->setCellValue('E1', 'Tanggal Submit');
		$activeSheet->setCellValue('F1', 'Tanggal Efektif');
		$activeSheet->setCellValue('G1', 'Nama Tertanggung');
		$activeSheet->setCellValue('H1', 'Tipe ID');
		$activeSheet->setCellValue('I1', 'No. ID');
		$activeSheet->setCellValue('J1', 'Gender');
		$activeSheet->setCellValue('K1', 'Tempat Lahir');
		$activeSheet->setCellValue('L1', 'Tanggal Lahir');
		$activeSheet->setCellValue('M1', 'Domisili');
		$activeSheet->setCellValue('N1', 'Pekerjaan');
		$activeSheet->setCellValue('O1', 'Email');
		$activeSheet->setCellValue('P1', 'Jumlah Pertanggungan');
		$activeSheet->setCellValue('Q1', 'Alamat Jaminan');
		$activeSheet->setCellValue('R1', 'Premi');
		$activeSheet->setCellValue('S1', 'Tenor');
		$activeSheet->setCellValue('T1', 'Seller Agent Code');
		$activeSheet->setCellValue('U1', 'Seller Branch Code');
 

		$report = $this->Cover_asuransi_model->export_cover($periode,$jenis);

		if($report > 0) {
			$i = 2;
			$idx = 1;
			foreach ($report as $row){
				
				$activeSheet->setCellValue('A'.$i , $idx);
				$activeSheet->setCellValueExplicit('B'.$i , $row['no_rekening'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('B')->setAutoSize(true);
				$activeSheet->setCellValue('C'.$i , $row['code'])->getColumnDimension('C')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('D'.$i , $row['cif'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('D')->setAutoSize(true);
				$activeSheet->setCellValue('E'.$i , $row['created_date'])->getColumnDimension('E')->setAutoSize(true);
				$activeSheet->setCellValue('F'.$i , $row['tgl_cover'])->getColumnDimension('F')->setAutoSize(true);
				$activeSheet->setCellValue('G'.$i , $row['NAMA_NASABAH'])->getColumnDimension('G')->setAutoSize(true);
				$activeSheet->setCellValue('H'.$i , $row['nama_identitas'])->getColumnDimension('H')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('I'.$i , $row['NO_ID'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('I')->setAutoSize(true);
				$activeSheet->setCellValue('J'.$i , $row['jenis_kelamin'])->getColumnDimension('J')->setAutoSize(true);
				$activeSheet->setCellValue('K'.$i , $row['TEMPATLAHIR'])->getColumnDimension('K')->setAutoSize(true);
				$activeSheet->setCellValue('L'.$i , $row['TGLLAHIR'])->getColumnDimension('L')->setAutoSize(true);
				$activeSheet->setCellValue('M'.$i , $row['deskripsi_kode_dati'])->getColumnDimension('M')->setAutoSize(true);
				$activeSheet->setCellValue('N'.$i , $row['pekerjaan'])->getColumnDimension('N')->setAutoSize(true);
				$activeSheet->setCellValue('O'.$i , $row['email'])->getColumnDimension('O')->setAutoSize(true);
				$activeSheet->setCellValue('P'.$i , $row['NILAI_ASURANSI'])->getColumnDimension('P')->setAutoSize(true);
				$activeSheet->setCellValue('Q'.$i , $row['alamat_jaminan'])->getColumnDimension('Q')->setAutoSize(true);
				$activeSheet->setCellValue('R'.$i , $row['premi_asuransi'])->getColumnDimension('R')->setAutoSize(true);
				$activeSheet->setCellValue('S'.$i , $row['jkw_asuransi'])->getColumnDimension('S')->setAutoSize(true);
				$activeSheet->setCellValue('T'.$i , $row['nama'])->getColumnDimension('T')->setAutoSize(true);
				$activeSheet->setCellValue('U'.$i , $row['branch_name'])->getColumnDimension('U')->setAutoSize(true);
				$i++;
				$idx++;
			}
		}
		
		//$spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(12);

		$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
		$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';

		if (!file_exists("$root_document/public_centro")){
			mkdir("$root_document/public_centro");
		} 
				
		if (!file_exists("$root_document/public_centro/report_cover/")) {
			mkdir("$root_document/public_centro/report_cover/");
		}

		$filename = 'Report_Cover_Asuransi_'.$jenis.'_Periode_'.$periode.'.xlsx';
		 
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename='. $filename);
		header('Cache-Control: max-age=0');
		$Excel_writer->save("$root_document"."public_centro/report_cover/".$filename);
		
		$data['download'] = $root_address."public_centro/report_cover/".$filename;
		echo json_encode($data);

	}
	public function export_selected(){
		$checkArray   = $this->input->post('checkArray');
		$lengthParsed = $this->input->post('lengthParsed');
		$id_data      = ''; 
		$menu         = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		require_once("vendor/autoload.php");
		$spreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();
		$Excel_writer = new PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);

		$spreadsheet->setActiveSheetIndex(0);
		$activeSheet = $spreadsheet->getActiveSheet();

		 
		$activeSheet->setCellValue('A1', 'No');
		$activeSheet->setCellValue('B1', 'No Rekening');
		$activeSheet->setCellValue('C1', 'Product Code');
		$activeSheet->setCellValue('D1', 'CIF no');
		$activeSheet->setCellValue('E1', 'Tanggal Submit');
		$activeSheet->setCellValue('F1', 'Tanggal Efektif');
		$activeSheet->setCellValue('G1', 'Nama Tertanggung');
		$activeSheet->setCellValue('H1', 'Tipe ID');
		$activeSheet->setCellValue('I1', 'No. ID');
		$activeSheet->setCellValue('J1', 'Gender');
		$activeSheet->setCellValue('K1', 'Tempat Lahir');
		$activeSheet->setCellValue('L1', 'Tanggal Lahir');
		$activeSheet->setCellValue('M1', 'Domisili');
		$activeSheet->setCellValue('N1', 'Pekerjaan');
		$activeSheet->setCellValue('O1', 'Email');
		$activeSheet->setCellValue('P1', 'Jumlah Pertanggungan');
		$activeSheet->setCellValue('Q1', 'Alamat Jaminan');
		$activeSheet->setCellValue('R1', 'Premi');
		$activeSheet->setCellValue('S1', 'Tenor');
		$activeSheet->setCellValue('T1', 'Seller Agent Code');
		$activeSheet->setCellValue('U1', 'Seller Branch Code');
 
		for($i = 0; $i < $lengthParsed; $i++){
			if($i == 0){
				$id_data = $checkArray[$i][0];
			}else{
				$id_data = $id_data . ",".$checkArray[$i][0];
			}
		}

		$report = $this->Cover_asuransi_model->export_selected($id_data,$jenis);

		if($report > 0) {
			$i = 2;
			$idx = 1;
			foreach ($report as $row){
				
				$activeSheet->setCellValue('A'.$i , $idx);
				$activeSheet->setCellValueExplicit('B'.$i , $row['no_rekening'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('B')->setAutoSize(true);
				$activeSheet->setCellValue('C'.$i , $row['code'])->getColumnDimension('C')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('D'.$i , $row['cif'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('D')->setAutoSize(true);
				$activeSheet->setCellValue('E'.$i , $row['created_date'])->getColumnDimension('E')->setAutoSize(true);
				$activeSheet->setCellValue('F'.$i , $row['tgl_cover'])->getColumnDimension('F')->setAutoSize(true);
				$activeSheet->setCellValue('G'.$i , $row['NAMA_NASABAH'])->getColumnDimension('G')->setAutoSize(true);
				$activeSheet->setCellValue('H'.$i , $row['nama_identitas'])->getColumnDimension('H')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('I'.$i , $row['NO_ID'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('I')->setAutoSize(true);
				$activeSheet->setCellValue('J'.$i , $row['jenis_kelamin'])->getColumnDimension('J')->setAutoSize(true);
				$activeSheet->setCellValue('K'.$i , $row['TEMPATLAHIR'])->getColumnDimension('K')->setAutoSize(true);
				$activeSheet->setCellValue('L'.$i , $row['TGLLAHIR'])->getColumnDimension('L')->setAutoSize(true);
				$activeSheet->setCellValue('M'.$i , $row['deskripsi_kode_dati'])->getColumnDimension('M')->setAutoSize(true);
				$activeSheet->setCellValue('N'.$i , $row['pekerjaan'])->getColumnDimension('N')->setAutoSize(true);
				$activeSheet->setCellValue('O'.$i , $row['email'])->getColumnDimension('O')->setAutoSize(true);
				$activeSheet->setCellValue('P'.$i , $row['NILAI_ASURANSI'])->getColumnDimension('P')->setAutoSize(true);
				$activeSheet->setCellValue('Q'.$i , $row['alamat_jaminan'])->getColumnDimension('Q')->setAutoSize(true);
				$activeSheet->setCellValue('R'.$i , $row['premi_asuransi'])->getColumnDimension('R')->setAutoSize(true);
				$activeSheet->setCellValue('S'.$i , $row['jkw_asuransi'])->getColumnDimension('S')->setAutoSize(true);
				$activeSheet->setCellValue('T'.$i , $row['nama'])->getColumnDimension('T')->setAutoSize(true);
				$activeSheet->setCellValue('U'.$i , $row['branch_name'])->getColumnDimension('U')->setAutoSize(true);
				$i++;
				$idx++;
			}
		}
		
		//$spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(12);

		$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
		$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';

		if (!file_exists("$root_document/public_centro")){
			mkdir("$root_document/public_centro");
		} 
				
		if (!file_exists("$root_document/public_centro/report_cover/")) {
			mkdir("$root_document/public_centro/report_cover/");
		}

		$filename = 'Report_Cover_Asuransi_'.$jenis.'.xlsx';
		 
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename='. $filename);
		header('Cache-Control: max-age=0');
		$Excel_writer->save("$root_document"."public_centro/report_cover/".$filename);
		
		$data['download'] = $root_address."public_centro/report_cover/".$filename;
		echo json_encode($data);

	}

	public function proses_upload(){
		$files	             = $this->input->post('files');
		$rekening            = $this->input->post('up_rek');
		$fileUploadsLength	 = $this->input->post('fileUploadsLength');
		$menu                = $this->session->userdata('menu_cover_asuransi');
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
			$config['file_name'] = $fileName;

			$this->load->library('upload', $config);
			if(!$this->upload->do_upload('files') ){
				echo $this->upload->display_errors();
			} else{
				$data = $this->upload->data();
				$namafileUpload = $data["file_name"];
				$pathFile = "/public_centro/$rekening/asuransi_jiwa/";
				array_push($fileUploads, $namafileUpload);
				$files_upload = json_encode($fileUploads);


				$data_details = $this->Cover_asuransi_model->upload_file($rekening,
																		  $userID,
																		  $fileUploadsLength,
																		  $jenis,
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
		$menu                = $this->session->userdata('menu_cover_asuransi');
		$userID              = $this->session->userdata('nik');
		$up_rek		         = $this->input->post('up_rek');
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

		$delete_process = $this->Cover_asuransi_model->delete_upload_file($up_rek,$jenis,$files_upload);

		echo json_encode($delete_process);
	}

}