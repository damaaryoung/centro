<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Request_Jaminan_Verifikasi_Model extends CI_Model{
	
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

    public function list_request_jaminan($kode_kantor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT 
                    `id`,
                    `nomor`,
                    `tgl`,
                    `kode_kantor_lokasi_jaminan`,
                    kk1.nama_kantor AS nama_kantor_asal,
                    `kode_kantor_tujuan`,
                    kk2.nama_kantor AS nama_kantor_tujuan,
                    `ket`,
                    `user_id`,
                    `verifikasi` 
                FROM
                    `jaminan_request_pemindahan` jp 
                    LEFT JOIN app_kode_kantor kk1 
                    ON kk1.kode_kantor = jp.kode_kantor_lokasi_jaminan 
                    LEFT JOIN app_kode_kantor kk2 
                    ON kk2.kode_kantor = jp.kode_kantor_tujuan 
                WHERE jp.kode_kantor_lokasi_jaminan = '$kode_kantor' 
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
                    `kode_kantor_lokasi_jaminan`,
                    kk1.nama_kantor AS nama_kantor_asal,
                    `kode_kantor_tujuan`,
                    kk2.nama_kantor AS nama_kantor_tujuan,
                    `ket`,
                    `user_id`,
                    `verifikasi` 
                FROM
                    `jaminan_request_pemindahan` jp 
                    LEFT JOIN app_kode_kantor kk1 
                    ON kk1.kode_kantor = jp.kode_kantor_lokasi_jaminan 
                    LEFT JOIN app_kode_kantor kk2 
                    ON kk2.kode_kantor = jp.kode_kantor_tujuan 
                WHERE jp.kode_kantor_lokasi_jaminan = '$kode_kantor' 
                    OR (jp.nomor LIKE '$search' 
                        OR kk1.nama_kantor LIKE '$search' 
                        OR kk2.nama_kantor LIKE '$search'
                    ) #HAVING verifikasi = 0 
                ORDER BY jp.nomor DESC 
                LIMIT 0, 25 ;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }

    //// proses verifikasi
    public function getJaminanPemindahanHeader($tblNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT * 
                FROM dpm_online.jaminan_request_pemindahan JP
                WHERE JP.`nomor` = '$tblNomor';";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function getPemindahanJaminanDetail($dataNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT jpd.`id`, jpd.`nomor`, jpd.`no_reff`, jd.`agunan_id`, jd.`jenis`, 
                    LEFT( IF(jd.`jenis`='SERTIFIKAT',
                        CONCAT(IF(IFNULL(`no_shm`,'')<>'','SHM',
                                        IF(IFNULL(`no_shgb`,'')<>'','SHGB','AJB')),' NO. ', 
                                    IF(IFNULL(`no_shm`,'')<>'', IFNULL(`no_shm`,''),
                                        IF(IFNULL(`no_shgb`,'')<>'', IFNULL(`no_shgb`,''), IFNULL(`no_ajb`,''))),
                                    ' A/N : ', IFNULL(`nama_pemilik_sertifikat`,''), 
                                    ' ALAMAT : ', IFNULL(`alamat_sertifikat`,'')),
                        CONCAT('BPKB NO. ',IFNULL(`nomor_bpkb`,''),' A/N : ', IFNULL(`nama_bpkb`,''),
                                    ' ALAMAT : ', IFNULL(`alamat_bpkb`,''),
                                    ' NO RANGKA : ', IFNULL(`no_rangka`,''),
                                    ' NO MESIN : ', IFNULL(`no_mesin`,''),
                                    ' TAHUN ', IFNULL(`tahun`,''),' NO. POL : ', IFNULL(`no_polisi`,''))
                        ), 450) AS deskripsi_ringkas,
                    `no_rekening_agunan`
                FROM dpm_online.jaminan_request_pemindahan_detail jpd
                    LEFT JOIN `jaminan_dokument` jd ON jd.`no_reff`=jpd.`no_reff`
                WHERE  jpd.`nomor`='$dataNomor' ORDER BY id LIMIT 0, 25;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
}