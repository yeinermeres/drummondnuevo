using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
   public class Proyecto
    {
        [Key]
        public int PROYEC_ID { get; set; }
        public string B_U { get; set; }
        public string GL_UNIT { get; set; }
        public string AFE { get; set; }
        public string CONTRATO { get; set; }
        public string PROGRAMA { get; set; }
        public string PROYECTO { get; set; }
        public string AREA { get; set; }
        public string ESTADO_PROYEC { get; set; }
        public int PROYEC_MANAGER { get; set; }
        public virtual Proyec_Manager Proyer_Manager { get; set; }

        [ForeignKey("PROYECTO_COMPETITIVO")]
        public virtual ICollection<Proceso_Competitivo> Proc_Competitivos { get; set; }

   }
       
}
