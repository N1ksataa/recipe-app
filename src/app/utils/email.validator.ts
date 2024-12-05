import { ValidatorFn } from '@angular/forms';

export function emailValidator(domains: string[]): ValidatorFn {
  const domainStr = domains.map(domain => domain.replace('.', '\\.')).join('|');
  const regExp = new RegExp(`^[a-z0-9._-]{6,}@(${domainStr})$`);

  return (control) => {
    const isInvalid = control.value === '' || regExp.test(control.value);
    return isInvalid ? null : { emailValidator: true };
  };
}