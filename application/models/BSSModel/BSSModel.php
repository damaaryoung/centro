<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class BSSModel extends CI_Model{

 
	public function __construct() {
		parent:: __construct();
		$this->load->database();
    }

	public function getDataBSS(){
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$str ="SELECT * FROM view_header_bss 
				ORDER BY kode_kantor, kartu_number ASC LIMIT 20 OFFSET 0 ";

		$str ="SELECT * FROM `view_header_bss` 
		WHERE (kode_kantor='32' OR kode_kantor='00')
		ORDER BY kode_kantor, kartu_number ASC LIMIT 20 OFFSET 0 ";

		$query = $this->db->query($str);
		return $query->result_array();
	}

	public function get_notify_received_bss(){
		$user = $this->user;
		$kode_cabang = $this->kode_cabang;
		
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$srt_notify = "SELECT COUNT(0) AS total FROM bss_notif
		WHERE
		(
			user_id_received=(SELECT user_id FROM USER WHERE `user`='$user') OR
			kode_kantor_received='$kode_cabang'
		)
		AND tgl_approved IS NULL";
		$query2 = $this->db->query($srt_notify);
		return $query2->result_array();
	}
	
	public function querySearch(){
		$kd_cabang = $this->kd_cabang;
		$status = $this->status;
		$kode_kantor = $this->area;
		$search = $this->search;
		$this->db= $this->load->database('DB_DPM_ONLINE', true);

			$str1 = "SELECT * FROM `view_header_bss`
			WHERE
			  IF('$kode_kantor' IN ('32', '00'), kode_kantor IN ('32', '00'), IF('$kode_kantor' = 'all', 1, kode_kantor='$kode_kantor'))
			  and
			  IF('$status' <>'all', status_kartu= '$status', 1)
			  and
			  IF('$search'<> '', (kartu_number LIKE '%$search%' OR nama_kolektor LIKE '%$search%'), 1)
			
			  ORDER BY kode_kantor, kartu_number DESC ";
			
			$query = $this->db->query($str1);
			return $query->result_array();
		
	}

	// query send bss GA TO PIC
	public function queryInsertBSS(){
		$kartu_number_awal = $this->kartu_number_awal;
		$kartu_number_akhir = $this->kartu_number_akhir;
		$kode_kantor_received = $this->area_kerja;
		$userId = $this->userId;
		$this->db= $this->load->database('DB_DPM_ONLINE', true);

		// cek no BSS didatabase
		$str = "SELECT COUNT(0) AS total FROM bss 
				WHERE kartu_number BETWEEN '$kartu_number_awal ' AND '$kartu_number_akhir'";
		$query = $this->db->query($str);
		$row = $query->result_array();
		if($row[0]['total'] > 0){
			$message  = "Maaf No Range BSS Sudah ada dalam Database, Pastikan No.BSS Yang Anda Kirim Belum tersedia";
		}else{
			
			$str2  = "INSERT INTO bss_notif(kartu_number_awal, kartu_number_akhir, kode_kantor_received,user_id, keterangan)
						VALUES('$kartu_number_awal','$kartu_number_akhir','$kode_kantor_received', $userId, NULL)";
			$this->db->query($str2);
			$message  = "Input data success";
		}
		return $message;
	}

	public function get_received_bss(){
		$divisi = $this->divisi;
		$user = $this->user;
		$kode_cabang = $this->kode_cabang;
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$str ="SELECT * FROM view_bss_notif WHERE 
				IF('$divisi' IN ('PUSAT','IT'),1,user_id_received = '$user' OR kode_kantor_received='$kode_cabang')   
				ORDER BY id DESC LIMIT 10 OFFSET 0";
		
		$query = $this->db->query($str);
		return  $query->result_array();
	}

	public function get_search_received_bss(){
		$kode_cabang = $this->kode_cabang;
		$no_received = $this->no_received;
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$str ="SELECT * FROM view_bss_notif 
				WHERE (kartu_number_awal LIKE '%$no_received%' OR kartu_number_akhir LIKE '%$no_received%')
				ORDER BY id DESC LIMIT 10 OFFSET 0";
		$str2 = "SELECT * FROM view_bss_notif 
				WHERE kode_kantor_received='$kode_cabang' 
				AND WHERE (kartu_number_awal LIKE '%$no_received%' OR kartu_number_akhir LIKE '%$no_received%')
				ORDER BY id DESC LIMIT 10 OFFSET 0";

		if($kode_cabang == '00'){
			$query = $this->db->query($str);
			return $query->result_array();
		}else{
			$query2 = $this->db->query($str2);
			return $query2->result_array();
		}
	}

	public function getKartuNumberBSS(){
		$userId = $this->userId;
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$filterUser  = in_array($userId, array('349','111','3','167','2164692')) ? "1" : "user_id=$userId";
		$str ="SELECT kartu_number, user_id	FROM bss WHERE status_kartu IN('0','2') AND $filterUser";
		$query = $this->db->query($str);
		return $query->result_array();
	}

	public function queryInsertReceivedApprov(){
		$id  		= $this->id;
		$userId		= $this->userId;
		$appoved	= $this->appoved;
		$user_id_received  = isset( $this->user_id_received) ?  $this->user_id_received : '';
		$kode_kantor_received = isset($this->kode_kantor_received) ? $this->kode_kantor_received : '';
		$nama_user_send 	= isset($this->nama_user_send) ? $this->nama_user_send : '';
		$keterangan = isset($this->keterangan) ? $this->keterangan : '';
		$is_migrasi = isset($this->is_migrasi) ? $this->is_migrasi : '';
		$kode_cabang = $this->kode_cabang;
		$divisi = $this->divisi_id;
		$kartu_number_awal = $this->kartu_number_awal;
		$kartu_number_akhir = $this->kartu_number_akhir;
		$this->db = $this->load->database('DB_DPM_ONLINE', true);

	
		if($appoved == 'Approved'){
			$this->db->query("SELECT IFNULL(MAX(bundle_id),0) + 1 INTO @bundle_id FROM bss");

			for ($kartu_number_awal;$kartu_number_awal <= $kartu_number_akhir; $kartu_number_awal++){
				$result = "INSERT INTO bss(kartu_number, bundle_id, user_id, kode_kantor, status_kartu)
							 VALUES($kartu_number_awal, @bundle_id, $userId	, '$kode_kantor_received','0')";
				$this->db->query($result);
			 
			}
			
		}else{ // reject
			if($is_migrasi == '1'){ // jika rejek, maka balikin status kartu pusat in transit jadi NEW
				$this->db->query("SELECT nama FROM user WHERE user_id='$userId' INTO @nama_user_send");
				$this->db->query("UPDATE bss SET status_kartu='0', last_update=NOW()
									 WHERE (kartu_number BETWEEN $kartu_number_awal AND $kartu_number_akhir) AND status_kartu='1'");
			}
		}

		// update bss_notif
		return $this->db->query("UPDATE bss_notif SET
					tgl_approved=NOW(),
					status='".($appoved == 'Approved' ? '1' :'2')."',
					keterangan=".($appoved == 'Approved' ?  'NULL' : "'$keterangan'")."	
					WHERE id=$id ");
			
		return $message  = "Update status data success";	
	}

	public function query_user_received_bss(){
		$jabatan = $this->jabatan;
		$userId		= $this->userId;
		$kode_cabang = $this->kode_cabang;
		$arr_send_diri_sendiri = array('926','928','933');

		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		if(in_array($userId, $arr_send_diri_sendiri)) {
			$str = "SELECT 
						user_id AS user_id_received,
						nama 
					FROM
						`user` 
					WHERE jabatan IN (
						'ADMINISTRATION',
						'TELLER',
						'ADMIN MICRO',
						'DISTRICT ADMIN SECURE FINANCING',
						'HEAD OPERATIONAL',
						'SUPERVISOR OPERASIONAL',
						'ADMIN KREDIT SUPPORT',
						'CREDIT ADMINISTRATION'
						) 
						AND user_id NOT IN ('523', '491') 
						AND flg_block = 'N' 
						AND tgl_expired >= CURDATE() 
						AND kd_cabang = '$kode_cabang' 
						AND nama NOT LIKE '%DEMO%'";
		}else {
			if(in_array($jabatan, array('HEAD OPERATIONAL','SUPERVISOR OPERASIONAL')) ){
				$str = "SELECT user_id AS user_id_received, nama
						  FROM `user` 
						   WHERE jabatan IN ('ADMINISTRATION','TELLER','ADMIN MICRO','DISTRICT ADMIN SECURE FINANCING','ADMIN KREDIT SUPPORT','CREDIT ADMINISTRATION')
								AND user_id NOT IN ('523','491','$userId')
								AND flg_block='N' AND tgl_expired >= CURDATE()
								AND kd_cabang='$kode_kantor'
								AND nama NOT LIKE '%DEMO%'";
			}else{
				$str = "SELECT user_id AS user_id_received, nama
						  FROM `user` 
						   WHERE jabatan IN ('ADMINISTRATION','TELLER','HEAD OPERATIONAL','SUPERVISOR OPERASIONAL','CREDIT ADMINISTRATION')
								AND user_id NOT IN ('520','523','491','$userId')
								AND flg_block='N' AND tgl_expired >= CURDATE()
								AND kd_cabang='$kode_cabang'
								AND nama NOT LIKE '%DEMO%'";
			}
		}

		$query = $this->db->query($str);
		return $query->result_array();
	}

	public function queryInsertBSStoPIC(){
		$userId = $this->userId;
		$kartu_number_awal = $this->kartu_number_awal;
		$kartu_number_akhir = $this->kartu_number_akhir;
		$user_id_received = $this->user_id_received;

		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$validKartu = "status_kartu IN ('0','2') AND IF($userId='349',1, user_id=$userId)";
		$valid = "SELECT GROUP_CONCAT(pesan SEPARATOR '') AS pesannya FROM 
			( SELECT IF(COUNT(0) > 0,NULL,'Jumlah BSS harus berjumlah 1 s/d 50 lembar') AS pesan FROM bss 
				WHERE ( kartu_number BETWEEN $kartu_number_awal AND $kartu_number_akhir ) AND $validKartu 
			UNION 
			SELECT IF(COUNT(0) > 0,NULL,'No.BSS Awal tidak ada dan atau pastikan statusnya NEW atau OPEN dan PICnya Anda') AS pesan 
				FROM bss WHERE kartu_number = $kartu_number_awal AND $validKartu
			UNION 
			SELECT IF(COUNT(0) > 0,NULL,'No.BSS Akhir tidak ada dan atau pastikan statusnya NEW atau OPEN dan PICnya Anda') AS pesan 
				FROM bss WHERE kartu_number = $kartu_number_akhir AND $validKartu)xx";
		$query = $this->db->query($valid);
		$row = $query->result_array();
		if($row[0]["pesannya"] <> NULL){
			$pesan  = "Ada kesalahan No.BSS yang Anda masukkan:<br>".$row[0]['pesannya'];
		}else{
			$this->db->query("SELECT nama INTO @nama_user_received FROM user WHERE user_id='$user_id_received'");
			$this->db->query("INSERT INTO bss_notif(kartu_number_awal, kartu_number_akhir, user_id_received,user_id)
							VALUES($kartu_number_awal,$kartu_number_akhir,$user_id_received, $userId)");
			$this->db->query("UPDATE bss SET status_kartu='8', last_update=NOW()
				   WHERE  (kartu_number BETWEEN $kartu_number_awal AND $kartu_number_akhir)
						AND status_kartu IN ('0','2')
						AND user_id=$userId");
			$pesan = "Send data to PIC success";
		}

		return $pesan;
	}
}
