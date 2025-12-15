using AutoMapper;
using Residencial.GastosAPI.Models;

namespace Residencial.GastosAPI.DTOs.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Pessoa, PessoaDto>().ReverseMap();
        CreateMap<Categoria, CategoriaDto>().ReverseMap();

        CreateMap<Transacao, TransacaoDto>()
            .ForMember(t => t.PessoaNome, opt => opt.MapFrom(src => src.Pessoa.Nome))
            .ForMember(t => t.CategoriaDescricao, opt => opt.MapFrom(src => src.Categoria.Descricao))
            .ReverseMap()
            .ForMember(dest => dest.Pessoa, opt => opt.Ignore())
            .ForMember(dest => dest.Categoria, opt => opt.Ignore());
    }
}
