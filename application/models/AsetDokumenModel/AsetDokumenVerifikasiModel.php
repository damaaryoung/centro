<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class AsetDokumenVerifikasiModel extends CI_Model{

	public function __construct()
	{
		parent::__construct();
    }
    public function listDokumenVerifikasi($kode_kantor){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        $str = "SELECT 
						jh.id AS `id`,
						LEFT(jh.nomor, 10) AS nomor,
						LEFT(jh.no_reff, 10) AS no_reff,
						jh.tgl,
						jh.nama,
						LEFT(jh.alamat, 200) AS alamat,
						jh.kelurahan,
						jh.kecamatan,
						jh.kota,
						jh.propinsi,
						jh.kode_pos,
						jh.jenis_jaminan,
						jh.roda_kendaraan,
						jh.status,
						jh.kontrak_status,
						jh.ket,
						jh.no_rekening,
						jh.tgl_realisasi,
						jh.kode_kantor,
						jh.verifikasi,
						jd.agunan_id
					FROM
						jaminan_header  jh
					LEFT JOIN jaminan_dokument jd
						ON jd.no_reff = jh.no_reff 
					WHERE STATUS = 'MASUK' 
					AND jh.kode_kantor = '$kode_kantor' 
					AND jd.agunan_id <> '' 
					ORDER BY jh.nomor DESC 
					#ORDER BY jaminan_header.id DESC 
					LIMIT 10;
				";
		$query = $this->db2->query($str);
		return $query->result_array();
    }
	public function getJaminanHeader($nomorAgunan , $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT  JH.id,
						JH.nomor,
						JH.no_reff,
						JH.tgl, 
						JH.nama, 
						JH.alamat, 
						JH.kelurahan, 
						JH.kecamatan, 
						JH.kota,  
						JH.propinsi,
						JH.kode_pos,
						JH.jenis_jaminan,
						JH.roda_kendaraan,
						JH.status,
						JH.kontrak_status,
						JH.ket,
						JH.no_rekening,
						JH.tgl_realisasi,
						JH.kode_kantor,
						JH.tgl_rencana_kembali,
						JH.jenis_pengurusan,
						JH.verifikasi,
						kk.`kode_cabang`,
						kk.`nama_kantor`
					FROM jaminan_header JH,
						`app_kode_kantor` KK
					WHERE nomor = '$nomorAgunan'
					AND no_reff = '$nomorRefAgunan'
					AND jh.`kode_kantor` = kk.`kode_kantor`;
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function getJaminanDokument($agunanID, $nomorRefAgunan){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT JD.*,
					kk.`kode_cabang` AS app_kode_kantor,
					kk.`nama_kantor` AS app_nama_kantor,
					KKJA.kode_jenis_agunan AS KKJA_kode_jenis_agunan,
					CONCAT(KKJA.kode_jenis_agunan,' - ',KKJA.deskripsi_jenis_agunan) AS KKJA_jenis_agunan,
					KKIHA.kode_ikatan_hukum,
					CONCAT(KKIHA.kode_ikatan_hukum,' - ',KKIHA.deskripsi_ikatan_hukum) AS ikatan_agunan,
					KKIHA.`PERSEN_DEFAULT` AS ikatan_persen_default,
					JJK.`nm_jenis` AS nama_jenis,
					JMK.`nm_merk` AS nama_merk,
					jtk.`nm_type` AS nama_type
				FROM
					jaminan_dokument JD 
					LEFT JOIN `app_kode_kantor` KK 
					ON JD.kode_kantor_lokasi_jaminan = KK.kode_kantor 
					LEFT JOIN kre_kode_jenis_agunan KKJA 
					ON JD.`jenis_agunan_detail` = KKJA.`KODE_JENIS_AGUNAN` 
					LEFT JOIN kre_kode_ikatan_hukum_agunan KKIHA 
					ON jd.`ikatan_agunan_detail` = KKIHA.`KODE_IKATAN_HUKUM` 
					LEFT JOIN jaminan_jenis_kendaraan JJK
					ON JD.`kd_jenis` = JJK.`kd_jenis`
					LEFT JOIN jaminan_merk_kendaraan JMK
					ON JD.`kd_merk` = JMK.`kd_merk`
					LEFT JOIN jaminan_type_kendaraan JTK
					ON JD.`kd_type` = JTK.`kd_type`
				WHERE agunan_id = '$agunanID' 
					AND no_reff = '$nomorRefAgunan';";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}
	public function selectKodeKantor(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT AKK.kode_kantor, AKK.kode_cabang, AKK.nama_kantor, AKK.`flg_aktif` 
				FROM `app_kode_kantor` AKK;";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}

	//verifikasi
	public function verifikasiHeader($idHeader,$verifHeader,$verifDokument,$varIdAgunanDokument,$idDokument){
		
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$this->db2->trans_start();
		$this->db2->query("UPDATE jaminan_header 
							SET
								#nama = 'TES KALI INI ',
								#alamat = 'ALAMAT TEST',
								#kota = 'KOTA TEST',
								#jenis_jaminan = 'SERTIFIKAT',
								#roda_kendaraan = '0',
								#ket = '',
								#no_rekening = '',
								verifikasi = '$verifHeader' 
							WHERE id = '$idHeader';");

		$this->db2->query("UPDATE `jaminan_dokument` SET verifikasi='$verifDokument' WHERE id='$idDokument';"); 
		$this->db2->query("UPDATE `kre_agunan` SET verifikasi='$verifDokument' WHERE agunan_id='$varIdAgunanDokument';");
		$this->db2->trans_complete();
						
	}

	//search list data
	public function searching($search,$status,$kode_kantor){
	    $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT jaminan_header.id,
                   LEFT(jaminan_header.nomor, 10) AS nomor,
                   LEFT(jaminan_header.no_reff, 10) AS no_reff,
                   jaminan_header.tgl,
                   jaminan_header.nama,
                   LEFT(jaminan_header.alamat, 200) AS alamat,
                   jaminan_header.kelurahan,
                   jaminan_header.kecamatan,
                   jaminan_header.kota,
                   jaminan_header.propinsi,
                   jaminan_header.kode_pos,
                   jaminan_header.jenis_jaminan,
                   jaminan_header.roda_kendaraan,
                   jaminan_header.status,
                   jaminan_header.kontrak_status,
                   jaminan_header.ket,
                   jaminan_header.no_rekening,
                   jaminan_header.tgl_realisasi,
                   jaminan_header.kode_kantor,
                   jaminan_header.verifikasi,
                   jd.agunan_id
				FROM
					jaminan_header 
				LEFT JOIN jaminan_dokument jd
					ON jd.no_reff = jaminan_header.no_reff 
				WHERE STATUS = '$status' 
					AND jaminan_header.kode_kantor = '$kode_kantor' 
					AND (
					jaminan_header.nomor LIKE '%$search%' 
					OR jd.`agunan_id` LIKE '%$search%'
					OR nama LIKE '%$search%'
					) 
				#ORDER BY jaminan_header.nomor DESC 
				ORDER BY jaminan_header.id DESC 
				LIMIT 0, 25
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}

}

