<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class UserAccessModel extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
	}
	   
	//NEW USER ACCESS
	public function ListData(){
		$this->db2 = $this->load->database('db2', true);
		$str = "SELECT user_id, nama, nik, jabatan, email, user
				FROM user
				limit 25;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}
	public function ListDataSearch($search){
		$this->db2 = $this->load->database('db2', true);
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
		$this->db3 = $this->load->database('DB_CENTRO', true);
		$str = "SELECT access_id , menu_access_name FROM ACCESS_CENTRO;";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function accessExisting($userId){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		$str = "SELECT UAC.`user_access_id` 'user_access_id', 
						U.`nama` AS 'NAMA', 
						AC.`menu_access_name` AS 'HAK_AKSES', 
						UAC.`tanggal_tambah` 'TANGGAL', 
						UAC.`added_by` 'TAMBAH',
						UAC.`access_id`
				FROM user_access_centro UAC
				LEFT JOIN DPM_ONLINE.`user` U
				ON U.`user_id` = UAC.`user_id`
				LEFT JOIN `access_centro` AC
				ON AC.`access_id` = UAC.`access_id`
				WHERE UAC.`user_id` = '$userId'
				ORDER BY  UAC.`access_id` ASC; ";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function user_access_group_list(){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		$str = "SELECT * FROM group_access_centro_header h
				WHERE h.`flag_aktif` = '1';";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function user_access_group_user($userId){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		$str = "SELECT g.`access_group_header_id`, g.`user_id` , h.`id`, h.`group_access`, h.`description`
				FROM user_group_access_centro g,
					group_access_centro_header h
				WHERE g.`user_id` =  '$userId'
				AND h.`id` = g.`access_group_header_id`;";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function addUserAccessNew($userId,$access_id,$addBy){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		
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
		$this->db3 = $this->load->database('DB_CENTRO', true);
		
		$this->db3->query("DELETE FROM user_access_centro
							WHERE user_id = '$userId'
							AND access_id = '$access_id';");
	}
	public function add_user_group($userId,$id_group,$addBy){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		
		$str = "SELECT 1 FROM user_group_access_centro ug
				WHERE ug.`user_id` = '$userId';";
		$query = $this->db3->query($str);

		$exist = $query->result_array();

		if(count($exist) == 0){
			$this->db3->query("INSERT INTO user_group_access_centro (
									access_group_header_id,
									user_id,
									tanggal_aktif,
									addby) 
								SELECT '$id_group', '$userId', NOW(), '$addBy' 
								FROM DUAL 
								WHERE NOT EXISTS 
								(SELECT 1 FROM user_group_access_centro G 
									WHERE access_group_header_id = '$id_group' 
									AND user_id = '$userId');");
		}else{
			$this->db3->query("UPDATE user_group_access_centro UG
								SET UG.`access_group_header_id` = '$id_group',
									UG.`addby` = '$addBy',
									UG.`tanggal_aktif` = NOW()
								WHERE UG.`user_id` = '$userId';");
		}
		
		
	}

	/// ACCESS GROUP MENU
	public function getGroupMenu(){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		$str = "SELECT * FROM group_access_centro_header h
				WHERE h.flag_aktif = '1';";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function accessGroupHeader($id_header){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		$str = "SELECT * FROM group_access_centro_header H
				WHERE h.`id` = '$id_header';";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function accessGroupExisting($id_header){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		$str = "SELECT d.access_group_header_id, d.access_id, d.tanggal_tambah
				FROM group_access_centro_details d
				WHERE d.access_group_header_id = '$id_header';";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}
	public function generateID(){
		$this->db = $this->load->database('DB_CENTRO', true);
		$str = "SELECT MAX(id) + 1 AS id FROM group_access_centro_header;";
		$query = $this->db->query($str);
		$id = $query->result_array();
        
        return $id[0]["id"];
	}
	public function insert_header($id,$input_nama_grup,$input_deskripsi){
		$this->db = $this->load->database('DB_CENTRO', true);
		$str = "INSERT INTO group_access_centro_header (id,group_access,flag_aktif,description)
				VALUES ('$id','$input_nama_grup','1','$input_deskripsi');";
		$query = $this->db->query($str);
	}
	public function add_group_details($id,$access_id){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		
		$this->db3->query("INSERT INTO group_access_centro_details (access_group_header_id,access_id,tanggal_tambah) 
							SELECT '$id','$access_id',SYSDATE() FROM DUAL
							WHERE NOT EXISTS 
							(SELECT 1 FROM group_access_centro_details WHERE access_group_header_id = '$id'
							AND access_id = '$access_id');");
	}
	public function remove_group_details($id,$access_id){
		$this->db3 = $this->load->database('DB_CENTRO', true);
		
		$this->db3->query("DELETE FROM group_access_centro_details
							WHERE access_group_header_id = '$id'
							AND access_id = '$access_id';");
	}
	public function update_header($id,$input_nama_grup,$input_deskripsi){
		$this->db = $this->load->database('DB_CENTRO', true);
		$str = "UPDATE group_access_centro_header H
				SET H.`group_access` = '$input_nama_grup',
					H.`description`  = '$input_deskripsi'
				WHERE H.`id` = '$id'; ";
		$query = $this->db->query($str);
	}


}



