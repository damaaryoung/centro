
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
		$rekening              = $this->input->post('rekening');
		$data_okupasi_jaminan  = $this->input->post('data_okupasi_jaminan');
		$premi_jaminan         = $this->input->post('premi_jaminan');  
		$rate_jaminan          = $this->input->post('rate_jaminan');  
		$userID                = $this->session->userdata('nik');

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
		$userID                = $this->session->userdata('nik');
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
		$activeSheet->setCellValue('Q1', 'Premi');
		$activeSheet->setCellValue('R1', 'Tenor');
		$activeSheet->setCellValue('S1', 'Seller Agent Code');
		$activeSheet->setCellValue('T1', 'Seller Branch Code');
 

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
				$activeSheet->setCellValue('Q'.$i , $row['premi_asuransi'])->getColumnDimension('Q')->setAutoSize(true);
				$activeSheet->setCellValue('R'.$i , $row['jkw_asuransi'])->getColumnDimension('R')->setAutoSize(true);
				$activeSheet->setCellValue('S'.$i , $row['nama'])->getColumnDimension('S')->setAutoSize(true);
				$activeSheet->setCellValue('T'.$i , $row['branch_name'])->getColumnDimension('T')->setAutoSize(true);
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

		$filename = 'Report_Cover_Asuransi_Periode_'.$jenis.'_Periode_'.$periode.'.xlsx';
		 
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename='. $filename);
		header('Cache-Control: max-age=0');
		$Excel_writer->save("$root_document"."public_centro/report_cover/".$filename);
		
		$data['download'] = $root_address."public_centro/report_cover/".$filename;
		echo json_encode($data);

	}

}