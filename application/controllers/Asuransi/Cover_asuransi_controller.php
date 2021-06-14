
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
	public function get_asuransi(){
		$asuransi       = $this->Cover_asuransi_model->get_data_asuransi();

		$data['asuransi']       = $asuransi;
		echo json_encode($data);
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
	public function get_search_asuransi(){
		$src_nama_asuansi  = $this->input->post('src_nama_asuansi');
		$src_tgl_realisasi = $this->input->post('src_tgl_realisasi');
		$menu              = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		
		$rekap_jaminan = $this->Cover_asuransi_model->get_search_asuransi($jenis,$src_nama_asuansi,$src_tgl_realisasi);

		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);

	}

	/// EXPORT DATA ////
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
			//jaminan//
	public function export_bess(){
		$periode          = $this->input->post('periode');
		$src_nama_asuansi = $this->input->post('src_nama_asuansi');
		$menu          = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		
		$date       = $this->Cover_asuransi_model->sysdate1();

		require_once("vendor/autoload.php");
		$spreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();
		$Excel_writer = new PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
		$alignment_center = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER;

		$spreadsheet->setActiveSheetIndex(0);
		$activeSheet = $spreadsheet->getActiveSheet();
		
		$activeSheet->mergeCells('A4:K4');
		$activeSheet->mergeCells('A5:K5');
		$activeSheet->getStyle('A4:K4')->getAlignment()->setHorizontal($alignment_center);
		$activeSheet->getStyle('A5:K5')->getAlignment()->setHorizontal($alignment_center);
		$activeSheet->getStyle('A7:K7')->getAlignment()->setHorizontal($alignment_center);
		 
		$activeSheet->setCellValue('A1', 'PT. BPR Kredit Mandiri Indonesia');
		$activeSheet->setCellValue('A2', 'Jl. Raya Karang Satria No.3, Rt.003, Rw.002, Kel. Karang Satria, Kec. Tambun Utara, Bekasi. Telp. 021-82652929, E-mail : info@kreditmandiri.co.id.');
		$activeSheet->setCellValue('A4', 'COVER ASURANSI SAHABAT ARTHA PROTEKSI (BESS)');
		$activeSheet->setCellValue('A5', $date);
		
		$activeSheet->setCellValue('A7', 'NO');
		$activeSheet->setCellValue('B7', 'TGL PENGAJUAN');
		$activeSheet->setCellValue('C7', 'TGL AKHIR PENGAJUAN');
		$activeSheet->setCellValue('D7', 'LEBIH HARI');
		$activeSheet->setCellValue('E7', 'KETERANGAN OKUPASI');
		$activeSheet->setCellValue('F7', 'RATE');
		$activeSheet->setCellValue('G7', 'NO PK');
		$activeSheet->setCellValue('H7', 'NAMA NASABAH');
		$activeSheet->setCellValue('I7', 'LAMA COVER');
		$activeSheet->setCellValue('J7', 'NILAI PERTANGGUNGAN');
		$activeSheet->setCellValue('K7', 'SPESIFIKASI OBJEK YANG DIJAMINKAN');
 

		$report = $this->Cover_asuransi_model->export_cover_jaminan($periode,$jenis,$src_nama_asuansi);
		if($report > 0) {
			$i = 8;
			$idx = 1;
			foreach ($report as $row){
				$activeSheet->setCellValue('A'.$i , $idx);
				$activeSheet->setCellValueExplicit('B'.$i , $row['TGL_REALISASI'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('B')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('C'.$i , $row['tgl_jt_asuransi'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('C')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('D'.$i , $row['lebih_hari'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('D')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('E'.$i , $row['TUJUAN_USAHA'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('E')->setWidth(50);
				$activeSheet->setCellValueExplicit('F'.$i , $row['rate'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('F')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('G'.$i , $row['no_rekening'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('G')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('H'.$i , $row['NAMA_NASABAH'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('H')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('I'.$i , $row['jkw_asuransi'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('I')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('J'.$i , $row['NILAI_ASURANSI'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('J')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('K'.$i , $row['alamat'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('K')->setWidth(50);
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

		$filename = 'Report_Cover_Asuransi_'.$jenis.'_BESS_Periode_'.$periode.'.xlsx';
		 
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename='. $filename);
		header('Cache-Control: max-age=0');
		$Excel_writer->save("$root_document"."public_centro/report_cover/".$filename);
		
		$data['download'] = $root_address."public_centro/report_cover/".$filename;
		echo json_encode($data);
	}
	public function export_abda(){
		$periode          = $this->input->post('periode');
		$src_nama_asuansi = $this->input->post('src_nama_asuansi');
		$menu          = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		
		$date       = $this->Cover_asuransi_model->sysdate1();

		require_once("vendor/autoload.php");
		$spreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();
		$Excel_writer = new PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
		$alignment_center = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER;

		$spreadsheet->setActiveSheetIndex(0);
		$activeSheet = $spreadsheet->getActiveSheet();
		

		 
		$activeSheet->mergeCells('A4:K4');
		$activeSheet->mergeCells('A5:K5');
		$activeSheet->getStyle('A4:K4')->getAlignment()->setHorizontal($alignment_center);
		$activeSheet->getStyle('A5:K5')->getAlignment()->setHorizontal($alignment_center);
		$activeSheet->getStyle('A7:K7')->getAlignment()->setHorizontal($alignment_center);
		 
		$activeSheet->setCellValue('A1', 'PT. BPR Kredit Mandiri Indonesia');
		$activeSheet->setCellValue('A2', 'Jl. Raya Karang Satria No.3, Rt.003, Rw.002, Kel. Karang Satria, Kec. Tambun Utara, Bekasi. Telp. 021-82652929, E-mail : info@kreditmandiri.co.id.');
		$activeSheet->setCellValue('A4', 'COVER ASURANSI ABDA');
		$activeSheet->setCellValue('A5', $date);
		
		$activeSheet->setCellValue('A7', 'NO');
		$activeSheet->setCellValue('B7', 'TGL PENGAJUAN');
		$activeSheet->setCellValue('C7', 'TGL AKHIR PENGAJUAN');
		$activeSheet->setCellValue('D7', 'LEBIH HARI');
		$activeSheet->setCellValue('E7', 'KETERANGAN OKUPASI');
		$activeSheet->setCellValue('F7', 'RATE');
		$activeSheet->setCellValue('G7', 'NO PK');
		$activeSheet->setCellValue('H7', 'NAMA NASABAH');
		$activeSheet->setCellValue('I7', 'LAMA COVER');
		$activeSheet->setCellValue('J7', 'NILAI PERTANGGUNGAN');
		$activeSheet->setCellValue('K7', 'SPESIFIKASI OBJEK YANG DIJAMINKAN');
 

		$report = $this->Cover_asuransi_model->export_cover_jaminan($periode,$jenis,$src_nama_asuansi);
		if($report > 0) {
			$i = 8;
			$idx = 1;
			foreach ($report as $row){
				
				$activeSheet->setCellValue('A'.$i , $idx);
				$activeSheet->setCellValueExplicit('B'.$i , $row['TGL_REALISASI'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('B')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('C'.$i , $row['tgl_jt_asuransi'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('C')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('D'.$i , $row['lebih_hari'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('D')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('E'.$i , $row['TUJUAN_USAHA'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('E')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('F'.$i , $row['rate'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('F')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('G'.$i , $row['no_rekening'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('G')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('H'.$i , $row['NAMA_NASABAH'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('H')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('I'.$i , $row['jkw_asuransi'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('I')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('J'.$i , $row['NILAI_ASURANSI'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('J')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('K'.$i , $row['alamat'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('K')->setAutoSize(true);
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

		$filename = 'Report_Cover_Asuransi_'.$jenis.'_ABDA_Periode_'.$periode.'.xlsx';
		 
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename='. $filename);
		header('Cache-Control: max-age=0');
		$Excel_writer->save("$root_document"."public_centro/report_cover/".$filename);
		
		$data['download'] = $root_address."public_centro/report_cover/".$filename;
		echo json_encode($data);
	}
	public function export_jaminan_lain(){
		$periode          = $this->input->post('periode');
		$src_nama_asuansi = $this->input->post('src_nama_asuansi');
		$menu          = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		
		$date       = $this->Cover_asuransi_model->sysdate1();

		require_once("vendor/autoload.php");
		$spreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();
		$Excel_writer = new PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
		$alignment_center = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER;

		$spreadsheet->setActiveSheetIndex(0);
		$activeSheet = $spreadsheet->getActiveSheet();
		
		$activeSheet->mergeCells('A4:K4');
		$activeSheet->mergeCells('A5:K5');
		$activeSheet->getStyle('A4:K4')->getAlignment()->setHorizontal($alignment_center);
		$activeSheet->getStyle('A5:K5')->getAlignment()->setHorizontal($alignment_center);
		$activeSheet->getStyle('A7:K7')->getAlignment()->setHorizontal($alignment_center);
		 
		$activeSheet->setCellValue('A1', 'PT. BPR Kredit Mandiri Indonesia');
		$activeSheet->setCellValue('A2', 'Jl. Raya Karang Satria No.3, Rt.003, Rw.002, Kel. Karang Satria, Kec. Tambun Utara, Bekasi. Telp. 021-82652929, E-mail : info@kreditmandiri.co.id.');
		$activeSheet->setCellValue('A4', 'COVER ASURANSI JAMINAN');
		$activeSheet->setCellValue('A5', $date);
		
		$activeSheet->setCellValue('A7', 'NO');
		$activeSheet->setCellValue('B7', 'TGL PENGAJUAN');
		$activeSheet->setCellValue('C7', 'TGL AKHIR PENGAJUAN');
		$activeSheet->setCellValue('D7', 'LEBIH HARI');
		$activeSheet->setCellValue('E7', 'KETERANGAN OKUPASI');
		$activeSheet->setCellValue('F7', 'RATE');
		$activeSheet->setCellValue('G7', 'NO PK');
		$activeSheet->setCellValue('H7', 'NAMA NASABAH');
		$activeSheet->setCellValue('I7', 'LAMA COVER');
		$activeSheet->setCellValue('J7', 'NILAI PERTANGGUNGAN');
		$activeSheet->setCellValue('K7', 'SPESIFIKASI OBJEK YANG DIJAMINKAN');
 

		$report = $this->Cover_asuransi_model->export_cover_jaminan($periode,$jenis,$src_nama_asuansi);
		if($report > 0) {
			$i = 8;
			$idx = 1;
			foreach ($report as $row){
				
				$activeSheet->setCellValue('A'.$i , $idx);
				$activeSheet->setCellValueExplicit('B'.$i , $row['TGL_REALISASI'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('B')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('C'.$i , $row['tgl_jt_asuransi'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('C')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('D'.$i , $row['lebih_hari'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('D')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('E'.$i , $row['TUJUAN_USAHA'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('E')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('F'.$i , $row['rate'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('F')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('G'.$i , $row['no_rekening'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('G')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('H'.$i , $row['NAMA_NASABAH'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('H')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('I'.$i , $row['jkw_asuransi'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('I')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('J'.$i , $row['NILAI_ASURANSI'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('J')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('K'.$i , $row['alamat'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('K')->setAutoSize(true);
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
			// end jaminan//
	public function export_jiwa_generali(){
		$periode        = $this->input->post('periode');
		$date_periode  = $periode.'-01';
		$src_nama_asuansi = $this->input->post('src_nama_asuansi');
		$menu          = $this->session->userdata('menu_cover_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		$file_path = './assets/design/images/generali1.png';

		$date      = $this->Cover_asuransi_model->periode($date_periode);

		require_once("vendor/autoload.php");
		$spreadsheet = new PhpOffice\PhpSpreadsheet\Spreadsheet();
		$Excel_writer = new PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
		$alignment_center = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER;
		$drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
		

		$spreadsheet->setActiveSheetIndex(0);
		$activeSheet = $spreadsheet->getActiveSheet();

		$drawing->setName('Logo');
		$drawing->setDescription('Logo');
		$drawing->setPath($file_path);
		$drawing->setHeight(150);
		$drawing->setWidth(150);
		$drawing->setCoordinates('A1');
		$drawing->setWorksheet($activeSheet);

		$activeSheet->mergeCells('C6:F6');
		$activeSheet->getStyle('C6:D6')->getAlignment()->setHorizontal($alignment_center);

		$activeSheet->setCellValue('C6', 'Monthly Recapt '.$date);
		$activeSheet->getStyle('C6')->getFont()->setBold(true);
		$activeSheet->getStyle('C6')->getFont()->setSize(14);

		$activeSheet->setCellValue('A11', 'No');
		$activeSheet->setCellValue('B11', 'No Rekening');
		$activeSheet->setCellValue('C11', 'Product Code');
		$activeSheet->setCellValue('D11', 'CIF no');
		$activeSheet->setCellValue('E11', 'Tanggal Submit');
		$activeSheet->setCellValue('F11', 'Tanggal Efektif');
		$activeSheet->setCellValue('G11', 'Nama Tertanggung');
		$activeSheet->setCellValue('H11', 'Tipe ID');
		$activeSheet->setCellValue('I11', 'No. ID');
		$activeSheet->setCellValue('J11', 'Gender');
		$activeSheet->setCellValue('K11', 'Tempat Lahir');
		$activeSheet->setCellValue('L11', 'Tanggal Lahir');
		$activeSheet->setCellValue('M11', 'Domisili');
		$activeSheet->setCellValue('N11', 'Pekerjaan');
		$activeSheet->setCellValue('O11', 'Email');
		$activeSheet->setCellValue('P11', 'Jumlah Pertanggungan');
		$activeSheet->setCellValue('Q11', 'Alamat Jaminan');
		$activeSheet->setCellValue('R11', 'Premi');
		$activeSheet->setCellValue('S11', 'Tenor');
		$activeSheet->setCellValue('T11', 'Seller Agent Code');
		$activeSheet->setCellValue('U11', 'Seller Branch Code');
 

		$report = $this->Cover_asuransi_model->export_jiwa_generali($periode,$jenis,$src_nama_asuansi);

		if($report > 0) {
			$i = 12;
			$idx = 1;
			foreach ($report as $row){
				
				$activeSheet->setCellValue('A'.$i , $idx);
				$activeSheet->setCellValueExplicit('B'.$i , $row['NO_REKENING'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('B')->setAutoSize(true);
				$activeSheet->setCellValue('C'.$i , $row['product_code'])->getColumnDimension('C')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('D'.$i , $row['cif'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('D')->setAutoSize(true);
				$activeSheet->setCellValue('E'.$i , $row['tgl_addendum_old'])->getColumnDimension('E')->setAutoSize(true);
				$activeSheet->setCellValue('F'.$i , $row['TGL_REALISASI'])->getColumnDimension('F')->setAutoSize(true);
				$activeSheet->setCellValue('G'.$i , $row['NAMA_NASABAH'])->getColumnDimension('G')->setAutoSize(true);
				$activeSheet->setCellValue('H'.$i , $row['nama_identitas'])->getColumnDimension('H')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('I'.$i , $row['NO_ID'], \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING)->getColumnDimension('I')->setAutoSize(true);
				$activeSheet->setCellValue('J'.$i , $row['jenis_kelamin'])->getColumnDimension('J')->setAutoSize(true);
				$activeSheet->setCellValue('K'.$i , $row['TEMPATLAHIR'])->getColumnDimension('K')->setAutoSize(true);
				$activeSheet->setCellValue('L'.$i , $row['TGLLAHIR'])->getColumnDimension('L')->setAutoSize(true);
				$activeSheet->setCellValue('M'.$i , $row['domisili'])->getColumnDimension('M')->setAutoSize(true);
				$activeSheet->setCellValue('N'.$i , $row['pekerjaan'])->getColumnDimension('N')->setAutoSize(true);
				$activeSheet->setCellValue('O'.$i , $row['email'])->getColumnDimension('O')->setAutoSize(true);
				$activeSheet->setCellValue('P'.$i , $row['nilai_asuransi_jiwa'])->getColumnDimension('P')->setAutoSize(true);
				$activeSheet->setCellValue('Q'.$i , $row['alamat_jaminan'])->getColumnDimension('Q')->setAutoSize(true);
				$activeSheet->setCellValue('R'.$i , $row['premi_asuransi'])->getColumnDimension('R')->setAutoSize(true);
				$activeSheet->setCellValue('S'.$i , $row['jkw_asuransi_jiwa'])->getColumnDimension('S')->setAutoSize(true);
				$activeSheet->setCellValue('T'.$i , $row['seller_agent_code'])->getColumnDimension('T')->setAutoSize(true);
				$activeSheet->setCellValue('U'.$i , $row['seller_branch_code'])->getColumnDimension('U')->setAutoSize(true);
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
	public function export_jiwa_sinarmas(){
		$periode        = $this->input->post('periode');
		$src_nama_asuansi = $this->input->post('src_nama_asuansi');
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
		$format_string = \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING;
		$alignment_center = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER;
		$alignment_center_ver = \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER;
		$border = new PhpOffice\PhpSpreadsheet\Style\Border;
		$fill   = \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID;
		

		$spreadsheet->setActiveSheetIndex(0);
		$activeSheet = $spreadsheet->getActiveSheet();

		
		$activeSheet->getStyle('B2:Y15')->getFont()->setBold(true);
		

		/// header ///
		$activeSheet->getStyle('B2:Y4')->getFont()->setSize(10);
		$activeSheet->getStyle('B2:C4')->getBorders()->getOutline()->setBorderStyle($border::BORDER_THICK);
		$activeSheet->getStyle('B2:C4')->getBorders()->getInside()->setBorderStyle($border::BORDER_MEDIUM);
		$activeSheet->setCellValue('B2', 'NAMA BANK'); $activeSheet->setCellValue('C2', 'PT. BPR KREDIT MANDIRI INDONESIA')->getColumnDimension('B')->setWidth(12); 
		$activeSheet->setCellValue('B3', 'ALAMAT'); $activeSheet->setCellValue('C3', 'BEKASI UTARA - KAB BEKASI');
		$activeSheet->setCellValue('B4', 'JENIS PLAN'); $activeSheet->setCellValue('C4', 'BPR KMI(395 - 192)');

		
		$activeSheet->getStyle('B6:T6')->getFont()->setSize(16); $activeSheet->mergeCells('B6:T6');
		$activeSheet->getStyle('B7:T7')->getFont()->setSize(14); $activeSheet->mergeCells('B7:T7');
		$activeSheet->setCellValue('B6', 'DAFTAR PESERTA SEMEMTARA');
		$activeSheet->setCellValue('B7', 'Lampirkan SPAJ');

		$activeSheet->getStyle('B8:Y10')->getFont()->setSize(12);
		$activeSheet->mergeCells('B8:F8'); $activeSheet->mergeCells('I8:T8'); 
		$activeSheet->setCellValue('G8', 'PEMEGANG POLIS'); $activeSheet->setCellValue('H8', ': PT. BPR KREDIT MANDIRI INDONESIA');
		
		$activeSheet->mergeCells('B9:F9'); $activeSheet->mergeCells('I9:T9'); 
		$activeSheet->setCellValue('G9', 'ALAMAT'); $activeSheet->setCellValue('H9', ': BEKASI UTARA - KAB BEKASI');

		$activeSheet->mergeCells('B10:F10'); $activeSheet->mergeCells('I10:T10'); 
		$activeSheet->setCellValue('G10', 'MACAM ASURANSI'); $activeSheet->setCellValue('H10', ': PR KMI(395 - 192)');

		$activeSheet->getStyle('B12:T12')->getFont()->setSize(11);
		$activeSheet->mergeCells('B11:T11'); $activeSheet->mergeCells('B12:T12');
		$activeSheet->setCellValue('B12', 'BPR KREDIT MANDIRI INDONESIA KANTOR PUSAT BEKASI UTARA');

		$activeSheet->getStyle('B6:T12')->getBorders()->getOutline()->setBorderStyle($border::BORDER_THICK);
		

		/// END HEADER ///
		$activeSheet->getStyle('B14:Y15')->getAlignment()->setHorizontal($alignment_center);
		$activeSheet->getStyle('B14:Y15')->getAlignment()->setVertical($alignment_center_ver);
		$activeSheet->getStyle('B14:T15')->getBorders()->getOutline()->setBorderStyle($border::BORDER_THICK); 
		$activeSheet->getStyle('B14:T15')->getBorders()->getInside()->setBorderStyle($border::BORDER_MEDIUM); 
		$activeSheet->setCellValue('B14', 'No');                  $activeSheet->mergeCells('B14:B15');
		$activeSheet->setCellValue('C14', 'Nama Tertanggung');    $activeSheet->mergeCells('C14:C15');
		$activeSheet->setCellValue('D14', 'No ID');               $activeSheet->mergeCells('D14:D15');
		$activeSheet->setCellValue('E14', 'Tempat Lahir');        $activeSheet->mergeCells('E14:E15');
		$activeSheet->setCellValue('F14', 'Tanggal Lahir');       $activeSheet->mergeCells('F14:F15');
		$activeSheet->setCellValue('G14', 'Alamat');              $activeSheet->mergeCells('G14:G15');
		$activeSheet->setCellValue('H14', 'Wilayah');             $activeSheet->mergeCells('H14:H15');
		$activeSheet->setCellValue('I14', 'No. Telp');            $activeSheet->mergeCells('I14:I15');
		$activeSheet->setCellValue('J14', 'Berat Badan');         $activeSheet->mergeCells('J14:J15');
		$activeSheet->setCellValue('K14', 'Tinggi Badan');        $activeSheet->mergeCells('K14:K15');
		$activeSheet->setCellValue('L14', 'UP. Awal Rp');         $activeSheet->mergeCells('L14:L15');
		$activeSheet->setCellValue('M14', 'Masa'); $activeSheet->mergeCells('M14:N14');$activeSheet->setCellValue('M15', 'Thn');   
												   $activeSheet->setCellValue('N15', 'Bln');               
		$activeSheet->setCellValue('O14', 'Mulai Pertanggungan');$activeSheet->setCellValue('O15', '(DD/MM/YYYY)');  
		$activeSheet->setCellValue('P14', 'Akhir Pertanggungan'); $activeSheet->mergeCells('P14:P15');
		$activeSheet->setCellValue('Q14', 'Umur'); $activeSheet->setCellValue('Q15', '(Thn)');  
		$activeSheet->setCellValue('R14', 'Rate Premi');          $activeSheet->mergeCells('R14:R15');
		$activeSheet->setCellValue('S14', 'Premi Pokok')->getColumnDimension('S')->setWidth(18); $activeSheet->mergeCells('S14:S15');
		$activeSheet->setCellValue('T14', 'Cek Body')->getColumnDimension('T')->setWidth(15);    $activeSheet->mergeCells('T14:T15');


        $activeSheet->getStyle('V14:Y15')->getBorders()->getOutline()->setBorderStyle($border::BORDER_THICK);           
		$activeSheet->getStyle('V14:Y15')->getBorders()->getInside()->setBorderStyle($border::BORDER_MEDIUM);                          
		$activeSheet->setCellValue('V14', 'Rate');           $activeSheet->mergeCells('V14:V15');
		$activeSheet->setCellValue('W14', 'Rate +1');        $activeSheet->mergeCells('W14:W15');
		$activeSheet->setCellValue('X14', 'Rate Bulanan')->getColumnDimension('X')->setWidth(15);;   $activeSheet->mergeCells('X14:X15');
		$activeSheet->setCellValue('Y14', 'Rate Tahun Ke-n')->getColumnDimension('Y')->setWidth(15); $activeSheet->mergeCells('Y14:Y15');

		$report = $this->Cover_asuransi_model->export_jiwa_sinarmas($periode,$jenis,$src_nama_asuansi);

		if($report > 0) {
			$i = 16;
			$idx = 1;
			foreach ($report as $row){
				
				$activeSheet->setCellValue('B'.$i , $idx);
				$activeSheet->setCellValue('C'.$i , $row['NAMA_NASABAH'])->getColumnDimension('C')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('D'.$i , $row['NO_ID'],$format_string)->getColumnDimension('D')->setAutoSize(true);
				$activeSheet->setCellValue('E'.$i , $row['TEMPATLAHIR'])->getColumnDimension('E')->setAutoSize(true);
				$activeSheet->setCellValue('F'.$i , $row['TGLLAHIR'])->getColumnDimension('F')->setAutoSize(true);
				$activeSheet->setCellValue('G'.$i , $row['domisili'])->getColumnDimension('G')->setAutoSize(true);
				$activeSheet->setCellValue('H'.$i , $row['wilayah'])->getColumnDimension('H')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('I'.$i , $row['TELPON'],$format_string)->getColumnDimension('I')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('J'.$i , $row['berat_asuransi_jiwa'],$format_string)->getColumnDimension('J')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('K'.$i , $row['tinggi_asuransi_jiwa'],$format_string)->getColumnDimension('K')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('L'.$i , $row['nilai_asuransi_jiwa'],$format_string)->getColumnDimension('L')->setAutoSize(true);
				$activeSheet->setCellValue('M'.$i , $row['tahun'])->getColumnDimension('M')->setAutoSize(true);
				$activeSheet->setCellValue('N'.$i , $row['bulan'])->getColumnDimension('N')->setAutoSize(true);
				$activeSheet->setCellValue('O'.$i , $row['TGL_REALISASI'])->getColumnDimension('O')->setAutoSize(true);
				$activeSheet->setCellValue('P'.$i , $row['tgl_jt_asuransi_jiwa'])->getColumnDimension('P')->setAutoSize(true);
				$activeSheet->setCellValue('Q'.$i , $row['umur'])->getColumnDimension('Q')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('R'.$i , $row['rate'],$format_string)->getColumnDimension('R')->setAutoSize(true);
				$activeSheet->setCellValueExplicit('S'.$i , $row['premi_asuransi'],$format_string)->getColumnDimension('S')->setWidth(18);
				$activeSheet->setCellValue('T'.$i , $row['bmi'])->getColumnDimension('T')->setWidth(15);
				$i++;
				$idx++;
			}
		}
		$activeSheet->getStyle('B16:T'.$i)->getBorders()->getOutline()->setBorderStyle($border::BORDER_THICK);
		$activeSheet->getStyle('B16:T'.$i)->getBorders()->getInside()->setBorderStyle($border::BORDER_MEDIUM);

		$activeSheet->getStyle('V16:Y'.$i)->getBorders()->getOutline()->setBorderStyle($border::BORDER_THICK);
		$activeSheet->getStyle('V16:Y'.$i)->getBorders()->getInside()->setBorderStyle($border::BORDER_MEDIUM);
		
		//$spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(12);

		$root_document   = $_SERVER["DOCUMENT_ROOT"].'/';
		$root_address    = 'http://'.$_SERVER["SERVER_ADDR"].'/';

		if (!file_exists("$root_document/public_centro")){
			mkdir("$root_document/public_centro");
		} 
				
		if (!file_exists("$root_document/public_centro/report_cover/")) {
			mkdir("$root_document/public_centro/report_cover/");
		}

		$filename = 'Report_Cover_Asuransi_'.$jenis.'_SINARMAS_Periode_'.$periode.'.xlsx';
		 
		header('Content-Type: application/vnd.ms-excel');
		header('Content-Disposition: attachment;filename='. $filename);
		header('Cache-Control: max-age=0');
		$Excel_writer->save("$root_document"."public_centro/report_cover/".$filename);
		
		$data['download'] = $root_address."public_centro/report_cover/".$filename;
		echo json_encode($data);

	}
	
	/// END EXPORT DATA ////

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