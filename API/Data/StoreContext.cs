using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext:IdentityDbContext<User, Role, int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Course> Courses { get; set; }= null!;
        public DbSet<Theme> Themes { get; set; }= null!;
        public DbSet<Message> Messages { get; set; }= null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>()
                .HasData(
                    new Role{Id=1, Name="Profesor", NormalizedName="PROFESOR"},
                    new Role{Id=2, Name="Student", NormalizedName="STUDENT"}
                );


        builder.Entity<Message>()
            .HasOne(p => p.Theme)
            .WithMany(t => t.Messages)
            .HasForeignKey(p => p.ThemeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Message>()
        .HasOne(m => m.User)
        .WithMany()
        .HasForeignKey(m => m.UserId)
        .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<Theme>()
        .HasOne(m => m.User)
        .WithMany()
        .HasForeignKey(m => m.UserId)
        .OnDelete(DeleteBehavior.SetNull);
        }
    }
}