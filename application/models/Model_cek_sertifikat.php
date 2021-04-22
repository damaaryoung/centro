<?php
class Model_cek_sertifikat extends CI_Model{

  function tampil_data2($filter,$page){
    $url     = $this->config->item('api_url') . "api/master/sertifikat/filter/cari?nomor_so=".$filter."&page=".$page."";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer '.$this->session->userdata('SESSION_TOKEN')
    ));
    $output = curl_exec($ch);
    curl_close($ch);
    return json_decode($output, true);
  }

  function view(){
    $url     = $this->config->item('api_url') . "/api/master/sertifikat/".$this->input->post('id', TRUE)."" ;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer '.$this->session->userdata('SESSION_TOKEN')
    ));
    $output = curl_exec($ch);
    curl_close($ch);
    return json_decode($output, true);
  }

  function print($id){
    $url     = $this->config->item('api_url') . "/api/master/sertifikat/".$this->input->post('id', TRUE)."" ;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer '.$this->session->userdata('SESSION_TOKEN')
    ));
    $output = curl_exec($ch);
    curl_close($ch);
    return json_decode($output, true);
  }

  function updated(){
    $arrayData = array(
      'id_data' =>$this->input->post('id_data',TRUE),
      'nama' =>$this->input->post('nama',TRUE),
      'alamat' =>$this->input->post('alamat',TRUE),
      'no_shm' =>$this->input->post('no_shm',TRUE),
      'nomor_surat_ukur' =>$this->input->post('nomor_surat_ukur',TRUE),
      'tgl_sertifikat' =>$this->input->post('tgl_sertifikat',TRUE),
      'luas_tanah' =>$this->input->post('luas_tanah',TRUE),
      'ajb_flag' =>$this->input->post('ajb_flag',TRUE),
      'ajb' =>$this->input->post('ajb',TRUE),
      'no_ajb' =>$this->input->post('nomor_ajb',TRUE),
      'imb_flag' =>$this->input->post('imb_flag',TRUE),
      'imb' =>$this->input->post('imb',TRUE),
      'no_imb' =>$this->input->post('nomor_imb',TRUE),
      'sppt_flag' =>$this->input->post('sppt_flag',TRUE),
      'sppt' =>$this->input->post('sppt',TRUE),
      'no_sppt' =>$this->input->post('nomor_sppt',TRUE),
      'sht_flag' =>$this->input->post('sht_flag',TRUE),
      'sht' =>$this->input->post('sht',TRUE),
      'no_sht' =>$this->input->post('nomor_sht',TRUE),
      'stts_flag' =>$this->input->post('stts_flag',TRUE),
      'stts' =>$this->input->post('stts',TRUE),
      'stts_tahun' =>$this->input->post('tahun_stts',TRUE),
      'ssb_flag' =>$this->input->post('ssb_flag',TRUE),
      'ssb' =>$this->input->post('ssb',TRUE),
      'ssb_tahun' =>$this->input->post('ssb_tahun',TRUE),
      'ssb_atas_nama' =>$this->input->post('ssb_atas_nama',TRUE),
      'status' =>$this->input->post('status',TRUE),
      'plan_akad' =>$this->input->post('plan_akad',TRUE),
    );
    $url="/api/master/sertifikat/update/".$this->input->post('id_data', TRUE)."";
    $curl     = $this->config->item('api_url') . $url ;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $curl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer '.$this->session->userdata('SESSION_TOKEN')
    ));
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $arrayData);
    $output = curl_exec($ch);
    curl_close($ch);
    
    /// INSERT TO CORE IF STATUS INPUT = 'MASUK'///
    $status_input = $this->input->post('status',TRUE);
    if($status_input == 'MASUK'){
        $id_so = $this->input->post('id_data', TRUE);
        $this->db2 = $this->load->database('DB_DPM_ONLINE', true);
        /// GET DATA AGUNAN TANAH UNTUK DI INSERT KE CORE
        $str = "SELECT 
                    agt.`nama_pemilik_sertifikat` AS `nama`,
                    agt.`alamat` AS `alamat`,
                    agt.`status` AS `status`,
                    tso.`tgl_realisasi` AS `tgl_realisasi`,
                    agt.`jenis_sertifikat` AS `jenis_sertifikat`,
                    agt.`no_sertifikat` AS `no_sertifikat`,
                    agt.`tgl_sertifikat` AS `tgl_sertifikat`,
                    agt.`tgl_berlaku_shgb` AS `tgl_berlaku_shgb`,
                    agt.`tgl_ukur_sertifikat` AS `tgl_ukur_sertifikat`,
                    agt.`luas_tanah` AS `luas_tanah`,
                    akel.`nama_kelurahan` AS `kelurahan`,
                    akec.`nama_kecamatan` AS `kecamatan`,
                    mp.`nama` AS `provinsi`,
                    agt.`ajb` AS `ajb`,
                    agt.`no_ajb` AS `no_ajb`,
                    agt.`imb` AS `imb`,
                    agt.`no_imb` AS `no_imb`,
                    agt.`sppt` AS `sppt`,
                    agt.`no_sppt`,
                    agt.`sppt_tahun` AS `sppt_tahun`,
                    agt.`skmht` AS `skmht`,
                    agt.`gambar_denah` AS `gambar_denah`,
                    agt.`surat_roya` AS `surat_roya`,
                    agt.`sht` AS `sht`,
                    agt.`no_sht` AS `no_sht`,
                    agt.`sht_propinsi` AS `sht_propinsi`,
                    agt.`sht_kota` AS `sht_kota`,
                    agt.`stts` AS `stts`,
                    agt.`stts_tahun` AS `stts_tahun`,
                    agt.`ssb` AS `ssb`,
                    agt.`ssb_atas_nama` AS `ssb_atas_nama`,
                    agt.`agunan_id` AS `agunan_id`,
                    agt.`tgl_ajb` AS `tgl_ajb`,
                    agt.`njop` AS `njop`,
                    agt.`asli_ajb` AS `asli_ajb`,
                    agt.`asli_imb` AS `asli_imb`,
                    agt.`asli_sppt` AS `asli_sppt`,
                    agt.`asli_skmht` AS `asli_skmht`,
                    agt.`asli_gambar_denah` AS `asli_gambar_denah`,
                    agt.`asli_surat_roya` AS `asli_surat_roya`,
                    agt.`asli_sht` AS `asli_sht`,
                    agt.`asli_stts` AS `asli_stts`,
                    agt.`asli_ssb` AS `asli_ssb`,
                    agt.`lain_lain` AS `lain_lain`,
                    mkc.`kode_kantor` AS `kode_kantor`
                  FROM
                    agunan_tanah agt 
                    LEFT JOIN trans_so tso 
                      ON tso.`id` = agt.`id_trans_so`
                    LEFT JOIN mk_cabang mkc 
                      ON mkc.`id` = tso.`id_cabang` 
                    LEFT JOIN master_provinsi mp
                      ON mp.`id` = agt.`id_provinsi`
                    LEFT JOIN view_kode_kelurahan akel
                      ON akel.`id` = agt.`id_kelurahan`
                    LEFT JOIN view_kode_kecamatan akec
                      ON akec.`id` = agt.`id_kecamatan`
                  WHERE agt.`id_trans_so` = '$id_so' LIMIT 1 ;";
        $query = $this->db->query($str);
            
        $result = $query->result_array();
        if($result[0]["kode_kantor"] != null || $result[0]["kode_kantor"] != ''){
            $kode_kantor = $result[0]["kode_kantor"];
        }else if($result[0]["kode_kantor"] == null || $result[0]["kode_kantor"] == ''){
            $kode_kantor = '00';
        }
        
        $jenis_sertifikat    = $result[0]["jenis_sertifikat"];
        $no_sertifikat       = $result[0]["no_sertifikat"];
        if($jenis_sertifikat = 'SHM'){
          $no_shm  =  $no_sertifikat;
          $no_shgb = '';
        }else{
          $no_shm  = '';
          $no_shgb = $no_sertifikat;;
        }
        
        $nama                = $result[0]["nama"];
        $nama                = str_replace("'","\'",$nama);
        $alamat              = $result[0]["alamat"];
        $mainKota            = $result[0]["provinsi"];
        $status              = $result[0]["status"];
        $tgl_realisasi       = $result[0]["tgl_realisasi"];
        $tgl_sertifikat      = $result[0]["tgl_sertifikat"];
        $tgl_berlaku_shgb    = $result[0]["tgl_berlaku_shgb"];
        $tgl_ukur_sertifikat = $result[0]["tgl_ukur_sertifikat"];
        $luas_tanah          = $result[0]["luas_tanah"];
        $kelurahan           = $result[0]["kelurahan"];
        $kecamatan           = $result[0]["kecamatan"];
        $provinsi            = $result[0]["provinsi"];
        $ajb                 = $result[0]["ajb"];
        $no_ajb              = $result[0]["no_ajb"];
        $imb                 = $result[0]["imb"];
        $no_imb              = $result[0]["no_imb"];
        $sppt                = $result[0]["sppt"];
        $no_sppt             = $result[0]["no_sppt"];
        $sppt_tahun          = $result[0]["sppt_tahun"];
        $skmht               = $result[0]["skmht"];
        $gambar_denah        = $result[0]["gambar_denah"];
        $surat_roya          = $result[0]["surat_roya"];
        $sht                 = $result[0]["sht"];
        $no_sht              = $result[0]["no_sht"];
        $sht_propinsi        = $result[0]["sht_propinsi"];
        $sht_kota            = $result[0]["sht_kota"];
        $stts                = $result[0]["stts"];
        $stts_tahun          = $result[0]["stts_tahun"];
        $ssb                 = $result[0]["ssb"];
        $ssb_atas_nama       = $result[0]["ssb_atas_nama"];
        $agunan_id_get       = $result[0]["agunan_id"];
        $tgl_ajb             = $result[0]["tgl_ajb"];
        $njop                = $result[0]["njop"];
        $asli_ajb            = $result[0]["asli_ajb"];
        $asli_imb            = $result[0]["asli_imb"];
        $asli_sppt           = $result[0]["asli_sppt"];
        $asli_skmht          = $result[0]["asli_skmht"];
        $asli_gambar_denah   = $result[0]["asli_gambar_denah"];
        $asli_surat_roya     = $result[0]["asli_surat_roya"];
        $asli_sht            = $result[0]["asli_sht"];
        $asli_stts           = $result[0]["asli_stts"];
        $asli_ssb            = $result[0]["asli_ssb"];
        $lain_lain           = $result[0]["lain_lain"];
        
        $jenis_jaminan = 'SERTIFIKAT';
        /// END GET DATA AGUNAN TANAH UNTUK DI INSERT KE CORE
       
        //insert jaminan header dan jaminan dokument jika di agunan tanah belum ada agunan id
        if($agunan_id_get == '' || $agunan_id_get == null){
              //$this->db2->trans_start();
              $this->db->trans_begin();
              // generate agunan_id
              $str1 = "SELECT CONCAT('$kode_kantor','.',LPAD(SUBSTR(agunan_id, 4, 6) + 1, 6, '0')) AS hasil 
                                FROM kre_agunan 
                              WHERE agunan_id LIKE CONCAT('$kode_kantor', '.%') 
                              ORDER BY hasil DESC 
                              LIMIT 1";
              $query1 = $this->db2->query($str1);
                  
              $result1 = $query1->result_array();
              $agunan_id = $result1[0]["hasil"];
              // end generate agunan_id
              $this->db->query("UPDATE agunan_tanah AT
                                SET at.`agunan_id` = '$agunan_id'
                                WHERE at.`id_trans_so` = '$id_so';");
              $this->db2->query("UPDATE counter 
                                  SET nomor = nomor + 1  
                                  WHERE setting= CONCAT('ASSET_IN','$kode_kantor')
                                  AND nomor <= nomor + 1;");
              $this->db2->query("INSERT INTO jaminan_header(id,nomor,no_reff,tgl,nama, alamat,kota,jenis_jaminan,roda_kendaraan,STATUS,ket,
                                      kode_kantor,
                                      no_rekening,
                                      tgl_realisasi,
                                      jenis_pengurusan,
                                      verifikasi) 
                                VALUES(get_auto_next_id ('dpm_online', 'jaminan_header'),
                                        concat('$kode_kantor','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$kode_kantor'))),
                                        concat('$kode_kantor','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$kode_kantor'))),
                                        DATE(NOW()),
                                        '$nama',
                                        '$alamat',
                                        '$mainKota',
                                        '$jenis_jaminan',
                                        '4',
                                        '$status',
                                        '',
                                        '$kode_kantor',
                                        '',
                                        (NULL),
                                        (NULL),
                                        '0');"
                );
              $this->db2->query("INSERT INTO jaminan_dokument(id,
                                                              no_reff,
                                                              jenis,
                                                              no_shm,
                                                              no_shgb,
                                                              tgl_sertifikat,
                                                              tgl_jt_shgb,
                                                              no_surat_ukur,
                                                              luas_tanah,
                                                              nama_pemilik_sertifikat,
                                                              alamat_sertifikat,
                                                              kelurahan_sertifikat,
                                                              kecamatan_sertifikat,
                                                              kota_sertifikat,
                                                              propinsi_sertifikat,
                                                              ajb,
                                                              no_ajb,
                                                              imb,
                                                              no_imb,
                                                              sppt,
                                                              no_sppt,
                                                              sppt_tahun,
                                                              skmht,
                                                              gambar_denah,
                                                              surat_roya,
                                                              sht,
                                                              no_sht,
                                                              sht_propinsi,
                                                              sht_kota,
                                                              stts,
                                                              stts_tahun,
                                                              ssb,
                                                              ssb_atas_nama,
                                                              agunan_id,
                                                              jenis_agunan_detail,
                                                              tgl_ajb,
                                                              no_kohir,
                                                              no_persil,
                                                              pl_bangunan,
                                                              batas_tanah,
                                                              nama_ppat,
                                                              ikatan_agunan_detail,
                                                              persen_dijaminkan_detail,
                                                              nilai_taksasi_detail,
                                                              nilai_njop_detail,
                                                              nilai_pasar_detail,
                                                              nilai_apht_detail,
                                                              `asli_ajb`,
                                                              `asli_imb`,
                                                              `asli_sppt`,
                                                              `asli_skmht`,
                                                              `asli_gambar_denah`,
                                                              `asli_surat_roya`,
                                                              `asli_sht`,
                                                              `asli_stts`,
                                                              `asli_ssb`,
                                                              kode_kantor,
                                                              tgl_register,
                                                              kode_kantor_lokasi_jaminan,
                                                              no_rekening_agunan,
                                                              lain_lain,
                                                              verifikasi)
                                      VALUES(get_auto_next_id('dpm_online','jaminan_dokument'),
                                                              concat('$kode_kantor','.',(SELECT SUBSTR(nomor, 3, 6) FROM counter WHERE setting=CONCAT('ASSET_IN','$kode_kantor'))),
                                                              '$jenis_jaminan',
                                                              '$no_shm',
                                                              '$no_shgb',
                                                              '$tgl_sertifikat',
                                                              '$tgl_berlaku_shgb',
                                                              '$tgl_ukur_sertifikat',
                                                              '$luas_tanah',
                                                              '$nama',
                                                              '$alamat',
                                                              '$kelurahan',
                                                              '$kecamatan',
                                                              (NULL),
                                                              '$provinsi',
                                                              '$ajb',
                                                              '$no_ajb',
                                                              '$imb',
                                                              '$no_imb',
                                                              '$sppt',
                                                              '$no_sppt',
                                                              '$sppt_tahun',
                                                              '$skmht',
                                                              '$gambar_denah',
                                                              '$surat_roya',
                                                              '$sht',
                                                              '$no_sht',
                                                              '$sht_propinsi',
                                                              '$sht_kota',
                                                              '$stts',
                                                              '$stts_tahun',
                                                              '$ssb',
                                                              '$ssb_atas_nama',
                                                              '$agunan_id',
                                                              '',
                                                              '$tgl_ajb',
                                                              (NULL),
                                                              (NULL),
                                                              (NULL),
                                                              (NULL),
                                                              (NULL),
                                                              (NULL),
                                                              (NULL),
                                                              (NULL),
                                                              '$njop',
                                                              (NULL),
                                                              (NULL),
                                                              '$asli_ajb ',
                                                              '$asli_imb',
                                                              '$asli_sppt',
                                                              '$asli_skmht',
                                                              '$asli_gambar_denah',
                                                              '$asli_surat_roya',
                                                              '$asli_sht',
                                                              '$asli_stts',
                                                              '$asli_ssb',
                                                              '$kode_kantor',
                                                              DATE(NOW()),
                                                              '$kode_kantor',
                                                              '',
                                                              '$lain_lain',
                                                              '0');");  
                  
              $this->db2->query("INSERT INTO `slik_agunan` (`flag_detail`,
                                                            `kode_register_agunan`,
                                                            `no_rekening`,
                                                            `cif`,
                                                            `kode_jenis_segment_fasilitas`,
                                                            `kode_status_agunan`,
                                                            `kode_jenis_agunan`,
                                                            `peringkat_agunan`,
                                                            `kode_lembaga_pemeringkat`,
                                                            `kode_jenis_pengikatan`,
                                                            `tanggal_pengikatan`,
                                                            `nama_pemilik_agunan`,
                                                            `bukti_kepemilikan`,
                                                            `alamat_agunan`,
                                                            `kode_kab_kota`,
                                                            `nilai_agunan`,
                                                            `nilai_agunan_menurut_ljk`,
                                                            `tanggal_penilaian_ljk`,
                                                            `nilai_agunan_penilai_independen`,
                                                            `nama_penilai_independen`,
                                                            `tanggal_penilaian_independen`,
                                                            `status_paripasu`,
                                                            `prosentase_paripasu`,
                                                            `status_kredit_join`,
                                                            `diasuransikan`,
                                                            `keterangan`,
                                                            `kode_kantor_cabang`,
                                                            `operasi_data`) 
                                    VALUES('D',
                                                '$agunan_id',
                                                '',
                                                '',
                                                'F01',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                '',
                                                (SELECT sandi_cabang AS kode 
                                                FROM app_kode_kantor akk 
                                                WHERE akk.`kode_kantor` = '$kode_kantor' 
                                                LIMIT 1),
                                                'C'
                                              ) 
                                    ON DUPLICATE KEY 
                                              UPDATE 
                                                `flag_detail` = 'D',
                                                `kode_jenis_segment_fasilitas` = 'F01',
                                                `kode_status_agunan` = '',
                                                `kode_jenis_agunan` = '',
                                                `peringkat_agunan` = '',
                                                `kode_lembaga_pemeringkat` = '',
                                                `kode_jenis_pengikatan` = '',
                                                `tanggal_pengikatan` = '',
                                                `nama_pemilik_agunan` = '',
                                                `bukti_kepemilikan` = '',
                                                `alamat_agunan` = '',
                                                `kode_kab_kota` = '',
                                                `nilai_agunan` = '',
                                                `nilai_agunan_menurut_ljk` = '',
                                                `tanggal_penilaian_ljk` = '',
                                                `nilai_agunan_penilai_independen` = '',
                                                `nama_penilai_independen` = '',
                                                `tanggal_penilaian_independen` = '',
                                                `status_paripasu` = '',
                                                `prosentase_paripasu` = '',
                                                `status_kredit_join` = '',
                                                `diasuransikan` = '',
                                                `keterangan` = '',
                                                `kode_kantor_cabang` = 
                                                (SELECT sandi_cabang AS kode 
                                                FROM app_kode_kantor akk 
                                                WHERE akk.`kode_kantor` = '$kode_kantor' 
                                                LIMIT 1);");
              //$this->db2->trans_complete();
              if ($this->db->trans_status() === FALSE)
              {
                      $this->db->trans_rollback();
              }
              else
              {
                      $this->db->trans_commit();
              }
        }


    }            
    /// INSERT TO CORE ///

    return json_encode($output, true);
  }

  public function getReportSertifikat($dari_tgl,$sampai_tgl){
		$str = "SELECT 
              a.tgl_sertifikat,
              a.`tgl_ukur_sertifikat`,
              b.nomor_so,
              c.nama AS nama_cabang,
              d.nama_lengkap AS nama_lengkap,
              e.`plafon`,
              a.status,
              F.`status_caa`
            FROM
              agunan_tanah AS a 
              LEFT JOIN trans_so AS b 
                ON (a.id_trans_so = b.id) 
              LEFT JOIN mk_cabang AS c 
                ON (b.id_cabang = c.id) 
              LEFT JOIN calon_debitur AS d 
                ON (b.id_calon_debitur = d.id)
              LEFT JOIN tb_approval AS e
                ON B.`id` = e.`id_trans_so`
              LEFT JOIN trans_caa AS F
                ON F.`id_trans_so` = B.`id`
              WHERE A.CREATED_AT BETWEEN '$dari_tgl' AND '$sampai_tgl';";
		$query = $this->db->query($str);
		
		return $query->result_array();
  }
  public function sysdate(){
		$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
    $query = $this->db->query($str);
        
    return $query->result_array();
	}

}
