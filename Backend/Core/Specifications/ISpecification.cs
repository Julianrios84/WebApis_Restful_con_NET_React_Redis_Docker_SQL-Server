using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        // Condicion logica que queremos aplicar a una entidad
        Expression<Func<T, bool>> Criteria { get; }

        // Relaciones que vas a poder implementar sobre una entidad
        List<Expression<Func<T, object>>> Includes { get; }

        // Ordenar By ascending
        Expression<Func<T, object>> OrderByAscending { get; }

        // Order By descending
        Expression<Func<T, object>> OrderByDescending { get; }

        // Indica cuantos elementos tomar
        int Take { get; }

        // Indicamos desde cual posicion tomar los elementos el Take
        int Skip { get; }

        // Si la paginación esta habilitada
        bool IsPagingEnabled { get; }


    }
}
