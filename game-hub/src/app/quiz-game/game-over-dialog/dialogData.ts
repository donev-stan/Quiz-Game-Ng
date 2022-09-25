export interface IDialogData {
  title: string;
  text: string;
  winnings?: number;
  action: { exitGame: boolean; text: string };
}
