/* eslint-disable ts/no-explicit-any */
interface CellAddress {
  c: number;
  r: number;
}

type XlsxComponetName = 'input' | 'select'
type XlsxComponent<T = XlsxComponetName> = T extends 'input'
  ? { type: T }
  : T extends 'select'
    ? { type: T; options: { label: string; value: string | number }[] }
    : never

interface XlsxRule {
  required?: boolean;
  message?: string;
  validator?: (value: any, item: any) => string | undefined | void;
}

interface XlsxColumn {
  field: string;
  title: string;
  component: XlsxComponent;
  type?: 'string' | 'number';
  defaultValue?: string | number | boolean;
  rules?: XlsxRule[];
  [x: string]: any;
}

interface SheetSchema {
  sheetName: string;
  columns: XlsxColumn[];
}
