using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithCategoryAndMarkSpecification : BaseSpecification<Product>
    {
        public ProductWithCategoryAndMarkSpecification(ProductParamsSpecification productParams)
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.Contains(productParams.Search)) && 
                (!productParams.Mark.HasValue || x.MarkId == productParams.Mark) && 
                (!productParams.Category.HasValue || x.CategoryId == productParams.Category)
            )
        {
            AddInclude(p => p.Category);
            AddInclude(p => p.Mark);
            ApplyPaging(productParams.Limit ,productParams.Limit * (productParams.Page - 1));

            if(!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "nameAsc":
                        AddOrderByAscending(p => p.Name);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(p => p.Name);
                        break;
                    case "priceAsc":
                        AddOrderByAscending(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    case "descriptionAsc":
                        AddOrderByAscending(p => p.Description);
                        break;
                    case "descriptionDesc":
                        AddOrderByDescending(p => p.Description);
                        break;
                    default:
                        AddOrderByAscending(p => p.Name);
                        break;
                }
            }
        }

        public ProductWithCategoryAndMarkSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(p => p.Category);
            AddInclude(p => p.Mark);
        }
    }
}
