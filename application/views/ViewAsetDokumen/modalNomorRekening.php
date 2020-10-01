
<!-- Modal -->
<div class="modal fade" id="modalNomorRekening" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="width:1500px; overflow-y:auto; height: 700px;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Daftar Rekening Kredit</h3>
        <button type="button" class="close" id="btn_kembali_norek_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

    <!-- Data Tables -->
    <div class="card">
      <div class="form-inline" style="padding : 10px; float: right">
                    <div class="form-group">
                      <label for="email">Search</label> &nbsp; &nbsp;
                      <input type="text" class="form-control" name="search" id="search" placeholder="Search" onchange="serchDataRekening()"> 
                     &nbsp;&nbsp;
                    </div>
      </div>
    <div id="loading2">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
            <div class="card-body">
            <table id="TableNoRek" class="table table-striped table-bordered" style="width:100% text-align:center" >
              <thead>
                  <tr>
                      <th style="width:50px;">Nomor Rekening</th>
                      <th style="width:50px;">No&nbsp;Alternatif</th>
                      <th style="width:50px;">Nama&nbsp;Nasabah</th>
                      <th style="width:50px;">Alamat</th>
                      <th style="width:50px;">Jml&nbsp;Pinjaman</th>
                      <th style="width:50px;">Tgl&nbsp;Realisasi</th>
                      <th style="width:50px;">Tgl&nbsp;Jt&nbsp;Tempo</th>
                      <th style="width:50px;">Pokok&nbsp;Saldo&nbsp;Akhir</th>
                      <th style="width:50px;">Verifikasi</th>
                      <th style="width:50px;">Kode Kantor</th>
                      <th style="width:50px;">Action</th>
                  </tr>
              </thead>
              <tbody id="bodyNomorRekening">

              </tbody>
          </table>
            </div>
            <!-- /.card-body -->
          </div>

      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_norek_modal">Kembali</button>
      </div>
    </div>
  </div>
</div>


