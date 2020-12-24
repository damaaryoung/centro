<?php
if (! defined('BASEPATH')) exit('No direct script access allowed');
class BSSModel extends CI_Model{

 
	public function __construct() {
		parent:: __construct();
		$this->load->database();
    }

	public function getDataBSS(){
		$kode_cabang = $this->kode_cabang;
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$str ="SELECT * FROM `view_header_bss` WHERE 
				IF($kode_cabang IN ('32', '00'), 1, kode_kantor= $kode_cabang) 
				ORDER BY kode_kantor, kartu_number DESC LIMIT 10 OFFSET 0 ";
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
		$kode_area = $this->area;
		$search = $this->search;
		$this->db= $this->load->database('DB_DPM_ONLINE', true);

			$str1 = "SELECT * FROM `view_header_bss`
			WHERE
			  IF('$kode_area'='all', 1, kode_kantor='$kode_area')
			  and
			  IF('$status' <>'all', status_kartu= '$status', 1)
			  and
			  IF('$search'<> '', (kartu_number LIKE '%$search%' OR nama_kolektor LIKE '%$search%'), 1)
			
			  ORDER BY kode_kantor, kartu_number DESC LIMIT 20 OFFSET 0 ";
			//   var_dump($str1);die();
			
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
		$userId = $this->user_id;
		$kode_cabang = $this->kode_cabang;
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$group_menu = $this->db->query("SELECT * FROM user WHERE user_id = $userId")->row()->group_menu;
		$str ="SELECT * FROM view_bss_notif WHERE 
				
				IF('$group_menu' IN ('PUSAT','IT'),1,user_id_received = '$userId' OR kode_kantor_received='$kode_cabang')   
				LIMIT 10 OFFSET 0";
		
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
				AND (kartu_number_awal LIKE '%$no_received%' OR kartu_number_akhir LIKE '%$no_received%')
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

	public function queryGetKolektor(){
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT * FROM(
			(SELECT NULL AS kolektor_id, 'KOSONGKAN KOLEKTOR' AS nama)
			UNION ALL
			(SELECT kode_group3 AS kolektor_id, deskripsi_group3 AS nama FROM kre_kode_group3
			WHERE flg_aktif='1' AND kode_group3 NOT IN ('32','11')
			ORDER BY deskripsi_group3)) xx";
		$query = $this->db->query($str);
		return $query->result_array();
	}

	public function queryInsertReceivedApprov(){
		$id  		= $this->id;
		$userId		= $this->userId;
		$appoved	= $this->appoved;
		$user_id_received  = $this->user_id_received;
		$kode_kantor_received = $this->kode_kantor_received;
		$nama_user_send 	= $this->nama_user_send;
		$keterangan = $this->keterangan;
		$is_migrasi = $this->is_migrasi ;
		$kode_cabang = $this->kode_cabang;
		$divisi = $this->divisi_id;
		$kartu_number_awal = $this->kartu_number_awal;
		$kartu_number_akhir = $this->kartu_number_akhir;
		$queryRangeKartu = "kartu_number BETWEEN $kartu_number_awal AND $kartu_number_akhir";
		$this->db = $this->load->database('DB_DPM_ONLINE', true);

		
		if(($user_id_received) != 'null'){
			if($appoved == 'Approved'){ // Admin

				$str ="UPDATE bss SET status_kartu='2', user_id=$user_id_received, last_update=NOW()
									WHERE status_kartu='8'
				   					AND (kartu_number BETWEEN $kartu_number_awal AND $kartu_number_akhir)
									AND kode_kantor=(SELECT kd_cabang FROM user WHERE user_id=$userId)";
				if ($this->db->query($str)){
					// update 1 bundle jadi open
					$this->db->query("SELECT IFNULL(@bundle_id,-1) into @bundle_id FROM bss WHERE kartu_number=$kartu_number_awal");
					$this->db->query("UPDATE bss SET status_kartu='2', last_update=NOW()
										WHERE (bundle_id IS NOT NULL)
										AND bundle_id=@bundle_id
										AND kode_kantor=(SELECT kd_cabang FROM user WHERE user_id=$user_id_received)");
				}else{
					$pesan = $this->db->error();
				}
			}
			else{// Admin reject BSS dari K.ops
				$str="UPDATE bss SET status_kartu='0', user_id=$user_id_received, last_update=NOW()
									WHERE status_kartu='8'
				   					AND (kartu_number BETWEEN $kartu_number_awal AND $kartu_number_akhir)
									AND kode_kantor=(SELECT kd_cabang FROM user WHERE user_id=$userId)";
				
					// update 1 bundle jadi new
				if ($this->db->query($str)){
					$this->db->query("SELECT IFNULL(@bundle_id,-1) into @bundle_id FROM bss WHERE kartu_number=$kartu_number_awal");
					$this->db->query("UPDATE bss SET status_kartu='0', last_update=NOW()
										WHERE (bundle_id IS NOT NULL)
										AND bundle_id=@bundle_id
										AND kode_kantor=(SELECT kd_cabang FROM user WHERE user_id=$user_id_received)");
				}else{
					$pesan = $this->db->error();
				}
				
			}
		}else{// GENERATE BSS atau PEMERIMAAN BSS dari GA ATAU TRANSFER ANTAR KANTOR
		
			if($appoved == 'Approved'){
					if($is_migrasi == '1'){ // migrasi antar kantor
						$this->db->query("UPDATE bss SET status_kartu='2', kode_kantor='$kode_kantor_received', user_id='$userId', 
											last_update=NOW() WHERE ($queryRangeKartu) AND status_kartu='1'");
					}else{
					
						$this->db->query("SELECT IFNULL(MAX(bundle_id),0) + 1 INTO @bundle_id FROM bss");
						for ($kartu_number_awal;$kartu_number_awal <= $kartu_number_akhir; $kartu_number_awal++){
							$result = "INSERT INTO bss(kartu_number, bundle_id, user_id, kode_kantor, status_kartu)
										VALUES($kartu_number_awal, @bundle_id, $userId	, '$kode_kantor_received','0')";
							$this->db->query($result);
						}
					}
				
			}else if($appoved == 'ApprovedToKolektor'){ // Approval dari HEAD OP ke Kolektor
				$this->db->query("SELECT IFNULL(MAX(bundle_id),0) + 1 INTO @bundle_id FROM bss");
				for ($kartu_number_awal;$kartu_number_awal <= $kartu_number_akhir; $kartu_number_awal++){
					$result = "INSERT INTO bss(kartu_number, bundle_id, user_id, kode_kantor, status_kartu)
								VALUES($kartu_number_awal, @bundle_id, $userId	, '$kode_kantor_received','2')";
					$this->db->query($result);
				}
			}else{ // reject
				if($is_migrasi == '1'){ // jika rejek, maka balikin status kartu pusat in transit jadi NEW
					
					$this->db->query("SELECT nama FROM user WHERE user_id='$userId' INTO @nama_user_send");
					$this->db->query("UPDATE bss SET status_kartu='0', last_update=NOW()
										WHERE (kartu_number BETWEEN $kartu_number_awal AND $kartu_number_akhir) AND status_kartu='1'");
				}
			}
			
		}
		

		// update bss_notif
		if($appoved == 'Approved'){
			$str_notif = "UPDATE bss_notif SET
					tgl_approved=NOW(),
					status=' 1',keterangan= NULL	
					WHERE id=$id ";
		}elseif ($appoved == 'ApprovedToKolektor') {
			$str_notif = "UPDATE bss_notif SET
					tgl_approved=NOW(),
					status= '1',keterangan= NULL	
					WHERE id=$id ";
		}else{
			$str_notif = "UPDATE bss_notif SET
					tgl_approved=NOW(),
					status= '2', keterangan = '$keterangan'	
					WHERE id= $id ";
		}
		return $this->db->query($str_notif);
			
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
								AND kd_cabang='$kode_cabang'
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

	public function queryAssigntoKolektor(){
		$userId = $this->userId;
		$kolektor_id = isset($this->kolektor_id) ? $this->kolektor_id : 'xx';
		$user_id_request = $this->user_id_request;
		$kartu_number = $this->kartu_number;

		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		if(!is_numeric($kolektor_id)){
			$pesan = "Maaf Nama Kolektor ' $kolektor_id ' Tidak Ada dalam System.";
		}else{
			$str   = "SELECT IF(kolektor_id='$kolektor_id','Y','N') AS is_ada
						FROM bss_log
						WHERE DATE(tgl_buat) = CURDATE() 
						AND  kartu_number=SUBSTRING('$kartu_number',4) 
						AND  status_kartu='4'";
			$query = $this->db->query($str);
			$row = $query->row_array();
			$isAda = isset($row['is_ada']) ? $row['is_ada'] : 0;
			// var_dump($isAda); die();
			if( $isAda == "Y"){
				$pesan = "Maaf Anda Tidak diperkenankan menyerahkan kembali No. BSS yang sama di hari yang sama untuk satu kolektor yang sama. Silahkan ganti dengan NO. BSS yang berbeda.";
			}else {
				$str2= "UPDATE bss SET status_kartu=3, kolektor_id='$kolektor_id', 
								  last_update=NOW() WHERE kartu_number=SUBSTRING('$kartu_number',4)";
				
				$this->db->query($str2);
				$pesan = "Send Nomor BSS TO Kolektor Success";
				
			}
			return $pesan;
		}
	}

	public function queryUpdateAssign(){
		$userId = $this->userId;
		$kartu_number = $this->kartu_number;
		$status_kartu = $this->status_assign;
		$keterangan = trim( isset($this->keterangan) ? $this->keterangan : '' );

		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		if( in_array($status_kartu, array('6','7')) && ( strlen($keterangan) < 10 || count(explode(' ',$keterangan)) < 1) ) {
			$pesan  = array(
				"msg"=> "Maaf Anda Harus Memasukkan Keterangan atau Alasannya jangan terlalu pendek",
				"success" => false
			);
		}else{
				if($status_kartu =='4') {// jika statusnya return, maka balikin ke open : update 2x buat log di trigger
					$str = "UPDATE bss SET status_kartu=2, nominal=NULL, kolektor_id=NULL, last_update=NOW() 
							WHERE kartu_number=SUBSTRING('$kartu_number',4)";
				}else{
					$str = "UPDATE bss SET status_kartu='$status_kartu', nominal=NULL, last_update=NOW()
							WHERE kartu_number=SUBSTRING('$kartu_number',4)";
				}
				
				$this->db->query($str);
				$pesan  = array(
					"msg"=> "Update Assign Success",
					"success" => true
				);
		}
	   return $pesan;
	}

	public function queryMigrasi(){
		$userId 			= $this->userId;
		$kode_kantor 		= $this->kode_kantor;
		$kartu_number_awal 	= $this->kartu_number_awal;
		$kartu_number_akhir = $this->kartu_number_akhir;
		$kode_kantor_received	= $this->kode_kantor_received;
		$validKartu			= "status_kartu in ('0','2') AND user_id=$userId";
		$selisih = ($kartu_number_akhir - $kartu_number_awal)+1;
		$queryRangeKartu = "kartu_number BETWEEN $kartu_number_awal AND $kartu_number_akhir";
		
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		if( $selisih == 0 ) {
			$pesan  = array(
				"msg"=> "Maaf Migrasi $selisih BSS harus benar-benar masih utuh atau minimal 50 Lembar",
				"success" => false
			);
		}else{
			$str = "SELECT GROUP_CONCAT(pesan SEPARATOR '<br/>') AS pesannya FROM (
						SELECT IF(COUNT(0)> 0,NULL,'Jumlah BSS harus berjumlah 50 lembar atau masih utuh<br>') AS pesan FROM bss
							WHERE ( $queryRangeKartu ) AND $validKartu
						UNION
					SELECT IF(COUNT(0) > 0,NULL,'No.BSS Awal statusnya bukan NEW atau PICnya bukan Anda<br>') AS pesan FROM bss
							WHERE kartu_number = $kartu_number_awal AND $validKartu
						UNION
					SELECT IF(COUNT(0) > 0,NULL,'No.BSS Akhir statusnya bukan NEW atau PICnya bukan Anda') AS pesan FROM bss
							WHERE kartu_number = $kartu_number_akhir AND $validKartu
					)xx";
			$query = $this->db->query($str);
			$row = $query->result_array();
			if($row[0]['pesannya']  <> null){
				$pesan  = array(
					"msg"=> "Ada kesalahan No.BSS yang Anda masukkan".$row[0]['pesannya'],
					"success" => false
				);
			}else{
				$this->db->query("INSERT INTO bss_notif(kartu_number_awal, kartu_number_akhir, is_migrasi, kode_kantor_received,user_id, keterangan)
						VALUES($kartu_number_awal,$kartu_number_akhir, '1','$kode_kantor_received', $userId, 'Migrasi BSS')");
				$this->db->query("SELECT nama_area_kerja INTO @nama_area_kerja FROM view_spedo_combo_kantor 
									WHERE kode_kantor=$kode_kantor_received");
				$this->db->query("SET @user_id=$userId");
				$this->db->query("UPDATE bss SET status_kartu='1', last_update=NOW() WHERE ($queryRangeKartu) AND $validKartu");

				$pesan  = array(
					"msg"=> "Migrasi success",
					"success" => true
				);
			}

			if($kode_kantor_received == $kode_kantor){
				$pesan  = array(
					"msg"=> "Maaf Migrasi hanya bisa dilakukan beda kantor",
					"success" => false
				);
			}
			
		}
		return $pesan;
	}

	public function queryLogBSS(){
		$kartu_number = $this->kartu_number ;
		$this->db = $this->load->database('DB_DPM_ONLINE', true);
		$str = "SELECT * FROM view_bss_log WHERE `kartu_number` = '$kartu_number' LIMIT 5; ";
		$query = $this->db->query($str);
		return $query->result_array();
	}
}
