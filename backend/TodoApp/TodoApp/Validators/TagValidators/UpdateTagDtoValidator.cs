using FluentValidation;
using TodoApp.DTOs.TagDtos;

namespace TodoApp.Validators.TagValidators
{
    public class UpdateTagDtoValidator : AbstractValidator<UpdateTagDto>
    {
        public UpdateTagDtoValidator()
        {
            RuleFor(tag => tag.Name)
                .MaximumLength(20).WithMessage("Nome da tag deve ter no maxímo 20 caracteres.")
                .When(tag => !string.IsNullOrWhiteSpace(tag.Name));
        }
    }
}
