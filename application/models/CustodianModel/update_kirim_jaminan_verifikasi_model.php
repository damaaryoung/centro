<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class update_kirim_jaminan_verifikasi_model extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
	}

    public function selectKodeKantor(){
            $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
            $str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
                    FROM `app_kode_kantor` AKK;
                ";
            $query = $this->db2->query($str);
            
            return $query->result_array();
    }

    public function list_request_jaminan($kode_kantor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT 
                    `id`,
                    `nomor`,
                    `tgl`,
                    `kode_kantor_asal`,
                    kk1.nama_kantor AS nama_kantor_asal,
                    `kode_kantor_tujuan`,
                    kk2.nama_kantor AS nama_kantor_tujuan,
                    `ket`,
                    `user_id`,
                    `verifikasi` 
                FROM
                    `jaminan_request_pemindahan` jp 
                    LEFT JOIN app_kode_kantor kk1 
                    ON kk1.kode_kantor = jp.kode_kantor_asal 
                    LEFT JOIN app_kode_kantor kk2 
                    ON kk2.kode_kantor = jp.kode_kantor_tujuan 
                WHERE jp.kode_kantor_tujuan = '$kode_kantor' 
                #HAVING verifikasi = 0 
                ORDER BY jp.nomor DESC 
                LIMIT 0, 25;
            ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }

    public function listJaminanSearch($search,$kode_kantor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT 
                    `id`,
                    `nomor`,
                    `tgl`,
                    `kode_kantor_asal`,
                    kk1.nama_kantor AS nama_kantor_asal,
                    `kode_kantor_tujuan`,
                    kk2.nama_kantor AS nama_kantor_tujuan,
                    `ket`,
                    `user_id`,
                    `verifikasi` 
                FROM
                    `jaminan_request_pemindahan` jp 
                    LEFT JOIN app_kode_kantor kk1 
                    ON kk1.kode_kantor = jp.kode_kantor_asal 
                    LEFT JOIN app_kode_kantor kk2 
                    ON kk2.kode_kantor = jp.kode_kantor_tujuan 
                WHERE jp.kode_kantor_tujuan = '$kode_kantor' 
                    OR (jp.nomor LIKE '$search' 
                        OR kk1.nama_kantor LIKE '$search' 
                        OR kk2.nama_kantor LIKE '$search'
                    ) #HAVING verifikasi = 0 
                ORDER BY jp.nomor DESC 
                LIMIT 0, 25 ;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
}