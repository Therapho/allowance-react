export type TaskButtonTrayProps = {
    isOpen: boolean;
    onSave: () => void;
    onApprove: () => void;
    onCancel: () => void;
    taskWeekValue: number;
};
