     $(document).ready(function () {
       $('#employeeTable1').DataTable({
         "scrollX": true,
         "autoWidth": false,
         "aaSorting": [],
         "searching": false,
       });
     
     });

    function submitingData (){
        let token = localStorage.getItem("token");
        let data = {
            kartu_number_awal : $("#kartu_number_awal").val(),
            kartu_number_akhir : $("#kartu_number_akhir").val(),
            area_kerja : $("#exampleFormControlSelect1").val()
        }

        console.log(data)
    }

    function getStatus(){
        let token = localStorage.getItem("token");
        $.ajax({
            type: "GET",
            url: '/api/item/generateReport.php',
            headers: {"Authorization": token},
            data: "json",
            success: function (x) {
                if (x.success == true) {
                    window.location.href = "/static/growpalAssetReport.xlsx";
                    M.toast({html: "Successful download files"})
                } else {
                    M.toast({html: x.message});
                    if (x.message == "tokenIsMissing") {
                        goTo(null, "login", {
                            replace: true
                        })
                    }
                }
    
            }
        });
    }

    $('#status_select').change(function(){
        var point = $(this).val();
        console.log(point)
      });
