<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserAccessController extends CI_Controller {
	public function __construct() {
		parent:: __construct();
        $this->load->model('UserAccessModel/UserAccessModel');
       
	}

	public function index(){
		$session = $this->session->userdata('nama');
		$data['active'] = 'dokumen';
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){			
			$this->load->view('ViewUserAccess/ViewListUserAccess.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}

	public function getListUser(){
		$UserData = $this->UserAccessModel->ListData();
	
			foreach ($UserData as $row) :
				$data[]    = 	['<tr style="cursor:pointer" onclick="getDetail('.$row['user_id'].')"> <td>'
											. $row['user_id'] . '</td> <td>'
											. $row['nama']. '</td> <td>'
											. $row['nik']. '</td> <td>'
											. $row['jabatan'].'</td> <td>'
											. $row['email'] . '</td>  <td>'
											. $row['user'] . '</td>'
											. ' </tr>'];
												
										
			endforeach;	
		
		echo json_encode($data);
	}

	public function getSearch(){
		$search = $this->input->post('search');
		$UserData = $this->UserAccessModel->ListDataSearch($search);
	
			foreach ($UserData as $row) :
				$data[]    = 	['<tr style="cursor:pointer" onclick="getDetail('.$row['user_id'].')"> <td>'
											. $row['user_id'] . '</td> <td>'
											. $row['nama']. '</td> <td>'
											. $row['nik']. '</td> <td>'
											. $row['jabatan'].'</td> <td>'
											. $row['email'] . '</td> <td>'
											. $row['user'] . '</td>'
											. ' </tr>'];
												
										
			endforeach;	
		
		echo json_encode($data);
	}
	// info user index
	public function getDetail(){
	
			$userId = $this->input->post('user_id');
			//DATA AKSES USER
			$data['MenuData'] = $this->UserAccessModel->userAccessList();
			//DATA MENU
			$data['AksesData'] = $this->UserAccessModel->accessExisting($userId);
			

			echo json_encode($data);
		
	}

	public function userAccessProcess(){
		$userId       = $this->input->post('id_user_get');
		$arrSaveUserAccess = $this->input->post('arrSaveUserAccess');
		$lengthParsed      = $this->input->post('lengthParsed');
		$addBy             = $this->session->userdata('usename'); 

		$data['arrSaveUserAccess']     = $this->input->post('arrSaveUserAccess');
		$data['lengthParsed']     = $this->input->post('lengthParsed');

		for($i = 0; $i < $lengthParsed; $i++){
			$access_id =  $arrSaveUserAccess[$i][0];

			if($arrSaveUserAccess[$i][1] == 'Y'){
				$this->UserAccessModel->addUserAccessNew($userId,$access_id,$addBy);
			}
			else if($arrSaveUserAccess[$i][1] == 'N'){
				$this->UserAccessModel->revokeAksesNew($userId,$access_id);
			}
			
		}
		
		echo json_encode($data);
	}

	/// access group menuS
	public function groupAccessIndex(){
		$session = $this->session->userdata('nama');
		$data['active'] = 'dokumen';
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);

		if($session != ''){			
			$this->load->view('ViewUserAccess/view_user_access_group.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
		
	}
	public function getListGroupMenu(){
		$UserData = $this->UserAccessModel->getGroupMenu();

		if(count($UserData) == 0){
			$data [] = '';
			
		}else{
			foreach ($UserData as $row) :
				$data[]    = 	['<tr style="cursor:pointer" onclick="getDetail('.$row['id'].')"> <td>'
											. $row['id']. '</td> <td>'
											. $row['group_access']. '</td> <td>'
											. $row['description'].'</td>'
											. ' </tr>'];
												
										
			endforeach;	
		}		
		echo json_encode($data);
	}
	public function getListMenu(){
		//DATA AKSES USER
		$data['MenuData'] = $this->UserAccessModel->userAccessList();
	}
	public function addNewGroup(){
		$input_nama_grup   = $this->input->post('input_nama_grup');
		$input_deskripsi   = $this->input->post('input_deskripsi');
		$arrSaveUserAccess = $this->input->post('arrSaveUserAccess');
		$lengthParsed      = $this->input->post('lengthParsed');
		$id              = $this->UserAccessModel->generateID();

		$data['input_nama_grup']   = $input_nama_grup;
		$data['input_deskripsi']   = $input_deskripsi;
		$data['arrSaveUserAccess'] = $arrSaveUserAccess;
		$data['lengthParsed']      = $lengthParsed;
		$data['id'] = $id;

		$this->UserAccessModel->insert_header($id,$input_nama_grup,$input_deskripsi);
		for($i = 0; $i < $lengthParsed; $i++){
			$access_id =  $arrSaveUserAccess[$i][0];

			if($arrSaveUserAccess[$i][1] == 'Y'){
				$this->UserAccessModel->add_group_details($id,$access_id);
			}
			else if($arrSaveUserAccess[$i][1] == 'N'){
				$this->UserAccessModel->remove_group_details($id,$access_id);
			}
			
		}

		echo json_encode($data);
	}
	public function get_detail_group(){
		$id_header = $this->input->post('id_header');
		//DATA AKSES USER
		$data['MenuData'] = $this->UserAccessModel->userAccessList();
		//DATA MENU HEADER
		$data['GroupHeader'] = $this->UserAccessModel->accessGroupHeader($id_header);
		//DATA MENU DETAILS
		$data['AksesData'] = $this->UserAccessModel->accessGroupExisting($id_header);

	
		echo json_encode($data);
	}
	public function update_group(){
		$input_nama_grup   = $this->input->post('input_nama_grup');
		$input_deskripsi   = $this->input->post('input_deskripsi');
		$arrSaveUserAccess = $this->input->post('arrSaveUserAccess');
		$lengthParsed      = $this->input->post('lengthParsed');
		$id         = $this->input->post('id_header');

		$this->UserAccessModel->update_header($id,$input_nama_grup,$input_deskripsi);

		for($i = 0; $i < $lengthParsed; $i++){
			$access_id =  $arrSaveUserAccess[$i][0];

			if($arrSaveUserAccess[$i][1] == 'Y'){
				$this->UserAccessModel->add_group_details($id,$access_id);
			}
			else if($arrSaveUserAccess[$i][1] == 'N'){
				$this->UserAccessModel->remove_group_details($id,$access_id);
			}
			
		}
	}


}
