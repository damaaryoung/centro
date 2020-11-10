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
    return json_encode($output, true);
  }

  public function getReportSertifikat($dari_tgl,$sampai_tgl){
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
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
		$this->db2 = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') AS 'sysdate';";
        $query = $this->db->query($str);
        
        return $query->result_array();
	}

}
