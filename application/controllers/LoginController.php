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
		$this->load->view('LoginView/NewLogin.php', $data);
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
			'divisi_id' => $this->input->post('divisi_id'),
			'usename' => $this->input->post('usename'),
			'kd_cabang' => $this->input->post('kd_cabang'),
			'SESSION_TOKEN' => $this->input->post('token')
		);

		$data1 = array(
			'nama' => $this->input->post('nama'),
			'nik'=> $this->input->post('nik'),
			'jabatan' => $this->input->post('jabatan'),
			'email' => $this->input->post('email'),
			'iat' => $this->input->post('iat'),
			'exp' => $this->input->post('exp'),
			'usename' => $this->input->post('usename'),
			'userIdLogin' => $this->input->post('userIdLogin'),
			'divisi_id' => $this->input->post('divisi_id'),
			'kd_cabang' => $this->input->post('kd_cabang'),
			'SESSION_TOKEN' => $this->input->post('token')
		);
	
		

		if($this->input->post('nama') != ''){ //ada data di parsing -> set session login
		
			$userAccess = $this->LoginModel->userAccess($userId);
			if(count($userAccess) > 0){
				foreach ($userAccess as $row) :
					if( $row['access_id'] == '1'){
						$data1['user_access'] = 'ok';
					}
					else if( $row['access_id'] == '2'){
						$data1['entry_aset_dokumen'] = 'ok';
					}
					else if( $row['access_id'] == '3'){
						$data1['verifikasi_aset_dokumen'] = 'ok';
					}
					else if( $row['access_id'] == '4'){
						$data1['pemindahan_lokasi'] = 'ok';
					}
					else if( $row['access_id'] == '5'){
						$data1['verifikasi_pemindahan_lokasi'] = 'ok';
					}
					else if( $row['access_id'] == '6'){
						$data1['proses_credit_checking'] = 'ok';
					}
					else if( $row['access_id'] == '7'){
						$data1['hasil_credit_checking'] = 'ok';
					}
					else if( $row['access_id'] == '8'){
						$data1['pengajuan_LPDK'] = 'ok';
					}
					else if( $row['access_id'] == '9'){
						$data1['LPDK'] = 'ok';
					}
					else if( $row['access_id'] == '10'){
						$data1['cek_sertifikat'] = 'ok';
					}
					else if( $row['access_id'] == '11'){
						$data1['BSS'] = 'ok';
					}
					else if( $row['access_id'] == '12'){
						$data1['request_jaminan_ke_centro'] = 'ok';
					}
					else if( $row['access_id'] == '13'){
						$data1['verifikasi_request_jaminan_ke_centro'] = 'ok';
					}
				endforeach;	
			}

			$userAccessGroup = $this->LoginModel->userAccessGroup($userId);
			if(count($userAccessGroup) > 0){
				foreach ($userAccessGroup as $row) :
					if( $row['access_id'] == '1'){
						$data1['user_access_group'] = 'ok';
					}
					else if( $row['access_id'] == '2'){
						$data1['entry_aset_dokumen_group'] = 'ok';
					}
					else if( $row['access_id'] == '3'){
						$data1['verifikasi_aset_dokumen_group'] = 'ok';
					}
					else if( $row['access_id'] == '4'){
						$data1['pemindahan_lokasi_group'] = 'ok';
					}
					else if( $row['access_id'] == '5'){
						$data1['verifikasi_pemindahan_lokasi_group'] = 'ok';
					}
					else if( $row['access_id'] == '6'){
						$data1['proses_credit_checking_group'] = 'ok';
					}
					else if( $row['access_id'] == '7'){
						$data1['hasil_credit_checking_group'] = 'ok';
					}
					else if( $row['access_id'] == '8'){
						$data1['pengajuan_LPDK_group'] = 'ok';
					}
					else if( $row['access_id'] == '9'){
						$data1['LPDK_group'] = 'ok';
					}
					else if( $row['access_id'] == '10'){
						$data1['cek_sertifikat_group'] = 'ok';
					}
					else if( $row['access_id'] == '11'){
						$data1['BSS_group'] = 'ok';
					}
					else if( $row['access_id'] == '12'){
						$data1['request_jaminan_ke_centro_group'] = 'ok';
					}
					else if( $row['access_id'] == '13'){
						$data1['verifikasi_request_jaminan_ke_centro_group'] = 'ok';
					}
				endforeach;	
			}

			$data1['version']    = 'CentroSystem Web Versi Dev';
			$this->session->set_userdata($data1);
			
			echo json_encode($data);
    	}
    	else{ //nggak ada data yang di parsing -> balikin error ke js login
    		$this->session->set_flashdata('error', 'Username atau Password Salah'); 
    	}	

	}

	public function logout_process(){
		$this->session->sess_destroy();  
		//redirect('LoginController/index'); 
	}

	
}
