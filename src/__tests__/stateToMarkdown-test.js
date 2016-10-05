/* @flow */
const {describe, it} = global;
import expect from 'expect';
import {convertFromRaw} from 'draft-js';
import stateToMarkdown from '../stateToMarkdown';
import fs from 'fs';
import {join} from 'path';

// This separates the test cases in `data/test-cases.txt`.
const SEP = '\n\n>>';

let testCasesRaw = fs.readFileSync(
  join(__dirname, '..', '..', 'test', 'test-cases.txt'),
  'utf8',
);

let testCases = testCasesRaw.slice(2).trim().split(SEP).map((text) => {
  let lines = text.split('\n');
  let description = lines.shift().trim();
  let state = JSON.parse(lines[0]);
  let markdown = lines.slice(1).join('\n');
  return {description, state, markdown};
});

describe('stateToMarkdown', () => {
  testCases.forEach((testCase) => {
    let {description, state, markdown} = testCase;
    it(`should render ${description}`, () => {
      let contentState = convertFromRaw(state);
      expect(stateToMarkdown(contentState)).toBe(markdown + '\n');
    });
  });
});
