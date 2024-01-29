namespace webapi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public virtual ICollection<ToDo> ToDos { get; set;} = new HashSet<ToDo>();
    }
}
