function* makeId() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

const genId = makeId();

export function genID() {
  return genId.next().value;
}
