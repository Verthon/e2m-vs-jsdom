import { describe, it, expect } from 'vitest';
import { createInitialState, stepperReducer } from './stepperReducer';

const KEYS = ['step-0', 'step-1', 'step-2', 'step-3', 'step-4'];
const keys3 = KEYS.slice(0, 3);
const keys5 = KEYS;

describe('stepperReducer', () => {
  it('NEXT from last step does not exceed bounds', () => {
    let state = createInitialState('step-0', keys3);
    state = stepperReducer(state, { type: 'SET_VALIDITY', key: 'step-0', valid: true });
    state = stepperReducer(state, { type: 'NEXT', orderedKeys: keys3 });
    state = stepperReducer(state, { type: 'SET_VALIDITY', key: 'step-1', valid: true });
    state = stepperReducer(state, { type: 'NEXT', orderedKeys: keys3 });

    const result = stepperReducer(state, { type: 'NEXT', orderedKeys: keys3 });

    expect(result.activeKey).toBe('step-2');
  });

  it('PREV from first step does not go below first key', () => {
    const state = createInitialState('step-0', keys3);

    const result = stepperReducer(state, { type: 'PREV', orderedKeys: keys3 });

    expect(result.activeKey).toBe('step-0');
  });

  it('GO_TO to an unvisited future step is a no-op', () => {
    const state = createInitialState('step-0', keys5);

    const result = stepperReducer(state, { type: 'GO_TO', key: 'step-3' });

    expect(result.activeKey).toBe('step-0');
    expect(result).toBe(state);
  });

  it('GO_TO to a previously visited step works', () => {
    let state = createInitialState('step-0', keys5);
    state = stepperReducer(state, { type: 'SET_VALIDITY', key: 'step-0', valid: true });
    state = stepperReducer(state, { type: 'NEXT', orderedKeys: keys5 });
    state = stepperReducer(state, { type: 'SET_VALIDITY', key: 'step-1', valid: true });
    state = stepperReducer(state, { type: 'NEXT', orderedKeys: keys5 });

    const result = stepperReducer(state, { type: 'GO_TO', key: 'step-1' });

    expect(result.activeKey).toBe('step-1');
    expect(result.previousKey).toBe('step-2');
  });

  it('COMPLETE_STEP sets both completed and valid', () => {
    const state = createInitialState('step-0', keys3);

    const result = stepperReducer(state, { type: 'COMPLETE_STEP', key: 'step-0' });

    expect(result.steps.get('step-0')?.completed).toBe(true);
    expect(result.steps.get('step-0')?.valid).toBe(true);
  });

  it('RESET returns to initial state', () => {
    let state = createInitialState('step-0', keys3);
    state = stepperReducer(state, { type: 'SET_VALIDITY', key: 'step-0', valid: true });
    state = stepperReducer(state, { type: 'NEXT', orderedKeys: keys3 });
    state = stepperReducer(state, { type: 'COMPLETE_STEP', key: 'step-0' });

    const result = stepperReducer(state, { type: 'RESET', initialKey: 'step-0' });

    expect(result.activeKey).toBe('step-0');
    expect(result.steps.get('step-0')?.completed).toBe(false);
    expect(result.steps.get('step-0')?.valid).toBe(false);
    expect(result.steps.get('step-0')?.visited).toBe(true);
  });

  it('NEXT requires current step to be valid', () => {
    const state = createInitialState('step-0', keys5);

    const result = stepperReducer(state, { type: 'NEXT', orderedKeys: keys5 });

    expect(result.activeKey).toBe('step-0');
    expect(result).toBe(state);
  });

  it('NEXT marks the next step as visited', () => {
    let state = createInitialState('step-0', keys3);
    state = stepperReducer(state, { type: 'SET_VALIDITY', key: 'step-0', valid: true });

    const result = stepperReducer(state, { type: 'NEXT', orderedKeys: keys3 });

    expect(result.steps.get('step-0')?.visited).toBe(true);
    expect(result.steps.get('step-1')?.visited).toBe(true);
  });

  it('createInitialState sets first key as visited', () => {
    const state = createInitialState('step-0', keys3);

    expect(state.steps.get('step-0')?.visited).toBe(true);
    expect(state.steps.get('step-1')?.visited).toBe(false);
    expect(state.steps.get('step-2')?.visited).toBe(false);
  });
});
