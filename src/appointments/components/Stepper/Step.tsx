import { useStepperContext } from './StepperContext';
import type { StepProps } from './types';

/**
 * A single step in a multi-step wizard.
 * Renders children as a render prop, injecting navigation state and dispatch.
 *
 * @public
 *
 * @example
 * <Step label="Personal Info" description="Your basic details">
 *   {({ dispatch, isFirst, isLast }) => (
 *     <>
 *       <fieldset>...</fieldset>
 *       <div>
 *         {!isFirst && <button onClick={() => dispatch({ type: 'prev' })}>Back</button>}
 *         <button onClick={() => dispatch({ type: 'next' })}>
 *           {isLast ? 'Finish' : 'Next'}
 *         </button>
 *       </div>
 *     </>
 *   )}
 * </Step>
 */
export const Step = ({ label, children }: StepProps) => {
  const ctx = useStepperContext();

  return (
    <section aria-label={label}>
      {children(ctx)}
    </section>
  );
};
