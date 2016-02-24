﻿app.controller('Ofertamercantilontroller', function ($scope, ProcompetitivoServices) {


    $scope.OFM = {};//Objeto de OFM actual
    $scope.OFMS = []//Listado de Objeto OFM 


    $scope.Proceso = {};//Objeto actual
    $scope.Procesos = [];//Listado de Objetos

    var Polizas = [];///Vector de Polizas creadas
    $scope.lispolizas = [];
    $scope.Poliza = {};
    initialize();
    $scope.CurrentDate = new Date();//Fecha actual

    var archivos = [];

    function initialize() {
        $scope.Proceso = {};
        loadRecordProcoesos();
        $scope.Proceso.ID_COMPETITIVO = "";
        ///objeto Polizas
        $scope.Poliza = {};
        $scope.Poliza.NO_POLIZA = "";
        $scope.Poliza.FECHA_INI_POL = "";
        $scope.Poliza.COD_POLIZA = "";
        $scope.Poliza.FECHA_FINAL_POL="";
        $scope.Poliza.ASEGURADORA="";
        $scope.Poliza.VALOR_POLIZA="";
        $scope.Poliza.TIPO_POLIZA="";
        $scope.Poliza.VALOR_ASEGURADO = "";

        ///Objeto oferta mercantil
        $scope.OFM.DETALLE_PS = "";
        $scope.OFM = {};
        $scope.OFM.N_OFM="";
        $scope.OFM.FECHA_SUSCRIP_OFM="";
        $scope.OFM.FECHA_INIC_OFM = "";
        $scope.OFM.FECHA_FINAL_OFM = "";
        $scope.OFM.VIGENCIA="";
        $scope.OFM.TITULO_OFM="";
        $scope.OFM.CONTRATISTA="";
        $scope.OFM.OBJETO_OFM="";
        $scope.OFM.LUGRA_EJECUCION_OFM="";
        $scope.OFM.TIPO_MONEDA="";
        $scope.OFM.VALOR_ESTIMAO_OFM="";
        $scope.OFM.VALOR_REAL_OFM = "";
        $scope.OFM.NO_PO = "";
        $scope.OFM.PROC_OFM = "";
    }

    function loadRecordProcoesos() {
        var promiseGet = ProcompetitivoServices.getprocesoAP(); //The Method Call from service
        promiseGet.then(function (pl) {
            $scope.Procesos = pl.data;
            console.log($scope.Procesos)
        },
           function (errorPl) {
               console.log('Error al cargar los datos almacenados', errorPl);
           });
    }

    ///Cargar poliza al array 
    $scope.CargarPoliza = function () {
        Polizas.push($scope.Poliza);
        document.getElementById("lispoliza").innerHTML = "";
        var item = "<table class='table table-striped'>";
        for (var i = 0; i < Polizas.length; i++)
        {
            item += "<tr>";
            item += "<td>" + i + "</td>";
            item += "<td>"+Polizas[i].COD_POLIZA+"</td>";
            item += "<td>"+Polizas[i].FECHA_INI_POL+"</td>";
            item += "<td>" + Polizas[i].FECHA_FINAL_POL + "</td>";
            item += "<td>" + Polizas[i].ASEGURADORA + "</td>";
            item += "<td>"+Polizas[i].VALOR_POLIZA+"</td>";
            item += "<td style='text-alin:center;'>" + Polizas[i].TIPO_POLIZA + "</td>";
            item += "<td>" + Polizas[i].VALOR_ASEGURADO + "</td>";
            item += "<td></td>";
            item += "<td style='text-align: center'><a href='javasrcritp:;' title='Eliminar Poliza' onclick='angular.element(this).scope().RemoverPoliza(" + i + ");'><i class='fa fa-trash' style='font-size:20px;color:#ED5565;'></i></a></td>";
            item += "</tr>";
        }
        item += "</table>";
        $("#lispoliza").append(item);
    }

    //Remover elemeto seleccionado del array Polizas
    $scope.RemoverPoliza = function (i) {
        Polizas.splice(i, 1);
        document.getElementById("lispoliza").innerHTML = "";
        var item = "<table class='table table-striped'>";
        console.log(Polizas)
        for (var i = 0; i < Polizas.length; i++) {
            item += "<tr>";
            item += "<td>" + i + "</td>";
            item += "<td>" + Polizas[i].COD_POLIZA + "</td>";
            item += "<td>" + Polizas[i].FECHA_INI_POL + "</td>";
            item += "<td>" + Polizas[i].FECHA_FINAL_POL + "</td>";
            item += "<td>" + Polizas[i].ASEGURADORA + "</td>";
            item += "<td>" + Polizas[i].VALOR_POLIZA + "</td>";
            item += "<td style='text-alin:center;'>" + Polizas[i].TIPO_POLIZA + "</td>";
            item += "<td>" + Polizas[i].VALOR_ASEGURADO + "</td>";
            item += "<td></td>";
            item += "<td style='text-align: center'><a href='javasrcritp:;' title='Eliminar Poliza' onclick='angular.element(this).scope().RemoverPoliza(" + i + ");'><i class='fa fa-trash' style='font-size:20px;color:#ED5565;'></i></a></td>";
            item += "</tr>";
        }
        item += "</table>";
        $("#lispoliza").append(item);
    }

    ///Visualizar y cargar archivos a array
    $scope.visualizar = function () {
        document.getElementById("lista").innerHTML = "";
        var files = document.getElementById('files').files;

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
            item += '<a href="javasrcritp:;" title="Remover archivo" onclick="angular.element(this).scope().removerArchivo(' + i + ');"><i class="fa fa-trash" style="font-size:20px;color:#ED5565;margin-left:20px"></i></a>';
            item += '</td>';
            item += "</tr>";
        }
        $("#lista").append(item);
        item += '</table>';


    }

    $scope.removerArchivo = function (i) {
        archivos.splice(i, 1);
        document.getElementById("lista").innerHTML = "";
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
            item += '<a href="javasrcritp:;" title="Remover archivo" onclick="angular.element(this).scope().removerArchivo(' + i + ');"><i class="fa fa-trash" style="font-size:20px;color:#ED5565;margin-left:20px"></i></a>';
            item += '</td>';
            item += "</tr>";
        }
        $("#lista").append(item);
        item += '</table>';
    }

    $scope.Modal = function () { $("#modalprocesos").modal('show'); }

    $scope.Cargar = function ()
    {
        $scope.Proceso = this.Proceso;
        $("#modalprocesos").modal('hide');
        localStorage.setItem("ID_COMPETITIVO", $scope.Proceso.ID_COMPETITIVO);
        $scope.OFM.DETALLE_PS = $scope.Proceso.DETALLE_PS;

    }

    ///Metodo para agregar OFM
    $scope.Add = function () {
        var OFM = {}
        ID_COMPETITIVO = localStorage.getItem("ID_COMPETITIVO");
        OFM.N_OFM = $scope.OFM.N_OFM;
        OFM.FECHA_SUSCRIP_OFM = $scope.OFM.FECHA_SUSCRIP_OFM;
        OFM.FECHA_INIC_OFM = $scope.OFM.FECHA_INIC_OFM;
        OFM.FECHA_FINAL_OFM = $scope.OFM.FECHA_FINAL_OFM;
        OFM.VIGENCIA = $scope.OFM.VIGENCIA;
        OFM.TITULO_OFM = $scope.OFM.TITULO_OFM;
        OFM.CONTRATISTA = $scope.OFM.CONTRATISTA;
        OFM.OBJETO_OFM = $scope.OFM.OBJETO_OFM;
        OFM.LUGRA_EJECUCION_OFM = $scope.OFM.LUGRA_EJECUCION_OFM;
        OFM.TIPO_MONEDA = $scope.OFM.TIPO_MONEDA;
        OFM.VALOR_ESTIMAO_OFM = $scope.OFM.VALOR_ESTIMAO_OFM;
        OFM.VALOR_REAL_OFM = $scope.OFM.VALOR_REAL_OFM;
        OFM.NO_PO = $scope.OFM.NO_PO;
        OFM.PROC_OFM = ID_COMPETITIVO;
        if (Polizas.length === 0 || archivos.length == 0)
        {
            swal({
                title: "Mensaje de confirmación",
                text: "¿Esta seguro que desea realizar el registro sin haber cargado polizas de soporte?",
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
                    swal("Mensaje de Notificacion", " se ha realizado el registro de manera exítosa.", "success");
                    
                } else {
                    swal("Mensaje de Notificacion", "El proceso de registro no se ha confirmado", "error");
                }
            });
        }
        else
        {
            console.log("Oferta mercantil :" + JSON.stringify(OFM));
            console.log("Polizas :" + JSON.stringify(Polizas));
        }

    }


});