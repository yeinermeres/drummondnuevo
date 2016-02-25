using BLL;
using Dal;
using Entity;
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
        public List<OfmEntity> Get()
        {
            return of.GetallOfm();
        }

        // GET: api/Ofertamercantil/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Ofertamercantil
        public void Post(Oferta_Mercantil ofm)
        {
            of.OFMadd(ofm);
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
