app.controller('ProyectosController', function ($scope, ProyectoServices, $rootScope) {

    $scope.Proyec = {}; //Objeto Actual
    $scope.Proyecs = []; //Listado de Objetos
    $scope.editMode = false; // Modo de Edición
    $rootScope.Proyecto;
    ///Objetos para matener los datos al cambiar de pagina
    $rootScope.Proc_Competitivo = {};
    $rootScope.Proc_Competitivos = [];

    $scope.Confi = {}
    $scope.Conficto = []; //Listado de contratos

    $scope.manager = {}; //Objeto Actual
    $scope.managers = []; //Listado de Objetos

    $scope.visibilidadOff = false
    $scope.visibilidadOn = true
    $scope.visibilidadEdit = false;

    $scope.Mostrar = function () {
        $scope.visibilidadOff = true
        $scope.visibilidadOn = false

    }

    $scope.Ocultar = function () {
        $scope.visibilidadOff = false
        $scope.visibilidadOn = true

    }

    loadRecords();
    loadConfiguracion();
    function initialize() {
        $scope.Proyec = {}; //Objeto Actual

        $scope.manager.PROYEC_ID = "";
        $scope.manager.DOCUMENTO = "";
        $scope.manager.NOMBRE = "";
        $scope.manager.P_APELLIDO = "";
        $scope.manager.S_APELLIDO = "";
        $scope.DOC_RECUPERADO = ""
        $scope.ProyecPROYEC_ID = "";

        $scope.Proyec.B_U = "";
        $scope.Proyec.GL_UNIT = "";
        $scope.Proyec.AFE = "";
        $scope.Proyec.CONTRATO = "";
        $scope.Proyec.PROGRAMA = "";
        $scope.Proyec.PROYECTO = "";
        $scope.Proyec.AREA = "";
        $scope.Proyec.PROYECT_MANAGER = "";
    }



    $scope.LoaPromanager = function () {
        $('#Modalmanager').modal('show');
        loadManager();
    }

    ///Function para cargar todos los proyectos
    function loadRecords() {
        var promiseGet = ProyectoServices.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            $scope.Proyecs = pl.data;
        },
              function (errorPl) {
                  $log.error('Error al cargar los datos almacenados', errorPl);
              });
    }

    function loadRecordsProcesos(id) {
        var promiseGet = ProyectoServices.get(id); //The Method Call from service
        promiseGet.then(function (pl) {
            $rootScope.Proc_Competitivos = pl.data;
            console.log($rootScope.Proc_Competitivos)
        },
              function (errorPl) {
                  console.log('Error al cargar los datos almacenados', errorPl);
              });
    }

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
                }

            })

        },
              function (errorPl) {
                  $log.error('Error al cargar los datos almacenados', errorPl);
              });
    }


    $scope.Cargar = function () {
        $scope.manager = this.manager;
        ///console.log($scope.manager.NOMBRE)
        $('#Modalmanager').modal('hide');
        $scope.Proyec.MANAGER = $scope.manager.NOMBRE + " " + $scope.manager.P_APELLIDO + " " + $scope.manager.S_APELLIDO;
        $scope.manager.NOMBRE = $scope.manager.NOMBRE + " " + $scope.manager.P_APELLIDO + " " + $scope.manager.S_APELLIDO;
        localStorage.setItem("DOCUMENTO", $scope.manager.ID_PROMANAGER);
    };

    ///Function para cargar todos los projer manager
    function loadManager() {
        var promiseGet = ProyectoServices.getAllManager(); //The Method Call from service
        promiseGet.then(function (pl) {
            $scope.managers = pl.data;
        },
              function (errorPl) {
                  $log.error('Error al cargar los datos almacenados', errorPl);
              });
    }


    $scope.Add = function () {
        var proyecto = {}
        var DOCUMENTO_M = localStorage.getItem("DOCUMENTO");

        proyecto.B_U = $scope.Proyec.B_U;
        proyecto.GL_UNIT = $scope.Proyec.GL_UNIT;
        proyecto.AFE = $scope.Proyec.AFE;
        proyecto.CONTRATO = $scope.Proyec.CONTRATO;
        proyecto.PROGRAMA = $scope.Proyec.PROGRAMA;
        proyecto.PROYECTO = $scope.Proyec.PROYECTO;
        proyecto.AREA = $scope.Proyec.AREA;
        proyecto.PROYEC_MANAGER = DOCUMENTO_M;
        var result = ProyectoServices.post(proyecto);
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
                toastr.success("Se realizado el registro de manera exitosa.", "SAC-Notificaciones");

            }, 1100);
            loadRecords();
            $scope.visibilidadOff = false
            $scope.visibilidadOn = true;
            $scope.visibilidadEdit = false;
            localStorage.removeItem("DOCUMENTO")
        },
        function (errorpl) {
            console.log(errorpl)
        });
    };

    $scope.removePR = function () {
        $scope.Promager = this.Proyec;
        var id = $scope.Promager.PROYEC_ID

        swal({
            title: "Mensaje de confirmación",
            text: "¿Esta seguro que desea anular el proyecto?" +
            "\n" + $scope.Promager.PROYECTO,
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
                    var result = ProyectoServices.delete($scope.Promager.PROYEC_ID);
                    result.then(function () {

                        loadRecords();
                        $('#Modalmanager').modal('hide');
                    },
                    function (errorpl) {
                        console.log(errorpl)
                    })
                    swal("Mensaje de Notificacion", "El Proceso de anulacion fue realizado de manera exitosa.", "success");
                } else {
                    swal("Mensaje de Notificacion", "El proceso de anulacion no ha sido confirmado", "error");
                }
            });
    }

    $scope.edit = function () {
        $scope.Proyec = this.Proyec;
        $scope.editMode = true;
        $scope.visibilidadEdit = true;
        $scope.visibilidadOn = false;
    };

    $scope.editOn = function () {
        $scope.editMode = false;
        $scope.visibilidadEdit = false;
        $scope.visibilidadOn = true;
        initialize();
        loadRecords();
        $scope.editMode = false;
    };

    //Functin Para Actualizar
    $scope.update = function () {
        var configuracion = {};
        configuracion.CONFIG_ID = $scope.Config.CONFIG_ID;
        configuracion.NOMBRE_CONFIG = $scope.Config.NOMBRE_CONFIG;
        configuracion.TIPO_CONFIG = $scope.Config.TIPO_CONFIG;
        var promisePost = ProyectoServices.put(configuracion.CONFIG_ID, configuracion);
        promisePost.then(function (d) {
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
                toastr.success("Datos actualizados de manera exitosa.", "Sistema de Notificaciones");

            }, 1200);
            $('#ModalEditar').modal('hide');
            loadRecords();
        }, function (err) {
            alert("Some Error Occured " + JSON.stringify(err));
        });
    };

    $scope.detalle = function () {
        $scope.manager = this.manager;
        $rootScope.Proyecto = this.Proyec;
        loadRecordsProcesos($rootScope.Proyecto.PROYEC_ID);
    }

});