using System;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data.Config
{
    public class ProductConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Name).IsRequired().HasMaxLength(250);
            builder.Property(p => p.Description).IsRequired().HasMaxLength(500);
            builder.Property(p => p.Picture).HasMaxLength(1000);
            builder.Property(p => p.Price).HasColumnType("decimal(18, 2)");
            builder.HasOne(m => m.Mark).WithMany().HasForeignKey(p => p.MarkId);
            builder.HasOne(c => c.Category).WithMany().HasForeignKey(p => p.CategoryId);
        }
    }
}
