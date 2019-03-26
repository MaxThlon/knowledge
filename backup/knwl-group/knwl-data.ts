export enum KnwlDataType {
    Text = "Text",
    Link = "Link"
}

export interface KnwlData {
  id: number
  dataType: KnwlDataType;
  data?: string;
}

export function UseKnwlData(constructor: Function) {
    constructor.prototype.KnwlDataType = KnwlDataType;
}

export interface DialogData {
  titleTranslation: string;
  name: string;
}
