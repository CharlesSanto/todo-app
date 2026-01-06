
using FluentValidation;
using TodoApp.DTOs.TodoDtos;

namespace TodoApp.Validators.TodoValidators
{
    public class UpdateTodoDtoValidator : AbstractValidator<UpdateTodoDto>
    {
        public UpdateTodoDtoValidator()
        {
            RuleFor(x => x.Title)
                .MaximumLength(20).WithMessage("Título deve ter no máximo 20 caracteres.")
                .When(x => !string.IsNullOrWhiteSpace(x.Title));
            
            RuleFor(x => x.Description)
                .MaximumLength(300).WithMessage("Descrição deve ter no máximo 300 caracteres.")
                .When(x => !string.IsNullOrWhiteSpace(x.Description));
            
            RuleFor(x => x.DueDate)
                .GreaterThan(DateTime.Now).WithMessage("Data deve estar no futuro.")
                .When(x => x.DueDate.HasValue);
        }

    }
}
