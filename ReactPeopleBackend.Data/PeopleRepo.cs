using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleBackend.Data
{
    public class PeopleRepo
    {
        private readonly string _connectionString;

        public PeopleRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();

        }
        
        public List<Person> GetAllPeople()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }


        public void DeletePerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Remove(context.People.FirstOrDefault(p => p.Id == id));
            context.SaveChanges();
        }

        public void DeletePeople(List<int> ids)
        {
            using var context = new PeopleDataContext(_connectionString);
            foreach (var id in ids)
            {
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            }
        }

        public void EditPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }
    }
}
