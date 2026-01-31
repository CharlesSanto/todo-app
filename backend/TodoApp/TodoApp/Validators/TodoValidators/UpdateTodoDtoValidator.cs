
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
                .MaximumLength(300).WithMessage("Descrição deve ter no máximo 300 caracteres.");
            
            RuleFor(x => x.DueDate)
                .Must(dueDate => !dueDate.HasValue || dueDate.Value.Date >= DateTime.Today)
                .WithMessage("Data deve ser de hoje ou do futuro.")
                .When(x => x.DueDate.HasValue);
        }

    }
}
