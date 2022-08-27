export type defaultField = {
  name?: string;
  type?:
  | 'Input'
  | 'Select'
  | 'Datepicker'
  | 'Timepicker'
  | 'Checkbox'
  | 'Switch'
  | 'NumberPlate'
  | 'Radio'
  | 'RadioGroup'
  | 'Slider'
  | 'Empty'
  | 'ImageUpload'
  inputType?: string;
  grid?: {
    cols?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  dependency?: {
    fields: string[];
    callback: (field: FormSchema, formData: any) => void;
  };
  hidden?: boolean;
  label?: string;
  rules?: ((value: any) => string | boolean)[];
  options?: any;
  styles?: string;
  cssClass?: string;
  rows?: FormSchema[];
};

export type FormSchema = defaultField;
