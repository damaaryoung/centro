<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Request_Jaminan_Update_Model extends CI_Model{
	
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
    public function getCentro(){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT kode_centro AS `kode`, nama_centro AS `nama`, flg_aktif AS `flg_aktif`
                FROM kre_kode_centro
                WHERE 0=0 
                ORDER BY kode;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function sysdate(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
        $query = $this->db->query($str);
        
        return $query->result_array();
    }

    public function getJaminanPemindahanHeader($tblNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT * 
                FROM jaminan_request_pemindahan JP
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
                FROM jaminan_request_pemindahan_detail jpd
                    LEFT JOIN `jaminan_dokument` jd ON jd.`no_reff`=jpd.`no_reff`
                WHERE  jpd.`nomor`='$dataNomor' ORDER BY id LIMIT 0, 25;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function updateDataRequestPemindahan($main_tanggal,
                                                                $main_nomor,
                                                                $kode_kantor_lokasi_jaminan,
                                                                $kode_kantor_tujuan,
                                                                $main_keterangan,
                                                                $main_keperluan,
                                                                $userIdLogin,
                                                                $kode_custodian,
                                                                $main_pic){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
        $this->db2->trans_start();
        $this->db2->query("UPDATE 
                                `jaminan_request_pemindahan`
                            SET `tgl`                        = '$main_tanggal',
                                `kode_kantor_lokasi_jaminan` = '$kode_kantor_lokasi_jaminan',              
                                `kode_kantor_tujuan`         = '$kode_kantor_tujuan',
                                `ket`                        = '$main_keterangan',
                                `keperluan`                  = '$main_keperluan',
                                `kode_custodian`             = '$kode_custodian',
                                `user_id`                    = '$userIdLogin',
                                `pic_request_pemindahan`     = '$main_pic'
                            WHERE `nomor`                    = '$main_nomor';");
        $this->db2->query("DELETE 
                            FROM `jaminan_request_pemindahan_detail` 
                            WHERE `nomor` = '$main_nomor' ;");
		$this->db2->trans_complete();
    }
    public function updateDataRequestPemindahanDetail($main_nomor,$nomorReffDeatail,$agunanIdDetail){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO jaminan_request_pemindahan_detail (
                                    `nomor`, 
                                    `no_reff`, 
                                    `agunan_id`,
                                    `updated_at`)
                            VALUES('$main_nomor',
                                   '$nomorReffDeatail',
                                   '$agunanIdDetail',
                                    NOW());");
    }
    
    public function getEmailCentro($kode_custodian){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT GROUP_CONCAT(VALUE)  AS `email`
                FROM parameter p1
                WHERE id LIKE '%EMAIL_CENTRO_HEAD_$kode_custodian%'
                OR id LIKE '%EMAIL_CENTRO_STAFF_$kode_custodian%';";
        $query = $this->db2->query($str);
        
        $result = $query->result_array();
        if($result[0]["email"] != null){
            return $result[0]["email"];
        }
        if($result[0]["email"] == null){
            $email = 'staf_tisupport@kreditmandiri.co.id';
            return $email;
        }
        
    }

}