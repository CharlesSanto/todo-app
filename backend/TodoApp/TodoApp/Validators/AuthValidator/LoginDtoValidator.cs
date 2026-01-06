using FluentValidation;
using TodoApp.DTOs.AuthDtos;

namespace TodoApp.Validators.AuthValidator
{
    public class LoginDtoValidator : AbstractValidator<LoginDTO>
    {
        public LoginDtoValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Campo obrigatório.")
                .EmailAddress().WithMessage("Email inválido.");
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Campo obrigatório.")
                .MinimumLength(6).WithMessage("Senha deve ter no minímo 6 caracteres.")
                .MaximumLength(20).WithMessage("Senha deve ter no maxímo 20 caracteres.");
        }
    }
}
