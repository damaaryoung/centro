<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class PemindahanUpdateModel extends CI_Model{
	
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
    public function getCentro(){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT kode_centro AS `kode`, nama_centro AS `nama`, flg_aktif AS `flg_aktif`
                FROM dpm_online.kre_kode_centro
                WHERE 0=0 
                
                ORDER BY kode;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function getJaminanPemindahanHeader($tblNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT * 
                FROM dpm_online.jaminan_pemindahan JP
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
                FROM dpm_online.jaminan_pemindahan_detail jpd
                    LEFT JOIN `jaminan_dokument` jd ON jd.`no_reff`=jpd.`no_reff`
                WHERE  jpd.`nomor`='$dataNomor' ORDER BY id LIMIT 0, 25
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
    public function updateDataPemindahan($mainTanggal,
                                            $mainNomor,
                                            $kode_kantor,
                                            $kode_kantor_tujuan,
                                            $mainKeterangan,
                                            $userIdLogin,
                                            $kode_lokasi_penyimpanan
                                        ){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
        $this->db2->trans_start();
        $this->db2->query("UPDATE dpm_online.jaminan_pemindahan 
                            SET
                                `kode_kantor_tujuan` = '$kode_kantor_tujuan',
                                `lokasi_penyimpanan` = '$kode_lokasi_penyimpanan',
                                `ket`                = '$mainKeterangan',
                                `user_id`            = '$userIdLogin'
                            WHERE `nomor` = '$mainNomor';");
        $this->db2->query("DELETE FROM dpm_online.`jaminan_pemindahan_detail`
                           WHERE `nomor` = '$mainNomor';");
		$this->db2->trans_complete();
    }
    public function updateDataPemindahanDetail($mainNomor,$nomorReffDeatail,$agunanIdDetail){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
		$this->db2->query("INSERT INTO dpm_online.jaminan_pemindahan_detail (
                                    `nomor`, 
                                    `no_reff`, 
                                    `agunan_id`)
                            VALUES('$mainNomor',
                                   '$nomorReffDeatail',
                                   '$agunanIdDetail');");
    }

    public function getJaminanPemindahanHeaderCetak($tblNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT id,
                    nomor,
                    tgl,
                    `kode_kantor_asal`, 
                    IF(`kode_kantor_asal`='00','Kantor Cabang Bekasi Utara',kk1.nama_kantor) AS nama_kantor_asal,
                    `kode_kantor_tujuan`, 
                    IF(`kode_kantor_tujuan`='00','Kantor Cabang Bekasi Utara',kk2.nama_kantor) AS nama_kantor_tujuan,
                    ket,
                    lokasi_penyimpanan
                    
                FROM dpm_online.jaminan_pemindahan JP 
                LEFT JOIN dpm_online.`app_kode_kantor` kk1
                    ON kk1.`kode_kantor` = jp.`kode_kantor_asal`
                LEFT JOIN dpm_online.`app_kode_kantor` kk2
                    ON kk2.`kode_kantor` = jp.`kode_kantor_tujuan`
                WHERE JP.`nomor` = '$tblNomor';";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }   
    public function getPemindahanJaminanCetak($dataNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT jp.`nomor`, `tgl`, `kode_kantor_asal`, IF(`kode_kantor_asal`='00','Kantor Cabang Bekasi Utara',kk1.nama_kantor) AS nama_kantor_asal,
                    `kode_kantor_tujuan`, IF(`kode_kantor_tujuan`='00','Kantor Cabang Bekasi Utara',kk2.nama_kantor) AS nama_kantor_tujuan, `ket`,  
                    jpd.`no_reff`, jd.agunan_id,
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
                        ) AS deskripsi_ringkas, jd.no_rekening_agunan, 
                        get_nama_nasabah('KRE', jd.no_rekening_agunan) AS nama_nasabah, jp.lokasi_penyimpanan
                FROM `jaminan_pemindahan` jp
                LEFT JOIN `jaminan_pemindahan_detail` jpd ON jpd.`nomor`=jp.`nomor`
                LEFT JOIN `jaminan_dokument` jd ON jd.`no_reff`=jpd.`no_reff`
                LEFT JOIN app_kode_kantor kk1 ON kk1.kode_kantor=jp.kode_kantor_asal
                LEFT JOIN app_kode_kantor kk2 ON kk2.kode_kantor=jp.kode_kantor_tujuan
                WHERE jp.`nomor`='$dataNomor'
    
            ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function getAlamatHeader(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT CONCAT(alamat, ' ', kota, ' Telp.', telp, ' Fax.',fax) AS hasil FROM dpm_online.setup LIMIT 1;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}

    
}   


