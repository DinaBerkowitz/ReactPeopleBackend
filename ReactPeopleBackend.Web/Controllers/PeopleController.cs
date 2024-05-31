using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleBackend.Data;
using ReactPeopleBackend.Web.Models;

namespace ReactPeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }


        [HttpPost]
        [Route("add")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.AddPerson(person);
        }


        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepo(_connectionString);
            return repo.GetAllPeople();
        }


        [Route("editperson")]
        public void EditPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.EditPerson(person);
        }

        [Route("deleteperson")]
        public void DeletePerson(DeletePeopleViewModel vm)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeletePerson(vm.Id);
        }

        [Route("deletepeople")]
        public void DeletePeople(DeletePeopleViewModel vm)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeletePeople(vm.Ids);
        }

    }
}
