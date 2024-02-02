using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Status { get; set; }
        [ForeignKey("User")]
        public int? user_id { get; set; }

        public virtual User? User { get; set; }
    }
}
