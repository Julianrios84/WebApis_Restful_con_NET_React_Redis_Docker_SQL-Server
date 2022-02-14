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
    public class ShippingTypeConfig : IEntityTypeConfiguration<ShippingType>
    {
        public void Configure(EntityTypeBuilder<ShippingType> builder)
        {
            builder.Property(s => s.Price).HasColumnType("decimal(18,2)");
        }
    }
}
