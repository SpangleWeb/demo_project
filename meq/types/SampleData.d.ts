export interface SampleData {
  DATE: string;
  PIC: string;
  HSCW: number;
  IMF: number | null;
  LMY: number | null;
  GLQ: number | null;
}

export type FormattedPlotSampleData = [string, string, number, number | null, number | null, number | null];


export type SampleDataArray = SampleData[];