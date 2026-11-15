export type UpdateBookingFormProps = {
  startTime: string;
  endTime: string;
  onSave: (startTime: string, endTime: string) => void;
};

export default function UpdateBookingForm({
  startTime,
  endTime,
  onSave,
}: UpdateBookingFormProps) {
  return null;
}
