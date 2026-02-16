import { describe, it, expect } from 'vitest';
import { createInitialState, stepperReducer } from './stepperReducer';

describe('stepperReducer', () => {
  it('NEXT from last step does not exceed bounds', () => {
    const state = createInitialState(3);
    const atLastStep = {
      ...state,
      currentStep: 2,
    };

    const result = stepperReducer(atLastStep, { type: 'NEXT' });

    expect(result.currentStep).toBe(2);
  });

  it('PREV from first step does not go below 0', () => {
    const state = createInitialState(3);

    const result = stepperReducer(state, { type: 'PREV' });

    expect(result.currentStep).toBe(0);
  });

  it('GO_TO to an unvisited future step is a no-op', () => {
    const state = createInitialState(5);

    const result = stepperReducer(state, { type: 'GO_TO', step: 3 });

    expect(result.currentStep).toBe(0);
    expect(result).toBe(state);
  });

  it('GO_TO to a previously visited step works', () => {
    let state = createInitialState(5);
    state = stepperReducer(state, { type: 'NEXT' });
    state = stepperReducer(state, { type: 'NEXT' });

    const result = stepperReducer(state, { type: 'GO_TO', step: 1 });

    expect(result.currentStep).toBe(1);
    expect(result.direction).toBe('backward');
  });

  it('COMPLETE_STEP sets both completed and valid', () => {
    const state = createInitialState(3);

    const result = stepperReducer(state, { type: 'COMPLETE_STEP', step: 0 });

    expect(result.steps[0].completed).toBe(true);
    expect(result.steps[0].valid).toBe(true);
  });

  it('RESET returns to initial state', () => {
    let state = createInitialState(3);
    state = stepperReducer(state, { type: 'NEXT' });
    state = stepperReducer(state, { type: 'COMPLETE_STEP', step: 0 });

    const result = stepperReducer(state, { type: 'RESET' });

    expect(result.currentStep).toBe(0);
    expect(result.steps[0].completed).toBe(false);
    expect(result.steps[0].valid).toBe(false);
    expect(result.steps[0].visited).toBe(true);
  });

  it('direction is set correctly for each navigation action', () => {
    let state = createInitialState(5);

    const nextResult = stepperReducer(state, { type: 'NEXT' });
    expect(nextResult.direction).toBe('forward');

    const prevResult = stepperReducer(nextResult, { type: 'PREV' });
    expect(prevResult.direction).toBe('backward');

    state = stepperReducer(state, { type: 'NEXT' });
    state = stepperReducer(state, { type: 'NEXT' });

    const goToForwardResult = stepperReducer(state, { type: 'GO_TO', step: 1 });
    expect(goToForwardResult.direction).toBe('backward');
  });

  it('NEXT marks the departing step as visited', () => {
    const state = createInitialState(3);

    const result = stepperReducer(state, { type: 'NEXT' });

    expect(result.steps[0].visited).toBe(true);
    expect(result.steps[1].visited).toBe(true);
  });

  it('createInitialState sets step 0 as visited', () => {
    const state = createInitialState(3);

    expect(state.steps[0].visited).toBe(true);
    expect(state.steps[1].visited).toBe(false);
    expect(state.steps[2].visited).toBe(false);
  });
});
