<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>CENTRO | BPR Kredit Mandriri</title>
  <link rel="icon" type="image/jpeg" href="<?php echo base_url(); ?>assets/design/images/kmi_logo.png" />
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <?php echo $css; ?>

  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body class="hold-transition skin-blue sidebar-mini" onload="zoom()">
<div class="wrapper">

  	<?php 
	  echo $navbar;
      echo $sidebar;
      echo $js;
	?>



<link href="<?php echo base_url('assets/dist/css/datepicker.min.css') ?>" rel="stylesheet" type="text/css">
<script src="<?php echo base_url('assets/dist/js/datepicker.js') ?>"></script>
<div id="lihat_data_credit" class="content-wrapper" style="padding-left: 15px; padding-right: 15px;">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Data Credit Checking</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Data Credit Checking</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <section  style="min-height: 700px;">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="box-body table-responsive no-padding">
                            <table id="table_proses" class="table table-bordered table-hover table-sm" style="font-size: 12px">
                                <thead style="font-size: 12px" class="bg-danger">
                                    <tr>
                                        <th>
                                            No
                                        </th>
                                        <th>
                                            Tanggal Transaksi
                                        </th>
                                        <th>
                                            No SO
                                        </th>
                                        <th>
                                            Nama SO
                                        </th>
                                        <th>
                                            Asal Data
                                        </th>
                                        <th>
                                            Nama Marketing
                                        </th>
                                        <th>
                                            Nama Debitur
                                        </th>
                                        <th>
                                            Status
                                        </th>
                                        <th>
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="data_credit_checking" style="font-size: 12px">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
<div id="lihat_detail" class="content-wrapper" style="padding-left: 15px; padding-right: 15px;">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Data Credit Checking</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Data Credit Checking</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" style="margin-bottom: 16px;">
                    <form id="form_detail_credit">
                        <input type="hidden" name="id" value="">
                        <div class="card mb-3" id="table">
                            <div class="card-header bg-gradient-danger" data-toggle="collapse" href="#collapse_1" role="button" aria-expanded="false" aria-controls="collapse_1">
                                <a class="text-light">
                                    <b>CREDIT CHECKING</b>
                                </a>
                            </div>
                            <div class="card-body collapse" id="collapse_1">
                                <div class="row" id="data_user">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>No SO</label>
                                            <input type="text" class="form-control" name="nomor_so" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Nama SO</label>
                                            <input type="text" class="form-control" name="nama_so" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Asal Data</label>
                                            <input type="text" class="form-control" name="asal_data" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Nama Marketing 1/CGC/EGC/Tele Sales</label>
                                            <div class="input-group">
                                                <input type="text" name="nama_marketing" class="form-control" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Plafon</label>
                                            <input type="text" name="plafon" class="form-control" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Tenor</label>
                                            <input type="text" name="tenor" class="form-control" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Jenis Pinjaman</label>
                                            <input type="text" class="form-control" name="jenis_pinjaman" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Tujuan Pinjaman</label>
                                            <textarea name="tujuan_pinjaman" class="form-control " rows="5" cols="40" disabled></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-3" id="table">
                            <div class="card-header bg-gradient-danger" data-toggle="collapse" href="#collapse_2" role="button" aria-expanded="false" aria-controls="collapse_2">
                                <a class="text-light">
                                    <b>DATA CALON DEBITUR</b>
                                </a>
                            </div>
                            <div class="card-body collapse" id="collapse_2">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Nama Lengkap <small><i>(Sesuai KTP)</i></small></label>
                                            <input type="text" name="nama_lengkap" class="form-control" disabled>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Gelar Keagamaan</label>
                                                <input type="text" name="gelar_keagamaan" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>Gelar Pendidikan</label>
                                                <input type="text" name="gelar_pendidikan" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Jenis Kelamin</label>
                                                <input type="text" id="jenis_kelamin" name="jenis_kelamin" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>Status Pernikahan</label>
                                                <input type="text" name="status_nikah" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Nama Ibu Kandung</label>
                                            <input type="text" name="ibu_kandung" class="form-control" disabled>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>No KTP</label>
                                                <input type="text" name="no_ktp" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>NIK KTP di KK</label>
                                                <input type="text" name="no_ktp_kk" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>No Kartu Keluarga</label>
                                                <input type="text" name="no_kk" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>No NPWP</label>
                                                <input type="text" name="no_npwp" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-5">
                                                <label>Tempat Lahir</label>
                                                <input type="text" name="tempat_lahir" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-5">
                                                <label for="exampleInputEmail1">Tanggal Lahir</label>
                                                <input type="text" name="tgl_lahir_deb" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-2">
                                                <label>Umur</label>
                                                <input type="text" id="umur" name="umur" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Agama</label>
                                            <input type="text" class="form-control" id="agama" name="agama" disabled>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-8">
                                                <label>Alamat <small><i>(Sesuai KTP)</i></small></label>
                                                <input type="text" class="form-control" name="alamat_ktp" disabled>
                                            </div>
                                            <div class="form-group col-md-2">
                                                <label>RT</label>
                                                <input type="text" class="form-control" name="rt_ktp" disabled>
                                            </div>
                                            <div class="form-group col-md-2">
                                                <label>RW</label>
                                                <input type="text" class="form-control" name="rw_ktp" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Provinsi</label>
                                            <input type="text" class="form-control" name="provinsi_ktp" disabled>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Kabupaten/Kota</label>
                                                <input type="text" class="form-control" name="kabupaten_ktp" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>Kecamatan</label>
                                                <input type="text" class="form-control" name="kecamatan_ktp" disabled>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Kelurahan</label>
                                                <input type="text" class="form-control" name="kelurahan_ktp" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>Kode POS</label>
                                                <input type="text" name="kode_pos_ktp" class="form-control" disabled>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-row">
                                            <div class="form-group col-md-8">
                                                <label>Alamat <small><i>(Domisili)</i></small></label>
                                                <input type="text" class="form-control" name="alamat_domisili" disabled>
                                            </div>
                                            <div class="form-group col-md-2">
                                                <label>RT</label>
                                                <input type="text" class="form-control" name="rt_domisili" disabled>
                                            </div>
                                            <div class="form-group col-md-2">
                                                <label>RW</label>
                                                <input type="text" class="form-control" name="rw_domisili" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Provinsi</label>
                                            <input type="text" class="form-control" name="provinsi_domisili" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Kabupaten</label>
                                            <input type="text" class="form-control" name="kabupaten_domisili" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Kecamatan</label>
                                            <input type="text" class="form-control" name="kecamatan_domisili" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Kelurahan</label>
                                            <input type="text" class="form-control" name="kelurahan_domisili" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Kode POS</label>
                                            <input type="text" name="kode_pos_domisili" class="form-control" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Pendidikan Terakhir</label>
                                            <input type="text" name="pendidikan_terakhir" class="form-control" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Jumlah Tanggungan</label>
                                            <input type="text" name="jumlah_tanggungan" class="form-control" disabled>
                                        </div>
                                        <div class="row">
                                            <div class="form-group col-md-6">
                                                <label>No Telpon</label>
                                                <input type="text" name="no_telp" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>No HP</label>
                                                <input type="text" name="no_hp" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="text" name="email" class="form-control" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Alamat Korespondensi</label>
                                            <input type="text" class="form-control" name="alamat_surat" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card mb-3" id="table">
                            <div class="card-header bg-gradient-danger" data-toggle="collapse" href="#collapse_3" role="button" aria-expanded="false" aria-controls="collapse_3">
                                <a class="text-light">
                                    <b>DATA PASANGAN</b>
                                </a>
                            </div>
                            <div class="card-body collapse" id="collapse_3">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Nama Lengkap <small><i>(Sesuai KTP)</i></small></label>
                                            <input type="text" name="nama_lengkap_pas" class="form-control" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Nama Ibu Kandung</label>
                                            <input type="text" name="nama_ibu_kandung_pas" class="form-control" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Jenis Kelamin</label>
                                            <input type="text" id="jenis_kelamin_pas" name="jenis_kelamin_pas" class="form-control" disabled>
                                        </div>
                                        <div class="form-group">
                                            <label>Alamat<small><i>(Sesuai KTP)</i></small></label>
                                            <textarea name="alamat_ktp_pas" class="form-control " rows="5" cols="40" disabled></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>No KTP</label>
                                                <input type="text" name="no_ktp_pas" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>NIK KTP di KK</label>
                                                <input type="text" name="no_ktp_kk_pas" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>NO NPWP</label>
                                            <input type="text" name="no_npwp_pas" class="form-control" disabled>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Tempat Lahir</label>
                                                <input type="text" name="tempat_lahir_pas" class="form-control" disabled>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label>Tanggal Lahir</label>
                                                <input name="tgl_lahir_pas" type="text" class="form-control" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>No Telpon</label>
                                            <input type="text" name="no_telp_pas" class="form-control" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-3" id="formku">
                            <div class="card-header bg-gradient-danger" data-toggle="collapse" href="#collapse_4" role="button" aria-expanded="false" aria-controls="collapse_4">
                                <a class="text-light">
                                    <b>DATA PENJAMIN</b>
                                </a>
                            </div>
                            <div class="card-body collapse" id="collapse_4">
                                <div class="box-body table-responsive no-padding">
                                    <table id="example2" class="table table-bordered table-hover" style="min-width: 2300px">
                                        <thead style="font-size: 12px">
                                            <tr>
                                                <th>
                                                    Nama KTP
                                                </th>
                                                <th>
                                                    Nama Ibu Kandung
                                                </th>
                                                <th>
                                                    No KTP
                                                </th>
                                                <th>
                                                    No NPWP
                                                </th>
                                                <th>
                                                    Tempat Lahir
                                                </th>
                                                <th>
                                                    Tanggal Lahir
                                                </th>
                                                <th>
                                                    Jenis Kelamin
                                                </th>
                                                <th>
                                                    Alamat KTP
                                                </th>
                                                <th>
                                                    No Telpon
                                                </th>
                                                <th>
                                                    Hubungan Debitur
                                                </th>
                                                <th>
                                                    Lampiran KTP
                                                </th>
                                                <th>
                                                    Lampiran KTP Pasangan
                                                </th>
                                                <th>
                                                    Lampiran KK
                                                </th>
                                                <th>
                                                    Lampiran Buku Nikah
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="data_penjamin" style="font-size: 12px">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="card mb-3" id="table">
                            <div class="card-header bg-gradient-danger" data-toggle="collapse" href="#collapse_5" role="button" aria-expanded="false" aria-controls="collapse_5">
                                <a class="text-light">
                                    <b>LAMPIRAN</b>
                                </a>
                            </div>
                            <div class="card-body collapse" id="collapse_5">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">KTP Debitur</label>
                                            <div class="form-group form-file-upload form-file-multiple">
                                                <div class="col-md-6">
                                                    <div class="well" id="gambar_ktp">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="kk">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Kartu Keluarga Debitur</label>
                                            <div class="form-group form-file-upload form-file-multiple">
                                                <div class="col-md-6">
                                                    <div class="well" id="gambar_kk">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="sertifikat">
                                        <div class="form-group">
                                            <label>Sertifikat</label>
                                            <div class="form-group form-file-upload form-file-multiple">
                                                <div class="col-md-6">
                                                    <div class="well" id="gambar_sertifikat">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="pbb">
                                        <div class="form-group">
                                            <label for="exampleInput1" class="bmd-label-floating">Lampiran PBB</label>
                                            <div class="form-group form-file-upload form-file-multiple">
                                                <div class="col-md-6">
                                                    <div class="well" id="gambar_pbb">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="imb">
                                        <div class="form-group">
                                            <label for="exampleInput1" class="bmd-label-floating">IMB</label>
                                            <div class="form-group form-file-upload form-file-multiple">
                                                <div class="col-md-6">
                                                    <div class="well" id="gambar_imb">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="ktp_pasangan">
                                        <div class="form-group">
                                            <label for="exampleInput1" class="bmd-label-floating">KTP Pasangan</label>
                                            <div class="form-group form-file-upload form-file-multiple">
                                                <div class="col-md-6">
                                                    <div class="well" id="gambar_ktp_pasangan">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="buku_nikah">
                                        <div class="form-group">
                                            <label for="exampleInput1" class="bmd-label-floating">Buku Nikah</label>
                                            <div class="form-group form-file-upload form-file-multiple">
                                                <div class="col-md-6">
                                                    <div class="well" id="gambar_buku_nikah">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="lampiran_ideb">
                                        <div class="form-group">
                                            <label>Lampiran IDEB</label>
                                            <div id="dataideb">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" id="lampiran_pefindo">
                                        <div class="form-group">
                                            <label>Lampiran PEFINDO</label>
                                            <div id="datapefindo">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-3" id="table">
                            <div class="card-header bg-gradient-danger" data-toggle="collapse" href="#collapse_6" role="button" aria-expanded="false" aria-controls="collapse_6">
                                <a class="text-light">
                                    <b>UPLOAD FILE IDEB & PEFINDO</b>
                                </a>
                            </div>
                            <div class="card-body collapse" id="collapse_6">
                                <div class="form-row">
                                    <div class="col-md-6" id="">
                                        <div class="row">
                                            <div class="form-group">
                                                <label for="exampleInput1" class="bmd-label-floating">Upload Ideb</label>
                                                <div class="form-group form-file-upload form-file-multiple">
                                                    <button type="button" class="btn btn-success add-row"><i class="fa fa-plus"></i>&nbsp; Tambah </button>&nbsp;
                                                    <button type="button" class="btn btn-danger delete-row"><i class="fa fa-trash"></i>&nbsp; Delete </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table id="table1" class="table table-hover table-striped table-bordered nowrap">
                                                <thead>
                                                    <tr>
                                                        <th width="5">Pilih</th>
                                                        <th>Ideb</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><input type="checkbox" name="record_ideb" width="5" onkeyup="javascript:this.value=this.value.toUpperCase()"></td>
                                                        <td><input type="file" class="form-control" name="ideb[]" multiple id="ideb" onkeyup="javascript:this.value=this.value.toUpperCase()"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-6" id="">
                                        <div class="row">
                                            <div class="form-group">
                                                <label for="exampleInput1" class="bmd-label-floating">Upload Pefindo</label>
                                                <div class="form-group form-file-upload form-file-multiple">
                                                    <button type="button" class="btn btn-success add-row-pefindo"><i class="fa fa-plus"></i>&nbsp; Tambah </button>&nbsp;
                                                    <button type="button" class="btn btn-danger delete-row-pefindo"><i class="fa fa-trash"></i>&nbsp; Delete </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table id="table2" class="table table-hover table-striped table-bordered nowrap">
                                                <thead>
                                                    <tr>
                                                        <th width="5">Pilih</th>
                                                        <th>Pefindo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><input type="checkbox" name="record_pefindo" width="5" onkeyup="javascript:this.value=this.value.toUpperCase()"></td>
                                                        <td><input type="file" class="form-control" name="pefindo[]" id="pefindo" onkeyup="javascript:this.value=this.value.toUpperCase()"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" style="margin-top: 20px;">
                            <label style="font-style: italic; color: #383a3a;">Catatan SO</label>
                            <textarea name="notes_so" style="width: 100%" rows="5" readonly></textarea>
                        </div>
                        <div class="form-group" style="margin-top: 20px;">
                            <label style="font-style: italic; color: #383a3a;">Catatan</label>
                            <textarea name="catatan_das" style="width: 100%" rows="5" onkeyup="javascript:this.value=this.value.toUpperCase()"></textarea>
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary" name="lanjut_ds_spv" value="1" style="float: right;">Lanjut DS SPV</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>


<div class="modal fade in" id="modal_load_data" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" id="load_data"></div>
    </div>
</div>



	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>

  <style>
              /* Style the tab */
              .tab {
                overflow: hidden;
                border: 1px solid #ccc;
                background-color: #f1f1f1;
              }

              /* Style the buttons inside the tab */
              .tab button {
                background-color: inherit;
                float: left;
                border: none;
                outline: none;
                cursor: pointer;
                padding: 14px 16px;
                transition: 0.3s;
                font-size: 17px;
              }

              /* Change background color of buttons on hover */
              .tab button:hover {
                background-color: #ddd;
              }

              /* Create an active/current tablink class */
              .tab button.active {
                background-color: #ccc;
              }

              /* Style the tab content */
              .tabcontent {
                display: none;
                padding: 6px 12px;
                border: 1px solid #ccc;
                border-top: none;
              }
              /* Important part */
              .modal-dialog{
                  overflow-y: initial !important
              }
              .modal-body{
                  height: 500px;
                  overflow-y: auto;
              }
              .modal-backdrop {
                width: 100% !important;
                height: 100% !important;
              }

              .datepicker {
                z-index: 1151 !important;
                }

                .required_notification {
                color: #f70e39;
                }

                .bg-gradient-danger {
                background: #debbbb linear-gradient(180deg, #b10001, #d20014) repeat-x !important;
                }

                img {
                vertical-align: middle;
                }

                .img-responsive,
                .thumbnail>img,
                .thumbnail a>img,
                .carousel-inner>.item>img,
                .carousel-inner>.item>a>img {
                display: block;
                max-width: 100%;
                height: auto;
                }

                .img-rounded {
                border-radius: 6px;
                }

                .img-thumbnail {
                display: inline-block;
                max-width: 100%;
                height: auto;
                padding: 4px;
                line-height: 1.42857143;
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 4px;
                -webkit-transition: all .2s ease-in-out;
                -o-transition: all .2s ease-in-out;
                transition: all .2s ease-in-out;
                }

                .img-circle {
                border-radius: 50%;
                }

                .well {
                min-height: 20px;
                padding: 19px;
                margin-bottom: 20px;
                background-color: #f5f5f5;
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
                }

                .well blockquote {
                border-color: #ddd;
                border-color: rgba(0, 0, 0, .15);
                }

                .well-lg {
                padding: 24px;
                border-radius: 6px;
                }

                .well-sm {
                padding: 9px;
                border-radius: 3px;
                }

                textarea {
                white-space: pre-wrap;
                word-wrap: break-word;
                font-family: inherit;
                }
  </style>

  <script>
        // $(document).ready(function() {
        //     $('#employeeTable').DataTable( {
        //         "scrollX": true,
        //         "autoWidth" : true,
        //         "searching": false,
        //         "aaSorting" : []
        //     } );
        // } );

        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
        

        function openTab(evt, tabName) {
              var i, tabcontent, tablinks;
              tabcontent = document.getElementsByClassName("tabcontent");
              for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
              }
              tablinks = document.getElementsByClassName("tablinks");
              for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
              }
              document.getElementById(tabName).style.display = "block";
              evt.currentTarget.className += " active";
        }
        
  </script>

<script type="text/javascript">
    function rubah(angka) {
        var reverse = angka.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return ribuan;
    }

    $(".add-row-pefindo").click(function() {
        var markup = '<tr><td><input type="checkbox" name="record_pefindo" width="5" onkeyup="javascript:this.value=this.value.toUpperCase()"></td><td><input class="form-control" type="file" name="pefindo[]" id="pefindo[]" onkeyup="javascript:this.value=this.value.toUpperCase()"></td></tr>';
        $("#table2 ").append(markup);
    });

    // Find and remove selected table rows
    $(".delete-row-pefindo").click(function() {
        $("table tbody").find('input[name="record_pefindo"]').each(function() {
            if ($(this).is(":checked")) {
                $(this).parents("tr").remove();
            }
        });
    });

    $(".add-row").click(function() {
        var markup = '<tr><td><input type="checkbox" name="record_ideb" width="5" onkeyup="javascript:this.value=this.value.toUpperCase()"></td><td><input type="file" class="form-control" name="ideb[]" id="ideb[]" onkeyup="javascript:this.value=this.value.toUpperCase()"></td></tr>';
        $("#table1 ").append(markup);
    });

    // Find and remove selected table rows
    $(".delete-row").click(function() {
        $("table tbody").find('input[name="record_ideb"]').each(function() {
            if ($(this).is(":checked")) {
                $(this).parents("tr").remove();
            }
        });
    });

    hide_all = function() {
        $('#lihat_data_credit').hide();
        $('#lihat_detail').hide();
    }
    hide_all();
    $('#lihat_data_credit').show();

    get_credit_checking = function(opts, id) {
        var url = '<?php echo $this->config->item('api_url'); ?>api/master/das';
        return $.ajax({
            type: 'GET',
            url: url,
            data: opts,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

        });
    }

    get_credit_checking_detail = function(opts, id) {
        var url = '<?php echo $this->config->item('api_url'); ?>api/master/das/';

        if (id != undefined) {
            url += id;
        }

        if (opts != undefined) {
            var data = opts;
        }

        return $.ajax({
            // type : 'GET',
            url: url,
            data: data,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            // beforeSend: function() {
            //     let html =
            //         "<div width='100%' class='text-center'>" +
            //         "<i class='fa fa-spinner fa-spin fa-4x text-danger'></i><br><br>" +
            //         "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Batal</a>" +
            //         "</div>";
            //     $('#load_data').html(html);
            //     $('#modal_load_data').modal('show');
            // }
        });
    }

    update_das = function(opts, id) {
        var data = opts;
        var url = '<?php echo $this->config->item('api_url'); ?>api/master/das/' + id;
        return $.ajax({
            url: url,
            data: data,
            type: 'POST',
            processData: false,
            contentType: false,
            cache: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

            beforeSend: function() {
                let html =
                    "<div width='100%' class='text-center'>" +
                    "<i class='fa fa-spinner fa-spin fa-4x text-danger'></i><br><br>" +
                    "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Batal</a>" +
                    "</div>";

                $('#load_data').html(html);
                $('#modal_load_data').modal('show');
            }
        })
    }

    tampil_data_so();

    function tampil_data_so() {
        $('#table_proses').DataTable({

            "processing": true,
            "serverSide": true,
            'destroy': true,
            "order": [],

            "ajax": {
                "url": "<?php echo site_url('Proses_controller/get_data_proses') ?>",
                "type": "POST"
            },

            "columnDefs": [{
                "targets": [0],
                "orderable": false,
            }, ],

        })
    };


    load_data = function() {
        get_credit_checking()
            .done(function(response) {
                var data = response.data;
                var html = [];
                var no = 0;


                if (data.length === 0) {
                    var tr = [
                        '<tr valign="midle">',
                        '<td colspan="4">No Data</td>',
                        '</tr>'
                    ].join('\n');
                    $('#data_credit_checking').html(tr);

                    return;
                }
                $.each(data, function(index, item) {
                    no++;
                    var tr = [
                        '<tr>',
                        '<td>' + no + '</td>',
                        '<td>' + item.tgl_transaksi + '</td>',
                        '<td>' + item.nomor_so + '</td>',
                        '<td>' + item.nama_so + '</td>',
                        '<td>' + item.asal_data + '</td>',
                        '<td>' + item.nama_marketing + '</td>',
                        '<td>' + item.nama_debitur + '</td>',
                        '<td>' + item.status + '</td>',
                        '<td>',
                        '<button type="button" class="btn btn-info btn-sm detail"  data-target="#update" data="' + item.id + '"><i style="color: #fff;" class="fas fa-pencil-alt"></i></button>',
                        '</td>',
                        '</tr>'
                    ].join('\n');
                    html.push(tr);
                });

                $('#data_credit_checking').html(html);
                $('#example2').DataTable({
                    'destroy': true,
                    'paging': true,
                    'lengthChange': true,
                    'searching': true,
                    'ordering': true,
                    'info': true,
                    'autoWidth': true
                });
            })
            .fail(function(response) {
                $('#data_credit_checking').html('<tr><td colspan="4">Tidak ada data</td></tr>');
            });
    }
    // load_data();
    $('#data_credit_checking').show();

    // Click ubah
    $('#data_credit_checking').on('click', '.detail', function(e) {
        e.preventDefault();
        var html = [];
        var html1 = [];
        var html2 = [];
        var html3 = [];
        var html4 = [];
        var html5 = [];
        var html6 = [];
        var html7 = [];
        var html8 = [];
        var htmlideb = [];
        var htmlpefindo = [];
        var htmlktppenjamin = [];
        var htmlktppaspenjamin = [];
        var htmlkkpenjamin = [];
        var htmlbukunikahpenjamin = [];

        var id = $(this).attr('data');

        get_credit_checking_detail({}, id)
            .done(function(response) {
                var data = response.data;
                id = data.id;
                $('#form_detail_credit input[type=hidden][name=id]').val(data.id);
                $('#form_detail_credit input[name=nomor_so]').val(data.nomor_so);
                $('#form_detail_credit input[name=nama_so]').val(data.nama_so);
                $('#form_detail_credit input[name=asal_data]').val(data.asal_data);
                $('#form_detail_credit input[name=nama_marketing]').val(data.nama_marketing);
                var plafon = (rubah(data.plafon));
                $('#form_detail_credit input[name=plafon]').val(plafon);
                $('#form_detail_credit input[name=tenor]').val(data.tenor);
                //fasilitas pinjaman
                $('#form_detail_credit input[name=jenis_pinjaman]').val(data.fasilitas_pinjaman.jenis_pinjaman);
                $('#form_detail_credit textarea[name=tujuan_pinjaman]').val(data.fasilitas_pinjaman.tujuan_pinjaman);
                //calon debitur
                $('#form_detail_credit input[name=nama_lengkap]').val(data.data_debitur.nama_lengkap);
                $('#form_detail_credit input[name=gelar_keagamaan]').val(data.data_debitur.gelar_keagamaan);
                $('#form_detail_credit input[name=gelar_pendidikan]').val(data.data_debitur.gelar_pendidikan);

                if (data.data_debitur.jenis_kelamin == "L") {
                    document.getElementById("jenis_kelamin").value = "LAKI-LAKI";
                } else {
                    document.getElementById("jenis_kelamin").value = "PEREMPUAN";
                }

                $('#form_detail_credit input[name=status_nikah]').val(data.data_debitur.status_nikah);
                $('#form_detail_credit input[name=ibu_kandung]').val(data.data_debitur.ibu_kandung);
                $('#form_detail_credit input[name=no_ktp]').val(data.data_debitur.no_ktp);
                $('#form_detail_credit input[name=no_ktp_kk]').val(data.data_debitur.no_ktp_kk);
                $('#form_detail_credit input[name=no_kk]').val(data.data_debitur.no_kk);
                $('#form_detail_credit input[name=no_npwp]').val(data.data_debitur.no_npwp);
                $('#form_detail_credit input[name=tempat_lahir]').val(data.data_debitur.tempat_lahir);
                $('#form_detail_credit input[name=tgl_lahir_deb]').val(data.data_debitur.tgl_lahir);
                $('#form_detail_credit input[name=umur]').val(data.data_debitur.umur);
                $('#form_detail_credit input[name=agama]').val(data.data_debitur.agama);

                $('#form_detail_credit input[name=alamat_ktp]').val(data.data_debitur.alamat_ktp.alamat_singkat);
                $('#form_detail_credit input[name=rt_ktp]').val(data.data_debitur.alamat_ktp.rt);
                $('#form_detail_credit input[name=rw_ktp]').val(data.data_debitur.alamat_ktp.rw);
                $('#form_detail_credit input[name=provinsi_ktp]').val(data.data_debitur.alamat_ktp.provinsi.nama);
                $('#form_detail_credit input[name=kabupaten_ktp]').val(data.data_debitur.alamat_ktp.kabupaten.nama);
                $('#form_detail_credit input[name=kecamatan_ktp]').val(data.data_debitur.alamat_ktp.kecamatan.nama);
                $('#form_detail_credit input[name=kelurahan_ktp]').val(data.data_debitur.alamat_ktp.kelurahan.nama);
                $('#form_detail_credit input[name=kode_pos_ktp]').val(data.data_debitur.alamat_ktp.kode_pos);
                $('#form_detail_credit input[name=alamat_domisili]').val(data.data_debitur.alamat_domisili.alamat_singkat);
                $('#form_detail_credit input[name=rt_domisili]').val(data.data_debitur.alamat_domisili.rt);
                $('#form_detail_credit input[name=rw_domisili]').val(data.data_debitur.alamat_domisili.rw);
                $('#form_detail_credit input[name=provinsi_domisili]').val(data.data_debitur.alamat_domisili.provinsi.nama);
                $('#form_detail_credit input[name=kabupaten_domisili]').val(data.data_debitur.alamat_domisili.kabupaten.nama);
                $('#form_detail_credit input[name=kecamatan_domisili]').val(data.data_debitur.alamat_domisili.kecamatan.nama);
                $('#form_detail_credit input[name=kelurahan_domisili]').val(data.data_debitur.alamat_domisili.kelurahan.nama);
                $('#form_detail_credit input[name=kode_pos_domisili]').val(data.data_debitur.alamat_domisili.kode_pos);
                $('#form_detail_credit input[name=pendidikan_terakhir]').val(data.data_debitur.pendidikan_terakhir);
                $('#form_detail_credit input[name=jumlah_tanggungan]').val(data.data_debitur.jumlah_tanggungan);
                $('#form_detail_credit input[name=no_telp]').val(data.data_debitur.no_telp);
                $('#form_detail_credit input[name=no_hp]').val(data.data_debitur.no_hp);
                $('#form_detail_credit input[name=email]').val(data.data_debitur.email);
                $('#form_detail_credit input[name=alamat_surat]').val(data.data_debitur.alamat_surat);
                $('#form_detail_credit textarea[name=notes_so]').val(data.notes_so);

                //data pasangan


                $('#form_detail_credit input[name=nama_lengkap_pas]').val(data.data_pasangan.nama_lengkap);
                $('#form_detail_credit input[name=nama_ibu_kandung_pas]').val(data.data_pasangan.nama_ibu_kandung);

                if (data.data_pasangan.jenis_kelamin == "L") {
                    document.getElementById("jenis_kelamin_pas").value = "LAKI-LAKI";
                } else {
                    document.getElementById("jenis_kelamin_pas").value = "PEREMPUAN";
                }

                $('#form_detail_credit input[name=no_ktp_pas]').val(data.data_pasangan.no_ktp);
                $('#form_detail_credit input[name=no_ktp_kk_pas]').val(data.data_pasangan.no_ktp_kk);
                $('#form_detail_credit input[name=no_npwp_pas]').val(data.data_pasangan.no_npwp);
                $('#form_detail_credit input[name=tempat_lahir_pas]').val(data.data_pasangan.tempat_lahir);
                $('#form_detail_credit input[name=tgl_lahir_pas]').val(data.data_pasangan.tgl_lahir);
                $('#form_detail_credit textarea[name=alamat_ktp_pas]').val(data.data_pasangan.alamat_ktp);
                $('#form_detail_credit input[name=no_telp_pas]').val(data.data_pasangan.no_telp);
                $('#form_detail_credit textarea[name=catatan_das]').val(data.note);

                //lampiran
                $.each(data.lampiran.ideb, function(item) {
                    var a = [
                        '<a class="example-image-link" target="window.open()" download href="<?php echo $this->config->item('img_url') ?>' + data.lampiran.ideb[item] + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran.ideb[item] + '</p></a>',
                    ].join('\n');
                    htmlideb.push(a);
                });
                $('#dataideb').html(htmlideb);

                $.each(data.lampiran.pefindo, function(item) {
                    var b = [
                        '<a class="example-image-link" target="window.open()" download href="<?php echo $this->config->item('img_url') ?>' + data.lampiran.pefindo[item] + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran.pefindo[item] + '</p></a>',
                    ].join('\n');
                    htmlpefindo.push(b);
                });
                $('#datapefindo').html(htmlpefindo);

                if (data.data_debitur.lampiran.lamp_ktp == null) {
                    $('#ktp').hide();
                } else {
                    var a = [
                        '<a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_ktp + '" data-lightbox="example-set" data-title="Lampiran KTP Debitur"><img class="thumbnail img-responsive" alt="" src="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_ktp + '" /> </a>'
                    ].join('\n');
                    html.push(a);
                    $('#gambar_ktp').html(html);
                }
                if (data.data_debitur.lampiran.lamp_kk == null) {
                    $('#kk').hide();
                } else {
                    var b = [
                        '<a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_kk + '" data-lightbox="example-set" data-title="Lampiran KK Debitur"><img class="thumbnail img-responsive" alt="" src="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_kk + '" /> </a>'
                    ].join('\n');
                    html1.push(b);
                    $('#gambar_kk').html(html1);
                }

                if (data.data_debitur.lampiran.lamp_sertifikat == null) {
                    $('#sertifikat').hide();

                } else {
                    var c = [
                        '<a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_sertifikat + '" data-lightbox="example-set" data-title="Lampiran Sertifkat Debitur"><img class="thumbnail img-responsive" alt="" src="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_sertifikat + '" /> </a>'
                    ].join('\n');
                    html2.push(c);
                    $('#gambar_sertifikat').html(html2);
                }

                if (data.data_debitur.lampiran.lamp_sttp_pbb == null) {
                    $('#pbb').hide();
                } else {
                    var d = [
                        '<a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_sttp_pbb + '" data-lightbox="example-set" data-title="Lampiran PBB Debitur"><img class="thumbnail img-responsive" alt="" src="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_sttp_pbb + '" /> </a>'
                    ].join('\n');
                    html3.push(d);
                    $('#gambar_pbb').html(html3);
                }

                if (data.data_debitur.lampiran.lamp_imb == null) {
                    $('#imb').hide();
                    // $('imb').hide();  
                } else {

                    var e = [
                        '<a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_imb + '" data-lightbox="example-set" data-title="Lampiran IMB Debitur"><img class="thumbnail img-responsive" alt="" src="<?php echo $this->config->item('img_url') ?>' + data.data_debitur.lampiran.lamp_imb + '" /> </a>'
                    ].join('\n');
                    html4.push(e);
                    $('#gambar_imb').html(html4);
                }

                if (data.data_pasangan.lamp_buku_nikah == null) {
                    $('#buku_nikah').hide();
                    // $('imb').hide();  
                } else {

                    var f = [
                        '<a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + data.data_pasangan.lamp_buku_nikah + '" data-lightbox="example-set" data-title="Lampiran IMB Debitur"><img class="thumbnail img-responsive" alt="" src="<?php echo $this->config->item('img_url') ?>' + data.data_pasangan.lamp_buku_nikah + '" /> </a>'
                    ].join('\n');
                    html5.push(f);
                    $('#gambar_buku_nikah').html(html5);
                }

                if (data.data_pasangan.lamp_ktp == null) {
                    $('#ktp_pasangan').hide();
                    // $('imb').hide();  
                } else {

                    var g = [
                        '<a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + data.data_pasangan.lamp_ktp + '" data-lightbox="example-set" data-title="Lampiran IMB Debitur"><img class="thumbnail img-responsive" alt="" src="<?php echo $this->config->item('img_url') ?>' + data.data_pasangan.lamp_ktp + '" /> </a>'
                    ].join('\n');
                    html6.push(g);
                    $('#gambar_ktp_pasangan').html(html6);
                }

                var htmlpenjamin = [];

                $.each(data.data_penjamin, function(index, item) {

                    var jenis_kelamin_pen = "";

                    if (item.jenis_kelamin == 'L') {
                        jenis_kelamin_pen = 'LAKI-LAKI';
                    } else {
                        jenis_kelamin_pen = 'PEREMPUAN';
                    }
                    var tr = [

                        '<tr>',
                        '<td style="width:210px">' + item.nama_ktp + '</td>',
                        '<td style="width:210px">' + item.nama_ibu_kandung + '</td>',
                        '<td>' + item.no_ktp + '</td>',
                        '<td>' + item.no_npwp + '</td>',
                        '<td style="width:135px">' + item.tempat_lahir + '</td>',
                        '<td style="width:137px">' + item.tgl_lahir + '</td>',
                        '<td style="width:160px">' + jenis_kelamin_pen + '</td>',
                        '<td style="width:285px">' + item.alamat_ktp + '</td>',
                        '<td>' + item.no_telp + '</td>',
                        '<td style="width:185px">' + item.hubungan_debitur + '</td>',
                        '<td style="width:160px"><a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran.lamp_ktp + '" data-lightbox="example-set" data-title="Lampiran KTP Debitur"><img class="thumbnail img-responsive" style="width:45px" alt="" src="<?php echo $this->config->item('img_url') ?>' + item.lampiran.lamp_ktp + '" /> </a> </td>',
                        '<td style="width:200px"><a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran.lamp_ktp_pasangan + '" data-lightbox="example-set" data-title="Lampiran KTP Debitur"><img class="thumbnail img-responsive" style="width:45px" alt="" src="<?php echo $this->config->item('img_url') ?>' + item.lampiran.lamp_ktp_pasangan + '" /> </a> </td>',
                        '<td style="width:160px"><a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran.lamp_kk + '" data-lightbox="example-set" data-title="Lampiran KTP Debitur"><img class="thumbnail img-responsive" style="width:45px"style="width:45px" alt="" src="<?php echo $this->config->item('img_url') ?>' + item.lampiran.lamp_kk + '" /> </a> </td>',
                        '<td style="width:180px"><a class="example-image-link" target="window.open()" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran.lamp_buku_nikah + '" data-lightbox="example-set" data-title="Lampiran KTP Debitur"><img class="thumbnail img-responsive" style="width:45px" alt="" src="<?php echo $this->config->item('img_url') ?>' + item.lampiran.lamp_buku_nikah + '" /> </a> </td>',

                        '</tr>'
                    ].join('\n');
                    htmlpenjamin.push(tr);
                })
                $('#data_penjamin').html(htmlpenjamin);
                $('#batal').click();

            })

            .fail(function(jqXHR) {
                bootbox.alert('Data tidak ditemukan, coba refresh kembali!!');
            });
        hide_all()
        $('#lihat_detail').show();
    });


    // klik submit update
    $('#form_detail_credit').on('submit', function(e) {
        var id = $('input[name=id]', this).val();
        e.preventDefault();
        var formData = new FormData();

        formData.append('catatan_das', $('textarea[name=catatan_das]', this).val());
        formData.append('status_das', $('button[name=lanjut_ds_spv]', this).val());

        $.each($('input[name="ideb[]"]', this), function(i, e) {
            formData.append('lamp_ideb[]', e.files[0]);
        });
        $.each($('input[name="pefindo[]"]', this), function(i, e) {
            formData.append('lamp_pefindo[]', e.files[0]);
        });

        update_das(formData, id)
            .done(function(res) {
                var data = res.data;
                bootbox.alert('Data berhasil di simpan', function() {
                    $("#batal").click();
                    tampil_data_so();
                    hide_all();
                    $('#lihat_data_credit').show();
                    $('#form_detail_credit')[0].reset();
                });
            })
            .fail(function(jqXHR) {
                var data = jqXHR.responseJSON;
                var error = "";

                if (typeof data == 'string') {
                    error = '<p>' + data + '</p>';
                } else {
                    $.each(data, function(index, item) {
                        error += '<p>' + item + '</p>' + "\n";
                    });
                }
                bootbox.alert(error, function() {
                    $("#batal").click();
                });
            });
    });
</script>
 
</body>
</html>


