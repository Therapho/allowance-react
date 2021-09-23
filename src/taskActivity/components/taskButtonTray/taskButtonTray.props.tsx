export type TaskButtonTrayProps = {
    canEdit: boolean;
    onSave: () => void;
    onApprove: () => void;
    onCancel: () => void;
    canApprove: boolean;
    taskWeekValue: number;
};
