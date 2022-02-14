using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // CreateMap<Product, ProductDTO>();
            CreateMap<Core.Entities.Product, ProductDTO>()
                .ForMember(p => p.CategoryName, x => x.MapFrom(a => a.Category.Name))
                .ForMember(p => p.MarkName, x => x.MapFrom(a => a.Mark.Name));

            CreateMap<Core.Entities.Addresses, AddressesDTO>().ReverseMap();
            CreateMap<Core.Entities.User, UserDTO>().ReverseMap();


            CreateMap<AddressesDTO, Core.Entities.PurchaseOrder.Addresses>();

            CreateMap<Core.Entities.PurchaseOrder.Order, OrderResponseDTO>()
                .ForMember(o => o.ShippingType, x => x.MapFrom(a => a.ShippingType.Name))
                .ForMember(o => o.ShippingTypePrice, x => x.MapFrom(a => a.ShippingType.Price));

            CreateMap<Core.Entities.PurchaseOrder.Item, ItemResponseDTO>()
                .ForMember(o => o.Id, x => x.MapFrom(a => a.Product.Id))
                .ForMember(o => o.Name, x => x.MapFrom(a => a.Product.Name))
                .ForMember(o => o.Picture, x => x.MapFrom(a => a.Product.Picture));


        }
    }
}
