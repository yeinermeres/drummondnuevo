using BLL;
using Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class OfertamercantilController : ApiController
    {
        OfertaMercantilBLL of = new OfertaMercantilBLL();

        // GET: api/Ofertamercantil
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Ofertamercantil/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Ofertamercantil
        public void Post(Oferta_Mercantil ofm, List<Polizas> pl)
        {
            of.OFMadd(ofm,pl);
        }

        // PUT: api/Ofertamercantil/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Ofertamercantil/5
        public void Delete(int id)
        {
        }
    }
}
