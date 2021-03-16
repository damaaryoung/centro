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
                WHERE jp.kode_kantor_lokasi_jaminan = '$kode_kantor' 
                #HAVING verifikasi = 0 
                ORDER BY verifikasi ASC,  tgl DESC, jp.nomor DESC 
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
                    AND (jp.nomor LIKE '$search%' 
                        OR kk1.nama_kantor LIKE '$search%' 
                        OR kk2.nama_kantor LIKE '$search%'
                    ) #HAVING verifikasi = 0 
                ORDER BY verifikasi ASC, tgl DESC,  jp.nomor DESC 
                LIMIT 0, 25 ;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }

    //// proses verifikasi
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
    public function verifikasieDataPemindahan($main_nomor,                 
                                                $main_tanggal,               
                                                $kode_custodian,             
                                                $kode_kantor_tujuan,         
                                                $kode_kantor_lokasi_jaminan, 
                                                $main_keperluan,             
                                                $main_keterangan,            
                                                $mainVerifikasi,		        
                                                $parsedDataDetailArr,      
                                                $lengthParsed){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		
        $this->db2->trans_start();
        $this->db2->query("UPDATE jaminan_request_pemindahan 
                            SET `verifikasi` = '$mainVerifikasi',
                                 `ket`       = '$main_keterangan'
                            WHERE `nomor` = '$main_nomor';");
        $this->db2->query("UPDATE jaminan_request_pemindahan_detail
                            SET `updated_at` = NOW()
                            WHERE `nomor` = '$main_nomor';"); 
        //looping update di jaminan dokument
        for($i = 0; $i < $lengthParsed; $i++){
			$nomorReffDetail = $parsedDataDetailArr[$i][0];
            $agunanIdDetail   = $parsedDataDetailArr[$i][1];
            $this->db2->query("UPDATE jaminan_dokument 
                                SET `kode_kantor_lokasi_jaminan`='$kode_kantor_tujuan', 
                                     lokasi_penyimpanan = '$kode_custodian' 
                                WHERE no_reff = '$nomorReffDetail'
                                and agunan_id = '$agunanIdDetail';"); 
			
		}                   
        $this->db2->trans_complete();
    }

    //cetak
    public function getJaminanPemindahanHeaderCetak($tblNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT id,
                    nomor,
                    tgl,
                    `kode_kantor_lokasi_jaminan`, 
                    IF(`kode_kantor_lokasi_jaminan`='00','Kantor Cabang Bekasi Utara',kk1.nama_kantor) AS nama_kantor_lokasi,
                    `kode_kantor_tujuan`, 
                    IF(`kode_kantor_tujuan`='00','Kantor Cabang Bekasi Utara',kk2.nama_kantor) AS nama_kantor_tujuan,
                    ket,
                    keperluan,
                    kode_custodian,
                    pic_request_pemindahan
                    
                FROM jaminan_request_pemindahan JP 
                LEFT JOIN `app_kode_kantor` kk1
                    ON kk1.`kode_kantor` = jp.`kode_kantor_lokasi_jaminan`
                LEFT JOIN `app_kode_kantor` kk2
                    ON kk2.`kode_kantor` = jp.`kode_kantor_tujuan`
                WHERE JP.`nomor` = '$tblNomor';";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }   
    public function getPemindahanJaminanCetak($dataNomor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT jp.`nomor`, `tgl`, jp.`kode_kantor_lokasi_jaminan`, IF(jp.`kode_kantor_lokasi_jaminan`='00','Kantor Cabang Bekasi Utara',kk1.nama_kantor) AS nama_kantor_lokasi_jaminan,
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
                        get_nama_nasabah('KRE', jd.no_rekening_agunan) AS nama_nasabah, jp.`kode_custodian`
                FROM `jaminan_request_pemindahan` jp
                LEFT JOIN `jaminan_request_pemindahan_detail` jpd ON jpd.`nomor`=jp.`nomor`
                LEFT JOIN `jaminan_dokument` jd ON jd.`no_reff`=jpd.`no_reff`
                LEFT JOIN app_kode_kantor kk1 ON kk1.kode_kantor=jp.kode_kantor_lokasi_jaminan
                LEFT JOIN app_kode_kantor kk2 ON kk2.kode_kantor=jp.kode_kantor_tujuan
                WHERE jp.`nomor`='$dataNomor';";
        $query = $this->db2->query($str);
        
        return $query->result_array();
    }
    public function getAlamatHeader(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT CONCAT(alamat, ' ', kota, ' Telp.', telp, ' Fax.',fax) AS hasil FROM setup LIMIT 1;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}

    public function getEmailKaops($kode_kantor_tujuan){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT GROUP_CONCAT(VALUE) AS `email` 
                FROM parameter
                WHERE id LIKE '%EMAIL_HEAD_OPS$kode_kantor_tujuan%';";
        $query = $this->db2->query($str);
        
        $result = $query->result_array();
        return $result[0]["email"];
    }

}