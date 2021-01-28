<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class PemindahanVerifikasiModel extends CI_Model{
	
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
                WHERE jp.kode_kantor_tujuan = '$kode_kantor' 
                #HAVING verifikasi = 0 
                ORDER BY verifikasi asc, jp.tgl DESC 
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
                WHERE jp.kode_kantor_tujuan  = '$kode_kantor' 
                AND (jp.nomor LIKE '%$search%' 
                    OR kk1.nama_kantor LIKE '%$search%' 
                    OR kk2.nama_kantor LIKE '%$search%') 
                    #HAVING verifikasi = 0 
                ORDER BY verifikasi asc, jp.tgl DESC LIMIT 0, 25";
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
    public function getJaminanPemindahanHeader($tblNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT * 
                FROM jaminan_pemindahan JP
                WHERE JP.`nomor` = '$tblNomor';";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function getPemindahanJaminanDetail($dataNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT jpd.`id`, jpd.`nomor`, jpd.`no_reff`, jd.`agunan_id`, jd.`jenis`, jpd.`lokasi_rack`,
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
                FROM jaminan_pemindahan_detail jpd
                    LEFT JOIN `jaminan_dokument` jd ON jd.`no_reff`=jpd.`no_reff`
                WHERE  jpd.`nomor`='$dataNomor' ORDER BY id 
            ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function getSearchJaminanDokumen($kode_kantor,$search){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT `jaminan_dokument`.`no_reff`, `agunan_id`, `jaminan_dokument`.`kode_kantor`, `kode_kantor_lokasi_jaminan`, 
                    jh.`status`, 
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
                AND kode_kantor_lokasi_jaminan='$kode_kantor'  
                AND `status`= 'MASUK' 
                ORDER BY no_reff
                LIMIT 0, 25
            ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function verifikasieDataPemindahan($mainNomor,
                                                $mainVerifikasi,
                                                $kode_kantor_tujuan,
                                                $kode_lokasi_penyimpanan,
                                                $parsedDataDetailArr,
                                                $lengthParsed){
       $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
        $this->db2->trans_start();
        $this->db2->query("UPDATE jaminan_pemindahan 
                            SET `verifikasi` = '$mainVerifikasi'
                            WHERE `nomor` = '$mainNomor';");
       
        //looping update di jaminan dokument
        for($i = 0; $i < $lengthParsed; $i++){
			$nomorReffDetail = $parsedDataDetailArr[$i][0];
            $agunanIdDetail  = $parsedDataDetailArr[$i][1];
            $nomor_rack      = $parsedDataDetailArr[$i][2];
            $this->db2->query("UPDATE jaminan_dokument 
                                SET `kode_kantor_lokasi_jaminan`='$kode_kantor_tujuan', 
                                     lokasi_penyimpanan = '$kode_lokasi_penyimpanan',
                                     `lokasi_rack`  = '$nomor_rack'
                                WHERE no_reff = '$nomorReffDetail'
                                and agunan_id = '$agunanIdDetail';"); 
            $this->db2->query("UPDATE jaminan_pemindahan_detail
                                SET `last_update` = NOW(),
                                     `lokasi_rack`  = '$nomor_rack'
                                WHERE `nomor` = '$mainNomor'
                                and agunan_id = '$agunanIdDetail';");                       
			
		}                   
        $this->db2->trans_complete();
    }

     
}
