using FluentValidation;
using TodoApp.DTOs.UserDtos;

namespace TodoApp.Validators.UserValidators
{
    public class UpdateUserValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserValidator() 
        {
            RuleFor(user => user.Name)
                .NotEmpty().WithMessage("Campo obrigatório.")
                .MaximumLength(20).WithMessage("Nome deve ter no maxímo 20 caracteres.")
                .When(user => !string.IsNullOrWhiteSpace(user.Name));
            RuleFor(user => user.Email)
                .NotEmpty().WithMessage("Campo obrigatório.")
                .EmailAddress().WithMessage("Email inválido.")
                .When(user => !string.IsNullOrWhiteSpace(user.Email));
            RuleFor(user => user.Password)
                .NotEmpty().WithMessage("Campo obrigatório.")
                .MinimumLength(6).WithMessage("Senha deve ter no minímo 6 caracteres.")
                .MaximumLength(20).WithMessage("Senha deve ter no maxímo 20 caracteres.")
                .When(user => !string.IsNullOrWhiteSpace(user.Password));
            RuleFor(user => user.PasswordConfirmed)
                .NotEmpty().WithMessage("Campo obrigatório.")
                .Equal(user => user.Password).WithMessage("Senhas não iguais.")
                .When(user => !string.IsNullOrWhiteSpace(user.Password) && !string.IsNullOrWhiteSpace(user.PasswordConfirmed));


        }
    }
}
