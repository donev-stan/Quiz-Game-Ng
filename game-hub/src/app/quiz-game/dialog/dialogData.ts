export interface IDialogData {
  title: string;
  text: string;
  audienceResponse?: object;
  winnings?: number;
  actions: {
    secondary?: {
      exitGame: boolean;
      reset: boolean;
      text: string;
    };
    main: {
      exitGame: boolean;
      reset: boolean;
      text: string;
    };
  };
}
