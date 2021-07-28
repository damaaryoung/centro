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

	
		$data_rekon	= $this->DashboardModel->data_rekon($tanggal,$jenis);
		$total_rekon = $this->DashboardModel->total_rekon('*',$tanggal,$jenis);

		$data['data_rekon']   = $data_rekon;
		$data['total_rekon']  = $total_rekon;
		echo json_encode($data);
	}

	public function get_data_jiwa(){
		$tanggal = $this->input->post('src_tgl_realisasi_jiwa');
		$kode_kantor = $this->DashboardModel->selectKodeKantor();
		$jenis = 'JIWA';

	
		$data_rekon	= $this->DashboardModel->data_rekon($tanggal,$jenis);
		$total_rekon = $this->DashboardModel->total_rekon('*',$tanggal,$jenis);

		$data['data_rekon']   = $data_rekon;
		$data['total_rekon']  = $total_rekon;
		echo json_encode($data);
	}

}
