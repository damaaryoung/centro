<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class AsetDokumenVerifikasiModel extends CI_Model{

	public function __construct()
	{
		parent::__construct();
    }
    
    public function listAsetDokumen(){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT 
				`jaminan_dokument`.`agunan_id`,
				LEFT(
				IF(
					`jenis` = 'SERTIFIKAT',
					CONCAT(
					IF(
						IFNULL(`no_shm`, '') <> '',
						'SHM',
						IF(
						IFNULL(`no_shgb`, '') <> '',
						'SHGB',
						'AJB'
						)
					),
					' NO. ',
					IF(
						IFNULL(`no_shm`, '') <> '',
						`no_shm`,
						IF(
						IFNULL(`no_shgb`, '') <> '',
						`no_shgb`,
						`no_ajb`
						)
					),
					' A/N : ',
					`nama_pemilik_sertifikat`,
					' ALAMAT : ',
					`alamat_sertifikat`
					),
					CONCAT(
					'BPKB NO. ',
					IFNULL(`nomor_bpkb`, ''),
					' A/N : ',
					`nama_bpkb`,
					' ALAMAT : ',
					`alamat_bpkb`,
					' NO RANGKA : ',
					`no_rangka`,
					' NO MESIN : ',
					`no_mesin`,
					' TAHUN ',
					`tahun`,
					' NO. POL : ',
					`no_polisi`
					)
				),
				450
				) AS deskripsi_ringkas_jaminan,
				`flg_cetak`.`nomor` AS nomor_cetak,
				jaminan_header.id,
				LEFT(jaminan_header.nomor, 10) AS nomor,
				LEFT(jaminan_header.no_reff, 10) AS no_reff,
				jaminan_header.tgl,
				IF(
				jaminan_header.`status` = 'PINJAM',
				CONCAT(
					jaminan_header.nama,
					' (Nasabah a.n:',
					`jaminan_history`.nama_nasabah,
					')'
				),
				jaminan_header.nama
				) AS nama,
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
				jaminan_header.tgl_rencana_kembali,
				jaminan_header.jenis_pengurusan,
				jaminan_header.verifikasi,
				`jaminan_history`.nama_nasabah,
				jaminan_dokument.kode_kantor_lokasi_jaminan,
				jaminan_pemindahan.`lokasi_penyimpanan` AS lokasi_penyimpanan #, app_kode_kantor.nama_kantor 
			FROM
				jaminan_header 
				LEFT JOIN `flg_cetak` 
				ON `flg_cetak`.nomor = jaminan_header.nomor 
				AND `flg_cetak`.setting = IF(
					jaminan_header.status = 'MASUK',
					'ASSET_IN',
					IF(
					jaminan_header.status = 'KELUAR',
					'ASSET_OUT',
					'ASSET_TEMP_OUT'
					)
				) 
				LEFT JOIN 
				(SELECT DISTINCT 
					kode_kantor AS kd_kantor,
					nomor,
					no_reff,
					nama AS nama_nasabah 
				FROM
					`jaminan_history` 
				WHERE `status` = 'MASUK') `jaminan_history` 
				ON `jaminan_history`.kd_kantor = jaminan_header.kode_kantor 
				AND `jaminan_history`.no_reff = jaminan_header.no_reff 
				LEFT JOIN 
				(SELECT 
					no_reff,
					agunan_id,
					jenis,
					no_shm,
					no_shgb,
					no_ajb,
					nama_pemilik_sertifikat,
					alamat_sertifikat,
					nomor_bpkb,
					nama_bpkb,
					alamat_bpkb,
					no_rangka,
					no_mesin,
					tahun,
					no_polisi,
					kode_kantor_lokasi_jaminan 
				FROM
					jaminan_dokument) jaminan_dokument 
				ON jaminan_dokument.no_reff = jaminan_header.no_reff 
				LEFT JOIN 
				(SELECT 
					jpd.nomor,
					jpd.no_reff,
					jpd.agunan_id,
					jaminan_pemindahan.lokasi_penyimpanan,
					jaminan_pemindahan.`ket` 
				FROM
					`jaminan_pemindahan` 
					INNER JOIN `jaminan_pemindahan_detail` jpd 
					ON jpd.`nomor` = jaminan_pemindahan.`nomor`) jaminan_pemindahan 
				ON jaminan_pemindahan.no_reff = jaminan_header.nomor #WHERE jaminan_header.status='PINJAM'
				LEFT JOIN app_kode_kantor ON app_kode_kantor.kode_kantor = jaminan_dokument.kode_kantor_lokasi_jaminan 
			WHERE #jaminan_header.kode_kantor = '00' 
				#AND 
				jaminan_header.status = 'MASUK' 
				AND jaminan_header.jenis_jaminan in ('SERTIFIKAT', 'BPKB', 'EMAS')
			#ORDER BY jaminan_header.nomor DESC 
			ORDER BY jaminan_header.id DESC 
			LIMIT 0, 25;
			";
		$query = $this->db2->query($str);
		return $query->result_array();
    }
    public function listDokumenVerifikasi(){
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		// $str = "SELECT 
        //             id,
        //             LEFT(nomor, 10) AS nomor,
        //             LEFT(no_reff, 10) AS no_reff,
        //             tgl,
        //             nama,
        //             LEFT(alamat, 200) AS alamat,
        //             kelurahan,
        //             kecamatan,
        //             kota,
        //             propinsi,
        //             kode_pos,
        //             jenis_jaminan,
        //             roda_kendaraan,
        //             status,
        //             kontrak_status,
        //             ket,
        //             no_rekening,
        //             tgl_realisasi,
        //             kode_kantor,
        //             verifikasi,
        //             jd.agunan_id
        //         FROM
        //             jaminan_header 
        //             LEFT JOIN 
        //             (SELECT 
        //                 LEFT(no_reff, 10) AS no_reff2,
        //                 agunan_id
        //             FROM
        //                 jaminan_dokument 
        //             WHERE verifikasi = 0 
        //                 AND agunan_id <> '') jd 
        //             ON jd.no_reff2 = jaminan_header.no_reff 
        //         WHERE STATUS = 'MASUK' 
        //             AND jaminan_header.kode_kantor = '00' 
        //         ORDER BY jaminan_header.nomor DESC 
        //         LIMIT 0, 25      
        // 	";
        $str = "SELECT 
                    id,
                    LEFT(nomor, 10) AS nomor,
                    LEFT(no_reff, 10) AS no_reff,
                    tgl,
                    nama,
                    LEFT(alamat, 200) AS alamat,
                    kelurahan,
                    kecamatan,
                    kota,
                    propinsi,
                    kode_pos,
                    jenis_jaminan,
                    roda_kendaraan,
                    status,
                    kontrak_status,
                    ket,
                    no_rekening,
                    tgl_realisasi,
                    kode_kantor,
                    verifikasi,
                    jd.agunan_id
                FROM
                    jaminan_header 
                    LEFT JOIN 
                    (SELECT 
                        LEFT(no_reff, 10) AS no_reff2,
                        agunan_id
                    FROM
                        jaminan_dokument 
                    WHERE agunan_id <> '' #AND verifikasi = 0 
                         ) jd 
                    ON jd.no_reff2 = jaminan_header.no_reff 
                WHERE STATUS = 'MASUK' 
                    #and jaminan_header.kode_kantor = '00' 
                #ORDER BY jaminan_header.nomor DESC 
                ORDER BY jaminan_header.id DESC 
                LIMIT 0, 25;";
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
					FROM dpm_online.jaminan_header JH,
						dpm_online.`app_kode_kantor` KK
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
					dpm_online.jaminan_dokument JD 
					LEFT JOIN dpm_online.`app_kode_kantor` KK 
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
				FROM dpm_online.`app_kode_kantor` AKK;
               ";
        $query = $this->db2->query($str);
        
        return $query->result_array();
	}

	//verifikasi
	public function verifikasiHeader($idHeader,$verifHeader,$verifDokument,$varIdAgunanDokument,$idDokument){
		
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$this->db2->trans_start();
		$this->db2->query("UPDATE dpm_online.jaminan_header 
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

		$this->db2->query("UPDATE `dpm_online`.`jaminan_dokument` SET verifikasi='$verifDokument' WHERE id='$idDokument';"); 
		$this->db2->query("UPDATE `dpm_online`.`kre_agunan` SET verifikasi='$verifDokument' WHERE agunan_id='$varIdAgunanDokument';");
		$this->db2->trans_complete();
						
	}

	//search list data
	public function searching($search,$status,$kode_kantor){
	    $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT 
					id,
					LEFT(nomor, 10) AS nomor,
					LEFT(no_reff, 10) AS no_reff,
					tgl,
					nama,
					LEFT(alamat, 200) AS alamat,
					kelurahan,
					kecamatan,
					kota,
					propinsi,
					kode_pos,
					jenis_jaminan,
					roda_kendaraan,
									status,
					kontrak_status,
					ket,
					no_rekening,
					tgl_realisasi,
					kode_kantor,
					verifikasi,
									jd.agunan_id
				FROM
					jaminan_header 
					LEFT JOIN 
					(SELECT 
						LEFT(no_reff, 10) AS no_reff2,
									agunan_id
					FROM
						jaminan_dokument 
								WHERE agunan_id <> '' #AND verifikasi = 0 
										) jd 
					ON jd.no_reff2 = jaminan_header.no_reff 
				WHERE STATUS = '$status' 
					AND jaminan_header.kode_kantor = '$kode_kantor' 
					AND (
					jaminan_header.nomor LIKE '%$search%' 
					OR nama LIKE '%$search%'
					) 
				#ORDER BY jaminan_header.nomor DESC 
				ORDER BY jaminan_header.id DESC 
				LIMIT 0, 100
				";
		$query = $this->db2->query($str);
		
		return $query->result_array();
	}

}


