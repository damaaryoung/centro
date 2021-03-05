<style>
#nama_debitur {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    color: darkred;
}

#view_debitur {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    color: darkred;
}

.ket-data-null {
    font-size: 14px;
    font-weight: bold;
    color: darkred;
    background-color: antiquewhite;
    border-radius: 10px;
    padding-left: 10px;
    width: 110px
}

.view_status_done {
    font-size: 16px;
    font-weight: bold;
    color: darkgreen;
    background-color: #d7fae2;
    border-radius: 10px;
    padding-left: 10px;
}

.view_status_notcompleted {
    font-size: 16px;
    font-weight: bold;
    color: #9a8d04;
    background-color: #9a8d0436;
    border-radius: 10px;
    padding-left: 10px;
}

.view_status_revisi {
    font-size: 16px;
    font-weight: bold;
    color: darkred;
    background-color: antiquewhite;
    border-radius: 10px;
    padding-left: 10px;
}

#loading-1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(254, 255, 255, 0.4);
    animation: spin 7s linear infinite;
}
</style>

<div class="modal fade" id="modal_pengisian_efiling" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="title_form"></h4>
                <!-- <button type="button" class="close" data-dismiss="modal" onclick="closeFormEfiling()">
                  <span aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <form>
                <div class="modal-body" style="height: 450px; overflow-y: auto">
                    <div id="loading-1">
                        <img id="loading-image" style="index:999999;"
                            src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                    </div>
                    <!-- card header start -->
                    <div class="card card-info">
                        <div class="card-header">
                            HEADER
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <!-- form atas -->
                                <div class="col-md-11 mx-auto">
                                    <div class="form-group row">
                                        <div class="col-sm-12">
                                            <div id="view_debitur"></div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <input type="hidden" class="form-control form-control-sm" id="menu_page"
                                            name="page">

                                        <div class="col-sm-2">
                                            <label class="control-label" style="padding-top: 5px;" for="area_kerja">Area
                                                Kerja</label>
                                        </div>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control form-control-sm" id="area_kerja"
                                                name="area_kerja" disabled>
                                        </div>
                                        <div class="col-sm-2">
                                            <label style="padding-top: 5px;" class="control-label"
                                                for="nomor_rekening">Nomor Rekening</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="text" class="form-control form-control-sm" id="nomor_rekening"
                                                name="nomor_rekening" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="padding-top: 5px;"
                                                for="inp_plafon">PLafon & Tenor</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="text" class="form-control form-control-sm" id="inp_plafon"
                                                name="inp_plafon" disabled>
                                        </div>
                                        <div class="col-sm-1">
                                            <input type="text" class="form-control form-control-sm" id="inp_tenor"
                                                name="inp_tenor" disabled>
                                        </div>
                                        <div class="col-sm-1"> <span>Bulan</span></div>
                                        <div class="col-sm-2">
                                            <label style="padding-top: 5px;" class="control-label"
                                                for="inp_nomor_rekening">Tanggal Realisasi</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="text" class="form-control form-control-sm"
                                                id="tanggal_realisasi" name="tanggal_realisasi" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--card header end -->
                    <!--card details start -->
                    <div class="card card-danger">
                        <div class="card-header">
                            DETAILS
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 mx-auto">
                                    <div class="form-group row">
                                        <div class="col-5 col-sm-2">
                                            <div class="nav flex-column nav-tabs h-100" id="vert-tabs-tab"
                                                role="tablist" aria-orientation="vertical">
                                                <a class="nav-link active" id="vert-tabs-nasabah" data-toggle="pill"
                                                    href="#vert-tab-nasabah" role="tab" aria-controls="tab-nasabah"
                                                    aria-selected="true">Nasabah</a>
                                                <a class="nav-link" id="vert-tabs-permohonan-kredit-tab"
                                                    data-toggle="pill" href="#vert-tabs-permohonan-kredit" role="tab"
                                                    aria-controls="vert-tabs-profile" aria-selected="false">Permohonan
                                                    Kredit</a>
                                                <a class="nav-link" id="vert-tabs-tab-jaminan-tab" data-toggle="pill"
                                                    href="#vert-tabs-jaminan" role="tab"
                                                    aria-controls="vert-tabs-messages" aria-selected="false">Jaminan</a>
                                                <a class="nav-link" id="vert-tabs-bi-checking-tab" data-toggle="pill"
                                                    href="#vert-tabs-bi-checking" role="tab"
                                                    aria-controls="vert-tabs-settings" aria-selected="false">BI
                                                    Checking</a>
                                                <a class="nav-link" id="vert-tabs-credit_analist-tab" data-toggle="pill"
                                                    href="#vert-tabs-credit_analist" role="tab"
                                                    aria-controls="vert-tabs-credit_analist"
                                                    aria-selected="false">Credit Analist</a>
                                                <a class="nav-link" id="vert-tabs-legal-tab" data-toggle="pill"
                                                    href="#vert-tabs-legal" role="tab" aria-controls="vert-tabs-legal"
                                                    aria-selected="false">Legal</a>
                                                <a class="nav-link" id="vert-tabs-spk-tab" data-toggle="pill"
                                                    href="#vert-tabs-spk" role="tab" aria-controls="vert-tabs-spk"
                                                    aria-selected="false">SPK & NDK</a>
                                                <a class="nav-link" id="vert-tabs-foto-tab" data-toggle="pill"
                                                    href="#vert-tabs-foto" role="tab" aria-controls="#vert-tabs-foto"
                                                    aria-selected="false">Foto</a>
                                            </div>
                                        </div>
                                        <div class="col-7 col-sm-9">
                                            <div class="tab-content" id="vert-tabs-tabContent">
                                                <!-- START NASABAH -->
                                                <div class="tab-pane text-left fade active show" id="vert-tab-nasabah"
                                                    role="tabpanel" aria-labelledby="nasabah">
                                                    <!-- START Verifikasi Nasabah -->
                                                    <div class="col-md-12 form-verifikasi">
                                                        <div class="card card-success">
                                                            <div class="card-header">
                                                                <h3 class="card-title">Verifikasi Nasabah</h3>
                                                                <div class="card-tools">
                                                                    <button type="button" class="btn btn-tool"
                                                                        data-card-widget="collapse"><i
                                                                            class="fas fa-angle-down"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body" id="verifikasi-option-nasabah"></div>
                                                        </div>
                                                    </div>
                                                    <!-- END Verifikasi Permohonan Nasabah -->
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">KTP All</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="ktp_all" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="ktp_all">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-ktp_all"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Kartu Keluarga</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="kartu_keluarga" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="kartu_keluarga">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-kartu_keluarga">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">NPWP</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="inp_npwp" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="inp_npwp">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-inp_npwp"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Nikah</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="surat_nikah" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="surat_nikah">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-surat_nikah">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Cerai</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="surat_cerai" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="surat_cerai">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-surat_cerai">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Lahir</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="surat_lahir" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="surat_lahir">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-surat_lahir">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Kematian</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="surat_kematian" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="surat_kematian">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-surat_kematian">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Keterangan
                                                                    Desa/PM1/PM2</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="surat_keterangan_desa"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="surat_keterangan_desa">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-surat_keterangan_desa"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Slip Gaji</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="slip_gaji" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="slip_gaji">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-slip_gaji">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Take Over</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="take_over" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="take_over">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-take_over">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class='col-6'>
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Keterangan Kerja</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="surat_keterangan_kerja"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="surat_keterangan_kerja">Choose file
                                                                    </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-surat_keterangan_kerja"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Keterangan Usaha</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="surat_keterangan_usaha"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="surat_keterangan_usaha">Choose file
                                                                    </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-surat_keterangan_usaha"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Rekening Koran</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="rekening_koran" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="rekening_koran">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-rekening_koran">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">TDP/SIUP</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="tdp_siup" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="tdp_siup">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-tdp_siup"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Bon Usaha</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="bon_usaha" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="bon_usaha">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-bon_usaha">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END NASABAH -->

                                                <!-- START PERMOHONAN KREDIT -->
                                                <div class="tab-pane fade" id="vert-tabs-permohonan-kredit"
                                                    role="tabpanel" aria-labelledby="permohonan-kredit">
                                                    <!-- START Verifikasi kredit -->
                                                    <div class="col-md-12 form-verifikasi">
                                                        <div class="card card-success">
                                                            <div class="card-header">
                                                                <h3 class="card-title">Verifikasi Permohonan Kredit</h3>
                                                                <div class="card-tools">
                                                                    <button type="button" class="btn btn-tool"
                                                                        data-card-widget="collapse"><i
                                                                            class="fas fa-angle-down"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body"
                                                                id="verifikasi-option-permohonan-kredit"></div>
                                                        </div>
                                                    </div>
                                                    <!-- END Verifikasi Permohonan kredit -->
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Aplikasi Permohonan
                                                                    Kredit</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="aplikasi_permohonan_kredit"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="aplikasi_permohonan_kredit">Choose
                                                                        file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-aplikasi_permohonan_kredit"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Denah Lokasi Tempat Tinggal &
                                                                    Usaha</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="denah_lokasi" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="denah_lokasi">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-denah_lokasi">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Checklist Kelengkapan Dokumen
                                                                    Krdit</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="kelengkapan_dokumen_kredit"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="kelengkapan_dokumen_kredit">Choose
                                                                        file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-kelengkapan_dokumen_kredit"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END PERMOHONAN KREDIT -->

                                                <!-- START PERMOHONAN JAMINAN -->
                                                <div class="tab-pane fade" id="vert-tabs-jaminan" role="tabpanel"
                                                    aria-labelledby="jaminan">
                                                    <!-- START Verifikasi Jaminan -->
                                                    <div class="col-md-12 form-verifikasi">
                                                        <div class="card card-success">
                                                            <div class="card-header">
                                                                <h3 class="card-title">Verifikasi Jaminan</h3>
                                                                <div class="card-tools">
                                                                    <button type="button" class="btn btn-tool"
                                                                        data-card-widget="collapse"><i
                                                                            class="fas fa-angle-down"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body" id="verifikasi-option-jaminan"></div>
                                                        </div>
                                                    </div>
                                                    <!-- END Verifikasi Jaminan -->
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Sertifikat</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_sertifikat"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_sertifikat">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-jaminan_sertifikat"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">SKMHT</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_skmht" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_skmht">Choose file SKMHT</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-jaminan_skmht">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">APHT</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_apht" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_apht">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-jaminan_apht">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Cabut Roya</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_roya" dir="jaminan"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_roya">Choose file Roya</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-jaminan_roya">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">SHT</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_sht" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_sht">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-jaminan_sht">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">PBB</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_pbb" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_pbb">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-jaminan_pbb">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">IMB</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_imb" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_imb">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-jaminan_imb">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">AJB</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_ajb" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_ajb">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-jaminan_ajb">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">BPKB</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_bpkb" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_bpkb">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-jaminan_bpkb">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">FIDUSIA</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_fidusia" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_fidusia">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-jaminan_fidusia"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Ahli Waris</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_ahli_waris"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_ahli_waris">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-jaminan_ahli_waris"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Pengakuan Hutang</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_pengakuan_hutang"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_pengakuan_hutang">Choose file
                                                                    </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-jaminan_pengakuan_hutang"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Akta Pengakuan Hak
                                                                    Bersama</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_pengakuan_hak"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_pengakuan_hak">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-jaminan_pengakuan_hak"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Addendum</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jaminan_addendum" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jaminan_addendum">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-jaminan_addendum"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END PERMOHONAN JAMINAN -->

                                                <!-- START PERMOHONAN BI CHECKING -->
                                                <div class="tab-pane fade" id="vert-tabs-bi-checking" role="tabpanel"
                                                    aria-labelledby="bi-checking">
                                                    <!-- START Verifikasi BI CHECKING -->
                                                    <div class="col-md-12 form-verifikasi">
                                                        <div class="card card-success">
                                                            <div class="card-header">
                                                                <h3 class="card-title">Verifikasi BI Checking</h3>
                                                                <div class="card-tools">
                                                                    <button type="button" class="btn btn-tool"
                                                                        data-card-widget="collapse"><i
                                                                            class="fas fa-angle-down"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body" id="verifikasi-option-bi-checking">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- END Verifikasi BI CHECKING -->
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Form Pengajuan BI
                                                                    Checking</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="pengajuan_bi_checking"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="pengajuan_bi_checking">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-pengajuan_bi_checking"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Form Persetujuan BI
                                                                    Checking</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="persetujuan_bi_checking"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="persetujuan_bi_checking">Choose
                                                                        file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-persetujuan_bi_checking"></div>
                                                            </div>
                                                        </div>
                                                        <!-- <div class="col-6">
                                                                                            <div class="form-group">
                                                                                              <label for="customFile">Hasil BI Checking</label>
                                                                                              <div class="custom-file">
                                                                                                <input type="file" class="custom-file-input" id="hasil_bi_checking"  onchange='getImg(event)'>
                                                                                                <label class="custom-file-label" for="hasil_bi_checking">Choose file</label>
                                                                                              </div>
                                                                                              <div class="row" style="padding-top: 10px;" id="file-hasil_bi_checking"></div>
                                                                                            </div>
                                                                                          </div>    -->
                                                    </div>
                                                </div>
                                                <!-- END PERMOHONAN BI CHECKING -->

                                                <!-- START PERMOHONAN CREDIT ANALIST -->
                                                <div class="tab-pane fade" id="vert-tabs-credit_analist" role="tabpanel"
                                                    aria-labelledby="credit">
                                                    <!-- START Verifikasi Credit Analist -->
                                                    <div class="col-md-12 form-verifikasi">
                                                        <div class="card card-success">
                                                            <div class="card-header">
                                                                <h3 class="card-title">Verifikasi Credit Analist</h3>
                                                                <div class="card-tools">
                                                                    <button type="button" class="btn btn-tool"
                                                                        data-card-widget="collapse"><i
                                                                            class="fas fa-angle-down"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body"
                                                                id="verifikasi-option-credit-analist"></div>
                                                        </div>
                                                    </div>
                                                    <!-- END Verifikasi Credit Analist -->
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Memorandum Account
                                                                    Officer</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="credit_analist_memo_ao"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="credit_analist_memo_ao">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-credit_analist_memo_ao"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Memorandum Credit
                                                                    Analist</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="credit_analist_memo_ca"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="credit_analist_memo_ca">Choose file
                                                                    </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-credit_analist_memo_ca"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Offering Letter</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="offering_letter" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="offering_letter">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-offering_letter"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Form Verifikasi & Penilaian
                                                                    Jaminan</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="verifikasi_penilaian"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="verifikasi_penilaian">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-verifikasi_penilaian"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Checklist Survey</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="checklist_survey" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="checklist_survey">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-checklist_survey"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Credit Authority
                                                                    Approval</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="persetujuan_kredit"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="persetujuan_kredit">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-persetujuan_kredit"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END PERMOHONAN CREDIT ANALIST -->

                                                <!-- START PERMOHONAN LEGAL -->
                                                <div class="tab-pane fade" id="vert-tabs-legal" role="tabpanel"
                                                    aria-labelledby="legal">
                                                    <!-- START Verifikasi Legal -->
                                                    <div class="col-md-12 form-verifikasi">
                                                        <div class="card card-success">
                                                            <div class="card-header">
                                                                <h3 class="card-title">Verifikasi Legal</h3>
                                                                <div class="card-tools">
                                                                    <button type="button" class="btn btn-tool"
                                                                        data-card-widget="collapse"><i
                                                                            class="fas fa-angle-down"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body" id="verifikasi-option-legal"></div>
                                                        </div>
                                                    </div>
                                                    <!-- END Verifikasi Legal -->
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Form Pengajuan</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="pengajuan" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="pengajuan">Choose file Foto Jaminan</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-pengajuan">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">LPDK</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="lpdk" onchange='getImg(event)'>
                                                                    <label class="custom-file-label" for="lpdk">Choose
                                                                        file Foto Pengikatan</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-lpdk"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Checklist Pengikatan</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="check_pengikatan" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="check_pengikatan">Choose file Foto
                                                                        Domisili</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-check_pengikatan"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Order Pengikatan</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="oder_pengikatan" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="oder_pengikatan">Choose file Foto
                                                                        Usaha</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-oder_pengikatan"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END PERMOHONAN LEGAL -->

                                                <!-- START PERMOHONAN SPK & NDK -->
                                                <div class="tab-pane fade" id="vert-tabs-spk" role="tabpanel"
                                                    aria-labelledby="spk_ndk">
                                                    <!-- START Verifikasi SPK & NDK -->
                                                    <div class="col-md-12 form-verifikasi">
                                                        <div class="card card-success">
                                                            <div class="card-header">
                                                                <h3 class="card-title">Verifikasi SPK & NDK</h3>
                                                                <div class="card-tools">
                                                                    <button type="button" class="btn btn-tool"
                                                                        data-card-widget="collapse"><i
                                                                            class="fas fa-angle-down"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body" id="verifikasi-option-spk_ndk"></div>
                                                        </div>
                                                    </div>
                                                    <!-- END Verifikasi SPK& NDK -->
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">SPK & NDK</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="spkndk" onchange='getImg(event)'>
                                                                    <label class="custom-file-label" for="spk">Choose
                                                                        file </label>
                                                                </div>
                                                                <div class="row" style="padding-top: 10px;"
                                                                    id="file-spk"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Pernyataan
                                                                    Asuransi</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="asuransi" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="asuransi">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-asuransi"></div>
                                                            </div>
                                                        </div>
                                                        <!-- <div class="col-6">
                                                    <div class="form-group">
                                                      <label for="customFile">SPAJK/ SPA/ FPK</label>
                                                      <div class="custom-file">
                                                        <input type="file" class="custom-file-input" id="spajk_spa_fpk" onchange='getImg(event)'>
                                                        <label class="custom-file-label" for="spajk_spa_fpk">Choose file </label>
                                                      </div>
                                                      <div class="row inner_list_upload" style="padding-top: 10px;" id="file-spajk_spa_fpk"></div>
                                                    </div>
                                                  </div> -->
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Pernyataan Tidak Ada
                                                                    IMB</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="sp_no_imb" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="sp_no_imb">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-sp_no_imb">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Jadwal Angsuran</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="jadwal_angsuran" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="jadwal_angsuran">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-jadwal_angsuran"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Personal Guarantee ( Penjamin
                                                                    )</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="personal_guarantee"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="personal_guarantee">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-personal_guarantee"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Pernyataan Hold
                                                                    Dana</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="hold_dana" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="hold_dana">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-hold_dana">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Perintah Transfer</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="srt_transfer" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="srt_transfer">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-srt_transfer">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Keabsahan Data</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="srt_keabsahan" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="srt_keabsahan">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-srt_keabsahan">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Pernyataan Beda Tanggal
                                                                    Jatuh Tempo</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="srt_jth_tempo" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="srt_jth_tempo">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-srt_jth_tempo">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Pernyataan Data
                                                                    Authentic</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="srt_auth" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="srt_auth">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-srt_auth"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Pernyataan Penyerahan
                                                                    Jaminan</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="srt_penyerahan_jaminan"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="srt_penyerahan_jaminan">Choose file
                                                                    </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-srt_penyerahan_jaminan"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Pernyataan Tunggakan Bunga
                                                                    dan Denda</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="denda" onchange='getImg(event)'>
                                                                    <label class="custom-file-label" for="denda">Choose
                                                                        file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-denda"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat AKSEP</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="srt_aksep" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="srt_aksep">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-srt_aksep">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Tanda Terima Uang Oleh
                                                                    Nasabah</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="tt_uang" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="tt_uang">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-tt_uang"></div>
                                                            </div>
                                                        </div>
                                                        <div class='col-6'>
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Permohonan Pendebetan
                                                                    Rekening</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="pendebetan_rekening"
                                                                        onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="pendebetan_rekening">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-pendebetan_rekening"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Surat Pernyataan ( Pemasangan )
                                                                    Plang</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="sp_plang" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="sp_plang">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-sp_plang"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Hal-hal yang diketahui Oleh
                                                                    Nasabah</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="hal_penting" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="hal_penting">Choose file </label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-hal_penting">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END PERMOHONAN SPK & NDK -->

                                                <!-- START PERMOHONAN FOTO -->
                                                <div class="tab-pane fade" id="vert-tabs-foto" role="tabpanel"
                                                    aria-labelledby="foto">
                                                    <!-- START Verifikasi Foto -->
                                                    <div class="col-md-12 form-verifikasi">
                                                        <div class="card card-success">
                                                            <div class="card-header">
                                                                <h3 class="card-title">Verifikasi Foto</h3>
                                                                <div class="card-tools">
                                                                    <button type="button" class="btn btn-tool"
                                                                        data-card-widget="collapse"><i
                                                                            class="fas fa-angle-down"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body" id="verifikasi-option-foto"></div>
                                                        </div>
                                                    </div>
                                                    <!-- END Verifikasi Foto -->
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Foto Jaminan</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="foto_jaminan" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="foto_jaminan">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-foto_jaminan">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Foto Pengikatan</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="foto_pengikatan" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="foto_pengikatan">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;"
                                                                    id="file-foto_pengikatan"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Foto Domisili</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="foto_domisili" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="foto_domisili">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-foto_domisili">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="form-group">
                                                                <label for="customFile">Foto Usaha</label>
                                                                <div class="custom-file">
                                                                    <input type="file" class="custom-file-input"
                                                                        id="foto_usaha" onchange='getImg(event)'>
                                                                    <label class="custom-file-label"
                                                                        for="foto_usaha">Choose file</label>
                                                                </div>
                                                                <div class="row inner_list_upload"
                                                                    style="padding-top: 10px;" id="file-foto_usaha">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END PERMOHONAN FOTO -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--card details end -->
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn-close" class="btn btn-default" data-dismiss="modal"
                        onclick="closeFormEfiling()">Close</button>
                    <div id="btn_save">
                        <button type="button" class="btn btn-primary" id="update_verifikasi_data">Save changes</button>
                    </div>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>