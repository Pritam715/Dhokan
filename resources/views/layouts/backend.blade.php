<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Dhokan | Dashboard</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{url('Backend/assets/plugins/fontawesome-free/css/all.min.css')}}">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bbootstrap 4 -->
  {{-- <link rel="stylesheet" href="{{url('Backend/assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css')}}"> --}}
  
    <!-- DataTables -->
    <link rel="stylesheet" href="{{url('Backend/assets/plugins/datatables-bs4/css/dataTables.bootstrap4.css')}}">
  <!-- JQVMap -->
  
  <!-- Theme style -->
  <link rel="stylesheet" href="{{url('Backend/assets/dist/css/adminlte.min.css')}}">
  <Link rel="stylesheet" href="{{url('Backend/assets/dist/css/custom.css')}}">
  <!-- overlayScrollbars -->
 
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>

<body class="hold-transition sidebar-mini layout-fixed">
    <div id="app">

    </div>

  

    

 
 <script src="{{url('js/backend.js')}}"></script>
  
<!-- jQuery -->
<script src="{{url('Backend/assets/plugins/jquery/jquery.min.js')}}"></script>

<!-- jQuery UI 1.11.4 -->
<script src="{{url('Backend/assets/plugins/jquery-ui/jquery-ui.min.js')}}"></script>

<script src="{{url('Backend/assets/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>



<!-- Tempusdominus Bootstrap 4 -->
{{-- <script src="{{url('Backend/assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js')}}"></script> --}}

<!-- overlayScrollbars -->
{{-- <script src="{{asset('Backend/assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script> --}}
<!-- AdminLTE App -->
<script src="{{url('Backend/assets/dist/js/adminlte.js')}}"></script>
{{-- <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="{{asset('Backend/assets/dist/js/pages/dashboard.js')}}"></script> --}}
<!-- AdminLTE for demo purposes -->
<script src="{{url('Backend/assets/dist/js/demo.js')}}"></script>
<!-- DataTables -->
<Link rel='stylesheet' href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css"/>
<script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>

{{-- <script src="{{asset('Backend/assets/plugins/datatables/jquery.dataTables.js')}}"></script>
<script src="{{asset('Backend/assets/plugins/datatables-bs4/js/dataTables.bootstrap4.js')}}"></script> --}}
<!--Status--->


<script>
  $(function () {
    $("#example1").DataTable();
    $('#example1').DataTable(
      {
       "columnDefs": [
       { "visible": true, "targets": 0 }
       ]
      }
     );
   
    
  });
</script>


</body>
</html>
