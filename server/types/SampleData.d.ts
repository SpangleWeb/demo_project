export interface SampleData {
  DATE: string;
  PIC: string;
  HSCW: number;
  IMF: number | null;
  LMY: number | null;
  GLQ: number | null;
}

export type SampleDataArray = SampleData[];