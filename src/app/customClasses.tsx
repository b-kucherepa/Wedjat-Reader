export class BgImage {
  readonly file: string;
  readonly name: string;
  readonly modified: number;
  
  constructor(file: string, name: string, modified: number ) {
    this.file = file;
    this.name = name;
    this.modified = modified;
  }
}