<?php 

class Model_memorandum_so extends CI_Model{
	function tampil_data_pendidikan(){
		$pendidikanWhere = array('id_parameter =' => '02', 'nama_parameter =' => 'PENDIDIKAN', 'flg_aktif' => '1');
		return $this->db->select('nama_detail')->where($pendidikanWhere)->get('view_creditscoring');
	}
	function tampil_data_jml_tanggungan(){
		$pendidikanWhere = array('id_parameter =' => '04', 'nama_parameter =' => 'JUMLAH TANGGUNGAN', 'flg_aktif' => '1');
		return $this->db->select('nama_detail')->where($pendidikanWhere)->get('view_creditscoring');
	}
	
}