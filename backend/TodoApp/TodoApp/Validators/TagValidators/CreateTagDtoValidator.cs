using FluentValidation;
using TodoApp.DTOs.TagDtos;

namespace TodoApp.Validators.TagValidators
{
    public class CreateTagDtoValidator : AbstractValidator<CreateTagDto>
    {
        public CreateTagDtoValidator()
        {
            RuleFor(tag => tag.Name)
                .NotEmpty().WithMessage("Campo obrigatório.")
                .MaximumLength(20).WithMessage("Nome da tag deve ter no maxímo 20 caracteres.");
        }
    }
}
