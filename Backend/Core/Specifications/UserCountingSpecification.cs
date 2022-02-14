using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class UserCountingSpecification : BaseSpecification<User>
    {
        public UserCountingSpecification(UserParamsSpecification userParams) :
            base(x => (string.IsNullOrEmpty(userParams.Search) || x.FirstName.Contains(userParams.Search)) &&
               (string.IsNullOrEmpty(userParams.FirstName) || x.FirstName.Contains(userParams.FirstName)) &&
               (string.IsNullOrEmpty(userParams.LastName) || x.LastName.Contains(userParams.LastName))
            )
        {

        }
    }
}
