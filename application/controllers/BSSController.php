<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BSSController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('BSSModel/BSSModel');
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
			$data['getAll']= $this->BSSModel->getAll();
			
			$this->load->view('ViewBSS/ViewListBSS.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}

	// public function getStatus(){
	// 	$status      = $this->input->post('status');
	// 	$data['getSearch']= $this->BSSModel->getStatus($status);
	// }
}
