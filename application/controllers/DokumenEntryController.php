<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DokumenEntryController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
        $this->load->model('ViewDataModel/ListDataAgunanModel');
       
	}

	public function index()
	{
		$session = $this->session->userdata('nama');
		$data['active'] = 'dokumen';
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){
			$data['tests'] = $this->ListDataAgunanModel->ListData();
			
			$this->load->view('ViewDokumen/ViewDokumenEntry.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
}
