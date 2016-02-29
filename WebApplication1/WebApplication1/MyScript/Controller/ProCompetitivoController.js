app.controller('ProCompetitivoController', function ($scope, ProcompetitivoServices, ProyectoServices, $rootScope) {

    $scope.visibilidadOff = false
    $scope.visibilidadOn = true


    $rootScope.ProCompetitivo;
    $rootScope.AspProceso;
    $rootScope.AspirantesPros = [];

    archivos = [];
    $scope.Proceso = {};//Objeto actual
    $scope.Procesos = [];//Listado de Objetos

    ///Objeto congifuracion
    $scope.Confi = {}
    $scope.Conficto = []; //Listado de contratos
    $scope.ConfiCate = []; //Listado de Categorias
    $scope.ConfiFml = []; //Listado de Familia

    var file;
    ///Datos proyectos
    $scope.Proyec = {};//Objeto actual
    $scope.Proyes = [];//Listado de Objetos

    $scope.Aspirante = {}; //Objeto Actual
    $scope.Aspirantes = [];//Listado de Objetos

    $scope.archi = {};
    $scope.archivos = [];

    loadConfiguracion();
    loadRecordProyectos();
    loadRecords();
    loadRecordAspirantes();
    inicialize();

    $scope.CurrentDate = new Date();//Fecha actual


    function inicialize() {
        $scope.Proyec = {};
        $scope.Proceso = {};
        $scope.Aspirante = {};

        $scope.Proyec.PROYECTO = "";
        $scope.Proyec.COMP_ADQUISICION = "";

        ///datos proceso competitivo

        $scope.Proceso.CATEGORIA = "";
        $scope.Proceso.TIPO = "";
        $scope.Proceso.ORIGEN = "";
        $scope.Proceso.FAMILIA = "";
        $scope.Proceso.COMP_ADQUISICION = "";
        $scope.Proceso.DESC_GENERAL = "";
        $scope.Proceso.PRESUPUESTO = "";

        $scope.Proceso.LUGAR_EJECUCION = ""
        $scope.Proceso.PROCESO = "";
        $scope.Proceso.PROCESO_INICIO;
        $scope.Proceso.TIEMPO_PROCESO = "";
        $scope.Proceso.FECHA_INICO = "";
        $scope.Proceso.FECHA_INIC_SERVICE = "";
        $scope.Proceso.TIEMPO_EJECUCION = "";
        $scope.Proceso.DETALLE_PS = "";
        $scope.Proceso.CANTIDAD = "";
        $scope.Proceso.UNIDAD = "";
        $scope.Proceso.LUGAR_EJECUCION = "";
        $scope.Proceso.VALOR_TOTAL = "";
        $scope.Proceso.PROYECTO_COMPETITIVO = ""
        $scope.Proceso.COMP_ADQUISICION = "";
        $scope.Proceso.TIPO_MONEDA = "";
    }


    ///Function para cargar todos los proyectos
    function loadConfiguracion() {
        var promiseGet = ProyectoServices.getAllConfig(); //The Method Call from service
        promiseGet.then(function (pl) {
            $scope.Confi = pl.data;
            angular.forEach($scope.Confi, function (i, item) {
                switch (i.TIPO_CONFIG) {
                    case 1:
                        $scope.Conficto.push(
                            {
                                "NOMBRE_CONFIG": i.NOMBRE_CONFIG
                            }
                            );
                        break;

                    case 2:
                        $scope.ConfiCate.push(
                            {
                                "NOMBRE_CONFIG": i.NOMBRE_CONFIG
                            }
                            );
                        break;
                    case 3:
                        $scope.ConfiFml.push(
                            {
                                "NOMBRE_CONFIG": i.NOMBRE_CONFIG
                            }
                            );
                        break;
                }

            })

        },
              function (errorPl) {
                  $log.error('Error al cargar los datos almacenados', errorPl);
              });
    }

    function loadRecordProyectos() {
        var promiseGet = ProcompetitivoServices.getAllproyectos(); //The Method Call from service
        promiseGet.then(function (pl) {
            $scope.Proyes = pl.data;

        },
           function (errorPl) {
               console.log('Error al cargar los datos almacenados', errorPl);
           });
    }

    function loadRecords() {
        var promiseGet = ProcompetitivoServices.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            $scope.Procesos = pl.data;
            console.log($scope.Procesos)

        },
           function (errorPl) {
               console.log('Error al cargar los datos almacenados', errorPl);
           });
    }

    function loadRecordAspirantes() {
        var promiseGet = ProcompetitivoServices.getAllAspirantes(); //The Method Call from service
        promiseGet.then(function (pl) {
            $scope.Aspirantes = pl.data;
        },
        function (errorPl) {
            console.log('Error al cargar los datos almacenados', errorPl);
        });
    }

    function loadRecordsAspirantes(id) {
        var promiseGet = ProcompetitivoServices.get(id); //The Method Call from service
        promiseGet.then(function (pl) {
            $rootScope.AspirantesPros = pl.data;
            console.log($rootScope.AspirantesPros)
        },
        function (errorPl) {
            console.log('Error al cargar los datos almacenados', errorPl);
        });
    }

    $scope.LoadModal = function () {
        $('#modalproyectos').modal('show')

    }

    $scope.LoadAspirantes = function () {
        $('#modalAspirantes').modal('show');

        $scope.Proceso = this.Proceso;
        localStorage.setItem('PROCESO', $scope.Proceso.ID_COMPETITIVO);

        console.log("SELECCION PROCESO : " + $scope.Proceso.ID_COMPETITIVO)
    }

    $scope.CerrarModal = function () {
        $('#modalAspirantes').modal('hide')
    }

    $scope.CargarAsp = function () {
        $scope.Aspirante = this.Aspirante;
        localStorage.setItem('ASPIRANTE', $scope.Aspirante.ASPIRANTE_ID);

        console.log("SELECCION ASP : " + $scope.Aspirante.ASPIRANTE_ID)
        swal({
            title: "Mensaje de confirmación",
            text: "¿Esta seguro que desea agregar este aspirante?" +
            "\n" + $scope.Aspirante.NOM_RAZONSOCIAL,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    var AspProceso = {};
                    var DOCUMENTO_ASP = localStorage.getItem("ASPIRANTE");
                    var DOCUMENTO_PRO = localStorage.getItem("PROCESO");

                    AspProceso.ID_ASPIRANTE = DOCUMENTO_ASP;
                    AspProceso.ID_PROCESO = DOCUMENTO_PRO;

                    console.log("CONFIRMAR ID_ASPIRANTE " + DOCUMENTO_ASP);
                    console.log("CONFIRMAR ID_COMPETITIVO " + DOCUMENTO_PRO);

                    var result = ProcompetitivoServices.relacion(AspProceso);
                    result.then(function () {
                        setTimeout(function () {
                            toastr.options = {
                                "closeButton": true,
                                "debug": false,
                                "progressBar": false,
                                "preventDuplicates": false,
                                "positionClass": "toast-bottom-full-width",
                                "onclick": null,
                                "showDuration": "400",
                                "hideDuration": "1000",
                                "timeOut": "7000",
                                "extendedTimeOut": "1000",
                                "showEasing": "swing",
                                "hideEasing": "linear",
                                "showMethod": "fadeIn",
                                "hideMethod": "fadeOut"
                            };
                        }, 1100);
                        loadRecordProcesos();
                        localStorage.removeItem("ASPIRANTE")
                        localStorage.removeItem("PROCESO")

                    },
                    function (errorpl) {
                        console.log(errorpl)
                    });

                    swal("Mensaje de Notificacion", "El Proceso fue realizado de manera exitosa.", "success");
                } else {
                    swal("Mensaje de Notificacion", "El Proceso no ha sido confirmado", "error");
                }
            });

        $('#modalAspirantes').modal('hide');
    };

    $scope.Cargar = function (d) {
        $scope.Proyec = this.Proyec;
        $scope.Proyec.PROYECTO = $scope.Proyec.PROYECTO;
        localStorage.setItem('PROYECTO', $scope.Proyec.PROYEC_ID)
        $('#modalproyectos').modal('hide')
    }

    $scope.TimeProces = function () {
        switch ($scope.Proceso.COMP_ADQUISICION) {

            case "A":
                $scope.Proceso.TIEMPO_PROCESO = 180;
                calcularFI($scope.Proceso.TIEMPO_PROCESO);
                break;
            case "B":
                $scope.Proceso.TIEMPO_PROCESO = 120;
                calcularFI($scope.Proceso.TIEMPO_PROCESO);
                break;
            case "C":
                $scope.Proceso.TIEMPO_PROCESO = 90;
                calcularFI($scope.Proceso.TIEMPO_PROCESO);
                break
            case "D":
                $scope.Proceso.TIEMPO_PROCESO = 60;
                calcularFI($scope.Proceso.TIEMPO_PROCESO);
                break;
        }
    }

    $scope.Add = function () {
        var Proceso = {}
        var PROYECTO = localStorage.getItem("PROYECTO");

        Proceso.CATEGORIA = $scope.Proceso.CATEGORIA;
        Proceso.TIPO = $scope.Proceso.TIPO;
        Proceso.ORIGEN = $scope.Proceso.ORIGEN;
        Proceso.FAMILIA = $scope.Proceso.FAMILIA;
        Proceso.COMP_ADQUISICION = $scope.Proceso.COMP_ADQUISICION;
        Proceso.DESC_GENERAL = $scope.Proceso.DESC_GENERAL;
        Proceso.PRESUPUESTO = $scope.Proceso.PRESUPUESTO;
        Proceso.PROCESO = $scope.Proceso.PROCESO;
        Proceso.PROCESO_INICIO = $scope.Proceso.PROCESO_INICIO;
        Proceso.TIEMPO_PROCESO = $scope.Proyec.COMP_ADQUISICION
        Proceso.FECHA_INICO = $scope.Proceso.FECHA_INICO;
        Proceso.FECHA_INIC_SERVICE = $scope.Proceso.FECHA_INIC_SERVICE;
        Proceso.TIEMPO_EJECUCION = $scope.Proceso.TIEMPO_EJECUCION;
        Proceso.DETALLE_PS = $scope.Proceso.DETALLE_PS;
        Proceso.CANTIDAD = $scope.Proceso.CANTIDAD;
        Proceso.UNIDAD = $scope.Proceso.UNIDAD;
        Proceso.LUGAR_EJECUCION = $scope.Proceso.LUGAR_EJECUCION;
        Proceso.VALOR_ESTIMADO = $scope.Proceso.VALOR_ESTIMADO;
        Proceso.VALOR_TOTAL = $scope.Proceso.VALOR_TOTAL;
        Proceso.PROYECTO_COMPETITIVO = PROYECTO;
        Proceso.LUGAR_EJECUCION = $scope.Proceso.LUGAR_EJECUCION;
        Proceso.TIPO_MONEDA = $scope.Proceso.TIPO_MONEDA;

        var result = ProcompetitivoServices.post(Proceso);
        result.then(function () {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "progressBar": false,
                "preventDuplicates": false,
                "positionClass": "toast-bottom-full-width",
                "onclick": null,
                "showDuration": "400",
                "hideDuration": "1000",
                "timeOut": "7000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            toastr.success("Se realizado el registro de manera exitosa.", "Notificaciones");
            inicialize();
            loadRecord();
            localStorage.removeItem("PROYECTO")
        },
        setTimeout(function () { $scope.Cargartodo() }, 1000),
        function (errorpl) {
            console.log(errorpl)
        });


    };

    $scope.getArchivo = function (id) {
        var promiseGet = ProcompetitivoServices.getArchivos(id); //The Method Call from service
        promiseGet.then(function (pl) {
            $scope.archivos = pl.data;
            console.log($scope.archivos);
            rutas($scope.archivos)
        },
           function (errorPl) {
               console.log('Error al cargar los datos almacenados', errorPl);
           });
    }


    var rutas = function (dto) {
        document.getElementById("rutas").innerHTML = "";
        var rt = "";
        if (dto.length === 0) {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "progressBar": false,
                "preventDuplicates": false,
                "positionClass": "toast-bottom-full-width",
                "onclick": null,
                "showDuration": "400",
                "hideDuration": "1000",
                "timeOut": "7000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            toastr.warning("No existen documentos adjuntos para este proceso competitivo", "Notificaciones");
        }
        else {

            var item = "<table class='table table-striped'>"
            item += "<thead>";
            item += "<tr>";
            item += "<th>Docuementos</th>";
            item += "<th></th>";
            item += "</tr>";
            item += "</thead>";
            for (i = 0; i < dto.length; i++) {
                rt = dto[i].RUTA;
                var res = rt.substring(70, 90);
                item += "<tbody>";
                item += "<tr class='gradeX'>";
                item += '<td>' + res + '</td>';
                item += "<td>";
                item += "<a href='javasrcritp:;' title='Remover archivo' onclick='ver(" + dto[i].RUTA + ");'><i class='fa fa-eye' style='font-size:20px;color:#1A7BB9;margin-left:20px'></i></a>";
                item += "</td>";
                item += "</tr>";
                item += "</tbody>";
            }
            item += "</table>";
            $("#rutas").append(item);
            $("#modalRutas").modal("show");
        }

    }

    ver = function (rt) {
        alert(rt);
    }

    var calcularFI = function (dias) {
        $scope.Proceso.FECHA_INICO = "";
        $scope.Proceso.FECHA_INIC_SERVICE = "";

        $scope.YearAct = $scope.CurrentDate.getFullYear();
        $scope.MesAct = ('0' + ($scope.CurrentDate.getMonth() + 1)).slice(-2);
        $scope.DiaAct = ('0' + $scope.CurrentDate.getDate()).slice(-2);

        $scope.Proceso.FECHA_INICO = $scope.MesAct + "/" + $scope.DiaAct + "/" + $scope.YearAct;
        console.log($scope.Proceso.FECHA_INICO)

        var result = new Date($scope.Proceso.FECHA_INICO);
        result.setDate(result.getDate() - dias);

        /*console.log('0' + (result.getDate() + 1));
        console.log(('0' + (result.getMonth() + 1)));
        console.log(result.getFullYear());*/

        $scope.Proceso.FECHA_INIC_SERVICE = ('0' + (result.getMonth() + 1)).slice(-2) + "/" + ('0' + (result.getDate())).slice(-2) + "/" + result.getFullYear();
        //alert($scope.Proceso.FECHA_INIC_SERVICE);
    }

    $scope.Mostrar = function () {
        $scope.visibilidadOff = true
        $scope.visibilidadOn = false
    }

    $scope.Ocultar = function () {
        $scope.visibilidadOff = false
        $scope.visibilidadOn = true

    }

    $scope.visualizar = function () {
        document.getElementById("lista").innerHTML = "";
        var files = document.getElementById('files').files;
        //var archivos = new FormData();
        //var item = "";
        for (i = 0; i < files.length; i++) {
            file = files[i];
            archivos.push({ 'id': i, 'file': file });
        }
        var item = "<table class='table table-striped'>";
        item += "<thead>";
        item += "<tr>";
        item += "<th></th>";
        item += "<th>Nombre de archivo</th>";
        item += "<th>Tamaño</th>";
        item += "<th>Acciones</th>";
        item += "</tr>";
        item += "</thead>";
        //cargando tabla
        for (i = 0; i < archivos.length; i++) {
            item += "<tr>";
            item += "<td>" + parseInt(i + 1) + ".</td>";
            item += "<td>" + archivos[i].file.name + "</td>";
            item += "<td style='font-size:12px'>" + (archivos[i].file.size / (1024 * 1024)).toFixed(2) + " MG</td>";
            item += '</td>';
            item += '<td>';
            item += '<a href="javasrcritp:;" title="Remover archivo" onclick="angular.element(this).scope().Removeritem(' + i + ');"><i class="fa fa-trash" style="font-size:20px;color:#ED5565;margin-left:20px"></i></a>';
            item += '</td>';
            item += "</tr>";
        }
        $("#lista").append(item);
        item += '</table>';


    }

    $scope.Removeritem = function (i) {
        alert(i)
    }

    $scope.Cargartodo = function () {
        var files = $("#files").get(0).files;
        var data = new FormData();
        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }

        $.ajax({
            type: "POST",
            url: "/api/Files",
            contentType: false,
            processData: false,
            data: data,
            success: function (result) {
                if (result) {
                    console.log('Archivos subidos correctamente');
                } else {
                    alert(result)
                }
            }
        });
    }

    $scope.detalle = function () {
        $rootScope.ProCompetitivo = this.Proceso;
        loadRecordsAspirantes($rootScope.ProCompetitivo.ID_COMPETITIVO);
        console.log("id c" + $rootScope.ProCompetitivo.ID_COMPETITIVO)
    }
});