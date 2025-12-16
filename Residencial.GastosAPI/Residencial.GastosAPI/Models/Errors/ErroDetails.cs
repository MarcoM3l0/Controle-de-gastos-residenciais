using System.Text.Json;

namespace Residencial.GastosAPI.Models.Errors;

/// <summary>
/// Representa os detalhes de um erro ocorrido na API.
/// </summary>
public class ErroDetails
{
    public int StatusCode { get; set; }
    public string? Message { get; set; }

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}
