<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class Request_Jaminan_Centro_Model extends CI_Model{
	
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

    /// insert page
    public function getJaminanDokumen($kode_kantor, $kode_kantor_lokasi_jaminan){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT `jaminan_dokument`.`no_reff`, `agunan_id`, `jaminan_dokument`.`kode_kantor`, `kode_kantor_lokasi_jaminan`, 
                    jh.`status`, `jenis`,
                    IF(`jenis`='SERTIFIKAT',
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
                            ) AS deskripsi_ringkas,
                        `no_rekening_agunan`, `verifikasi`, `kode_kantor`, `kode_kantor_lokasi_jaminan`, `lokasi_penyimpanan`
                FROM `jaminan_dokument`
                LEFT JOIN (
                    SELECT no_reff, `status` FROM `jaminan_header`) jh ON jh.`no_reff`=`jaminan_dokument`.`no_reff`
                WHERE verifikasi=1 AND kode_kantor='$kode_kantor' AND `kode_kantor_lokasi_jaminan` = '$kode_kantor_lokasi_jaminan'  
                AND `status`='MASUK' 
                ORDER BY no_reff
                LIMIT 0, 25;
            ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function getSearchJaminanDokumen($kode_kantor,$search){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT `jaminan_dokument`.`no_reff`, `agunan_id`, `jaminan_dokument`.`kode_kantor`, `kode_kantor_lokasi_jaminan`, 
                    jh.`status`, `jenis`,
                    IF(`jenis`='SERTIFIKAT',
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
                        ) AS deskripsi_ringkas,
                    `no_rekening_agunan`, `verifikasi`, `kode_kantor`, `kode_kantor_lokasi_jaminan`, `lokasi_penyimpanan`
                FROM `jaminan_dokument`
                    LEFT JOIN (
                    SELECT no_reff, `status` FROM `jaminan_header`) jh ON jh.`no_reff`=`jaminan_dokument`.`no_reff`
                WHERE verifikasi=1 
                AND (`jaminan_dokument`.`no_reff` LIKE '%$search%' 
                OR agunan_id LIKE '%$search%' 
                OR no_shm LIKE '%$search%' 
                OR no_shgb LIKE '%$search%' 
                OR no_ajb LIKE '%$search%' 
                OR nama_pemilik_sertifikat LIKE '%$search%' 
                OR nomor_bpkb LIKE '%$search%' OR nama_bpkb LIKE '%$search%' 
                OR no_mesin LIKE '%$search%' 
                OR no_polisi LIKE '%$search%') 
                AND `status`= 'MASUK' 
                ORDER BY no_reff
                LIMIT 0, 25
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
    public function generateNomor($kode_kantor_tujuan){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT CONCAT('$kode_kantor_tujuan','.',LPAD(SUBSTR(nomor, 4, 6) + 1, 6, '0')) AS hasil 
                FROM jaminan_request_pemindahan 
                WHERE nomor LIKE CONCAT('$kode_kantor_tujuan', '.%') 
                    ORDER BY hasil DESC 
                    LIMIT 1;";
		$query = $this->db2->query($str);
		
		return $query->result_array();
    }
    public function insertDataPemindahan($main_tanggal,
                                            $nomor,
                                            $kode_kantor_lokasi_jaminan,
                                            $kode_kantor_tujuan,
                                            $main_keterangan,
                                            $main_keperluan,
                                            $userIdLogin,
                                            $verifikasi,
                                            $kode_custodian,
                                            $main_pic){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO `jaminan_request_pemindahan` (
                                `nomor`,
                                `tgl`,
                                `kode_kantor_lokasi_jaminan`,
                                `kode_kantor_tujuan`,
                                `ket`,
                                `keperluan`,
                                `user_id`,
                                `verifikasi`,
                                `kode_custodian`,
                                `pic_request_pemindahan`) 
                            VALUES (
                                '$nomor',
                                '$main_tanggal',
                                '$kode_kantor_lokasi_jaminan',
                                '$kode_kantor_tujuan',
                                '$main_keterangan',
                                '$main_keperluan',
                                '$userIdLogin',
                                '$verifikasi',
                                '$kode_custodian',
                                '$main_pic');");
    }
    public function insertDataPemindahanDetail($nomor,$nomorReffDeatail,$agunanIdDetail){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO jaminan_request_pemindahan_detail (
                                    `nomor`, 
                                    `no_reff`, 
                                    `agunan_id`)
                            VALUES('$nomor',
                                   '$nomorReffDeatail',
                                   '$agunanIdDetail');");
    }
    public function deleteDataPemindahan($nomor,$version,$usename,$kode_kantor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
        $this->db2->trans_start();
        $this->db2->query("INSERT INTO user_log (USER, kd_menu, waktu, ket, AppVer, ip) 
                            VALUES('$usename',
                                'Request Jaminan Ke Centro',
                                NOW(),
                                'Hapus Pemindahan Request Jaminan nomor=$nomor nama kantor tujuan=$kode_kantor',
                                '$version',
                                (SELECT SUBSTRING(HOST, 1, 20) FROM information_schema.processlist WHERE ID=CONNECTION_ID())
                            );");
        $this->db2->query("DELETE FROM jaminan_request_pemindahan WHERE nomor='$nomor';");
        $this->db2->query("DELETE FROM jaminan_request_pemindahan_detail WHERE nomor='$nomor';");
		$this->db2->trans_complete();
    }

    public function getEmailCentro($kode_custodian){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT GROUP_CONCAT(VALUE)  AS `email`
                FROM parameter p1
                WHERE id LIKE '%EMAIL_CENTRO_HEAD_$kode_custodian%'
                OR id LIKE '%EMAIL_CENTRO_STAFF_$kode_custodian%';";
        $query = $this->db2->query($str);
        
        $result = $query->result_array();
        return $result[0]["email"];
    }



    
}   

