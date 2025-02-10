export class Proposal {
  constructor(data) {
    if(typeof data != 'object' || data === null) throw new Error('Proposal must be an object.');
    if(typeof data.id != 'string') throw new Error('Proposal ID must be string.');
    if(typeof data.title != 'string') throw new Error('Proposal title must be string.');
    if(typeof data.content != 'string') throw new Error('Proposal content must be string.');
    if(typeof data.votes != 'number') throw new Error('Proposal votes must be number');

    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.votes = data.votes;
  }
}
