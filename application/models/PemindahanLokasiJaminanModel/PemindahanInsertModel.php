<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class PemindahanInsertModel extends CI_Model{
	
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
    public function getJaminanDokumen($kode_kantor){
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
                        `no_rekening_agunan`, `verifikasi`
                FROM `jaminan_dokument`
                LEFT JOIN (
                    SELECT no_reff, `status` FROM `jaminan_header`) jh ON jh.`no_reff`=`jaminan_dokument`.`no_reff`
                WHERE verifikasi=1 AND kode_kantor_lokasi_jaminan='$kode_kantor'  AND `status`='MASUK' 
                ORDER BY no_reff
                LIMIT 0, 25
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
                    `no_rekening_agunan`, `verifikasi`
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
                AND kode_kantor_lokasi_jaminan = '$kode_kantor'
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
    public function generateNomor($kode_kantor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT CONCAT('$kode_kantor','.',LPAD(SUBSTR(nomor, 4, 6) + 1, 6, '0')) AS hasil 
                FROM jaminan_pemindahan 
                WHERE nomor LIKE CONCAT('$kode_kantor', '.%') 
                    ORDER BY hasil DESC 
                    LIMIT 1";
		$query = $this->db2->query($str);
		
		return $query->result_array();
    }
    public function insertDataPemindahan($mainTanggal,
                                            $nomor,
                                            $kode_kantor,
                                            $kode_kantor_tujuan,
                                            $mainKeterangan,
                                            $userIdLogin,
                                            $kode_lokasi_penyimpanan,
                                            $verifikasi,
											$lengthParsed,
											$parsedDataDetailArr
                                        ){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        
        /// check apakah ada data counter di DB
        $str = "SELECT 1
                FROM kre_kode_centro_counter c
                WHERE c.`kode_centro` = '$kode_lokasi_penyimpanan'
                AND c.`tahun` = YEAR(NOW());";
        $query = $this->db2->query($str);
        $result = $query->result_array();
        if($result == null){
            $this->db2->query("INSERT INTO kre_kode_centro_counter (
                `kode_centro`,
                `tahun`,
                `flg_aktif`) 
            VALUES('$kode_lokasi_penyimpanan',
                    YEAR(NOW()),
                    '1');");
        }

		$this->db2->trans_start();
		$this->db2->query("INSERT INTO jaminan_pemindahan (
                                `nomor`,
                                `tgl`,
                                `kode_kantor_asal`,
                                `kode_kantor_tujuan`,
                                `ket`,
                                `user_id`,
                                `lokasi_penyimpanan`,
                                `verifikasi`
                            ) 
                            VALUES('$nomor',
                                    '$mainTanggal',
                                    '$kode_kantor',
                                    '$kode_kantor_tujuan',
                                    '$mainKeterangan',
                                    '$userIdLogin',
                                    '$kode_lokasi_penyimpanan',
                                    '$verifikasi');");
        
        for($i = 0; $i < $lengthParsed; $i++){
			$nomorReffDeatail = $parsedDataDetailArr[$i][0];
            $agunanIdDetail   = $parsedDataDetailArr[$i][1];
            
            $str = "SELECT LPAD(c.counter + 1,8,'0') AS counter 
                    FROM kre_kode_centro_counter c	
                    WHERE c.kode_centro = '$kode_lokasi_penyimpanan'
                    AND c.tahun = YEAR(NOW());";
            $query = $this->db2->query($str);
            $res = $query->result_array();

            $no_centro = $res[0]["counter"];
			
			$this->db2->query("INSERT INTO jaminan_pemindahan_detail (
                                    `nomor`, 
                                    `no_reff`, 
                                    `agunan_id`)
                                VALUES('$nomor',
                                    '$nomorReffDeatail',
                                    '$agunanIdDetail');
                                ");
            $this->db2->query("UPDATE jaminan_dokument d
                                SET d.`no_centro` = CONCAT('$kode_lokasi_penyimpanan','-',YEAR(NOW()),'-','$no_centro')
                                WHERE d.`agunan_id` = '$agunanIdDetail'
                                AND d.`no_reff` = '$nomorReffDeatail';");
            $this->db2->query("UPDATE kre_kode_centro_counter C
                                SET C.`counter` = $no_centro 
                                WHERE C.`kode_centro` = '$kode_lokasi_penyimpanan'
                                AND C.`tahun` =  YEAR(NOW());");
			
        }
        $this->db2->trans_complete();
    }


    
}   




