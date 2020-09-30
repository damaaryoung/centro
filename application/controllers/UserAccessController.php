<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserAccessController extends CI_Controller {
	public function __construct() {
		parent:: __construct();
        $this->load->model('UserAccessModel/UserAccessModel');
       
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
			$data['UserData'] = $this->UserAccessModel->ListData();
			
			$this->load->view('ViewUserAccess/ViewListUserAccess.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	// info user index
	public function infoUserAccess(){
		$session = $this->session->userdata('nama');
		$data['active'] = 'dokumen';
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		//$data['delModal'] = $this->load->view('templates/UserAccessDeleteModal.php', NULL, TRUE);
	
		if($session != ''){
			//set user id dari session atau post 
			if( $this->session->flashdata('userId') != ''){
				$userId = $this->session->flashdata('userId');
			}
			else if($this->input->post('userId') != ''){
				$userId = $this->input->post('userId');
			}
			else{
				redirect('UserAccessController/index'); 
			}

			$UserDetail = $this->UserAccessModel->UserData($userId);
			foreach ($UserDetail as $row) :
                $data['nama']    = $row['nama'];
				$data['nik']     = $row['nik'];
				$data['email']   = $row['email'];
				$data['jabatan'] = $row['jabatan'];
            endforeach;
			$data['userId'] = $userId;

			//DATA MENU
			$data['MenuData'] = $this->UserAccessModel->AccessMenu($userId);
			//DATA AKSES USER
			$data['AksesData'] = $this->UserAccessModel->userAccessExisting($userId);

			$this->session->set_flashdata('userId',$userId);
			$this->load->view('ViewUserAccess/ViewInfoUserAccess.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}

	// add new user access 
	public function addUserAccess(){
		$session = $this->session->userdata('nama');
		$addBy = $this->session->userdata('usename'); 
		$userId = $this->input->post('userId');
		$access_id = $this->input->post('access_id');

		if($session != ''){
			
			$this->UserAccessModel->addUserAccess($userId,$access_id,$addBy);
			//$this->UserAccessModel->refreshView($userId);	
			$this->session->set_flashdata('userId',$userId);
			redirect('UserAccessController/infoUserAccess'); 
			
		}
		else{
			redirect('LoginController/index'); 
		}
	}

	// delete user akses
	public function revokeAksesUser(){
		$session = $this->session->userdata('nama');
		$user_access_id = $this->input->post('user_access_id');
		$userId = $this->input->post('userId');

		if($session != ''){
			$this->UserAccessModel->revokeAkses($user_access_id);
			$this->UserAccessModel->refreshView($userId);			
		}
		else{
			redirect('LoginController/index'); 
		}
	}

}
