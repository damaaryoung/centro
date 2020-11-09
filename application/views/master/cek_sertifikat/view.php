<!-- <?php echo var_dump($view); ?> -->
<?php foreach ($view as $key): ?>
  <style media="screen">
  fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow:  0px 0px 0px 0px #000;
          box-shadow:  0px 0px 0px 0px #000;
}

  legend.scheduler-border {
      font-size: 1.2em !important;
      font-weight: bold !important;
      text-align: left !important;
      width:auto;
      padding:0 10px;
      border-bottom:none;
  }
  </style>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="callout callout-info">
          <div class="row">
            <div class="col-md-9">
              <h5><i class="fas fa-info"></i> Note:</h5>
              Halaman ini telah disempurnakan untuk pencetakan dengan mengeksport file dalam bentuk pdf. Klik tombol PDF di bagian bawah sebelah kanan untuk menguji.
            </div>
            <div class="col-md-3">
              <img src="<?= base_url(); ?>assets/dist/img/detective.svg" width="30%" class="float-right">
            </div>
          </div>
        </div>
        <!-- Main content -->
        <div class="invoice p-3 mb-3">
        <form id="quickForm">
          <input type="hidden" name="id_data" value="<?= $key['id']; ?>">
          <div class="show-data" style="display:block;">
            <!-- title row -->
            <div class="row">
              <div class="col-12">
                <h4>
                  <table class="float-left">
                    <tr>
                      <th><i class="fas fa-credit-card"></i> Agunan ID : </th>
                      <td>
                        <button type="button" class="btn btn-block btn-outline-primary btn-flat btn-xs"><?= ($key['no_rekening']!==NULL||$key['no_rekening']!=="") ? $key['no_rekening'] : "undefined data" ;?></button>
                      </td>
                    </tr>
                  </table>
                  <table class="float-right">
                    <tr>
                      <th><i class="fas fa-calendar"></i> Tgl Sertifikat :</th>
                      <td>
                        <?= ($key['tgl_sertifikat']==''||$key['tgl_sertifikat']==NULL||$key['tgl_sertifikat']=='0000-00-00') ? 'undefined data' : '<button type="button" class="btn btn-block btn-outline-primary btn-flat btn-xs">'.date('d F Y', strtotime($key["tgl_sertifikat"])).'</button>' ; ?>
                      </td>
                    </tr>
                    <tr>
                      <th><i class="fas fa-calendar"></i> Status :</th>
                      <td>
                        <?= ($key['status']==''||$key['status']==NULL) ? 'undefined data' : '<button type="button" class="btn btn-block btn-outline-primary btn-flat btn-xs">'.$key["status"].'</button>' ; ?>
                      </td>
                    </tr>
                  </table>
                </h4>
              </div>
              <!-- /.col -->
            </div>
            <!-- info row -->
            <div class="row invoice-info d-flex flex-nowrap p-5">
              <div class="col-md invoice-col">
                <h6>Telah Dipinjamkan oleh BPR Kredit Mandiri Indonesia <?php echo $key['nama_kota'];?> ,Berupa 1 Buah <?php echo $key['jenis_jaminan'];?> asli dengan rincian beserta data kelengkapan sebagai berikut :</h6>
              </div>
            </div>
            <div class="row invoice-info">
              <div class="col-sm-4 invoice-col">
                Nasabah
                <table>
                  <tr>
                    <th>Nama lengkap</th>
                    <td>: <?= $key['nama_lengkap']; ?></td>
                  </tr>
                  <tr>
                    <th>Alamat</th>
                    <td>: <?= $key['alamat']; ?></td>
                  </tr>
                  <tr>
                    <th>Alamat KTP</th>
                    <td>: </strong> <?= $key['alamat_ktp']; ?></td>
                  </tr>
                </table>
              </div>
              <!-- /.col -->
              <div class="col-sm-4 invoice-col">
                Rincian
                <table>
                  <tr>
                    <th>No. SHM</th>
                    <td>: <?= $key['no_shm'] ?></td>
                  </tr>
                  <tr>
                    <th>No. Surat Ukur</th>
                    <td>: <?= $key['nomor_surat_ukur'] ?></td>
                  </tr>
                  <tr>
                    <th>Tgl. Sertifikat</th>
                    <td>: <?= $key['tgl_sertifikat'] ?></td>
                  </tr>
                  <tr>
                    <th>Luas Tanah</th>
                    <td>: <?= $key['luas_tanah'] ?> m<sup>2</sup></td>
                  </tr>
                </table>
              </div>
              <!-- /.col -->
              <div class="col-sm-4 invoice-col">
                Kelengkapan
                <table>
                  <tr>
                    <th>AJB</th>
                    <td>: 
                      <?php 
                      if ($key['asli_ajb']=='1') {
                        echo "ASLI";
                      } elseif ($key['asli_ajb']=='2') {
                        echo "COPY";
                      }else{
                        echo "-";
                      }
                       ?>  
                    </td>
                    <th class="d-flex flex-nowrap ml-5">IMB</th>
                    <td>
                      <?php 
                      if ($key['asli_imb']=='1') {
                        echo "ASLI";
                      } elseif ($key['asli_imb']=='2') {
                        echo "COPY";
                      }else{
                        echo "-";
                      }
                       ?> 
                      m<sup>2</sup>
                    </td>
                  </tr>
                  <tr>
                    <th>SPPT</th>
                    <td>: 
                      <?php 
                      if ($key['asli_sppt']=='1') {
                        echo "ASLI";
                      } elseif ($key['asli_sppt']=='2') {
                        echo "COPY";
                      }else{
                        echo "-";
                      }
                       ?>     
                    </td>
                    <th class="d-flex flex-nowrap ml-5">SHT</th>
                    <td>
                      <?php 
                      if ($key['asli_sht']=='1') {
                        echo "ASLI";
                      } elseif ($key['asli_sht']=='2') {
                        echo "COPY";
                      }else{
                        echo "-";
                      }
                       ?> 
                      m<sup>2</sup>
                    </td>
                  </tr>
                  <tr>
                    <th>STTS</th>
                    <td>: 
                      <?php 
                      if ($key['asli_stts']=='1') {
                        echo "ASLI";
                      } elseif ($key['asli_stts']=='2') {
                        echo "COPY";
                      }else{
                        echo "-";
                      }
                     ?> 
                    </td>
                    <th class="d-flex flex-nowrap ml-5">SSB</th>
                    <td> 
                      <?php 
                      if ($key['asli_ssb']=='1') {
                        echo "ASLI";
                      } elseif ($key['asli_ssb']=='2') {
                        echo "COPY";
                      }else{
                        echo "-";
                      }
                     ?>
                      m<sup>2</sup>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
          <div class="edit-data" style="display:none;">
            <!-- form start -->
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <fieldset class="scheduler-border">
                      <legend class="scheduler-border">Nasabah</legend>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Nama Lengkap</label>
                        <input type="text" name="nama" class="form-control" id="nama-nasabah" value="<?=$key['nama_lengkap'];?>">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Alamat</label>
                        <textarea name="alamat" class="form-control" id="alamat"><?=$key['alamat'];?></textarea>
                      </div>
                    </fieldset>
                    <fieldset class="scheduler-border">
                      <legend class="scheduler-border">Rincian</legend>
                      <div class="form-group">
                        <label for="exampleInputEmail1">No. SHM</label>
                        <input type="text" name="no_shm" class="form-control" id="no-shm" value="<?=$key['no_shm'];?>">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">No. Surat Ukur</label>
                        <input type="text" name="nomor_surat_ukur" class="form-control" id="no-surat-ukur" value="<?=$key['nomor_surat_ukur'];?>">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Tgl. Sertifikat</label>
                        <input type="date" name="tgl_sertifikat" class="form-control" id="tgl-sertifikat" value="<?=$key['tgl_sertifikat'];?>">
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Luas Tanah</label>
                        <input type="text" name="luas_tanah" class="form-control" id="luas-tanah" value="<?=$key['luas_tanah'];?>">
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-sm-6">
                    <fieldset class="scheduler-border">
                      <legend class="scheduler-border">Kelengkapan</legend>
                        <div class="row">
                          <div class="col-sm">
                            <div class="form-group">
                              <label for="exampleInputEmail1">AJB</label>
                              <div class="input-group mb-2">
                                <select class="custom-select" name="ajb_flag">
                                  <option value="1" <?= ($key['asli_ajb']=="1") ? 'selected' : '' ; ?>>Asli</option>
                                  <option value="2" <?= ($key['asli_ajb']=="2") ? 'selected' : '' ; ?>>Copy</option>
                                  <option value="0" <?= ($key['asli_ajb']=="0"||$key['asli_ajb']==NULL) ? 'selected' : '' ; ?>>-</option>
                                </select>
                                <div class="input-group-prepend check-ajb">
                                  <div class="input-group-text">
                                    <div class="custom-control custom-checkbox">
                                      <input type="checkbox" name="ajb" class="custom-control-input" id="check-ajb" value="Y" <?= ($key['ajb']=="Y") ? "checked" : "" ; ?>>
                                      <label class="custom-control-label" for="check-ajb">AJB</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="nomor-ajb" style="display:<?=($key['ajb']=='Y') ? 'block' : 'none' ;?>;">
                                <label for="disabledTextInput">Nomor AJB</label>
                                <input type="text"class="form-control" id="nomor-ajb" name="nomor_ajb" <?= ($key['no_ajb'] !==""||$key['no_ajb'] !==NULL) ? "value='".$key['no_ajb']."'" : "" ; ?>>
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputEmail1">IMB</label>
                              <div class="input-group mb-2">
                                <select class="custom-select" name="imb_flag">
                                  <option value="1" <?= ($key['asli_imb']=="1") ? 'selected' : '' ; ?>>Asli</option>
                                  <option value="2" <?= ($key['asli_imb']=="2") ? 'selected' : '' ; ?>>Copy</option>
                                  <option value="0" <?= ($key['asli_imb']=="0"||$key['asli_imb']==NULL) ? 'selected' : '' ; ?>>-</option>
                                </select>
                                <div class="input-group-prepend check-imb">
                                  <div class="input-group-text">
                                    <div class="custom-control custom-checkbox">
                                      <input type="checkbox" name="imb" class="custom-control-input" id="check-imb" value="Y" <?= ($key['imb']=="Y") ? "checked" : "" ; ?>>
                                      <label class="custom-control-label" for="check-imb">IMB</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="nomor-imb" style="display:<?=($key['imb']=='Y') ? 'block' : 'none' ;?>;">
                                <label for="disabledTextInput">Nomor IMB</label>
                                <input type="text"class="form-control" id="nomor-imb-val" name="nomor_imb" <?= ($key['no_imb'] !==""||$key['no_imb'] !==NULL) ? "value='".$key['no_imb']."'" : "" ; ?>>
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputEmail1">SPPT</label>
                              <div class="input-group mb-2">
                                <select class="custom-select" name="sppt_flag">
                                  <option value="1" <?= ($key['asli_sppt']=="1") ? 'selected' : '' ; ?>>Asli</option>
                                  <option value="2" <?= ($key['asli_sppt']=="2") ? 'selected' : '' ; ?>>Copy</option>
                                  <option value="0" <?= ($key['asli_sppt']=="0"||$key['asli_sppt']==NULL) ? 'selected' : '' ; ?>>-</option>
                                </select>
                                <div class="input-group-prepend check-sppt">
                                  <div class="input-group-text">
                                    <div class="custom-control custom-checkbox">
                                      <input type="checkbox" name="sppt" class="custom-control-input" id="check-sppt" value="Y" <?= ($key['sppt']=="Y") ? "checked" : "" ; ?>>
                                      <label class="custom-control-label" for="check-sppt">SPPT</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="nomor-sppt" style="display:<?=($key['sppt']=='Y') ? 'block' : 'none' ;?>;">
                                <label for="disabledTextInput">Nomor SPPT</label>
                                <input type="text"class="form-control" id="nomor-sppt-val" name="nomor_sppt" <?= ($key['no_sppt'] !==""||$key['no_sppt'] !==NULL) ? "value='".$key['no_sppt']."'" : "" ; ?>>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm">
                            <div class="form-group">
                              <label for="exampleInputEmail1">SHT</label>
                              <div class="input-group mb-2">
                                <select class="custom-select" name="sht_flag">
                                  <option value="1" <?= ($key['asli_sht']=="1") ? 'selected' : '' ; ?>>Asli</option>
                                  <option value="2" <?= ($key['asli_sht']=="2") ? 'selected' : '' ; ?>>Copy</option>
                                  <option value="0" <?= ($key['asli_sht']=="0"||$key['asli_sht']==NULL) ? 'selected' : '' ; ?>>-</option>
                                </select>
                                <div class="input-group-prepend check-sht">
                                  <div class="input-group-text">
                                    <div class="custom-control custom-checkbox">
                                      <input type="checkbox" name="sht" class="custom-control-input" id="check-sht" value="Y" <?= ($key['sht']=="Y") ? "checked" : "" ; ?>>
                                      <label class="custom-control-label" for="check-sht">SHT</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="nomor-sht" style="display:<?=($key['sht']=='Y') ? 'block' : 'none' ;?>;">
                                <label for="disabledTextInput">Nomor SHT</label>
                                <input type="text"class="form-control" id="nomor-sht-val" name="nomor_sht" <?= ($key['no_sht'] !==""||$key['no_sht'] !==NULL) ? "value='".$key['no_sht']."'" : "" ; ?>>
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputEmail1">STTS</label>
                              <div class="input-group mb-2">
                                <select class="custom-select" name="stts_flag">
                                  <option value="1" <?= ($key['asli_stts']=="1") ? 'selected' : '' ; ?>>Asli</option>
                                  <option value="2" <?= ($key['asli_stts']=="2") ? 'selected' : '' ; ?>>Copy</option>
                                  <option value="0" <?= ($key['asli_stts']=="0"||$key['asli_stts']==NULL) ? 'selected' : '' ; ?>>-</option>
                                </select>
                                <div class="input-group-prepend check-stts">
                                  <div class="input-group-text">
                                    <div class="custom-control custom-checkbox">
                                      <input type="checkbox" name="stts" class="custom-control-input" id="check-stts" value="Y" <?= ($key['stts']=="Y") ? "checked" : "" ; ?>>
                                      <label class="custom-control-label" for="check-stts">STTS</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="nomor-stts" style="display:<?=($key['stts']=='Y') ? 'block' : 'none' ;?>;">
                                <label for="disabledTextInput">Tahun STTS</label>
                                <input type="text"class="form-control" id="nomor-stts-val" name="tahun_stts" <?= ($key['stts_tahun'] !==""||$key['stts_tahun'] !==NULL) ? "value='".$key['stts_tahun']."'" : "" ; ?>>
                              </div>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputEmail1">SSB</label>
                              <div class="input-group mb-2">
                                <select class="custom-select" name="ssb_flag">
                                  <option value="1" <?= ($key['asli_ssb']=="1") ? 'selected' : '' ; ?>>Asli</option>
                                  <option value="2" <?= ($key['asli_ssb']=="2") ? 'selected' : '' ; ?>>Copy</option>
                                  <option value="0" <?= ($key['asli_ssb']=="0"||$key['asli_ssb']==NULL) ? 'selected' : '' ; ?>>-</option>
                                </select>
                                <div class="input-group-prepend check-ssb">
                                  <div class="input-group-text">
                                    <div class="custom-control custom-checkbox">
                                      <input type="checkbox" name="ssb" class="custom-control-input" id="check-ssb" value="Y" <?= ($key['ssb']=="Y") ? "checked" : "" ; ?>>
                                      <label class="custom-control-label" for="check-ssb">SSB</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="nomor-ssb" style="display:<?=($key['ssb']=='Y') ? 'block' : 'none' ;?>;">
                                <label for="disabledTextInput">SSB Tahun</label>
                                <input type="text"class="form-control" id="tahun-ssb-val" name="ssb_tahun" <?= ($key['ssb_tahun'] !==""||$key['ssb_tahun'] !==NULL) ? "value='".$key['ssb_tahun']."'" : "" ; ?> placeholder=" ssb tahun">
                                <label for="disabledTextInput">SSB Atas Nama</label>
                                <input type="text"class="form-control" id="nama-ssb-val" name="ssb_atas_nama" <?= ($key['ssb_atas_nama'] !==""||$key['ssb_atas_nama'] !==NULL) ? "value='".$key['ssb_atas_nama']."'" : "" ; ?> placeholder="ssb atas nama">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                                <label for="exampleInputEmail1">Status</label>
                                <select class="custom-select" name="status"  id="status">
                                  <?php if($key['status'] ==  'WAITING'){
                                    echo '<option value="WAITING" selected >WAITING</option>';
                                    echo '<option value="MASUK" >MASUK</option>';
                                  } else if($key['status'] ==  'MASUK'){
                                    echo '<option value="MASUK" selected >MASUK</option>';
                                    echo '<option value="PINJAM" >PINJAM</option>';
                                  } else if($key['status'] ==  'PINJAM'){
                                    echo '<option value="MASUK">MASUK</option>';
                                    echo '<option value="PINJAM" selected>PINJAM</option>';
                                  }?>
                                </select>
                        </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            <!-- form ended -->
          </div>

            <div class="row no-print">
              <div class="col-12">
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-times-circle"></i> Tutup</button>
                <button type="button" class="btn btn-success float-right updated" onclick="ubah();" style="display:block;margin-right: 5px;" data-toggle="tooltip" data-placement="top" title="Lakukan Perubahan Data"><i class="far fa-edit"></i> Ubah
                </button>
                <button type="button" class="btn btn-warning float-right back" onclick="back();" style="display:none;margin-right: 5px;" data-toggle="tooltip" data-placement="top" title="Kembali Melihat"><i class="fas fa-undo-alt"></i> Kembali
                </button>
                <button type="submit" class="btn btn-success float-right save" style="display:none;margin-right: 5px;" data-toggle="tooltip" data-placement="top" title="Simpan Perubahan">
                  <i class="fas fa-save"></i> Simpan
                </button>
                <button class="btn btn-primary spinner float-right" type="button" disabled style="display:none;margin-right: 5px;">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
                <a href="<?= base_url(); ?>report/Cek_sertifikat_report/index/<?= $id; ?>" target="_blank" class="btn btn-primary float-right" style="margin-right: 5px;" data-toggle="tooltip" data-placement="top" title="Generate PDF">
                  <i class="fas fa-download"></i> PDF
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
<?php endforeach; ?>
