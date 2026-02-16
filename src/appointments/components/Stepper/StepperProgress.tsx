import React from 'react';
import { Link } from '../../../ui/atoms/Link/Link';
import { useStepperContext } from './StepperContext';


export function StepperProgress() {
  const { state, dispatch, stepLabels } = useStepperContext();
  const currentHuman = state.currentStep + 1;
  const completedCount = Object.values(state.steps).filter((s) => s.completed).length;
  const percentage = Math.round((completedCount / state.totalSteps) * 100);

  return (
    <>
      <ol className="sr-only">
        {Array.from({ length: state.totalSteps }, (_, index) => {
          const stepState = state.steps[index];
          const label = stepLabels[index] ?? `Step ${index + 1}`;
          const isCompleted = stepState?.completed;
          const isCurrent = index === state.currentStep;

          if (isCompleted) {
            return (
              <li key={index}>
                <span className="sr-only">Completed: </span>
                <Link
                  href="#"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    dispatch({ type: 'GO_TO', step: index });
                  }}
                >
                  {label}
                </Link>
              </li>
            );
          }

          if (isCurrent) {
            return (
              <li key={index} aria-current="step">
                <span className="sr-only">Current: </span>
                <span>{label}</span>
              </li>
            );
          }

          return (
            <li key={index}>
              <span>{label}</span>
            </li>
          );
        })}
      </ol>
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-900 font-bold text-sm tracking-wide uppercase">
            Step {currentHuman} of {state.totalSteps}
          </span>
          <span className="text-slate-700 text-sm font-semibold">
            {percentage}% Complete
          </span>
        </div>
        <progress
          className="h-3 w-full appearance-none overflow-hidden rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-slate-200 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-emerald-500"
          max={state.totalSteps}
          value={currentHuman}
        >
          Step {currentHuman} of {state.totalSteps}
        </progress>
      </div>
    </>
  );
}
