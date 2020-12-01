<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SefinController extends CI_Controller {
	public function __construct() {
        parent:: __construct();
		$this->load->model('Model_memorandum_so');
		$this->load->model('model_menu');
        $this->load->model('model_auth');
        $this->load->model('Model_view_master');
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
		$data['pendidikan'] = $this->Model_memorandum_so->tampil_data_pendidikan();
		if($this->session->userdata('kd_cabang') == '00'){
			$data['selectKodeKantor'] = $this->Model_view_master->selectKodeKantor();
		}else if($this->session->userdata('kd_cabang') != '00'){
			$data['selectKodeKantor'] = $this->Model_view_master->select_pic_cabang();
		}
		

		if($session != ''){
            $this->load->view('das/data_credit_checking', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
      
		
	}

	public function ds_spv()
    {
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
	

		if($session != ''){
            $this->load->view('ds_spv/data_credit_checking', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
      
	}
	
	public function cek_sertifikat()
    {
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
	

		if($session != ''){
			$this->load->view('master/cek_sertifikat/index', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
        
	}
	
	public function pengajuan_lpdk()
    {
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
	

		if($session != ''){
			$this->load->view('master/lpdk/data_pengajuan_lpdk', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}
	
	public function lpdk()
    {
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
	

		if($session != ''){			
			$data['nama_user'] = $this->model_menu->getUser();
			$this->load->view('master/lpdk/data_lpdk', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
    }

}
