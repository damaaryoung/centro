<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DashboardController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('DashboardModel/DashboardModel');
       // $this->load->database('DB_NEWWEBTOOL', TRUE);
       
	}

	public function index()
	{
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){
			$this->load->view('ViewDashboard/ViewDashboard.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function getSysdate(){

		$sysdate = $this->DashboardModel->sysdate();

		$data['sysdate'] = $sysdate;
		echo json_encode($data);
	}

	public function get_data_jaminan(){
		$tanggal = $this->input->post('src_tgl_realisasi_jaminan');
		$kode_kantor = $this->DashboardModel->selectKodeKantor();
		$jenis = 'JAMINAN';

		$kantor_error = array('31','32','33','34','35','36','37','38','39','40','41','42');

		foreach ($kode_kantor as $row) :
			$kode_kantors = $row['kode_kantor'];

			if(in_array($kode_kantors, $kantor_error)) {
				$buku_besar[]   = ["kode_kantor" => $kode_kantors,
								   "value_buku_besar" => "0.00"
									];
			}else{
				$buku_besar[]	= ["kode_kantor" => $kode_kantors,
									"value_buku_besar" => $this->DashboardModel->buku_besar($kode_kantors,$tanggal,$jenis)];
			}						
		    		
			$web_centro[]	= ["kode_kantor" => $kode_kantors, "value_web_centro" => $this->DashboardModel->web_centro($kode_kantors,$tanggal,$jenis)];	
		endforeach;

		$total_buku_besar = $this->DashboardModel->buku_besar('*',$tanggal,$jenis);
		$total_centro     = $this->DashboardModel->web_centro('*',$tanggal,$jenis);

		$data['kode_kantor']       = $kode_kantor;
		$data['buku_besar']        = $buku_besar;
		$data['web_centro']        = $web_centro;
		$data['total_buku_besar']  = $total_buku_besar;
		$data['total_centro']      = $total_centro;
		echo json_encode($data);
	}

	public function get_data_jiwa(){
		$tanggal = $this->input->post('src_tgl_realisasi_jiwa');
		$kode_kantor = $this->DashboardModel->selectKodeKantor();
		$jenis = 'JIWA';

		$kantor_error = array('31','32','33','34','35','36','37','38','39','40','41','42');

		foreach ($kode_kantor as $row) :
			$kode_kantors = $row['kode_kantor'];

			if(in_array($kode_kantors, $kantor_error)) {
				$buku_besar[]   = ["kode_kantor" => $kode_kantors,
								   "value_buku_besar" => "0.00"
									];
			}else{
				$buku_besar[]	= ["kode_kantor" => $kode_kantors,
									"value_buku_besar" => $this->DashboardModel->buku_besar($kode_kantors,$tanggal,$jenis)];
			}						
		    		
			$web_centro[]	= ["kode_kantor" => $kode_kantors, "value_web_centro" => $this->DashboardModel->web_centro($kode_kantors,$tanggal,$jenis)];	
		endforeach;
		$total_buku_besar = $this->DashboardModel->buku_besar('*',$tanggal,$jenis);
		$total_centro = $this->DashboardModel->web_centro('*',$tanggal,$jenis);

		$data['kode_kantor']       = $kode_kantor;
		$data['buku_besar']        = $buku_besar;
		$data['web_centro']        = $web_centro;
		$data['total_buku_besar']  = $total_buku_besar;
		$data['total_centro']      = $total_centro;
		echo json_encode($data);
	}

	public function get_rekonsiliasi(){
		$tanggal = $this->input->post('src_tgl_realisasi');
		$src_kode_kantor = $this->input->post('src_kode_kantor');
		
		$jenis = 'JAMINAN';

		if($src_kode_kantor == ''){
			$src_kode_kantor = '*';	
		}

		$buku_besar = $this->DashboardModel->buku_besar($src_kode_kantor,$tanggal,$jenis);
		$web_centro = $this->DashboardModel->web_centro($src_kode_kantor,$tanggal,$jenis);

		$data['buku_besar'] = $buku_besar;
		$data['web_centro'] = $web_centro;
		$data['tai'] = 'memek';
		echo json_encode($data);
	}
}
