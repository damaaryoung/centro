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
              Silahkan pilih tanggal periode penarikan data.
            </div>
            <div class="col-md-3">
              <img src="<?= base_url(); ?>assets/dist/img/detective.svg" width="30%" class="float-right">
            </div>
          </div>
        </div>
        <!-- Main content -->
        <div class="invoice p-3 mb-3">
        <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Export Data</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Export Data</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <section>
    <form method="POST"  action="<?php echo base_url(); ?>index.php/CekSertifikat_controller/exportExcel"> 
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body" id="form_report">
                        <div class="row">
                            <div class="form-group col-md">
                                <label>Dari Tanggal</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="far fa-calendar-alt"></i>
                                        </span>
                                    </div>
                                    <input type="date" id="dari_tgl" name="dari_tgl" class="form-control datepicker" onchange="dateValidation()" required>
                                </div>
                            </div>
                            <div class="form-group col-md">
                                <label>Sampai Tanggal</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="far fa-calendar-alt"></i>
                                        </span>
                                    </div>
                                    <input type="date" id="sampai_tgl" name="sampai_tgl" class="form-control" required disabled>
                                </div>
                            </div>
                        </div>
                        <?php echo validation_errors(); ?>
                          
                        </div>
                        <button type="submit" class="btn btn-success" target="_blank" style="float: right;"><img src="<?php echo base_url('assets/dist/img/excel.png') ?>" style="width: 26px;"></img>EXPORT</button>
    </form>                
                    </div>
                </div>
            </div>
        </div>
    </section>

    
        </div>
      </div>
    </div>
  </div>

  <!-- onclick="exportExcel()" -->