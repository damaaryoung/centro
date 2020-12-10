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
            td.details-control {
                background: url('../assets/dist/img/details_open.png') no-repeat center center;
                cursor: pointer;
            }

            tr.shown td.details-control {
                background: url('../assets/dist/img/details_close.png') no-repeat center center;
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
            .modal-backdrop {
                width: 100% !important;
                height: 100% !important;
            } #loadings {
                width: 100%;
                height: 100%;
                top: 200;
                left: 500;
                position: fixed;
                display: block;
                z-index: 99;
                text-align: center;
            }
            #loading-images {
                position: absolute;
                top: 35%;
                left: 35%;
                z-index: 100;
            }
        </style>
        <link href="<?php echo base_url('assets/dist/css/datepicker.min.css') ?>" rel="stylesheet" type="text/css">
        <script src="<?php echo base_url('assets/dist/js/datepicker.js') ?>"></script>


        <div id="lihat_data_credit" class="content-wrapper" style="padding-left: 15px; padding-right: 15px;">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Data LPDK</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active"></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section style="min-height: 700px;">
                <div class="card card-info">
                    <div class="card-header with-border">
                        <h3 class="card-title">
                            <div id="loadings">
                                <img id="loading-images" src="<?php echo base_url(); ?>assets/design/images/ajax-loader1.gif" alt="Loading..." />
                            </div>
                        </h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body text-center">  
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                    <div class="form-group row">
                                    
                                        <div class="col-sm-2">
                                            <label style="padding-top: 5px;" class="control-label" for="main_kode_kantor" style="text-align: left;">Kode Kantor</label>
                                        </div>
                                        <div class="col-sm-4">
                                            <select class="form-control form-control-sm select2" id="main_kode_kantor" name="main_kode_kantor" onchange='load_filter_data_lpdk()'>
                                            <?php foreach ($selectKodeKantor as $row) : ?>
                                                <option value="<?php echo $row['id'];?>"><?php echo $row['id'];?> - <?php echo $row['nama'];?> </option>
                                            <?php endforeach;?>

                                            </select>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        
                    </div>            
            </div>
            <!-- /.card -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="box-body table-responsive no-padding">
                                    <button class="btn btn-primary tambah" id="modal_pengajuan" style="margin-bottom: 9px;"><i class="fa fa-user-plus">Tambah</i></button>
                                    <table id="table_lpdk" class="table table-bordered table-hover table-sm" style="white-space: nowrap; width: 100%;">
                                        <thead style="font-size: 12px;" class="bg-danger">
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
                                                    Tanggal Selesai
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
                                        <tbody style="font-size: 12px" id="data_lpdk">
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
                        <h4 class="modal-title">Data Pengajuan LDK</h4>
                        <button type="button" title="Tutup" class="close close_deb" data-dismiss="modal" style="color: #ff0c17" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card card-info">
                                <div class="card-header with-border">
                                <h3 class="card-title"></h3>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body text-center">  
                                    <div class="row">
                                        <div class="col-md-12 mx-auto">
                                                <div class="form-group row">
                                                
                                                    <div class="col-sm-2">
                                                        <label style="padding-top: 5px;" class="control-label" for="main_kode_kantor_tambah" style="text-align: left;">Kode Kantor</label>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <select class="form-control form-control-sm select2" id="main_kode_kantor_tambah" name="main_kode_kantor_tambah" onchange='load_pengajuan_filter_data_lpdk()'>
                                                        <?php foreach ($selectKodeKantor as $row) : ?>
                                                            <option value="<?php echo $row['id'];?>"><?php echo $row['id'];?> - <?php echo $row['nama'];?> </option>
                                                        <?php endforeach;?>

                                                        </select>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    
                                </div>            
                        </div>
                        <!-- /.card -->                        
                        <div class="card">
                            <div class="card-body">
                                <div class="box-body table-responsive no-padding">
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
                    <div class="modal-footer justify-content-between">
                        <button type="button" id="close_pengajuan" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade in" id="modal_tambah_pengajuan_lpdk" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tambah LPDK</h5>
                        <button type="button" title="Tutup" class="close" data-dismiss="modal" style="color: #ff0c17" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="height:500px; overflow-y:scroll">
                        <form id="form_pengajuan">
                            <input type="hidden" name="id_trans_so" id="id_trans_so">
                            <input type="hidden" value="" name="edit" id="edit">
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
                                <div class="card-header" id="label_request_by">
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card card-primary card-outline card-outline-tabs" style="border-top: 3px solid #dc3545;">
                                                <div class="card-header p-0 border-bottom-0">
                                                    <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                                                        <li class="nav-item">
                                                            <a class="nav-link active" id="custom-tabs-three-identitas-debitur-tab" data-toggle="pill" href="#custom-tabs-three-identitas-debitur" role="tab" aria-controls="custom-tabs-three-identitas-debitur" aria-selected="true">Identitas Debitur</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="custom-tabs-three-jaminan-tab" data-toggle="pill" href="#custom-tabs-three-jaminan" role="tab" aria-controls="custom-tabs-three-jaminan" aria-selected="false">Jaminan</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="custom-tabs-three-identitas-orang-tua-tab" data-toggle="pill" href="#custom-tabs-three-identitas-orang-tua" role="tab" aria-controls="custom-tabs-three-identitas-orang-tua" aria-selected="false">Identitas Orang Tua</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="custom-tabs-three-identitas-penjamin-tab" data-toggle="pill" href="#custom-tabs-three-identitas-penjamin" role="tab" aria-controls="custom-tabs-three-identitas-penjamin" aria-selected="false">Identitas Penjamin</a>
                                                        </li>
                                                        <li class="nav-item">
                                                            <a class="nav-link" id="custom-tabs-three-identitas-penjual-tab" data-toggle="pill" href="#custom-tabs-three-identitas-penjual" role="tab" aria-controls="custom-tabs-three-identitas-penjual" aria-selected="false">Identitas Penjual</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="card-body">
                                                    <div class="tab-content" id="custom-tabs-three-tabContent">
                                                        <div class="tab-pane fade show active" id="custom-tabs-three-identitas-debitur" role="tabpanel" aria-labelledby="custom-tabs-three-identitas-debitur-tab">
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">KTP Debitur / Resi KTP :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_ktp_deb" name="ktp_deb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_ktp_deb" name="ktp_deb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_ktp_deb" name="ktp_deb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_ktp_deb" class="form-control" placeholder="Keterangan KTP Debitur / Resi & KTP Lama">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">KTP Pasangan / Resi KTP Pasangan :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_ktp_pas" name="ktp_deb_pas"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_ktp_pas" name="ktp_deb_pas" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_ktp_pas" name="ktp_deb_pas"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_ktp_deb_pas" class="form-control" placeholder="Keterangan KTP Pasangan / Resi & KTP Lama">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Kartu Keluarga / Resi KK :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_kk_deb" name="kk_deb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_kk_deb" name="kk_deb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_kk_deb" name="kk_deb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_kk_deb" class="form-control" placeholder="Keterangan Kartu Keluarga / Resi KK">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte / Surat Nikah :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_nikah_deb" name="akte_nikah_deb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_nikah_deb" name="akte_nikah_deb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_nikah_deb" name="akte_nikah_deb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_nikah_deb" class="form-control" placeholder="Keterangan Akte / Surat Nikah">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte / Surat Cerai / Surat Keputusan Pengadilan :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_cerai_deb" name="akte_cerai_deb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_cerai_deb" name="akte_cerai_deb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_cerai_deb" name="akte_cerai_deb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_cerai_deb" class="form-control" placeholder="Keterangan Akte / Surat Cerai / Surat Keputusan Pengadilan">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte Lahir / Surat Kenal Lahir :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_lahir_deb" name="akte_lahir_deb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_lahir_deb" name="akte_lahir_deb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_lahir_deb" name="akte_lahir_deb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_lahir_deb" class="form-control" placeholder="Keterangan Akte Lahir / Surat Kenal Lahir">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Surat Kematian :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_kematian_deb" name="akte_kematian_deb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_kematian_deb" name="akte_kematian_deb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_kematian_deb" name="akte_kematian_deb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_kematian_deb" class="form-control" placeholder="Keterangan Surat Kematian">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">NPWP :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_npwp_deb" name="npwp_deb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_npwp_deb" name="npwp_deb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_npwp_deb" name="npwp_deb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_npwp_deb" class="form-control" placeholder="Keterangan NPWP">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Surat Keterangan Desa (PMI) :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_skd_deb" name="skd_deb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_skd_deb" name="skd_deb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_skd_deb" name="skd_deb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_skd_deb" class="form-control" placeholder="Keterangan Surat Keterangan Desa (PMI)">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="custom-tabs-three-identitas-orang-tua" role="tabpanel" aria-labelledby="custom-tabs-three-identitas-orang-tua-tab">
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Foto Copy KTP Orang Tua :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_fotocopy_ktp_ortu" name="fotocopy_ktp_ortu"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_fotocopy_ktp_ortu" name="fotocopy_ktp_ortu" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_fotocopy_ktp_ortu" name="fotocopy_ktp_ortu"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_fotocopy_ktp_ortu" class="form-control" placeholder="Keterangan Foto Copy KTP Orang Tua">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Foto Copy KK Orang Tua :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_fotocopy_kk_ortu" name="fotocopy_kk_ortu"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_fotocopy_kk_ortu" name="fotocopy_kk_ortu" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_fotocopy_kk_ortu" name="fotocopy_kk_ortu"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_fotocopy_kk_ortu" class="form-control" placeholder="Keterangan Foto Copy KK Orang Tua">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">PG (Ortu & Saudara) :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_pg_ortu" name="pg_ortu"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_pg_ortu" name="pg_ortu" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_pg_ortu" name="pg_ortu"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_pg_ortu" class="form-control" placeholder="Keterangan PG (Ortu & Saudara)">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte / Surat Nikah Orang Tua :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_nikah_ortu" name="akte_nikah_ortu"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_nikah_ortu" name="akte_nikah_ortu" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_nikah_ortu" name="akte_nikah_ortu"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_nikah_ortu" class="form-control" placeholder="Keterangan Akte / Surat Nikah Orang Tua">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Surat Keterangan Waris (PM2) :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_surat_ket_waris_ortu" name="surat_ket_waris_ortu"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_surat_ket_waris_ortu" name="surat_ket_waris_ortu" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_surat_ket_waris_ortu" name="surat_ket_waris_ortu"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_surat_ket_waris_ortu" class="form-control" placeholder="KeteranganSurat Keterangan Waris (PM2)">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte Lahir Pewaris :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_lahir_pewaris_ortu" name="akte_lahir_pewaris_ortu"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_lahir_pewaris_ortu" name="akte_lahir_pewaris_ortu" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_lahir_pewaris_ortu" name="akte_lahir_pewaris_ortu"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_lahir_pewaris_ortu" class="form-control" placeholder="Keterangan Akte Lahir Pewaris">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Surat Putusan Pengadilan Untuk Anak Dibawah Umur :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_surat_putusan_anak_dibawahumur_ortu" name="surat_putusan_anak_dibawahumur_ortu"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_surat_putusan_anak_dibawahumur_ortu" name="surat_putusan_anak_dibawahumur_ortu" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_surat_putusan_anak_dibawahumur_ortu" name="surat_putusan_anak_dibawahumur_ortu"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_surat_putusan_anak_dibawahumur_ortu" class="form-control" placeholder="Keterangan Surat Putusan Pengadilan Untuk Anak Dibawah Umur">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="custom-tabs-three-jaminan" role="tabpanel" aria-labelledby="custom-tabs-three-jaminan-tab">
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">SHM / SHGB (Tidak Expired) :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_shm_shgb" name="shm_shgb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_shm_shgb" name="shm_shgb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_shm_shgb" name="shm_shgb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_shm_shgb" class="form-control" placeholder="Keterangan SHM / SHGB (Tidak Expired)">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">IMB / Foto Copy IMB :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_imb" name="imb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_imb" name="imb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_imb" name="imb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_imb" class="form-control" placeholder="Keterangan IMB / Foto Copy IMB">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">PBB Asli Terakhir :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_pbb" name="pbb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_pbb" name="pbb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_pbb" name="pbb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_pbb" class="form-control" placeholder="Keterangan PBB Asli Terakhir">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">STT & PBB 10 Tahun Terakhir (Untuk Peningkatan hak/AJB) :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_sttpbb" name="sttpbb"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_sttpbb" name="sttpbb" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_sttpbb" name="sttpbb"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_sttpbb" class="form-control" placeholder="Keterangan STT & PBB 10 Tahun Terakhir (Untuk Peningkatan hak/AJB)">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="custom-tabs-three-identitas-penjual" role="tabpanel" aria-labelledby="custom-tabs-three-identitas-penjual-tab">
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">KTP Penjual / Resi KTP :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_ktp_penjual" name="ktp_penjual"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_ktp_penjual" name="ktp_penjual" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_ktp_penjual" name="ktp_penjual"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_ktp_penjual" class="form-control" placeholder="Keterangan KTP Penjual / Resi & KTP Lama">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">KTP Pasangan / Resi KTP Pasangan :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_ktp_penjual_pas" name="ktp_penjual_pas"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_ktp_penjual_pas" name="ktp_penjual_pas" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_ktp_penjual_pas" name="ktp_penjual_pas"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_ktp_penjual_pas" class="form-control" placeholder="Keterangan KTP Pasangan / Resi & KTP Lama">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Kartu Keluarga / Resi KK :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_kk_penjual" name="kk_penjual"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_kk_penjual" name="kk_penjual" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_kk_penjual" name="kk_penjual"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_kk_penjual" class="form-control" placeholder="Keterangan Kartu Keluarga / Resi KK">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte / Surat Nikah :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_nikah_penjual" name="akte_nikah_penjual"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_nikah_penjual" name="akte_nikah_penjual" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_nikah_penjual" name="akte_nikah_penjual"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_nikah_penjual" class="form-control" placeholder="Keterangan Akte / Surat Nikah">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte / Surat Cerai / Surat Keputusan Pengadilan :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_cerai_penjual" name="akte_cerai_penjual"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_cerai_penjual" name="akte_cerai_penjual" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_cerai_penjual" name="akte_cerai_penjual"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_cerai_penjual" class="form-control" placeholder="Keterangan Akte / Surat Cerai / Surat Keputusan Pengadilan">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte Lahir / Surat Kenal Lahir :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_lahir_penjual" name="akte_lahir_penjual"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_lahir_penjual" name="akte_lahir_penjual" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_lahir_penjual" name="akte_lahir_penjual"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_lahir_penjual" class="form-control" placeholder="Keterangan Akte Lahir / Surat Kenal Lahir">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Surat Kematian :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_kematian_penjual" name="akte_kematian_penjual"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_kematian_penjual" name="akte_kematian_penjual" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_kematian_penjual" name="akte_kematian_penjual"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_kematian_penjual" class="form-control" placeholder="Keterangan Surat Kematian">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">NPWP :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_npwp_penjual" name="npwp_penjual"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_npwp_penjual" name="npwp_penjual" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_npwp_penjual" name="npwp_penjual"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_npwp_penjual" class="form-control" placeholder="Keterangan NPWP">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Surat Keterangan Desa (PMI) :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_skd_penjual" name="skd_penjual"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_skd_penjual" name="skd_penjual" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_skd_penjual" name="skd_penjual"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_skd_penjual" class="form-control" placeholder="Keterangan Surat Keterangan Desa (PMI)">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade" id="custom-tabs-three-identitas-penjamin" role="tabpanel" aria-labelledby="custom-tabs-three-identitas-penjamin-tab">
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">KTP Penjamin / Resi KTP :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_ktp_penjamin" name="ktp_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_ktp_penjamin" name="ktp_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_ktp_penjamin" name="ktp_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_ktp_penjamin" class="form-control" placeholder="Keterangan KTP Penjamin / Resi & KTP Lama">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">KTP Pasangan / Resi KTP Pasangan :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_ktp_pas_penjamin" name="ktp_pas_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_ktp_pas_penjamin" name="ktp_pas_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_ktp_pas_penjamin" name="ktp_pas_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_ktp_pas_penjamin" class="form-control" placeholder="Keterangan KTP Pasangan / Resi & KTP Lama">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Kartu Keluarga / Resi KK :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_kk_penjamin" name="kk_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_kk_penjamin" name="kk_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_kk_penjamin" name="kk_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_kk_penjamin" class="form-control" placeholder="Keterangan Kartu Keluarga / Resi KK">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte / Surat Nikah :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_nikah_penjamin" name="akte_nikah_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_nikah_penjamin" name="akte_nikah_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_nikah_penjamin" name="akte_nikah_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_nikah_penjamin" class="form-control" placeholder="Keterangan Akte / Surat Nikah">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte / Surat Cerai / Surat Keputusan Pengadilan :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_cerai_penjamin" name="akte_cerai_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_cerai_penjamin" name="akte_cerai_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_cerai_penjamin" name="akte_cerai_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_cerai_penjamin" class="form-control" placeholder="Keterangan Akte / Surat Cerai / Surat Keputusan Pengadilan">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Akte Lahir / Surat Kenal Lahir :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_lahir_penjamin" name="akte_lahir_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_lahir_penjamin" name="akte_lahir_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_lahir_penjamin" name="akte_lahir_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_lahir_penjamin" class="form-control" placeholder="Keterangan Akte Lahir / Surat Kenal Lahir">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Surat Kematian :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_akte_kematian_penjamin" name="akte_kematian_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_akte_kematian_penjamin" name="akte_kematian_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_akte_kematian_penjamin" name="akte_kematian_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_akte_kematian_penjamin" class="form-control" placeholder="Keterangan Surat Kematian">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">NPWP :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_npwp_penjamin" name="npwp_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_npwp_penjamin" name="npwp_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_npwp_penjamin" name="npwp_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_npwp_penjamin" class="form-control" placeholder="Keterangan NPWP">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-md-3">
                                                                        <small style="font-weight: 700;">Surat Keterangan Desa (PMI) :</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="Ya" id="ya_skd_penjamin" name="skd_penjamin"> <small>Ya</small>
                                                                    </div>
                                                                    <div class="col-xs-1">
                                                                        <input type="radio" value="Tidak" id="tidak_skd_penjamin" name="skd_penjamin" checked="checked"> <small>Tidak</small>
                                                                    </div>
                                                                    <div class="col-sm-1">
                                                                        <input type="radio" value="TBO" id="tbo_skd_penjamin" name="skd_penjamin"> <small>TBO</small>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <input type="text" name="ket_skd_penjamin" class="form-control" placeholder="Keterangan Surat Keterangan Desa (PMI)">
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
                            <div class="form-group">
                                <input type="hidden" value="" name="idx">
                                <div class="btn_approve_pengajuan_caa">
                                    <button type="submit" class="btn btn-primary btn-sm submit" style="float: right;">Simpan</button>
                                    <a href="javascript:void(0)" data-dismiss="modal" class="btn btn-danger btn-sm close_deb" style="float: right; margin-right: 4px">Batal</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

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

                                <div class="input-group">
                                    <textarea type="file" name="notes_progress" class="form-control" style="height: 188px"></textarea>
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
        //GET LAMPIRAN SETELAH EDIT
        get_lampiran = function(opts, id) {
            var url = '<?php echo config_item('api_url') ?>api/master/lpdk/detail/' + id;
            var data = opts;

            return $.ajax({
                // type : 'GET',
                url: url,
                data: data,
                dataSrc: "",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
        }

        get_produk = function(opts) {
            var url = '<?php echo $this->config->item('api_url'); ?>produk';
            return $.ajax({
                type: 'GET',
                url: url
            });
        }

        //GET DATA PENGAJUAN
        get_pengajuan = function(opts, id) {
            var url = '<?php echo config_item('api_url') ?>api/master/lpdk/statusQueueReturn';
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
                beforeSend: function() {
                    // let html =
                    //             "<div width='100%' class='text-center'>"+
                    //                 "<i class='fa fa-spinner fa-spin fa-4x text-danger'></i><br><br>"+
                    //                 "<a id='batal' href='javascript:void(0)' class='text-primary batal' data-dismiss='modal'>Batal</a>"+

                    //             "</div>";
                    // $('#data_pengajuan').html(html);
                    // $('#modal_load_data').modal('show');
                },
            });
        }
        get_filter_pengajuan = function(opts, id) {
            var main_kode_kantor_tambah = $('#main_kode_kantor_tambah').val();
            var url = '<?php echo config_item('api_url') ?>api/master/lpdk/statusQueueReturn/centro?cabang=' + main_kode_kantor_tambah;
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
                beforeSend: function() {
                    // let html =
                    //             "<div width='100%' class='text-center'>"+
                    //                 "<i class='fa fa-spinner fa-spin fa-4x text-danger'></i><br><br>"+
                    //                 "<a id='batal' href='javascript:void(0)' class='text-primary batal' data-dismiss='modal'>Batal</a>"+

                    //             "</div>";
                    // $('#data_pengajuan').html(html);
                    // $('#modal_load_data').modal('show');
                },
            });
        }
        get_detail_pengajuan = function(opts, id) {
            var url = '<?php echo config_item('api_url') ?>api/master/lpdk/' + id;
            var data = opts;

            return $.ajax({
                // type : 'GET',
                url: url,
                data: data,
                dataSrc: "",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
        }

        //GET DATA LPDK
        get_lpdk = function(opts, id) {
            var url = '<?php echo config_item('api_url') ?>api/master/lpdk/statuskre';
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
        /// filter lpdk
        get_filter_lpdk = function(opts, id) {
            var main_kode_kantor = $('#main_kode_kantor').val();
            var url = '<?php echo config_item('api_url') ?>api/master/lpdk/statuskre/centro?cabang=' + main_kode_kantor;
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

        //GET DATA LPDK
        get_detail_lpdk = function(opts, id) {
            var url = '<?php echo config_item('api_url') ?>api/master/lpdk/hasil/' + id;
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

        get_detail_lampiran = function(opts, id) {
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

        //Tambah LPDK
        tambah_lpdk = function(opts, id) {
            var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/hasil/' + id;
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
                },
            });
        }

        //UPDATE LPDK
        update_lpdk = function(opts, id) {
            var url = '<?php echo $this->config->item('api_url'); ?>api/master/lpdk/hasil/update/' + id;
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
                        "<a id='batal' href='javascript:void(0)' class='text-primary batal' data-dismiss='modal'>Batal</a>" +
                        "</div>";
                    $('#load_data').html(html);
                    $('#modal_load_data').modal('show');
                },
            });
        }

        Return_pengajuan = function(opts, id) {
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

        function hide_lampiran() {
            $('#lamp_data_nasabah').hide();
            $('#lamp_data_jaminan').hide();
        }
        hide_lampiran();

        function hide_pem_sertifikat() {
            $('#form_ktp_pemilik_sertifikat').hide();
            $('#form_ktp_pasangan_pemilik_sertifikat').hide();
        }

        function showpen(select) {
            var select = document.getElementById("hubungan_cadeb");
            if (select.value == '') {
                hide_pem_sertifikat();
            } else {
                $('#form_ktp_pemilik_sertifikat').show();
                $('#form_ktp_pasangan_pemilik_sertifikat').show();
            }
        }

        function rubah(angka) {
            var reverse = angka.toString().split('').reverse().join(''),
                ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');
            return ribuan;
        }

        var group_menu = '<?php echo $nama_user['data']['group_menu'] ?>';
        if (group_menu == 'PUSAT' || group_menu == 'IT') {
            $('#modal_pengajuan').show();
        } else {
            $('#modal_pengajuan').hide();
        }

        load_data_lpdk = function() {
            get_lpdk()
                .done(function(response) {
                    $('#loadings').hide();
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
                        $('#data_lpdk').html(tr);
                        return;
                    }

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
                            '<td>' + b + '</td>' +
                            '<td>' + data.updated_at + '</td>' +
                            '<td>JULIAN FRANDES SAPUTRA</td>' +
                            '<td> <p ' + notes_progress_hide0 + ' >' + data.notes_progress[0] + '</p> <br><p ' + notes_counter_hide0 + ' >' + data.notes_counter[0] + '</p><br> <p ' + notes_progress_hide1 + ' >' + data.notes_progress[1] + '</p> <br><p ' + notes_counter_hide1 + ' >' + data.notes_counter[1] + '</p><br> <p ' + notes_progress_hide2 + ' >' + data.notes_progress[2] + '</p> <br><p ' + notes_counter_hide2 + ' >' + data.notes_counter[2] + '</p><br><b ' + notes_cancel_hide + '> Note Cancel:</b><br><b ' + notes_cancel_hide + ' > ' + data.notes_cancel + ' </br></td > ' +
                            '</tr>' +
                            '</table>'


                    }

                    $.each(data, function(index, item) {
                        var nama_user = '<?php echo $nama_user['data']['nama'] ?>';
                        var group_menu = '<?php echo $nama_user['data']['group_menu'] ?>';
                        console.log(group_menu);
                        if (nama_user == 'JULIAN FRANDES SAPUTRA' || group_menu == 'IT' || group_menu == 'PUSAT') {
                            var btndisable = "";
                        } else {
                            var btndisable = "disabled";
                        }

                        var status = item.status_kredit;
                        if (status == 'CANCEL') {
                            var disabled = "";
                        } else {
                            var disabled = "disabled";
                        }

                        if (status == 'ON-PROGRESS') {
                            var disabled_real = "";
                        } else {
                            var disabled_real = "disabled";
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
                            '<td>' + item.tanggal_selesai[0].created_at + '</td>',
                            '<td>' + item.nomor_so + '</td>',
                            '<td>' + item.nama_so + '</td>',
                            '<td>' + item.request_by + '</td>',
                            '<td>' + item.nama_cabang[0] + '</td>',
                            '<td>' + item.nama_debitur + '</td>',
                            '<td>' + plafon + '</td>',
                            '<td>' + item.tenor + '</td>',
                            '<td>' + item.sla + '</td>',
                            '<td style="width: 120px;">',
                            '<form method="post" target="_blank" action="<?php echo base_url() . 'index.php/report/Lpdk' ?>"> <button type="button" ' + btndisable + ' class="btn btn-info btn-sm edit" title="Ubah LPDK" ' + disabled_edit + '  data-target="#update" data="' + item.trans_so + '"><i class="fas fa-pencil-alt"></i></button>',
                            '<button type="button" class="btn btn-warning btn-sm edit" title="Detail LPDK" onclick="click_detail()" ' + btndisable + ' data-target="#update" data="' + item.trans_so + '"><i style="color: #fff;" class="fas fa-eye"></i></button>',
                            '<input type="hidden" name ="id" value="' + item.trans_so + '"><button type="submit" class="btn btn-success btn-sm" title="Cetak LPDK"><i class="far fa-file-pdf"></i></a></form>',
                            '</td>',
                            '</tr>'
                        ].join('\n');
                        html.push(tr);
                    });
                    $('#data_lpdk').html(html);

                    var table = $('#table_lpdk').DataTable({
                        "pageLength": 10,
                        "order": [
                            [0, "asc"]
                        ],
                        "paging": true,
                        "retrieve": true,
                        "lengthChange": true,
                        "searching": true,
                        "ordering": true,
                        "info": true,
                        "autoWidth": false,
                    });

                    $('#table_lpdk tbody').on('click', 'td.details-control', function() {
                        var tr = $(this).closest('tr');
                        var row = table.row(tr);
                        var id = $(this).attr('data');
                        get_detail_lampiran({}, id)
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
                    $('#data_lpdk').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                });
        }
        load_data_lpdk();
        load_filter_data_lpdk = function() {
            $('#loadings').show();
            $('#data_lpdk').html('');
            $('#table_lpdk').DataTable().clear();
            $('#table_lpdk').DataTable().destroy();
            get_filter_lpdk()
                .done(function(response) {
                    $('#loadings').hide();
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
                        $('#data_lpdk').html(tr);
                        return;
                    }

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
                            '<td>' + b + '</td>' +
                            '<td>' + data.updated_at + '</td>' +
                            '<td>JULIAN FRANDES SAPUTRA</td>' +
                            '<td> <p ' + notes_progress_hide0 + ' >' + data.notes_progress[0] + '</p> <br><p ' + notes_counter_hide0 + ' >' + data.notes_counter[0] + '</p><br> <p ' + notes_progress_hide1 + ' >' + data.notes_progress[1] + '</p> <br><p ' + notes_counter_hide1 + ' >' + data.notes_counter[1] + '</p><br> <p ' + notes_progress_hide2 + ' >' + data.notes_progress[2] + '</p> <br><p ' + notes_counter_hide2 + ' >' + data.notes_counter[2] + '</p><br><b ' + notes_cancel_hide + '> Note Cancel:</b><br><b ' + notes_cancel_hide + ' > ' + data.notes_cancel + ' </br></td > ' +
                            '</tr>' +
                            '</table>'


                    }

                    $.each(data, function(index, item) {
                        var nama_user = '<?php echo $nama_user['data']['nama'] ?>';
                        var group_menu = '<?php echo $nama_user['data']['group_menu'] ?>';
                        console.log(group_menu);
                        if (nama_user == 'JULIAN FRANDES SAPUTRA' || group_menu == 'IT' || group_menu == 'PUSAT') {
                            var btndisable = "";
                        } else {
                            var btndisable = "disabled";
                        }

                        var status = item.status_kredit;
                        if (status == 'CANCEL') {
                            var disabled = "";
                        } else {
                            var disabled = "disabled";
                        }

                        if (status == 'ON-PROGRESS') {
                            var disabled_real = "";
                        } else {
                            var disabled_real = "disabled";
                        }

                        if (status == 'REALISASI') {
                            var disabled_edit = "disabled";
                        } else {
                            var disabled_edit = "";
                        }
                        var plafon = (rubah(item.plafon));
                        if(item.tanggal_selesai[0] == null){
                            var tanggal_selesai_created_at = '';
                        }else{
                            var tanggal_selesai_created_at = item.tanggal_selesai[0].created_at;
                        }
                        var tr = [
                            '<tr>',
                            '<td title="Detail" class="details-control" data="' + item.trans_so + '"></td>',
                            '<td>' + item.status_kredit + '</td>',
                            '<td>' + item.created_at + '</td>',
                            '<td>' + tanggal_selesai_created_at + '</td>',
                            '<td>' + item.nomor_so + '</td>',
                            '<td>' + item.nama_so + '</td>',
                            '<td>' + item.request_by + '</td>',
                            '<td>' + item.nama_cabang[0] + '</td>',
                            '<td>' + item.nama_debitur + '</td>',
                            '<td>' + plafon + '</td>',
                            '<td>' + item.tenor + '</td>',
                            '<td>' + item.sla + '</td>',
                            '<td style="width: 120px;">',
                            '<form method="post" target="_blank" action="<?php echo base_url() . 'index.php/report/Lpdk' ?>"> <button type="button" ' + btndisable + ' class="btn btn-info btn-sm edit" title="Ubah LPDK" ' + disabled_edit + '  data-target="#update" data="' + item.trans_so + '"><i class="fas fa-pencil-alt"></i></button>',
                            '<button type="button" class="btn btn-warning btn-sm edit" title="Detail LPDK" onclick="click_detail()" ' + btndisable + ' data-target="#update" data="' + item.trans_so + '"><i style="color: #fff;" class="fas fa-eye"></i></button>',
                            '<input type="hidden" name ="id" value="' + item.trans_so + '"><button type="submit" class="btn btn-success btn-sm" title="Cetak LPDK"><i class="far fa-file-pdf"></i></a></form>',
                            '</td>',
                            '</tr>'
                        ].join('\n');
                        html.push(tr);
                    });
                    $('#data_lpdk').html(html);

                    var table = $('#table_lpdk').DataTable({
                        "pageLength": 10,
                        "order": [
                            [0, "asc"]
                        ],
                        "paging": true,
                        "retrieve": true,
                        "lengthChange": true,
                        "searching": true,
                        "ordering": true,
                        "info": true,
                        "autoWidth": false,
                    });

                    $('#table_lpdk tbody').on('click', 'td.details-control', function() {
                        var tr = $(this).closest('tr');
                        var row = table.row(tr);
                        var id = $(this).attr('data');
                        get_detail_lampiran({}, id)
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
                    $('#data_lpdk').html('<tr><td colspan="4">Tidak ada data</td></tr>');
                });
        }

        $("#modal_pengajuan").click(function() {
            $("#modal_data_pengajuan").modal('show');
            //DATA  LPDK

            load_pengajuan_data_lpdk = function() {
                get_pengajuan()
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

                            // var notes_cancel = data.notes_cancel;
                            // if (notes_cancel == '') {
                            //     var notes_cancel_hide = "hidden";
                            // } else
                            // if (notes_cancel == null) {
                            //     var notes_cancel_hide = "hidden";
                            // } else {
                            //     var notes_cancel_hide = "";
                            // }
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
                                '<td>' + b + '</td>' +
                                '<td>' + data.updated_at + '</td>' +
                                '<td>' + data.request_by + '</td>' +
                                '<td> <p ' + notes_progress_hide0 + ' >' + data.notes_progress[0] + '</p> <br><p ' + notes_counter_hide0 + ' >' + data.notes_counter[0] + '</p><br> <p ' + notes_progress_hide1 + ' >' + data.notes_progress[1] + '</p> <br><p ' + notes_counter_hide1 + ' >' + data.notes_counter[1] + '</p><br> <p ' + notes_progress_hide2 + ' >' + data.notes_progress[2] + '</p> <br><p ' + notes_counter_hide2 + ' >' + data.notes_counter[2] + '</p></td > ' +
                                '</tr>' +
                                '</table>'


                        }

                        $.each(data, function(index, item) {
                            var status = item.status_kredit;
                            if (status == 'CANCEL') {
                                var disabled = "";
                            } else {
                                var disabled = "disabled";
                            }

                            if (status == 'ON-PROGRESS') {
                                var disabled_real = "";
                            } else {
                                var disabled_real = "disabled";
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
                                '<td style="width: 50px;">',
                                '<form method="post" target="_blank" action="<?php echo base_url() . 'index.php/report/Pengajuan_lpdk' ?>"><button type="button" class="btn btn-info btn-sm edit" title="Tambah LPDK" ' + disabled_edit + '  data-target="#update" data="' + item.trans_so + '"><i class="fas fa-plus-circle"></i></button>',
                                '<button type="button"  class="btn btn-warning btn-sm note" title="Note Return" style="background-color: #6610f2; border-color: #6f42c1;" data="' + item.trans_so + '"><i style="color: #fff;" class="fas fa-sticky-note"></i></button>',
                                '<input type="hidden" name ="id" value="' + item.trans_so + '"><button type="submit" class="btn btn-success btn-sm" title="Cetak Pengajuan"><i class="far fa-file-pdf"></i></a></form>',
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
                            "paging": true,
                            "retrieve": true,
                            "lengthChange": true,
                            "searching": true,
                            "ordering": true,
                            "info": true,
                            "autoWidth": false,
                        });

                        $('#table_pengajuan_lpdk tbody').on('click', 'td.details-control', function() {
                            var tr = $(this).closest('tr');
                            var row = table.row(tr);
                            var id = $(this).attr('data');
                            get_detail_lampiran({}, id)
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
            load_pengajuan_data_lpdk();
        })
        load_pengajuan_filter_data_lpdk = function() {
                $('#data_pengajuan_lpdk').html('');
                $('#table_pengajuan_lpdk').DataTable().clear();
                $('#table_pengajuan_lpdk').DataTable().destroy();
                get_filter_pengajuan()
                    .done(function(response) {
                        var data = response.data;
                        var data_detail = response;
                        var html = [];
                        var no = 0;
                        if (data.length === 0) {
                            var tr = [
                                '<tr valign="midle">',
                                '<td colspan="4">No Data, Bitch!</td>',
                                '</tr>'
                            ].join('\n');
                            $('#data_pengajuan_lpdk').html(tr);
                            return;
                        }

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

                            // var notes_cancel = data.notes_cancel;
                            // if (notes_cancel == '') {
                            //     var notes_cancel_hide = "hidden";
                            // } else
                            // if (notes_cancel == null) {
                            //     var notes_cancel_hide = "hidden";
                            // } else {
                            //     var notes_cancel_hide = "";
                            // }
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
                                '<td>' + b + '</td>' +
                                '<td>' + data.updated_at + '</td>' +
                                '<td>' + data.request_by + '</td>' +
                                '<td> <p ' + notes_progress_hide0 + ' >' + data.notes_progress[0] + '</p> <br><p ' + notes_counter_hide0 + ' >' + data.notes_counter[0] + '</p><br> <p ' + notes_progress_hide1 + ' >' + data.notes_progress[1] + '</p> <br><p ' + notes_counter_hide1 + ' >' + data.notes_counter[1] + '</p><br> <p ' + notes_progress_hide2 + ' >' + data.notes_progress[2] + '</p> <br><p ' + notes_counter_hide2 + ' >' + data.notes_counter[2] + '</p></td > ' +
                                '</tr>' +
                                '</table>'


                        }

                        $.each(data, function(index, item) {
                            var status = item.status_kredit;
                            if (status == 'CANCEL') {
                                var disabled = "";
                            } else {
                                var disabled = "disabled";
                            }

                            if (status == 'ON-PROGRESS') {
                                var disabled_real = "";
                            } else {
                                var disabled_real = "disabled";
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
                                '<td style="width: 50px;">',
                                '<form method="post" target="_blank" action="<?php echo base_url() . 'index.php/report/Pengajuan_lpdk' ?>"><button type="button" class="btn btn-info btn-sm edit" title="Tambah LPDK" ' + disabled_edit + '  data-target="#update" data="' + item.trans_so + '"><i class="fas fa-plus-circle"></i></button>',
                                '<button type="button"  class="btn btn-warning btn-sm note" title="Note Return" style="background-color: #6610f2; border-color: #6f42c1;" data="' + item.trans_so + '"><i style="color: #fff;" class="fas fa-sticky-note"></i></button>',
                                '<input type="hidden" name ="id" value="' + item.trans_so + '"><button type="submit" class="btn btn-success btn-sm" title="Cetak Pengajuan"><i class="far fa-file-pdf"></i></a></form>',
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
                            "paging": true,
                            "retrieve": true,
                            "lengthChange": true,
                            "searching": true,
                            "ordering": true,
                            "info": true,
                            "autoWidth": false,
                        });

                        $('#table_pengajuan_lpdk tbody').on('click', 'td.details-control', function() {
                            var tr = $(this).closest('tr');
                            var row = table.row(tr);
                            var id = $(this).attr('data');
                            get_detail_lampiran({}, id)
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

        $('#data_pengajuan_lpdk').on('click', '.note', function(e) {
            var id = $(this).attr('data');
            $('#form_note input[name=id_trans_so_note]').val(id);
            $("#modal_note").modal('show');
        });
        // Click ubah
        $('#data_pengajuan_lpdk').on('click', '.edit', function(e) {
            e.preventDefault();
            $('#form_pengajuan')[0].reset();
            $("#modal_tambah_pengajuan_lpdk").modal('show');
            var id = $(this).attr('data');

            hide_pem_sertifikat();
            get_detail_pengajuan({}, id)
                .done(function(response) {
                    var data = response.data[0];
                    var html = [];

                    let html111 =
                        "<h5 class='card-title' style='color:#d93444;'>" +
                        "Checking Data Calon Debitur (" + data.nama_marketing + ") " +
                        "</h5>" +

                        "</div>";
                    $('#label_request_by').html(html111);
                    $('#form_pengajuan input[name=id_trans_so]').val(data.id_trans_so);
                    $('#form_pengajuan input[name=area_kerja_p]').val(data.area_kerja);
                    $('#form_pengajuan input[name=nama_so_p]').val(data.nama_so);
                    $('#form_pengajuan input[name=asal_data_p]').val(data.asal_data);
                    $('#form_pengajuan input[name=nama_mb_p]').val(data.nama_marketing);
                    var plafon = (rubah(data.plafon));
                    $('#form_pengajuan input[name=plafon_p]').val(plafon);
                    $('#form_pengajuan input[name=tenor_p]').val(data.tenor);

                })

                .fail(function(jqXHR) {
                    bootbox.alert('Data tidak ditemukan');
                });
            // hide_all();
        });

        // Click ubah detail LPDK
        $('#data_lpdk').on('click', '.edit', function(e) {
            e.preventDefault();
            $("#modal_tambah_pengajuan_lpdk").modal('show');
            var id = $(this).attr('data');
            get_detail_lpdk({}, id)
                .done(function(response) {
                    var trans = response.data[0];
                    var data = response.hasil;
                    console.log(data);
                    var html = [];

                    let html111 =
                        "<h5 class='card-title' style='color:#d93444;'>" +
                        "Checking Data Calon Debitur (" + data.request_by + ") " +
                        "</h5>" +

                        "</div>";
                    $('#label_request_by').html(html111);
                    $('#form_pengajuan input[name=catatan]').val('catatan');
                    $('#form_pengajuan input[name=edit]').val('edit');
                    $('#form_pengajuan input[name=id_trans_so]').val(trans.trans_so);
                    $('#form_pengajuan input[name=area_kerja_p]').val(trans.area_kerja);
                    $('#form_pengajuan input[name=nama_so_p]').val(trans.nama_so);
                    $('#form_pengajuan input[name=asal_data_p]').val(trans.asal_data);
                    $('#form_pengajuan trans[name=nama_mb_p]').val(trans.nama_marketing);
                    var plafon = (rubah(trans.plafon));
                    $('#form_pengajuan input[name=plafon_p]').val(plafon);
                    $('#form_pengajuan input[name=tenor_p]').val(trans.tenor);

                    if (data.ktp_deb == "Ya") {
                        document.getElementById("ya_ktp_deb").checked = "true";
                    } else if (data.ktp_deb == "Tidak") {
                        document.getElementById("tidak_ktp_deb").checked = "true";
                    } else if (data.ktp_deb == "TBO") {
                        document.getElementById("tbo_ktp_deb").checked = "true";
                    }

                    if (data.ktp_pas == "Ya") {
                        document.getElementById("ya_ktp_pas").checked = "true";
                    } else if (data.ktp_pas == "Tidak") {
                        document.getElementById("tidak_ktp_pas").checked = "true";
                    } else if (data.ktp_pas == "TBO") {
                        document.getElementById("tbo_ktp_pas").checked = "true";
                    }

                    if (data.kk == "Ya") {
                        document.getElementById("ya_kk_deb").checked = "true";
                    } else if (data.kk == "Tidak") {
                        document.getElementById("tidak_kk_deb").checked = "true";
                    } else if (data.kk == "TBO") {
                        document.getElementById("tbo_kk_deb").checked = "true";
                    }

                    if (data.akta_nikah == "Ya") {
                        document.getElementById("ya_akte_nikah_deb").checked = "true";
                    } else if (data.akta_nikah == "Tidak") {
                        document.getElementById("tidak_akte_nikah_deb").checked = "true";
                    } else if (data.akta_nikah == "TBO") {
                        document.getElementById("tbo_akte_nikah_deb").checked = "true";
                    }

                    if (data.akta_cerai == "Ya") {
                        document.getElementById("ya_akte_cerai_deb").checked = "true";
                    } else if (data.akta_cerai == "Tidak") {
                        document.getElementById("tidak_akte_cerai_deb").checked = "true";
                    } else if (data.akta_cerai == "TBO") {
                        document.getElementById("tbo_akte_cerai_deb").checked = "true";
                    }

                    if (data.akta_lahir == "Ya") {
                        document.getElementById("ya_akte_lahir_deb").checked = "true";
                    } else if (data.akta_lahir == "Tidak") {
                        document.getElementById("tidak_akte_lahir_deb").checked = "true";
                    } else if (data.akta_lahir == "TBO") {
                        document.getElementById("tbo_akte_lahir_deb").checked = "true";
                    }

                    if (data.surat_kematian == "Ya") {
                        document.getElementById("ya_akte_kematian_deb").checked = "true";
                    } else if (data.surat_kematian == "Tidak") {
                        document.getElementById("tidak_akte_kematian_deb").checked = "true";
                    } else if (data.surat_kematian == "TBO") {
                        document.getElementById("tbo_akte_kematian_deb").checked = "true";
                    }

                    if (data.npwp == "Ya") {
                        document.getElementById("ya_npwp_deb").checked = "true";
                    } else if (data.npwp == "Tidak") {
                        document.getElementById("tidak_npwp_deb").checked = "true";
                    } else if (data.npwp == "TBO") {
                        document.getElementById("tbo_npwp_deb").checked = "true";
                    }

                    if (data.skd_pmi == "Ya") {
                        document.getElementById("ya_skd_deb").checked = "true";
                    } else if (data.skd_pmi == "Tidak") {
                        document.getElementById("tidak_skd_deb").checked = "true";
                    } else if (data.skd_pmi == "TBO") {
                        document.getElementById("tbo_skd_deb").checked = "true";
                    }

                    if (data.shm_shgb == "Ya") {
                        document.getElementById("ya_shm_shgb").checked = "true";
                    } else if (data.shm_shgb == "Tidak") {
                        document.getElementById("tidak_shm_shgb").checked = "true";
                    } else if (data.shm_shgb == "TBO") {
                        document.getElementById("tbo_shm_shgb").checked = "true";
                    }

                    if (data.imb == "Ya") {
                        document.getElementById("ya_imb").checked = "true";
                    } else if (data.imb == "Tidak") {
                        document.getElementById("tidak_imb").checked = "true";
                    } else if (data.imb == "TBO") {
                        document.getElementById("tbo_imb").checked = "true";
                    }

                    if (data.pbb == "Ya") {
                        document.getElementById("ya_pbb").checked = "true";
                    } else if (data.pbb == "Tidak") {
                        document.getElementById("tidak_pbb").checked = "true";
                    } else if (data.pbb == "TBO") {
                        document.getElementById("tbo_pbb").checked = "true";
                    }

                    if (data.sttpbb == "Ya") {
                        document.getElementById("ya_sttpbb").checked = "true";
                    } else if (data.sttpbb == "Tidak") {
                        document.getElementById("tidak_sttpbb").checked = "true";
                    } else if (data.sttpbb == "TBO") {
                        document.getElementById("tbo_sttpbb").checked = "true";
                    }

                    if (data.fotocopy_ktp_ortu == "Ya") {
                        document.getElementById("ya_fotocopy_ktp_ortu").checked = "true";
                    } else if (data.fotocopy_ktp_ortu == "Tidak") {
                        document.getElementById("tidak_fotocopy_ktp_ortu").checked = "true";
                    } else if (data.fotocopy_ktp_ortu == "TBO") {
                        document.getElementById("tbo_fotocopy_ktp_ortu").checked = "true";
                    }

                    if (data.fotocopy_kk_ortu == "Ya") {
                        document.getElementById("ya_fotocopy_kk_ortu").checked = "true";
                    } else if (data.fotocopy_kk_ortu == "Tidak") {
                        document.getElementById("tidak_fotocopy_kk_ortu").checked = "true";
                    } else if (data.fotocopy_kk_ortu == "TBO") {
                        document.getElementById("tbo_fotocopy_kk_ortu").checked = "true";
                    }

                    if (data.pg_ortu == "Ya") {
                        document.getElementById("ya_pg_ortu").checked = "true";
                    } else if (data.pg_ortu == "Tidak") {
                        document.getElementById("tidak_pg_ortu").checked = "true";
                    } else if (data.pg_ortu == "TBO") {
                        document.getElementById("tbo_pg_ortu").checked = "true";
                    }

                    if (data.akta_nikah_ortu == "Ya") {
                        document.getElementById("ya_akte_nikah_ortu").checked = "true";
                    } else if (data.akta_nikah_ortu == "Tidak") {
                        document.getElementById("tidak_akte_nikah_ortu").checked = "true";
                    } else if (data.akta_nikah_ortu == "TBO") {
                        document.getElementById("tbo_akte_nikah_ortu").checked = "true";
                    }

                    if (data.sk_waris == "Ya") {
                        document.getElementById("ya_surat_ket_waris_ortu").checked = "true";
                    } else if (data.sk_waris == "Tidak") {
                        document.getElementById("tidak_surat_ket_waris_ortu").checked = "true";
                    } else if (data.sk_waris == "TBO") {
                        document.getElementById("tbo_surat_ket_waris_ortu").checked = "true";
                    }

                    if (data.akta_lahir_waris == "Ya") {
                        document.getElementById("ya_akte_lahir_pewaris_ortu").checked = "true";
                    } else if (data.akta_lahir_waris == "Tidak") {
                        document.getElementById("tidak_akte_lahir_pewaris_ortu").checked = "true";
                    } else if (data.akta_lahir_waris == "TBO") {
                        document.getElementById("tbo_akte_lahir_pewaris_ortu").checked = "true";
                    }

                    if (data.sk_anak == "Ya") {
                        document.getElementById("ya_surat_putusan_anak_dibawahumur_ortu").checked = "true";
                    } else if (data.sk_anak == "Tidak") {
                        document.getElementById("tidak_surat_putusan_anak_dibawahumur_ortu").checked = "true";
                    } else if (data.sk_anak == "TBO") {
                        document.getElementById("tbo_surat_putusan_anak_dibawahumur_ortu").checked = "true";
                    }

                    if (data.ktp_penjamin == "Ya") {
                        document.getElementById("ya_ktp_penjamin").checked = "true";
                    } else if (data.ktp_penjamin == "Tidak") {
                        document.getElementById("tidak_ktp_penjamin").checked = "true";
                    } else if (data.ktp_penjamin == "TBO") {
                        document.getElementById("tbo_ktp_penjamin").checked = "true";
                    }

                    if (data.ktp_pasangan_pen == "Ya") {
                        document.getElementById("ya_ktp_pas_penjamin").checked = "true";
                    } else if (data.ktp_pasangan_pen == "Tidak") {
                        document.getElementById("tidak_ktp_pas_penjamin").checked = "true";
                    } else if (data.ktp_pasangan_pen == "TBO") {
                        document.getElementById("tbo_ktp_pas_penjamin").checked = "true";
                    }

                    if (data.kk_penjamin == "Ya") {
                        document.getElementById("ya_kk_penjamin").checked = "true";
                    } else if (data.kk_penjamin == "Tidak") {
                        document.getElementById("tidak_kk_penjamin").checked = "true";
                    } else if (data.kk_penjamin == "TBO") {
                        document.getElementById("tbo_kk_penjamin").checked = "true";
                    }

                    if (data.aktanikah_penj == "Ya") {
                        document.getElementById("ya_akte_nikah_penjamin").checked = "true";
                    } else if (data.aktanikah_penj == "Tidak") {
                        document.getElementById("tidak_akte_nikah_penjamin").checked = "true";
                    } else if (data.aktanikah_penj == "TBO") {
                        document.getElementById("tbo_akte_nikah_penjamin").checked = "true";
                    }

                    if (data.aktacerai_penj == "Ya") {
                        document.getElementById("ya_akte_cerai_penjamin").checked = "true";
                    } else if (data.aktacerai_penj == "Tidak") {
                        document.getElementById("tidak_akte_cerai_penjamin").checked = "true";
                    } else if (data.aktacerai_penj == "TBO") {
                        document.getElementById("tbo_akte_cerai_penjamin").checked = "true";
                    }

                    if (data.akta_lahir_penj == "Ya") {
                        document.getElementById("ya_akte_lahir_penjamin").checked = "true";
                    } else if (data.akta_lahir_penj == "Tidak") {
                        document.getElementById("tidak_akte_lahir_penjamin").checked = "true";
                    } else if (data.akta_lahir_penj == "TBO") {
                        document.getElementById("tbo_akte_lahir_penjamin").checked = "true";
                    }

                    if (data.skematian_penjamin == "Ya") {
                        document.getElementById("ya_akte_kematian_penjamin").checked = "true";
                    } else if (data.skematian_penjamin == "Tidak") {
                        document.getElementById("tidak_akte_kematian_penjamin").checked = "true";
                    } else if (data.skematian_penjamin == "TBO") {
                        document.getElementById("tbo_akte_kematian_penjamin").checked = "true";
                    }

                    if (data.npwp_penjamin == "Ya") {
                        document.getElementById("ya_npwp_penjamin").checked = "true";
                    } else if (data.npwp_penjamin == "Tidak") {
                        document.getElementById("tidak_npwp_penjamin").checked = "true";
                    } else if (data.npwp_penjamin == "TBO") {
                        document.getElementById("tbo_npwp_penjamin").checked = "true";
                    }

                    if (data.skd_penjamin == "Ya") {
                        document.getElementById("ya_skd_penjamin").checked = "true";
                    } else if (data.skd_penjamin == "Tidak") {
                        document.getElementById("tidak_skd_penjamin").checked = "true";
                    } else if (data.skd_penjamin == "TBO") {
                        document.getElementById("tbo_skd_penjamin").checked = "true";
                    }

                    if (data.ktp_penjual == "Ya") {
                        document.getElementById("ya_ktp_penjual").checked = "true";
                    } else if (data.ktp_penjual == "Tidak") {
                        document.getElementById("tidak_ktp_penjual").checked = "true";
                    } else if (data.ktp_penjual == "TBO") {
                        document.getElementById("tbo_ktp_penjual").checked = "true";
                    }

                    if (data.ktp_pas_penjual == "Ya") {
                        document.getElementById("ya_ktp_penjual_pas").checked = "true";
                    } else if (data.ktp_pas_penjual == "Tidak") {
                        document.getElementById("tidak_ktp_penjual_pas").checked = "true";
                    } else if (data.ktp_pas_penjual == "TBO") {
                        document.getElementById("tbo_ktp_penjual_pas").checked = "true";
                    }

                    if (data.kk_penjual == "Ya") {
                        document.getElementById("ya_kk_penjual").checked = "true";
                    } else if (data.kk_penjual == "Tidak") {
                        document.getElementById("tidak_kk_penjual").checked = "true";
                    } else if (data.kk_penjual == "TBO") {
                        document.getElementById("tbo_kk_penjual").checked = "true";
                    }

                    if (data.aktanikah_penjual == "Ya") {
                        document.getElementById("ya_akte_nikah_penjual").checked = "true";
                    } else if (data.aktanikah_penjual == "Tidak") {
                        document.getElementById("tidak_akte_nikah_penjual").checked = "true";
                    } else if (data.aktanikah_penjual == "TBO") {
                        document.getElementById("tbo_akte_nikah_penjual").checked = "true";
                    }

                    if (data.aktacerai_penjual == "Ya") {
                        document.getElementById("ya_akte_cerai_penjual").checked = "true";
                    } else if (data.aktacerai_penjual == "Tidak") {
                        document.getElementById("tidak_akte_cerai_penjual").checked = "true";
                    } else if (data.aktacerai_penjual == "TBO") {
                        document.getElementById("tbo_akte_cerai_penjual").checked = "true";
                    }

                    if (data.aktalahir_penjual == "Ya") {
                        document.getElementById("ya_akte_lahir_penjual").checked = "true";
                    } else if (data.aktalahir_penjual == "Tidak") {
                        document.getElementById("tidak_akte_lahir_penjual").checked = "true";
                    } else if (data.aktalahir_penjual == "TBO") {
                        document.getElementById("tbo_akte_lahir_penjual").checked = "true";
                    }

                    if (data.skematian_penjual == "Ya") {
                        document.getElementById("ya_akte_kematian_penjual").checked = "true";
                    } else if (data.skematian_penjual == "Tidak") {
                        document.getElementById("tidak_akte_kematian_penjual").checked = "true";
                    } else if (data.skematian_penjual == "TBO") {
                        document.getElementById("tbo_akte_kematian_penjual").checked = "true";
                    }

                    if (data.npwp_penjual == "Ya") {
                        document.getElementById("ya_npwp_penjual").checked = "true";
                    } else if (data.npwp_penjual == "Tidak") {
                        document.getElementById("tidak_npwp_penjual").checked = "true";
                    } else if (data.npwp_penjual == "TBO") {
                        document.getElementById("tbo_npwp_penjual").checked = "true";
                    }

                    if (data.skd_penjual == "Ya") {
                        document.getElementById("ya_skd_penjual").checked = "true";
                    } else if (data.skd_penjual == "Tidak") {
                        document.getElementById("tidak_skd_penjual").checked = "true";
                    } else if (data.skd_penjual == "TBO") {
                        document.getElementById("tbo_skd_penjual").checked = "true";
                    }


                    $('#form_pengajuan input[name=ket_ktp_deb]').val(data.ktp_deb_ket);
                    $('#form_pengajuan input[name=ket_ktp_deb_pas]').val(data.ktp_pas_ket);
                    $('#form_pengajuan input[name=ket_kk_deb]').val(data.kk_ket);
                    $('#form_pengajuan input[name=ket_akte_nikah_deb]').val(data.akta_nikah_ket);
                    $('#form_pengajuan input[name=ket_akte_cerai_deb]').val(data.akta_cerai_ket);
                    $('#form_pengajuan input[name=ket_akte_lahir_deb]').val(data.akta_lahir_ket);
                    $('#form_pengajuan input[name=ket_akte_kematian_deb]').val(data.surat_kematian_ket);
                    $('#form_pengajuan input[name=ket_npwp_deb]').val(data.npwp_ket);
                    $('#form_pengajuan input[name=ket_skd_deb]').val(data.skd_pmi_ket);
                    $('#form_pengajuan input[name=ket_shm_shgb]').val(data.shm_shgb_ket);
                    $('#form_pengajuan input[name=ket_imb]').val(data.imb_ket);
                    $('#form_pengajuan input[name=ket_pbb]').val(data.pbb_ket);
                    $('#form_pengajuan input[name=ket_sttpbb]').val(data.sttpbb_ket);
                    $('#form_pengajuan input[name=ket_fotocopy_ktp_ortu]').val(data.fotocopy_ktp_ortu_ket);
                    $('#form_pengajuan input[name=ket_fotocopy_kk_ortu]').val(data.fotocopy_kk_ortu_ket);
                    $('#form_pengajuan input[name=ket_pg_ortu]').val(data.pg_ortu_ket);
                    $('#form_pengajuan input[name=ket_akte_nikah_ortu]').val(data.akta_nikah_ortu_ket);
                    $('#form_pengajuan input[name=ket_surat_ket_waris_ortu]').val(data.sk_waris_ket);
                    $('#form_pengajuan input[name=ket_akte_lahir_pewaris_ortu]').val(data.akta_lahir_waris_ket);
                    $('#form_pengajuan input[name=ket_surat_putusan_anak_dibawahumur_ortu]').val(data.sk_anak_ket);
                    $('#form_pengajuan input[name=ket_ktp_penjamin]').val(data.ktp_penjamin_ket);
                    $('#form_pengajuan input[name=ket_ktp_pas_penjamin]').val(data.ktp_pasangan_pen_ket);
                    $('#form_pengajuan input[name=ket_kk_penjamin]').val(data.kk_penjamin_ket);
                    $('#form_pengajuan input[name=ket_akte_nikah_penjamin]').val(data.aktanikah_penj_ket);
                    $('#form_pengajuan input[name=ket_akte_cerai_penjamin]').val(data.aktacerai_penj_ket);
                    $('#form_pengajuan input[name=ket_akte_lahir_penjamin]').val(data.akta_lahir_penj_ket);
                    $('#form_pengajuan input[name=ket_akte_kematian_penjamin]').val(data.skematian_penjamin_ket);
                    $('#form_pengajuan input[name=ket_npwp_penjamin]').val(data.npwp_penjamin_ket);
                    $('#form_pengajuan input[name=ket_skd_penjamin]').val(data.skd_penjamin_ket);
                    $('#form_pengajuan input[name=ket_ktp_penjual]').val(data.ktp_penjual_ket);
                    $('#form_pengajuan input[name=ket_ktp_penjual_pas]').val(data.ktp_pas_penjual_ket);
                    $('#form_pengajuan input[name=ket_kk_penjual]').val(data.kk_penjual_ket);
                    $('#form_pengajuan input[name=ket_akte_nikah_penjual]').val(data.aktanikah_penjual_ket);
                    $('#form_pengajuan input[name=ket_akte_cerai_penjual]').val(data.aktacerai_penjual_ket);
                    $('#form_pengajuan input[name=ket_akte_lahir_penjual]').val(data.aktalahir_penjual_ket);
                    $('#form_pengajuan input[name=ket_akte_kematian_penjual]').val(data.skematian_penjual_ket);
                    $('#form_pengajuan input[name=ket_npwp_penjual').val(data.npwp_penjual_ket);
                    $('#form_pengajuan input[name=ket_skd_penjual').val(data.skd_penjual_ket);
                })

                .fail(function(jqXHR) {
                    bootbox.alert('Data tidak ditemukan');
                });

        });

        //TAMBAH PENGAJUAN LPDK

        $('#form_pengajuan').on('submit', function(e) {
            e.preventDefault();
            var formData = new FormData();
            var id = $('input[id=id_trans_so]', this).val();

            //identitas debitur
            formData.append('ktp_deb', $('input[type=radio][name=ktp_deb]:checked', this).val());
            formData.append('ktp_pas', $('input[type=radio][name=ktp_deb_pas]:checked', this).val());
            formData.append('kk', $('input[type=radio][name=kk_deb]:checked', this).val());
            formData.append('akta_nikah', $('input[type=radio][name=akte_nikah_deb]:checked', this).val());
            formData.append('akta_cerai', $('input[type=radio][name=akte_cerai_deb]:checked', this).val());
            formData.append('akta_lahir', $('input[type=radio][name=akte_lahir_deb]:checked', this).val());
            formData.append('surat_kematian', $('input[type=radio][name=akte_kematian_deb]:checked', this).val());
            formData.append('npwp', $('input[type=radio][name=npwp_deb]:checked', this).val());
            formData.append('skd_pmi', $('input[type=radio][name=skd_deb]:checked', this).val());

            //Jaminan
            formData.append('shm_shgb', $('input[type=radio][name=shm_shgb]:checked', this).val());
            formData.append('imb', $('input[type=radio][name=imb]:checked', this).val());
            formData.append('pbb', $('input[type=radio][name=pbb]:checked', this).val());
            formData.append('sttpbb', $('input[type=radio][name=sttpbb]:checked', this).val());

            //Identitas Ortu
            formData.append('fotocopy_ktp_ortu', $('input[type=radio][name=fotocopy_ktp_ortu]:checked', this).val());
            formData.append('fotocopy_kk_ortu', $('input[type=radio][name=fotocopy_kk_ortu]:checked', this).val());
            formData.append('pg_ortu', $('input[type=radio][name=pg_ortu]:checked', this).val());
            formData.append('akta_nikah_ortu', $('input[type=radio][name=akte_nikah_ortu]:checked', this).val());
            formData.append('sk_waris', $('input[type=radio][name=surat_ket_waris_ortu]:checked', this).val());
            formData.append('akta_lahir_waris', $('input[type=radio][name=akte_lahir_pewaris_ortu]:checked', this).val());
            formData.append('sk_anak', $('input[type=radio][name=surat_putusan_anak_dibawahumur_ortu]:checked', this).val());


            //Identitas Penjamin
            formData.append('ktp_penjamin', $('input[type=radio][name=ktp_penjamin]:checked', this).val());
            formData.append('ktp_pasangan_pen', $('input[type=radio][name=ktp_pas_penjamin]:checked', this).val());
            formData.append('kk_penjamin', $('input[type=radio][name=kk_penjamin]:checked', this).val());
            formData.append('aktanikah_penj', $('input[type=radio][name=akte_nikah_penjamin]:checked', this).val());
            formData.append('aktacerai_penj', $('input[type=radio][name=akte_cerai_penjamin]:checked', this).val());
            formData.append('akta_lahir_penj', $('input[type=radio][name=akte_lahir_penjamin]:checked', this).val());
            formData.append('skematian_penjamin', $('input[type=radio][name=akte_kematian_penjamin]:checked', this).val());
            formData.append('npwp_penjamin', $('input[type=radio][name=npwp_penjamin]:checked', this).val());
            formData.append('skd_penjamin', $('input[type=radio][name=skd_penjamin]:checked', this).val());

            //Identitas Penjual
            formData.append('ktp_penjual', $('input[type=radio][name=ktp_penjual]:checked', this).val());
            formData.append('ktp_pas_penjual', $('input[type=radio][name=ktp_penjual_pas]:checked', this).val());
            formData.append('kk_penjual', $('input[type=radio][name=kk_penjual]:checked', this).val());
            formData.append('aktanikah_penjual', $('input[type=radio][name=akte_nikah_penjual]:checked', this).val());
            formData.append('aktacerai_penjual', $('input[type=radio][name=akte_cerai_penjual]:checked', this).val());
            formData.append('aktalahir_penjual', $('input[type=radio][name=akte_lahir_penjual]:checked', this).val());
            formData.append('skematian_penjual', $('input[type=radio][name=akte_kematian_penjual]:checked', this).val());
            formData.append('npwp_penjual', $('input[type=radio][name=npwp_penjual]:checked', this).val());
            formData.append('skd_penjual', $('input[type=radio][name=skd_penjual]:checked', this).val());

            //keterangan
            formData.append('ktp_deb_ket', $('input[name=ket_ktp_deb]', this).val());
            formData.append('ktp_pas_ket', $('input[name=ket_ktp_deb_pas]', this).val());
            formData.append('kk_ket', $('input[name=ket_kk_deb]', this).val());
            formData.append('akta_nikah_ket', $('input[name=ket_akte_nikah_deb]', this).val());
            formData.append('akta_cerai_ket', $('input[name=ket_akte_cerai_deb]', this).val());
            formData.append('akta_lahir_ket', $('input[name=ket_akte_lahir_deb]', this).val());
            formData.append('surat_kematian_ket', $('input[name=ket_akte_kematian_deb]', this).val());
            formData.append('npwp_ket', $('input[name=ket_npwp_deb]', this).val());
            formData.append('skd_pmi_ket', $('input[name=ket_skd_deb]', this).val());
            formData.append('shm_shgb_ket', $('input[name=ket_shm_shgb]', this).val());
            formData.append('imb_ket', $('input[name=ket_imb]', this).val());
            formData.append('pbb_ket', $('input[name=ket_pbb]', this).val());
            formData.append('sttpbb_ket', $('input[name=ket_sttpbb]', this).val());
            formData.append('fotocopy_ktp_ortu_ket', $('input[name=ket_fotocopy_ktp_ortu]', this).val());
            formData.append('fotocopy_kk_ortu_ket', $('input[name=ket_fotocopy_kk_ortu]', this).val());
            formData.append('pg_ortu_ket', $('input[name=ket_pg_ortu]', this).val());
            formData.append('akta_nikah_ortu_ket', $('input[name=ket_akte_nikah_ortu]', this).val());
            formData.append('sk_waris_ket', $('input[name=ket_surat_ket_waris_ortu]', this).val());
            formData.append('akta_lahir_waris_ket', $('input[name=ket_akte_lahir_pewaris_ortu]', this).val());
            formData.append('sk_anak_ket', $('input[name=ket_surat_putusan_anak_dibawahumur_ortu]', this).val());
            formData.append('ktp_penjamin_ket', $('input[name=ket_ktp_penjamin]', this).val());
            formData.append('ktp_pasangan_pen_ket', $('input[name=ket_ktp_pas_penjamin]', this).val());
            formData.append('kk_penjamin_ket', $('input[name=ket_kk_penjamin]', this).val());
            formData.append('aktanikah_penj_ket', $('input[name=ket_akte_nikah_penjamin]', this).val());
            formData.append('aktacerai_penj_ket', $('input[name=ket_akte_cerai_penjamin]', this).val());
            formData.append('akta_lahir_penj_ket', $('input[name=ket_akte_lahir_penjamin]', this).val());
            formData.append('skematian_penjamin_ket', $('input[name=ket_akte_kematian_penjamin]', this).val());
            formData.append('npwp_penjamin_ket', $('input[name=ket_npwp_penjamin]', this).val());
            formData.append('skd_penjamin_ket', $('input[name=ket_skd_penjamin]', this).val());
            formData.append('ktp_penjual_ket', $('input[name=ket_ktp_penjual]', this).val());
            formData.append('ktp_pas_penjual_ket', $('input[name=ket_ktp_pas_penjamin]', this).val());
            formData.append('kk_penjual_ket', $('input[name=ket_kk_penjual]', this).val());
            formData.append('aktanikah_penjual_ket', $('input[name=ket_akte_nikah_penjual]', this).val());
            formData.append('aktacerai_penjual_ket', $('input[name=ket_akte_cerai_penjual]', this).val());
            formData.append('aktalahir_penjual_ket', $('input[name=ket_akte_lahir_penjual]', this).val());
            formData.append('skematian_penjual_ket', $('input[name=ket_akte_kematian_penjual]', this).val());
            formData.append('npwp_penjual_ket', $('input[name=ket_npwp_penjual]', this).val());
            formData.append('skd_penjual_ket', $('input[name=ket_skd_penjual]', this).val());

            if (document.getElementById('edit').value == "") {
                tambah_lpdk(formData, id)
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
            } else {
                update_lpdk(formData, id)
                    .done(function(res) {
                        console.log(res);
                        bootbox.alert('Data Berhasil Diubah', function() {
                            $('#batal').click();

                            $('.close_deb').click();
                            $('#form_pengajuan')[0].reset();
                        })
                    })
                    .fail(function(jqXHR) {
                        $('#batal').click();
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

        $('#form_note').on('submit', function(e) {
            e.preventDefault();
            var formData = new FormData();
            var id = $('input[id=id_trans_so_note]', this).val();
            formData.append('notes_progress', $('textarea[name=notes_progress]', this).val());
            formData.append('status_kredit', 'RETURN');
            Return_pengajuan(formData, id)
                .done(function(res) {
                    console.log(res);
                    bootbox.alert('Data Berhasil Disimpan', function() {
                        $('#batal').click();
                        $('.close_deb').click();
                        load_pengajuan_data_lpdk();
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

        function click_detail() {
            $('#form_pengajuan .form-control').prop('disabled', true);
            $('.submit').hide();
        }
    </script>




</body>
</html>


