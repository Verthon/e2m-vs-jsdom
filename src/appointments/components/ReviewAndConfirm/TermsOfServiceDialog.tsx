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
import { useTermsOfService } from '../../hooks/useTermsOfService';

interface TermsOfServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsOfServiceDialog = ({ isOpen, onOpenChange }: TermsOfServiceDialogProps) => {
  const { data, isPending } = useTermsOfService();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Please review our terms before confirming your appointment.
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
