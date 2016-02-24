using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Dal
{
    public class Proceso_Competitivo
    {
        [Key]
        public int ID_COMPETITIVO { get; set; }
        public string PROCESO { get; set; }
        public string PROCESO_INICIO { get; set; }
        public int TIEMPO_PROCESO { get; set; }
        public string FECHA_INICO { get; set; }
        public string FECHA_INIC_SERVICE { get; set; }
        public int TIEMPO_EJECUCION { get; set; }
        public string DETALLE_PS { get; set; }
        public int CANTIDAD { get; set; }
        public string UNIDAD { get; set; }
        public string LUGAR_EJECUCION { get; set; }
        public decimal VALOR_ESTIMADO { get; set; }
        public decimal VALOR_TOTAL { get; set; }
        public string ESTADO_PROC { get; set; }
        /// <summary>
        /// relacion proceso competitivos => proyectos
        /// </summary>
        public int PROYECTO_COMPETITIVO { get; set; }

         //Relacion tabla ruta archivos para los procesos competitivos registrados
         [ForeignKey("PROCESO_ARCHIVO")]
         public virtual ICollection<Archivo_Ruta> Ruta_Achivo { get; set; }

         [ForeignKey("PROC_OFM")]
         public virtual ICollection<Oferta_Mercantil> Ofmcompetitivo { get; set; }

    }
}
