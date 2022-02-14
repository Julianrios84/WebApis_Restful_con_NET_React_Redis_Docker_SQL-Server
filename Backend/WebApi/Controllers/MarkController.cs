using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class MarkController : BaseController
    {
        private readonly IGenericRepository<Mark> _genericRepository;

        public MarkController(IGenericRepository<Mark> genericRepository)
        {
            _genericRepository = genericRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Mark>>> GetMarks()
        {
            var records = await _genericRepository.GetAllAsync();
            return Ok(records);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Mark>> GetMark(int id)
        {
            return await _genericRepository.GetByIdAsync(id);
        }
    }
}
