import { useNavigate } from 'react-router';
import { Button } from 'src/ui/atoms/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'src/ui/molecules/Dialog/Dialog';
import { useAppointmentsTranslation } from '../../../i18n/useAppointmentsTranslation';
import { routesConfig } from 'src/routing/routesConfig';

interface SlotExpiredDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SlotExpiredDialog = ({ isOpen, onOpenChange }: SlotExpiredDialogProps) => {
  const { t } = useAppointmentsTranslation();
  const navigate = useNavigate();

  function handleOpenChange(open: boolean) {
    if (!open) {
      navigate(routesConfig.home);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('appointments.reviewAndConfirm.timer.expired.title')}</DialogTitle>
          <DialogDescription>
            {t('appointments.reviewAndConfirm.timer.expired.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => navigate(routesConfig.home)}>
            {t('appointments.reviewAndConfirm.timer.expired.goHome')}
          </Button>
          <Button variant="primary" onClick={() => navigate(routesConfig.createAppointment)}>
            {t('appointments.reviewAndConfirm.timer.expired.startOver')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
