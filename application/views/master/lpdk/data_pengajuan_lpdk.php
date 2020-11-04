
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
        <style type="text/css">
          .modal-backdrop {
                width: 100% !important;
                height: 100% !important;
              }
            td.details-control {
                background: url('../../assets/dist/img/details_open.png') no-repeat center center;
                cursor: pointer;
            }

            tr.shown td.details-control {
                background: url('../../assets/dist/img/details_close.png') no-repeat center center;
            }

            .card-primary.card-outline-tabs>.card-header a.active {
                border-top: 3px solid #d93444;
            }

            .nav-link {
                display: block;
                padding: 0.5rem 0.9rem;
            }

            .image-upload>input {
                display: none;
            }

            .image-upload img {
                width: 40px;
                cursor: pointer;
            }
        </style>
        <link href="<?php echo base_url('assets/dist/css/datepicker.min.css') ?>" rel="stylesheet" type="text/css">
        <script src="<?php echo base_url('assets/dist/js/datepicker.js') ?>"></script>

        <div id="lihat_data_credit" class="content-wrapper" style="padding-left: 15px; padding-right: 15px;">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Data Pengajuan LPDK</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Data Pengajuan LPDK</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section style="min-height: 700px;">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="box-body table-responsive no-padding">
                                    <div class="px-2 bg-light">
                                        <marquee class="py-3" direction="left" onmouseover="this.stop()" onmouseout="this.start()" style=" color:#ff0018">
                                            *Lampiran file yang akan diajukan ke Legal berextensi PDF dan harus jelas, karena lampiran tersebut akan digunakan di Efiling*
                                        </marquee>
                                    </div>
                                    <button class="btn btn-primary tambah" id="modal_pengajuan" style="margin-bottom: 9px;"><i class="fa fa-user-plus">Tambah</i></button>
                                    <table id="table_pengajuan_lpdk" class="table table-bordered table-hover table-sm" style="white-space: nowrap; width: 100%;">
                                        <thead style="font-size: 12px" class="bg-danger">
                                            <tr>
                                                <th>
                                                </th>
                                                <th>
                                                    Status
                                                </th>
                                                <th>
                                                    Tanggal Request
                                                </th>
                                                <th>
                                                    No SO
                                                </th>
                                                <th>
                                                    Nama SO
                                                </th>
                                                <th>
                                                    Request By
                                                </th>
                                                <th>
                                                    Cabang
                                                </th>
                                                <th>
                                                    Nama Debitur
                                                </th>
                                                <th>
                                                    Plafon
                                                </th>
                                                <th>
                                                    Tenor
                                                </th>
                                                <th>
                                                    SLA
                                                </th>
                                                <th>
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody style="font-size: 12px" id="data_pengajuan_lpdk">
                                        </tbody>
                                        <tfoot>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div class="modal fade in" id="modal_data_pengajuan" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Data Approval</h4>
                        <button type="button" title="Tutup" class="close" data-dismiss="modal" style="color: #ff0c17" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <div class="box-body table-responsive no-padding">
                                    <table id="example2" class="table table-bordered table-hover table-sm" style="white-space: nowrap;">
                                        <thead style="font-size: 12px" class="bg-danger">
                                            <tr>
                                                <th>
                                                    No
                                                </th>
                                                <th>
                                                    No SO
                                                </th>
                                                <th>
                                                    Nama SO
                                                </th>
                                                <th>
                                                    Cabang
                                                </th>
                                                <th>
                                                    Calon Debitur
                                                </th>
                                                <th>
                                                    Plafon
                                                </th>
                                                <th>
                                                    Tenor
                                                </th>
                                                <th>
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="data_pengajuan" style="font-size: 12px">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" id="close_pengajuan" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade in" id="modal_tambah_pengajuan_lpdk" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tambah Pengajuan LPDK</h5>
                        <button type="button" class="close" data-dismiss="modal" style="color: #ff0c17" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="height:500px; overflow-y:scroll">
                        <form id="form_pengajuan">
                            <input type="hidden" name="id_trans_so" id="id_trans_so">
                            <input type="hidden" value="" name="status_edit" id="status_edit">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <div class="col-md-3">
                                            <small font-weight: 700;>Area Kerja :</small>
                                        </div>
                                        <div class="col-md-9">
                                            <input type="text" name="area_kerja_p" value="" class="form-control form-control-sm" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <div class="col-md-3">
                                            <small font-weight: 700;>Nama SO :</small>
                                        </div>
                                        <div class="col-md-9">
                                            <input type="text" name="nama_so_p" value="" class="form-control form-control-sm" readonly="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <div class="col-md-3">
                                            <small font-weight: 700;>Asal Data :</small>
                                        </div>
                                        <div class="col-md-9">
                                            <input type="text" name="asal_data_p" class="form-control form-control-sm" readonly="">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <div class="col-md-3">
                                            <small font-weight: 700;>Nama Marketing:</small>
                                        </div>
                                        <div class="col-md-9">
                                            <input type="text" name="nama_mb_p" class="form-control form-control-sm" readonly="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <div class="col-md-3">
                                            <small font-weight: 700;>Plafon :</small>
                                        </div>
                                        <div class="col-md-9">
                                            <input type="text" name="plafon_p" class="form-control form-control-sm" readonly="">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row">
                                        <div class="col-md-3">
                                            <small font-weight: 700;>Tenor :</small>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="tenor_p" class="form-control form-control-sm" readonly="">
                                        </div>
                                        <small>Bulan</small>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title">Rincian Pengajuan LPDK</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card card-primary card-outline card-outline-tabs" style="border-top: 3px solid #dc3545;">
                                                <div class="card-header p-0 border-bottom-0">
                                                    <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                                                        <li class="nav-item">
                                                            <a class="nav-link active" id="custom-tabs-three-home-tab" data-toggle="pill" href="#custom-tabs-three-home" role="tab" aria-controls="custom-tabs-three-home" aria-selected="true">Data Cadeb</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="custom-tabs-three-penjamin-tab" data-toggle="pill" href="#custom-tabs-three-penjamin" role="tab" aria-controls="custom-tabs-three-penjamin" aria-selected="false">Data Penjamin</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="custom-tabs-three-profile-tab" data-toggle="pill" href="#custom-tabs-three-profile" role="tab" aria-controls="custom-tabs-three-profile" aria-selected="false">Kronologis</a>
                                                        </li>
                                                        <li class="nav-item" id="lamp_data_nasabah">
                                                            <a class="nav-link" id="custom-tabs-three-messages-tab" data-toggle="pill" href="#custom-tabs-three-messages" role="tab" aria-controls="custom-tabs-three-messages" aria-selected="false">Lamp Data Nasabah</a>
                                                        </li>
                                                        <li class="nav-item" id="lamp_data_jaminan">
                                                            <a class="nav-link" id="custom-tabs-three-settings-tab" data-toggle="pill" href="#custom-tabs-three-settings" role="tab" aria-controls="custom-tabs-three-settings" aria-selected="false">Lamp Data Jaminan</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="card-body">
                                                    <div class="tab-content" id="custom-tabs-three-tabContent">
                                                        <div class="tab-pane fade show active" id="custom-tabs-three-home" role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <small style="font-weight: 700;">Nama Cadeb :</small>
                                                                        <div class="input-group">
                                                                            <input type="text" name="nama_cadeb_p" class="form-control" onkeyup="this.value = this.value.toUpperCase()" readonly>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <small style="font-weight: 700;">Status Pernikahan :</small>
                                                                        <select name="status_nikah_p" id="status_nikah_p" class="form-control select2 select2-danger" style="width: 100%;" disabled>
                                                                            <option value="">--Pilih--</option>
                                                                            <option id="single_p" value="Single">Single</option>
                                                                            <option id="menikah_p" value="Menikah">Menikah</option>
                                                                            <option id="janda_duda_p" value="Janda/Duda">Janda/Duda</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <small style="font-weight: 700;">Nama Pasangan :</small>
                                                                        <div class="input-group">
                                                                            <input type="text" name="nama_pasangan_p" class="form-control" onkeyup="this.value = this.value.toUpperCase()" readonly>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <small style="font-weight: 700;">Nama Produk Kredit :</small>
                                                                        <div class="input-group">
                                                                            <select name="nama_produk_kredit_p" id="nama_produk_kredit_p" class="form-control select2 select2-danger" style="width: 100%;" disabled>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <small style="font-weight: 700;">Alamat KTP sama dengan alamat jaminan :</small>
                                                                        <div class="row">
                                                                            <div class="col-md-6">
                                                                                <input type="radio" value="TIDAK" id="alamat_tidak_sama_jaminan" name="alamat_ktp_vs_jaminan"> <small>TIDAK</small>
                                                                            </div>
                                                                            <div class="col-md-6">
                                                                                <input type="radio" value="YA" id="alamat_ktp_sama_jaminan" name="alamat_ktp_vs_jaminan"> <small>YA</small>
                                                                            </div>
                                                                        </div>
                                                                        <div id="penyimpangan_optional"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="custom-tabs-three-profile" role="tabpanel" aria-labelledby="custom-tabs-three-profile-tab">
                                                            <div class="row">
                                                                <div class="box-body table-responsive no-padding">
                                                                    <table class="table table-bordered table-hover table-sm" style="min-width: 1000px">
                                                                        <thead style="font-size: 12px" class="bg-danger">
                                                                            <tr>
                                                                                <th id="aksi_jaminan">
                                                                                    Aksi
                                                                                </th>
                                                                                <th>
                                                                                    Jaminan
                                                                                </th>
                                                                                <th>
                                                                                    No Sertifikat
                                                                                </th>
                                                                                <th>
                                                                                    Nama Pemilik Sertifikat
                                                                                </th>
                                                                                <th>
                                                                                    Nama Pasangan Pemilik Sertifikat
                                                                                </th>
                                                                                <th>
                                                                                    Hubungan Cadeb
                                                                                </th>
                                                                                <th>
                                                                                    Tanggal SHGB
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody id="data_jaminan_sertifikat" style="font-size: 12px">
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="form-group">
                                                                        <small style="font-weight: 700;">Akta Notaris (Yang Akan Dibuat) :</small>
                                                                        <div class="row">
                                                                            <div class="col-md-3">
                                                                                <input type="checkbox" value="SKMHT" id="skmht" name="akta_notaris[]"> <small>SKMHT</small>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="checkbox" value="APHT" id="apht" name="akta_notaris[]"> <small>APHT</small>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="checkbox" value="Cabut Roya" id="cabut_roya" name="akta_notaris[]"> <small>Cabut Roya</small>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="checkbox" value="Akta Jual Beli" id="akta_jual_beli" name="akta_notaris[]"> <small>Akta Jual Beli</small>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="checkbox" value="Balik Nama Waris" id="balik_nama_waris" name="akta_notaris[]"> <small>Balik Nama Waris</small>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="checkbox" value="Peningkatan Hak" id="peningkatan_hak" name="akta_notaris[]"> <small>Peningkatan Hak</small>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="checkbox" value="Adendum" id="adendum" name="akta_notaris[]"> <small>Adendum</small>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="checkbox" value="Lain-Lain" id="lain_lain_notaris" name="akta_notaris[]"> <small>Lain-Lain</small>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12" id="form_notes_lain2">
                                                                    <div class="form-group row">
                                                                        <div class="col-md-2">
                                                                            <small font-weight: 700;>Notes Lain-lain :</small>
                                                                        </div>
                                                                        <div class="col-md-12">
                                                                            <textarea style="width:100%" name="notes_lain2"></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="custom-tabs-three-messages" role="tabpanel" aria-labelledby="custom-tabs-three-messages-tab">
                                                            <div class="row">
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">KTP Debitur</small>
                                                                        <label for="lamp_ktp_deb">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_ktp_debitur">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_ktp">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4" id="form_ktp_pasangan_deb">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">KTP Pasangan</small>
                                                                        <label for="lamp_ktp_pas">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_ktp_pas">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_ktp_pas">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4" id="form_ktp_pasangan_deb">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">KTP Penjamin</small>
                                                                        <label for="lamp_ktp_pen">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" id="tampil_modal_ktp_penjamin">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_ktp_pen">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4" id="form_ktp_pasangan_deb">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Buku Nikah Penjamin</small>
                                                                        <label for="lamp_ktp_pas">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" id="tampil_modal_buku_nikah_penjamin">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_buku_nikah_pen">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4" id="form_ktp_pemilik_sertifikat">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">KTP Pemilik Sertifikat</small>
                                                                        <label for="lamp_ktp_pem_sertifikat">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" id="tampil_modal_ktp_pem_sertifikat">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_ktp_pem_sertifikat">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4" id="form_ktp_pasangan_pemilik_sertifikat">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">KTP Pasangan Pemilik Sertifikat</small>
                                                                        <label for="lamp_ktp_pas_pem_sertifikat">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" id="tampil_modal_ktp_pas_pem_sertifikat">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_ktp_pas_pem_sertifikat">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Kartu Keluarga</small>
                                                                        <label for="lamp_kk">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_kk">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_kk">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">NPWP</small>
                                                                        <label for="lamp_npwp">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_npwp">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_npwp">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Surat Nikah</small>
                                                                        <label for="lamp_surat_nikah">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_surat_nikah">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_surat_nikah">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Surat Cerai</small>
                                                                        <label for="lamp_surat_cerai">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_surat_cerai">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_surat_cerai">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Surat Lahir</small>
                                                                        <label for="lamp_surat_lahir">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_surat_lahir">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_surat_lahir">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Surat Kematian</small>
                                                                        <label for="lamp_surat_kematian">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_surat_kematian">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_surat_kematian">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Surat Ket Desa/PM1/PM2</small>
                                                                        <label for="lamp_surat_ket_desa">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_surat_ket_desa">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_surat_ket_desa">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="custom-tabs-three-penjamin" role="tabpanel" aria-labelledby="custom-tabs-three-penjamin-tab">
                                                            <div class="row">
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-sm" style="white-space: nowrap;">
                                                                        <thead style="font-size: 12px" class="bg-danger">
                                                                            <tr>
                                                                                <th id="aksi_penjamin">
                                                                                    Aksi
                                                                                </th>
                                                                                <th>
                                                                                    Nama Penjamin
                                                                                </th>
                                                                                <th>
                                                                                    Nama Pasangan Penjamin
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody id="data_penjamin" style="font-size: 12px">
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="custom-tabs-three-settings" role="tabpanel" aria-labelledby="custom-tabs-three-settings-tab">
                                                            <div class="row">
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Sertifikat</small>
                                                                        <label for="lamp_sertifikat">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_sertifikat">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_sertifikat">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">PBB</small>
                                                                        <label for="lamp_pbb">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_pbb">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_pbb">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">IMB</small>
                                                                        <label for="lamp_imb">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_imb">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_imb">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">AJB/PPJB</small>
                                                                        <label for="lamp_ajb_ppjb">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_ajb">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_ajb_ppjb">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Ahli Waris</small>
                                                                        <label for="lamp_ahli_waris">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_ahli_waris">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_ahli_waris">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group col-md-4">
                                                                    <div class="image-upload">
                                                                        <small style="font-weight: 700;">Akta Pengakuan Hak Bersama/Akta Hibah</small>
                                                                        <label for="lamp_akta_hibah">
                                                                            <img src="<?php echo base_url('assets/dist/img/upload.png') ?>" data-toggle="modal" data-target="#modal_akt_hibah">
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-group" id="file_akta_hibah">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="btn_simpan_pengajuan">
                            </div>
                            <div class="form-group">
                                <div class="btn_simpan_pengajuan">
                                    <button id="simpan_pengajuan" type="submit" class="btn btn-primary btn-sm submit button" style="float: right;">Simpan</button>
                                    <a href="javascript:void(0)" data-dismiss="modal" class="btn btn-danger btn-sm button" style="float: right; margin-right: 4px">Batal</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <form id="form_tambah_ktp_deb">
            <div class="modal fade rotate" id="modal_ktp_debitur">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <input type="hidden" id="id_debitur_ktp" name="id_debitur_ktp">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload KTP Debitur</label>
                                <div class="input-group">
                                    <input type="file" id="lamp_ktp_deb" name="lamp_ktp_deb" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-between">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success" style="background-color: #007bff;">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_ktp_pas">
            <input type="hidden" id="id_debitur_ktp_pas" name="id_debitur_ktp_pas">
            <div class="modal fade rotate" id="modal_ktp_pas">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload KTP Pasangan</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_ktp_pas" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_ktp_pen">
            <input type="hidden" id="id_debitur_ktp_pen" name="id_debitur_ktp_pen">
            <div class="modal fade rotate" id="modal_ktp_pen">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Penjamin<span class="required_notification">*</span></label>
                                <select name="select_nama_penjamin" id="select_nama_penjamin" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Upload KTP Penjamin</label>
                                <div class="input-group">
                                    <input type="file" id="lamp_ktp_pen_1" name="lamp_ktp_pen" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_buku_nikah_pen">
            <input type="hidden" id="id_debitur_buku_nikah_pen" name="id_debitur_buku_nikah_pen">
            <div class="modal fade rotate" id="modal_buku_nikah_pen">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Penjamin<span class="required_notification">*</span></label>
                                <select name="select_nama_penjamin_buk_nik" id="select_nama_penjamin_buk_nik" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Upload Buku Nikah Penjamin</label>
                                <div class="input-group">
                                    <input type="file" id="lamp_buku_nikah_pen" name="lamp_buku_nikah_pen" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_ktp_pem_sertifikat">
            <input type="hidden" id="id_debitur_ktp_pem_sertifikat" name="id_debitur_ktp_pem_sertifikat">
            <div class="modal fade rotate" id="modal_ktp_pem_sertifikat">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Pemilik Sertifikat<span class="required_notification">*</span></label>
                                <select name="select_nama_pemilik_sertifikat_ktp" id="select_nama_pemilik_sertifikat_ktp" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Upload KTP Pemilik Sertifikat</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_ktp_pem_sertifikat" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_ktp_pas_pem_sertifikat">
            <input type="hidden" id="id_debitur_ktp_pas_pem_sertifikat" name="id_debitur_ktp_pas_pem_sertifikat">
            <div class="modal fade rotate" id="modal_ktp_pas_pem_sertifikat">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Pemilik Sertifikat<span class="required_notification">*</span></label>
                                <select name="select_nama_pemilik_sertifikat_ktp_pas" id="select_nama_pemilik_sertifikat_ktp_pas" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Upload KTP Pasangan Pemilik Sertifikat</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_ktp_pas_pem_sertifikat" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_kk">
            <input type="hidden" id="id_debitur_kk" name="id_debitur_kk">
            <div class="modal fade rotate" id="modal_kk">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload Kartu Keluarga</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_kk" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_npwp">
            <input type="hidden" id="id_debitur_npwp" name="id_debitur_npwp">
            <div class="modal fade rotate" id="modal_npwp">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload NPWP</label>
                                <div class="input-group">
                                    <input type="file" id="lamp_npwp" name="lamp_npwp" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_surat_nikah">
            <input type="hidden" id="id_debitur_nikah" name="id_debitur_nikah">
            <div class="modal fade rotate" id="modal_surat_nikah">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload Surat Nikah</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_surat_nikah" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_surat_cerai">
            <input type="hidden" id="id_debitur_cerai" name="id_debitur_cerai">
            <div class="modal fade rotate" id="modal_surat_cerai">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload Surat Cerai</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_surat_cerai" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_surat_lahir">
            <input type="hidden" id="id_debitur_lahir" name="id_debitur_lahir">
            <div class="modal fade rotate" id="modal_surat_lahir">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload Surat Lahir</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_surat_lahir" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_surat_kematian">
            <input type="hidden" id="id_debitur_kematian" name="id_debitur_kematian">
            <div class="modal fade rotate" id="modal_surat_kematian">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload Surat Kematian</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_surat_kematian" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_surat_ket_desa">
            <input type="hidden" id="id_debitur_ket_desa" name="id_debitur_ket_desa">
            <div class="modal fade rotate" id="modal_surat_ket_desa">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="exampleInputFile">Upload Surat Ket Desa/PM1/PM2</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_surat_ket_desa" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_sertifikat">
            <input type="hidden" id="id_debitur_sertifikat" name="id_debitur_sertifikat">
            <div class="modal fade rotate" id="modal_sertifikat">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Pemilik Sertifikat<span class="required_notification">*</span></label>
                                <select name="select_nama_pemilik_sertifikat_sertifikat" id="select_nama_pemilik_sertifikat_sertifikat" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Tambah Sertifikat</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_sertifikat" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_pbb">
            <input type="hidden" id="id_debitur_pbb" name="id_debitur_pbb">
            <div class="modal fade rotate" id="modal_pbb">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Pemilik Sertifikat<span class="required_notification">*</span></label>
                                <select name="select_nama_pemilik_sertifikat_pbb" id="select_nama_pemilik_sertifikat_pbb" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Tambah PBB</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_pbb" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_imb">
            <input type="hidden" id="id_debitur_imb" name="id_debitur_imb">
            <div class="modal fade rotate" id="modal_imb">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Pemilik Sertifikat<span class="required_notification">*</span></label>
                                <select name="select_nama_pemilik_sertifikat_imb" id="select_nama_pemilik_sertifikat_imb" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Tambah IMB</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_imb" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_ajb">
            <input type="hidden" id="id_debitur_ajb" name="id_debitur_ajb">
            <div class="modal fade rotate" id="modal_ajb">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Pemilik Sertifikat<span class="required_notification">*</span></label>
                                <select name="select_nama_pemilik_sertifikat_ajb" id="select_nama_pemilik_sertifikat_ajb" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Tambah AJB/PPJB</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_ajb" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_ahli_waris">
            <input type="hidden" id="id_debitur_ahli_waris" name="id_debitur_ahli_waris">
            <div class="modal fade rotate" id="modal_ahli_waris">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Pemilik Sertifikat<span class="required_notification">*</span></label>
                                <select name="select_nama_pemilik_sertifikat_ahli_waris" id="select_nama_pemilik_sertifikat_ahli_waris" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Tambah Ahli Waris</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_ahli_waris" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_tambah_akta_hibah">
            <input type="hidden" id="id_debitur_akta_hibah" name="id_debitur_akta_hibah">
            <div class="modal fade rotate" id="modal_akt_hibah">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Nama Pemilik Sertifikat<span class="required_notification">*</span></label>
                                <select name="select_nama_pemilik_sertifikat_akta_hibah" id="select_nama_pemilik_sertifikat_akta_hibah" class="form-control select2 select2-danger" style="width: 100%;">
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Tambah Akta Hibah</label>
                                <div class="input-group">
                                    <input type="file" name="lamp_akta_hibah" class="form-control" style="height: 45px">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <form id="form_note">
            <input type="hidden" id="id_trans_so_note" name="id_trans_so_note">
            <div class="modal fade rotate" id="modal_note">
                <div class="modal-dialog">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <h4 for="exampleInputFile">Note</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="hidden" id="note_progress1" name="note_progress1">
                                <div class="input-group">
                                    <textarea type="file" name="notes_counter" class="form-control" style="height: 188px"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>



        <div class="modal fade in" id="modal_input_penjamin" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Input Penjamin</h5>
                        <button type="button" class="close close_deb" data-dismiss="modal" style="color: #ff0c17" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="form_penjamin">
                        <div class="modal-body">
                            <input type="hidden" name="id_penjamin" id="id_penjamin">
                            <input type="hidden" name="id_penjamin_so" id="id_penjamin_so">
                            <div class="form-group row">
                                <div class="col-md-5">
                                    <small font-weight: 700;>Nama Penjamin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</small>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" name="edit_nama_penjamin" value="" class="form-control form-control-sm">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-5">
                                    <small font-weight: 700;>Nama Pasangan Penjamin :</small>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" name="edit_nama_pas_penjamin" value="" class="form-control form-control-sm">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group" style="height:0px;">
                                <button type="submit" class="btn btn-primary btn-sm submit" style="float: right;">Simpan</button>
                                <a href="javascript:void(0)" data-dismiss="modal" class="btn btn-danger btn-sm" style="float: right; margin-right: 4px">Batal</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal fade in" id="modal_input_jaminan" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Input Jaminan</h5>
                        <button type="button" class="close close_deb" data-dismiss="modal" style="color: #ff0c17" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form id="form_jaminan">
                        <div class="modal-body">
                            <input type="hidden" name="id_jaminan" id="id_jaminan">
                            <input type="hidden" name="id_jaminan_so" id="id_jaminan_so">
                            <div class="form-group row">
                                <div class="col-md-5">
                                    <small font-weight: 700;>Jaminan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</small>
                                </div>
                                <div class="col-md-7">
                                    <select class="form-control form-control-sm" id="edit_jaminan" name="edit_jaminan">
                                        <option id="edit_pilih_jaminan" value="">--Pilih--</option>
                                        <option id="edit_shm" value="SHM">SHM</option>
                                        <option id="edit_shgb" value="SHGB">SHGB</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-5">
                                    <small font-weight: 700;>No Sertifikat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</small>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" name="edit_no_sertifikat" value="" class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-5">
                                    <small font-weight: 700;>Nama Pemilik Sertifikat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</small>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" name="edit_nama_pemilik_sertifikat" value="" onkeyup="this.value = this.value.toUpperCase()" class="form-control form-control-sm">
                                    <input type="Radio" value="Hidup" id="status_pemilik_hidup" name="edit_status_hidup[]"> <small>Hidup</small>
                                    <input type="Radio" value="Meninggal Dunia" id="status_pemilik_meninggal" name="edit_status_hidup[]"> <small>Meninggal Dunia</small>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-5">
                                    <small font-weight: 700;>Nama Pas Pemilik Sertifikat :</small>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" name="edit_nama_pas_pemilik_sertifikat" value="" onkeyup="this.value = this.value.toUpperCase()" class="form-control form-control-sm">
                                    <input type="Radio" value="Hidup" id="status_pas_pemilik_hidup" name="edit_status_hidup_pas[]"> <small>Hidup</small>
                                    <input type="Radio" value="Meninggal Dunia" id="status_pas_pemilik_meninggal" name="edit_status_hidup_pas[]"> <small>Meninggal Dunia</small>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-5">
                                    <small font-weight: 700;>Hubungan Cadeb &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</small>
                                </div>
                                <div class="col-md-7">
                                    <select class="form-control form-control-sm" id="edit_hubungan_cadeb" name="edit_hubungan_cadeb">
                                        <option id="edit_hub_pilih" value="">--Pilih--</option>
                                        <option id="edit_hub_pas" value="Pasangan">Pasangan</option>
                                        <option id="edit_hub_ibu" value="Ibu">Ibu</option>
                                        <option id="edit_hub_bapak" value="Bapak">Bapak</option>
                                        <option id="edit_hub_anak" value="Anak">Anak</option>
                                        <option id="edit_hub_saudara_kandung" value="Saudara Kandung">Saudara Kandung</option>
                                        <option id="edit_hub_orang_lain" value="Orang Lain">Orang Lain</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-5">
                                    <small font-weight: 700;>Tanggal SHGB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</small>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" name="edit_tgl_shgb" value="" class="datepicker-here form-control form-control-sm" data-language="en" data-date-format="dd-mm-yyyy">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group" style="height:0px;">
                                <button type="submit" class="btn btn-primary btn-sm submit" style="float: right;">Simpan</button>
                                <a href="javascript:void(0)" data-dismiss="modal" class="btn btn-danger btn-sm" style="float: right; margin-right: 4px">Batal</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div class="modal fade rotate" id="modal_note_cancel">
            <div class="modal-dialog">
                <form id="form_note_cancel">
                    <input type="hidden" id="id_trans_so_note_cancel" name="id_trans_so_note_cancel">
                    <div class="modal-content sm">
                        <div class="modal-header">
                            <h4 for="exampleInputFile">Note Cancel</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: #ff0c17">×</button>
                        </div>
                        <div class="container"></div>
                        <div class="modal-body">
                            <div class="form-group">
                                <div class="input-group">
                                    <textarea type="text" id="notes_cancel" name="notes_cancel" class="form-control" style="height: 188px"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn btn-danger close_deb">Close</a>
                            <button type="button" id="simpan_cancel" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal fade in" id="modal_load_data" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content" id="load_data">
                    <div width='100%' class='text-center'>
                        <i class='fa fa-spinner fa-spin fa-4x text-danger'></i><br><br>
                        <a id='batal' href='javascript:void(0)' class='text-primary batal' data-dismiss='modal'>Batal</a>
                    </div>
                </div>
            </div>
        </div>
        <script src="<?php echo base_url('assets/dist/js/datepicker.en.js') ?>"></script>



	<?php
        echo $ctrlbar;
        echo $footer;
        
    ?>
    <script type="text/javascript">
            function hide_lampiran() {
                $('#lamp_data_nasabah').hide();
                $('#lamp_data_jaminan').hide();
            }
            hide_lampiran();

            //GET LAMPIRAN SETELAH EDIT
            get_lampiran_debitur = function(opts, id) {
                var url = '<?php echo config_item('api_url') ?>api/master/lpdk/' + id;
                var data = opts;

                return $.ajax({
                    url: url,
                    data: data,
                    dataSrc: "",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
            }

            //GET DETAIL PRODUK ALL
            get_produk = function(opts) {
                var url = '<?php echo $this->config->item('api_url'); ?>produk';
                return $.ajax({
                    type: 'GET',
                    url: url
                });
            }

            //GET DETAIL PENJAMIN
            get_detail_penjamin = function(opts, id) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/detailPenj/' + id;
                var data = opts;
                return $.ajax({
                    url: url,
                    data: data,
                    dataSrc: "",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
            }

            //GET DETAIL JAMINAN SERTIFIKAT
            get_detail_jaminan = function(opts, id) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/detailSert/' + id;
                var data = opts;
                return $.ajax({
                    url: url,
                    data: data,
                    dataSrc: "",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
            }

            //GET LPDK STATUS ALL
            get_lpdk = function(opts) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/statusAll';
                if (opts != undefined) {
                    var data = opts;
                }
                return $.ajax({
                    type: 'GET',
                    url: url,
                    data: data,
                    dataSrc: "",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
            }

            //GET DETAIL LPDK
            get_detail_lpdk = function(opts, id) {
                var url = '<?php echo config_item('api_url') ?>api/master/lpdk/detail/' + id;
                var data = opts;
                return $.ajax({
                    url: url,
                    data: data,
                    dataSrc: "",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
            }

            //GET DATA PENGAJUAN
            get_pengajuan = function(opts, id) {
                var url = '<?php echo config_item('api_url') ?>api/master/lpdk/';
                if (id != undefined) {
                    url += id;
                }

                if (opts != undefined) {
                    var data = opts;
                }

                return $.ajax({
                    url: url,
                    data: data,
                    dataSrc: "",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
            }

            //TAMBAH PENGAJUAN LPDK
            tambah_pengajuan_lpdk = function(opts, id) {
                var url = '<?php echo $this->config->item('api_url'); ?>/api/master/lpdk/' + id;
                var data = opts;
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
                });
            }

            //UPLOAD LAMPIRAN
            tambah_lampiran = function(opts, id) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/edit/lampiran/' + id;
                var data = opts;
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
                });
            }

            //UPDATE LAMPIRAN DEBITUR
            update_debitur_lamp = function(opts, id) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/debitur/' + id;
                var data = opts;
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
                });
            }

            //UPDATE PENJAMIN
            update_penjamin = function(opts, id, id_penjamin) {
                var data = opts;
                var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/edit/' + id + '/penjamin/' + id_penjamin
                id_penjamin;
                return $.ajax({
                    url: url,
                    data: data,
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    cache: false,
                    beforeSend: function() {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-spinner fa-spin fa-4x text-danger'></i><br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Batal</a>" +
                            "</div>";

                        $('#load_data').html(html);
                        $('#modal_load_data').modal('show');
                    },
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
            }

            //UPDATE LAMPIRAN PASANGAN
            update_lampiran_pasangan = function(opts, id) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/pasangan/' + id;
                var data = opts;
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
                });
            }

            //UPDATE DATA SERTIFIKAT
            ubah_sertifikat = function(opts, id, id_so) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/edit/' + id_so + '/sertifikat/' + id;
                var data = opts;
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
                });
            }

            //UPDATE PENGAJUAN LPDK
            update_lpdk = function(opts, id) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/update/' + id;
                var data = opts;
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
                });
            }

            //UPDATE STATUS
            update_status = function(opts, id) {
                var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/editLPDK/' + id;
                var data = opts;
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
                });
            }

            //FUNGSI RUBAH ANGKA
            function rubah(angka) {
            if (angka === null) {
                console.log(angka);
            }else {
                var reverse = angka.toString().split('').reverse().join(''),
                    ribuan = reverse.match(/\d{1,3}/g);
                ribuan = ribuan.join('.').split('').reverse().join('');
                return ribuan;
            }
            }

            //FUNGSI DATA APPROVAL
            load_data_pengajuan = function() {
                get_pengajuan()
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
                            $('#data_pengajuan').html(tr);
                            $("#modal_data_pengajuan").modal('show');

                            return;
                        }
                        $.each(data, function(index, item) {
                            no++;
                            var plafon = (rubah(item.plafon));
                            var tr = [
                                '<tr>',
                                '<td>' + no + '</td>',
                                '<td>' + item.nomor_so + '</td>',
                                '<td>' + item.nama_so + '</td>',
                                '<td>' + item.nama_cabang + '</td>',
                                '<td>' + item.nama_debitur + '</td>',
                                '<td>' + plafon + '</td>',
                                '<td>' + item.tenor + '</td>',
                                '<td style="width: 60px;">',
                                '<button type="button" title="Tambah Pengajuan" class="btn btn-info btn-sm edit"  data-target="#update" data="' + item.id_trans_so + '"><i class="fas fa-plus-circle"></i></button>',
                                '</td>',
                                '</tr>'
                            ].join('\n');
                            html.push(tr);
                        });

                        $('#data_pengajuan').html(html);
                        $('#example2').DataTable({
                            'destroy': true,
                            'paging': true,
                            'lengthChange': true,
                            'searching': true,
                            'ordering': true,
                            'info': true,
                            'autoWidth': true
                        });
                        $("#modal_data_pengajuan").modal('show');
                        $('#batal').click();

                        var detailRows = [];

                        $('#data_pengajuan').on('click', 'td.details-control', function() {
                            var tr = $(this).closest('tr');
                            var row = table.row(tr);

                            if (row.child.isShown()) {

                                row.child.hide();
                                tr.removeClass('shown');
                            } else {

                                row.child(format(row.data())).show();
                                tr.addClass('shown');
                            }
                        });

                        $('#data_pengajuan').on('click', 'tr', function() {
                            if ($(this).hasClass('selected')) {
                                $(this).removeClass('selected');
                            } else {
                                table.$('tr.selected').removeClass('selected');
                                $(this).addClass('selected');
                            }
                        });

                        function format(d) {
                            return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
                                '<tr>' +
                                '<td>Notes Progress:</td>' +
                                '<td>fefe</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td>Notes DAS:</td>' +
                                '<td>frgeg</td>' +
                                '</tr>' +
                                '</table>';
                        }
                    })
                    .fail(function(response) {
                        $('#data_pengajuan').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            //FUNGSI DATA PENGAJUAN LPDK
            load_data_lpdk = function() {
                get_lpdk()
                    .done(function(response) {
                        var data = response.data;
                        var data_detail = response;
                        var html = [];
                        var no = 0;
                        if (data.length === 0) {
                            var tr = [
                                '<tr valign="midle">',
                                '<td colspan="4">No Data</td>',
                                '</tr>'
                            ].join('\n');
                            $('#data_pengajuan_lpdk').html(tr);
                            return;
                        }
                        console.log(data);

                        function format(data) {
                            console.log(data)
                            var lamp_jaminan = "";
                            var x = "";
                            var imb = "";
                            var pbb = "";
                            var ahli_waris = "";
                            var ajb_ppjb = "";
                            var akta_hibah = "";
                            var b = "";
                            $.each(data.sertifikat, function(index, item) {
                                var lampiran_sertifikat1 = item.lampiran_sertifikat;
                                if (lampiran_sertifikat1 == '') {
                                    // var lamp_sertifikat = "hidden";
                                    var lampiran_sertifikat = "";
                                } else
                                if (lampiran_sertifikat1 == null) {
                                    // var lamp_ktp_deb = "hidden";
                                    var lampiran_sertifikat = "";
                                } else {
                                    // var lamp_ktp_deb = "";
                                    var lampiran_sertifikat = lampiran_sertifikat1.substr(57);
                                }

                                var imb_sertifikat = item.lampiran_imb;
                                if (imb_sertifikat == '') {
                                    // var lamp_sertifikat = "hidden";
                                    var lampiran_imb_sertifikat = "";
                                } else
                                if (imb_sertifikat == null) {
                                    // var lamp_ktp_deb = "hidden";
                                    var lampiran_imb_sertifikat = "";
                                } else {
                                    // var lamp_ktp_deb = "";
                                    var lampiran_imb_sertifikat = imb_sertifikat.substr(57);
                                }

                                var pbb_sertifikat = item.lampiran_pbb;
                                if (pbb_sertifikat == '') {
                                    // var lamp_sertifikat = "hidden";
                                    var lampiran_pbb_sertifikat = "";
                                } else
                                if (pbb_sertifikat == null) {
                                    // var lamp_ktp_deb = "hidden";
                                    var lampiran_pbb_sertifikat = "";
                                } else {
                                    // var lamp_ktp_deb = "";
                                    var lampiran_pbb_sertifikat = pbb_sertifikat.substr(57);
                                }

                                var ahli_waris_sertifikat = item.ahli_waris;
                                if (ahli_waris_sertifikat == '') {
                                    // var lamp_sertifikat = "hidden";
                                    var lampiran_ahli_waris_sertifikat = "";
                                } else
                                if (ahli_waris_sertifikat == null) {
                                    // var lamp_ktp_deb = "hidden";
                                    var lampiran_ahli_waris_sertifikat = "";
                                } else {
                                    // var lamp_ktp_deb = "";
                                    var lampiran_ahli_waris_sertifikat = ahli_waris_sertifikat.substr(57);
                                }

                                var ajb_sertifikat = item.ajb_ppjb;
                                if (ajb_sertifikat == '') {
                                    // var lamp_sertifikat = "hidden";
                                    var lampiran_ajb_sertifikat = "";
                                } else
                                if (ajb_sertifikat == null) {
                                    // var lamp_ktp_deb = "hidden";
                                    var lampiran_ajb_sertifikat = "";
                                } else {
                                    // var lamp_ktp_deb = "";
                                    var lampiran_ajb_sertifikat = ajb_sertifikat.substr(57);
                                }

                                var akta_hibah_sertifikat = item.akta_hibah;
                                if (akta_hibah_sertifikat == '') {
                                    // var lamp_sertifikat = "hidden";
                                    var lampiran_akta_hibah_sertifikat = "";
                                } else
                                if (akta_hibah_sertifikat == null) {
                                    // var lamp_ktp_deb = "hidden";
                                    var lampiran_akta_hibah_sertifikat = "";
                                } else {
                                    // var lamp_ktp_deb = "";
                                    var lampiran_akta_hibah_sertifikat = akta_hibah_sertifikat.substr(57);
                                }
                                b = '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_sertifikat + '"><p class="hide_ktp_deb" style="font-size: 13px; font-weight: 400;">' + lampiran_sertifikat + '</p></a><a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_imb + '"><p class="hide_ktp_deb" style="font-size: 13px; font-weight: 400;">' + lampiran_imb_sertifikat + '</p></a><a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_pbb + '"><p class="hide_ktp_deb" style="font-size: 13px; font-weight: 400;">' + lampiran_pbb_sertifikat + '</p></a><a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.ahli_waris + '"><p class="hide_ktp_deb" style="font-size: 13px; font-weight: 400;">' + lampiran_ahli_waris_sertifikat + '</p></a><a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.ajb_ppjb + '"><p class="hide_ktp_deb" style="font-size: 13px; font-weight: 400;">' + lampiran_ajb_sertifikat + '</p></a><a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.akta_hibah + '"><p class="hide_ktp_deb" style="font-size: 13px; font-weight: 400;">' + lampiran_akta_hibah_sertifikat + '</p></a>'
                            })

                            var lampiran_ktp_deb = data.lampiran_debitur.lampiran_ktp_deb;
                            if (lampiran_ktp_deb == '') {
                                var lamp_ktp_deb = "hidden";
                                var lamp_ktp_debitur = "";
                            } else
                            if (lampiran_ktp_deb == null) {
                                var lamp_ktp_deb = "hidden";
                                var lamp_ktp_debitur = "";
                            } else {
                                var lamp_ktp_deb = "";
                                var lamp_ktp_debitur = lampiran_ktp_deb.substr(32);
                            }

                            var lampiran_kk_deb = data.lampiran_debitur.lampiran_kk;
                            if (lampiran_kk_deb == '') {
                                var lamp_kk_deb = "hidden";
                                var lamp_kk_debitur = "";
                            } else
                            if (lampiran_kk_deb == null) {
                                var lamp_kk_deb = "hidden";
                                var lamp_kk_debitur = "";
                            } else {
                                var lamp_kk_deb = "";
                                var lamp_kk_debitur = lampiran_kk_deb.substr(32);
                            }

                            var lamp_ktp_pasangan1 = data.lampiran_pasangan.lampiran_ktp_pasangan;
                            if (lamp_ktp_pasangan1 == '') {
                                var lamp_ktp_pas = "hidden";
                                var lampiran_ktp_pasangan = "";
                            } else if (lamp_ktp_pasangan1 == null) {
                                var lamp_buku_nikah_pas = "hidden";
                                var lampiran_ktp_pasangan = "";
                            } else {
                                var lamp_ktp_pas = "";
                                var lampiran_ktp_pasangan = lamp_ktp_pasangan1.substr(33);
                            }
                            var lamp_buku_nikah_pasangan = data.lampiran_pasangan.lampiran_surat_nikah;
                            if (lamp_buku_nikah_pasangan == '') {
                                var lamp_buku_nikah_pas = "hidden";
                                var lamp_buku_nikah_pasangan = "";
                            } else if (lamp_buku_nikah_pasangan == null) {
                                var lamp_buku_nikah_pas = "hidden";
                                var lamp_buku_nikah_pasangan = "";
                            } else {
                                var lamp_buku_nikah_pas = "";
                                var lamp_buku_nikah_pasangan = lamp_buku_nikah_pasangan.substr(33);
                            }

                            var lampiran_surat_cerai = data.lampiran[0].lampiran_surat_cerai;
                            if (lampiran_surat_cerai == '') {
                                var lamp_surat_cerai = "hidden";
                                var lampiran_surat_cerai = "";
                            } else
                            if (lampiran_surat_cerai == null) {
                                var lamp_surat_cerai = "hidden";
                                var lampiran_surat_cerai = "";
                            } else {
                                var lamp_surat_cerai = "";
                                var lampiran_surat_cerai = lampiran_surat_cerai.substr(46);
                            }

                            var lampiran_npwp1 = data.lampiran[0].lampiran_npwp;
                            if (lampiran_npwp1 == '') {
                                var lamp_npwp = "hidden";
                                var lampiran_npwp = "";
                            } else
                            if (lampiran_npwp1 == null) {
                                var lamp_npwp = "hidden";
                                var lampiran_npwp = "";
                            } else {
                                var lamp_npwp = "";
                                var lampiran_npwp = lampiran_npwp1.substr(46);
                            }

                            var lampiran_surat_kematian1 = data.lampiran[0].lampiran_surat_kematian;
                            if (lampiran_surat_kematian1 == '') {
                                var lamp_surat_kematian = "hidden";
                                var lampiran_surat_kematian = "";
                            } else
                            if (lampiran_surat_kematian1 == null) {
                                var lamp_surat_kematian = "hidden";
                                var lampiran_surat_kematian = "";
                            } else {
                                var lamp_surat_kematian = "";
                                var lampiran_surat_kematian = lampiran_surat_kematian1.substr(46);
                            }

                            var lampiran_surat_lahir1 = data.lampiran[0].lampiran_surat_lahir;
                            if (lampiran_surat_lahir1 == '') {
                                var lamp_surat_lahir = "hidden";
                                var lampiran_surat_lahir = "";
                            } else
                            if (lampiran_surat_lahir1 == null) {
                                var lamp_surat_lahir = "hidden";
                                var lampiran_surat_lahir = "";
                            } else {
                                var lamp_surat_lahir = "";
                                var lampiran_surat_lahir = lampiran_surat_lahir1.substr(46);
                            }

                            var lampiran_surat_ket_desa1 = data.lampiran[0].lampiran_sk_desa;
                            if (lampiran_surat_ket_desa1 == '') {
                                var lamp_surat_ket_desa = "hidden";
                                var lampiran_surat_ket_desa = "";
                            } else
                            if (lampiran_surat_ket_desa1 == null) {
                                var lamp_surat_ket_desa = "hidden";
                                var lampiran_surat_ket_desa = "";
                            } else {
                                var lamp_surat_ket_desa = "";
                                var lampiran_surat_ket_desa = lampiran_surat_ket_desa1.substr(46);
                            }

                            var notes_counter0 = data.notes_counter[0];
                            if (notes_counter0 == '') {
                                var notes_counter_hide0 = "hidden";
                            } else
                            if (notes_counter0 == null) {
                                var notes_counter_hide0 = "hidden";
                            } else {
                                var notes_counter_hide0 = "";
                            }

                            var notes_progress0 = data.notes_progress[0];
                            if (notes_progress0 == '') {
                                var notes_progress_hide0 = "hidden";
                            } else
                            if (notes_progress0 == null) {
                                var notes_progress_hide0 = "hidden";
                            } else {
                                var notes_progress_hide0 = "";
                            }

                            var notes_counter1 = data.notes_counter[1];
                            if (notes_counter1 == '') {
                                var notes_counter_hide1 = "hidden";
                            } else
                            if (notes_counter1 == null) {
                                var notes_counter_hide1 = "hidden";
                            } else {
                                var notes_counter_hide1 = "";
                            }

                            var notes_progress1 = data.notes_progress[1];
                            if (notes_progress1 == '') {
                                var notes_progress_hide1 = "hidden";
                            } else
                            if (notes_progress1 == null) {
                                var notes_progress_hide1 = "hidden";
                            } else {
                                var notes_progress_hide1 = "";
                            }

                            var notes_counter2 = data.notes_counter[2];
                            if (notes_counter2 == '') {
                                var notes_counter_hide2 = "hidden";
                            } else
                            if (notes_counter2 == null) {
                                var notes_counter_hide2 = "hidden";
                            } else {
                                var notes_counter_hide2 = "";
                            }

                            var notes_progress2 = data.notes_progress[2];
                            if (notes_progress2 == '') {
                                var notes_progress_hide2 = "hidden";
                            } else
                            if (notes_progress2 == null) {
                                var notes_progress_hide2 = "hidden";
                            } else {
                                var notes_progress_hide2 = "";
                            }

                            var notes_cancel = data.notes_cancel;
                            if (notes_cancel == '') {
                                var notes_cancel_hide = "hidden";
                            } else
                            if (notes_cancel == null) {
                                var notes_cancel_hide = "hidden";
                            } else {
                                var notes_cancel_hide = "";
                            }

                            console.log(data.notes_progress[2])

                            return '<table cellpadding="5" class="table table-bordered table-hover table-sm" cellspacing="0" border="0" style="padding-left:50px;">' +
                                '<tr class="table-sm" style="font-size:12px">' +
                                '<th>Lampiran Data Nasabah</th>' +
                                '<th>Lampiran Data Jaminan</th>' +
                                '<th>Tanggal Revisi LPDK</th>' +
                                '<th>LPDK Checking by</th>' +
                                '<th>Notes/Keterangan SLA</th>' +
                                '</tr>' +
                                '<tr style="font-size:12px">' +
                                '<td width="100px"><a id="lampiran_ktp_deb_detail" ' + lamp_ktp_deb + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_debitur.lampiran_ktp_deb + '"><p class="hide_ktp_deb" style="font-size: 13px; font-weight: 400;">' + lamp_ktp_debitur + '</p></a><a id="lampiran_kk_deb_detail" ' + lamp_kk_deb + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_debitur.lampiran_kk + '"><p style="font-size: 13px; font-weight: 400;">' + lamp_kk_debitur + '</p></a><a id="lampiran_ktp_pas_detail" ' + lamp_ktp_pas + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_pasangan.lampiran_ktp_pasangan + '"><p style="font-size: 13px; font-weight: 400;">' + lampiran_ktp_pasangan + '</p></a><a id="lampiran_npwp_deb_detail" ' + lamp_npwp + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_npwp + '"><p style="font-size: 13px; font-weight: 400;">' + lampiran_npwp + '</p></a><a id="lampiran_surat_nikah_deb_detail" ' + lamp_buku_nikah_pas + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_pasangan.lampiran_surat_nikah + '"><p style="font-size: 13px; font-weight: 400;">' + lamp_buku_nikah_pasangan + '</p></a><a id="lampiran_surat_cerai_deb_detail" ' + lamp_surat_cerai + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_cerai + '"><p style="font-size: 13px; font-weight: 400;">' + lampiran_surat_cerai + '</p></a><a id="lampiran_surat_kematian_deb_detail" ' + lamp_surat_kematian + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_kematian + '"><p style="font-size: 13px; font-weight: 400;">' + lampiran_surat_kematian + '</p></a><a id="lampiran_surat_lahir_deb_detail" ' + lamp_surat_lahir + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_lahir + '"><p style="font-size: 13px; font-weight: 400;">' + lampiran_surat_lahir + '</p></a><a id="lampiran_surat_ket_desa_deb_detail" ' + lamp_surat_ket_desa + ' class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_sk_desa + '"><p style="font-size: 13px; font-weight: 400;">' + lampiran_surat_ket_desa + '</p></a></td>' +
                                '<td  width="100px">' + b + '</td>' +
                                '<td>' + data.updated_at + '</td>' +
                                '<td>' + data.request_by + '</td>' +
                                '<td> <p ' + notes_progress_hide0 + ' >' + data.notes_progress[0] + '</p> <br><p ' + notes_counter_hide0 + ' >' + data.notes_counter[0] + '</p><br> <p ' + notes_progress_hide1 + ' >' + data.notes_progress[1] + '</p> <br><p ' + notes_counter_hide1 + ' >' + data.notes_counter[1] + '</p><br> <p ' + notes_progress_hide2 + ' >' + data.notes_progress[2] + '</p> <br><p ' + notes_counter_hide2 + ' >' + data.notes_counter[2] + '</p><br><b ' + notes_cancel_hide + '> Note Cancel:</b><br><b ' + notes_cancel_hide + ' > ' + data.notes_cancel + ' </br></td > ' +
                                '</tr>' +
                                '</table>'
                        }

                        $.each(data, function(index, item) {
                            var status = item.status_kredit;
                            if (status == 'RETURN') {
                                var disabled = "";
                            } else {
                                var disabled = "disabled";
                            }


                            if (status == 'REALISASI') {
                                var disabled_edit = "disabled";
                            } else {
                                var disabled_edit = "";
                            }


                            var plafon = (rubah(item.plafon));
                            var tr = [
                                '<tr>',
                                '<td title="Detail" class="details-control" data="' + item.trans_so + '"></td>',
                                '<td>' + item.status_kredit + '</td>',
                                '<td>' + item.created_at + '</td>',
                                '<td>' + item.nomor_so + '</td>',
                                '<td>' + item.nama_so + '</td>',
                                '<td>' + item.request_by + '</td>',
                                '<td>' + item.nama_cabang[0] + '</td>',
                                '<td>' + item.nama_debitur + '</td>',
                                '<td>' + plafon + '</td>',
                                '<td>' + item.tenor + '</td>',
                                '<td>' + item.sla + '</td>',
                                '<td style="width: 120px;">',
                                '<form method="post" target="_blank" action="<?php echo base_url() . 'index.php/report/Pengajuan_lpdk' ?>"> <button type="button" class="btn btn-info btn-sm edit" title="Ubah Pengajuan" ' + disabled_edit + '  data-target="#update" data="' + item.trans_so + '"><i class="fas fa-pencil-alt"></i></button>',
                                '<button type="button" class="btn btn-warning btn-sm edit" title="Detail Pengajuan" onclick="click_detail()" data-target="#update" data="' + item.trans_so + '"><i style="color: #fff;" class="fas fa-eye"></i></button>',
                                '<button type="button"  ' + disabled + ' class="btn btn-warning btn-sm note" title="Note Pengajuan" style="background-color: #6610f2; border-color: #6f42c1;" data="' + item.trans_so + '"><i style="color: #fff;" class="fas fa-sticky-note"></i></button>',
                                '<button type="button" ' + disabled_edit + ' class="btn btn-default bg-gradient-danger btn-sm cancel"  title="Cancel Pengajuan"  data="' + item.trans_so + '"><i style="color: #fff;" class="fas fa-window-close"></i></button>',
                                '<input type="hidden" name ="id" value="' + item.trans_so + '"><button type="submit" class="btn btn-success btn-sm" title="Cetak Pengajuan"><i class="far fa-file-pdf"></i></button></form>',
                                '</td>',
                                '</tr>'
                            ].join('\n');
                            html.push(tr);
                        });
                        $('#data_pengajuan_lpdk').html(html);

                        var table = $('#table_pengajuan_lpdk').DataTable({
                            "pageLength": 10,
                            "order": [
                                [0, "asc"]
                            ],
                            'destroy': true,
                            'paging': true,
                            'lengthChange': true,
                            'searching': true,
                            'ordering': true,
                            'info': true,
                            'autoWidth': true
                        });

                        $('#table_pengajuan_lpdk tbody').on('click', 'td.details-control', function() {
                            var tr = $(this).closest('tr');
                            var row = table.row(tr);
                            var id = $(this).attr('data');
                            get_detail_lpdk({}, id)
                                .done(function(response) {
                                    var data = response.data[0];
                                    console.log(data);
                                    if (row.child.isShown()) {
                                        row.child.hide();
                                        tr.removeClass('shown');
                                    } else {
                                        row.child(format(data)).show();
                                        tr.addClass('shown');
                                    }
                                })

                        });
                    })
                    .fail(function(response) {
                        $('#data_pengajuan_lpdk').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }
            load_data_lpdk();

            //KLIK NOTE DATA PENGAJUAN LPDK
            $('#data_pengajuan_lpdk').on('click', '.note', function(e) {
                var id = $(this).attr('data');
                $('#form_note input[name=id_trans_so_note]').val(id);

                $("#modal_note").modal('show');
            });

            //KLIK EDIT DATA PENJAMIN
            $('#data_penjamin').on('click', '.edit', function(e) {
                var id = $(this).attr('data');
                $("#modal_input_penjamin").modal('show');
                get_detail_penjamin({}, id)
                    .done(function(response) {
                        var data = response.data;
                        console.log(data);
                        $('#form_penjamin input[name=id_penjamin]').val(data.id);
                        $('#form_penjamin input[name=edit_nama_penjamin]').val(data.nama_penjamin);
                        $('#form_penjamin input[name=edit_nama_pas_penjamin]').val(data.pasangan_penjamin);
                    });
            });

            //KLIK EDIT DATA JAMINAN SERTIFIKAT
            $('#data_jaminan_sertifikat').on('click', '.edit', function(e) {
                var id = $(this).attr('data');
                $("#modal_input_jaminan").modal('show');
                get_detail_jaminan({}, id)
                    .done(function(response) {
                        var data = response.data;
                        console.log(data);
                        $('#form_jaminan input[name=id_jaminan]').val(data.id);
                        if (data.jenis_sertifikat == "SHGB") {
                            document.getElementById("edit_shgb").selected = "true";
                        } else if (data.jenis_sertifikat == "SHM") {
                            document.getElementById("edit_shm").selected = "true";
                        } else {
                            document.getElementById("edit_pilih_jaminan").selected = "true";
                        }
                        $('#form_jaminan input[name=edit_no_sertifikat]').val(data.no_sertifikat);
                        $('#form_jaminan input[name=edit_nama_pemilik_sertifikat]').val(data.nama_sertifikat);
                        $('#form_jaminan input[name=edit_nama_pas_pemilik_sertifikat]').val(data.nama_pas_sertifikat);

                        if (data.hub_cadeb == "Pasangan") {
                            document.getElementById("edit_hub_pas").selected = "true";
                        } else if (data.hub_cadeb == "Ibu") {
                            document.getElementById("edit_hub_ibu").selected = "true";
                        } else if (data.hub_cadeb == "Bapak") {
                            document.getElementById("edit_hub_bapak").selected = "true";
                        } else if (data.hub_cadeb == "Anak") {
                            document.getElementById("edit_hub_anak").selected = "true";
                        } else if (data.hub_cadeb == "Saudara Kandung") {
                            document.getElementById("edit_hub_saudara_kandung").selected = "true";
                        } else if (data.hub_cadeb == "Orang Lain") {
                            document.getElementById("edit_hub_orang_lain").selected = "true";
                        } else {
                            document.getElementById("edit_hub_pilih").selected = "true";
                        }

                        if (data.status_sertifikat == "Hidup") {
                            document.getElementById("status_pemilik_hidup").checked = "true";
                        } else {
                            document.getElementById("status_pemilik_meninggal").checked = "true";
                        }

                        if (data.status_pas_sertifikat == "Hidup") {
                            document.getElementById("status_pas_pemilik_hidup").checked = "true";
                        } else {
                            document.getElementById("status_pas_pemilik_meninggal").checked = "true";
                        }

                        $('#form_jaminan input[name=edit_tgl_shgb]').val(data.tgl_berlaku_shgb);

                    });
            });

            //KLIK TAMBAH PENGAJUAN
            $("#modal_pengajuan").click(function() {
                load_data_pengajuan();
            })

            //KLIK EDIT DATA APPROVAL
            $('#data_pengajuan').on('click', '.edit', function(e) {
                e.preventDefault();
                $("#modal_tambah_pengajuan_lpdk").modal('show');
                var id = $(this).attr('data');
                $('#simpan_pengajuan').prop('disabled', false);
                get_pengajuan({}, id)
                    .done(function(response) {
                        var data = response.data[0];
                        var html = [];
                        var html1 = [];
                        var html2 = [];
                        var html3 = [];
                        var html4 = [];
                        var html5 = [];
                        var html6 = [];
                        var html7 = [];
                        var html8 = [];
                        var html9 = [];
                        var html10 = [];
                        var html11 = [];
                        var html12 = [];
                        var html13 = [];
                        var html14 = [];
                        var html15 = [];
                        var shm_p = 0;
                        var shgb_p = 20;
                        $('#form_pengajuan')[0].reset();
                        $('#aksi_penjamin').hide();
                        $('#aksi_jaminan').hide();
                        $('#form_pengajuan input[name=id_trans_so]').val(data.id_trans_so);
                        $('#form_tambah_ktp_deb input[name=id_debitur_ktp]').val(data.id_debitur);
                        $('#form_tambah_ktp_pas input[name=id_debitur_ktp_pas]').val(data.id_pasangan);
                        $('#form_tambah_ktp_pen input[name=id_debitur_ktp_pen]').val(data.id_trans_so);
                        $('#form_tambah_buku_nikah_pen input[name=id_debitur_buku_nikah_pen]').val(data.id_trans_so);
                        $('#form_tambah_ktp_pem_sertifikat input[name=id_debitur_ktp_pem_sertifikat]').val(data.id_trans_so);
                        $('#form_tambah_ktp_pas_pem_sertifikat input[name=id_debitur_ktp_pas_pem_sertifikat]').val(data.id_trans_so);
                        $('#form_tambah_kk input[name=id_debitur_kk]').val(data.id_debitur);
                        $('#form_tambah_npwp input[name=id_debitur_npwp]').val(data.id_trans_so);
                        $('#form_tambah_surat_nikah input[name=id_debitur_nikah]').val(data.id_pasangan);
                        $('#form_tambah_surat_cerai input[name=id_debitur_cerai]').val(data.id_trans_so);
                        $('#form_tambah_surat_lahir input[name=id_debitur_lahir]').val(data.id_trans_so);
                        $('#form_tambah_surat_kematian input[name=id_debitur_kematian]').val(data.id_trans_so);
                        $('#form_tambah_surat_ket_desa input[name=id_debitur_ket_desa]').val(data.id_trans_so);
                        $('#form_tambah_sertifikat input[name=id_debitur_sertifikat]').val(data.id_trans_so);
                        $('#form_tambah_pbb input[name=id_debitur_pbb]').val(data.id_trans_so);
                        $('#form_tambah_imb input[name=id_debitur_imb]').val(data.id_trans_so);
                        $('#form_tambah_ajb input[name=id_debitur_ajb]').val(data.id_trans_so);
                        $('#form_tambah_ahli_waris input[name=id_debitur_ahli_waris]').val(data.id_trans_so);
                        $('#form_tambah_akta_hibah input[name=id_debitur_akta_hibah]').val(data.id_trans_so);
                        $('#form_pengajuan input[name=area_kerja_p]').val(data.area_kerja);
                        $('#form_pengajuan input[name=nama_so_p]').val(data.nama_so);
                        $('#form_pengajuan input[name=asal_data_p]').val(data.asal_data);
                        $('#form_pengajuan input[name=nama_mb_p]').val(data.nama_marketing);
                        var plafon = (rubah(data.plafon));
                        $('#form_pengajuan input[name=plafon_p]').val(plafon);
                        $('#form_pengajuan input[name=tenor_p]').val(data.tenor);
                        $('#form_pengajuan input[name=nama_cadeb_p]').val(data.nama_debitur);
                        if (data.status_nikah == "Menikah") {
                            document.getElementById("menikah_p").selected = "true";
                        } else
                        if (data.status_nikah == "Single") {
                            document.getElementById("single_p").selected = "true";
                        } else
                        if (data.status_nikah == "Janda/Duda") {
                            document.getElementById("janda_duda_p").selected = "true";
                        }

                        var htmljaminansertifikat = [];
                        var np = 0;
                        var na = 0;
                        var nc = 0;
                        var nh = 0;
                        $.each(data.sertifikat, function(index, item) {
                            var shm_p = 'shm_p' + np++;
                            var shgb_p = 'shgb_p' + na++;
                            var datepicker = 'datepicker' + nc++;
                            // var status_hidup = 'status_hidup'+ nh++;
                            var tgl_berlaku_shgb = "";
                            if (item.tgl_berlaku_shgb == null) {
                                tgl_berlaku_shgb = '';
                            } else {
                                tgl_berlaku_shgb = item.tgl_berlaku_shgb;
                            }


                            var tr = [
                                '<tr>',
                                '<td style="width:100px"><select name="jenis_sertifikat[]" class="form-control select2 select2-danger" style="width: 100%;"><option id="pilih_jaminan" value="' + item.jenis_sertifikat + '">' + item.jenis_sertifikat + '</option><option id="' + shm_p + '" value="SHM_p">SHM</option><option id="' + shgb_p + '" value="SHGB_p">SHGB</option></select></td>',
                                '<td style="width:200px"><input class="form-control" value="' + item.no_sertifikat + '" name="no_sertifikat[]"></td>',
                                '<td style="width:200px"><input class="form-control " value="' + item.nama_pemilik_sertifikat + '" name="nama_sertifikat[]" onkeyup="this.value = this.value.toUpperCase()"><div style="margin-top:6px"><input type="checkbox" value="Hidup" name="status_hidup[]"> <small>Hidup</small><input type="checkbox" value="Meninggal Dunia" style="margin-left:22px;" name="status_hidup[]"> <small>Meninggal Dunia</small></div></td>',
                                '<td style="width:200px"><input class="form-control " value="" name="nama_pas_sertifikat[]" onkeyup="this.value = this.value.toUpperCase()"><div style="margin-top:6px"><input type="checkbox" value="Hidup" name="status_hidup_pas[]"> <small>Hidup</small><input type="checkbox" value="Meninggal Dunia" style="margin-left:22px;" name="status_hidup_pas[]"> <small>Meninggal Dunia</small></div></td>',
                                '<td style="width:195px"><div class="form-group"><select name="hub_cadeb[]" class="form-control select2 select2-danger" style="width: 100%;"><option value="">--Pilih--</option><option value="Pasangan">Pasangan</option><option value="Ibu">Ibu</option><option value="Bapak">Bapak</option><option value="Anak">Anak</option><option value="Saudara Kandung">Saudara Kandung</option><option value="Orang Lain">Orang Lain</option></select></td>',
                                '<td style="width:130px"><input type="text" name="tgl_berlaku_shgb[]" class="form-control" id="' + datepicker + '" value="' + tgl_berlaku_shgb + '" data-date-format="dd-mm-yyyy"/></td>',
                                '</tr>'
                            ].join('\n');
                            htmljaminansertifikat.push(tr);
                            $(function() {
                                $("#datepicker0").datepicker();
                                $("#datepicker1").datepicker();
                                $("#datepicker2").datepicker();
                                $("#datepicker3").datepicker();
                                $("#datepicker4").datepicker();
                                $("#datepicker5").datepicker();
                            });
                        })
                        $('#data_jaminan_sertifikat').html(htmljaminansertifikat);

                        $('#form_pengajuan input[name=nama_pasangan_p]').val(data.nama_pasangan);
                        $('#form_pengajuan input[name=nama_produk_kredit_p]').val(data.produk);

                        if (data.lampiran_ktp_deb == null) {
                            var a = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html.push(a);
                            $('#file_ktp').html(html);
                        } else {
                            var a = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_ktp_deb + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_ktp_deb.substr(32) + '</p></a>'
                            ].join('\n');
                            html.push(a);
                            $('#file_ktp').html(html);
                        }

                        if (data.lampiran_ktp_pasangan == null) {
                            var b = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html1.push(b);
                            $('#file_ktp_pas').html(html1);
                        } else {
                            var b = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_ktp_pasangan + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_ktp_pasangan.substr(33) + '</p></a>'
                            ].join('\n');
                            html1.push(b);
                            $('#file_ktp_pas').html(html1);
                        }

                        urut_penjamin = 0;
                        $.each(data.penjamin, function(index, item) {
                            urut_penjamin++;
                            if (item.lamp_ktp == null) {
                                var c = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_penjamin + '. Data tidak ada</p>'
                                ].join('\n');
                                html3.push(c);
                                $('#file_ktp_pen').html(html3);
                            } else {
                                var c = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.lamp_ktp + '"><p style="font-size: 13px; font-weight: 400;">' + urut_penjamin + '. ' + item.lamp_ktp.substr(37) + '</p></a>',
                                ].join('\n');
                                html3.push(c);
                                $('#file_ktp_pen').html(html3);
                            }
                        })

                        if (data.lampiran_kk == null) {
                            var d = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html4.push(d);
                            $('#file_kk').html(html4);
                        } else {
                            var d = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_kk + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_kk.substr(32) + '</p></a>'
                            ].join('\n');
                            html4.push(d);
                            $('#file_kk').html(html4);
                        }

                        if (data.lamp_buku_nikah == null) {
                            var e = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html5.push(e);
                            $('#file_surat_nikah').html(html5);
                        } else {
                            var e = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lamp_buku_nikah + '"><p style="font-size: 13px; font-weight: 400;">' + data.lamp_buku_nikah.substr(33) + '</p></a>'
                            ].join('\n');
                            html5.push(e);
                            $('#file_surat_nikah').html(html5);
                        }

                        if (data.lampiran_npwp == null) {
                            var h = [
                                '<p style="font-size: 13px; font-weight: 400;">1. Data tidak ada</p>'
                            ].join('\n');
                            html8.push(h);
                            $('#file_npwp').html(html8);
                        } else {
                            var h = [
                                '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_npwp + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_npwp.substr(46) + '</p></a>',
                            ].join('\n');
                            html8.push(h);
                            $('#file_npwp').html(html8);
                        }

                        if (data.lampiran_surat_cerai == null) {
                            var i = [
                                '<p style="font-size: 13px; font-weight: 400;">1. Data tidak ada</p>'
                            ].join('\n');
                            html9.push(i);
                            $('#file_surat_cerai').html(html9);
                        } else {
                            var i = [
                                '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_surat_cerai + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_surat_cerai.substr(46) + '</p></a>',
                            ].join('\n');
                            html9.push(i);
                            $('#file_surat_cerai').html(html9);
                        }

                        if (data.lampiran_surat_lahir == null) {
                            var j = [
                                '<p style="font-size: 13px; font-weight: 400;">1. Data tidak ada</p>'
                            ].join('\n');
                            html10.push(j);
                            $('#file_surat_lahir').html(html10);
                        } else {
                            var j = [
                                '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_surat_lahir + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_surat_lahir.substr(46) + '</p></a>',
                            ].join('\n');
                            html10.push(j);
                            $('#file_surat_lahir').html(html10);
                        }

                        if (data.lampiran_surat_kematian == null) {
                            var k = [
                                '<p style="font-size: 13px; font-weight: 400;">1. Data tidak ada</p>'
                            ].join('\n');
                            html11.push(k);
                            $('#file_surat_kematian').html(html11);
                        } else {
                            var k = [
                                '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_surat_kematian + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_surat_kematian.substr(46) + '</p></a>',
                            ].join('\n');
                            html11.push(k);
                            $('#file_surat_kematian').html(html11);
                        }

                        if (data.lampiran_surat_keterangan_desa == null) {
                            var l = [
                                '<p style="font-size: 13px; font-weight: 400;">1. Data tidak ada</p>'
                            ].join('\n');
                            html12.push(l);
                            $('#file_surat_ket_desa').html(html12);
                        } else {
                            var l = [
                                '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_surat_keterangan_desa + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_surat_keterangan_desa.substr(46) + '</p></a>',
                            ].join('\n');
                            html12.push(l);
                            $('#file_surat_ket_desa').html(html12);
                        }

                        var m = [
                            '<p style="font-size: 13px; font-weight: 400;">1. Data tidak ada</p>'
                        ].join('\n');
                        html13.push(m);
                        $('#file_ktp_pem_sertifikat').html(html13);

                        var n = [
                            '<p style="font-size: 13px; font-weight: 400;">1. Data tidak ada</p>'
                        ].join('\n');
                        html14.push(n);
                        $('#file_ktp_pas_pem_sertifikat').html(html14);

                        var o = [
                            '<p style="font-size: 13px; font-weight: 400;">1. Data tidak ada</p>'
                        ].join('\n');
                        html15.push(o);
                        $('#file_buku_nikah_pen').html(html15);

                        urut_imb = 0;
                        $.each(data.sertifikat, function(index, item) {
                            urut_imb++;
                            if (item.lamp_imb == null) {
                                var f = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_imb + '. Data tidak ada</p>'
                                ].join('\n');
                                html6.push(f);
                                $('#file_imb').html(html6);
                            } else {
                                var f = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.lamp_imb + '"><p style="font-size: 13px; font-weight: 400;">' + urut_imb + '. ' + item.lamp_imb.substr(57) + '</p></a>',
                                ].join('\n');
                                html6.push(f);
                                $('#file_imb').html(html6);
                            }
                        })

                        urut_pbb = 0;
                        $.each(data.sertifikat, function(index, item) {
                            urut_pbb++;
                            if (item.lamp_pbb == null) {
                                var g = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_pbb + '. Data tidak ada</p>'
                                ].join('\n');
                                html7.push(g);
                                $('#file_pbb').html(html7);
                            } else {
                                var g = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.lamp_pbb + '"><p style="font-size: 13px; font-weight: 400;">' + urut_pbb + '. ' + item.lamp_pbb.substr(57) + '</p></a>',
                                ].join('\n');
                                html7.push(g);
                                $('#file_pbb').html(html7);
                            }
                        })

                        var htmlpenjamin = [];
                        var id_penjamin = {};
                        $.each(data.penjamin, function(index, item) {
                            var id_penjamin = [];
                            id_penjamin = item.id;
                            var jenis_kelamin_pen = "";

                            if (item.jenis_kelamin == 'L') {
                                jenis_kelamin_pen = 'LAKI-LAKI';
                            } else {
                                jenis_kelamin_pen = 'PEREMPUAN';
                            }

                            var tr = [
                                '<tr>',
                                '<td style="width:200px"><input class="form-control sm" value="' + item.nama_ktp + '" name="nama_penjamin[]" onkeyup="this.value = this.value.toUpperCase()"></td>',
                                '<td style="width:200px"><input class="form-control sm" value="" name="pasangan_penjamin[]" onkeyup="this.value = this.value.toUpperCase()"></td>',
                            ].join('\n');
                            htmlpenjamin.push(tr);
                        })
                        $('#data_penjamin').html(htmlpenjamin);

                        get_produk()
                            .done(function(res) {
                                var select = [];
                                $.each(res.data, function(i, e) {
                                    var option = [
                                        '<option id="' + e.nama_produk + 'a" value="' + e.nama_produk + '">' + e.nama_produk + '</option>'
                                    ].join('\n');
                                    select.push(option);
                                });
                                $('#form_pengajuan select[id=nama_produk_kredit_p]').html(select);
                                if (data.produk == '' + data.produk + '') {
                                    document.getElementById('' + data.produk + 'a').selected = "true";
                                }
                            })
                    })

                    .fail(function(jqXHR) {
                        bootbox.alert('Data tidak ditemukan');
                    });
            });

            // KLIK EDIT PENGAJUAN LPDK
            $('#data_pengajuan_lpdk').on('click', '.edit', function(e) {
                e.preventDefault();
                $("#modal_tambah_pengajuan_lpdk").modal('show');
                var id = $(this).attr('data');
                $('#simpan_pengajuan').prop('disabled', false);

                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];
                        console.log(data);
                        $('#lamp_data_nasabah').show();
                        $('#lamp_data_jaminan').show();
                        $('#form_pengajuan')[0].reset();
                        var html = [];
                        var html1 = [];
                        var html2 = [];
                        var html3 = [];
                        var html4 = [];
                        var html5 = [];
                        var html6 = [];
                        var html7 = [];
                        var html8 = [];
                        var html9 = [];
                        var html10 = [];
                        var html11 = [];
                        var html12 = [];
                        var html13 = [];
                        var html14 = [];
                        var html15 = [];
                        var html16 = [];
                        var html17 = [];
                        var html18 = [];
                        var html19 = [];

                        var shm_p = 0;
                        var shgb_p = 20;
                        $('#aksi_penjamin').show();
                        $('#aksi_jaminan').show();
                        $('#form_pengajuan input[name=id_trans_so]').val(data.trans_so);
                        $('#form_penjamin input[name=id_penjamin_so]').val(data.trans_so);
                        $('#form_jaminan input[name=id_jaminan_so]').val(data.trans_so);
                        $('#form_pengajuan input[name=status_edit]').val('edit');
                        $('#form_tambah_ktp_deb input[name=id_debitur_ktp]').val(data.id_debitur);
                        $('#form_tambah_ktp_pas input[name=id_debitur_ktp_pas]').val(data.id_pasangan);
                        $('#form_tambah_kk input[name=id_debitur_kk]').val(data.id_debitur);
                        $('#form_tambah_npwp input[name=id_debitur_npwp]').val(data.trans_so);
                        $('#form_tambah_surat_nikah input[name=id_debitur_nikah]').val(data.id_pasangan);
                        $('#form_tambah_surat_cerai input[name=id_debitur_cerai]').val(data.trans_so);
                        $('#form_tambah_surat_lahir input[name=id_debitur_lahir]').val(data.trans_so);
                        $('#form_tambah_surat_kematian input[name=id_debitur_kematian]').val(data.trans_so);
                        $('#form_tambah_surat_ket_desa input[name=id_debitur_ket_desa]').val(data.trans_so);
                        $('#form_tambah_ktp_pen input[name=id_debitur_ktp_pen]').val(data.trans_so);
                        $('#form_tambah_buku_nikah_pen input[name=id_debitur_buku_nikah_pen]').val(data.trans_so);
                        $('#form_tambah_ktp_pem_sertifikat input[name=id_debitur_ktp_pem_sertifikat]').val(data.trans_so);
                        $('#form_tambah_ktp_pas_pem_sertifikat input[name=id_debitur_ktp_pas_pem_sertifikat]').val(data.trans_so);
                        $('#form_tambah_sertifikat input[name=id_debitur_sertifikat]').val(data.trans_so);
                        $('#form_tambah_pbb input[name=id_debitur_pbb]').val(data.trans_so);
                        $('#form_tambah_imb input[name=id_debitur_imb]').val(data.trans_so);
                        $('#form_tambah_ajb input[name=id_debitur_ajb]').val(data.trans_so);
                        $('#form_tambah_ahli_waris input[name=id_debitur_ahli_waris]').val(data.trans_so);
                        $('#form_tambah_akta_hibah input[name=id_debitur_akta_hibah]').val(data.trans_so);

                        $('#form_pengajuan input[name=area_kerja_p]').val(data.area_kerja);
                        $('#form_pengajuan input[name=nama_so_p]').val(data.nama_so);
                        $('#form_pengajuan input[name=asal_data_p]').val(data.asal_data);
                        $('#form_pengajuan input[name=nama_mb_p]').val(data.nama_marketing);
                        var plafon = (rubah(data.plafon));
                        $('#form_pengajuan input[name=plafon_p]').val(plafon);
                        $('#form_pengajuan input[name=tenor_p]').val(data.tenor);
                        $('#form_pengajuan input[name=nama_cadeb_p]').val(data.nama_debitur);
                        $('#form_pengajuan input[name=nama_pasangan_p]').val(data.nama_pasangan);
                        $('#form_pengajuan textarea[name=notes_lain2]').val(data.lain_lain);
                        if (data.status_nikah == "Menikah") {
                            document.getElementById("menikah_p").selected = "true";
                        } else
                        if (data.status_nikah == "Single") {
                            document.getElementById("single_p").selected = "true";
                        } else
                        if (data.status_nikah == "Janda/Duda") {
                            document.getElementById("janda_duda_p").selected = "true";
                        }

                        if (data.alamat_ktp_vs_jaminan == "YA") {
                            document.getElementById("alamat_ktp_sama_jaminan").checked = "true";
                        } else
                        if (data.alamat_ktp_vs_jaminan == "TIDAK") {
                            document.getElementById("alamat_tidak_sama_jaminan").checked = "true";
                        }

                        var htmlpenjamin = [];
                        var id_penjamin = {};
                        $.each(data.penjamin, function(index, item) {

                            var id_penjamin = [];
                            id_penjamin = item.id;
                            var jenis_kelamin_pen = "";

                            if (item.jenis_kelamin == 'L') {
                                jenis_kelamin_pen = 'LAKI-LAKI';
                            } else {
                                jenis_kelamin_pen = 'PEREMPUAN';
                            }

                            var tr = [
                                '<tr>',
                                '<td style="width:50px"><button type="button" class="btn btn-info btn-sm edit submit" data-toggle="modal" data-target="#modal_penjamin"data="' + item.id + '"><i class="fas fa-pencil-alt"></i></button></td>',
                                '<td style="width:200px"><input class="form-control sm" value="' + item.nama_penjamin + '" name="nama_penjamin[]" onkeyup="this.value = this.value.toUpperCase()"></td>',
                                '<td style="width:200px"><input class="form-control sm" value="' + item.pasangan_penjamin + '" name="pasangan_penjamin[]" onkeyup="this.value = this.value.toUpperCase()"></td>',
                            ].join('\n');
                            htmlpenjamin.push(tr);
                        })
                        $('#data_penjamin').html(htmlpenjamin);

                        var select_nama_penjamin = [];
                        var select_nama_penjamin1 = '<option value="">--Pilih--</option>';
                        $.each(data.penjamin, function(i, e) {
                            var option_nama_penjamin = [
                                '<option value="' + e.id + '">' + e.nama_penjamin + '</option>'
                            ].join('\n');
                            select_nama_penjamin.push(option_nama_penjamin);
                        });
                        $('#form_tambah_ktp_pen select[id=select_nama_penjamin]').html(select_nama_penjamin1 + select_nama_penjamin);

                        var select_nama_penjamin_buk_nik = [];
                        var select_nama_penjamin_buk_nik1 = '<option value="">--Pilih--</option>';
                        $.each(data.penjamin, function(i, e) {
                            var option_nama_penjamin_buk_nik = [
                                '<option value="' + e.id + '">' + e.nama_penjamin + '</option>'
                            ].join('\n');
                            select_nama_penjamin_buk_nik.push(option_nama_penjamin_buk_nik);
                        });
                        $('#form_tambah_buku_nikah_pen select[id=select_nama_penjamin_buk_nik]').html(select_nama_penjamin_buk_nik1 + select_nama_penjamin_buk_nik);

                        if (data.akta_notaris.search(new RegExp(/SKMHT/i)) != -1) {
                            document.getElementById("skmht").checked = "true";
                        }
                        if (data.akta_notaris.search(new RegExp(/APHT/i)) != -1) {
                            document.getElementById("apht").checked = "true";
                        }
                        if (data.akta_notaris.search(new RegExp(/Cabut Roya/i)) != -1) {
                            document.getElementById("cabut_roya").checked = "true";
                        }
                        if (data.akta_notaris.search(new RegExp(/Akta Jual Beli/i)) != -1) {
                            document.getElementById("akta_jual_beli").checked = "true";
                        }
                        if (data.akta_notaris.search(new RegExp(/Balik Nama Waris/i)) != -1) {
                            document.getElementById("balik_nama_waris").checked = "true";
                        }
                        if (data.akta_notaris.search(new RegExp(/Peningkatan Hak/i)) != -1) {
                            document.getElementById("peningkatan_hak").checked = "true";
                        }
                        if (data.akta_notaris.search(new RegExp(/Adendum/i)) != -1) {
                            document.getElementById("adendum").checked = "true";
                        }
                        if (data.akta_notaris.search(new RegExp(/Lain-Lain/i)) != -1) {
                            document.getElementById("lain_lain_notaris").checked = "true";
                        }

                        var select_nama_pemilik_sertifikat_ktp = [];
                        var select_nama_pemilik_sertifikat_ktp1 = '<option value="">--Pilih--</option>';
                        $.each(data.sertifikat, function(i, e) {
                            var option_nama_sertifikat = [
                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                            ].join('\n');
                            select_nama_pemilik_sertifikat_ktp.push(option_nama_sertifikat);
                        });
                        $('#form_tambah_ktp_pem_sertifikat select[id=select_nama_pemilik_sertifikat_ktp]').html(select_nama_pemilik_sertifikat_ktp1 + select_nama_pemilik_sertifikat_ktp);

                        var select_nama_pemilik_sertifikat_ktp_pas = [];
                        var select_nama_pemilik_sertifikat_ktp_pas1 = '<option value="">--Pilih--</option>';
                        $.each(data.sertifikat, function(i, e) {
                            var option_nama_sertifikat = [
                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                            ].join('\n');
                            select_nama_pemilik_sertifikat_ktp_pas.push(option_nama_sertifikat);
                        });
                        $('#form_tambah_ktp_pas_pem_sertifikat select[id=select_nama_pemilik_sertifikat_ktp_pas]').html(select_nama_pemilik_sertifikat_ktp_pas + select_nama_pemilik_sertifikat_ktp);

                        var select_nama_pemilik_sertifikat_sertifikat = [];
                        var select_nama_pemilik_sertifikat_sertifikat1 = '<option value="">--Pilih--</option>';
                        $.each(data.sertifikat, function(i, e) {

                            var option_nama_sertifikat = [
                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                            ].join('\n');
                            select_nama_pemilik_sertifikat_sertifikat.push(option_nama_sertifikat);
                        });
                        $('#form_tambah_sertifikat select[id=select_nama_pemilik_sertifikat_sertifikat]').html(select_nama_pemilik_sertifikat_sertifikat1 + select_nama_pemilik_sertifikat_sertifikat);

                        var select_nama_pemilik_sertifikat_pbb = [];
                        var select_nama_pemilik_sertifikat_pbb1 = '<option value="">--Pilih--</option>';
                        $.each(data.sertifikat, function(i, e) {
                            var option_nama_sertifikat = [
                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                            ].join('\n');
                            select_nama_pemilik_sertifikat_pbb.push(option_nama_sertifikat);
                        });
                        $('#form_tambah_pbb select[id=select_nama_pemilik_sertifikat_pbb]').html(select_nama_pemilik_sertifikat_pbb1 + select_nama_pemilik_sertifikat_pbb);

                        var select_nama_pemilik_sertifikat_imb = [];
                        var select_nama_pemilik_sertifikat_imb1 = '<option value="">--Pilih--</option>';
                        $.each(data.sertifikat, function(i, e) {
                            var option_nama_sertifikat = [
                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                            ].join('\n');
                            select_nama_pemilik_sertifikat_imb.push(option_nama_sertifikat);
                        });
                        $('#form_tambah_imb select[id=select_nama_pemilik_sertifikat_imb]').html(select_nama_pemilik_sertifikat_imb1 + select_nama_pemilik_sertifikat_imb);

                        var select_nama_pemilik_sertifikat_ajb = [];
                        var select_nama_pemilik_sertifikat_ajb1 = '<option value="">--Pilih--</option>';
                        $.each(data.sertifikat, function(i, e) {
                            var option_nama_sertifikat = [
                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                            ].join('\n');
                            select_nama_pemilik_sertifikat_ajb.push(option_nama_sertifikat);
                        });
                        $('#form_tambah_ajb select[id=select_nama_pemilik_sertifikat_ajb]').html(select_nama_pemilik_sertifikat_ajb1 + select_nama_pemilik_sertifikat_ajb);

                        var select_nama_pemilik_sertifikat_ahli_waris = [];
                        var select_nama_pemilik_sertifikat_ahli_waris1 = '<option value="">--Pilih--</option>';
                        $.each(data.sertifikat, function(i, e) {
                            var option_nama_sertifikat = [
                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                            ].join('\n');
                            select_nama_pemilik_sertifikat_ahli_waris.push(option_nama_sertifikat);
                        });
                        $('#form_tambah_ahli_waris select[id=select_nama_pemilik_sertifikat_ahli_waris]').html(select_nama_pemilik_sertifikat_ahli_waris1 + select_nama_pemilik_sertifikat_ahli_waris);

                        var select_nama_pemilik_sertifikat_akta_hibah = [];
                        var select_nama_pemilik_sertifikat_akta_hibah1 = '<option value="">--Pilih--</option>';
                        $.each(data.sertifikat, function(i, e) {
                            var option_nama_sertifikat = [
                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                            ].join('\n');
                            select_nama_pemilik_sertifikat_akta_hibah.push(option_nama_sertifikat);
                        });
                        $('#form_tambah_akta_hibah select[id=select_nama_pemilik_sertifikat_akta_hibah]').html(select_nama_pemilik_sertifikat_akta_hibah1 + select_nama_pemilik_sertifikat_akta_hibah);

                        var htmljaminansertifikat = [];
                        var np = 0;
                        var na = 0;
                        var nc = 0;
                        var nh = 0;
                        var ncd = 0;
                        $.each(data.sertifikat, function(index, item) {
                            var shm_p = 'shm_p' + np++;
                            var shgb_p = 'shgb_p' + np++;
                            var datepicker = 'datepicker' + nc++;
                            var status_hidup_sert = 'status_hidup_sert' + ncd++;
                            var status_meninggal_sert = 'status_meninggal_sert' + ncd++;
                            var hub_cadeb_bapak = 'hub_cadeb_bapak' + ncd++;
                            var hub_cadeb_anak = 'hub_cadeb_anak' + ncd++;
                            var hub_cadeb_saudara_kandung = 'hub_cadeb_saudara_kandung' + ncd++;
                            var hub_cadeb_orang_lain = 'hub_cadeb_orang_lain' + ncd++;
                            // var status_hidup = 'status_hidup'+ nh++;
                            var tgl_berlaku_shgb = "";
                            if (item.tgl_berlaku_shgb == null) {
                                tgl_berlaku_shgb = '';
                            } else {
                                tgl_berlaku_shgb = item.tgl_berlaku_shgb;
                            }

                            var status_sertifikat_hidup = item.status_sertifikat;
                            if (status_sertifikat_hidup == 'Hidup') {
                                var status_sertifikat_hidup_checked = 'checked="checked"';
                            }
                            var status_sertifikat_meninggal = item.status_sertifikat;
                            if (status_sertifikat_meninggal == 'Meninggal Dunia') {
                                var status_sertifikat_meninggal_checked = 'checked="checked"';
                            }

                            var status_sertifikat_pas_hidup = item.status_pas_sertifikat;
                            if (status_sertifikat_pas_hidup == 'Hidup') {
                                var status_sertifikat_pas_hidup_checked = 'checked="checked"';
                            }
                            var status_sertifikat_pas_meninggal = item.status_pas_sertifikat;
                            if (status_sertifikat_pas_meninggal == 'Meninggal Dunia') {
                                var status_sertifikat_pas_meninggal_checked = 'checked="checked"';
                            }

                            var tr = [
                                '<tr>',
                                '<td style="width:50px"><button type="button" class="btn btn-info btn-sm edit submit" data-toggle="modal" data-target="#modal_penjamin"data="' + item.id + '"><i class="fas fa-pencil-alt"></i></button></td>',
                                '<td style="width:100px"><select name="jenis_sertifikat[]" class="form-control select2 select2-danger" style="width: 100%;"><option id="pilih_jaminan" value="' + item.jenis_sertifikat + '">' + item.jenis_sertifikat + '</option><option id="' + shm_p + '" value="SHM_p">SHM</option><option id="' + shgb_p + '" value="SHGB_p">SHGB</option></select></td>',
                                '<td style="width:200px"><input class="form-control" value="' + item.no_sertifikat + '" name="no_sertifikat[]"></td>',
                                '<td style="width:200px"><input class="form-control " value="' + item.nama_sertifikat + '" name="nama_sertifikat[]" onkeyup="this.value = this.value.toUpperCase()"><div style="height:19px"><input type="checkbox" value="Hidup" ' + status_sertifikat_hidup_checked + ' name="status_hidup[]" style="margin-top:4px"> <small>Hidup</small><input type="checkbox" ' + status_sertifikat_meninggal_checked + ' value="Meninggal Dunia" style="margin-left:26px;" name="status_hidup[]"> <small>Meninggal Dunia</small></div></td>',
                                '<td style="width:250px"><input class="form-control" value="' + item.nama_pas_sertifikat + '" name="nama_pas_sertifikat[]" onkeyup="this.value = this.value.toUpperCase()"><div style="height:19px"><input type="checkbox" ' + status_sertifikat_pas_hidup_checked + '  value="Hidup" name="status_hidup_pas[]" style="margin-top:4px"> <small>Hidup</small><input type="checkbox" ' + status_sertifikat_pas_meninggal_checked + ' value="Meninggal Dunia" id="" style="margin-left:26px;" name="status_hidup_pas[]"> <small>Meninggal Dunia</small></div></td>',
                                '<td style="width:193px"><div class="form-group"><select id="hub_cadeb[]" name="hub_cadeb[]" class="form-control select2 select2-danger" style="width: 100%;"><option value="' + item.hub_cadeb + '">' + item.hub_cadeb + '</option><option value="Pasangan">Pasangan</option><option value="Ibu">Ibu</option><option value="Bapak">Bapak</option><option value="Anak">Anak</option><option value="Saudara Kandung">Saudara Kandung</option><option value="Orang Lain">Orang Lain</option></select></td>',
                                '<td style="width:133px"><input class="form-control" value="' + tgl_berlaku_shgb + '" name="tgl_berlaku_shgb[]" data-date-format="dd-mm-yyyy"></td>',
                                // '<td style="width:133px"><input type="text" name="tgl_berlaku_shgb[]" class="form-control" id="' + datepicker + '" value="' + tgl_berlaku_shgb + '" data-date-format="dd-mm-yyyy"/></td>',
                                '</tr>'
                            ].join('\n');
                            htmljaminansertifikat.push(tr);
                            $(function() {
                                $("#datepicker0").datepicker();
                                $("#datepicker1").datepicker();
                                $("#datepicker2").datepicker();
                                $("#datepicker3").datepicker();
                                $("#datepicker4").datepicker();
                                $("#datepicker5").datepicker();
                            });


                        })
                        $('#data_jaminan_sertifikat').html(htmljaminansertifikat);

                        if (data.lampiran_debitur.lampiran_ktp_deb == null) {
                            var a = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html.push(a);
                            $('#file_ktp').html(html);
                        } else {
                            var a = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_debitur.lampiran_ktp_deb + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_debitur.lampiran_ktp_deb.substr(32) + '</p></a>'
                            ].join('\n');
                            html.push(a);
                            $('#file_ktp').html(html);
                        }

                        if (data.lampiran_pasangan.lampiran_ktp_pasangan == null) {
                            var b = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html1.push(b);
                            $('#file_ktp_pas').html(html1);
                        } else {
                            var b = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_pasangan.lampiran_ktp_pasangan + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_pasangan.lampiran_ktp_pasangan.substr(33) + '</p></a>'
                            ].join('\n');
                            html1.push(b);
                            $('#file_ktp_pas').html(html1);
                        }

                        if (data.lampiran[0].lampiran_surat_cerai == null) {
                            var c = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html2.push(c);
                            $('#file_surat_cerai').html(html2);
                        } else {
                            var c = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_cerai + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_surat_cerai.substr(46) + '</p> </a>'
                            ].join('\n');
                            html2.push(c);
                            $('#file_surat_cerai').html(html2);
                        }

                        if (data.lampiran[0].lampiran_surat_lahir == null) {
                            var d = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html3.push(d);
                            $('#file_surat_lahir').html(html3);
                        } else {
                            var d = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_lahir + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_surat_lahir.substr(46) + '</p> </a>'
                            ].join('\n');
                            html3.push(d);
                            $('#file_surat_lahir').html(html3);
                        }

                        if (data.lampiran[0].lampiran_surat_kematian == null) {
                            var e = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html4.push(e);
                            $('#file_surat_kematian').html(html4);
                        } else {
                            var e = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_kematian + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_surat_kematian.substr(46) + '</p></a>'
                            ].join('\n');
                            html4.push(e);
                            $('#file_surat_kematian').html(html4);
                        }

                        if (data.lampiran[0].lampiran_sk_desa == null) {
                            var f = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html5.push(f);
                            $('#file_surat_ket_desa').html(html5);
                        } else {
                            var f = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_sk_desa + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_sk_desa.substr(46) + '</p></a>'
                            ].join('\n');
                            html5.push(f);
                            $('#file_surat_ket_desa').html(html5);
                        }

                        if (data.lampiran_pasangan.lampiran_surat_nikah == null) {
                            var g = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html6.push(g);
                            $('#file_surat_nikah').html(html6);
                        } else {
                            var g = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran_pasangan.lampiran_surat_nikah + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran_pasangan.lampiran_surat_nikah.substr(33) + '</p> </a>'
                            ].join('\n');
                            html6.push(g);
                            $('#file_surat_nikah').html(html6);
                        }

                        if (data.lampiran[0].lampiran_npwp == null) {
                            var h = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html7.push(h);
                            $('#file_npwp').html(html7);
                        } else {
                            var h = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_npwp + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_npwp.substr(46) + '</p> </a>'
                            ].join('\n');
                            html7.push(h);
                            $('#file_npwp').html(html7);
                        }

                        if (data.lampiran[0].lampiran_kk == null) {
                            var i = [
                                '<p style="font-size: 13px; font-weight: 400;">Data tidak ada</p>'
                            ].join('\n');
                            html8.push(i);
                            $('#file_kk').html(html8);
                        } else {
                            var i = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_kk + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_kk.substr(32) + '</p></a>'
                            ].join('\n');
                            html8.push(i);
                            $('#file_kk').html(html8);
                        }

                        urut_penjamin = 0;
                        $.each(data.penjamin, function(index, item) {
                            urut_penjamin++;
                            if (item.lampiran_ktp_penjamin == null) {
                                var j = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_penjamin + '. Data tidak ada</p>'
                                ].join('\n');
                                html9.push(j);
                                $('#file_ktp_pen').html(html9);
                            } else {
                                var j = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_ktp_penjamin + '"><p style="font-size: 13px; font-weight: 400;">' + urut_penjamin + '. ' + item.lampiran_ktp_penjamin.substr(37) + '</p></a>',
                                ].join('\n');
                                html9.push(j);
                                $('#file_ktp_pen').html(html9);
                            }
                        })

                        urut_buk_nik_pen = 0;
                        $.each(data.penjamin, function(index, item) {
                            urut_buk_nik_pen++;
                            if (item.buku_nikah_penjamin == null) {
                                var j = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_buk_nik_pen + '. Data tidak ada</p>'
                                ].join('\n');
                                html19.push(j);
                                $('#file_buku_nikah_pen').html(html19);
                            } else {
                                var j = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.buku_nikah_penjamin + '"><p style="font-size: 13px; font-weight: 400;">' + urut_buk_nik_pen + '. ' + item.buku_nikah_penjamin.substr(37) + '</p></a>',
                                ].join('\n');
                                html19.push(j);
                                $('#file_buku_nikah_pen').html(html19);
                            }
                        })

                        urut_sertifikat = 0;
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.lampiran_ktp_sertifikat == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html10.push(k);
                                $('#file_ktp_pem_sertifikat').html(html10);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_ktp_sertifikat + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_ktp_sertifikat.substr(57) + '</p></a>',
                                ].join('\n');
                                html10.push(k);
                                $('#file_ktp_pem_sertifikat').html(html10);
                            }


                            if (item.lampiran_ktp_pasangan_sertifikat == null) {
                                var l = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html11.push(l);
                                $('#file_ktp_pas_pem_sertifikat').html(html11);
                            } else {
                                var l = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_ktp_pasangan_sertifikat + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_ktp_pasangan_sertifikat.substr(57) + '</p></a>',
                                ].join('\n');
                                html11.push(l);
                                $('#file_ktp_pas_pem_sertifikat').html(html11);
                            }

                            if (item.lampiran_sertifikat == null) {
                                var m = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html12.push(m);
                                $('#file_sertifikat').html(html12);
                            } else {
                                var m = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_sertifikat + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_sertifikat.substr(57) + '</p></a>',
                                ].join('\n');
                                html12.push(m);
                                $('#file_sertifikat').html(html12);
                            }

                            if (item.lampiran_pbb == null) {
                                var n = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html13.push(n);
                                $('#file_pbb').html(html13);
                            } else {
                                var n = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_pbb + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + ' . ' + item.lampiran_pbb.substr(57) + '</p></a>',
                                ].join('\n');
                                html13.push(n);
                                $('#file_pbb').html(html13);
                            }

                            if (item.lampiran_imb == null) {
                                var o = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html14.push(o);
                                $('#file_imb').html(html14);
                            } else {
                                var o = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_imb + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_imb.substr(57) + '</p></a>',
                                ].join('\n');
                                html14.push(o);
                                $('#file_imb').html(html14);
                            }

                            if (item.ajb_ppjb == null) {
                                var p = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html15.push(p);
                                $('#file_ajb_ppjb').html(html15);
                            } else {
                                var p = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.ajb_ppjb + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.ajb_ppjb.substr(57) + '</p></a>',
                                ].join('\n');
                                html15.push(p);
                                $('#file_ajb_ppjb').html(html15);
                            }

                            if (item.ahli_waris == null) {
                                var q = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html16.push(q);
                                $('#file_ahli_waris').html(html16);
                            } else {
                                var q = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.ahli_waris + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.ahli_waris.substr(57) + '</p></a>',
                                ].join('\n');
                                html16.push(q);
                                $('#file_ahli_waris').html(html16);
                            }

                            if (item.akta_hibah == null) {
                                var r = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html17.push(r);
                                $('#file_akta_hibah').html(html17);
                            } else {
                                var r = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.akta_hibah + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.akta_hibah.substr(57) + '</p></a>',
                                ].join('\n');
                                html17.push(r);
                                $('#file_akta_hibah').html(html17);
                            }
                        })

                        get_produk()
                            .done(function(res) {
                                var select = [];
                                $.each(res.data, function(i, e) {
                                    var option = [
                                        '<option id="' + e.nama_produk + 'a" value="' + e.nama_produk + '">' + e.nama_produk + '</option>'
                                    ].join('\n');
                                    select.push(option);
                                });
                                $('#form_pengajuan select[id=nama_produk_kredit_p]').html(select);
                                if (data.produk == '' + data.produk + '') {
                                    document.getElementById('' + data.produk + 'a').selected = "true";
                                }
                            })
                    })

                    .fail(function(jqXHR) {
                        bootbox.alert('Data tidak ditemukan');
                    });
            });

            //KLIK SIMPAN PENGAJUAN LPDK
            $('#form_pengajuan').on('submit', function(e) {
                e.preventDefault();
                var formData = new FormData();
                var id = $('input[id=id_trans_so]', this).val();

                if (document.getElementById('status_edit').value == "edit") {
                    formData.append('alamat_ktp_vs_jaminan', $('input[type=radio][name=alamat_ktp_vs_jaminan]:checked', this).val());
                    $.each($('input[name="akta_notaris[]"]:checked'), function(i, e) {
                        formData.append('akta_notaris[]', e.value);
                    });
                    formData.append('akta_notaris_note_lainlain', $('textarea[name=notes_lain2]', this).val());
                    update_lpdk(formData, id)
                        .done(function(res) {
                            var data = res.data;

                            bootbox.alert('Data berhasil diubah', function() {
                                $('#batal').click();
                                $('#simpan_pengajuan').prop('disabled', true);
                                $('#lamp_data_nasabah').show();
                                $('#lamp_data_jaminan').show();
                                load_data_lpdk();
                                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                                get_detail_lpdk({}, id)
                                    .done(function(response) {
                                        var data = response.data[0];

                                        var html = [];
                                        var select_nama_penjamin = [];
                                        var select_nama_penjamin1 = '<option value="">--Pilih--</option>';
                                        $.each(data.penjamin, function(i, e) {
                                            var option_nama_penjamin = [
                                                '<option value="' + e.id + '">' + e.nama_penjamin + '</option>'
                                            ].join('\n');
                                            select_nama_penjamin.push(option_nama_penjamin);
                                        });
                                        $('#form_tambah_ktp_pen select[id=select_nama_penjamin]').html(select_nama_penjamin1 + select_nama_penjamin);

                                        var select_nama_penjamin_buk_nik = [];
                                        var select_nama_penjamin_buk_nik1 = '<option value="">--Pilih--</option>';
                                        $.each(data.penjamin, function(i, e) {
                                            var option_nama_penjamin_pas = [
                                                '<option value="' + e.id + '">' + e.nama_penjamin + '</option>'
                                            ].join('\n');
                                            select_nama_penjamin_buk_nik.push(option_nama_penjamin_pas);
                                        });
                                        $('#form_tambah_buku_nikah_pen select[id=select_nama_penjamin_buk_nik]').html(select_nama_penjamin_buk_nik1 + select_nama_penjamin_buk_nik);

                                        var select_nama_pemilik_sertifikat_ktp = [];
                                        var select_nama_pemilik_sertifikat_ktp1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_ktp.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_ktp_pem_sertifikat select[id=select_nama_pemilik_sertifikat_ktp]').html(select_nama_pemilik_sertifikat_ktp1 + select_nama_pemilik_sertifikat_ktp);

                                        var select_nama_pemilik_sertifikat_ktp_pas = [];
                                        var select_nama_pemilik_sertifikat_ktp_pas1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_ktp_pas.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_ktp_pas_pem_sertifikat select[id=select_nama_pemilik_sertifikat_ktp_pas]').html(select_nama_pemilik_sertifikat_ktp_pas1 + select_nama_pemilik_sertifikat_ktp_pas);

                                        var select_nama_pemilik_sertifikat_sertifikat = [];
                                        var select_nama_pemilik_sertifikat_sertifikat1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_sertifikat.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_sertifikat select[id=select_nama_pemilik_sertifikat_sertifikat]').html(select_nama_pemilik_sertifikat_sertifikat1 + select_nama_pemilik_sertifikat_sertifikat);

                                        var select_nama_pemilik_sertifikat_pbb = [];
                                        var select_nama_pemilik_sertifikat_pbb1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_pbb.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_pbb select[id=select_nama_pemilik_sertifikat_pbb]').html(select_nama_pemilik_sertifikat_pbb1 + select_nama_pemilik_sertifikat_pbb);

                                        var select_nama_pemilik_sertifikat_imb = [];
                                        var select_nama_pemilik_sertifikat_imb1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_imb.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_imb select[id=select_nama_pemilik_sertifikat_imb]').html(select_nama_pemilik_sertifikat_imb1 + select_nama_pemilik_sertifikat_imb);

                                        var select_nama_pemilik_sertifikat_ajb = [];
                                        var select_nama_pemilik_sertifikat_ajb1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_ajb.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_ajb select[id=select_nama_pemilik_sertifikat_ajb]').html(select_nama_pemilik_sertifikat_ajb1 + select_nama_pemilik_sertifikat_ajb);

                                        var select_nama_pemilik_sertifikat_ahli_waris = [];
                                        var select_nama_pemilik_sertifikat_ahli_waris1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_ahli_waris.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_ahli_waris select[id=select_nama_pemilik_sertifikat_ahli_waris]').html(select_nama_pemilik_sertifikat_ahli_waris1 + select_nama_pemilik_sertifikat_ahli_waris);

                                        var select_nama_pemilik_sertifikat_akta_hibah = [];
                                        var select_nama_pemilik_sertifikat_akta_hibah1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_akta_hibah.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_akta_hibah select[id=select_nama_pemilik_sertifikat_akta_hibah]').html(select_nama_pemilik_sertifikat_akta_hibah1 + select_nama_pemilik_sertifikat_akta_hibah);
                                    })
                                    .fail(function(response) {
                                        $('#file_ktp').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                                    });


                            })
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
                                $('#batal').click();
                            });
                        });
                } else {
                    //debitur
                    formData.append('nama_debitur', $('input[name=nama_cadeb_p]', this).val());
                    formData.append('nama_pasangan', $('input[name=nama_pasangan_p]', this).val());
                    formData.append('status_nikah', $('select[name=status_nikah_p]', this).val());
                    formData.append('produk', $('select[name=nama_produk_kredit_p]', this).val());
                    formData.append('alamat_ktp_vs_jaminan', $('input[type=radio][name=alamat_ktp_vs_jaminan]:checked', this).val());
                    //penjamin
                    $.each($('input[name="nama_penjamin[]"]'), function(i, e) {
                        formData.append('nama_penjamin[]', e.value);
                    });
                    $.each($('input[name="pasangan_penjamin[]"]'), function(i, e) {
                        formData.append('pasangan_penjamin[]', e.value);
                    });
                    //sertifikat
                    $.each($('input[name="akta_notaris[]"]:checked'), function(i, e) {
                        formData.append('akta_notaris[]', e.value);
                    });

                    $.each($('select[name="jenis_sertifikat[]"]'), function(i, e) {
                        formData.append('jenis_sertifikat[]', e.value);
                    });
                    $.each($('input[name="no_sertifikat[]"]'), function(i, e) {
                        formData.append('no_sertifikat[]', e.value);
                    });
                    $.each($('input[name="nama_sertifikat[]"]'), function(i, e) {
                        formData.append('nama_sertifikat[]', e.value);
                    });
                    $.each($('input[name="tgl_berlaku_shgb[]"]'), function(i, e) {
                        formData.append('tgl_berlaku_shgb[]', e.value);
                    });
                    $.each($('input[name="nama_pas_sertifikat[]"]'), function(i, e) {
                        formData.append('nama_pasangan_sertifikat[]', e.value);
                    });
                    $.each($('select[name="hub_cadeb[]"]'), function(i, e) {
                        formData.append('hub_cadeb[]', e.value);
                    });
                    $.each($('input[type="radio"][name="status_hidup[]"]:checked'), function(i, e) {
                        formData.append('status_sertifikat[]', e.value);
                    });
                    $.each($('input[type="radio"][name="status_hidup_pas[]"]:checked'), function(i, e) {
                        formData.append('status_pas_sertifikat[]', e.value);
                    });
                    formData.append('akta_notaris_note_lainlain', $('textarea[name=notes_lain2]', this).val());
                    tambah_pengajuan_lpdk(formData, id)
                        .done(function(res) {
                            var data = res.data;
                            bootbox.alert('Lanjut Upload Lampiran', function() {
                                var html12 = "<div class='form-group'>" +
                                    "<div class='btn_simpan_pengajuan'>" +
                                    "<a  data-dismiss='modal' class='btn btn-success btn-sm' style='float: right; margin-right: 4px; color:#fff'>Selesai</a>" +
                                    "</div>" +
                                    "</div>";
                                $('#btn_simpan_pengajuan').html(html12);
                                $('#batal').click();
                                // $('#simpan_pengajuan').prop('disabled', true);
                                $('#lamp_data_nasabah').show();
                                $('#lamp_data_jaminan').show();
                                $('.button').hide();

                                load_data_lpdk();
                                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                                get_detail_lpdk({}, id)
                                    .done(function(response) {
                                        var data = response.data[0];

                                        var html = [];
                                        var select_nama_penjamin = [];
                                        var select_nama_penjamin1 = '<option value="">--Pilih--</option>';
                                        $.each(data.penjamin, function(i, e) {
                                            var option_nama_penjamin = [
                                                '<option value="' + e.id + '">' + e.nama_penjamin + '</option>'
                                            ].join('\n');
                                            select_nama_penjamin.push(option_nama_penjamin);
                                        });
                                        $('#form_tambah_ktp_pen select[id=select_nama_penjamin]').html(select_nama_penjamin1 + select_nama_penjamin);

                                        var select_nama_penjamin_buk_nik = [];
                                        var select_nama_penjamin_buk_nik1 = '<option value="">--Pilih--</option>';
                                        $.each(data.penjamin, function(i, e) {
                                            var option_nama_penjamin_pas = [
                                                '<option value="' + e.id + '">' + e.nama_penjamin + '</option>'
                                            ].join('\n');
                                            select_nama_penjamin_buk_nik.push(option_nama_penjamin_pas);
                                        });
                                        $('#form_tambah_buku_nikah_pen select[id=select_nama_penjamin_buk_nik]').html(select_nama_penjamin_buk_nik1 + select_nama_penjamin_buk_nik);


                                        var select_nama_pemilik_sertifikat_ktp = [];
                                        var select_nama_pemilik_sertifikat_ktp1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_ktp.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_ktp_pem_sertifikat select[id=select_nama_pemilik_sertifikat_ktp]').html(select_nama_pemilik_sertifikat_ktp1 + select_nama_pemilik_sertifikat_ktp);

                                        var select_nama_pemilik_sertifikat_ktp_pas = [];
                                        var select_nama_pemilik_sertifikat_ktp_pas1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_ktp_pas.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_ktp_pas_pem_sertifikat select[id=select_nama_pemilik_sertifikat_ktp_pas]').html(select_nama_pemilik_sertifikat_ktp_pas1 + select_nama_pemilik_sertifikat_ktp_pas);

                                        var select_nama_pemilik_sertifikat_sertifikat = [];
                                        var select_nama_pemilik_sertifikat_sertifikat1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_sertifikat.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_sertifikat select[id=select_nama_pemilik_sertifikat_sertifikat]').html(select_nama_pemilik_sertifikat_sertifikat1 + select_nama_pemilik_sertifikat_sertifikat);

                                        var select_nama_pemilik_sertifikat_pbb = [];
                                        var select_nama_pemilik_sertifikat_pbb1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_pbb.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_pbb select[id=select_nama_pemilik_sertifikat_pbb]').html(select_nama_pemilik_sertifikat_pbb1 + select_nama_pemilik_sertifikat_pbb);

                                        var select_nama_pemilik_sertifikat_imb = [];
                                        var select_nama_pemilik_sertifikat_imb1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_imb.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_imb select[id=select_nama_pemilik_sertifikat_imb]').html(select_nama_pemilik_sertifikat_imb1 + select_nama_pemilik_sertifikat_imb);

                                        var select_nama_pemilik_sertifikat_ajb = [];
                                        var select_nama_pemilik_sertifikat_ajb1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_ajb.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_ajb select[id=select_nama_pemilik_sertifikat_ajb]').html(select_nama_pemilik_sertifikat_ajb1 + select_nama_pemilik_sertifikat_ajb);

                                        var select_nama_pemilik_sertifikat_ahli_waris = [];
                                        var select_nama_pemilik_sertifikat_ahli_waris1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_ahli_waris.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_ahli_waris select[id=select_nama_pemilik_sertifikat_ahli_waris]').html(select_nama_pemilik_sertifikat_ahli_waris1 + select_nama_pemilik_sertifikat_ahli_waris);

                                        var select_nama_pemilik_sertifikat_akta_hibah = [];
                                        var select_nama_pemilik_sertifikat_akta_hibah1 = '<option value="">--Pilih--</option>';
                                        $.each(data.sertifikat, function(i, e) {
                                            var option_nama_sertifikat = [
                                                '<option value="' + e.id + '">' + e.nama_sertifikat + '</option>'
                                            ].join('\n');
                                            select_nama_pemilik_sertifikat_akta_hibah.push(option_nama_sertifikat);
                                        });
                                        $('#form_tambah_akta_hibah select[id=select_nama_pemilik_sertifikat_akta_hibah]').html(select_nama_pemilik_sertifikat_akta_hibah1 + select_nama_pemilik_sertifikat_akta_hibah);
                                    })
                                    .fail(function(response) {
                                        $('#file_ktp').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                                    });
                            })
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
                                $('#batal').click();
                            });
                        });
                }
            });

            //KLIK UPLOAD KTP DEBITUR
            $('#form_tambah_ktp_deb').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_ktp]', this).val();

                var formData = new FormData();
                formData.append('lamp_ktp', $('input[name="lamp_ktp_deb"]')[0].files[0]);

                update_debitur_lamp(formData, id)
                    .done(function(res) {

                        var data = res.data;

                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_ktp_deb')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            // load_lampiran_ktp_deb()
                            var html = [];
                            var a = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lamp_ktp + '"><p style="font-size: 13px; font-weight: 400;">' + data.lamp_ktp.substr(32) + '</p></a>'
                            ].join('\n');
                            html.push(a);
                            $('#file_ktp').html(html);
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD KTP PASANGAN
            $('#form_tambah_ktp_pas').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_ktp_pas]', this).val();
                var formData = new FormData();
                formData.append('lamp_ktp_pas', $('input[name="lamp_ktp_pas"]')[0].files[0]);

                update_lampiran_pasangan(formData, id)
                    .done(function(res) {
                        var data = res.data;

                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_ktp_pas')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            var html1 = [];
                            var a = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lamp_ktp + '"><p style="font-size: 13px; font-weight: 400;">' + data.lamp_ktp + '</p> </a>'
                            ].join('\n');
                            html1.push(a);
                            $('#file_ktp_pas').html(html1);
                            // load_lampiran_ktp_pas();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD KK DEBITUR
            $('#form_tambah_kk').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_kk]', this).val();
                var formData = new FormData();
                formData.append('lamp_kk', $('input[name="lamp_kk"]')[0].files[0]);

                update_debitur_lamp(formData, id)
                    .done(function(res) {
                        var data = res.data;
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_kk')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            var html = [];
                            var a = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lamp_kk + '"><p style="font-size: 13px; font-weight: 400;">' + data.lamp_kk.substr(32) + '</p></a>'
                            ].join('\n');
                            html.push(a);
                            $('#file_kk').html(html);
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });


            document.getElementById('lamp_npwp').onchange = function(evt) {
                ImageTools.resize(this.files[0], {
                    width: 800, // maximum width
                    height: 750 // maximum height
                });
            };
            //KLIK UPLOAD NPWP
            $('#form_tambah_npwp').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_npwp]', this).val();
                var formData = new FormData();
                formData.append('lampiran_npwp', $('input[name="lamp_npwp"]')[0].files[0]);

                tambah_lampiran(formData, id)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_npwp')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_npwp();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD BUKU NIKAH
            $('#form_tambah_surat_nikah').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_nikah]', this).val();
                var formData = new FormData();
                formData.append('lamp_buku_nikah_pas', $('input[name="lamp_surat_nikah"]')[0].files[0]);

                update_lampiran_pasangan(formData, id)
                    .done(function(res) {
                        var data = res.data;
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_surat_nikah')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            var html1 = [];
                            var a = [
                                '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lamp_buku_nikah + '"><p style="font-size: 13px; font-weight: 400;">1. Buku Nikah Debitur</p> </a>'
                            ].join('\n');
                            html1.push(a);
                            $('#file_surat_nikah').html(html1);
                            // load_lampiran_surat_nikah();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD SURAT CERAI
            $('#form_tambah_surat_cerai').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_cerai]', this).val();
                var formData = new FormData();
                formData.append('lampiran_surat_cerai', $('input[name="lamp_surat_cerai"]')[0].files[0]);

                tambah_lampiran(formData, id)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_surat_cerai')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_surat_cerai();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD SURAT LAHIR
            $('#form_tambah_surat_lahir').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_lahir]', this).val();
                var formData = new FormData();
                formData.append('lampiran_surat_lahir', $('input[name="lamp_surat_lahir"]')[0].files[0]);

                tambah_lampiran(formData, id)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_surat_lahir')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_surat_lahir();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD SURAT KEMATIAN
            $('#form_tambah_surat_kematian').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_kematian]', this).val();
                var formData = new FormData();
                formData.append('lampiran_surat_kematian', $('input[name="lamp_surat_kematian"]')[0].files[0]);

                tambah_lampiran(formData, id)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_surat_kematian')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_surat_kematian();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD SURAT KETERANGAN DESA
            $('#form_tambah_surat_ket_desa').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_ket_desa]', this).val();
                var formData = new FormData();
                formData.append('lampiran_sk_desa', $('input[name="lamp_surat_ket_desa"]')[0].files[0]);

                tambah_lampiran(formData, id)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_surat_ket_desa')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_surat_ket_desa();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD KTP PENJAMIN
            $('#form_tambah_ktp_pen').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_ktp_pen]', this).val();
                var id_penjamin = $('select[id=select_nama_penjamin]', this).val();
                var formData = new FormData();
                formData.append('lampiran_ktp_penjamin', $('input[name="lamp_ktp_pen"]')[0].files[0]);

                update_penjamin(formData, id, id_penjamin)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_ktp_pen')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_ktp_penjamin();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD BUKU NIKAH PENJAMIN
            $('#form_tambah_buku_nikah_pen').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_debitur_buku_nikah_pen]', this).val();
                var id_penjamin = $('select[id=select_nama_penjamin_buk_nik]', this).val();
                var formData = new FormData();
                formData.append('buku_nikah_penjamin', $('input[name="lamp_buku_nikah_pen"]')[0].files[0]);

                update_penjamin(formData, id, id_penjamin)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_ktp_pen')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_buku_nikah_penjamin();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD KTP PEMILIK SERTIFIKAT
            $('#form_tambah_ktp_pem_sertifikat').on('submit', function(e) {
                e.preventDefault();
                var id = $('select[id=select_nama_pemilik_sertifikat_ktp]', this).val();
                var id_so = $('input[id=id_debitur_ktp_pem_sertifikat]', this).val();
                var formData = new FormData();
                formData.append('lampiran_ktp_sertifikat', $('input[name="lamp_ktp_pem_sertifikat"]')[0].files[0]);

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {

                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_ktp_pem_sertifikat')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_ktp_pem_sertifikat();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD KTP PASANGAN PEMILIK SERTIFIKAT
            $('#form_tambah_ktp_pas_pem_sertifikat').on('submit', function(e) {
                e.preventDefault();
                var id = $('select[id=select_nama_pemilik_sertifikat_ktp_pas]', this).val();
                var id_so = $('input[id=id_debitur_ktp_pas_pem_sertifikat]', this).val();
                var formData = new FormData();
                formData.append('lampiran_ktp_pasangan_sertifikat', $('input[name="lamp_ktp_pas_pem_sertifikat"]')[0].files[0]);

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_ktp_pas_pem_sertifikat')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_ktp_pas_pem_sertifikat();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD SERTIFIKAT
            $('#form_tambah_sertifikat').on('submit', function(e) {
                e.preventDefault();
                var id = $('select[id=select_nama_pemilik_sertifikat_sertifikat]', this).val();
                var id_so = $('input[id=id_debitur_sertifikat]', this).val();
                var formData = new FormData();
                formData.append('lampiran_sertifikat', $('input[name="lamp_sertifikat"]')[0].files[0]);

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_sertifikat')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_sertifikat();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD PBB
            $('#form_tambah_pbb').on('submit', function(e) {
                e.preventDefault();
                var id = $('select[id=select_nama_pemilik_sertifikat_pbb]', this).val();
                var id_so = $('input[id=id_debitur_pbb]', this).val();
                var formData = new FormData();
                formData.append('lampiran_pbb', $('input[name="lamp_pbb"]')[0].files[0]);

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_pbb')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_pbb();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD IMB
            $('#form_tambah_imb').on('submit', function(e) {
                e.preventDefault();
                var id = $('select[id=select_nama_pemilik_sertifikat_imb]', this).val();
                var id_so = $('input[id=id_debitur_imb]', this).val();
                var formData = new FormData();
                formData.append('lampiran_imb', $('input[name="lamp_imb"]')[0].files[0]);

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_imb')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_imb();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD AJB
            $('#form_tambah_ajb').on('submit', function(e) {
                e.preventDefault();
                var id = $('select[id=select_nama_pemilik_sertifikat_ajb]', this).val();
                var id_so = $('input[id=id_debitur_ajb]', this).val();
                var formData = new FormData();
                formData.append('ajb_ppjb', $('input[name="lamp_ajb"]')[0].files[0]);

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_ajb')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_ajb_ppjb();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD AHLI WARIS
            $('#form_tambah_ahli_waris').on('submit', function(e) {
                e.preventDefault();
                var id = $('select[id=select_nama_pemilik_sertifikat_ahli_waris]', this).val();
                var id_so = $('input[id=id_debitur_ahli_waris]', this).val();
                var formData = new FormData();
                formData.append('ahli_waris', $('input[name="lamp_ahli_waris"]')[0].files[0]);

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_ahli_waris')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_ahli_waris();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK UPLOAD AKTA HIBAH
            $('#form_tambah_akta_hibah').on('submit', function(e) {
                e.preventDefault();
                var id = $('select[id=select_nama_pemilik_sertifikat_akta_hibah]', this).val();
                var id_so = $('input[id=id_debitur_akta_hibah]', this).val();
                var formData = new FormData();
                formData.append('akta_hibah', $('input[name="lamp_akta_hibah"]')[0].files[0]);

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {
                        bootbox.alert('Lampiran berhasil disimpan', function() {
                            $('#form_tambah_akta_hibah')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_lampiran_aktahibah();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            //KLIK SIMPAN NOTE
            $('#form_note').on('submit', function(e) {
                e.preventDefault();
                var formData = new FormData();
                var id = $('input[id=id_trans_so_note]', this).val();
                formData.append('notes_counter', $('textarea[name=notes_counter]', this).val());
                formData.append('status_kredit', 'REVISI');
                update_status(formData, id)
                    .done(function(res) {
                        console.log(res);
                        bootbox.alert('Data Berhasil Disimpan', function() {
                            $('#batal').click();
                            $('.close_deb').click();
                            load_data_lpdk();
                        })
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

                        bootbox.alert(error);
                    });
            });

            //KLIK CANCEL DATA PENGAJUAN LPDK
            $('#data_pengajuan_lpdk').on('click', '.cancel', function(e) {
                $('#modal_note_cancel').modal('show');
                $('#form_note_cancel input[name=id_trans_so_note_cancel]').val($(this).attr('data'));
            });

            $('#simpan_cancel').click(function(e) {
                bootbox.confirm("Apakah anda yakin ingin cancel data ini?", function(result) {
                    if (result) {
                        e.preventDefault();
                        var formData = new FormData();
                        var id = document.getElementById("id_trans_so_note_cancel").value;

                        formData.append('status_kredit', 'CANCEL');
                        formData.append('notes_cancel', document.getElementById("notes_cancel").value);
                        update_status(formData, id)
                            .done(function(res) {
                                console.log(res);
                                bootbox.alert('Data Berhasil Di Cancel', function() {
                                    load_data_lpdk();
                                    $('#batal').click();
                                })
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

                                bootbox.alert(error);
                            });
                    }
                });
            });

            //KLIK UPDATE PENJAMIN
            $('#form_penjamin').on('submit', function(e) {
                e.preventDefault();
                var id = $('input[id=id_penjamin_so]', this).val();
                var id_penjamin = $('input[id=id_penjamin]', this).val();
                var formData = new FormData();
                formData.append('nama_penjamin', $('input[name=edit_nama_penjamin]', this).val());
                formData.append('pasangan_penjamin', $('input[name=edit_nama_pas_penjamin]', this).val());

                update_penjamin(formData, id, id_penjamin)
                    .done(function(res) {
                        bootbox.alert('Data berhasil diubah', function() {
                            $('#form_penjamin')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_penjamin();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Upload gagal<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });

            // KLIK UPDATE JAMINAN SERTIFIKAT
            $('#form_jaminan').on('submit', function(e) {
                e.preventDefault();
                var id_so = $('input[id=id_jaminan_so]', this).val();
                var id = $('input[id=id_jaminan]', this).val();
                var formData = new FormData();
                formData.append('jenis_sertifikat', $('select[name=edit_jaminan]', this).val());
                formData.append('no_sertifikat', $('input[name=edit_no_sertifikat]', this).val());
                formData.append('nama_sertifikat', $('input[name=edit_nama_pemilik_sertifikat]', this).val());
                formData.append('nama_pas_sertifikat', $('input[name=edit_nama_pas_pemilik_sertifikat]', this).val());
                formData.append('hub_cadeb', $('select[name=edit_hubungan_cadeb]', this).val());
                formData.append('tgl_berlaku_shgb', $('input[name=edit_tgl_shgb]', this).val());
                formData.append('status_sertifikat', $('input[type=radio][name="edit_status_hidup[]"]', this).val());
                formData.append('status_pas_sertifikat', $('input[type=radio][name="edit_status_hidup_pas[]"]', this).val());

                ubah_sertifikat(formData, id, id_so)
                    .done(function(res) {
                        bootbox.alert('Data berhasil diubah', function() {
                            $('#form_jaminan')[0].reset();
                            $('#batal').click();
                            $('.close_deb').click();
                            load_data_jaminan();
                        })
                    }).fail(function(res) {
                        let html =
                            "<div width='100%' class='text-center'>" +
                            "<i class='fa fa-times fa-4x text-danger'></i><br><br>" +
                            "Data gagal diubah<br><br>" +
                            "<a id='batal' href='javascript:void(0)' class='text-primary' data-dismiss='modal'>Tutup</a><br><br>" +
                            "</div>";
                        $('#load_data').html(html);
                    })
            });


            load_lampiran_kk = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_lampiran({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        var html1 = [];
                        var a = [
                            '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_kk + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_kk.substr(32) + '</p> </a>'
                        ].join('\n');
                        html1.push(a);
                        $('#file_kk').html(html1);
                    })
                    .fail(function(response) {
                        $('#file_kk').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_npwp = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        var html1 = [];
                        var a = [
                            '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_npwp + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_npwp.substr(46) + '</p> </a>'
                        ].join('\n');
                        html1.push(a);
                        $('#file_npwp').html(html1);
                    })
                    .fail(function(response) {
                        $('#file_npwp').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_surat_nikah = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        var html1 = [];
                        var a = [
                            '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_nikah + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_surat_nikah.substr(33) + '</p></a>'
                        ].join('\n');
                        html1.push(a);
                        $('#file_surat_nikah').html(html1);
                    })
                    .fail(function(response) {
                        $('#file_surat_nikah').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_surat_cerai = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        var html1 = [];
                        var a = [
                            '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_cerai + '""><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_surat_cerai.substr(56) + '</p></a>'
                        ].join('\n');
                        html1.push(a);
                        $('#file_surat_cerai').html(html1);
                    })
                    .fail(function(response) {
                        $('#file_surat_cerai').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_surat_lahir = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        var html1 = [];
                        var a = [
                            '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_lahir + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_surat_lahir.substr(56) + '</p></a>'
                        ].join('\n');
                        html1.push(a);
                        $('#file_surat_lahir').html(html1);
                    })
                    .fail(function(response) {
                        $('#file_surat_lahir').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_surat_kematian = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        var html1 = [];
                        var a = [
                            '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_surat_kematian + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_surat_kematian.substr(56) + '</p></a>'
                        ].join('\n');
                        html1.push(a);
                        $('#file_surat_kematian').html(html1);
                    })
                    .fail(function(response) {
                        $('#file_surat_kematian').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_surat_ket_desa = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        var html1 = [];
                        var a = [
                            '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + data.lampiran[0].lampiran_sk_desa + '"><p style="font-size: 13px; font-weight: 400;">' + data.lampiran[0].lampiran_sk_desa.substr(56) + '</p></a>'
                        ].join('\n');
                        html1.push(a);
                        $('#file_surat_ket_desa').html(html1);
                    })
                    .fail(function(response) {
                        $('#file_surat_ket_desa').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_ktp_pem_sertifikat = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        urut_sertifikat = 0;
                        var html = [];
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.lampiran_ktp_sertifikat == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html.push(k);
                                $('#file_ktp_pem_sertifikat').html(html);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank" href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_ktp_sertifikat + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_ktp_sertifikat.substr(57) + '</p></a>',
                                ].join('\n');
                                html.push(k);
                                $('#file_ktp_pem_sertifikat').html(html);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#file_ktp_pem_sertifikat').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_ktp_pas_pem_sertifikat = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        urut_sertifikat = 0;
                        var html = [];
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.lampiran_ktp_pasangan_sertifikat == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html.push(k);
                                $('#file_ktp_pas_pem_sertifikat').html(html);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_ktp_pasangan_sertifikat + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_ktp_pasangan_sertifikat.substr(57) + '</p></a>',
                                ].join('\n');
                                html.push(k);
                                $('#file_ktp_pas_pem_sertifikat').html(html);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#file_ktp_pas_pem_sertifikat').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_sertifikat = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        urut_sertifikat = 0;
                        var html = [];
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.lampiran_sertifikat == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html.push(k);
                                $('#file_sertifikat').html(html);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_sertifikat + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_sertifikat.substr(57) + '</p></a>',
                                ].join('\n');
                                html.push(k);
                                $('#file_sertifikat').html(html);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#file_sertifikat').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_pbb = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        urut_sertifikat = 0;
                        var html = [];
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.lampiran_pbb == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html.push(k);
                                $('#file_pbb').html(html);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_pbb + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_pbb.substr(57) + '</p></a>',
                                ].join('\n');
                                html.push(k);
                                $('#file_pbb').html(html);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#file_pbb').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_imb = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        urut_sertifikat = 0;
                        var html = [];
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.lampiran_imb == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html.push(k);
                                $('#file_imb').html(html);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_imb + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.lampiran_imb.substr(57) + '</p></a>',
                                ].join('\n');
                                html.push(k);
                                $('#file_imb').html(html);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#file_imb').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_ajb_ppjb = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        urut_sertifikat = 0;
                        var html = [];
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.ajb_ppjb == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html.push(k);
                                $('#file_ajb_ppjb').html(html);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.ajb_ppjb + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.ajb_ppjb.substr(57) + '</p></a>',
                                ].join('\n');
                                html.push(k);
                                $('#file_ajb_ppjb').html(html);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#file_ajb_ppjb').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_ahli_waris = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        urut_sertifikat = 0;
                        var html = [];
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.ahli_waris == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html.push(k);
                                $('#file_ahli_waris').html(html);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.ahli_waris + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.ahli_waris.substr(57) + '</p></a>',
                                ].join('\n');
                                html.push(k);
                                $('#file_ahli_waris').html(html);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#file_ahli_waris').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_lampiran_aktahibah = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        urut_sertifikat = 0;
                        var html = [];
                        $.each(data.sertifikat, function(index, item) {
                            urut_sertifikat++;
                            if (item.akta_hibah == null) {
                                var k = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. Data tidak ada</p>'
                                ].join('\n');
                                html.push(k);
                                $('#file_akta_hibah').html(html);
                            } else {
                                var k = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.akta_hibah + '"><p style="font-size: 13px; font-weight: 400;">' + urut_sertifikat + '. ' + item.akta_hibah.substr(57) + '</p></a>',
                                ].join('\n');
                                html.push(k);
                                $('#file_akta_hibah').html(html);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#file_akta_hibah').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_ktp_penjamin = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];
                        var html3 = [];

                        urut_penjamin = 0;
                        $.each(data.penjamin, function(index, item) {
                            urut_penjamin++;
                            if (item.lampiran_ktp_penjamin == null) {
                                var c = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_penjamin + '. Data tidak ada</p>'
                                ].join('\n');
                                html3.push(c);
                                $('#file_ktp_pen').html(html3);
                            } else {
                                var c = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.lampiran_ktp_penjamin + '"><p style="font-size: 13px; font-weight: 400;">' + urut_penjamin + '. ' + item.lampiran_ktp_penjamin.substr(37) + '</p></a>',
                                ].join('\n');
                                html3.push(c);
                                $('#file_ktp_pen').html(html3);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#gambar_akta_hibah_p').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }
            load_buku_nikah_penjamin = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];
                        var html3 = [];

                        urut_penjamin = 0;
                        $.each(data.penjamin, function(index, item) {
                            urut_penjamin++;
                            if (item.buku_nikah_penjamin == null) {
                                var c = [
                                    '<p style="font-size: 13px; font-weight: 400;">' + urut_penjamin + '. Data tidak ada</p>'
                                ].join('\n');
                                html3.push(c);
                                $('#file_buku_nikah_pen').html(html3);
                            } else {
                                var c = [
                                    '<a class="example-image-link" target="_blank"  href="<?php echo $this->config->item('img_url') ?>' + item.buku_nikah_penjamin + '"><p style="font-size: 13px; font-weight: 400;">' + urut_penjamin + '. ' + item.buku_nikah_penjamin.substr(37) + '</p></a>',
                                ].join('\n');
                                html3.push(c);
                                $('#file_buku_nikah_pen').html(html3);
                            }
                        })
                    })
                    .fail(function(response) {
                        $('#gambar_akta_hibah_p').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_penjamin = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];
                        var htmlpenjamin = [];
                        var id_penjamin = {};
                        $.each(data.penjamin, function(index, item) {

                            var id_penjamin = [];
                            id_penjamin = item.id;
                            var jenis_kelamin_pen = "";

                            if (item.jenis_kelamin == 'L') {
                                jenis_kelamin_pen = 'LAKI-LAKI';
                            } else {
                                jenis_kelamin_pen = 'PEREMPUAN';
                            }

                            var tr = [
                                '<tr>',
                                '<td style="width:50px"><button type="button" class="btn btn-info btn-sm edit submit" data-toggle="modal" data-target="#modal_penjamin"data="' + item.id + '"><i class="fas fa-pencil-alt"></i></button></td>',
                                '<td style="width:200px"><input class="form-control sm" value="' + item.nama_penjamin + '" name="nama_penjamin[]" onkeyup="this.value = this.value.toUpperCase()"></td>',
                                '<td style="width:200px"><input class="form-control sm" value="' + item.pasangan_penjamin + '" name="pasangan_penjamin[]" onkeyup="this.value = this.value.toUpperCase()"></td>',
                            ].join('\n');
                            htmlpenjamin.push(tr);
                        })
                        $('#data_penjamin').html(htmlpenjamin);
                    })
                    .fail(function(response) {
                        $('#data_penjamin').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            load_data_jaminan = function() {
                var id = $('#form_pengajuan input[type=hidden][name=id_trans_so]').val();
                get_detail_lpdk({}, id)
                    .done(function(response) {
                        var data = response.data[0];

                        var htmljaminansertifikat = [];
                        var np = 0;
                        var na = 0;
                        var nc = 0;
                        var nh = 0;
                        var ncd = 0;
                        $.each(data.sertifikat, function(index, item) {
                            var shm_p = 'shm_p' + np++;
                            var shgb_p = 'shgb_p' + np++;
                            var datepicker = 'datepicker' + nc++;
                            var status_hidup_sert = 'status_hidup_sert' + ncd++;
                            var status_meninggal_sert = 'status_meninggal_sert' + ncd++;
                            var hub_cadeb_bapak = 'hub_cadeb_bapak' + ncd++;
                            var hub_cadeb_anak = 'hub_cadeb_anak' + ncd++;
                            var hub_cadeb_saudara_kandung = 'hub_cadeb_saudara_kandung' + ncd++;
                            var hub_cadeb_orang_lain = 'hub_cadeb_orang_lain' + ncd++;
                            // var status_hidup = 'status_hidup'+ nh++;
                            var tgl_berlaku_shgb = "";
                            if (item.tgl_berlaku_shgb == null) {
                                tgl_berlaku_shgb = '';
                            } else {
                                tgl_berlaku_shgb = item.tgl_berlaku_shgb;
                            }

                            var status_sertifikat_hidup = item.status_sertifikat;
                            if (status_sertifikat_hidup == 'Hidup') {
                                var status_sertifikat_hidup_checked = 'checked="checked"';
                            }
                            var status_sertifikat_meninggal = item.status_sertifikat;
                            if (status_sertifikat_meninggal == 'Meninggal Dunia') {
                                var status_sertifikat_meninggal_checked = 'checked="checked"';
                            }

                            var status_sertifikat_pas_hidup = item.status_pas_sertifikat;
                            if (status_sertifikat_pas_hidup == 'Hidup') {
                                var status_sertifikat_pas_hidup_checked = 'checked="checked"';
                            }
                            var status_sertifikat_pas_meninggal = item.status_pas_sertifikat;
                            if (status_sertifikat_pas_meninggal == 'Meninggal Dunia') {
                                var status_sertifikat_pas_meninggal_checked = 'checked="checked"';
                            }

                            var tr = [
                                '<tr>',
                                '<td style="width:50px"><button type="button" class="btn btn-info btn-sm edit submit" data-toggle="modal" data-target="#modal_penjamin"data="' + item.id + '"><i class="fas fa-pencil-alt"></i></button></td>',
                                '<td style="width:100px"><select name="jenis_sertifikat[]" class="form-control select2 select2-danger" style="width: 100%;"><option id="pilih_jaminan" value="' + item.jenis_sertifikat + '">' + item.jenis_sertifikat + '</option><option id="' + shm_p + '" value="SHM_p">SHM</option><option id="' + shgb_p + '" value="SHGB_p">SHGB</option></select></td>',
                                '<td style="width:200px"><input class="form-control" value="' + item.no_sertifikat + '" name="no_sertifikat[]"></td>',
                                '<td style="width:200px"><input class="form-control " value="' + item.nama_sertifikat + '" name="nama_sertifikat[]" onkeyup="this.value = this.value.toUpperCase()"><div style="height:19px"><input type="checkbox" value="Hidup" ' + status_sertifikat_hidup_checked + ' name="status_hidup[]" style="margin-top:4px"> <small>Hidup</small><input type="checkbox" ' + status_sertifikat_meninggal_checked + ' value="Meninggal Dunia" style="margin-left:26px;" name="status_hidup[]"> <small>Meninggal Dunia</small></div></td>',
                                '<td style="width:250px"><input class="form-control" value="' + item.nama_pas_sertifikat + '" name="nama_pas_sertifikat[]" onkeyup="this.value = this.value.toUpperCase()"><div style="height:19px"><input type="checkbox" ' + status_sertifikat_pas_hidup_checked + '  value="Hidup" name="status_hidup_pas[]" style="margin-top:4px"> <small>Hidup</small><input type="checkbox" ' + status_sertifikat_pas_meninggal_checked + ' value="Meninggal Dunia" id="" style="margin-left:26px;" name="status_hidup_pas[]"> <small>Meninggal Dunia</small></div></td>',
                                '<td style="width:193px"><div class="form-group"><select id="hub_cadeb[]" name="hub_cadeb[]" class="form-control select2 select2-danger" style="width: 100%;"><option value="' + item.hub_cadeb + '">' + item.hub_cadeb + '</option><option value="Pasangan">Pasangan</option><option value="Ibu">Ibu</option><option value="Bapak">Bapak</option><option value="Anak">Anak</option><option value="Saudara Kandung">Saudara Kandung</option><option value="Orang Lain">Orang Lain</option></select></td>',
                                '<td style="width:133px"><input class="form-control" value="' + tgl_berlaku_shgb + '" name="tgl_berlaku_shgb[]" data-date-format="dd-mm-yyyy"></td>',
                                // '<td style="width:133px"><input type="text" name="tgl_berlaku_shgb[]" class="form-control" id="' + datepicker + '" value="' + tgl_berlaku_shgb + '" data-date-format="dd-mm-yyyy"/></td>',
                                '</tr>'
                            ].join('\n');
                            htmljaminansertifikat.push(tr);
                            $(function() {
                                $("#datepicker0").datepicker();
                                $("#datepicker1").datepicker();
                                $("#datepicker2").datepicker();
                                $("#datepicker3").datepicker();
                                $("#datepicker4").datepicker();
                                $("#datepicker5").datepicker();
                            });


                        })
                        $('#data_jaminan_sertifikat').html(htmljaminansertifikat);
                    })
                    .fail(function(response) {
                        $('#data_jaminan_sertifikat').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                    });
            }

            $("#tampil_modal_ktp_penjamin").click(function() {
                $('#modal_ktp_pen').modal('show');
            });

            $("#tampil_modal_buku_nikah_penjamin").click(function() {
                $('#modal_buku_nikah_pen').modal('show');
            });

            $("#tampil_modal_ktp_pem_sertifikat").click(function() {
                $('#modal_ktp_pem_sertifikat').modal('show');
                $('#lamp_ktp_pem_sertifikat').prop('disabled', true);
            });

            $("#tampil_modal_ktp_pas_pem_sertifikat").click(function() {
                $('#modal_ktp_pas_pem_sertifikat').modal('show');
                $('#lamp_ktp_pas_pem_sertifikat').prop('disabled', true);
            });

            $('#form_notes_lain2').hide();
            $('#lain_lain_notaris').click(function(e) {
                if ($('#lain_lain_notaris').prop('checked')) {
                    $('#form_notes_lain2').show();
                } else {
                    $('#form_notes_lain2').hide();
                }
            })

            function click_detail() {
                $('#form_pengajuan .form-control').prop('disabled', true);
                $('.submit').hide();
            }
       
    </script>


</body>
</html>


