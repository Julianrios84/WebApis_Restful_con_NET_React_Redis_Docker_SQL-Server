using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Errors;

namespace WebApi.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IGenericRepository<Product> _genericRepository;
        private readonly IMapper _mapper;

        public ProductController(IGenericRepository<Product> genericRepository, IMapper mapper)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductDTO>>> GetProducts([FromQuery] ProductParamsSpecification productParams)
        {
            var spec = new ProductWithCategoryAndMarkSpecification(productParams);
            var records = await _genericRepository.GetAllWithSpec(spec);

            var count = new ProductCountingSpecification(productParams);
            var total = await _genericRepository.CountAsync(count);

            var totalPage = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(total / productParams.Limit)));

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDTO>>(records);

            return Ok(
                new Pagination<ProductDTO>
                {
                    Count = total,
                    Page = productParams.Page,
                    Limit = productParams.Limit,
                    PageCount = totalPage,
                    Data = data
                }
                );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            // spec = debe incluir la logica de la condición de la consulta & las relaciones entre las entidades.
            var spec = new ProductWithCategoryAndMarkSpecification(id);
            var record = await _genericRepository.GetByIdWithSpec(spec);
            if (record == null) { return NotFound(new Response(404, "El product no existe")); }
            return _mapper.Map<Product, ProductDTO>(record);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            var result = await _genericRepository.Add(product);
            if (result == 0) { throw new Exception("Product not inserted"); }
            return Ok(product);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, Product product)
        {
            product.Id = id;
            var result = await _genericRepository.Update(product);
            if (result == 0) { throw new Exception("Failed to update product"); }
            return Ok(product);
        }
    }
}
