export class BgImage {
  readonly file: string;
  readonly name: string;
  readonly size: number;
  readonly modified: number;
  
  constructor(file: string, name: string, size: number, modified: number ) {
    this.file = file;
    this.name = name;
    this.size = size;
    this.modified = modified;
  }
}