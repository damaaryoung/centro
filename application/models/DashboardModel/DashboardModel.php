<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class DashboardModel extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
       }


	public function testfunct(){
		//$this->DB_TICKET_SUPP = $this->load->database('DB_TICKET_SUPP', true);
		$str = "SELECT COUNT(*)
				FROM agunan_tanah
               ";
		//$query = $this->db->count_all('agunan_tanah');
		

		return $this->db->count_all('agunan_tanah');
	}



}
