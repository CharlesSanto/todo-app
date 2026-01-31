using FluentValidation;
using TodoApp.DTOs.TodoDtos;

namespace TodoApp.Validators.TodoValidators
{
    public class CreateTodoDtoValidator : AbstractValidator<CreateTodoDto>
    {
        public CreateTodoDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Campo obrigatório.")
                .MaximumLength(20).WithMessage("Título deve ter no máximo 20 caracteres.");
            RuleFor(x => x.Description)
                .MaximumLength(300).WithMessage("Descrição deve ter no máximo 300 caracteres.");
            RuleFor(x => x.DueDate)
                .Must(dueDate => !dueDate.HasValue || dueDate.Value.Date >= DateTime.Today)
                .WithMessage("Data deve ser de hoje ou do futuro.")
                .When(x => x.DueDate.HasValue);
        }
    }
}
