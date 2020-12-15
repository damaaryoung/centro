<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class LoginModel extends CI_Model{

	public function __construct()
	{
		parent::__construct();
	}
	
	public function post_api_login($data,$url){
		$url = $this->config->item('url_api_login').$link;
		$ch = curl_init($url);
		$json = json_encode($data);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($ch);
		return $result;
	}

	/// select menu akses untuk dokumen dummy
	public function userAccess($userId){
		$this->db3 = $this->load->database('DB_TEST', true);
		$str = "SELECT access_id
				FROM `user_access_centro`
				WHERE user_id = $userId; 
			   ";
		$query = $this->db3->query($str);
        
        return $query->result_array();
	}


}
