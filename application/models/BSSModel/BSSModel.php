<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class BSSModel extends CI_Model{

 
	public function __construct() {
		parent:: __construct();
		$this->load->database();
    }


	public function getAll(){
		$this->db = $this->load->database('DB_OLD_WEBTOOL', true);
		$str = "SELECT * FROM view_header_bss  WHERE 1  ORDER BY kode_kantor, kartu_number ASC LIMIT 20 OFFSET 0";
        $query = $this->db->query($str);
		
		// $data['get'] = $query->result_array();
		$out['list'] = array();
		foreach($query->result_array() as $x){
			$z = array(
				'kartu_number' => $x['kartu_number'],
				'status' => $x['status'],
				'nama_kolektor' => $x['nama_kolektor'],
				'area_kerja' => $this->getKode($x['kode_kantor']),
				'no_rekening' => $x['no_rekening'],
				'nominal' => $x['nominal'],
				'tgl_bss' => $x['tgl_bss'],
				'pic' => $x['nama_pic'],
				'timeline_tgl_buat' => $x['timeline_tgl_buat'],
				'timeline_tgl_update' => $x['timeline_tgl_update']

			);
			array_push($out['list'], $z);
		}
		return $out;
		
	}

	public function getKode($kode){

		$this->db2= $this->load->database('db2', true);
		$str2 = "SELECT * FROM dpm_online.app_kode_kantor WHERE kode_kantor = '$kode'";
		$query = $this->db->query($str2);
		$out['area'] = array();
		foreach($query->result_array() as $x){
			$z = array(
				'nama_kantor' => $x['nama_kantor']		
			);
			array_push($out['area'], $z);
		}
		return $out;
	}

	// public function getStatus(){
		
	// }




}
