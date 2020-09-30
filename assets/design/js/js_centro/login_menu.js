var nama = '';
var nik = '';
var jabatan = '';
var status = '';
var email = '';
var iat = '';
var exp = '';
var usename = '';
var userIdLogin = '';
var kd_cabang = '';
var base_url = $('#base_url').val();


$('#btn-log-in').click(function(){   
      console.log('button di click');
      loginfunction();
  });

  $(document).ready(function() {
     $('#loading').hide();
  });

  function loginfunction(){
    var user = $('#user').val();
    var password =  $('#password').val();
         
    $('#loading').show();
    $.ajax({
      url: 'http://103.31.232.146/API_ABSENSI/' + 'login',
      cache: false,
      type: 'POST',
      data: {
        "user" : user,
        "password" : password
      },
      dataType: 'json',
      success : function(response){
        console.log(response);

        status      = response['status'];
        nama        = response['payload']['nama'];
        nik         = response['payload']['nik'];
        jabatan     = response['payload']['jabatan'];
        email       = response['payload']['email'];
        iat         = response['payload']['iat'];
        exp         = response['payload']['exp'];
        usename     = response['payload']['usename'];
        userIdLogin = response['payload']['id'];
        kd_cabang   = response['user']['kd_cabang'];
        loginfunction2(nama,
                       nik,
                       jabatan,
                       email,
                       iat,
                       exp,
                       usename,
                       userIdLogin,
                       kd_cabang);
      },
      error: function (response) {
        console.log(response);
        status = response['status'];
        loginfunction2(nama,
                       nik,
                       jabatan,
                       email,
                       iat,
                       exp,
                       usename,
                       userIdLogin,
                       kd_cabang);       
      }
    });

  }

function loginfunction2(nama,
                       nik,
                       jabatan,
                       email,
                       iat,
                       exp,
                       usename,
                       userIdLogin,
                       kd_cabang){
      console.log(nama);
         $.ajax({
              url : base_url +"index.php/LoginController/login_process",
              type : "POST",
              dataType : "json",
              data : {"nama"   : nama, 
                      "nik"    : nik,
                      "jabatan" : jabatan,
                      "email" : email,
                      "iat" : iat,
                      "exp" : exp,
                      "usename" : usename,
                      "userIdLogin" : userIdLogin,
                      "kd_cabang"   : kd_cabang
                    },

              success : function(response) {
                 console.log('harusnya bisa');
                  window.location = base_url + 'index.php/DashboardController/index';  
              },
              error : function(response) {
                  console.log('failed');
                 
                  window.location = base_url + 'index.php/LoginController/index'; 
              }
          });
}