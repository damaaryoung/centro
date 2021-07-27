
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Rekap_titipan_asuransi_controller extends CI_Controller {
    public function __construct() {
        parent:: __construct();
        $this->load->model('AsuransiModel/Rekap_titipan_asuransi_model');
       
    }

    public function view_rekap_jaminan(){
		$this->session->unset_userdata('menu_rekap_asuransi');
        $session         = $this->session->userdata('nama');
        $data['kode_kantor']     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		$data1['menu_rekap_asuransi']    = '1';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/rekap_titipan_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function view_rekap_jiwa(){
		$this->session->unset_userdata('menu_rekap_asuransi');
        $session         = $this->session->userdata('nama');
        $data['kode_kantor']     = $this->session->userdata('kd_cabang');
		$data['js']      = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css']     = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar']  = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer']  = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		
		$data1['menu_rekap_asuransi']    = '2';
		$this->session->set_userdata($data1);

		if($session != ''){
			$this->load->view('ViewAsuransi/rekap_titipan_asuransi_view.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	public function get_kode_kantor(){

		$kode_kantor = $this->Rekap_titipan_asuransi_model->selectKodeKantor();

		$data['kode_kantor'] = $kode_kantor;
		echo json_encode($data);
	}

	public function get_data_rekap_jaminan(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$menu = $this->session->userdata('menu_rekap_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$date       = $this->Rekap_titipan_asuransi_model->sysdate();
		$rekap_jaminan = $this->Rekap_titipan_asuransi_model->get_data_rekap($jenis, $date, $src_kode_kantor);

		$data['sysdate']       = $date;
		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function get_data_rekap_jiwa(){
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$menu = $this->session->userdata('menu_rekap_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}
		$date       = $this->Rekap_titipan_asuransi_model->sysdate();
		$rekap_jaminan = $this->Rekap_titipan_asuransi_model->get_data_rekap($jenis, $date, $src_kode_kantor);

		$data['sysdate']       = $date;
		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function getSearch_Tanggal(){
		$tanggal = $this->input->post('src_tgl_realisasi');
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$menu = $this->session->userdata('menu_rekap_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$rekap_jaminan = $this->Rekap_titipan_asuransi_model->get_data_rekap($jenis, $tanggal, $src_kode_kantor);

		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function get_search(){
		$search = $this->input->post('src_search');
		$menu = $this->session->userdata('menu_rekap_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		$rekap_jaminan = $this->Rekap_titipan_asuransi_model->get_search($jenis, $search);

		$data['rekap_jaminan'] = $rekap_jaminan;
		echo json_encode($data);
	}
	public function get_rekonsiliasi(){
		$tanggal = $this->input->post('src_tgl_realisasi');
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		$menu = $this->session->userdata('menu_rekap_asuransi');
		if($menu == '1'){
			$jenis = 'JAMINAN';
		}else if($menu == '2'){
			$jenis = 'JIWA';
		}else{
			$jenis = '';
		}

		if($src_kode_kantor == ''){
			$src_kode_kantor = '*';	
		}

		$buku_besar = $this->Rekap_titipan_asuransi_model->buku_besar($src_kode_kantor,$tanggal,$jenis);
		$web_centro = $this->Rekap_titipan_asuransi_model->web_centro($src_kode_kantor,$tanggal,$jenis);

		$data['buku_besar'] = $buku_besar;
		$data['web_centro'] = $web_centro;
		echo json_encode($data);
	}
}