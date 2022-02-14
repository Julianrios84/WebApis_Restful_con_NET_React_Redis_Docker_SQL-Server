using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class UserSpecification : BaseSpecification<User>
    {
        public UserSpecification(UserParamsSpecification userParams) : 
            base( x =>  (string.IsNullOrEmpty(userParams.Search) || x.FirstName.Contains(userParams.Search)) &&
                (string.IsNullOrEmpty(userParams.FirstName) || x.FirstName.Contains(userParams.FirstName)) &&
                (string.IsNullOrEmpty(userParams.LastName) || x.LastName.Contains(userParams.LastName))
            ) 
        {
            ApplyPaging(userParams.Limit, userParams.Limit * (userParams.Page - 1));

            if (!string.IsNullOrEmpty(userParams.Sort))
            {
                switch (userParams.Sort)
                {
                    case "firstNameAsc":
                        AddOrderByAscending(p => p.FirstName);
                        break;
                    case "firstNameDesc":
                        AddOrderByDescending(p => p.FirstName);
                        break;
                    case "lastNameAsc":
                        AddOrderByAscending(p => p.LastName);
                        break;
                    case "lastNameDesc":
                        AddOrderByDescending(p => p.LastName);
                        break;
                    case "emailAsc":
                        AddOrderByAscending(p => p.Email);
                        break;
                    case "emailDesc":
                        AddOrderByDescending(p => p.Email);
                        break;
                    default:
                        AddOrderByAscending(p => p.FirstName);
                        break;
                }
            }
        }
    }
}
