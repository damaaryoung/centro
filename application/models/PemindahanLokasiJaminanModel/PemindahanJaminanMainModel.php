<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class PemindahanJaminanMainModel extends CI_Model{
	
	public function __construct() {
		parent:: __construct();
		$this->load->database();
	}



    public function selectKodeKantor(){
            $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
            $str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
                    FROM dpm_online.`app_kode_kantor` AKK;
                ";
            $query = $this->db2->query($str);
            
            return $query->result_array();
    }
    public function listJaminan($kode_kantor){
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
                    `lokasi_penyimpanan` AS kode_lokasi_penyimpanan,
                    kkc.nama_centro AS nama_lokasi_penyimpanan,
                    `verifikasi` 
                FROM
                    `jaminan_pemindahan` jp 
                    LEFT JOIN app_kode_kantor kk1 
                    ON kk1.kode_kantor = jp.kode_kantor_asal 
                    LEFT JOIN app_kode_kantor kk2 
                    ON kk2.kode_kantor = jp.kode_kantor_tujuan 
                    LEFT JOIN kre_kode_centro kkc 
                    ON kkc.kode_centro = jp.lokasi_penyimpanan 
                WHERE jp.kode_kantor_asal = '$kode_kantor' 
                ORDER BY jp.nomor DESC 
                LIMIT 0, 25;
            ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function listJaminanSearch($search,$kode_kantor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT `id`, `nomor`, `tgl`, `kode_kantor_asal`, kk1.nama_kantor AS nama_kantor_asal,
                    `kode_kantor_tujuan`, kk2.nama_kantor AS nama_kantor_tujuan, `ket`, `user_id`,`lokasi_penyimpanan` AS kode_lokasi_penyimpanan, 
                    kkc.nama_centro AS nama_lokasi_penyimpanan , `verifikasi`
                FROM `jaminan_pemindahan` jp
                LEFT JOIN app_kode_kantor kk1 ON kk1.kode_kantor=jp.kode_kantor_asal
                LEFT JOIN app_kode_kantor kk2 ON kk2.kode_kantor=jp.kode_kantor_tujuan
                LEFT JOIN kre_kode_centro kkc ON kkc.kode_centro=jp.lokasi_penyimpanan
                WHERE jp.kode_kantor_asal = '$kode_kantor' 
                AND (jp.nomor LIKE '%$search%' 
                    OR kk1.nama_kantor LIKE '%$search%' 
                    OR kk2.nama_kantor LIKE '%$search%') 
                ORDER BY jp.nomor DESC LIMIT 0, 25
                ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
     public function deleteDataPemindahan($nomor,$version,$usename,$kode_kantor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
        $this->db2->trans_start();
        $this->db2->query("INSERT INTO dpm_online.user_log (USER, kd_menu, waktu, ket, AppVer, ip) 
                            VALUES
                            (
                                '$usename',
                                'fr_TransaksiPemindahanLokasiJaminan',
                                NOW(),
                                'Hapus Pemindahan Lokasi Jaminan nomor=$nomor nama kantor asal=$kode_kantor',
                                '$version',
                                (SELECT SUBSTRING(HOST, 1, 20) FROM information_schema.processlist WHERE ID=CONNECTION_ID())
                            );");
        $this->db2->query("DELETE FROM dpm_online.jaminan_pemindahan WHERE nomor='$nomor';");
        $this->db2->query("DELETE FROM dpm_online.jaminan_pemindahan_detail WHERE nomor='$nomor';");
		$this->db2->trans_complete();
    }

}