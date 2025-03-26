export class Proposal {
  constructor(data) {
    if(typeof data != 'object' || data === null) throw new Error(`Proposal must be an object. : ${data}`);
    if(typeof data.id != 'string') throw new Error(`Proposal ID must be string. : ${data.id}`);
    if(typeof data.title != 'string') throw new Error(`Proposal title must be string. : ${data.title}`);
    if(typeof data.overview != 'string') throw new Error(`Proposal overview must be string. : ${data.overview}`);
    if(typeof data.votes != 'number') throw new Error(`Proposal votes must be number : ${data.votes}`);

    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.votes = data.votes;
  }
}
