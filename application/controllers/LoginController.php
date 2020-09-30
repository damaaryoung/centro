<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginController extends CI_Controller {

	
	public function __construct(){
		parent::__construct();
        $this->load->model('LoginModel/LoginModel');
        $this->load->helper('url');
	}

	public function index()
	{
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$this->load->view('LoginView/LoginView.php', $data);
	}

	//Setelah dapat json object dari js akan di set apakah mendapatkan session atau tidak
	public function login_process(){    	
		$userId = $this->input->post('userIdLogin');

    	$data = array(
			'nama' => $this->input->post('nama'),
			'nik'=> $this->input->post('nik'),
			'jabatan' => $this->input->post('jabatan'),
			'email' => $this->input->post('email'),
			'iat' => $this->input->post('iat'),
			'exp' => $this->input->post('exp'),
			'usename' => $this->input->post('usename')
		);

		$data1 = array(
			'nama' => $this->input->post('nama'),
			'nik'=> $this->input->post('nik'),
			'jabatan' => $this->input->post('jabatan'),
			'email' => $this->input->post('email'),
			'iat' => $this->input->post('iat'),
			'exp' => $this->input->post('exp'),
			'usename' => $this->input->post('usename'),
			'userIdLogin' => $this->input->post('userIdLogin')
		);

		

		if($this->input->post('nama') != ''){ //ada data di parsing -> set session login
			//akses menu
			$AksesDokumen = $this->LoginModel->aksesDokumen($userId);
			foreach ($AksesDokumen as $row) :
                $data1['dokumen']    = $row['access_id'];
			endforeach;	

			$AksesCustomer = $this->LoginModel->aksesCustomer($userId);
			foreach ($AksesCustomer as $row) :
                $data1['customer']    = $row['access_id'];
			endforeach;	

			
			$this->session->set_userdata($data1);
			
			echo json_encode($data);
    	}
    	else{ //nggak ada data yang di parsing -> balikin error ke js login
    		$this->session->set_flashdata('error', 'Username atau Password Salah'); 
    	}	

	}

	public function logout_process(){
		$this->session->sess_destroy();  
		redirect('LoginController/index'); 
	}

	
}
