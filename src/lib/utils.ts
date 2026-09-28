type Classe = string | false | null | undefined;

export function cn(...classes: Classe[]): string {
  return classes.filter(Boolean).join(" ");
}
