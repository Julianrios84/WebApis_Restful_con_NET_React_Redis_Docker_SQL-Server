using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductCountingSpecification : BaseSpecification<Product>
    {
        public ProductCountingSpecification(ProductParamsSpecification productParams)
            : base(x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Name.Contains(productParams.Search)) && 
                (!productParams.Mark.HasValue || x.MarkId == productParams.Mark) && 
                (!productParams.Category.HasValue || x.CategoryId == productParams.Category)
            )
        {

        }
    }
}
