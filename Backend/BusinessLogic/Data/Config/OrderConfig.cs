using Core.Entities.PurchaseOrder;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data.Config
{
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.OwnsOne(o => o.Addresses, x =>
            {
                x.WithOwner();
            });

            builder.Property(o => o.Status).HasConversion(x => x.ToString(), x => (Status)Enum.Parse(typeof(Status), x));

            builder.HasMany(o => o.Items).WithOne().OnDelete(DeleteBehavior.Cascade);

            builder.Property(o => o.SubTotal).HasColumnType("decimal(18,2)");
        }
    }
}
