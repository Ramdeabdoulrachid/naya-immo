import { TransactionType } from "@/types/property";

/**
 * Formate un montant en FCFA de manière déterministe (SSR/CSR identique)
 * Ex: 65000000 -> "65 000 000 FCFA"
 */
export function formatFCFA(
  amount: number,
  options?: {
    transactionType?: TransactionType;
    showPeriod?: boolean;
  }
): string {
  const rounded = Math.round(amount);
  const formattedNumber = rounded
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const suffix =
    options?.showPeriod && options?.transactionType === "location"
      ? " FCFA / mois"
      : " FCFA";

  return `${formattedNumber}${suffix}`;
}

/**
 * Formate un montant en FCFA de façon compacte pour les badges / filtres
 * Ex: 65000000 -> "65 M FCFA", 250000 -> "250 000 FCFA"
 */
export function formatCompactFCFA(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const clean = Number.isInteger(millions)
      ? millions.toString()
      : millions.toFixed(1).replace(".", ",");
    return `${clean} M FCFA`;
  }
  return formatFCFA(amount);
}

