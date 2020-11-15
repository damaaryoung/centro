<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class UserAccessModel extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
       }

	public function UserData($userId){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT user_id, nama, nik, jabatan, email
				FROM user
				WHERE USER_ID = $userId;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}

	public function AccessMenu($userId){
		$this->db3 = $this->load->database('DB_TEST', true);
		$str = "SELECT access_id, menu_access_name
				FROM access_centro
				WHERE ACCESS_ID NOT IN (SELECT ACCESS_ID
							FROM user_access_centro
							WHERE USER_ID = '$userId'
							);
               ";
        $query = $this->db3->query($str);
        
        return $query->result_array();
	}

	public function userAccessExisting($userId){
		$this->db3 = $this->load->database('DB_TEST', true);
		$str = "SELECT UAC.`user_access_id` 'user_access_id', 
					   U.`nama` AS 'NAMA', 
					   AC.`menu_access_name` AS 'HAK_AKSES', 
					   UAC.`tanggal_tambah` 'TANGGAL', 
					   UAC.`added_by` 'TAMBAH'
				FROM TEST.user_access_centro UAC
				LEFT JOIN DPM_ONLINE.`user` U
				ON U.`user_id` = UAC.`user_id`
				LEFT JOIN TEST.`access_centro` AC
				ON AC.`access_id` = UAC.`access_id`
				WHERE UAC.`user_id` = '$userId'; 
			   ";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}

	public function addUserAccess($userId,$access_id,$addBy){
		$this->db3 = $this->load->database('DB_TEST', true);
		
		$this->db3->query("INSERT INTO user_access_centro(user_id, access_id, tanggal_tambah, added_by) 
						   VALUES ($userId,$access_id,sysdate(), '$addBy')");
	}

	public function refreshView($datas){
		$session = $this->session->userdata('nama');
		$data['js'] = $this->load->view('includes/js.php', NULL, TRUE);
		$data['css'] = $this->load->view('includes/css.php', NULL, TRUE);
		$data['navbar'] = $this->load->view('templates/navbar.php', NULL, TRUE);
		$data['sidebar'] = $this->load->view('templates/sidebar.php', NULL, TRUE);
		$data['footer'] = $this->load->view('templates/footer.php', NULL, TRUE);
		$data['ctrlbar'] = $this->load->view('templates/ControlSidebar.php', NULL, TRUE);
		//$data['delModal'] = $this->load->view('templates/UserAccessDeleteModal.php', NULL, TRUE);
		$userId = $datas;
	
		if($session != ''){
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
			$this->load->view('ViewUserAccess/ViewInfoUserAccess.php', $data);
		}
		else{
			redirect('LoginController/index'); 
		}
	}

	public function revokeAkses($user_access_id){
		$this->db3 = $this->load->database('DB_TEST', true);
		
		$this->db3->query("DELETE 
						   FROM USER_ACCESS_CENTRO
						   WHERE user_access_id = $user_access_id;");
	}

	//NEW USER ACCESS
	public function ListData(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT user_id, nama, nik, jabatan, email, user
				FROM user
				limit 25;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function ListDataSearch($search){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT user_id, nama, nik, jabatan, email, user
				FROM user
				WHERE user_id LIKE '%$search%'
				OR    nama    LIKE '%$search%'
				OR    nik     LIKE '%$search%'
				OR    email   LIKE '%$search%'
				limit 25;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function userAccessList(){
		$this->db3 = $this->load->database('DB_TEST', true);
		$str = "SELECT access_id , menu_access_name FROM ACCESS_CENTRO;";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function accessExisting($userId){
		$this->db3 = $this->load->database('DB_TEST', true);
		$str = "SELECT UAC.`user_access_id` 'user_access_id', 
						U.`nama` AS 'NAMA', 
						AC.`menu_access_name` AS 'HAK_AKSES', 
						UAC.`tanggal_tambah` 'TANGGAL', 
						UAC.`added_by` 'TAMBAH',
						UAC.`access_id`
				FROM TEST.user_access_centro UAC
				LEFT JOIN DPM_ONLINE.`user` U
				ON U.`user_id` = UAC.`user_id`
				LEFT JOIN TEST.`access_centro` AC
				ON AC.`access_id` = UAC.`access_id`
				WHERE UAC.`user_id` = '$userId'
				ORDER BY  UAC.`access_id` ASC; ";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function addUserAccessNew($userId,$access_id,$addBy){
		$this->db3 = $this->load->database('DB_TEST', true);
		
		$this->db3->query("INSERT INTO user_access_centro (user_id,
															access_id,
															tanggal_tambah,
															added_by) 
							SELECT '$userId','$access_id',SYSDATE(),'$addBy'  FROM DUAL
							WHERE NOT EXISTS 
							(SELECT 1 FROM user_access_centro WHERE user_id = '$userId'
							AND access_id = '$access_id');");
	}
	public function revokeAksesNew($userId,$access_id){
		$this->db3 = $this->load->database('DB_TEST', true);
		
		$this->db3->query("DELETE FROM user_access_centro
							WHERE user_id = '$userId'
							AND access_id = '$access_id';");
	}

}

