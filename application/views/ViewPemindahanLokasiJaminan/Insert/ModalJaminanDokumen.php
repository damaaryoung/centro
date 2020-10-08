
<!-- Modal -->
<div class="modal fade" id="modalJaminanDokumen" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Daftar Master Jaminan</h3>
        <button type="button" class="close" aria-label="Close" onclick="closeModalJaminanDokumen()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

    <!-- Data Tables -->
    <div class="card">
      <div class="form-inline" style="padding : 10px; float: right">
                    <div class="form-group">
                      <label for="email">Search</label> &nbsp; &nbsp;
                      <input type="text" class="form-control" name="search" id="search" placeholder="Search" onchange="serchDataJaminan()"> 
                         &nbsp;&nbsp;
                    </div>
      </div>
     <div id="loadingModalJaminan">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
            <div class="card-body">
            <table id="TableModalJaminan" class="table table-striped table-bordered" style="width:100% text-align:center" >
              <thead>
                  <tr>
                      <th style="width:50px;">Nomor&nbsp;Reff</th>
                      <th style="width:50px;">Agunan&nbsp;ID</th>
                      <th style="width:50px;">Deskripsi&nbsp;Ringkas</th>
                      <th style="width:50px;">Nomor&nbsp;Rekening</th>
                      <th style="width:50px;">Verifikasi</th>
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
        <button type="button" class="btn btn-danger" onclick="closeModalJaminanDokumen()">Kembali</button>
      </div>
    </div>
  </div>
</div>


