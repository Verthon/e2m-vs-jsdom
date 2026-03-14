import { Button } from 'src/ui/atoms/Button/Button';
import { Skeleton } from 'src/ui/atoms/Skeleton/Skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'src/ui/molecules/Dialog/Dialog';
import { useCancellationPolicy } from '../../hooks/useCancellationPolicy';

interface CancellationPolicyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CancellationPolicyDialog = ({ isOpen, onOpenChange }: CancellationPolicyDialogProps) => {
  const { data, isPending } = useCancellationPolicy();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancellation Policy</DialogTitle>
          <DialogDescription>
            Please review our cancellation and rescheduling policy.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          {isPending ? (
            <>
              <Skeleton height={16} />
              <Skeleton height={16} width={280} />
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
            </>
          ) : (
            <>
              <p>{data?.introduction}</p>
              {data?.sections.map((section, index) => (
                <p key={section.title}>
                  <strong>{index + 1}. {section.title}</strong> — {section.description}
                </p>
              ))}
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
